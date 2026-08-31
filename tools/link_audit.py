"""
Link, affiliate and placeholder integrity gate for bptrack.app.

WHAT THIS IS FOR
A manual pass over this site found the routes and the commerce working. A
manual pass finds what it happens to look at. This makes the same check
deterministic, repeatable and able to fail a build.

WHAT IT CHECKS
Every route in the sitemap, plus every internal page reachable from those
routes, and inside each one every href: navigation, footer, CTA, body link,
source citation, PDF, affiliate destination, store link and cross-property
link.

WHAT FAILS THE BUILD
  internal 4xx/5xx          a reader hits a dead page
  empty href                a button that looks live and goes nowhere
  href="#"                  the same defect wearing a hash
  placeholder URLs          example.com, TODO, lorem, YOUR_
  localhost / staging       a dev URL shipped to production
  malformed URL             unparseable, or a scheme we do not ship
  dead PDF                  a download that 404s or is not a PDF
  dead external citation    a source that no longer resolves, on a YMYL page
  Amazon link with no tag   unpaid traffic on a monetised link
  wrong Amazon tag          revenue attributed somewhere else
  store URL while unreleased a promise the product cannot keep
  missing store URL after release  the primary conversion is dead

WHAT IT WARNS ABOUT WITHOUT FAILING
  external redirect chains, slow hosts, and non-Amazon retailer links that
  carry no affiliate parameter. The last one is a revenue question, not a
  correctness one, so it is reported and not fatal.

WHY THE STORE CHECK CUTS BOTH WAYS
BP Central is not on either store. The dangerous failure today is the opposite
of the usual one: not a broken store link, but a *working-looking* store link
to a listing that does not exist. So while APP_STORE.released is false, any
apps.apple.com or play.google.com URL in the built output is a failure. The day
it flips, the absence of those URLs becomes the failure instead.

USAGE
    py -3.11 tools/link_audit.py                     # audit production
    py -3.11 tools/link_audit.py --base http://localhost:3000
    py -3.11 tools/link_audit.py --skip-external     # fast internal-only pass
    py -3.11 tools/link_audit.py --json out.json --md out.md

Exit code 0 = clean, 1 = at least one failure. Wire that into CI.
"""
from __future__ import annotations

import argparse
import html as html_mod
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

# A bare python-urllib user agent gets a Cloudflare 1010 that reads exactly like
# a permission error. Send a browser UA or spend an afternoon debugging a
# credential that was never broken.
HEADERS = {"User-Agent": UA, "Accept": "*/*", "Accept-Language": "en-US,en;q=0.9"}

PLACEHOLDER = re.compile(
    r"example\.(com|org|net)|lorem|ipsum|YOUR_|TODO|FIXME|xxxx|changeme|placeholder",
    re.I)
DEV_HOST = re.compile(r"localhost|127\.0\.0\.1|0\.0\.0\.0|\.local\b|staging|vercel\.app|ngrok", re.I)

AMAZON = re.compile(r"amazon\.[a-z.]+", re.I)
STORE = re.compile(r"apps\.apple\.com|itunes\.apple\.com|play\.google\.com", re.I)

# Statuses that mean "this client was refused", not "this page is gone".
BOT_DEFENCE = {401, 403, 429}

# Retailers we would expect to monetise if we carry a program for them. Linking
# to one untagged is a lost commission, not a broken page.
RETAILERS = re.compile(
    r"walmart\.com|target\.com|bestbuy\.com|cvs\.com|walgreens\.com|fsastore\.com|withings\.com",
    re.I)
AFFILIATE_PARAM = re.compile(r"\b(tag|irgwc|clickid|u1|sourceid|affiliate|utm_source=affil|irclickid|siteid|publisherId|sharedid|ranMID|awc|cjevent)\b", re.I)


def _strip_ts_comments(src: str) -> str:
    """Drop block and line comments so the parser reads code, not prose.

    Without this, `released` was read as True off a doc comment reading
    "set `released: true` and paste the real URLs", while the actual value two
    lines below it is false. That single misread inverted the store-link check
    and silently disabled the gate that matters most before launch. A parser
    that can be fooled by its own file's documentation is not a parser.

    WHY THIS IS A SCANNER AND NOT `line.split("//")`
    Because every https URL contains "//". The naive version truncated
    `url: 'https://apps.apple.com/...'` to `url: 'https:` and the gate then
    failed the build with STORE_URL_NOT_HTTPS — on a URL that was correct.

    That defect was invisible while both URLs were empty, and would have fired
    on the one edit the whole launch depends on. Found by simulating an
    iOS-only launch rather than by reading the code.

    So quotes are tracked, and a "//" inside a string literal is data.
    """
    out = []
    i, n = 0, len(src)
    quote = None          # "'", '"', or "`" while inside a string literal
    while i < n:
        c = src[i]
        if quote:
            out.append(c)
            if c == "\\" and i + 1 < n:      # escaped char: copy both
                out.append(src[i + 1])
                i += 2
                continue
            if c == quote:
                quote = None
            i += 1
            continue
        if c in "'\"`":
            quote = c
            out.append(c)
            i += 1
            continue
        if c == "/" and i + 1 < n:
            if src[i + 1] == "/":
                while i < n and src[i] != "\n":
                    i += 1
                continue
            if src[i + 1] == "*":
                j = src.find("*/", i + 2)
                i = n if j == -1 else j + 2
                out.append(" ")
                continue
        out.append(c)
        i += 1
    return "".join(out)


def _block(src: str, const_name: str) -> str:
    """The body of `export const NAME = { ... } as const;`."""
    # The `: PlatformStore` annotation is optional in this pattern on purpose.
    # It was added to product.ts after this parser was written, and without the
    # optional group the parser stopped finding IOS entirely — which surfaced
    # as "cannot find IOS", loudly, rather than as a silent pass. Fail loud.
    m = re.search(rf"export const {const_name}\s*(?::\s*\w+\s*)?=\s*\{{", src)
    if not m:
        raise SystemExit(f"link_audit: cannot find {const_name} in product.ts")
    i = m.end()
    depth = 1
    while depth and i < len(src):
        if src[i] == "{":
            depth += 1
        elif src[i] == "}":
            depth -= 1
        i += 1
    return src[m.end():i]


def _platform(src: str, const_name: str) -> dict:
    b = _block(src, const_name)
    def s(key, default=""):
        m = re.search(rf"^\s*{key}:\s*'([^']*)'", b, re.M)
        return m.group(1) if m else default
    m = re.search(r"^\s*released:\s*(true|false)\s*,", b, re.M)
    if not m:
        raise SystemExit(f"link_audit: cannot read {const_name}.released")
    return {
        "released": m.group(1) == "true",
        "url": s("url"),
        "appleId": s("appleId"),
        "bundleId": s("bundleId"),
        "packageName": s("packageName"),
        "storeName": s("storeName"),
    }


def product_facts(src_override: str | None = None) -> dict:
    """Read the truth out of src/lib/product.ts rather than restating it here.

    Per platform, because the platforms launch independently. A single
    `released` flag cannot express "Android is live and iOS is not", and the
    version of this file that used one could not have caught an Android-only
    launch advertising an App Store listing.
    """
    raw = src_override if src_override is not None else (
        REPO / "src" / "lib" / "product.ts").read_text(encoding="utf-8")
    src = _strip_ts_comments(raw)
    tag = ""
    mon = REPO / "src" / "lib" / "monitors.ts"
    if mon.exists():
        m = re.search(r"AMAZON_TAG\s*=\s*'([^']+)'",
                      _strip_ts_comments(mon.read_text(encoding="utf-8")))
        tag = m.group(1) if m else ""
    return {
        "ios": _platform(src, "IOS"),
        "android": _platform(src, "ANDROID"),
        "amazonTag": tag,
    }


def platform_of_host(netloc: str) -> str | None:
    if re.search(r"apps\.apple\.com|itunes\.apple\.com", netloc, re.I):
        return "ios"
    if re.search(r"play\.google\.com", netloc, re.I):
        return "android"
    return None


def fetch(url: str, method: str = "GET", timeout: int = 25):
    """Return (status, final_url, content_type, body_bytes, error)."""
    try:
        req = urllib.request.Request(url, headers=HEADERS, method=method)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read() if method == "GET" else b""
            return r.status, r.geturl(), r.headers.get("Content-Type", ""), body, None
    except urllib.error.HTTPError as e:
        # HEAD is refused by plenty of hosts; retry once with GET before judging.
        if method == "HEAD":
            return fetch(url, "GET", timeout)
        return e.code, url, e.headers.get("Content-Type", "") if e.headers else "", b"", None
    except Exception as e:                                   # noqa: BLE001
        return 0, url, "", b"", f"{type(e).__name__}: {e}"


def strip_scripts(html: str) -> str:
    return re.sub(r"<script\b.*?</script>", " ", html, flags=re.S)


def links_in(html: str) -> list[tuple[str, str]]:
    """(href, anchor-text) for every anchor, plus img/source assets."""
    out = []
    body = strip_scripts(html)
    for m in re.finditer(r"<a\b([^>]*)>(.*?)</a>", body, re.S | re.I):
        attrs, inner = m.group(1), m.group(2)
        h = re.search(r'href="([^"]*)"', attrs)
        text = re.sub(r"<[^>]+>", " ", inner)
        text = re.sub(r"\s+", " ", text).strip()[:60]
        # &amp; in an attribute is ONE ampersand, not five characters. Fetching
        # the escaped form made every Next.js /_next/image URL return 400 and
        # reported 20 perfectly healthy pages as broken.
        out.append((html_mod.unescape(h.group(1)) if h else "", text or "(no text)"))
    for m in re.finditer(r'<img\b[^>]*src="([^"]+)"', body, re.I):
        out.append((html_mod.unescape(m.group(1)), "(img)"))
    return out


def rel_of(html: str, href: str) -> str:
    esc = href.replace("&", "&amp;")
    m = (re.search(r'<a\b[^>]*href="' + re.escape(href) + r'"[^>]*>', html, re.I)
         or re.search(r'<a\b[^>]*href="' + re.escape(esc) + r'"[^>]*>', html, re.I))
    if not m:
        return ""
    r = re.search(r'rel="([^"]*)"', m.group(0))
    return r.group(1) if r else ""


class Audit:
    def __init__(self, base: str, skip_external: bool):
        self.base = base.rstrip("/")
        self.host = urllib.parse.urlparse(self.base).netloc
        self.skip_external = skip_external
        self.facts = product_facts()
        self.failures: list[dict] = []
        self.warnings: list[dict] = []
        self.commercial: list[dict] = []
        self.checked: dict[str, tuple] = {}
        self.pages: dict[str, str] = {}

    def fail(self, **kw):
        self.failures.append(kw)

    def warn(self, **kw):
        self.warnings.append(kw)

    # ---------- discovery ----------
    def routes(self) -> list[str]:
        st, _, _, body, err = fetch(f"{self.base}/sitemap.xml")
        if st != 200:
            self.fail(kind="SITEMAP", page="/sitemap.xml", detail=f"status {st} {err or ''}")
            return ["/"]
        urls = re.findall(r"<loc>([^<]+)</loc>", body.decode("utf-8", "replace"))
        paths = []
        for u in urls:
            p = urllib.parse.urlparse(u)
            if p.netloc and p.netloc != self.host:
                self.fail(kind="SITEMAP_HOST", page="/sitemap.xml", url=u,
                          detail=f"sitemap points at {p.netloc}, expected {self.host}")
            paths.append(p.path or "/")
        return sorted(set(paths))

    # ---------- per-link judgement ----------
    def check_url(self, raw: str, page: str, anchor: str, html: str):
        href = (raw or "").strip()

        if href == "":
            self.fail(kind="EMPTY_HREF", page=page, anchor=anchor,
                      detail="anchor renders as a control but has no destination")
            return
        if href in ("#", "#!"):
            self.fail(kind="HASH_HREF", page=page, anchor=anchor, url=href,
                      detail='href="#" — looks clickable, goes nowhere')
            return
        if href.startswith(("mailto:", "tel:", "#", "javascript:", "data:")):
            if href.startswith("javascript:"):
                self.fail(kind="JS_HREF", page=page, anchor=anchor, url=href,
                          detail="javascript: href")
            return

        if PLACEHOLDER.search(href):
            self.fail(kind="PLACEHOLDER", page=page, anchor=anchor, url=href,
                      detail="placeholder URL shipped to production")
            return

        absolute = urllib.parse.urljoin(self.base + page, href)
        parsed = urllib.parse.urlparse(absolute)
        if parsed.scheme not in ("http", "https"):
            self.fail(kind="BAD_SCHEME", page=page, anchor=anchor, url=href,
                      detail=f"scheme {parsed.scheme!r}")
            return
        if DEV_HOST.search(parsed.netloc) and parsed.netloc != self.host:
            self.fail(kind="DEV_HOST", page=page, anchor=anchor, url=absolute,
                      detail="localhost/staging/preview URL in production output")
            return

        internal = parsed.netloc == self.host
        is_pdf = parsed.path.lower().endswith(".pdf")
        is_amazon = bool(AMAZON.search(parsed.netloc))
        is_store = bool(STORE.search(parsed.netloc))
        is_retailer = bool(RETAILERS.search(parsed.netloc))

        # --- store links: judged PER PLATFORM ---
        if is_store:
            plat = platform_of_host(parsed.netloc)
            cfg = self.facts.get(plat or "", {})
            if not cfg.get("released"):
                self.fail(kind="STORE_LINK_WHILE_UNRELEASED", page=page, anchor=anchor,
                          url=absolute,
                          detail=f"{plat or 'unknown platform'} is not published; this link "
                                 f"promises a listing that does not exist")
                return
            # Released. Now prove the link points at OUR app, not a namesake.
            if plat == "ios":
                want = cfg.get("appleId", "")
                m = re.search(r"/id(\d+)", parsed.path)
                got = m.group(1) if m else ""
                if want and got and got != want:
                    self.fail(kind="STORE_LINK_WRONG_APP", page=page, anchor=anchor,
                              url=absolute,
                              detail=f"App Store id {got} is not ours ({want}). An app called "
                                     f"'BP Better' shares our search terms.")
                    return
            elif plat == "android":
                want = cfg.get("packageName", "")
                got = (urllib.parse.parse_qs(parsed.query).get("id") or [""])[0]
                if want and got and got != want:
                    self.fail(kind="STORE_LINK_WRONG_PACKAGE", page=page, anchor=anchor,
                              url=absolute,
                              detail=f"Play package {got!r} is not ours ({want!r})")
                    return

        # --- Amazon must carry our tag ---
        if is_amazon:
            q = urllib.parse.parse_qs(parsed.query)
            tag = (q.get("tag") or [""])[0]
            want = self.facts["amazonTag"]
            if not tag:
                self.fail(kind="AMAZON_NO_TAG", page=page, anchor=anchor, url=absolute,
                          detail="Amazon link with no Associates tag — unpaid traffic")
            elif want and tag != want:
                self.fail(kind="AMAZON_WRONG_TAG", page=page, anchor=anchor, url=absolute,
                          detail=f"tag={tag!r}, expected {want!r}")
            rel = rel_of(html, raw)
            if "sponsored" not in rel and "nofollow" not in rel:
                self.warn(kind="AFFILIATE_REL", page=page, anchor=anchor, url=absolute,
                          detail=f'rel="{rel}" — affiliate links should carry sponsored')

        if is_retailer and not AFFILIATE_PARAM.search(parsed.query):
            self.warn(kind="RETAILER_UNMONETISED", page=page, anchor=anchor, url=absolute,
                      detail="retailer link with no affiliate parameter")

        if not internal and self.skip_external and not is_pdf:
            return

        st, final, ctype, body, err = self.checked.get(absolute) or fetch(
            absolute, "GET" if (internal or is_pdf) else "HEAD")
        self.checked[absolute] = (st, final, ctype, b"", err)

        if internal:
            if st == 0 or st >= 400:
                self.fail(kind="INTERNAL_DEAD", page=page, anchor=anchor, url=absolute,
                          status=st, detail=err or f"status {st}")
            elif is_pdf and "pdf" not in ctype.lower():
                self.fail(kind="PDF_WRONG_TYPE", page=page, anchor=anchor, url=absolute,
                          detail=f"Content-Type {ctype!r}")
        else:
            if st == 0:
                self.warn(kind="EXTERNAL_UNREACHABLE", page=page, anchor=anchor,
                          url=absolute, detail=err or "no response")
            elif st in BOT_DEFENCE:
                # 403/429 from a publisher is almost always bot defence, not a
                # dead page. Verified by hand: ahajournals.org serves a
                # Cloudflare "Performing security verification" interstitial to
                # this client, and cdc.gov/nchs db511 loads perfectly in a real
                # browser while answering 403 here.
                #
                # Failing the build on those would make the gate red on every
                # run forever, and a gate that is always red gets switched off.
                # That is a worse outcome than not having one. So this is
                # reported as unverifiable and a human decides.
                self.warn(kind="CITATION_UNVERIFIABLE", page=page, anchor=anchor,
                          url=absolute, status=st,
                          detail=f"{st} to an automated client — bot defence, not "
                                 f"proof the page is gone. Check by hand if it matters.")
            elif st >= 400 and not (is_amazon or is_retailer):
                # 404/410/5xx is a real dead source on a YMYL page.
                self.fail(kind="DEAD_CITATION", page=page, anchor=anchor, url=absolute,
                          status=st, detail=f"external source returned {st}")
            elif st >= 400:
                self.warn(kind="COMMERCE_STATUS", page=page, anchor=anchor, url=absolute,
                          status=st, detail=f"merchant returned {st} (often bot defence)")

        if is_amazon or is_retailer or is_store:
            q = urllib.parse.parse_qs(parsed.query)
            asin = re.search(r"/dp/([A-Z0-9]{10})", parsed.path)
            self.commercial.append({
                "page": page, "anchor": anchor,
                "merchant": parsed.netloc,
                "product": asin.group(1) if asin else parsed.path.strip("/")[:40] or "-",
                "destination": absolute,
                "tag": (q.get("tag") or ["-"])[0],
                "status": st, "final": final,
                "rel": rel_of(html, raw) or "-",
            })

    # ---------- run ----------
    def run(self):
        routes = self.routes()
        print(f"  {len(routes)} routes from sitemap", file=sys.stderr)

        def load(r):
            st, final, ctype, body, err = fetch(f"{self.base}{r}")
            return r, st, body.decode("utf-8", "replace") if body else "", err

        with ThreadPoolExecutor(max_workers=6) as ex:
            for r, st, html, err in ex.map(load, routes):
                if st != 200:
                    self.fail(kind="ROUTE_DEAD", page=r, status=st, detail=err or f"status {st}")
                    continue
                self.pages[r] = html

        # disclosure must appear on any page carrying Amazon commerce
        for page, html in self.pages.items():
            text = re.sub(r"<[^>]+>", " ", strip_scripts(html))
            has_amazon = bool(AMAZON.search(html))
            has_disc = "Amazon Associate" in text
            if has_amazon and not has_disc:
                self.fail(kind="MISSING_DISCLOSURE", page=page,
                          detail="page carries Amazon links but no Associates disclosure")

        seen = set()
        for page, html in self.pages.items():
            for href, anchor in links_in(html):
                key = (page, href)
                if key in seen:
                    continue
                seen.add(key)
                self.check_url(href, page, anchor, html)

        self.check_store_config()
        return self

    def check_store_config(self):
        """Per-platform coherence, checked in the config rather than the HTML.

        A page can only be wrong about a platform it renders. This catches the
        state where a flag was flipped and the URL was never pasted, which
        renders no link at all and so leaves nothing in the HTML for the crawl
        half of this gate to find. It is silent, it kills the primary
        conversion, and launch day is exactly when nobody is looking at a
        linter.
        """
        for key in ("ios", "android"):
            c = self.facts[key]
            where = f"src/lib/product.ts:{key.upper()}"
            if not c["released"]:
                if c["url"]:
                    self.fail(kind="STORE_URL_WHILE_UNRELEASED", page=where, url=c["url"],
                              detail=f"{key} has a URL but released is false — one edit away "
                                     f"from shipping a link to a listing that is not public")
                continue

            if not c["url"]:
                self.fail(kind="RELEASED_NO_STORE_URL", page=where,
                          detail=f"{key}.released is true but url is empty — every download "
                                 f"button for {key} renders as a dead control")
                continue
            if not c["url"].startswith("https://"):
                self.fail(kind="STORE_URL_NOT_HTTPS", page=where, url=c["url"],
                          detail=f"{key}.url is not https")
                continue

            p = urllib.parse.urlparse(c["url"])
            if platform_of_host(p.netloc) != key:
                self.fail(kind="STORE_URL_WRONG_HOST", page=where, url=c["url"],
                          detail=f"{key}.url points at {p.netloc}, which is not that "
                                 f"platform's store")
                continue

            if key == "ios":
                m = re.search(r"/id(\d+)", p.path)
                got = m.group(1) if m else ""
                if c["appleId"] and got != c["appleId"]:
                    self.fail(kind="STORE_URL_WRONG_APP", page=where, url=c["url"],
                              detail=f"url names App Store id {got or '(none)'}, config says "
                                     f"{c['appleId']}")
                    continue
            else:
                got = (urllib.parse.parse_qs(p.query).get("id") or [""])[0]
                if c["packageName"] and got != c["packageName"]:
                    self.fail(kind="STORE_URL_WRONG_PACKAGE", page=where, url=c["url"],
                              detail=f"url names package {got or '(none)'}, config says "
                                     f"{c['packageName']}")
                    continue

            if not self.skip_external:
                st, final, _, _, err = fetch(c["url"], "GET")
                if st == 0 or st >= 400:
                    self.fail(kind="STORE_URL_DEAD", page=where, url=c["url"], status=st,
                              detail=err or f"store listing returned {st}")


def render_md(a: Audit) -> str:
    f = a.facts
    L = []
    L.append("# BPTrack link + affiliate integrity audit\n")
    L.append(f"**Base:** {a.base}  ")
    L.append(f"**Routes:** {len(a.pages)}  ")
    L.append(f"**Links checked:** {len(a.checked)}  ")
    for k in ("ios", "android"):
        c = f[k]
        state = f"LIVE {c['url']}" if (c["released"] and c["url"]) else (
            "released flag set but NO URL" if c["released"] else "not released")
        L.append(f"**{c['storeName'] or k}:** {state}  ")
    L.append(f"**Amazon tag expected:** `{f['amazonTag'] or '(none found)'}`\n")
    verdict = "PASS" if not a.failures else f"FAIL ({len(a.failures)})"
    L.append(f"## Verdict: **{verdict}**\n")

    L.append("## Commercial links\n")
    if a.commercial:
        L.append("| Source page | Anchor/CTA | Merchant | Product | Destination | Tag | HTTP | rel |")
        L.append("|---|---|---|---|---|---|---|---|")
        for c in sorted(a.commercial, key=lambda x: (x["page"], x["product"])):
            d = c["destination"]
            L.append(f"| `{c['page']}` | {c['anchor']} | {c['merchant']} | {c['product']} | "
                     f"{d[:58]}… | `{c['tag']}` | {c['status']} | {c['rel']} |")
    else:
        L.append("_None found._")
    L.append("")

    L.append("## Failures\n")
    if not a.failures:
        L.append("_None._\n")
    else:
        by = defaultdict(list)
        for x in a.failures:
            by[x["kind"]].append(x)
        for kind, items in sorted(by.items()):
            L.append(f"### {kind} ({len(items)})\n")
            for i in items:
                L.append(f"- `{i.get('page','')}` — {i.get('detail','')}"
                         + (f"  \n  `{i['url']}`" if i.get("url") else ""))
            L.append("")

    L.append("## Warnings\n")
    if not a.warnings:
        L.append("_None._")
    else:
        by = defaultdict(list)
        for x in a.warnings:
            by[x["kind"]].append(x)
        for kind, items in sorted(by.items()):
            L.append(f"- **{kind}** ×{len(items)}")
            for i in items[:6]:
                L.append(f"  - `{i.get('page','')}` {i.get('url','')[:70]}")
    return "\n".join(L) + "\n"


def self_test() -> int:
    """Prove the detectors still bite before trusting a PASS.

    A gate that has never been shown to fail is indistinguishable from a gate
    that cannot fail. Two of the checks in this very file were silently inert
    on their first run: `released` was read off a doc comment, and every URL
    was fetched with its HTML entities unescaped. Both produced confident,
    wrong output. So the gate now carries its own negative control.
    """
    APPLE_ID = "6770084204"
    PKG = "com.anvilroad.bptrack"

    def cfg(ios_rel=False, ios_url="", and_rel=False, and_url=""):
        return {
            "ios": {"released": ios_rel, "url": ios_url, "appleId": APPLE_ID,
                    "bundleId": PKG, "packageName": "", "storeName": "App Store"},
            "android": {"released": and_rel, "url": and_url, "appleId": "",
                        "bundleId": "", "packageName": PKG, "storeName": "Google Play"},
            "amazonTag": "bpcentral-20",
        }

    def run_html(html, facts):
        a = Audit("https://bptrack.app", skip_external=True)
        a.facts = facts
        for href, text in links_in(html):
            a.check_url(href, "/self-test", text, html)
        return {f["kind"] for f in a.failures}

    def run_cfg(facts):
        a = Audit("https://bptrack.app", skip_external=True)
        a.facts = facts
        a.check_store_config()
        return {f["kind"] for f in a.failures}

    checks: list[tuple[str, str, bool]] = []

    def expect(label, kind, got):
        checks.append((label, kind, kind in got))

    # --- the original defect classes -----------------------------------
    generic = (
        '<a href="">empty</a>'
        '<a href="#">hash</a>'
        '<a href="https://example.com/x">placeholder</a>'
        '<a href="http://localhost:3000/y">dev</a>'
        '<a href="https://www.amazon.com/dp/B000000000">untagged amazon</a>'
        '<a href="https://apps.apple.com/us/app/x/id6770084204">store while unreleased</a>'
        '<img src="/ok.png?a=1&amp;b=2">'
    )
    g = run_html(generic, cfg())
    for k in ("EMPTY_HREF", "HASH_HREF", "PLACEHOLDER", "DEV_HOST",
              "AMAZON_NO_TAG", "STORE_LINK_WHILE_UNRELEASED"):
        expect(k.lower().replace("_", " "), k, g)

    # --- released with no URL, per platform ----------------------------
    expect("iOS released with empty URL", "RELEASED_NO_STORE_URL",
           run_cfg(cfg(ios_rel=True, ios_url="")))
    expect("Android released with empty URL", "RELEASED_NO_STORE_URL",
           run_cfg(cfg(and_rel=True, and_url="")))

    # --- wrong app / wrong package in the CONFIG -----------------------
    expect("wrong Apple app in config", "STORE_URL_WRONG_APP",
           run_cfg(cfg(ios_rel=True,
                       ios_url="https://apps.apple.com/us/app/bp-better/id1234567890")))
    expect("wrong Android package in config", "STORE_URL_WRONG_PACKAGE",
           run_cfg(cfg(and_rel=True,
                       and_url="https://play.google.com/store/apps/details?id=com.someone.else")))

    # --- wrong app / wrong package in a RENDERED LINK ------------------
    expect("wrong Apple app in a link", "STORE_LINK_WRONG_APP",
           run_html('<a href="https://apps.apple.com/us/app/bp-better/id1234567890">x</a>',
                    cfg(ios_rel=True,
                        ios_url=f"https://apps.apple.com/us/app/bp-central/id{APPLE_ID}")))
    expect("wrong Android package in a link", "STORE_LINK_WRONG_PACKAGE",
           run_html('<a href="https://play.google.com/store/apps/details?id=com.someone.else">x</a>',
                    cfg(and_rel=True,
                        and_url=f"https://play.google.com/store/apps/details?id={PKG}")))

    # --- ONE platform live: the state a single flag could not express --
    # iOS live, Android not. An Android store link must still fail, and the
    # iOS link must NOT. Both halves matter: a gate that fails everything is
    # as useless as one that fails nothing.
    ios_only = cfg(ios_rel=True, ios_url=f"https://apps.apple.com/us/app/bp-central/id{APPLE_ID}")
    got = run_html(
        f'<a href="https://apps.apple.com/us/app/bp-central/id{APPLE_ID}">ios ok</a>'
        f'<a href="https://play.google.com/store/apps/details?id={PKG}">android too early</a>',
        ios_only)
    checks.append(("iOS live: Android link still rejected", "STORE_LINK_WHILE_UNRELEASED",
                   "STORE_LINK_WHILE_UNRELEASED" in got))
    checks.append(("iOS live: the iOS link is accepted", "(no failure)",
                   "STORE_LINK_WRONG_APP" not in got))
    checks.append(("iOS live: config passes", "(no failure)", len(run_cfg(ios_only)) == 0))

    # --- a URL sitting in config for an unreleased platform ------------
    expect("URL present while unreleased", "STORE_URL_WHILE_UNRELEASED",
           run_cfg(cfg(ios_url="https://apps.apple.com/us/app/x/id6770084204")))

    entity_ok = any("&amp;" not in h for h, _ in links_in(generic) if "ok.png" in h)
    checks.append(("HTML entity unescaping", "(decoded)", entity_ok))

    # --- the comment scanner must not eat URLs --------------------------
    # "//" appears in every https URL. A naive line-comment strip truncated
    # `url: 'https://...'` to `https:` and failed the build on a correct URL.
    sample = (
        "export const IOS = {\n"
        "  released: true,   // launch\n"
        "  url: 'https://apps.apple.com/us/app/bp-central/id6770084204',\n"
        "  appleId: '6770084204',\n"
        "};\n"
    )
    stripped = _strip_ts_comments(sample)
    checks.append(("URL survives comment stripping", "(not truncated)",
                   "id6770084204'," in stripped and "// launch" not in stripped))

    print("self-test")
    width = max(len(c[0]) for c in checks)
    for label, kind, ok in checks:
        print(f"  {'PASS' if ok else 'FAIL'}  {label:<{width}}  {kind}")
    bad = [c[0] for c in checks if not c[2]]
    if bad:
        print(f"\nDETECTORS INERT: {bad}")
        return 1
    print(f"\nall {len(checks)} detectors bite")
    return 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--self-test", action="store_true",
                    help="prove the detectors still fire, then exit")
    ap.add_argument("--base", default="https://bptrack.app")
    ap.add_argument("--skip-external", action="store_true")
    ap.add_argument("--json", default="")
    ap.add_argument("--md", default="")
    args = ap.parse_args()

    if args.self_test:
        sys.exit(self_test())

    a = Audit(args.base, args.skip_external).run()

    if args.json:
        Path(args.json).write_text(json.dumps({
            "base": a.base, "facts": a.facts,
            "routes": sorted(a.pages), "links_checked": len(a.checked),
            "failures": a.failures, "warnings": a.warnings,
            "commercial": a.commercial,
        }, indent=1), encoding="utf-8")
    md = render_md(a)
    if args.md:
        Path(args.md).write_text(md, encoding="utf-8")
    print(md)

    print(f"\nroutes={len(a.pages)} links={len(a.checked)} "
          f"commercial={len(a.commercial)} FAIL={len(a.failures)} WARN={len(a.warnings)}",
          file=sys.stderr)
    sys.exit(1 if a.failures else 0)


if __name__ == "__main__":
    main()

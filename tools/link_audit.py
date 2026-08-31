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
    """
    src = re.sub(r"/\*.*?\*/", " ", src, flags=re.S)
    return "\n".join(ln.split("//", 1)[0] for ln in src.splitlines())


def product_facts() -> dict:
    """Read the truth out of src/lib/product.ts rather than restating it here."""
    src = _strip_ts_comments((REPO / "src" / "lib" / "product.ts").read_text(encoding="utf-8"))
    def grab(key, default=""):
        m = re.search(rf"^\s*{key}:\s*'([^']*)'", src, re.M)
        return m.group(1) if m else default
    m = re.search(r"^\s*released:\s*(true|false)\s*,", src, re.M)
    if not m:
        raise SystemExit("link_audit: cannot read APP_STORE.released from product.ts")
    released = m.group(1) == "true"
    tag = ""
    mon = REPO / "src" / "lib" / "monitors.ts"
    if mon.exists():
        m = re.search(r"AMAZON_TAG\s*=\s*'([^']+)'",
                      _strip_ts_comments(mon.read_text(encoding="utf-8")))
        tag = m.group(1) if m else ""
    return {
        "released": released,
        "iosUrl": grab("iosUrl"),
        "androidUrl": grab("androidUrl"),
        "amazonTag": tag,
    }


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

        # --- store links: the direction of danger depends on release state ---
        if is_store and not self.facts["released"]:
            self.fail(kind="STORE_LINK_WHILE_UNRELEASED", page=page, anchor=anchor,
                      url=absolute,
                      detail="app is not published on any store; this link promises a "
                             "listing that does not exist")
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

        # release-state coherence
        f = self.facts
        if f["released"] and not (f["iosUrl"] or f["androidUrl"]):
            self.fail(kind="RELEASED_NO_STORE_URL", page="src/lib/product.ts",
                      detail="APP_STORE.released is true but no store URL is set")
        if f["released"]:
            for label, u in (("iosUrl", f["iosUrl"]), ("androidUrl", f["androidUrl"])):
                if u and not u.startswith("https://"):
                    self.fail(kind="STORE_URL_NOT_HTTPS", page="src/lib/product.ts",
                              url=u, detail=f"{label} is not https")
        return self


def render_md(a: Audit) -> str:
    f = a.facts
    L = []
    L.append("# BPTrack link + affiliate integrity audit\n")
    L.append(f"**Base:** {a.base}  ")
    L.append(f"**Routes:** {len(a.pages)}  ")
    L.append(f"**Links checked:** {len(a.checked)}  ")
    L.append(f"**App released:** {f['released']}  ")
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
    fake_html = (
        '<a href="">empty</a>'
        '<a href="#">hash</a>'
        '<a href="https://example.com/x">placeholder</a>'
        '<a href="http://localhost:3000/y">dev</a>'
        '<a href="https://www.amazon.com/dp/B000000000">untagged amazon</a>'
        '<a href="https://apps.apple.com/app/id123">store while unreleased</a>'
        '<img src="/ok.png?a=1&amp;b=2">'
    )
    a = Audit("https://bptrack.app", skip_external=True)
    a.facts = {"released": False, "iosUrl": "", "androidUrl": "", "amazonTag": "bpcentral-20"}
    for href, text in links_in(fake_html):
        a.check_url(href, "/self-test", text, fake_html)

    got = {f["kind"] for f in a.failures}
    want = {"EMPTY_HREF", "HASH_HREF", "PLACEHOLDER", "DEV_HOST",
            "AMAZON_NO_TAG", "STORE_LINK_WHILE_UNRELEASED"}
    missing = want - got

    # the entity case must survive as one ampersand, not five characters
    entity_ok = any("&amp;" not in h for h, _ in links_in(fake_html) if "ok.png" in h)

    print("self-test")
    for k in sorted(want):
        print(f"  {'CAUGHT ' if k in got else 'MISSED '} {k}")
    print(f"  {'OK     ' if entity_ok else 'MISSED '} HTML entity unescaping")
    if missing or not entity_ok:
        print(f"\nDETECTORS INERT: {sorted(missing) or 'entity unescaping'}")
        return 1
    print("\nall detectors bite")
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

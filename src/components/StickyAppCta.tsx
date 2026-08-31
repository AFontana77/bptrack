'use client';
import { useEffect, useRef, useState } from 'react';
import { PRODUCT, releasedPlatforms, anyReleased } from '@/lib/product';

/**
 * The mobile sticky download bar.
 *
 * It renders nothing at all while no store listing is public, which is the
 * whole reason it can be built now: there is no "temporarily point it
 * somewhere" state to get wrong. `anyReleased()` is false, so this component
 * returns null before it renders a single element.
 *
 * WHEN IT IS VISIBLE
 * Mobile widths only, after the reader has scrolled past the hero, and only
 * while no real store button is on screen. That last rule is what keeps it
 * from being obnoxious: a sticky bar duplicating a button the reader can
 * already see is pure clutter, and it is the reason most sticky CTAs feel
 * cheap. An IntersectionObserver watches every store link on the page and the
 * bar hides itself whenever one of them is in view.
 *
 * WHY IT DOES NOT COVER CONTENT
 * It is fixed to the bottom, and it adds its own height to the document's
 * bottom padding while open. Without that, a sticky bar permanently hides the
 * last ~64px of every page, which on this site is usually the footer's
 * medical disclaimer and source links. Reserving the space costs nothing and
 * means the bar never eats the one paragraph a health site most needs to keep
 * readable.
 *
 * ACCESSIBILITY
 * It is a landmark region with a label, not a bare div. The dismiss control is
 * a real button with an accessible name, dismissal persists for the session so
 * it cannot re-appear on every route change, and the whole bar sits inside the
 * safe-area inset so it clears the home indicator on a notched phone.
 */

const DISMISS_KEY = 'bpc_sticky_dismissed';
const SHOW_AFTER_PX = 600;

export function StickyAppCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // assume dismissed until storage is read
  const [storeInView, setStoreInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Read dismissal once on mount. sessionStorage throws in some privacy modes,
  // so a failure here must leave the bar hidden rather than crash the page.
  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (!anyReleased()) return;
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide while any real store link is on screen.
  useEffect(() => {
    if (!anyReleased()) return;
    const links = document.querySelectorAll('a[data-store-platform]');
    if (links.length === 0) return;
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        }
        setStoreInView(seen.size > 0);
      },
      { rootMargin: '0px 0px -80px 0px' },
    );
    links.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  const shown = anyReleased() && visible && !dismissed && !storeInView;

  // Reserve the space the bar occupies so it never sits on top of the footer.
  useEffect(() => {
    const h = shown && ref.current ? ref.current.offsetHeight : 0;
    document.body.style.paddingBottom = h ? `${h}px` : '';
    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [shown]);

  if (!anyReleased()) return null;

  const live = releasedPlatforms();
  const primary = live[0];

  return (
    <div
      ref={ref}
      role="region"
      aria-label={`Get ${PRODUCT.name}`}
      hidden={!shown}
      className="sm:hidden fixed left-0 right-0 bottom-0 z-40"
      style={{
        display: shown ? 'block' : 'none',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -2px 16px rgb(0 0 0 / 0.08)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
            {PRODUCT.name}
          </p>
          <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
            Try {PRODUCT.freeReadings} readings free
          </p>
        </div>
        <a
          href={primary.url}
          target="_blank"
          rel="noopener noreferrer"
          data-store-platform={primary.platform}
          data-placement="sticky-mobile"
          data-cta-variant="sticky"
          className="btn-primary shrink-0"
          style={{ minHeight: 44 }}
        >
          Get the app
        </a>
        <button
          type="button"
          aria-label="Dismiss the download bar"
          onClick={() => {
            setDismissed(true);
            try {
              sessionStorage.setItem(DISMISS_KEY, '1');
            } catch {
              /* a refused write just means it comes back next page. Fine. */
            }
          }}
          className="shrink-0 rounded-lg"
          style={{
            width: 44,
            height: 44,
            color: 'var(--muted-foreground)',
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

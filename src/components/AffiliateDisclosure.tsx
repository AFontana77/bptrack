import { AMAZON_DISCLOSURE } from '@/lib/monitors';

/**
 * The Amazon Associates disclosure.
 *
 * The sentence itself is fixed by the Operating Agreement, section 5, and must
 * appear clearly and prominently. It is not reworded and it is not hidden in
 * the footer of a page that carries links. Every page with an Amazon link puts
 * this above the first link, not below it.
 *
 * `variant="banner"` is the top-of-page version. `variant="inline"` is the
 * quieter one for use next to a single link further down a page.
 */
export function AffiliateDisclosure({
  variant = 'banner',
}: {
  variant?: 'banner' | 'inline';
}) {
  if (variant === 'inline') {
    return (
      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
        {AMAZON_DISCLOSURE} We only recommend monitors whose exact model number we checked against
        the AMA listing ourselves.
      </p>
    );
  }

  return (
    <aside
      aria-label="Affiliate disclosure"
      className="rounded-lg px-5 py-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
        <strong className="font-semibold">{AMAZON_DISCLOSURE}</strong>{' '}
        <span style={{ color: 'var(--muted-foreground)' }}>
          Some links on this page go to Amazon. If you buy through one, we earn a commission and you
          pay the same price. It does not change which monitors we list. Nothing is here because a
          brand paid for it, and no brand has seen this page.
        </span>
      </p>
    </aside>
  );
}

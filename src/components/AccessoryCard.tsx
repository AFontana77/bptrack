import type { Accessory } from '@/lib/monitors';
import { amazonLink } from '@/lib/monitors';

/**
 * A cuff or a tool. Deliberately smaller and plainer than MonitorCard.
 *
 * The size difference is the point. A monitor on this site has cleared two
 * checks against the AMA listing. A cuff has not, because cuffs are not
 * validated devices, and a card that looked the same would quietly borrow the
 * monitor's credibility.
 *
 * So this card shows what a cuff can actually be judged on: who makes it, the
 * arm range the maker states, and which of our monitors the maker names in its
 * own compatibility list. No price, no rating, no review count, same as
 * everywhere else on the site.
 */
export function AccessoryCard({ item }: { item: Accessory }) {
  return (
    <article
      className="rounded-xl px-6 py-6"
      style={{ border: '1px solid var(--border)', background: 'var(--background)' }}
    >
      <h3
        className="text-lg font-bold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
      >
        {item.name}
      </h3>
      {item.kind === 'cuff' ? (
        <p className="text-sm mb-4 num" style={{ color: 'var(--muted-foreground)' }}>
          Fits arms {item.range}
        </p>
      ) : null}

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
        {item.why}
      </p>

      {item.fits.length > 0 ? (
        <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
          <span className="font-medium" style={{ color: 'var(--foreground)' }}>
            {item.brand} names these monitors:
          </span>{' '}
          <span className="num">{item.fits.join(', ')}</span>. Check your own model number before
          you buy.
        </p>
      ) : null}

      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
        {item.caveat}
      </p>

      <a
        href={amazonLink(item.asin)}
        data-affiliate-brand="amazon"
        data-affiliate-network="amazon"
        data-placement="accessory-card"
        target="_blank"
        rel="nofollow noopener noreferrer sponsored"
        className="text-sm font-semibold underline underline-offset-4 inline-flex items-center min-h-[44px]"
        style={{ color: 'var(--primary)' }}
      >
        Check the {item.kind === 'cuff' ? item.model : item.name} on Amazon
      </a>
    </article>
  );
}

import type { Monitor } from '@/lib/monitors';
import { amazonLink } from '@/lib/monitors';

/**
 * A monitor recommendation.
 *
 * Deliberately text only. There is no price, no star rating and no review
 * count anywhere in here, and there must never be. Amazon only permits those
 * when they come through the Product Advertising API or the Creators API, and
 * this site uses neither. Everything shown is either a manufacturer
 * specification or a fact read off the AMA listing.
 *
 * It also avoids the usual affiliate card tricks. No Amazon orange, no
 * countdown, no "lowest price today", no fake scarcity. On a health site those
 * cost more trust than they buy clicks.
 *
 * The outbound link carries data-affiliate-brand so the existing
 * AffiliateClickTracker picks it up and pushes an affiliate_click event into
 * the GTM dataLayer.
 */
export function MonitorCard({ monitor, index }: { monitor: Monitor; index: number }) {
  const href = amazonLink(monitor.asin);

  return (
    <article
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--border)', background: 'var(--background)' }}
    >
      <div className="px-6 sm:px-8 py-7">
        {/* What this one is for. The reason to read this card and not the next. */}
        <div className="flex items-baseline gap-3 mb-4 flex-wrap">
          <span
            aria-hidden="true"
            className="text-xs font-semibold num"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="uppercase text-xs font-semibold tracking-[0.16em]"
            style={{ color: 'var(--primary)' }}
          >
            Best for {monitor.bestFor}
          </span>
        </div>

        <h3
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
        >
          {monitor.name}
        </h3>
        <p className="text-sm mb-5 num" style={{ color: 'var(--muted-foreground)' }}>
          Model {monitor.model}
        </p>

        <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
          {monitor.summary}
        </p>

        {/* Validation evidence. The whole point of the page. */}
        <div
          className="rounded-lg px-5 py-4 mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: 'var(--foreground)' }}
          >
            Why it is on this list
          </p>
          <dl className="text-sm space-y-2" style={{ color: 'var(--muted-foreground)' }}>
            <div className="flex gap-2 flex-wrap">
              <dt className="font-medium" style={{ color: 'var(--foreground)' }}>
                Tested against:
              </dt>
              <dd className="num">{monitor.protocol}</dd>
            </div>
            <div className="flex gap-2 flex-wrap">
              <dt className="font-medium" style={{ color: 'var(--foreground)' }}>
                Listed for:
              </dt>
              <dd>{monitor.populations}</dd>
            </div>
            <div className="flex gap-2 flex-wrap">
              <dt className="font-medium" style={{ color: 'var(--foreground)' }}>
                Connects:
              </dt>
              <dd>{monitor.connectivity}</dd>
            </div>
          </dl>
          <a
            href={monitor.vdlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 inline-flex items-center min-h-[36px] mt-2"
            style={{ color: 'var(--primary)' }}
          >
            Check this model on the AMA listing
          </a>
        </div>

        {/* Cuff sizes. The single most common reason home readings are wrong. */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.14em] mb-3"
          style={{ color: 'var(--foreground)' }}
        >
          Cuff sizes
        </p>
        <ul className="text-sm space-y-2 mb-6" style={{ color: 'var(--muted-foreground)' }}>
          {monitor.cuffs.map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden="true" style={{ color: 'var(--primary)' }}>
                &middot;
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        {/* Every card names a real drawback. */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.14em] mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          The trade off
        </p>
        <p className="text-sm leading-relaxed mb-7" style={{ color: 'var(--muted-foreground)' }}>
          {monitor.tradeoff}
        </p>

        <a
          {...{
            href,
            'data-affiliate-brand': 'amazon',
            'data-affiliate-network': 'amazon',
          }}
          target="_blank"
          rel="nofollow noopener noreferrer sponsored"
          className="btn-primary w-full sm:w-auto"
        >
          Check the {monitor.model} on Amazon
        </a>
        <p className="text-xs mt-3" style={{ color: 'var(--muted-foreground)' }}>
          Affiliate link. It opens the {monitor.model} listing on Amazon. We earn a commission if
          you buy, at no extra cost to you.
        </p>
      </div>
    </article>
  );
}

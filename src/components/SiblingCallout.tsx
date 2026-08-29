import { SIBLING } from '@/lib/product';

/**
 * A link to BP Monitor Lab, the sister property.
 *
 * Two properties, two jobs. This site owns what you do with the numbers: the
 * log, the history, the averages, the summary you hand over at an appointment.
 * BP Monitor Lab owns the hardware, model by model. Sending a reader there when
 * the hardware question is the real question is better than writing a thinner
 * second version of a page that already exists.
 *
 * We say we own it. The alternative is a link that looks like a neutral
 * recommendation and is not one, which is the shady version of a useful thing.
 *
 * `data-owned-property` makes the click land in GA4 as `owned_property_click`
 * rather than `outbound_click`. That matters: without it, routing a reader to
 * our own site is recorded as commercial intent leaking off the estate, which
 * is the opposite of what happened.
 */
export function SiblingCallout({
  question,
  deepLink,
  deepLinkLabel,
  placement = 'sibling-callout',
}: {
  /** The reader's actual question, in their words. */
  question: string;
  /** Path on the sister site, when a specific page answers it better. */
  deepLink?: string;
  deepLinkLabel?: string;
  placement?: string;
}) {
  const href = deepLink ? `${SIBLING.url}${deepLink}` : SIBLING.url;

  return (
    <aside
      aria-label="Related guidance on our sister site"
      className="rounded-xl px-6 py-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
        {question}
      </p>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
        {SIBLING.owns} {SIBLING.relationship}
      </p>
      <a
        href={href}
        data-owned-property="bpmonitorlab.com"
        data-placement={placement}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold underline underline-offset-4 inline-flex items-center min-h-[44px]"
        style={{ color: 'var(--primary)' }}
      >
        {deepLinkLabel || `Open ${SIBLING.name}`}
      </a>
    </aside>
  );
}

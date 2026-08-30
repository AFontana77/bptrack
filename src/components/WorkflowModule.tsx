import Link from 'next/link';
import { WORKFLOW } from '@/lib/workflow';
import { SIBLING } from '@/lib/product';
import { StepMark } from '@/components/graphics/Illustrations';

/**
 * The eight-step home blood pressure workflow, as a navigation module.
 *
 * This is the homepage's main job. Before it, the site's purpose had to be
 * inferred from a features list and a nav bar: someone landing from a search
 * for "cuff size chart" had no way to see that the site is a sequence, or
 * where the page they landed on sits inside it.
 *
 * It is a plain ordered list of links, not a carousel and not an accordion.
 * The whole point is that a reader can see all eight at once and pick the one
 * they are stuck on, which is exactly what a component that hides seven of
 * them prevents.
 *
 * `<ol>` because the order is the meaning. Screen readers announce the count,
 * which is genuinely useful here: "list of 8 items" tells you how long the
 * process is before you start reading it.
 */
export function WorkflowModule({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {WORKFLOW.map((s) => (
        <li key={s.n}>
          <Link
            href={s.href}
            className="group flex gap-4 rounded-xl px-5 py-5 h-full transition-colors"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--background)',
              minHeight: 44,
            }}
          >
            <StepMark n={s.n} />
            <span className="min-w-0">
              <span
                className="font-display font-bold block mb-1"
                style={{ color: 'var(--foreground)', fontSize: '1.0625rem' }}
              >
                {s.title}
              </span>
              {!compact ? (
                <span
                  className="text-sm leading-relaxed block mb-2"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {s.body}
                </span>
              ) : null}
              <span
                className="text-sm font-semibold underline underline-offset-4"
                style={{ color: 'var(--primary)' }}
              >
                {s.cta}
              </span>
            </span>
          </Link>

          {/* Sibling routing sits OUTSIDE the card link. Nesting an anchor
              inside another anchor is invalid and the browser drops one of
              them, which is how a cross-property link silently stops working. */}
          {!compact && s.sibling ? (
            <p className="text-xs mt-2 px-1" style={{ color: 'var(--muted-foreground)' }}>
              <a
                href={`${SIBLING.url}${s.sibling.path}`}
                data-owned-property="bpmonitorlab.com"
                data-placement={`workflow-step-${s.n}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 inline-flex items-center min-h-[32px]"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {s.sibling.label}
              </a>
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/**
 * The "you are here" strip for the foot of a step page.
 *
 * Gives every workflow page a real next step instead of dumping the reader at
 * the footer, which is where an authority site quietly loses people who were
 * willing to keep going.
 */
export function NextStepStrip({ current }: { current: string }) {
  const i = WORKFLOW.findIndex((s) => s.href === current);
  if (i < 0) return null;
  const step = WORKFLOW[i];
  const next = WORKFLOW[i + 1];

  return (
    <aside
      aria-label="Where this fits"
      className="rounded-xl px-6 py-5"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--muted-foreground)' }}>
        Step {step.n} of {WORKFLOW.length} &middot; {step.title}
      </p>
      {next ? (
        <>
          <p className="mb-3" style={{ color: 'var(--foreground)' }}>
            <strong className="font-semibold">Next: {next.title}.</strong>{' '}
            <span style={{ color: 'var(--muted-foreground)' }}>{next.body}</span>
          </p>
          <Link
            href={next.href}
            className="text-sm font-semibold underline underline-offset-4 inline-flex items-center min-h-[44px]"
            style={{ color: 'var(--primary)' }}
          >
            {next.cta}
          </Link>
        </>
      ) : (
        <p style={{ color: 'var(--muted-foreground)' }}>
          That is the whole loop. From here it repeats, and the history is the point.{' '}
          <Link href="/" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
            Back to the start
          </Link>
          .
        </p>
      )}
    </aside>
  );
}

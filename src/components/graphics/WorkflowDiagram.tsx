import Link from 'next/link';
import { WORKFLOW } from '@/lib/workflow';

/**
 * The eight steps, drawn as a flow.
 *
 * WHY THIS EXISTS WHEN A LINK GRID ALREADY DOES
 * At M2.1 I argued the workflow was better as a navigable list than as a
 * picture, and for *navigation* that is still true - the card grid on the
 * homepage does that job. This drawing earns its place by showing the one
 * thing the grid cannot: the shape of the process.
 *
 * Steps 1 to 3 are setup. You choose a monitor, measure your arm and learn to
 * sit properly ONCE. Steps 4 to 8 are a loop you run every time, and the value
 * is entirely in repeating it. A grid of eight equal cards implies eight equal
 * one-off tasks, which is the wrong mental model and the reason people take
 * three readings in January and stop.
 *
 * HOW IT STAYS ACCESSIBLE AND RESPONSIVE
 * The SVG carries only the numbered nodes, the track and the return arc -
 * things whose meaning is positional. Every word is real HTML underneath, in an
 * ordered list, so the steps are selectable, translatable, linkable and
 * readable by a screen reader in the right order. The SVG is aria-hidden
 * because reading it aloud would produce eight numbers and no sense.
 *
 * At 320px eight labels across would be unreadable, which is exactly why the
 * labels are not in the drawing.
 *
 * WITHOUT COLOUR
 * The two phases are separated by position and by a bracket, not by hue, and
 * each node carries its number. It reads in monochrome.
 */

const SETUP_STEPS = 3; // steps 1-3 are done once

export function WorkflowDiagram({ className = '' }: { className?: string }) {
  const n = WORKFLOW.length;
  const W = 320;
  const padX = 14;
  const gap = (W - padX * 2) / (n - 1);
  const cx = (i: number) => padX + i * gap;
  const trackY = 40;
  const splitX = (cx(SETUP_STEPS - 1) + cx(SETUP_STEPS)) / 2;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 320 92"
        aria-hidden="true"
        focusable="false"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* the track */}
        <line x1={cx(0)} y1={trackY} x2={cx(n - 1)} y2={trackY} stroke="var(--border)" strokeWidth="2" />

        {/* the loop: step 8 returns to step 4, which is the whole point */}
        <path
          d={`M ${cx(n - 1)} ${trackY + 9} C ${cx(n - 1)} ${trackY + 30}, ${cx(SETUP_STEPS)} ${trackY + 30}, ${cx(SETUP_STEPS)} ${trackY + 9}`}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1.6"
          strokeDasharray="4 3"
        />
        <path
          d={`M ${cx(SETUP_STEPS) - 3.5} ${trackY + 13} L ${cx(SETUP_STEPS)} ${trackY + 7} L ${cx(SETUP_STEPS) + 3.5} ${trackY + 13} Z`}
          fill="var(--primary)"
        />

        {/* phase brackets, above the track */}
        {[
          { from: cx(0), to: cx(SETUP_STEPS - 1), y: trackY - 20 },
          { from: cx(SETUP_STEPS), to: cx(n - 1), y: trackY - 20 },
        ].map((b) => (
          <path
            key={b.from}
            d={`M ${b.from} ${b.y + 6} L ${b.from} ${b.y} L ${b.to} ${b.y} L ${b.to} ${b.y + 6}`}
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
        ))}
        <line x1={splitX} y1={trackY - 24} x2={splitX} y2={trackY + 24} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 3" />

        {/* the nodes */}
        {WORKFLOW.map((s, i) => (
          <g key={s.n}>
            <circle
              cx={cx(i)}
              cy={trackY}
              r="9"
              fill={i < SETUP_STEPS ? 'var(--surface)' : 'var(--brand-tint)'}
              stroke={i < SETUP_STEPS ? 'var(--border)' : 'var(--brand-tint-border)'}
              strokeWidth="1.5"
            />
            <text
              x={cx(i)}
              y={trackY + 3.4}
              textAnchor="middle"
              fontSize="9"
              fontWeight="700"
              fill={i < SETUP_STEPS ? 'var(--muted-foreground)' : 'var(--primary)'}
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {s.n}
            </text>
          </g>
        ))}
      </svg>

      {/* Phase captions, in HTML so they are real text. */}
      <div className="grid grid-cols-2 gap-4 mt-3 mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--muted-foreground)' }}>
          Steps 1&ndash;{SETUP_STEPS}: once, at the start
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-right sm:text-left" style={{ color: 'var(--primary)' }}>
          Steps {SETUP_STEPS + 1}&ndash;{n}: the loop that repeats
        </p>
      </div>

      {/* The steps themselves. Real list, real links, correct reading order. */}
      <ol className="space-y-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {WORKFLOW.map((s, i) => (
          <li key={s.n}>
            <Link
              href={s.href}
              className="flex gap-3 items-baseline rounded-lg px-3 py-2 min-h-[44px]"
              style={{ border: '1px solid transparent' }}
            >
              <span
                aria-hidden="true"
                className="num tabular-nums shrink-0 text-sm font-bold"
                style={{ width: 18, color: i < SETUP_STEPS ? 'var(--muted-foreground)' : 'var(--primary)' }}
              >
                {s.n}
              </span>
              <span>
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{s.title}</span>
                <span className="text-sm block" style={{ color: 'var(--muted-foreground)' }}>{s.cta}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="text-sm leading-relaxed mt-5" style={{ color: 'var(--muted-foreground)' }}>
        The first three you do once. The last five are a loop, and the value is in going round it
        again: one reading tells you very little, and thirty tell you something.
      </p>
    </div>
  );
}

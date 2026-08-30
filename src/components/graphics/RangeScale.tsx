import { BP_CATEGORIES } from '@/lib/product';

/**
 * The AHA categories, drawn as two independent scales.
 *
 * WHY A PICTURE AT ALL
 * The table already lists the numbers, and a graphic that only repeats a table
 * is decoration. This one earns its place by showing what a table cannot:
 * systolic and diastolic are two separate scales, their bands do not line up,
 * and a reading can therefore sit in two different rows at once. That is the
 * most-asked question on this subject ("is 140 over 70 bad?").
 *
 * EVERY VALUE COMES FROM BP_CATEGORIES
 * Nothing is hard-coded. Change a threshold and the table, the calculator and
 * this drawing all move together.
 *
 * THE BUG THIS VERSION FIXES
 * The first draft drew all five categories on both scales. On the diastolic
 * axis that put Elevated (diastolic under 80) exactly on top of Normal
 * (diastolic under 80) at identical coordinates, hiding Normal completely and
 * implying Elevated owns the whole low end of the diastolic scale. It does not:
 * Elevated has no diastolic band of its own, because it is defined as a
 * systolic of 120-129 WITH a normal diastolic. A category that adds no distinct
 * band on an axis is now skipped on that axis, which is the honest drawing and
 * happens to be the exact point the graphic exists to make.
 *
 * ACCESSIBILITY
 * The scales are aria-hidden; the same values are in the visible table beside
 * them, where they have structure. The row labels are real HTML, not SVG text,
 * so they are selectable and translatable. Only the axis tick numbers live in
 * the SVG, because their meaning is positional.
 */

const TONE: Record<string, string> = {
  normal: 'var(--status-normal)',
  elevated: 'var(--status-elevated)',
  stage1: 'var(--primary)',
  stage2: 'var(--primary-dark)',
  crisis: 'var(--primary-dark)',
};

type Axis = 'sys' | 'dia';

/** Bands that are genuinely distinct on this axis, in draw order. */
function bandsFor(axis: Axis) {
  const out: { label: string; tone: string; from: number; to: number }[] = [];
  for (const c of BP_CATEGORIES) {
    const from = axis === 'sys' ? c.sysMin : c.diaMin;
    const to = axis === 'sys' ? c.sysMax : c.diaMax;
    const prev = out[out.length - 1];
    // Skip a category that occupies the same span as the one before it on this
    // axis. On diastolic that is Elevated, which shares Normal's range.
    if (prev && prev.from === from && prev.to === to) continue;
    out.push({ label: c.label, tone: c.tone, from, to });
  }
  return out;
}

function Scale({ axis, lo, hi }: { axis: Axis; lo: number; hi: number }) {
  const W = 300;
  const span = hi - lo;
  const x = (v: number) => ((Math.min(Math.max(v, lo), hi) - lo) / span) * W;
  const bands = bandsFor(axis);

  return (
    <svg viewBox="-6 -16 312 40" aria-hidden="true" focusable="false" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {bands.map((b) => {
        const x1 = x(b.from);
        const x2 = x(b.to);
        if (x2 - x1 < 0.5) return null;
        return (
          <rect
            key={b.label}
            x={x1}
            y={0}
            width={x2 - x1}
            height={16}
            fill={TONE[b.tone] ?? 'var(--muted-foreground)'}
            opacity={b.tone === 'normal' ? 0.5 : 0.85}
          />
        );
      })}
      {bands.slice(1).map((b) => {
        if (b.from <= lo || b.from >= hi) return null;
        return (
          <g key={b.label}>
            <line x1={x(b.from)} y1={-2} x2={x(b.from)} y2={18} stroke="var(--background)" strokeWidth="2" />
            <text
              x={x(b.from)}
              y={-5}
              textAnchor="middle"
              fontSize="9"
              fill="var(--muted-foreground)"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {b.from}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RangeScale({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--foreground)' }}>
        Top number, systolic
      </p>
      <Scale axis="sys" lo={90} hi={190} />

      <p className="text-xs font-semibold uppercase tracking-[0.12em] mt-7 mb-2" style={{ color: 'var(--foreground)' }}>
        Bottom number, diastolic
      </p>
      <Scale axis="dia" lo={50} hi={130} />
    </div>
  );
}

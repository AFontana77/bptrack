'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CUFF_SIZES, MONITORS, ACCESSORIES, EXTRA_LARGE_ARM } from '@/lib/monitors';

/**
 * Arm circumference in, cuff size out.
 *
 * PRIVACY
 * Same discipline as the average calculator. The measurement is held in React
 * state, matched in the browser, and thrown away when the tab closes. No fetch,
 * no storage, no form post. The one analytics event carries the unit and a
 * coarse category label - never the number the person typed.
 *
 * An arm circumference is less sensitive than a blood pressure reading, but it
 * is still a measurement of somebody's body and there is no reason for it to
 * leave the device to do a table lookup.
 *
 * WHAT IT IS ALLOWED TO SAY
 * Which published cuff range a measurement falls in, and which of OUR monitors
 * and OUR verified OEM cuffs state a range that covers it. Both come from the
 * same canonical data the rest of the site uses.
 *
 * WHAT IT MUST NEVER DO
 * Diagnose. Promise a reading will be accurate. Recommend a cuff for a monitor
 * the manufacturer does not name. Infer that a third-party "fits most" cuff
 * will work. Or imply more precision than a tape measure and a published range
 * can support - which is why it warns near a boundary instead of pretending the
 * edge is sharp.
 */

type Unit = 'in' | 'cm';

/** Parse the inch range out of a canonical CUFF_SIZES row, e.g. "12.2 to 17.7 in". */
function inchBounds(inches: string): [number, number] {
  const m = inches.match(/([\d.]+)\s*to\s*([\d.]+)/);
  return m ? [parseFloat(m[1]), parseFloat(m[2])] : [0, 0];
}

/** Same, for any "8.6 to 16.5 in (22 to 42 cm)" style description. */
function inchesFromText(t: string): [number, number] | null {
  const m = t.match(/([\d.]+)\s*to\s*([\d.]+)\s*in/);
  return m ? [parseFloat(m[1]), parseFloat(m[2])] : null;
}

const EDGE_IN = 0.6; // how close to a boundary counts as "near the edge"

export function CuffSizeHelper() {
  const [unit, setUnit] = useState<Unit>('in');
  const [raw, setRaw] = useState('');

  const result = useMemo(() => {
    const n = parseFloat(raw);
    if (!raw.trim() || !Number.isFinite(n) || n <= 0) return null;

    const inches = unit === 'in' ? n : n / 2.54;
    // A plausibility window, not a judgement. Stops a typo returning nonsense.
    if (inches < 4 || inches > 30) return { tooOdd: true, inches } as const;

    const bands = CUFF_SIZES.map((c) => {
      const [lo, hi] = inchBounds(c.inches);
      return { ...c, lo, hi, fits: inches >= lo && inches <= hi };
    });
    const fitting = bands.filter((b) => b.fits);

    // Near a boundary of any band it fits, or of the band it just missed.
    const nearEdge = bands.some(
      (b) =>
        (Math.abs(inches - b.lo) <= EDGE_IN || Math.abs(inches - b.hi) <= EDGE_IN) &&
        b.hi > 0,
    );

    const monitors = MONITORS.filter((m) =>
      m.cuffs.some((c) => {
        if (!/Comes with/i.test(c)) return false;
        const b = inchesFromText(c);
        return b ? inches >= b[0] && inches <= b[1] : false;
      }),
    );

    const cuffs = ACCESSORIES.filter((a) => {
      if (a.kind !== 'cuff') return false;
      const b = inchesFromText(a.range);
      return b ? inches >= b[0] && inches <= b[1] : false;
    });

    const aboveEverything = fitting.length === 0 && inches > Math.max(...bands.map((b) => b.hi));

    return { tooOdd: false, inches, bands, fitting, nearEdge, monitors, cuffs, aboveEverything } as const;
  }, [raw, unit]);

  /* Usage event. Unit and a coarse category only, never the measurement. */
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || !result || result.tooOdd) return;
    const t = setTimeout(() => {
      if (fired.current) return;
      fired.current = true;
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: 'cuff_size_helper_used',
        unit,
        // The band label is coarse enough to be useful and not a body
        // measurement. The number itself never appears here.
        result_category: result.fitting?.[0]?.label ?? (result.aboveEverything ? 'Above published ranges' : 'No match'),
        source_path: window.location.pathname,
      });
    }, 2000);
    return () => clearTimeout(t);
  }, [result, unit]);

  const inputId = 'cuff-arm-measurement';

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
      <div className="px-5 sm:px-7 py-7">
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Which cuff size do you need?
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
          Measure around the middle of your bare upper arm, then type it in. It runs in your
          browser and your measurement is not sent anywhere.
        </p>

        <fieldset className="mb-4" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="text-xs font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--foreground)' }}>
            Units
          </legend>
          <div className="flex gap-2">
            {(['in', 'cm'] as Unit[]).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                aria-pressed={unit === u}
                className="rounded-lg px-4 text-sm font-semibold"
                style={{
                  minHeight: 44,
                  border: '1px solid var(--border)',
                  background: unit === u ? 'var(--brand-tint)' : 'var(--background)',
                  color: unit === u ? 'var(--primary)' : 'var(--muted-foreground)',
                }}
              >
                {u === 'in' ? 'Inches' : 'Centimetres'}
              </button>
            ))}
          </div>
        </fieldset>

        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-[0.12em] block mb-2" style={{ color: 'var(--foreground)' }}>
          Arm measurement, {unit === 'in' ? 'inches' : 'centimetres'}
        </label>
        <input
          id={inputId}
          inputMode="decimal"
          autoComplete="off"
          value={raw}
          onChange={(e) => setRaw(e.target.value.replace(/[^0-9.]/g, '').slice(0, 5))}
          placeholder={unit === 'in' ? 'e.g. 13.5' : 'e.g. 34'}
          className="w-full rounded-lg px-3 num tabular-nums"
          style={{
            minHeight: 48,
            fontSize: 16,
            border: '1px solid var(--border)',
            background: 'var(--background)',
            color: 'var(--foreground)',
          }}
        />

        <div
          className="mt-6 rounded-xl px-5 py-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          aria-live="polite"
        >
          {!result ? (
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Type your measurement and the matching cuff size appears here.
            </p>
          ) : result.tooOdd ? (
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              That does not look like an upper arm measurement. Check the units, and measure around
              the arm rather than along it.
            </p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--muted-foreground)' }}>
                {result.fitting.length ? 'Cuff sizes that cover you' : 'No published size covers that'}
              </p>

              {result.fitting.length > 0 ? (
                <ul className="mb-4 space-y-2">
                  {result.fitting.map((b) => (
                    <li key={b.label} className="flex justify-between gap-4 text-sm">
                      <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{b.label}</span>
                      <span className="num text-right" style={{ color: 'var(--muted-foreground)' }}>
                        {b.inches} &middot; {b.cm}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {result.fitting.length > 1 ? (
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                  More than one covers you, which is normal: the published ranges overlap because
                  different makers cut their cuffs differently. Any of them is a reasonable fit.
                </p>
              ) : null}

              {result.aboveEverything ? (
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground)' }}>
                  That is above every published range on this page, including extra large. This is
                  the situation where home readings go wrong most, and it is worth reading the
                  detail before buying anything.
                </p>
              ) : null}

              {result.nearEdge ? (
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--foreground)' }}>
                  <strong>You are close to the edge of a range.</strong> Measure once more before
                  you buy. If you are genuinely on a boundary, size up rather than down: a cuff
                  that is too small reads high, and by more than one that is too big reads low.
                </p>
              ) : null}

              {result.monitors.length > 0 ? (
                <div className="mb-3">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                    Monitors on our list whose included cuff covers it
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    {result.monitors.map((m) => m.name).join(', ')}.
                  </p>
                </div>
              ) : null}

              {result.cuffs.length > 0 ? (
                <div className="mb-3">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                    Separate cuffs whose maker states this range
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    {result.cuffs.map((c) => `${c.model} (fits ${c.fits.join(', ')})`).join('; ')}.
                    Check your own monitor&rsquo;s model number before you buy.
                  </p>
                </div>
              ) : null}

              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                This is a table lookup against published ranges, not a promise about accuracy. The
                right cuff makes a correct reading possible; it does not make one certain.
              </p>
            </>
          )}
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
          Not sure how to measure?{' '}
          <Link href="/blood-pressure-cuff-size" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
            The full method is here
          </Link>
          . Arm bigger than {EXTRA_LARGE_ARM.threshold}?{' '}
          <Link href="/extra-large-blood-pressure-cuff" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
            Read this first
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BP_CATEGORIES, SMBP_PROTOCOL, AHA_SOURCE } from '@/lib/product';

/**
 * The blood pressure average calculator.
 *
 * PRIVACY, AND WHY THIS FILE HAS NO NETWORK CODE
 * Every number a person types here is a blood pressure reading, which is health
 * information about them. It is held in React state, averaged in the browser,
 * and thrown away when the tab closes. There is no fetch, no form POST, no
 * localStorage, and no analytics event carrying a value. The GA4 event this
 * page fires records that the calculator was USED and how many readings were
 * entered. It never carries a reading.
 *
 * If you are editing this file: do not add a "save my readings" feature here.
 * Saving readings is what the app is for, and the app asks for consent and
 * stores them on the person's own device.
 *
 * WHAT IT IS ALLOWED TO DO
 * Arithmetic. It adds up the systolic column, adds up the diastolic column,
 * divides each by the count, and rounds. That is the whole calculation.
 *
 * It also names the AHA range the average falls in, which is a lookup, not a
 * judgement. The wording under the result says so in plain words, because
 * "your average is 142/91, Stage 2" reads like a diagnosis to a worried person
 * unless something tells them otherwise.
 *
 * WHAT IT MUST NEVER DO
 * Diagnose. Recommend or adjust medication. Estimate risk. Tell someone whether
 * their treatment is working. Decide whether a reading is an emergency.
 */

type Row = { sys: string; dia: string };

const BLANK: Row = { sys: '', dia: '' };
const START_ROWS = 4;

/** AHA categories, in the order a reading escalates. Source: BP_CATEGORIES. */
function categoryFor(sys: number, dia: number): { label: string; tone: string } {
  // Crisis is checked first because it is defined by EITHER number, and it
  // outranks everything below it.
  if (sys > 180 || dia > 120) return { label: 'Crisis range', tone: 'crisis' };
  if (sys >= 140 || dia >= 90) return { label: 'High, stage 2', tone: 'stage2' };
  if (sys >= 130 || dia >= 80) return { label: 'High, stage 1', tone: 'stage1' };
  if (sys >= 120) return { label: 'Elevated', tone: 'elevated' };
  return { label: 'Normal', tone: 'normal' };
}

const TONE_COLOR: Record<string, string> = {
  normal: 'var(--status-normal)',
  elevated: 'var(--status-elevated)',
  stage1: 'var(--primary)',
  stage2: 'var(--primary)',
  crisis: 'var(--primary-dark)',
};

export function AverageCalculator() {
  const [rows, setRows] = useState<Row[]>(() => Array.from({ length: START_ROWS }, () => ({ ...BLANK })));
  const [touched, setTouched] = useState(false);

  const parsed = useMemo(() => {
    const good: { sys: number; dia: number }[] = [];
    let partial = 0;
    let outOfRange = 0;

    for (const r of rows) {
      const s = r.sys.trim();
      const d = r.dia.trim();
      if (!s && !d) continue;
      if (!s || !d) {
        partial += 1;
        continue;
      }
      const sys = Number(s);
      const dia = Number(d);
      if (!Number.isFinite(sys) || !Number.isFinite(dia)) {
        partial += 1;
        continue;
      }
      // A plausibility window, not a medical judgement. It exists so a typo
      // like 1220 does not silently drag an average somewhere impossible.
      if (sys < 50 || sys > 300 || dia < 30 || dia > 200) {
        outOfRange += 1;
        continue;
      }
      good.push({ sys, dia });
    }

    if (!good.length) return { count: 0, partial, outOfRange, avgSys: 0, avgDia: 0 };

    const avgSys = Math.round(good.reduce((a, b) => a + b.sys, 0) / good.length);
    const avgDia = Math.round(good.reduce((a, b) => a + b.dia, 0) / good.length);
    return { count: good.length, partial, outOfRange, avgSys, avgDia };
  }, [rows]);

  const update = (i: number, key: keyof Row, v: string) => {
    // Digits only. Keeps the parser simple and stops a pasted "120/80" from
    // landing in one box and averaging as 12080.
    const clean = v.replace(/[^0-9]/g, '').slice(0, 3);
    setRows((prev) => prev.map((r, n) => (n === i ? { ...r, [key]: clean } : r)));
    if (!touched) setTouched(true);
  };

  const addRow = () => setRows((prev) => [...prev, { ...BLANK }]);
  const addDay = () => setRows((prev) => [...prev, ...Array.from({ length: 4 }, () => ({ ...BLANK }))]);
  const reset = () => {
    setRows(Array.from({ length: START_ROWS }, () => ({ ...BLANK })));
    setTouched(false);
  };

  /**
   * Usage measurement.
   *
   * Fires once per page view, the first time a complete reading produces an
   * average. It carries `reading_count` and NOTHING ELSE. A count is how many
   * readings someone had; it is not a reading, and it cannot be turned back
   * into one. No systolic value, no diastolic value, no average, no category
   * ever goes into this event.
   *
   * If you are tempted to add `average_systolic` to see the distribution: that
   * is a person's blood pressure in an analytics property, and the whole point
   * of this component is that it never leaves their browser.
   */
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || parsed.count < 1) return;
    // Debounced, so the count is what someone actually entered rather than 1.
    // Firing on the first complete row would report reading_count: 1 for every
    // session on earth, which measures nothing. Waiting for typing to settle
    // reports whether people bring 3 readings or 28, which is the only thing
    // worth knowing about this tool.
    const t = setTimeout(() => {
      if (fired.current) return;
      fired.current = true;
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: 'bp_average_calculator_used',
        reading_count: parsed.count,
        source_path: window.location.pathname,
      });
    }, 2500);
    return () => clearTimeout(t);
  }, [parsed.count]);

  const done = parsed.count > 0;
  const cat = done ? categoryFor(parsed.avgSys, parsed.avgDia) : null;

  const enough =
    parsed.count >= SMBP_PROTOCOL.optimalReadings
      ? 'optimal'
      : parsed.count >= SMBP_PROTOCOL.minimumReadings
        ? 'minimum'
        : 'short';

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--border)', background: 'var(--background)' }}
    >
      <div className="px-5 sm:px-7 py-7">
        <h2
          className="font-display text-2xl font-bold mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          Work out your average
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
          Type in the readings you have. Everything happens in your browser. Your numbers are not
          sent anywhere, not saved, and not shared with us.
        </p>

        <div className="grid grid-cols-[2rem_1fr_1fr] gap-2 sm:gap-3 mb-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] self-end pb-1" style={{ color: 'var(--muted-foreground)' }}>
            #
          </span>
          <label className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--foreground)' }}>
            Top number
          </label>
          <label className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--foreground)' }}>
            Bottom number
          </label>
        </div>

        <div className="space-y-2">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[2rem_1fr_1fr] gap-2 sm:gap-3 items-center">
              <span className="text-sm num tabular-nums" style={{ color: 'var(--muted-foreground)' }}>
                {i + 1}
              </span>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                value={r.sys}
                onChange={(e) => update(i, 'sys', e.target.value)}
                aria-label={`Reading ${i + 1}, top number, systolic`}
                placeholder="120"
                className="w-full rounded-lg px-3 num tabular-nums"
                style={{
                  minHeight: 48,
                  border: '1px solid var(--border)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  fontSize: 16,
                }}
              />
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                value={r.dia}
                onChange={(e) => update(i, 'dia', e.target.value)}
                aria-label={`Reading ${i + 1}, bottom number, diastolic`}
                placeholder="80"
                className="w-full rounded-lg px-3 num tabular-nums"
                style={{
                  minHeight: 48,
                  border: '1px solid var(--border)',
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  fontSize: 16,
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <button type="button" onClick={addRow} className="btn-ghost" style={{ minHeight: 44 }}>
            Add a reading
          </button>
          <button type="button" onClick={addDay} className="btn-ghost" style={{ minHeight: 44 }}>
            Add a day (4)
          </button>
          {touched ? (
            <button type="button" onClick={reset} className="btn-ghost" style={{ minHeight: 44 }}>
              Clear
            </button>
          ) : null}
        </div>

        {/* Result. aria-live so a screen reader hears the average update. */}
        <div
          className="mt-7 rounded-xl px-5 py-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          aria-live="polite"
        >
          {!done ? (
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Enter at least one complete reading, both numbers, and the average appears here.
            </p>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--muted-foreground)' }}>
                Average of {parsed.count} reading{parsed.count === 1 ? '' : 's'}
              </p>
              <p
                className="font-display font-bold num tabular-nums leading-none mb-4"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 3.75rem)', color: 'var(--foreground)' }}
              >
                {parsed.avgSys}
                <span style={{ color: 'var(--muted-foreground)' }}>/</span>
                {parsed.avgDia}
                <span className="text-lg font-normal ml-2" style={{ color: 'var(--muted-foreground)' }}>
                  mmHg
                </span>
              </p>

              {cat ? (
                <p className="text-base mb-4" style={{ color: 'var(--foreground)' }}>
                  On the American Heart Association chart that average sits in{' '}
                  <strong style={{ color: TONE_COLOR[cat.tone] ?? 'var(--foreground)' }}>
                    {cat.label}
                  </strong>
                  .
                </p>
              ) : null}

              {/* The most important sentence on the page. */}
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                That is arithmetic and a lookup, nothing more. It is not a diagnosis, it does not
                say whether any treatment is working, and it cannot tell you what to do next. Take
                the number to a doctor or another health professional. They are the only people who
                can say what it means for you.
              </p>

              {enough === 'short' ? (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  You have {parsed.count} of the {SMBP_PROTOCOL.minimumReadings} readings the AHA
                  and AMA describe as a minimum useful set. An average over fewer readings moves a
                  lot when you add one more.
                </p>
              ) : enough === 'minimum' ? (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {parsed.count} readings clears the {SMBP_PROTOCOL.minimumReadings} the AHA and AMA
                  describe as a minimum. {SMBP_PROTOCOL.optimalReadings} over{' '}
                  {SMBP_PROTOCOL.optimalDays} days is the fuller picture.
                </p>
              ) : (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {parsed.count} readings is at or above the {SMBP_PROTOCOL.optimalReadings} that
                  the AHA and AMA describe as the fuller picture.
                </p>
              )}

              {parsed.partial > 0 || parsed.outOfRange > 0 ? (
                <p className="text-sm mt-4" style={{ color: 'var(--muted-foreground)' }}>
                  {parsed.partial > 0
                    ? `${parsed.partial} row${parsed.partial === 1 ? '' : 's'} had only one number filled in and ${parsed.partial === 1 ? 'was' : 'were'} left out. `
                    : ''}
                  {parsed.outOfRange > 0
                    ? `${parsed.outOfRange} row${parsed.outOfRange === 1 ? '' : 's'} looked like a typo and ${parsed.outOfRange === 1 ? 'was' : 'were'} left out.`
                    : ''}
                </p>
              ) : null}
            </>
          )}
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--muted-foreground)' }}>
          Range chart: {AHA_SOURCE.organization},{' '}
          <a
            href={AHA_SOURCE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
            style={{ color: 'var(--primary)' }}
          >
            {AHA_SOURCE.title}
          </a>
          , {AHA_SOURCE.reviewed}.
        </p>
      </div>

      {/* Categories, so the label above is checkable rather than asserted. */}
      <div className="px-5 sm:px-7 pb-7">
        <details>
          <summary
            className="cursor-pointer text-sm font-semibold py-2 min-h-[44px] inline-flex items-center"
            style={{ color: 'var(--primary)' }}
          >
            See the whole range chart
          </summary>
          <dl className="mt-3 text-sm">
            {BP_CATEGORIES.map((c) => (
              <div
                key={c.label}
                className="flex justify-between gap-4 py-2 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <dt style={{ color: 'var(--foreground)' }}>{c.label}</dt>
                <dd className="num text-right" style={{ color: 'var(--muted-foreground)' }}>
                  {c.range}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </div>
  );
}

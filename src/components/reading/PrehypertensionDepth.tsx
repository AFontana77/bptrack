import Link from 'next/link';
import { BP_CATEGORIES } from '@/lib/product';

/**
 * The depth half of /prehypertension.
 *
 * THE PROBLEM THIS PAGE HAS
 * "Prehypertension" is not a current US category. JNC 7 (2003) used it for
 * 120-139 systolic or 80-89 diastolic. The 2017 ACC/AHA guideline abolished the
 * term and split that band in two: Elevated (120-129 and under 80) and Stage 1
 * hypertension (130-139 or 80-89). The 2025 guideline kept that split.
 *
 * So the page has to serve real legacy search intent without presenting an
 * obsolete label as current, and without becoming a second copy of
 * /blood-pressure-chart. It does that by answering the question the searcher
 * actually has - "I was told I have prehypertension, what does that mean now?"
 * - which is a translation question, not a range-table question.
 *
 * THE PART THAT MATTERS MOST
 * The old term mapped to what are now TWO categories, and roughly half of the
 * old band is now called hypertension. Somebody told they were "prehypertensive"
 * at 135/85 in 2010 would today be told they have stage 1 hypertension. That is
 * a change in meaning, not a rename, and it is the single most useful thing this
 * page can say.
 *
 * WHAT IT MUST NOT DO
 * Diagnose, or offer treatment. The committee's reasoning is reported as
 * history, not as advice about what any individual should now do.
 */
export function PrehypertensionDepth() {
  const elevated = BP_CATEGORIES.find((c) => c.tone === 'elevated')!;
  const stage1 = BP_CATEGORIES.find((c) => c.tone === 'stage1')!;

  return (
    <>
      {/* The translation. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            &ldquo;Prehypertension&rdquo; is not a current category
          </h2>
          <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            The word is still in wide use, and you will hear it from people who learned it when it
            was current. In US guidance it was retired in 2017, and what replaced it is not a
            rename.
          </p>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            It came from JNC 7 in 2003, which used a single band for everything between normal and
            hypertension. The 2017 ACC/AHA guideline cut that band in half and gave the upper part a
            different name.
          </p>

          <div className="rounded-xl overflow-x-auto mb-5" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm" style={{ minWidth: 420 }}>
              <caption className="sr-only">
                How the old prehypertension band maps onto current categories
              </caption>
              <thead>
                <tr style={{ background: 'var(--background)' }}>
                  <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>Reading</th>
                  <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>Called this in 2003</th>
                  <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>Called this now</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['120–129 and under 80', 'Prehypertension', elevated.label],
                  ['130–139 or 80–89', 'Prehypertension', `${stage1.label} — hypertension`],
                ].map(([r, old, now]) => (
                  <tr key={r} className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
                    <th scope="row" className="text-left px-5 py-3 font-normal num" style={{ color: 'var(--foreground)' }}>{r}</th>
                    <td className="px-5 py-3" style={{ color: 'var(--muted-foreground)' }}>{old}</td>
                    <td className="px-5 py-3 font-semibold" style={{ color: 'var(--primary)' }}>{now}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
            <strong>That second row is the part worth noticing.</strong> Roughly the upper half of
            the old band is now called hypertension. Somebody told in 2010 that they were
            &ldquo;prehypertensive&rdquo; at 135 over 85 would today be told they have stage 1
            hypertension, on the same numbers. Nothing about them changed. The line moved.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            The stated reasoning was that &ldquo;pre&rdquo; understated the risk at the top of that
            range, where the writing committee judged people already carried substantially more
            cardiovascular risk than those in the normal range. Whether that applies to any
            particular person is a question for their doctor, not for a category name.
          </p>
        </div>
      </section>

      {/* Why the word survives. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            Why you still see the word everywhere
          </h2>
          <ul className="space-y-4 mb-6" style={{ color: 'var(--foreground)' }}>
            {[
              ['Printed material outlives guidelines.', 'Leaflets, wall charts, textbooks and hospital handouts from before 2017 are still in circulation, and none of them updated themselves.'],
              ['People repeat what they were told.', 'If a clinician used the word with you in 2012, it is the word you will search for in 2026.'],
              ['Other countries classify differently.', 'Guidance is not identical everywhere, and a term retired in one place may be current in another. If you were given a category abroad, ask locally what it maps to.'],
              ['It is a genuinely useful idea.', 'The thing the word pointed at — a range below obvious hypertension that is still worth acting on — did not stop existing. It just got split and renamed.'],
            ].map(([h, d]) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                <span><strong>{h}</strong> <span style={{ color: 'var(--muted-foreground)' }}>{d}</span></span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg px-5 py-4 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              <strong>If you were given the label, the useful move is not to translate it yourself.</strong>{' '}
              It is to take a set of home readings and their average to whoever gave it to you. The
              category matters far less than the numbers behind it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/blood-pressure-chart" className="btn-primary">
              The current categories in full
            </Link>
            <Link href="/blood-pressure-average-calculator" className="btn-ghost">
              Average your readings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

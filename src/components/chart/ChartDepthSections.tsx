import Link from 'next/link';
import { BP_CATEGORIES, AHA_SOURCE, SMBP_PROTOCOL, AHA_AMA_HOME_SOURCE } from '@/lib/product';
import { RangeScale } from '@/components/graphics/RangeScale';

/**
 * The depth half of /blood-pressure-chart.
 *
 * This page targets the largest term the property can claim (~450,000/mo) and
 * was 790 words. The rebuild is aimed squarely at what the SERP actually asks,
 * taken from the People Also Ask box rather than guessed:
 *
 *   "Which BP number is more concerning, top or bottom?"
 *   "Is 140 over 70 a bad blood pressure reading?"     <- mixed categories
 *   "What is a good blood pressure by age?"
 *   "How to bring down blood pressure quickly?"        <- OUT OF SCOPE
 *
 * The last one is deliberately not answered. This is a measuring and recording
 * property, not a treatment one, and the moment it starts telling people how to
 * lower their blood pressure it is doing something it cannot stand behind.
 *
 * The by-age question gets a real answer, and the real answer is that there is
 * no separate adult chart by age. Saying so plainly, with the reason, is more
 * useful than the invented age tables that fill this SERP - and inventing one
 * is explicitly what the brief forbids.
 */
export function ChartDepthSections() {
  const stage1 = BP_CATEGORIES.find((c) => c.tone === 'stage1')!;
  const stage2 = BP_CATEGORIES.find((c) => c.tone === 'stage2')!;
  const elevated = BP_CATEGORIES.find((c) => c.tone === 'elevated')!;

  return (
    <>
      {/* What the two numbers are. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            What the two numbers are
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 mb-6">
            <div className="rounded-xl px-6 py-5" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                The top number: systolic
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                The pressure in your arteries while the heart is squeezing. It is the higher of the
                two, and it is the one that moves most when you are startled, rushing or holding a
                conversation with the cuff on.
              </p>
            </div>
            <div className="rounded-xl px-6 py-5" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                The bottom number: diastolic
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                The pressure that remains between beats, while the heart is refilling. It is the
                lower of the two and it is steadier.
              </p>
            </div>
          </div>
          <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
            They are written top over bottom, so 128 over 82 means a systolic of 128 and a
            diastolic of 82. Both are measured in millimetres of mercury, written mmHg, which is a
            hangover from the mercury columns the first instruments used.
          </p>
        </div>
      </section>

      {/* The mixed-category answer. The most-asked question on this SERP. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            What if the two numbers land in different rows?
          </h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            Then the higher row is the one that counts. This is not a separate rule somebody added.
            It falls out of how the categories are written.
          </p>

          <div className="rounded-xl px-6 py-6 mb-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <RangeScale />
            <p className="text-sm mt-4" style={{ color: 'var(--muted-foreground)' }}>
              Two separate scales, systolic above and diastolic below. The bands do not line up,
              which is exactly why a reading can sit in two different rows at once.
            </p>
          </div>

          <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
            Look at the wording. <strong>{elevated.label}</strong> is{' '}
            <span className="num">{elevated.range}</span> — it needs the top number{' '}
            <em>and</em> the bottom number to both be in range. But{' '}
            <strong>{stage1.label}</strong> is <span className="num">{stage1.range}</span>, and{' '}
            <strong>{stage2.label}</strong> is <span className="num">{stage2.range}</span> — those
            need only <em>one</em> of the two.
          </p>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            So a reading of 140 over 70 is stage 2, on the top number alone. A reading of 118 over
            84 is stage 1, on the bottom number alone. The category is decided by whichever number
            has climbed furthest, not by an average of the two and not by the bigger-looking digit.
          </p>

          <div className="rounded-lg px-5 py-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              <strong>Which number matters more?</strong> Both are used, which is why both appear in
              the categories, and a chart cannot rank them for you as an individual. What the chart
              does say is that either one on its own is enough to move the row, so neither can be
              waved away because the other looks fine.
            </p>
          </div>
        </div>
      </section>

      {/* By age. The honest answer is that there isn't one. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Is there a different chart for my age?
          </h2>
          <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            No. The categories above are the adult categories, and they do not change at 40, 60 or
            75.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
            You will find charts online offering a &ldquo;normal blood pressure by age&rdquo; table
            with a different target for every decade. Those are not published by the American Heart
            Association and we are not going to reproduce one, because a table that quietly raises
            the bar as you get older tells an older reader their rising numbers are fine when the
            guidance says no such thing.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            What is true is that blood pressure does tend to rise with age, and that systolic tends
            to rise more than diastolic. That is a description of what happens to populations. It is
            not a licence to move your own target, and what to do about a number is a decision for a
            clinician who knows the rest of your history.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            The same goes for separate charts by sex. The adult categories are the adult categories.
          </p>
        </div>
      </section>

      {/* What a chart cannot do. Explicit, because a table looks like a verdict. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            What this chart does not tell you
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            A table with your number in it feels like an answer. It is a lookup, and there are at
            least five things it cannot do.
          </p>
          <ul className="space-y-4" style={{ color: 'var(--foreground)' }}>
            {[
              ['It does not diagnose you.', 'A category is where one measurement falls. High blood pressure is diagnosed by a clinician from repeated measurement and the rest of your history, not from a row on a chart.'],
              ['It does not decide anything about medication.', 'Nothing about starting, stopping or changing a medicine follows from a category. That is a conversation with a doctor and this site will never have an opinion on it.'],
              ['It does not explain why a reading changed.', 'Coffee, a rushed morning, a full bladder, talking during the measurement, the wrong cuff size. The chart cannot see any of that.'],
              ['It does not prove your monitor is right.', 'A number in a row is still a number your device produced. Whether the device was ever tested for accuracy is a separate question with a separate answer.'],
              ['It does not replace being examined.', 'The chart knows two numbers. A clinician knows you.'],
            ].map(([h, d]) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                <span>
                  <strong>{h}</strong>{' '}
                  <span style={{ color: 'var(--muted-foreground)' }}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* One reading vs a pattern. This is the property's whole thesis. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            One reading is not a pattern
          </h2>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            Blood pressure moves all day. It is lower asleep, higher after climbing stairs, and it
            reacts to a conversation. Any single reading is one sample of something that never
            stops moving, which is why the categories talk about readings being{' '}
            <em>consistently</em> in a range.
          </p>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            The joint statement from the American Heart Association and the American Medical
            Association describes {SMBP_PROTOCOL.perSession} readings at least{' '}
            {SMBP_PROTOCOL.minutesBetween} minute apart, morning and evening, over{' '}
            {SMBP_PROTOCOL.optimalDays} days. That is {SMBP_PROTOCOL.optimalReadings} readings, and
            it is the set worth putting on a chart rather than any one of them.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            {AHA_AMA_HOME_SOURCE.organization},{' '}
            <a href={AHA_AMA_HOME_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
              {AHA_AMA_HOME_SOURCE.title}
            </a>
            , {AHA_AMA_HOME_SOURCE.citation}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/blood-pressure-average-calculator" className="btn-primary">
              Average your readings
            </Link>
            <Link href="/free-blood-pressure-log-pdf" className="btn-ghost">
              Print a sheet to record them
            </Link>
          </div>
        </div>
      </section>

      {/* When the number looks wrong: route, do not interpret. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            If a reading looks wrong, check the measurement before you believe it
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            A surprising number at home is often a measurement problem rather than a blood pressure
            problem. Three things account for most of it, and all three are fixable.
          </p>
          <ul className="space-y-3 mb-4">
            {[
              ['/blood-pressure-cuff-size', 'The cuff is the wrong size', 'The single biggest one. A cuff that is too small reads high, and on a large arm it can be high by a lot.'],
              ['/checklist', 'The setup was off', 'Crossed legs, an unsupported back, a full bladder, coffee half an hour ago, or talking while it ran.'],
              ['/validated-blood-pressure-monitors', 'The monitor was never tested', 'Being cleared for sale and being tested for accuracy are different things, and most people assume they are the same.'],
            ].map(([href, title, desc]) => (
              <li key={href}>
                <Link href={href} className="block rounded-lg px-5 py-4 min-h-[44px]" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
                  <span className="font-semibold block" style={{ color: 'var(--primary)' }}>{title}</span>
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{desc}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Range chart source: {AHA_SOURCE.organization},{' '}
            <a href={AHA_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
              {AHA_SOURCE.title}
            </a>
            , {AHA_SOURCE.reviewed}. The 2025 ACC/AHA guideline kept these categories and the
            130/80 threshold unchanged from 2017.
          </p>
        </div>
      </section>
    </>
  );
}

import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Read Blood Pressure Numbers | BPTrack',
  description:
    'Learn how to read blood pressure numbers. What systolic and diastolic mean, what the AHA categories are, and how to know if your reading is normal.',
};

const CATEGORIES = [
  {
    name: 'Normal',
    range: 'Under 120 / Under 80',
    plain: 'Your blood pressure is healthy. Keep doing what you are doing.',
    dot: 'oklch(0.62 0.14 150)',
  },
  {
    name: 'Elevated',
    range: '120 to 129 / Under 80',
    plain: 'Higher than ideal. Lifestyle changes can bring it back to normal without medication.',
    dot: 'oklch(0.74 0.14 75)',
  },
  {
    name: 'Stage 1 Hypertension',
    range: '130 to 139 / 80 to 89',
    plain: 'Hypertension. Talk to your doctor. Lifestyle changes and possibly medication.',
    dot: 'oklch(0.66 0.16 50)',
  },
  {
    name: 'Stage 2 Hypertension',
    range: '140 or higher / 90 or higher',
    plain: 'High blood pressure that usually needs medication along with lifestyle changes.',
    dot: 'oklch(0.45 0.18 25)',
  },
  {
    name: 'Hypertensive Crisis',
    range: 'Over 180 / Over 120',
    plain: 'Emergency. Call 911 or go to an ER immediately.',
    dot: 'oklch(0.36 0.16 25)',
    emphasis: true,
  },
];

const MISTAKES = [
  {
    mistake: 'Wrong body position',
    fix: 'Sit upright with back supported, feet flat on the floor, and arm resting at heart level on a table. A slouched or awkward position can add 5 to 10 mmHg to your reading.',
  },
  {
    mistake: 'Taking it right after exercise or caffeine',
    fix: 'Avoid caffeine, tobacco, and vigorous exercise for at least 30 minutes before measuring. Both raise blood pressure temporarily and will skew your reading.',
  },
  {
    mistake: 'Cuff size is wrong',
    fix: 'An undersized cuff reads high. An oversized cuff reads low. The bladder inside the cuff should wrap around about 80% of your upper arm. Most monitors come with two cuff sizes.',
  },
  {
    mistake: 'Not resting first',
    fix: 'Sit quietly for 5 minutes before measuring. Walking in and immediately taking your reading adds stress-related elevation to the number.',
  },
  {
    mistake: 'Taking only one reading',
    fix: 'Take two readings two minutes apart and average them. If they differ by more than 5 mmHg, take a third and average all three. Single readings have more error.',
  },
];

const WHEN_TO_CALL = [
  { text: 'Your reading is 180/120 or higher. Call 911.', urgent: true },
  { text: 'You have a consistent reading of 140/90 or higher over several days.', urgent: false },
  { text: 'Your blood pressure is dropping suddenly and you feel dizzy or faint.', urgent: false },
  { text: 'Your readings are suddenly much higher or lower than usual with no clear reason.', urgent: false },
  { text: 'You have symptoms like chest pain, shortness of breath, or vision changes alongside high readings.', urgent: false },
];

export default function HowToReadBloodPressurePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              The two numbers
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              How to read blood pressure numbers.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed max-w-2xl">
              Two numbers on a cuff. Here is what they measure, what the ranges mean, and how to know if yours is normal.
            </p>
          </div>
        </section>

        {/* The two numbers */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Anatomy of a reading
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-12">
              The two numbers.
            </h2>
            <div className="grid sm:grid-cols-2 gap-0">
              <div style={{ borderTop: '1px solid oklch(0.86 0.012 20)', borderBottom: '1px solid oklch(0.86 0.012 20)' }}
                   className="py-8 sm:pr-10">
                <div style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)', fontVariantNumeric: 'tabular-nums' }}
                     className="text-5xl font-bold mb-3">120</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                    className="font-semibold text-lg mb-2">Systolic pressure</h3>
                <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">
                  The top number. It measures the pressure in your arteries when your heart beats and pushes blood out. This is always the higher number.
                </p>
              </div>
              <div style={{ borderTop: '1px solid oklch(0.86 0.012 20)', borderBottom: '1px solid oklch(0.86 0.012 20)' }}
                   className="py-8 sm:pl-10 sm:border-l"
                   >
                <div style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }}
                     className="text-5xl font-bold mb-3">80</div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                    className="font-semibold text-lg mb-2">Diastolic pressure</h3>
                <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">
                  The bottom number. It measures the pressure in your arteries between beats, when your heart is resting and refilling with blood.
                </p>
              </div>
            </div>
            <p style={{ color: 'oklch(0.18 0.02 20)' }} className="leading-relaxed mt-8 max-w-2xl">
              <strong>How it is written:</strong> Blood pressure is written as systolic over diastolic. A reading of <strong>120/80</strong> means systolic 120, diastolic 80. Both numbers are measured in millimeters of mercury (mmHg).
            </p>
          </div>
        </section>

        {/* AHA categories */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              AHA categories
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              The five AHA categories.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              The American Heart Association puts every reading into one of five categories. Here they are in plain English.
            </p>
            <div>
              {CATEGORIES.map((cat, i) => (
                <div key={cat.name}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === CATEGORIES.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[260px_1fr] gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span aria-hidden="true"
                            style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: cat.dot, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-display)', color: cat.emphasis ? 'oklch(0.45 0.18 25)' : 'oklch(0.18 0.02 20)' }}
                            className="font-semibold">
                        {cat.name}
                      </span>
                    </div>
                    <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }}
                       className="text-sm pl-5">
                      {cat.range} mmHg
                    </p>
                  </div>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{cat.plain}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs mt-6">
              Source: American Heart Association 2025 guidelines. Consult your doctor for personal medical advice.
            </p>
          </div>
        </section>

        {/* Which number drives your category */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Higher wins
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              Which number decides your category?
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                Look at both numbers. Whichever falls in the <strong style={{ color: 'oklch(0.18 0.02 20)' }}>higher</strong> category is your classification.
              </p>
              <p style={{ color: 'oklch(0.18 0.02 20)' }} className="font-medium">
                Example: A reading of 132/78 has a systolic in Stage 1 (130 to 139) and a diastolic in Normal (under 80). The classification is Stage 1 Hypertension because the systolic is higher.
              </p>
              <p>
                Either number alone can push you into a higher category. This is why you cannot ignore the diastolic even if the systolic looks fine.
              </p>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Five mistakes
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Common errors that skew your reading.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              Most people take their blood pressure incorrectly. These five mistakes are the most common ones, and each can add 5 to 15 mmHg to your number.
            </p>
            <div>
              {MISTAKES.map((m, i) => (
                <div key={m.mistake}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === MISTAKES.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[260px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {m.mistake}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{m.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to call a doctor */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Seek care
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              When to call a doctor.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-10">
              Home monitoring is valuable but it is not a replacement for medical care. Contact a doctor or call 911 if any of these apply.
            </p>
            <ul>
              {WHEN_TO_CALL.map((item, i) => (
                <li key={i}
                    style={{
                      borderTop: '1px solid oklch(0.86 0.012 20)',
                      borderBottom: i === WHEN_TO_CALL.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                    }}
                    className="py-4 flex items-start gap-4">
                  <span aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: item.urgent ? 'oklch(0.36 0.16 25)' : 'oklch(0.45 0.18 25)',
                          marginTop: '0.5rem',
                          flexShrink: 0,
                        }} />
                  <span style={{ color: item.urgent ? 'oklch(0.45 0.18 25)' : 'oklch(0.18 0.02 20)' }}
                        className={item.urgent ? 'font-semibold leading-relaxed' : 'leading-relaxed'}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Track it
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Start tracking your numbers.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BPTrack logs every reading, shows your AHA category, and builds a 30-day trend you can share with your doctor.
            </p>
            <Link href="/free-download" className="btn-primary">
              Download BPTrack free
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free. No subscription. iPhone and Android.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

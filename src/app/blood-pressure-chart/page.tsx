import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blood Pressure Chart — AHA Ranges by Category | BPTrack',
  description:
    'Blood pressure chart with AHA categories: Normal, Elevated, Stage 1, Stage 2, and Hypertensive Crisis. Know what your numbers mean.',
};

const AHA_CHART = [
  {
    category: 'Normal',
    systolic: 'Under 120',
    diastolic: 'Under 80',
    meaning: 'Your blood pressure is in a healthy range.',
    action: 'Keep doing what you are doing. Check again in 1 to 2 years.',
    dot: 'oklch(0.62 0.14 150)',
  },
  {
    category: 'Elevated',
    systolic: '120 to 129',
    diastolic: 'Under 80',
    meaning: 'Higher than normal but not yet hypertension. This used to be called prehypertension.',
    action: 'Make lifestyle changes now. Cut sodium, exercise more, manage your weight. No medication in most cases yet.',
    dot: 'oklch(0.74 0.14 75)',
  },
  {
    category: 'Stage 1 Hypertension',
    systolic: '130 to 139',
    diastolic: '80 to 89',
    meaning: 'Hypertension. Your cardiovascular risk is elevated.',
    action: 'Talk to your doctor. Lifestyle changes are step one. Medication may be added based on your overall health profile.',
    dot: 'oklch(0.66 0.16 50)',
  },
  {
    category: 'Stage 2 Hypertension',
    systolic: '140 or higher',
    diastolic: '90 or higher',
    meaning: 'High blood pressure that almost always requires medication.',
    action: 'See your doctor soon. Medication plus lifestyle changes is the standard approach. Regular monitoring is essential.',
    dot: 'oklch(0.45 0.18 25)',
  },
  {
    category: 'Hypertensive Crisis',
    systolic: 'Over 180',
    diastolic: 'Over 120',
    meaning: 'A medical emergency.',
    action: 'Call 911 or go to an emergency room immediately. Do not drive yourself. Do not wait to see if the reading drops.',
    dot: 'oklch(0.36 0.16 25)',
    emphasis: true,
  },
  {
    category: 'Low Blood Pressure',
    systolic: 'Under 90',
    diastolic: 'Under 60',
    meaning: 'Hypotension. May be normal or may cause dizziness and fainting.',
    action: 'If you have symptoms like dizziness or fainting, talk to your doctor. Dehydration, medication, and certain conditions can cause low BP.',
    dot: 'oklch(0.62 0.12 200)',
  },
];

const FAQS = [
  {
    q: 'What is a normal blood pressure reading?',
    a: 'Normal is under 120 systolic and under 80 diastolic, written as 120/80 or lower. If your reading is in this range, your risk is low. The AHA recommends checking again in one to two years if you have no other risk factors.',
  },
  {
    q: 'What is a good blood pressure for my age?',
    a: 'The AHA uses the same five categories for all adults. However, blood pressure does tend to rise with age. What matters most is whether your individual trend is stable or climbing. Tracking at home over weeks gives a better picture than one office reading.',
  },
  {
    q: 'What causes high blood pressure?',
    a: 'Most high blood pressure has no single cause. Risk factors include high sodium intake, low physical activity, being overweight, heavy alcohol use, smoking, chronic stress, poor sleep, and family history. Some medications and conditions can also raise it.',
  },
  {
    q: 'How often should I check my blood pressure at home?',
    a: 'The AHA recommends checking twice a day for the first week, then twice a week once you have a baseline. Morning and evening readings are most useful. Always take two readings two minutes apart and average them.',
  },
  {
    q: 'What does it mean if only my top number is high?',
    a: 'Isolated systolic hypertension is when systolic is 140 or above but diastolic is under 90. It is common in older adults and is a real form of hypertension. It carries the same cardiovascular risks and should be discussed with your doctor.',
  },
  {
    q: 'Can blood pressure vary throughout the day?',
    a: 'Yes. Blood pressure naturally dips during sleep and rises after waking. It also responds quickly to stress, caffeine, exercise, posture, and temperature. This is why tracking at home over time is more accurate than a single clinic reading.',
  },
];

export default function BloodPressureChartPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              AHA reference chart
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              Blood pressure chart.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-6 max-w-2xl">
              The American Heart Association defines five blood pressure categories. Here is what each range means and what to do if your reading falls there.
            </p>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm">
              Source: American Heart Association 2025 guidelines.
            </p>
          </div>
        </section>

        {/* AHA Chart - bordered table rows */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Categories
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              AHA blood pressure ranges.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              These ranges apply to adults age 18 and older. Both numbers matter. If either is in a higher category, that is your classification.
            </p>

            <div>
              {AHA_CHART.map((row, i) => (
                <div key={i}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === AHA_CHART.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-7 grid sm:grid-cols-[200px_1fr] gap-4 sm:gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span aria-hidden="true"
                            style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: row.dot, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-display)', color: row.emphasis ? 'oklch(0.45 0.18 25)' : 'oklch(0.18 0.02 20)' }}
                            className="font-semibold">
                        {row.category}
                      </span>
                    </div>
                    <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }}
                       className="text-sm pl-5">
                      {row.systolic} / {row.diastolic} mmHg
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p style={{ color: 'oklch(0.18 0.02 20)' }} className="leading-relaxed">
                      <span style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs uppercase font-semibold tracking-wider mr-2">Means</span>
                      {row.meaning}
                    </p>
                    <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">
                      <span style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs uppercase font-semibold tracking-wider mr-2">Do</span>
                      {row.action}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs mt-6">
              Source: American Heart Association. Last updated 2025. Always consult your doctor for personal medical advice.
            </p>
          </div>
        </section>

        {/* How to read your number */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Find your category
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              How to read your number.
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                Your blood pressure is written as two numbers separated by a slash. For example, <strong style={{ color: 'oklch(0.18 0.02 20)' }}>128/82</strong>. The top number (128) is systolic. The bottom number (82) is diastolic.
              </p>
              <p>
                Look up each number in the chart above. Whichever falls in the higher category is your classification. In the example above, 128 is Elevated and 82 is Stage 1. That reading is Stage 1 Hypertension.
              </p>
              <p>
                One reading does not tell the whole story. The AHA recommends taking readings twice a day for at least a week before drawing any conclusions. Your home average is more reliable than a single clinic reading.
              </p>
              <p style={{ color: 'oklch(0.18 0.02 20)' }} className="font-medium pt-2">
                White coat hypertension is real. Many people read higher in a doctor&apos;s office than at home. The AHA says home monitoring is the most accurate way to know your true blood pressure.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              FAQ
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-10">
              Common questions.
            </h2>
            <div>
              {FAQS.map((faq, i) => (
                <div key={faq.q}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === FAQS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6">
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                      className="font-semibold mb-3">{faq.q}</h3>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
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
              Know which category you are actually in.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BPTrack logs your readings and shows you your AHA category after each one. Track for 30 days and see your real trend.
            </p>
            <Link href="/free-download" className="btn-primary">
              Track my readings free
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free download. iPhone and Android. No subscription.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

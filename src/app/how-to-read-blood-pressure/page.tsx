import { appCtaCopy } from '@/lib/appCta';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AppStoreCta, AppStoreCaption, ContextualAppCta } from '@/components/AppStoreCta';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AHA_AMA_HOME_SOURCE, AHA_SOURCE, CRISIS_GUIDANCE } from '@/lib/product';
import { NextStepStrip } from '@/components/WorkflowModule';
import { ReadingDepthSections } from '@/components/reading/ReadingDepthSections';

const URL = 'https://bptrack.app/how-to-read-blood-pressure';

export const metadata: Metadata = {
  title: 'How to Take and Read Blood Pressure at Home',
  description:
    'How to take a blood pressure reading at home in seven steps, and how to read the result. What systolic and diastolic mean, the AHA categories, and the mistakes that push readings up.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'How to Take and Read Blood Pressure at Home',
    description:
      'Seven steps to a reading you can trust, and what the two numbers mean once you have it.',
  },
};

/**
 * Steps for taking the reading, not just reading it.
 *
 * Added in M0.3.2. The page explained what the numbers mean but never covered
 * how to produce a trustworthy one in the first place, which is the more common
 * question and the higher intent search.
 *
 * Technique follows the AHA and AMA joint policy statement on self measured
 * blood pressure monitoring, cited at the foot of this page.
 */
const HOW_TO_STEPS = [
  {
    name: 'Skip caffeine, tobacco and exercise for 30 minutes',
    text: 'All three raise blood pressure for a while. A reading taken straight after any of them tells you about the coffee, not about you.',
  },
  {
    name: 'Empty your bladder',
    text: 'A full bladder can add several points to a reading. It is the easiest error on this list to remove.',
  },
  {
    name: 'Sit still for 5 minutes',
    text: 'Sit in a chair with your back supported and both feet flat on the floor. Do not cross your legs. Do not talk, and do not scroll your phone. Just sit.',
  },
  {
    name: 'Put the cuff on a bare upper arm',
    text: 'Take your arm out of the sleeve rather than rolling it up, because a bunched sleeve squeezes the arm. The bottom edge of the cuff sits about an inch above the bend of your elbow.',
  },
  {
    name: 'Rest your arm at heart level',
    text: 'Support your arm on a table so the cuff is level with your heart. An arm hanging by your side reads high. An arm held up reads low.',
  },
  {
    name: 'Take two readings, one minute apart',
    text: 'Write both down. If they differ by more than about 5 points, take a third. Averaging is what makes the number stable.',
  },
  {
    name: 'Measure at the same times each day',
    text: 'Morning before medication, and evening. What a doctor can use is a run of readings taken the same way, not one number from one moment.',
  },
];

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
    plain: CRISIS_GUIDANCE.short,
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
    fix: 'An undersized cuff reads high. An oversized cuff reads low. Most monitors ship with one wide range cuff that fits 8.6 to 16.5 in (22 to 42 cm), and if your arm falls outside that you need a different cuff, not a different monitor. Measure your arm before you trust any reading.',
  },
  {
    mistake: 'Not resting first',
    fix: 'Sit quietly for 5 minutes before measuring. Walking in and immediately taking your reading adds stress-related elevation to the number.',
  },
  {
    mistake: 'Taking only one reading',
    fix: 'Take two readings at least a minute apart and average them. If they differ by more than 5 mmHg, take a third and average all three. Single readings have more error.',
  },
];

const WHEN_TO_CALL = [
  { text: 'Your reading is over 180 or over 120. Wait a minute and take it again. If it is still that high and you have chest pain, shortness of breath, back pain, numbness, weakness, a change in vision or trouble speaking, call 911. If you do not have those symptoms, contact your doctor right away.', urgent: true },
  { text: 'You have a consistent reading of 140/90 or higher over several days.', urgent: false },
  { text: 'Your blood pressure is dropping suddenly and you feel dizzy or faint.', urgent: false },
  { text: 'Your readings are suddenly much higher or lower than usual with no clear reason.', urgent: false },
  { text: 'You have symptoms like chest pain, shortness of breath, or vision changes alongside high readings.', urgent: false },
];

export default function HowToReadBloodPressurePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${URL}#article`,
        headline: 'How to Take and Read Blood Pressure at Home',
        datePublished: '2026-04-19',
        dateModified: '2026-08-19',
        author: { '@type': 'Organization', name: 'Anvil Road LLC' },
        publisher: { '@type': 'Organization', name: 'BP Central' },
        mainEntityOfPage: URL,
        citation: [
          { '@type': 'WebPage', name: AHA_SOURCE.title, url: AHA_SOURCE.url },
          { '@type': 'WebPage', name: AHA_AMA_HOME_SOURCE.title, url: AHA_AMA_HOME_SOURCE.url },
        ],
      },
      {
        '@type': 'HowTo',
        '@id': `${URL}#howto`,
        name: 'How to take a blood pressure reading at home',
        totalTime: 'PT10M',
        step: HOW_TO_STEPS.map((st, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: st.name,
          text: st.text,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bptrack.app' },
          { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://bptrack.app/resources' },
          { '@type': 'ListItem', position: 3, name: 'How to read blood pressure', item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
              How to take and read blood pressure at home.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed max-w-2xl">
              Getting a number you can trust comes first. Here are the seven steps to a good reading, then what the two numbers mean once you have one.
            </p>
          </div>
        </section>

        {/* How to take a reading. Added M0.3.2. */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Before you read it
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-6">
              How to take a blood pressure reading at home.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed max-w-2xl mb-10">
              The same arm on the same day can give two very different numbers depending on how the
              reading was taken. These seven steps are what separate a number worth writing down
              from one that just worries you.
            </p>

            <ol className="space-y-6 max-w-2xl">
              {HOW_TO_STEPS.map((st, i) => (
                <li key={st.name} className="flex gap-4">
                  <span className="num font-bold shrink-0"
                        style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-display)' }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: 'oklch(0.18 0.02 20)' }}>
                      {st.name}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.40 0.018 20)' }}>
                      {st.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/blood-pressure-cuff-size" className="btn-ghost">
                Check your cuff size
              </Link>
              <Link href="/validated-blood-pressure-monitors" className="btn-ghost">
                Monitors that passed an accuracy test
              </Link>
            </div>
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
              BP Central logs every reading, shows the range it falls in, and builds a trend you can share with your doctor.
            </p>
            <ContextualAppCta copy={appCtaCopy("/how-to-read-blood-pressure")} source="/how-to-read-blood-pressure" />
              <AppStoreCaption />
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            <NextStepStrip current="/how-to-read-blood-pressure" />
          </div>
        </section>

        <ReadingDepthSections />

      </main>
      <SiteFooter />
    </>
  );
}

import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AHA Blood Pressure Log — Track Your Readings | BPTrack',
  description:
    'The American Heart Association recommends tracking blood pressure at home. BPTrack is a free digital AHA-aligned blood pressure log for iPhone and Android.',
};

const WHAT_TO_LOG = [
  {
    field: 'Time of day',
    why: 'Blood pressure follows a daily rhythm. It is typically highest in the morning and lower at night. The AHA recommends morning and evening readings to capture this pattern.',
  },
  {
    field: 'Which arm (left or right)',
    why: 'Readings can differ between arms. The AHA recommends using the arm with the higher reading consistently, or the arm your doctor specifies. Note it every time.',
  },
  {
    field: 'Your position (sitting)',
    why: 'Always measure sitting upright with back supported and feet flat. Lying down or standing gives a different reading. Log your position if it ever varies.',
  },
  {
    field: 'Systolic and diastolic',
    why: 'The two core numbers. Log both. The AHA looks at both to determine your category. Either number alone being elevated is enough to classify as hypertension.',
  },
  {
    field: 'Pulse (heart rate)',
    why: 'Important for people on heart medications. Some treatments lower both blood pressure and heart rate. Your doctor needs both numbers to evaluate the effect.',
  },
  {
    field: 'Notes',
    why: 'Anything that might explain an unusual reading: skipped medication, stress, poor sleep, exercise, caffeine, or illness. Notes turn raw numbers into useful clinical data.',
  },
];

const AHA_GUIDANCE = [
  'Take readings twice a day: morning and evening.',
  'Take two readings, two minutes apart, each session. Record both.',
  'Measure at the same times each day.',
  'Sit quietly for 5 minutes before measuring.',
  'Empty your bladder before measuring. A full bladder can raise readings.',
  'Do not talk during measurement.',
  'Log readings for at least a week before sharing with your doctor.',
  'Bring your log (or export it from BPTrack) to every appointment.',
];

const FAQS = [
  {
    q: 'Does the AHA have an official blood pressure log?',
    a: 'The AHA publishes blood pressure tracking worksheets and recommends home monitoring. BPTrack is built on the same framework, with the same columns and same guidance, but on your phone instead of paper.',
  },
  {
    q: 'How long should I keep a blood pressure log?',
    a: 'The AHA recommends at least 7 days before an appointment to establish a reliable baseline. For ongoing management, many doctors want to see continuous logs. BPTrack stores all your readings so you never lose data.',
  },
  {
    q: 'What if my home readings differ from my doctor\'s office readings?',
    a: 'This is very common. Many people read 10 to 20 mmHg higher at the doctor due to anxiety (white coat hypertension). The AHA says home readings are often a more accurate picture of true blood pressure. Bring your log so your doctor can compare.',
  },
  {
    q: 'Should I log readings on both arms?',
    a: 'For the first measurement, it helps to check both arms. If they differ by more than 10 mmHg, use the higher arm consistently. After that, always use the same arm so your data is comparable over time.',
  },
  {
    q: 'What is the AHA\'s recommendation for home blood pressure monitors?',
    a: 'The AHA recommends validated automatic upper-arm cuff monitors. Wrist monitors are less reliable. Look for devices validated by the American Medical Association or the dableducational.org database.',
  },
];

export default function AhaBloodPressureLogPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              AHA-aligned home log
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              The AHA recommends tracking blood pressure at home.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8 max-w-2xl">
              BPTrack is the free digital log that follows the American Heart Association&apos;s guidance. Same columns, same protocol, but on your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/free-download" className="btn-primary">
                Get the free log
              </Link>
            </div>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free. No subscription. iPhone and Android.
            </p>
          </div>
        </section>

        {/* Why AHA recommends home monitoring */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Why home monitoring
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              The case for home monitoring.
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                A single blood pressure reading at the doctor&apos;s office is unreliable on its own. The American Heart Association says home monitoring gives a far more accurate picture of your true blood pressure.
              </p>
              <p>
                There are two main reasons. First, blood pressure varies naturally throughout the day. One office reading catches just one moment. Home readings over weeks show your real average.
              </p>
              <p>
                Second, many people read higher at the doctor due to stress or anxiety. This is called white coat hypertension. It is very common and can lead to a misdiagnosis or unnecessary medication. A 30-day home log reveals whether your elevated office reading is a real problem or a stress response.
              </p>
              <p style={{ color: 'oklch(0.18 0.02 20)' }} className="font-medium">
                The AHA also recommends home monitoring for people who are already on blood pressure medication, to confirm the treatment is working between appointments.
              </p>
            </div>
          </div>
        </section>

        {/* What to log per reading */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <div className="max-w-2xl mb-12">
              <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                    className="uppercase text-xs font-semibold mb-5 block">
                Per reading
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                  className="text-3xl sm:text-4xl font-bold mb-5">
                What to record.
              </h2>
              <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed">
                The AHA recommends logging more than just the two numbers. Here is what to record and why each field matters.
              </p>
            </div>
            <div>
              {WHAT_TO_LOG.map((item, i) => (
                <div key={item.field}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === WHAT_TO_LOG.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[220px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {item.field}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{item.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AHA tracking guidance */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Home monitoring protocol
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              AHA tracking guidance.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              The American Heart Association gives specific guidance on how to take and log readings at home. Here is the summary.
            </p>
            <ul>
              {AHA_GUIDANCE.map((item, i) => (
                <li key={i}
                    style={{
                      borderTop: '1px solid oklch(0.86 0.012 20)',
                      borderBottom: i === AHA_GUIDANCE.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                    }}
                    className="py-4 flex items-start gap-4">
                  <span aria-hidden="true"
                        style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.45 0.18 25)', marginTop: '0.5rem', flexShrink: 0 }} />
                  <span style={{ color: 'oklch(0.18 0.02 20)' }} className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs mt-6">
              Source: American Heart Association. Always follow guidance from your own doctor.
            </p>
          </div>
        </section>

        {/* BPTrack as digital AHA log */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              From paper to phone
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              BPTrack is the digital version of the AHA log.
            </h2>
            <div className="space-y-4 leading-relaxed mb-12 max-w-2xl" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                The AHA log sheet is a paper form with columns for date, time, systolic, diastolic, pulse, and notes. It works. But paper has limits.
              </p>
              <p>
                BPTrack is the same log on your phone. Same columns. Same structure. But it adds a 30-day trend chart, automatic averages, and a PDF export you can email to your doctor in one tap.
              </p>
              <p>
                Everything in BPTrack is built around the AHA&apos;s guidelines for what to record and how often. The reference chart inside the app uses AHA category thresholds. The export is formatted for a clinical appointment.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-0">
              {[
                { num: '2x', label: 'Readings per day recommended by AHA' },
                { num: '30', label: 'Days of trend data in your BPTrack chart' },
                { num: '1 tap', label: 'To export a PDF for your doctor' },
              ].map((stat, i) => (
                <div key={i}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: '1px solid oklch(0.86 0.012 20)',
                     }}
                     className="py-7">
                  <div style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)', fontVariantNumeric: 'tabular-nums' }}
                       className="text-4xl font-bold mb-2">
                    {stat.num}
                  </div>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-sm">{stat.label}</p>
                </div>
              ))}
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
              Start today
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Start your AHA-aligned log.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BPTrack follows AHA guidelines for what to track and how often. Log your readings, see your trend, and bring a clean PDF to your next appointment.
            </p>
            <Link href="/free-download" className="btn-primary">
              Download BPTrack free
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free. $6.99 one-time to unlock log and export. No subscription.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

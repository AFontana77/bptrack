import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Blood Pressure Log PDF — Printable + Digital | BPTrack',
  description:
    'Free printable blood pressure log PDF. Track systolic, diastolic, pulse, and notes. Or skip the paper, BPTrack does it all on your phone, free.',
};

const LOG_ESSENTIALS = [
  { item: 'Date and time of each reading', reason: 'Blood pressure varies throughout the day. Time stamps are critical for spotting morning spikes or evening drops.' },
  { item: 'Systolic (top number)', reason: 'The pressure when your heart beats. This is what most guidelines focus on for hypertension staging.' },
  { item: 'Diastolic (bottom number)', reason: 'The pressure between beats. Elevated diastolic is common in younger adults with hypertension.' },
  { item: 'Pulse (heart rate)', reason: 'Important for people on beta-blockers or other heart medications. Helps your doctor track medication effectiveness.' },
  { item: 'Which arm (L or R)', reason: 'Readings can differ between arms. Use the same arm each time to keep your data consistent.' },
  { item: 'Notes', reason: 'Medication taken, unusual stress, poor sleep, or exercise before measuring. These explain outlier readings.' },
];

const BENEFITS = [
  'No account required. No email.',
  'Works offline on any phone.',
  'AHA reference chart built in.',
  '30-day trend chart.',
  'PDF export for doctor visits.',
  '$6.99 one-time. No subscription.',
];

const STEPS = [
  { num: '1', title: 'Take your reading', body: 'Use your home blood pressure monitor. Sit quietly for 5 minutes first. Note both readings if you take two.' },
  { num: '2', title: 'Log it in BPTrack', body: 'Enter the numbers, choose your arm, and add a quick note if anything unusual happened. Takes about 15 seconds.' },
  { num: '3', title: 'Export before your appointment', body: 'Tap Export, send the PDF to yourself, and print or share it at your next visit. Your doctor sees your last 30 days at a glance.' },
];

export default function FreePdfPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              Free PDF + free app
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              Free blood pressure log PDF.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8 max-w-2xl">
              Want a printable log? We have one. Want something faster and smarter? BPTrack logs readings on your phone and exports a clean PDF your doctor can actually read.
            </p>
            <Link href="/free-download" className="btn-primary">
              Get BPTrack free
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free download. No credit card. iPhone and Android.
            </p>
          </div>
        </section>

        {/* Why people want a printable log */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              The case for paper
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              Why people look for a printable log.
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                Most people search for a printable blood pressure log after their doctor tells them to track their readings at home. The office measurement is just one data point. Your doctor needs to see a pattern.
              </p>
              <p>
                A paper log works. You fill it out after each reading, bring it to your next appointment, and your doctor reviews it. Simple.
              </p>
              <p>
                The problem is paper logs get lost. Pages fill up and you need to print more. You cannot easily calculate your 30-day average or share it quickly. And if you want to see a trend, you have to plot it yourself.
              </p>
              <p>
                That is exactly the problem BPTrack solves. It is the digital version of that paper log. Same information, same columns, but it does the math, shows the trend, and prints a clean PDF for your doctor in one tap.
              </p>
            </div>
          </div>
        </section>

        {/* What a good log includes */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <div className="max-w-2xl mb-12">
              <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                    className="uppercase text-xs font-semibold mb-5 block">
                Six columns
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                  className="text-3xl sm:text-4xl font-bold mb-5">
                What a good log sheet includes.
              </h2>
              <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed">
                Not all log sheets are built the same. A useful log has six columns. Here is what each one does for you.
              </p>
            </div>
            <div>
              {LOG_ESSENTIALS.map((item, i) => (
                <div key={item.item}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === LOG_ESSENTIALS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[260px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {item.item}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BPTrack as digital version */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              The digital version
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              BPTrack replaces paper.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BPTrack is a free iPhone and Android app built around one idea: log your reading, see the trend, share it with your doctor. No paper, no pen, no lost logs.
            </p>

            <span style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                  className="uppercase text-xs font-semibold mb-3 block">
              What BPTrack does
            </span>
            <ul className="mb-12">
              {BENEFITS.map((b, i) => (
                <li key={i}
                    style={{
                      borderTop: '1px solid oklch(0.86 0.012 20)',
                      borderBottom: i === BENEFITS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                    }}
                    className="py-3 flex items-center gap-3">
                  <span aria-hidden="true"
                        style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.45 0.18 25)' }} />
                  <span style={{ color: 'oklch(0.18 0.02 20)' }}>{b}</span>
                </li>
              ))}
            </ul>

            <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mb-3">
              The PDF export doctors actually want.
            </h3>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-3">
              When you tap Export in BPTrack, you get a clean PDF with every reading organized by date, a 30-day trend chart, and your average systolic, diastolic, and pulse. It is formatted for a clinical appointment. You can email it, print it, or AirDrop it to a tablet in the waiting room.
            </p>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">
              This is what the American Heart Association means when they say &quot;bring your home readings to your appointment.&quot; BPTrack makes that easy.
            </p>
          </div>
        </section>

        {/* How to use it */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Three steps
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-10">
              How to use BPTrack.
            </h2>
            <div>
              {STEPS.map((step, i) => (
                <div key={step.num}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === STEPS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-7 grid sm:grid-cols-[80px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)', fontVariantNumeric: 'tabular-nums' }}
                        className="text-3xl font-bold">
                    {step.num}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                        className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Free
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Get the free log that never runs out of pages.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BPTrack is free to download. Log your readings, see your trend, and export a doctor-ready PDF. No subscription, no recurring fees.
            </p>
            <Link href="/free-download" className="btn-primary">
              Download BPTrack free
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              iPhone and Android. Free. $6.99 one-time to unlock log and export.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

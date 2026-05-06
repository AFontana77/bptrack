import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Blood Pressure Log Sheet | BPTrack',
  description:
    'Printable blood pressure log sheet with columns for date, time, systolic, diastolic, pulse, and notes. Download free PDF or track digitally in BPTrack.',
};

const COLUMNS = [
  { name: 'Date', example: '04/19/2026', why: 'Lets you spot patterns over days and weeks. Your doctor will want to see trends, not just one number.' },
  { name: 'Time', example: '7:42 AM', why: 'Blood pressure shifts throughout the day. Morning readings are often highest. Logging the time shows that pattern clearly.' },
  { name: 'Systolic', example: '124', why: 'The top number. It measures the force of blood against your artery walls when your heart beats.' },
  { name: 'Diastolic', example: '78', why: 'The bottom number. It measures pressure between beats, when your heart rests and refills.' },
  { name: 'Pulse', example: '68', why: 'Heart rate (beats per minute). Some medications lower both blood pressure and pulse. Tracking both helps your doctor fine-tune your care.' },
  { name: 'Arm (L/R)', example: 'L', why: 'Readings can differ between arms by up to 10 mmHg. Use the same arm each time so your data is consistent.' },
  { name: 'Notes', example: 'Took medication, slept 6 hrs', why: 'A place to flag anything unusual: skipped medication, stress, illness, caffeine, exercise. These are often the reason a reading looks off.' },
];

const SAMPLE_READINGS = [
  { date: '04/14', time: '7:30 AM', sys: '126', dia: '80', pulse: '66', arm: 'L', notes: 'Before coffee' },
  { date: '04/14', time: '9:00 PM', sys: '118', dia: '74', pulse: '62', arm: 'L', notes: 'After walk' },
  { date: '04/15', time: '7:45 AM', sys: '130', dia: '82', pulse: '70', arm: 'L', notes: 'Stressed at work' },
  { date: '04/15', time: '9:15 PM', sys: '122', dia: '76', pulse: '64', arm: 'L', notes: '' },
  { date: '04/16', time: '7:30 AM', sys: '121', dia: '77', pulse: '65', arm: 'L', notes: 'Medication on time' },
  { date: '04/16', time: '8:45 PM', sys: '116', dia: '72', pulse: '60', arm: 'L', notes: 'Good sleep' },
  { date: '04/17', time: '7:40 AM', sys: '128', dia: '81', pulse: '69', arm: 'L', notes: 'Salty dinner last night' },
];

const TIPS = [
  'Sit quietly for 5 minutes before measuring.',
  'Keep your feet flat on the floor and your arm at heart level.',
  'Take two readings, 2 minutes apart, and record both.',
  'Avoid caffeine, exercise, and smoking for 30 minutes before.',
  'Use the same arm every time.',
];

const PAPER_PROS = [
  { text: 'No phone required', positive: true },
  { text: 'Easy to bring to appointments', positive: true },
  { text: 'No automatic trends or averages', positive: false },
  { text: 'Can get lost or damaged', positive: false },
  { text: 'Manual math to find your average', positive: false },
];

const APP_PROS = [
  'Automatic 30-day trend chart',
  'PDF export ready for your doctor',
  'AHA reference tables built in',
  'Never lose your data',
  'Free to download, $6.99 one-time unlock',
];

export default function LogSheetPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              Log sheet
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              Free blood pressure log sheet.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8 max-w-2xl">
              Track every reading with the right columns. Print it out or log it on your phone with BPTrack. Either way, you will have data your doctor can actually use.
            </p>
            <Link href="/free-download" className="btn-primary">
              Get the free app
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free. No subscription. iPhone and Android.
            </p>
          </div>
        </section>

        {/* Why tracking matters */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Why log
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Why tracking your readings matters.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              A single reading tells your doctor almost nothing. Blood pressure changes hour to hour based on stress, sleep, salt, and activity. A log gives them a real picture over time.
            </p>
            <div>
              {[
                { title: 'Spot patterns', body: 'High readings every morning but normal at night? That is masked hypertension. A log catches it. One clinic reading never would.' },
                { title: 'Doctor visits are faster', body: 'Hand your doctor 30 days of readings instead of one office number. They can adjust medication, confirm control, or rule out white coat hypertension in minutes.' },
                { title: 'See what moves the needle', body: 'Log your notes column honestly. You will quickly see if salt, sleep, stress, or skipped medication is driving your numbers up.' },
              ].map((item, i, arr) => (
                <div key={item.title}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === arr.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[260px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {item.title}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Column guide */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Seven columns
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              What each column means.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              A good blood pressure log has 7 columns. Here is what each one records and why it matters.
            </p>
            <div>
              {COLUMNS.map((col, i) => (
                <div key={col.name}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === COLUMNS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[200px_140px_1fr] gap-4 items-start">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {col.name}
                  </span>
                  <span style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', fontVariantNumeric: 'tabular-nums' }}
                        className="text-sm">
                    {col.example}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{col.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample log table */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Sample week
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Sample blood pressure log.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              Here is what a week of readings looks like filled in correctly. Notice two readings per day and the notes column.
            </p>
            <div className="overflow-x-auto" style={{ border: '1px solid oklch(0.86 0.012 20)' }}>
              <table className="w-full text-sm" aria-label="Sample blood pressure log with 7 days of readings">
                <thead>
                  <tr style={{ background: 'oklch(0.99 0.003 20)', borderBottom: '1px solid oklch(0.86 0.012 20)' }}>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Date</th>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Time</th>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Sys</th>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Dia</th>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Pulse</th>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Arm</th>
                    <th scope="col" style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="text-left px-4 py-4 font-semibold uppercase text-xs">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_READINGS.map((row, i) => (
                    <tr key={i}
                        style={{ borderTop: i === 0 ? 'none' : '1px solid oklch(0.86 0.012 20)' }}>
                      <td style={{ color: 'oklch(0.40 0.018 20)', fontVariantNumeric: 'tabular-nums' }} className="px-4 py-4">{row.date}</td>
                      <td style={{ color: 'oklch(0.40 0.018 20)', fontVariantNumeric: 'tabular-nums' }} className="px-4 py-4">{row.time}</td>
                      <td style={{ color: 'oklch(0.18 0.02 20)', fontVariantNumeric: 'tabular-nums' }} className="px-4 py-4 font-semibold">{row.sys}</td>
                      <td style={{ color: 'oklch(0.18 0.02 20)', fontVariantNumeric: 'tabular-nums' }} className="px-4 py-4 font-semibold">{row.dia}</td>
                      <td style={{ color: 'oklch(0.40 0.018 20)', fontVariantNumeric: 'tabular-nums' }} className="px-4 py-4">{row.pulse}</td>
                      <td style={{ color: 'oklch(0.40 0.018 20)' }} className="px-4 py-4">{row.arm}</td>
                      <td style={{ color: 'oklch(0.48 0.015 20)' }} className="px-4 py-4 italic">{row.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs mt-6">
              Sample data only. Values shown are for illustration purposes.
            </p>
          </div>
        </section>

        {/* Measurement tips */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Five tips
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-10">
              Tips for accurate readings.
            </h2>
            <ul>
              {TIPS.map((tip, i) => (
                <li key={i}
                    style={{
                      borderTop: '1px solid oklch(0.86 0.012 20)',
                      borderBottom: i === TIPS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                    }}
                    className="py-4 flex items-start gap-4">
                  <span aria-hidden="true"
                        style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.45 0.18 25)', marginTop: '0.5rem', flexShrink: 0 }} />
                  <span style={{ color: 'oklch(0.18 0.02 20)' }} className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Paper vs app */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Compare
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-12">
              Paper log or phone app?
            </h2>
            <div className="grid sm:grid-cols-2 gap-12">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                    className="font-semibold text-lg mb-4 pb-4"
                    >
                  Paper log sheet
                </h3>
                <ul>
                  {PAPER_PROS.map((item, i) => (
                    <li key={i}
                        style={{
                          borderTop: '1px solid oklch(0.86 0.012 20)',
                          borderBottom: i === PAPER_PROS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                        }}
                        className="py-3 flex items-start gap-3">
                      <span aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: item.positive ? 'oklch(0.62 0.14 150)' : 'oklch(0.86 0.012 20)',
                              marginTop: '0.5rem',
                              flexShrink: 0,
                            }} />
                      <span style={{ color: item.positive ? 'oklch(0.18 0.02 20)' : 'oklch(0.48 0.015 20)' }}
                            className="text-sm leading-relaxed">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                    className="font-semibold text-lg mb-4 pb-4">
                  BPTrack app
                </h3>
                <ul>
                  {APP_PROS.map((text, i) => (
                    <li key={i}
                        style={{
                          borderTop: '1px solid oklch(0.86 0.012 20)',
                          borderBottom: i === APP_PROS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                        }}
                        className="py-3 flex items-start gap-3">
                      <span aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: 'oklch(0.45 0.18 25)',
                              marginTop: '0.5rem',
                              flexShrink: 0,
                            }} />
                      <span style={{ color: 'oklch(0.18 0.02 20)' }} className="text-sm leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Stop losing data
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Stop losing readings on scraps of paper.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BPTrack logs every reading on your phone, shows your 30-day trend, and exports a clean PDF for your doctor.
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

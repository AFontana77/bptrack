import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ClipboardList, CheckCircle, ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Blood Pressure Log Sheet | BPTrack',
  description:
    'Printable blood pressure log sheet with columns for date, time, systolic, diastolic, pulse, and notes. Download free PDF or track digitally in BPTrack.',
};

const COLUMNS = [
  {
    name: 'Date',
    example: '04/19/2026',
    why: 'Lets you spot patterns over days and weeks. Your doctor will want to see trends, not just one number.',
  },
  {
    name: 'Time',
    example: '7:42 AM',
    why: 'Blood pressure shifts throughout the day. Morning readings are often highest. Logging the time shows that pattern clearly.',
  },
  {
    name: 'Systolic',
    example: '124',
    why: 'The top number. It measures the force of blood against your artery walls when your heart beats.',
  },
  {
    name: 'Diastolic',
    example: '78',
    why: 'The bottom number. It measures pressure between beats, when your heart rests and refills.',
  },
  {
    name: 'Pulse',
    example: '68',
    why: 'Heart rate (beats per minute). Some medications lower both blood pressure and pulse. Tracking both helps your doctor fine-tune your care.',
  },
  {
    name: 'Arm (L/R)',
    example: 'L',
    why: 'Readings can differ between arms by up to 10 mmHg. Use the same arm each time so your data is consistent.',
  },
  {
    name: 'Notes',
    example: 'Took medication, slept 6 hrs',
    why: 'A place to flag anything unusual — skipped medication, stress, illness, caffeine, exercise. These are often the reason a reading looks off.',
  },
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
  { tip: 'Sit quietly for 5 minutes before measuring.' },
  { tip: 'Keep your feet flat on the floor and your arm at heart level.' },
  { tip: 'Take two readings, 2 minutes apart, and record both.' },
  { tip: 'Avoid caffeine, exercise, and smoking for 30 minutes before.' },
  { tip: 'Use the same arm every time.' },
];

export default function LogSheetPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section aria-label="Page introduction" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
              <ClipboardList className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Blood Pressure Log Sheet
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-6">
              Track every reading with the right columns. Print it out or log it on your phone with BPTrack. Either way, you will have data your doctor can actually use.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Get the free app <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">Free. No subscription. iPhone and Android.</p>
          </div>
        </section>

        {/* What a log sheet records */}
        <section aria-label="Why tracking matters" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Why tracking your readings matters</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
              A single reading tells your doctor almost nothing. Blood pressure changes hour to hour based on stress, sleep, salt, and activity. A log gives them a real picture over time.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Spot patterns</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  High readings every morning but normal at night? That is masked hypertension. A log catches it. One clinic reading never would.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Doctor visits are faster</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Hand your doctor 30 days of readings instead of one office number. They can adjust medication, confirm control, or rule out white coat hypertension in minutes.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">See what moves the needle</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Log your notes column honestly. You will quickly see if salt, sleep, stress, or skipped medication is driving your numbers up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Column guide */}
        <section aria-label="Log sheet columns explained" className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">What each column means</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              A good blood pressure log has 7 columns. Here is what each one records and why it matters.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {COLUMNS.map(({ name, example, why }) => (
                <div key={name} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{name}</h3>
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">{example}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample log table */}
        <section aria-label="Sample blood pressure log" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Sample blood pressure log</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
              Here is what a week of readings looks like filled in correctly. Notice two readings per day and the notes column.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm" aria-label="Sample blood pressure log with 7 days of readings">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Date</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Time</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Systolic</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Diastolic</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Pulse</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Arm</th>
                    <th scope="col" className="text-left px-4 py-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_READINGS.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-700">{row.date}</td>
                      <td className="px-4 py-3 text-gray-700">{row.time}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.sys}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.dia}</td>
                      <td className="px-4 py-3 text-gray-700">{row.pulse}</td>
                      <td className="px-4 py-3 text-gray-700">{row.arm}</td>
                      <td className="px-4 py-3 text-gray-500 italic">{row.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center mt-4 text-xs text-gray-400">
              Sample data only. Values shown are for illustration purposes.
            </p>
          </div>
        </section>

        {/* Measurement tips */}
        <section aria-label="Tips for accurate measurements" className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">5 tips for accurate readings</h2>
            <div className="space-y-3">
              {TIPS.map(({ tip }, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                  <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Paper vs app */}
        <section aria-label="Paper log vs digital app comparison" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Paper log or phone app?</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Paper log sheet</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} /><span>No phone required</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} /><span>Easy to bring to appointments</span></li>
                  <li className="flex items-start gap-2 text-gray-400"><span className="flex-shrink-0 mt-0.5 w-4 h-4 text-center">-</span><span>No automatic trends or averages</span></li>
                  <li className="flex items-start gap-2 text-gray-400"><span className="flex-shrink-0 mt-0.5 w-4 h-4 text-center">-</span><span>Can get lost or damaged</span></li>
                  <li className="flex items-start gap-2 text-gray-400"><span className="flex-shrink-0 mt-0.5 w-4 h-4 text-center">-</span><span>Manual math to find your average</span></li>
                </ul>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="text-red-600" size={20} />
                  <h3 className="font-bold text-gray-900 text-lg">BPTrack app</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} /><span>Automatic 30-day trend chart</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} /><span>PDF export ready for your doctor</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} /><span>AHA reference tables built in</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} /><span>Never lose your data</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} /><span>Free to download, $6.99 one-time unlock</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download BPTrack app" className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stop losing readings on scraps of paper</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BPTrack logs every reading on your phone, shows your 30-day trend, and exports a clean PDF for your doctor. Free to download. No subscription.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Download BPTrack free <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">Free. No subscription. iPhone and Android.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

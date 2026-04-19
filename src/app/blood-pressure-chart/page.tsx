import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Activity, ArrowRight, HelpCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blood Pressure Chart — AHA Ranges by Category | BPTrack',
  description:
    'Blood pressure chart with AHA categories — Normal, Elevated, Stage 1, Stage 2, and Hypertensive Crisis. Know what your numbers mean.',
};

const AHA_CHART = [
  {
    category: 'Normal',
    systolic: 'Under 120',
    diastolic: 'Under 80',
    meaning: 'Your blood pressure is in a healthy range.',
    action: 'Keep doing what you are doing. Check again in 1 to 2 years.',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
  },
  {
    category: 'Elevated',
    systolic: '120 to 129',
    diastolic: 'Under 80',
    meaning: 'Higher than normal but not yet hypertension. This used to be called prehypertension.',
    action: 'Make lifestyle changes now. Cut sodium, exercise more, manage your weight. No medication in most cases yet.',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-800',
    dot: 'bg-yellow-500',
  },
  {
    category: 'Stage 1 Hypertension',
    systolic: '130 to 139',
    diastolic: '80 to 89',
    meaning: 'Hypertension. Your cardiovascular risk is elevated.',
    action: 'Talk to your doctor. Lifestyle changes are step one. Medication may be added based on your overall health profile.',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-800',
    dot: 'bg-orange-500',
  },
  {
    category: 'Stage 2 Hypertension',
    systolic: '140 or higher',
    diastolic: '90 or higher',
    meaning: 'High blood pressure that almost always requires medication.',
    action: 'See your doctor soon. Medication plus lifestyle changes is the standard approach. Regular monitoring is essential.',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-800',
    dot: 'bg-red-500',
  },
  {
    category: 'Hypertensive Crisis',
    systolic: 'Over 180',
    diastolic: 'Over 120',
    meaning: 'A medical emergency.',
    action: 'Call 911 or go to an emergency room immediately. Do not drive yourself. Do not wait to see if the reading drops.',
    bg: 'bg-red-100',
    border: 'border-red-400',
    badge: 'bg-red-700 text-white',
    dot: 'bg-red-700',
  },
  {
    category: 'Low Blood Pressure',
    systolic: 'Under 90',
    diastolic: 'Under 60',
    meaning: 'Hypotension. May be normal or may cause dizziness and fainting.',
    action: 'If you have symptoms like dizziness or fainting, talk to your doctor. Dehydration, medication, and certain conditions can cause low BP.',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
    dot: 'bg-blue-500',
  },
];

const FAQS = [
  {
    q: 'What is a normal blood pressure reading?',
    a: 'Normal is under 120 systolic and under 80 diastolic. Written as 120/80 or lower. If your reading is in this range, your risk is low. The AHA recommends checking again in one to two years if you have no other risk factors.',
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
        <section aria-label="Page introduction" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
              <Activity className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Blood Pressure Chart
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-6">
              The American Heart Association defines five blood pressure categories. Here is what each range means and what to do if your reading falls there.
            </p>
            <p className="text-xs text-gray-400">Source: American Heart Association 2025 guidelines</p>
          </div>
        </section>

        {/* AHA Chart */}
        <section aria-label="AHA blood pressure categories chart" className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">AHA Blood Pressure Ranges</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              These ranges apply to adults age 18 and older. Both numbers matter. If either is in a higher category, that is your classification.
            </p>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 mb-8">
              <table className="w-full text-sm" aria-label="Blood pressure chart with AHA categories, ranges, and guidance">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th scope="col" className="text-left px-5 py-4 font-semibold">Category</th>
                    <th scope="col" className="text-left px-5 py-4 font-semibold">Systolic (mmHg)</th>
                    <th scope="col" className="text-left px-5 py-4 font-semibold">Diastolic (mmHg)</th>
                    <th scope="col" className="text-left px-5 py-4 font-semibold">What it means</th>
                    <th scope="col" className="text-left px-5 py-4 font-semibold">What to do</th>
                  </tr>
                </thead>
                <tbody>
                  {AHA_CHART.map((row, i) => (
                    <tr key={i} className={`${row.bg} border-b ${row.border}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${row.dot} flex-shrink-0`} aria-hidden="true" />
                          <span className="font-semibold text-gray-900">{row.category}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono font-medium text-gray-800">{row.systolic}</td>
                      <td className="px-5 py-4 font-mono font-medium text-gray-800">{row.diastolic}</td>
                      <td className="px-5 py-4 text-gray-700 leading-relaxed max-w-xs">{row.meaning}</td>
                      <td className="px-5 py-4 text-gray-700 leading-relaxed max-w-xs">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-4 mb-8">
              {AHA_CHART.map((row, i) => (
                <div key={i} className={`rounded-xl border p-5 ${row.bg} ${row.border}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${row.dot} flex-shrink-0`} aria-hidden="true" />
                    <h3 className="font-bold text-gray-900">{row.category}</h3>
                    <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${row.badge}`}>
                      {row.systolic} / {row.diastolic}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed"><strong>What it means:</strong> {row.meaning}</p>
                  <p className="text-sm text-gray-700 leading-relaxed"><strong>What to do:</strong> {row.action}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-gray-400 mb-2">
              Source: American Heart Association. Last updated 2025. Always consult your doctor for personal medical advice.
            </p>
          </div>
        </section>

        {/* How to read your number */}
        <section aria-label="How to interpret your blood pressure reading" className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to find your category</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Your blood pressure is written as two numbers separated by a slash. For example, <strong>128/82</strong>. The top number (128) is systolic. The bottom number (82) is diastolic.
              </p>
              <p>
                Look up each number in the chart above. Whichever falls in the higher category is your classification. In the example above, 128 is Elevated and 82 is Stage 1. That reading is Stage 1 Hypertension.
              </p>
              <p>
                One reading does not tell the whole story. The AHA recommends taking readings twice a day for at least a week before drawing any conclusions. Your home average is more reliable than a single clinic reading.
              </p>
            </div>
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>White coat hypertension is real.</strong> Many people read higher in a doctor&apos;s office than at home. The AHA says home monitoring is the most accurate way to know your true blood pressure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently asked questions about blood pressure" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Common questions</h2>
            <div className="space-y-6">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <HelpCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                    <h3 className="font-semibold text-gray-900">{q}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-7">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Track your readings in BPTrack" className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Know which category you are actually in</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BPTrack logs your readings and shows you your AHA category after each one. Track for 30 days and see your real trend. Free to download.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Track my readings free <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">Free download. iPhone and Android. No subscription.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

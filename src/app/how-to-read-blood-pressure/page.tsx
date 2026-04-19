import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { BookOpen, ArrowRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Read Blood Pressure Numbers | BPTrack',
  description:
    'Learn how to read blood pressure numbers — what systolic and diastolic mean, what the AHA categories are, and how to know if your reading is normal.',
};

const CATEGORIES = [
  {
    name: 'Normal',
    range: 'Under 120 / Under 80',
    plain: 'Your blood pressure is healthy. Keep doing what you are doing.',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    name: 'Elevated',
    range: '120 to 129 / Under 80',
    plain: 'Higher than ideal. Lifestyle changes can bring it back to normal without medication.',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  {
    name: 'Stage 1 Hypertension',
    range: '130 to 139 / 80 to 89',
    plain: 'Hypertension. Talk to your doctor. Lifestyle changes and possibly medication.',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  {
    name: 'Stage 2 Hypertension',
    range: '140 or higher / 90 or higher',
    plain: 'High blood pressure that usually needs medication along with lifestyle changes.',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  {
    name: 'Hypertensive Crisis',
    range: 'Over 180 / Over 120',
    plain: 'Emergency. Call 911 or go to an ER immediately.',
    color: 'text-red-900',
    bg: 'bg-red-100',
    border: 'border-red-400',
  },
];

const MISTAKES = [
  {
    mistake: 'Wrong body position',
    fix: 'Sit upright with back supported, feet flat on the floor, and arm resting at heart level on a table. A slouched or awkward position can add 5 to 10 mmHg to your reading.',
    icon: 'bad',
  },
  {
    mistake: 'Taking it right after exercise or caffeine',
    fix: 'Avoid caffeine, tobacco, and vigorous exercise for at least 30 minutes before measuring. Both raise blood pressure temporarily and will skew your reading.',
    icon: 'bad',
  },
  {
    mistake: 'Cuff size is wrong',
    fix: 'An undersized cuff reads high. An oversized cuff reads low. The bladder inside the cuff should wrap around about 80% of your upper arm. Most monitors come with two cuff sizes.',
    icon: 'bad',
  },
  {
    mistake: 'Not resting first',
    fix: 'Sit quietly for 5 minutes before measuring. Walking in and immediately taking your reading adds stress-related elevation to the number.',
    icon: 'bad',
  },
  {
    mistake: 'Taking only one reading',
    fix: 'Take two readings two minutes apart and average them. If they differ by more than 5 mmHg, take a third and average all three. Single readings have more error.',
    icon: 'bad',
  },
];

const WHEN_TO_CALL = [
  'Your reading is 180/120 or higher. Call 911.',
  'You have a consistent reading of 140/90 or higher over several days.',
  'Your blood pressure is dropping suddenly and you feel dizzy or faint.',
  'Your readings are suddenly much higher or lower than usual with no clear reason.',
  'You have symptoms like chest pain, shortness of breath, or vision changes alongside high readings.',
];

export default function HowToReadBloodPressurePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section aria-label="Page introduction" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
              <BookOpen className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How to Read Blood Pressure Numbers
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
              Two numbers on a cuff. Here is what they measure, what the ranges mean, and how to know if yours is normal.
            </p>
          </div>
        </section>

        {/* The two numbers */}
        <section aria-label="Systolic and diastolic explained" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">The two numbers</h2>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-red-50 rounded-2xl p-7 border border-red-100">
                <div className="text-5xl font-bold text-red-600 mb-3">120</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Systolic pressure</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The top number. It measures the pressure in your arteries when your heart beats and pushes blood out. This is always the higher number.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                <div className="text-5xl font-bold text-gray-600 mb-3">80</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Diastolic pressure</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The bottom number. It measures the pressure in your arteries between beats, when your heart is resting and refilling with blood.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>How it is written:</strong> Blood pressure is written as systolic over diastolic. A reading of <strong>120/80</strong> means systolic 120, diastolic 80. Both numbers are measured in millimeters of mercury (mmHg).
              </p>
            </div>
          </div>
        </section>

        {/* AHA categories */}
        <section aria-label="AHA blood pressure categories in plain English" className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">The five AHA categories</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The American Heart Association puts every reading into one of five categories. Here they are in plain English.
            </p>
            <div className="space-y-4">
              {CATEGORIES.map(({ name, range, plain, color, bg, border }) => (
                <div key={name} className={`rounded-xl border p-5 ${bg} ${border}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg mb-1 ${color}`}>{name}</h3>
                      <p className="text-sm font-mono font-medium text-gray-700 mb-2">{range} mmHg</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{plain}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-xs text-gray-400">
              Source: American Heart Association 2025 guidelines. Consult your doctor for personal medical advice.
            </p>
          </div>
        </section>

        {/* Which number drives your category */}
        <section aria-label="How to find your blood pressure category" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Which number decides your category?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Look at both numbers. Whichever falls in the <strong>higher</strong> category is your classification.
              </p>
              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <strong>Example:</strong> A reading of 132/78 has a systolic in Stage 1 (130 to 139) and a diastolic in Normal (under 80). The classification is Stage 1 Hypertension because the systolic is higher.
                </p>
              </div>
              <p>
                Either number alone can push you into a higher category. This is why you cannot ignore the diastolic even if the systolic looks fine.
              </p>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section aria-label="Common blood pressure measurement mistakes" className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">5 common mistakes that skew your reading</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Most people take their blood pressure incorrectly. These five mistakes are the most common ones, and each can add 5 to 15 mmHg to your number.
            </p>
            <div className="space-y-4">
              {MISTAKES.map(({ mistake, fix }) => (
                <div key={mistake} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                    <h3 className="font-semibold text-gray-900">{mistake}</h3>
                  </div>
                  <div className="flex items-start gap-3 pl-7">
                    <p className="text-sm text-gray-600 leading-relaxed">{fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to call a doctor */}
        <section aria-label="When to call a doctor about blood pressure" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">When to call a doctor</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
              Home monitoring is valuable but it is not a replacement for medical care. Contact a doctor or call 911 if any of these apply.
            </p>
            <div className="space-y-3">
              {WHEN_TO_CALL.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${i === 0 ? 'bg-red-100 border border-red-300' : 'bg-gray-50 border border-gray-100'}`}>
                  <AlertTriangle className={`flex-shrink-0 mt-0.5 ${i === 0 ? 'text-red-700' : 'text-red-500'}`} size={18} />
                  <p className={`text-sm leading-relaxed ${i === 0 ? 'text-red-900 font-semibold' : 'text-gray-700'}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download BPTrack to track your blood pressure" className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="text-red-600 mx-auto mb-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start tracking your numbers today</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BPTrack logs every reading, shows your AHA category, and builds a 30-day trend you can share with your doctor. Free to download.
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

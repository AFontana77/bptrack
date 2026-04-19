import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Heart, ArrowRight, CheckCircle, HelpCircle, Clock } from 'lucide-react';
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
    a: 'The AHA publishes blood pressure tracking worksheets and recommends home monitoring. BPTrack is built on the same framework — same columns, same guidance — but on your phone instead of paper.',
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
        <section aria-label="Page introduction" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
              <Heart className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              AHA Blood Pressure Log
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-6">
              The American Heart Association recommends tracking your blood pressure at home. BPTrack is the free digital log that follows the AHA&#39;s guidance. iPhone and Android.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Get the free log <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">Free. No subscription. iPhone and Android.</p>
          </div>
        </section>

        {/* Why AHA recommends home monitoring */}
        <section aria-label="Why the AHA recommends home blood pressure monitoring" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why the AHA recommends home monitoring</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A single blood pressure reading at the doctor&apos;s office is unreliable on its own. The American Heart Association says home monitoring gives a far more accurate picture of your true blood pressure.
              </p>
              <p>
                There are two main reasons. First, blood pressure varies naturally throughout the day. One office reading catches just one moment. Home readings over weeks show your real average.
              </p>
              <p>
                Second, many people read higher at the doctor due to stress or anxiety. This is called white coat hypertension. It is very common and can lead to a misdiagnosis or unnecessary medication. A 30-day home log reveals whether your elevated office reading is a real problem or a stress response.
              </p>
              <div className="bg-red-50 rounded-xl border border-red-100 p-5 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The AHA also recommends home monitoring for people who are already on blood pressure medication, to confirm the treatment is working between appointments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to log per reading */}
        <section aria-label="What to record in your blood pressure log" className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">What to record per reading</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The AHA recommends logging more than just the two numbers. Here is what to record and why each field matters.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {WHAT_TO_LOG.map(({ field, why }) => (
                <div key={field} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{field}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AHA 30-day tracking guidance */}
        <section aria-label="AHA 30-day tracking guidance" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">AHA tracking guidance</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
              The American Heart Association gives specific guidance on how to take and log readings at home. Here is a summary.
            </p>
            <div className="bg-red-50 rounded-2xl p-7 border border-red-100">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="text-red-600" size={22} />
                <h3 className="font-bold text-gray-900 text-lg">AHA home monitoring protocol</h3>
              </div>
              <ul className="space-y-3">
                {AHA_GUIDANCE.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-center mt-4 text-xs text-gray-400">
              Source: American Heart Association. Always follow guidance from your own doctor.
            </p>
          </div>
        </section>

        {/* BPTrack as digital AHA log */}
        <section aria-label="BPTrack as digital AHA-aligned log" className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">BPTrack: the digital version of the AHA log</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
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
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">2x</div>
                <p className="text-sm text-gray-600">Readings per day recommended by AHA</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">30</div>
                <p className="text-sm text-gray-600">Days of trend data in your BPTrack chart</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="text-2xl font-bold text-red-600 mb-2">1 tap</div>
                <p className="text-sm text-gray-600">To export a PDF for your doctor</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently asked questions about AHA blood pressure logs" className="py-16 px-4 bg-white">
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
        <section aria-label="Start your AHA-aligned blood pressure log" className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="text-red-600 mx-auto mb-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start your AHA-aligned log today</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BPTrack follows AHA guidelines for what to track and how often. Log your readings, see your trend, and bring a clean PDF to your next appointment. Free to download.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Download BPTrack free <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">Free. $6.99 one-time to unlock log and export. No subscription.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

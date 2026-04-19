import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FileText, CheckCircle, ArrowRight, Smartphone, Download } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Blood Pressure Log PDF — Printable + Digital | BPTrack',
  description:
    'Free printable blood pressure log PDF. Track systolic, diastolic, pulse, and notes. Or skip the paper — BPTrack does it all on your phone, free.',
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

export default function FreePdfPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section aria-label="Page introduction" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
              <FileText className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Free Blood Pressure Log PDF
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-6">
              Want a printable log? We have one. Want something faster and smarter? BPTrack logs readings on your phone and exports a clean PDF your doctor can actually read.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/free-download"
                className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
              >
                Get BPTrack free <ArrowRight size={18} />
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-3">Free download. No credit card. iPhone and Android.</p>
          </div>
        </section>

        {/* Why people want a printable log */}
        <section aria-label="Why people use printable blood pressure logs" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why people look for a printable log</h2>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                Most people search for a printable blood pressure log after their doctor tells them to track their readings at home. The office measurement is just one data point. Your doctor needs to see a pattern.
              </p>
              <p>
                A paper log works. You fill it out after each reading, bring it to your next appointment, and your doctor reviews it. Simple.
              </p>
              <p>
                The problem is paper logs get lost. Pages fill up and you need to print more. You can not easily calculate your 30-day average or share it quickly. And if you want to see a trend, you have to plot it yourself.
              </p>
              <p>
                That is exactly the problem BPTrack solves. It is the digital version of that paper log. Same information, same columns, but it does the math, shows the trend, and prints a clean PDF for your doctor in one tap.
              </p>
            </div>
          </div>
        </section>

        {/* What a good log includes */}
        <section aria-label="What a blood pressure log should include" className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">What a good log sheet includes</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              Not all log sheets are built the same. A useful log has six columns. Here is what each one does for you.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {LOG_ESSENTIALS.map(({ item, reason }) => (
                <div key={item} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BPTrack as digital version */}
        <section aria-label="BPTrack as digital blood pressure log" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">BPTrack: the digital log that replaces paper</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10 leading-relaxed">
              BPTrack is a free iPhone and Android app built around one idea: log your reading, see the trend, share it with your doctor. No paper, no pen, no lost logs.
            </p>
            <div className="bg-red-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="text-red-600" size={24} />
                <h3 className="font-bold text-gray-900 text-lg">What BPTrack does</h3>
              </div>
              <ul className="space-y-3">
                {BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0" size={18} />
                    <span className="text-gray-700 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-3">The PDF export doctors actually want</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                When you tap Export in BPTrack, you get a clean PDF with every reading organized by date, a 30-day trend chart, and your average systolic, diastolic, and pulse. It is formatted for a clinical appointment. You can email it, print it, or AirDrop it to a tablet in the waiting room.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is what the American Heart Association means when they say &quot;bring your home readings to your appointment.&quot; BPTrack makes that easy.
              </p>
            </div>
          </div>
        </section>

        {/* How to use it */}
        <section aria-label="How to use BPTrack for home monitoring" className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to use BPTrack in three steps</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Take your reading</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Use your home blood pressure monitor. Sit quietly for 5 minutes first. Note both readings if you take two.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Log it in BPTrack</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Enter the numbers, choose your arm, and add a quick note if anything unusual happened. Takes about 15 seconds.</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex gap-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Export before your appointment</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Tap Export, send the PDF to yourself, and print or share it at your next visit. Your doctor sees your last 30 days at a glance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Download BPTrack" className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <Download className="text-red-600 mx-auto mb-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get the free log that never runs out of pages</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BPTrack is free to download. Log your readings, see your trend, and export a doctor-ready PDF. No subscription, no recurring fees.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Download BPTrack free <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">iPhone and Android. Free. $6.99 one-time to unlock log and export.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

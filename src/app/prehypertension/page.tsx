import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { TrendingUp, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Prehypertension? AHA Ranges + What to Do | BPTrack',
  description:
    'Prehypertension (now called Elevated blood pressure) means systolic 120-129 and diastolic under 80. Learn what it means and how to track it.',
};

const LIFESTYLE_CHANGES = [
  {
    title: 'Cut sodium',
    body: 'The AHA recommends under 2,300 mg of sodium per day. Even better: aim for 1,500 mg. Processed foods, canned soups, and restaurant meals are the biggest sources. Reducing sodium alone can lower systolic by 2 to 8 mmHg.',
  },
  {
    title: 'Exercise regularly',
    body: 'Aim for at least 150 minutes of moderate activity per week. That is 30 minutes, five days a week. Brisk walking counts. Regular aerobic exercise can lower systolic blood pressure by 4 to 9 mmHg.',
  },
  {
    title: 'Manage your weight',
    body: 'Every 10 pounds of excess weight can raise blood pressure by about 4 mmHg. Losing just 5 to 10 pounds is enough to see a meaningful reduction in many people with elevated readings.',
  },
  {
    title: 'Eat more potassium',
    body: 'Potassium helps your kidneys flush out sodium. Foods high in potassium include bananas, sweet potatoes, spinach, and beans. The DASH diet is built around this approach and has strong clinical support.',
  },
  {
    title: 'Limit alcohol',
    body: 'Drinking more than one drink a day (for women) or two (for men) raises blood pressure over time. Cutting back is one of the fastest lifestyle changes with a measurable effect.',
  },
  {
    title: 'Quit smoking',
    body: 'Each cigarette causes a temporary spike in blood pressure. Over time, smoking damages artery walls. Quitting stops the damage and lowers your long-term cardiovascular risk significantly.',
  },
];

const FAQS = [
  {
    q: 'Is prehypertension the same as high blood pressure?',
    a: 'No. Elevated blood pressure (what used to be called prehypertension) is systolic 120 to 129 with diastolic under 80. It is above normal but below the threshold for hypertension (130/80). It does not require medication in most cases, but it does need attention.',
  },
  {
    q: 'Can elevated blood pressure go back to normal?',
    a: 'Yes. Unlike hypertension, elevated blood pressure is often reversible with lifestyle changes. Reducing sodium, exercising regularly, and losing weight can bring systolic readings back under 120 for many people.',
  },
  {
    q: 'Does elevated blood pressure cause symptoms?',
    a: 'Usually no. Blood pressure problems — even serious ones — rarely cause noticeable symptoms. This is why regular monitoring is so important. You will not feel elevated blood pressure, but it is still doing damage over time.',
  },
  {
    q: 'Why did the AHA change the name from prehypertension?',
    a: 'The AHA updated its guidelines in 2017. The old "prehypertension" range (120 to 139 systolic) was split into two categories: Elevated (120 to 129) and Stage 1 Hypertension (130 to 139). The rename reflects a better understanding of cardiovascular risk at lower thresholds.',
  },
  {
    q: 'How often should I check if I have elevated blood pressure?',
    a: 'The AHA recommends more frequent monitoring for people with elevated or high blood pressure. A common approach is twice a day for one week, then weekly once you have a stable baseline. BPTrack makes this easy to track.',
  },
];

export default function PrehypertensionPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section aria-label="Page introduction" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-white rounded-2xl items-center justify-center mb-6 shadow-sm">
              <TrendingUp className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Is Prehypertension?
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
              The AHA renamed it in 2017. Today it is called Elevated blood pressure. Here is what the range means, why it matters, and what you can do about it without medication.
            </p>
          </div>
        </section>

        {/* The name change */}
        <section aria-label="What happened to the prehypertension diagnosis" className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">The AHA renamed it in 2017</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                For years, doctors used the term &quot;prehypertension&quot; to describe readings between 120/80 and 139/89. In 2017, the American Heart Association updated its guidelines and retired that term.
              </p>
              <p>
                The old prehypertension range was split into two separate categories:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-5">
                  <h3 className="font-bold text-yellow-800 mb-2">Elevated</h3>
                  <p className="text-sm font-mono text-gray-700 mb-2">Systolic: 120 to 129</p>
                  <p className="text-sm font-mono text-gray-700 mb-3">Diastolic: Under 80</p>
                  <p className="text-sm text-gray-600">Lifestyle changes recommended. No medication in most cases.</p>
                </div>
                <div className="bg-orange-50 rounded-xl border border-orange-200 p-5">
                  <h3 className="font-bold text-orange-800 mb-2">Stage 1 Hypertension</h3>
                  <p className="text-sm font-mono text-gray-700 mb-2">Systolic: 130 to 139</p>
                  <p className="text-sm font-mono text-gray-700 mb-3">Diastolic: 80 to 89</p>
                  <p className="text-sm text-gray-600">Talk to your doctor. Lifestyle changes plus possibly medication.</p>
                </div>
              </div>
              <p>
                Why the change? Research showed that cardiovascular risk rises meaningfully at 130/80, not just at 140/90. The new categories reflect that risk more accurately.
              </p>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section aria-label="Why elevated blood pressure matters" className="py-16 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why elevated blood pressure matters</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                A systolic reading of 125 does not feel like anything. Blood pressure rarely causes symptoms at this stage. That is exactly what makes it dangerous.
              </p>
              <p>
                Over years, elevated pressure causes wear on the artery walls. This leads to a gradual buildup of plaque, reduced elasticity, and higher risk of heart attack and stroke. The damage accumulates silently.
              </p>
              <p>
                The good news: elevated blood pressure is the easiest stage to reverse. At this range, lifestyle changes alone can bring readings back to normal without medication. Many people do it in a few months.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Act now, not later.</strong> People with elevated blood pressure are twice as likely to develop full hypertension compared to those with normal readings. The window to reverse it with lifestyle changes is open now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle changes */}
        <section aria-label="Lifestyle changes for elevated blood pressure" className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">6 lifestyle changes that help</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              No medication is needed at the elevated stage for most people. These six changes have the strongest evidence behind them.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {LIFESTYLE_CHANGES.map(({ title, body }) => (
                <div key={title} className="bg-gray-50 rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why home tracking matters */}
        <section aria-label="Why home blood pressure monitoring is valuable for elevated BP" className="py-16 px-4 bg-red-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why tracking at home is especially valuable here</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At the elevated stage, your readings can swing in and out of the normal range based on what you did that day. One reading at the doctor does not tell you much.
              </p>
              <p>
                Home monitoring over 30 days shows you the real picture. You can see whether your changes are working. You can show your doctor a trend instead of a single number. And you can catch a reading that crosses into Stage 1 territory before your next annual appointment.
              </p>
              <p>
                The AHA specifically recommends home monitoring for people with elevated or high blood pressure because it gives a much more accurate baseline than clinic readings.
              </p>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/free-download"
                className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
              >
                Start tracking with BPTrack <ArrowRight size={18} />
              </Link>
              <p className="text-sm text-gray-500 mt-3">Free. iPhone and Android. No subscription.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently asked questions about prehypertension" className="py-16 px-4 bg-white">
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
        <section aria-label="Download BPTrack" className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">See if your changes are working</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              BPTrack logs your readings daily and shows your 30-day trend. You will know within weeks if your lifestyle changes are moving your numbers in the right direction. Free to download.
            </p>
            <Link
              href="/free-download"
              className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors min-h-[48px]"
            >
              Download BPTrack free <ArrowRight size={18} />
            </Link>
            <p className="text-sm text-gray-400 mt-3">Free download. No subscription. iPhone and Android.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

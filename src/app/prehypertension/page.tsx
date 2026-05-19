import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Prehypertension? AHA Ranges + What to Do | BP Central',
  description:
    'Prehypertension (now called Elevated blood pressure) means systolic 120 to 129 and diastolic under 80. Learn what it means and how to track it.',
};

const LIFESTYLE_CHANGES = [
  { title: 'Cut sodium', body: 'The AHA recommends under 2,300 mg of sodium per day. Even better, aim for 1,500 mg. Processed foods, canned soups, and restaurant meals are the biggest sources. Reducing sodium alone can lower systolic by 2 to 8 mmHg.' },
  { title: 'Exercise regularly', body: 'Aim for at least 150 minutes of moderate activity per week. That is 30 minutes, five days a week. Brisk walking counts. Regular aerobic exercise can lower systolic blood pressure by 4 to 9 mmHg.' },
  { title: 'Manage your weight', body: 'Every 10 pounds of excess weight can raise blood pressure by about 4 mmHg. Losing just 5 to 10 pounds is enough to see a meaningful reduction in many people with elevated readings.' },
  { title: 'Eat more potassium', body: 'Potassium helps your kidneys flush out sodium. Foods high in potassium include bananas, sweet potatoes, spinach, and beans. The DASH diet is built around this approach and has strong clinical support.' },
  { title: 'Limit alcohol', body: 'Drinking more than one drink a day (for women) or two (for men) raises blood pressure over time. Cutting back is one of the fastest lifestyle changes with a measurable effect.' },
  { title: 'Quit smoking', body: 'Each cigarette causes a temporary spike in blood pressure. Over time, smoking damages artery walls. Quitting stops the damage and lowers your long-term cardiovascular risk significantly.' },
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
    a: 'Usually no. Blood pressure problems, even serious ones, rarely cause noticeable symptoms. This is why regular monitoring is so important. You will not feel elevated blood pressure, but it is still doing damage over time.',
  },
  {
    q: 'Why did the AHA change the name from prehypertension?',
    a: 'The AHA updated its guidelines in 2017. The old "prehypertension" range (120 to 139 systolic) was split into two categories: Elevated (120 to 129) and Stage 1 Hypertension (130 to 139). The rename reflects a better understanding of cardiovascular risk at lower thresholds.',
  },
  {
    q: 'How often should I check if I have elevated blood pressure?',
    a: 'The AHA recommends more frequent monitoring for people with elevated or high blood pressure. A common approach is twice a day for one week, then weekly once you have a stable baseline. BP Central makes this easy to track.',
  },
];

export default function PrehypertensionPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              Elevated blood pressure
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              What is prehypertension?
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed max-w-2xl">
              The AHA renamed it in 2017. Today it is called Elevated blood pressure. Here is what the range means, why it matters, and what you can do about it without medication.
            </p>
          </div>
        </section>

        {/* The name change */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              The 2017 update
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              The AHA renamed it in 2017.
            </h2>
            <div className="space-y-4 leading-relaxed mb-12 max-w-2xl" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                For years, doctors used the term &quot;prehypertension&quot; to describe readings between 120/80 and 139/89. In 2017, the American Heart Association updated its guidelines and retired that term.
              </p>
              <p>
                The old prehypertension range was split into two separate categories.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-0">
              <div style={{ borderTop: '1px solid oklch(0.86 0.012 20)', borderBottom: '1px solid oklch(0.86 0.012 20)' }}
                   className="py-7 sm:pr-8">
                <div className="flex items-center gap-3 mb-3">
                  <span aria-hidden="true"
                        style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.74 0.14 75)' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                      className="font-semibold">Elevated</h3>
                </div>
                <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }} className="text-sm pl-5 mb-1">Systolic 120 to 129</p>
                <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }} className="text-sm pl-5 mb-3">Diastolic under 80</p>
                <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-sm pl-5 leading-relaxed">Lifestyle changes recommended. No medication in most cases.</p>
              </div>
              <div style={{ borderTop: '1px solid oklch(0.86 0.012 20)', borderBottom: '1px solid oklch(0.86 0.012 20)' }}
                   className="py-7 sm:pl-8 sm:border-l">
                <div className="flex items-center gap-3 mb-3">
                  <span aria-hidden="true"
                        style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.66 0.16 50)' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                      className="font-semibold">Stage 1 Hypertension</h3>
                </div>
                <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }} className="text-sm pl-5 mb-1">Systolic 130 to 139</p>
                <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }} className="text-sm pl-5 mb-3">Diastolic 80 to 89</p>
                <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-sm pl-5 leading-relaxed">Talk to your doctor. Lifestyle changes plus possibly medication.</p>
              </div>
            </div>

            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mt-8 max-w-2xl">
              Why the change? Research showed that cardiovascular risk rises meaningfully at 130/80, not just at 140/90. The new categories reflect that risk more accurately.
            </p>
          </div>
        </section>

        {/* Why it matters */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Silent damage
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              Why elevated blood pressure matters.
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <p>
                A systolic reading of 125 does not feel like anything. Blood pressure rarely causes symptoms at this stage. That is exactly what makes it dangerous.
              </p>
              <p>
                Over years, elevated pressure causes wear on the artery walls. This leads to a gradual buildup of plaque, reduced elasticity, and higher risk of heart attack and stroke. The damage accumulates silently.
              </p>
              <p>
                The good news: elevated blood pressure is the easiest stage to reverse. At this range, lifestyle changes alone can bring readings back to normal without medication. Many people do it in a few months.
              </p>
              <p style={{ color: 'oklch(0.18 0.02 20)' }} className="font-medium pt-2">
                Act now, not later. People with elevated blood pressure are twice as likely to develop full hypertension compared to those with normal readings. The window to reverse it with lifestyle changes is open now.
              </p>
            </div>
          </div>
        </section>

        {/* Lifestyle changes */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Six changes
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Lifestyle changes that help.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              No medication is needed at the elevated stage for most people. These six changes have the strongest evidence behind them.
            </p>
            <div>
              {LIFESTYLE_CHANGES.map((item, i) => (
                <div key={item.title}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === LIFESTYLE_CHANGES.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
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

        {/* Why home tracking matters */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Home tracking
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-8">
              Why tracking at home is especially valuable here.
            </h2>
            <div className="space-y-4 leading-relaxed mb-10" style={{ color: 'oklch(0.40 0.018 20)' }}>
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
            <Link href="/free-download" className="btn-primary">
              Start tracking with BP Central
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free. iPhone and Android. No subscription.
            </p>
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
              See progress
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              See if your changes are working.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              BP Central logs your readings daily and shows your 30-day trend. You will know within weeks if your lifestyle changes are moving your numbers in the right direction.
            </p>
            <Link href="/free-download" className="btn-primary">
              Download BP Central free
            </Link>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mt-6">
              Free download. No subscription. iPhone and Android.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

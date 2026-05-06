import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support — BPTrack',
  description: 'Get help with the BPTrack app. Contact support or browse common questions.',
};

const FAQS = [
  {
    q: 'How do I get the app?',
    a: 'Search "BPTrack" in the App Store or Google Play. The app is free to download. The $6.99 one-time unlock removes entry limits and adds premium features.',
  },
  {
    q: 'What does the $6.99 unlock include?',
    a: 'Unlimited reading history, PDF export, trend charts, and Apple Health sync. One-time payment, no subscription, no expiration.',
  },
  {
    q: 'How do I restore my purchase?',
    a: 'Open the app, go to Settings, and tap "Restore Purchases." Make sure you are signed in to the same Apple ID or Google account you used to purchase.',
  },
  {
    q: 'Does the app require an account?',
    a: 'No account is required for offline use. An optional free account lets you sync your blood pressure readings across devices.',
  },
  {
    q: 'Is there a subscription?',
    a: 'No. BPTrack is free to download with entry limits, and $6.99 one-time to unlock everything. No monthly fees, ever.',
  },
  {
    q: 'How do I delete my account and data?',
    a: 'Go to Settings in the app and tap "Delete Account." This removes all cloud data within 30 days. Local data is removed when you uninstall the app.',
  },
];

export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              Support
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-4">
              App Support
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-10">
              Get help with BPTrack or give us feedback.
            </p>

            <div style={{ background: 'oklch(0.96 0.008 20)', border: '1px solid oklch(0.86 0.012 20)' }}
                 className="p-6 mb-12">
              <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                    className="uppercase text-xs font-semibold mb-2 block">
                Email support
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                  className="text-xl font-semibold mb-2">We respond within 1 to 2 business days.</h2>
              <a href="mailto:support@bptrack.app" style={{ color: 'oklch(0.45 0.18 25)' }} className="font-medium hover:underline">support@bptrack.app</a>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-2xl font-bold mb-2">
              Frequently asked questions
            </h2>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="mb-8">
              The most common questions, answered.
            </p>

            <div>
              {FAQS.map((faq, i) => (
                <details key={faq.q}
                         style={{
                           borderTop: '1px solid oklch(0.86 0.012 20)',
                           borderBottom: i === FAQS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                         }}
                         className="py-2">
                  <summary style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                           className="py-4 font-semibold cursor-pointer list-none flex justify-between items-center text-base">
                    {faq.q}
                    <span style={{ color: 'oklch(0.45 0.18 25)' }} className="text-lg ml-4">+</span>
                  </summary>
                  <div style={{ color: 'oklch(0.40 0.018 20)' }} className="pb-5 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="mt-12 text-sm text-center">
              See our <a href="/privacy" style={{ color: 'oklch(0.45 0.18 25)' }} className="hover:underline">Privacy Policy</a> for information on how we handle your data.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

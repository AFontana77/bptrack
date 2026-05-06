import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — BPTrack',
  description: 'Privacy policy for the BPTrack mobile application and bptrack.app website.',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              Legal
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-3">
              Privacy Policy
            </h1>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mb-12">Last updated: April 17, 2026</p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">1. Who we are</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              Anvil Road LLC operates bptrack.app and the BPTrack mobile application.
              Contact: <a href="mailto:support@bptrack.app" style={{ color: 'oklch(0.45 0.18 25)' }} className="hover:underline">support@bptrack.app</a>
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">2. Information we collect</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <li><strong>Account email address.</strong> Optional, for cross-device sync only.</li>
              <li><strong>Blood pressure readings you create.</strong> Stored locally on your device and, if you have an account, in our secure cloud database (Supabase).</li>
              <li><strong>Purchase confirmation.</strong> Via RevenueCat when you unlock premium features. We do not receive your payment details.</li>
              <li><strong>Device identifiers.</strong> Used by RevenueCat to associate your purchase with your device.</li>
            </ul>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">3. How we use your information</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <li>To operate the app and sync your data across devices (if you have an account)</li>
              <li>To restore your purchase on new devices</li>
              <li>To respond to support requests</li>
            </ul>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="mb-4">We do not use your data for advertising. We do not sell your data to any third party.</p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">4. Third-party services</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <li><strong>Supabase.</strong> Secure cloud database for optional account sync. Hosted on AWS US-East.</li>
              <li><strong>RevenueCat.</strong> In-app purchase management and subscription tracking.</li>
              <li><strong>Apple App Store and Google Play.</strong> App distribution and payment processing.</li>
            </ul>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">5. Data deletion</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              You may delete your account and all associated cloud data at any time from the app settings.
              We will delete your data within 30 days of the request. Local device data is deleted when you uninstall the app.
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">6. Children</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              This app is not directed at children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">7. Changes to this policy</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              We may update this policy. We will post the revised policy at this URL with a new last updated date.
              Continued use of the app after changes constitutes acceptance of the updated policy.
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">8. Contact</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">
              Questions about this policy? Email <a href="mailto:support@bptrack.app" style={{ color: 'oklch(0.45 0.18 25)' }} className="hover:underline">support@bptrack.app</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

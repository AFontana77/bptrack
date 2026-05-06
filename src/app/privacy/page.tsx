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
                className="text-xl font-semibold mt-10 mb-3">1. Who We Are</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              Anvil Road LLC operates bptrack.app and the BPTrack mobile application.
              Contact: <a href="mailto:support@bptrack.app" style={{ color: 'oklch(0.45 0.18 25)' }} className="hover:underline">support@bptrack.app</a>
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">2. Information We Collect</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="mb-3">We collect the minimum data needed to operate the app:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <li><strong>Blood pressure readings you log.</strong> Stored locally on your device only. This data is never uploaded to any server.</li>
              <li><strong>Purchase data.</strong> When you unlock the full app, RevenueCat receives a transaction ID and device identifier to verify and restore your purchase. We do not receive your payment details.</li>
            </ul>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <li>To operate the app and display your logged readings</li>
              <li>To restore your purchase on new devices</li>
              <li>To respond to support requests</li>
            </ul>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="mb-4">We do not use your data for advertising. We do not sell your data to any third party.</p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">4. Third-Party Services</h2>
            <ul className="list-disc pl-6 mb-4 space-y-1" style={{ color: 'oklch(0.40 0.018 20)' }}>
              <li><strong>RevenueCat.</strong> In-app purchase management. They receive device identifiers and transaction data to process and restore purchases.</li>
              <li><strong>Apple App Store and Google Play.</strong> App distribution and payment processing.</li>
            </ul>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">5. Data Deletion</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              Your data is stored only on your device. It is permanently deleted when you uninstall the app.
              We do not store any of your logged data on our servers.
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">6. Children</h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed mb-4">
              This app is not directed at children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-xl font-semibold mt-10 mb-3">7. Changes to This Policy</h2>
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

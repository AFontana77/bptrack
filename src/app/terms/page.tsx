import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — BPTrack',
  description: 'Terms of service for the BPTrack mobile application and bptrack.app website.',
};

export default function TermsPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-400 text-sm mb-8">Last updated: April 18, 2026</p>

            <p className="text-gray-600 leading-relaxed mb-6">
              These Terms of Service govern your use of the BPTrack blood pressure log app and the website at bptrack.app.
              By downloading the app or using the website, you agree to these terms.
              If you do not agree, do not use the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1. Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Anvil Road LLC operates bptrack.app and the BPTrack mobile application.
              Contact: <a href="mailto:support@bptrack.app" className="text-red-700 hover:underline">support@bptrack.app</a>
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2. Use of the Service</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              BPTrack is a personal blood pressure log app. You may use the service for personal, non-commercial purposes only.
              You agree not to misuse the service, reverse-engineer the app, or use it in any way that violates applicable law.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              You are responsible for all data you enter into the app. We do not verify the accuracy of your logged entries.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">3. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Creating an account is optional. If you create an account, you are responsible for keeping your credentials secure.
              You may delete your account at any time from the app settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">4. In-App Purchases</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              BPTrack offers a one-time in-app purchase ($6.99 USD) to unlock the full database and premium logging features.
              Purchases are processed by Apple App Store or Google Play and are subject to their respective refund policies.
              We do not process payment information directly.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Purchases are tied to your App Store or Google Play account and can be restored on new devices using the restore
              purchases option in settings.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content, design, code, and database records in the BPTrack app and website are owned by Anvil Road LLC
              or licensed to us. You may not copy, reproduce, or redistribute any part of the service without written permission.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Data you create in the app (your personal log entries) remains yours. We do not claim ownership of your personal records.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Health and Safety Notice</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              BPTrack is a personal logging tool, not a medical device. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any questions about your blood pressure or health.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              BPTrack is provided "as is" without warranties of any kind. Anvil Road LLC is not liable for any damages
              arising from use of the app, including data loss, inaccurate reference information, or service interruptions.
              Our total liability to you is limited to the amount you paid for any in-app purchase.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">7. Changes to These Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may update these terms from time to time. We will post the revised terms at this URL with a new last updated date.
              Continued use of the service after changes constitutes your acceptance of the updated terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">8. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              These terms are governed by the laws of the State of New Jersey, United States, without regard to conflict of law principles.
              Any disputes must be brought in the courts of New Jersey.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">9. Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              Questions about these terms? Email <a href="mailto:support@bptrack.app" className="text-red-700 hover:underline">support@bptrack.app</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

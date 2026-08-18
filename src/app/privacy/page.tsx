import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';
import { PRODUCT } from '@/lib/product';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How BP Central handles your blood pressure readings, what we store, where we store it, and how to delete it.',
  alternates: { canonical: `${PRODUCT.siteUrl}/privacy` },
};

/**
 * Rewritten in full on 18 August 2026, checked line by line against app commit
 * 94176f9.
 *
 * The previous version said readings were "stored locally on your device only",
 * were "never uploaded to any server", and were "permanently deleted when you
 * uninstall the app". None of that was true. BP Central saves every reading to
 * a hosted Supabase database. For a health app that was not a copy problem, it
 * was a published policy that misdescribed where health data goes.
 *
 * Rule for anyone editing this page: open the app source first. Readings are
 * written in src/engine/SessionLogger.tsx, the identity comes from
 * src/hooks/useAuth.ts, deletion is in app/(tabs)/settings.tsx, and purchases
 * are in src/hooks/usePurchase.ts.
 */

const UPDATED = 'August 18, 2026';

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display text-xl font-semibold mt-12 mb-3"
      style={{ color: 'var(--foreground)' }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 mb-4 space-y-2" style={{ color: 'var(--muted-foreground)' }}>
      {children}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <span
              className="uppercase text-xs font-semibold mb-6 block"
              style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
            >
              Legal
            </span>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold mb-3"
              style={{ color: 'var(--foreground)', lineHeight: 1.1 }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm mb-10" style={{ color: 'var(--muted-foreground)' }}>
              Last updated: {UPDATED}
            </p>

            <div
              className="rounded-xl p-6 mb-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                The short version
              </p>
              <p className="leading-relaxed text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Your readings are saved in our database in the cloud, not only on your phone. You
                never give us a name or an email to use the app. We do not sell anything about you,
                we run no ads, and there is no analytics or tracking code inside the app. You can
                delete your readings from Settings at any time.
              </p>
            </div>

            <H2>1. Who we are</H2>
            <P>
              {PRODUCT.publisher} runs {PRODUCT.domain} and the BP Central app for iPhone and
              Android. You can reach us at{' '}
              <a href={`mailto:${PRODUCT.supportEmail}`} style={{ color: 'var(--primary)' }}>
                {PRODUCT.supportEmail}
              </a>
              .
            </P>

            <H2>2. You do not make an account</H2>
            <P>
              BP Central has no sign up, no login and no password. We never ask for your name, your
              email address, your date of birth or your phone number.
            </P>
            <P>
              The app still needs a way to tell your readings apart from someone else&apos;s. The
              first time you open it, it quietly creates an anonymous technical identity for that
              install. It is a random ID. It is not linked to you, to your Apple ID, or to your
              email. Your phone keeps the key to it in the device keychain.
            </P>
            <P>
              One thing follows from that, and it is worth knowing before you rely on the app. Since
              there is no account, there is no way to sign in somewhere else. If you delete the app
              or lose the phone, you lose the key to your readings. They cannot be recovered and we
              cannot recover them for you, because we have no way to prove which readings were
              yours.
            </P>

            <H2>3. What we store</H2>
            <UL>
              <li>
                <strong style={{ color: 'var(--foreground)' }}>Your readings.</strong> The top
                number, the bottom number, your pulse, and whatever else you choose to record with
                a reading, such as which arm you used, your position, the time of day, whether you
                had taken medicine, caffeine or exercise, and any note you type. Each one is saved
                with the date and time and your anonymous ID.
              </li>
              <li>
                <strong style={{ color: 'var(--foreground)' }}>Whether you have paid.</strong> If
                you buy the unlock we store a row saying that this anonymous ID owns it, which
                platform it came from, and the product ID. Nothing else.
              </li>
            </UL>
            <P>
              That is the whole list. There is no name field, no email field and no contact
              information anywhere in the app.
            </P>

            <H2>4. Where it is stored, and why</H2>
            <P>
              Your readings are stored in a Postgres database hosted by Supabase, not only on your
              phone. We want to be plain about this because our earlier policy said the opposite,
              and it was wrong.
            </P>
            <P>
              We store readings this way so the app can do the things it is for: work out your 7,
              30 and 90 day averages, draw your trend, and keep a history that is longer than one
              screen. Database rules restrict every row to the anonymous ID that created it, so one
              install cannot read another install&apos;s readings.
            </P>
            <P>
              Being honest about the trade off: your readings sit on a server we run rather than
              only on your handset. We think that is the right call for an app whose whole job is
              keeping a long record. You should know it before you decide.
            </P>

            <H2>5. What we do not do</H2>
            <UL>
              <li>We do not sell or rent your data to anyone.</li>
              <li>We do not run ads and we do not use your readings to target anything at you.</li>
              <li>
                There is no analytics, crash reporting or tracking software inside the app. No
                Google Analytics, no Facebook SDK, no PostHog, no Firebase, nothing of that kind.
              </li>
              <li>The app does not read your contacts, your location, your photos or your health records.</li>
              <li>The app does not connect to Apple Health and does not read data from other apps.</li>
            </UL>

            <H2>6. Other companies involved</H2>
            <UL>
              <li>
                <strong style={{ color: 'var(--foreground)' }}>Supabase</strong> hosts the database
                and the anonymous sign in that your readings are stored under.
              </li>
              <li>
                <strong style={{ color: 'var(--foreground)' }}>RevenueCat</strong> handles the
                one-time purchase and the restore button. It creates its own anonymous ID for the
                purchase. We do not give it your readings and we do not give it the ID your readings
                are stored under.
              </li>
              <li>
                <strong style={{ color: 'var(--foreground)' }}>Apple and Google</strong> take the
                payment and distribute the app. We never see your card details.
              </li>
            </UL>

            <H2>7. Deleting your readings</H2>
            <P>
              Open Settings in the app and tap <strong style={{ color: 'var(--foreground)' }}>Delete my data</strong>.
              This removes your BP Central readings from our database straight away. It cannot be undone.
            </P>
            <P>
              Two things it deliberately leaves alone. It does not cancel your purchase, so you keep
              what you paid for and the app stays usable. And it does not delete the anonymous
              identity itself, so the app keeps working and you can start logging again.
            </P>
            <P>
              If you want everything gone, tap Delete my data and then delete the app. If you would
              rather we did it, email{' '}
              <a href={`mailto:${PRODUCT.supportEmail}`} style={{ color: 'var(--primary)' }}>
                {PRODUCT.supportEmail}
              </a>
              . Please note what we said in section 2: without an account we have no way to prove
              which rows are yours, so use the in app button where you can.
            </P>

            <H2>8. The website is separate from the app</H2>
            <P>
              This part is about {PRODUCT.domain}, not the app.
            </P>
            <P>
              If you ask us for the home measurement checklist, or ask to hear when the app
              launches, we store your email address, the fact that you ticked the consent box and
              when, which page you were on, and which offer you responded to. We use it to send you
              the checklist and occasional news about BP Central. You can unsubscribe from any
              email.
            </P>
            <P>
              <strong style={{ color: 'var(--foreground)' }}>
                The mailing list and your readings are kept completely apart.
              </strong>{' '}
              They are different systems with different providers and no shared key. Nothing about
              your readings, your averages, your ranges or whether you have paid is ever sent to the
              mailing list, and your email address is never attached to your readings. We could not
              join the two together even if we wanted to.
            </P>
            <P>
              The website itself uses Google Tag Manager for ordinary website analytics. That is the
              website only. The app contains no analytics of any kind.
            </P>

            <H2>9. Medical information</H2>
            <P>
              BP Central is not a medical device and we are not a healthcare provider. We are not a
              covered entity under HIPAA and we make no claim to any medical certification. The app
              records numbers you type in and shows you the published range they fall into. It does
              not diagnose anything and it is not medical advice.
            </P>

            <H2>10. Children</H2>
            <P>
              BP Central is not meant for children under 13 and we do not knowingly collect
              information from them.
            </P>

            <H2>11. Changes</H2>
            <P>
              If we change this policy we will post the new version here with a new date at the top.
            </P>

            <H2>12. Contact</H2>
            <P>
              Questions about any of this? Email{' '}
              <a href={`mailto:${PRODUCT.supportEmail}`} style={{ color: 'var(--primary)' }}>
                {PRODUCT.supportEmail}
              </a>
              .
            </P>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

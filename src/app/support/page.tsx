import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCT, MEDICAL_DISCLAIMER } from '@/lib/product';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Help with BP Central. How to log a reading, what the unlock includes, restoring a purchase, deleting your data, and how to reach us.',
  alternates: { canonical: `${PRODUCT.siteUrl}/support` },
};

/**
 * Rewritten 18 August 2026 against app commit 94176f9.
 *
 * The old answers told people to search the App Store for the retired brand name, sold a PDF
 * export and Apple Health sync, described optional accounts and cross-device
 * sync, promised offline use, and pointed at a "Delete Account" button. None of
 * those exist. Every answer below matches a screen you can actually open.
 */

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'How do I log a reading?',
    a: (
      <>
        Open the Log tab. Type the top number, the bottom number and your pulse, then tap Save.
        Everything else is optional. You can also record which arm you used, whether you were
        sitting or standing, the time of day, and a note.
      </>
    ),
  },
  {
    q: 'Which number goes first?',
    a: (
      <>
        The top number goes first. That is the systolic number, the larger of the two. The bottom
        number is diastolic. The app labels the boxes SYS and DIA and shows an example. If you type
        them the wrong way round, it notices and offers to swap them before saving.
      </>
    ),
  },
  {
    q: 'Does BP Central measure my blood pressure?',
    a: (
      <>
        No. You need a blood pressure monitor. BP Central is where you keep what the monitor tells
        you. If you want help getting a good reading, our{' '}
        <Link href="/checklist" style={{ color: 'var(--primary)' }}>
          home measurement checklist
        </Link>{' '}
        walks through it.
      </>
    ),
  },
  {
    q: 'Where do I see my old readings?',
    a: (
      <>
        The History tab holds every reading you have saved. You can search it and filter it by date.
        Tap any reading to open it and see everything you recorded with it. The Stats tab also shows
        your three most recent readings with a link through to the full list.
      </>
    ),
  },
  {
    q: 'How do the trends work?',
    a: (
      <>
        The Stats tab draws your readings over time. You can switch between 7 days, 30 days, 90 days
        and everything. Tap any point on the chart to see that exact reading, including the time of
        day and your pulse. Below the chart you get your averages for each of those periods.
      </>
    ),
  },
  {
    q: 'What is the Learn tab?',
    a: (
      <>
        A small set of plain explanations of blood pressure terms and the ranges on the American
        Heart Association chart. Each one says where it came from and links to the source. It is
        background reading, not advice about you.
      </>
    ),
  },
  {
    q: 'How do I share my readings with my doctor?',
    a: (
      <>
        Open Stats and tap Shareable summary, or find it in Settings under Your readings. Pick a
        period, check the summary that appears, then tap Share. It goes out through your phone&apos;s
        normal share button, so you can text it, email it, or save it to your notes. It is plain
        text, not a PDF, and it contains only your readings and averages.
      </>
    ),
  },
  {
    q: 'What is free and what costs money?',
    a: (
      <>
        Your first {PRODUCT.freeReadings} readings are free. After that, unlocking the app costs{' '}
        {PRODUCT.price} one time. That gives you unlimited readings, your complete history, the 7,
        30 and 90 day averages and trends, and the shareable summary. There is no subscription.
      </>
    ),
  },
  {
    q: 'I paid before. How do I get it back on a new phone?',
    a: (
      <>
        Open Settings and tap Restore purchases. Make sure you are signed in to the same Apple ID or
        Google account you bought it with. Your purchase comes back. Please note that your readings
        do not, because the app has no account. See the next answer.
      </>
    ),
  },
  {
    q: 'Do I need an account?',
    a: (
      <>
        No, and you cannot make one. There is no sign up, no password and no email. The app creates
        an anonymous ID on your phone and stores your readings under it. That also means your
        readings do not follow you to a new phone, and we cannot recover them if you delete the app,
        because we have no way to prove which ones were yours. Send yourself a shareable summary now
        and then if you want your own copy.
      </>
    ),
  },
  {
    q: 'Where are my readings kept?',
    a: (
      <>
        In our database in the cloud, under that anonymous ID. They are not kept only on your phone.
        Our{' '}
        <Link href="/privacy" style={{ color: 'var(--primary)' }}>
          privacy policy
        </Link>{' '}
        explains exactly what is stored and why.
      </>
    ),
  },
  {
    q: 'How do I delete my readings?',
    a: (
      <>
        Open Settings and tap Delete my data. It removes your BP Central readings straight away and
        cannot be undone. Your purchase is not affected, so the app still works afterwards.
      </>
    ),
  },
  {
    q: 'Does it work without internet?',
    a: (
      <>
        No. BP Central needs a connection to save and load your readings. There is no offline mode.
      </>
    ),
  },
  {
    q: 'Will it remind me to take a reading?',
    a: <>Not at the moment. There are no reminders and no notifications.</>,
  },
  {
    q: 'Does it connect to Apple Health or my cuff?',
    a: (
      <>
        No. BP Central does not link to Apple Health, Google Fit, or any Bluetooth blood pressure
        monitor. You type your readings in yourself.
      </>
    ),
  },
];

export default function SupportPage() {
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
              Support
            </span>
            <h1
              className="font-display text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--foreground)', lineHeight: 1.1 }}
            >
              Help with BP Central
            </h1>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--muted-foreground)' }}>
              Answers to the questions we get most. If yours is not here, email us.
            </p>

            <div
              className="rounded-xl p-6 mb-14"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <span
                className="uppercase text-xs font-semibold mb-2 block"
                style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
              >
                Email support
              </span>
              <h2 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                We reply within 1 to 2 working days.
              </h2>
              <a href={`mailto:${PRODUCT.supportEmail}`} className="font-medium" style={{ color: 'var(--primary)' }}>
                {PRODUCT.supportEmail}
              </a>
            </div>

            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              Common questions
            </h2>
            <p className="mb-8" style={{ color: 'var(--muted-foreground)' }}>
              Tap any question to open it.
            </p>

            <div>
              {FAQS.map((faq, i) => (
                <details
                  key={faq.q}
                  className="py-2"
                  style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === FAQS.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <summary
                    className="font-display py-4 font-semibold cursor-pointer list-none flex justify-between items-center text-base gap-4"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {faq.q}
                    <span className="text-lg shrink-0" style={{ color: 'var(--primary)' }}>
                      +
                    </span>
                  </summary>
                  <div className="pb-5 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>

            <div
              className="mt-12 rounded-xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {MEDICAL_DISCLAIMER}
              </p>
            </div>

            <p className="mt-8 text-sm text-center" style={{ color: 'var(--muted-foreground)' }}>
              Read our{' '}
              <Link href="/privacy" style={{ color: 'var(--primary)' }}>
                privacy policy
              </Link>{' '}
              for how we handle your data.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

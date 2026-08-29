import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageSchema } from '@/components/PageSchema';
import { AppStoreCta, AppStoreCaption } from '@/components/AppStoreCta';
import { SiblingCallout } from '@/components/SiblingCallout';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { MonitorCard } from '@/components/MonitorCard';
import { MONITORS } from '@/lib/monitors';
import {
  MEDICAL_DISCLAIMER,
  CUFFLESS_SOURCES,
  PRODUCT,
  FEATURES,
  NOT_INCLUDED,
} from '@/lib/product';
import Link from 'next/link';
import type { Metadata } from 'next';

const URL = 'https://bptrack.app/blood-pressure-apps';
const REVIEWED = '29 August 2026';

export const metadata: Metadata = {
  title: 'Blood Pressure Apps: What They Do, and the One Thing None of Them Can',
  description:
    'No app measures blood pressure from your phone. The AHA advises against cuffless devices for diagnosis, and a JAMA study found one popular app falsely reassured most people with high blood pressure. Here is what a blood pressure app is actually for.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Blood Pressure Apps: What They Do, and the One Thing None of Them Can',
    description:
      'No phone measures blood pressure. Here is what a blood pressure app is actually good for, and how to pick one.',
  },
};

const KINDS = [
  {
    n: '01',
    name: 'Apps that claim to measure your blood pressure',
    verdict: 'Do not use these',
    body: 'You put a finger on the camera, or hold the phone to your chest, and it shows you a number. There is no cuff anywhere in that description, and pressure is what a cuff measures. These are the apps the research below is about.',
  },
  {
    n: '02',
    name: 'Companion apps that come with a cuff',
    verdict: 'Fine, if you bought that cuff',
    body: 'Omron Connect, Withings Health Mate, Beurer HealthCoach. A real monitor takes the reading and sends it over Bluetooth. The app is a place for the numbers to land. Each one only works with its own brand of monitor, which is the catch.',
  },
  {
    n: '03',
    name: 'Loggers you type into yourself',
    verdict: 'Works with any monitor',
    body: 'You read the number off the monitor screen and type it in. Nothing pairs and nothing syncs. That sounds like more work, and it is about eight seconds of it. In exchange the app works with the monitor you already own, including one with no Bluetooth at all.',
  },
];

const FAQS = [
  {
    q: 'Can an app measure my blood pressure without a cuff?',
    a: 'No. Blood pressure is the pressure inside an artery, and measuring it means pushing back against that pressure with a cuff and detecting when the flow changes. A phone camera and a fingertip cannot do that. The American Heart Association looked at cuffless devices in a 2026 scientific statement and found they are not yet accurate enough to diagnose high blood pressure or guide treatment, and the 2025 AHA and ACC guideline recommends against using them for either.',
  },
  {
    q: 'What is the best blood pressure app?',
    a: 'It depends on your monitor. If your monitor has Bluetooth, its own companion app is the least work because readings arrive on their own. If your monitor has no Bluetooth, or you would rather not run the manufacturer app, a logger you type into works with any monitor. What matters more than the app is that the monitor itself is a validated model with a cuff that fits your arm.',
  },
  {
    q: 'Are free blood pressure apps any good?',
    a: 'Some are. Both Apple Health and Android Health Connect let you type readings in by hand at no cost, and both can export a file. They are general health apps rather than blood pressure tools, so they hold the numbers without doing much with them. Paid loggers usually add averages, trends and a summary you can hand over. Free is a fine place to start.',
  },
  {
    q: 'Do I need an app to track my blood pressure?',
    a: 'No. A paper log with the date, the time, both numbers and your pulse is exactly what most clinics ask for, and many hand out the chart themselves. An app helps with the parts paper is bad at: working out averages over weeks, keeping a history that does not get lost, and producing a summary without you doing the maths.',
  },
  {
    q: 'Does a blood pressure app make my monitor more accurate?',
    a: 'No. Accuracy comes from the monitor, the cuff size and whether that exact model passed a validation test. Nothing about a phone being nearby changes any of those. An app changes whether your readings survive long enough to be useful.',
  },
  {
    q: 'Will an app tell me if my blood pressure is dangerous?',
    a: 'Do not rely on one to. An app can show you which range a reading falls in on a published chart, which is a lookup. It cannot examine you and it does not know your history. If a reading is very high and you feel unwell, that is a medical question and it is urgent.',
  },
];

export default function BloodPressureAppsPage() {
  const simplest = MONITORS.find((m) => m.id === 'ad-ua-651');

  return (
    <>
      <PageSchema
        path="/blood-pressure-apps"
        headline="Blood Pressure Apps: What They Do, and the One Thing None of Them Can"
        published="2026-08-29"
        modified="2026-08-29"
        breadcrumb={[{ name: 'Resources', path: '/resources' }]}
        faqs={FAQS}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">
        {/* Answer first. This is the paragraph worth being quoted on. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <nav aria-label="Breadcrumb" className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
              <Link href="/" className="underline underline-offset-2">Home</Link>
              {' / '}
              <Link href="/resources" className="underline underline-offset-2">Resources</Link>
            </nav>

            <h1
              className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Blood pressure apps, honestly
            </h1>

            <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              <strong>No app measures your blood pressure.</strong> Not from your fingertip, not
              from the camera, not from your watch. Measuring blood pressure means squeezing an
              artery with a cuff and detecting when the flow changes, and a phone has nothing to
              squeeze with.
            </p>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              What a blood pressure app is genuinely good at is the part that comes after the cuff:
              keeping every reading, working out the averages, and turning months of numbers into
              something you can hand to a doctor. That is worth having. It is just a different job
              from the one the App Store screenshots imply. Reviewed {REVIEWED}.
            </p>
          </div>
        </section>

        {/* The sourced claim. The reason this page deserves to exist. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Why phone-only readings do not work
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              This is not our opinion, and it is worth reading the sources rather than taking ours.
            </p>

            <div className="space-y-5">
              {[CUFFLESS_SOURCES.aha, CUFFLESS_SOURCES.harvard].map((src) => (
                <div
                  key={src.url}
                  className="rounded-xl px-6 py-5"
                  style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--primary)' }}>
                    {src.organization}
                  </p>
                  <p className="leading-relaxed mb-3" style={{ color: 'var(--foreground)' }}>
                    {src.finding}
                  </p>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 inline-flex items-center min-h-[44px]"
                    style={{ color: 'var(--primary)' }}
                  >
                    {src.title}
                    {'citation' in src && src.citation ? `, ${src.citation}` : ''}
                  </a>
                </div>
              ))}
            </div>

            <p className="text-sm leading-relaxed mt-6" style={{ color: 'var(--muted-foreground)' }}>
              The failure mode is the dangerous direction. An app that reads low tells someone with
              high blood pressure that they are fine, and they stop looking. That is the finding in
              the JAMA study: most people with high blood pressure using that app were told their
              numbers were normal.
            </p>
          </div>
        </section>

        {/* The three kinds. The useful mental model. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
              Three different things are called a blood pressure app
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              They sit next to each other in search results and they do not do the same job.
            </p>

            <div className="space-y-5">
              {KINDS.map((k) => (
                <article
                  key={k.n}
                  className="rounded-xl px-6 py-6"
                  style={{ border: '1px solid var(--border)', background: 'var(--background)' }}
                >
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <span aria-hidden="true" className="text-xs font-semibold num" style={{ color: 'var(--muted-foreground)' }}>
                      {k.n}
                    </span>
                    <span className="uppercase text-xs font-semibold tracking-[0.14em]" style={{ color: 'var(--primary)' }}>
                      {k.verdict}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                    {k.name}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {k.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* The commercial turn, and it is the honest one: the conclusion of this
            page is that you need a cuff, so a cuff is the right thing to offer. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Whichever app you pick, the monitor is the part that matters
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              Every app on this page depends on a number that came from a cuff. If that number is
              wrong, a beautiful chart of it is still wrong. Two things decide whether it is right:
              whether the exact model passed an independent accuracy test, and whether the cuff fits
              your arm.
            </p>

            <div className="mb-6">
              <AffiliateDisclosure />
            </div>

            {simplest ? <MonitorCard monitor={simplest} index={0} /> : null}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/validated-blood-pressure-monitors" className="btn-primary">
                See all four validated picks
              </Link>
              <Link href="/blood-pressure-cuff-size" className="btn-ghost">
                Check your cuff size first
              </Link>
            </div>
          </div>
        </section>

        {/* BP Central, described exactly. No overselling a product nobody can buy. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Where {PRODUCT.name} fits
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              We make one, so treat this section as what it is. {PRODUCT.name} is the third kind:
              a logger you type into. It works with any monitor because it never talks to one.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--foreground)' }}>
                  What it does
                </p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {FEATURES.map((f) => (
                    <li key={f.label} className="flex gap-2">
                      <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: 'var(--foreground)' }}>
                  What it does not
                </p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {NOT_INCLUDED.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span aria-hidden="true" style={{ color: 'var(--muted-foreground)' }}>&middot;</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <AppStoreCta source="/blood-pressure-apps" />
            <AppStoreCaption />
          </div>
        </section>

        {/* FAQ, visible and matching schema. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
              Common questions
            </h2>
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              {FAQS.map((f) => (
                <div key={f.q} className="py-6 border-b" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="font-display text-lg mb-2" style={{ color: 'var(--foreground)' }}>
                    {f.q}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-8" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Next steps
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                ['/blood-pressure-average-calculator', 'Average your readings', 'The maths an app does for you, free, in your browser.'],
                ['/checklist', 'Take a reading you can trust', 'Setup beats software. Every step comes from the AHA.'],
                ['/validated-blood-pressure-monitors', 'Validated monitors', 'Four models whose exact numbers we checked.'],
                ['/log-sheet', 'Printable log sheet', 'No app required.'],
              ].map(([href, title, desc]) => (
                <li key={href}>
                  <Link href={href} className="block rounded-lg px-5 py-4 min-h-[44px]" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
                    <span className="font-semibold block" style={{ color: 'var(--primary)' }}>{title}</span>
                    <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <SiblingCallout
              question="Want the companion app compared brand by brand?"
              deepLink="/bp-monitor-app-comparison"
              deepLinkLabel="Read the app comparison on BP Monitor Lab"
              placement="apps-footer"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

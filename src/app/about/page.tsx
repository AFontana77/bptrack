import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageSchema } from '@/components/PageSchema';
import { PRODUCT, SIBLING, MEDICAL_DISCLAIMER, AHA_SOURCE, AHA_AMA_HOME_SOURCE, APP_STORE } from '@/lib/product';
import { VDL_SOURCE, AMAZON_TAG } from '@/lib/monitors';
import Link from 'next/link';
import type { Metadata } from 'next';

const URL = `${PRODUCT.siteUrl}/about`;
const REVIEWED = '30 August 2026';

export const metadata: Metadata = {
  title: 'About BP Central: Who We Are and How We Research This',
  description:
    'Who publishes bptrack.app, what it covers, what it deliberately does not do, how claims are researched and sourced, whether we test devices ourselves, and how we make money. Plus how to tell us we got something wrong.',
  alternates: { canonical: URL },
};

/**
 * The trust page.
 *
 * It was 166 words, which is thin for the page that answers "who is telling me
 * this" on a property about a medical measurement. It also carried an uncited
 * "47% of American adults" statistic and an unsourced behavioural claim that
 * "most cannot show their doctor a meaningful log".
 *
 * The prevalence figure turned out to be right (47.7%, CDC/NCHS) and is now
 * cited. The behavioural claim was not checkable and is gone, replaced by a
 * sourced statistic that makes the same point better: only about a fifth of
 * people with hypertension have it controlled.
 *
 * The testing policy section exists because a sister property in this portfolio
 * shipped a page whose byline said "not from our own device testing" while its
 * body described a week of first-hand testing. Stating the policy plainly, in
 * one place, is how that stops being possible to do by accident.
 */

const SOURCES = [
  {
    what: 'Blood pressure categories and what the numbers mean',
    who: AHA_SOURCE.organization,
    title: AHA_SOURCE.title,
    url: AHA_SOURCE.url,
    note: `${AHA_SOURCE.reviewed}. The 2025 ACC/AHA guideline kept these categories and the 130/80 threshold unchanged from 2017.`,
  },
  {
    what: 'How many readings to take, and averaging them',
    who: AHA_AMA_HOME_SOURCE.organization,
    title: AHA_AMA_HOME_SOURCE.title,
    url: AHA_AMA_HOME_SOURCE.url,
    note: AHA_AMA_HOME_SOURCE.citation,
  },
  {
    what: 'Whether a specific monitor was tested for accuracy',
    who: VDL_SOURCE.operator,
    title: VDL_SOURCE.name,
    url: VDL_SOURCE.url,
    note: `Checked by exact model number, filtered to home devices. ${VDL_SOURCE.independence}`,
  },
  {
    what: 'What the wrong cuff size costs you in mmHg',
    who: 'Ishigami J, Charleston J, Miller ER III, et al.',
    title: 'Effects of Cuff Size on the Accuracy of Blood Pressure Readings: The Cuff(SZ) Randomized Crossover Trial',
    url: 'https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2807853',
    note: 'JAMA Internal Medicine, 2023. Randomised crossover, 195 adults.',
  },
  {
    what: 'Whether a phone can measure blood pressure without a cuff',
    who: 'American Heart Association',
    title: 'Cuffless Devices for the Measurement of Blood Pressure: A Scientific Statement',
    url: 'https://www.ahajournals.org/doi/10.1161/HYP.0000000000000254',
    note: 'Hypertension, 2026.',
  },
  {
    what: 'How common high blood pressure is',
    who: 'CDC, National Center for Health Statistics',
    title: 'Hypertension Prevalence, Awareness, Treatment, and Control Among Adults Age 18 and Older: United States, August 2021 to August 2023',
    url: 'https://www.cdc.gov/nchs/products/databriefs/db511.htm',
    note: 'NCHS Data Brief No. 511, October 2024.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageSchema
        path="/about"
        headline="About BP Central: Who We Are and How We Research This"
        published="2026-04-19"
        modified="2026-08-30"
      />
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight mb-6" style={{ color: 'var(--foreground)' }}>
              Who we are, and how we work
            </h1>
            <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              {PRODUCT.domain} is published by {PRODUCT.publisher}. It exists to help one specific
              person: somebody whose doctor asked them to check their blood pressure at home, and
              who was not told how.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Reviewed {REVIEWED}.
            </p>
          </div>
        </section>

        {/* Why, with the statistic properly sourced this time. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Why this site exists
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              Nearly half of American adults have high blood pressure — <strong>47.7%</strong>,
              measured across August 2021 to August 2023. Of those who have it, only about{' '}
              <strong>one in five</strong> have it controlled to below 130/80.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
              Home monitoring sits in the middle of that gap, and it is handed to people with very
              little instruction. The cuff arrives in a box, the number appears on a screen, and
              nobody explains that the size of the cuff can move that number by more than the
              difference between two categories, or that one reading means almost nothing on its
              own.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Source: CDC, National Center for Health Statistics.{' '}
              <a href="https://www.cdc.gov/nchs/products/databriefs/db511.htm" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
                NCHS Data Brief No. 511
              </a>
              , October 2024.
            </p>
          </div>
        </section>

        {/* Scope, both halves. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              What we cover, and what we do not
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl px-6 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>We cover</p>
                <ul className="text-sm space-y-2" style={{ color: 'var(--muted-foreground)' }}>
                  {['Measuring: setup, posture, cuff fit', 'Recording: what to write down, on paper or a phone', 'Averaging: turning a set of readings into one number', 'Organising: sessions, days, appointment preparation', 'Tracking: what apps do, and what they cannot'].map((t) => (
                    <li key={t} className="flex gap-2"><span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl px-6 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>We do not</p>
                <ul className="text-sm space-y-2" style={{ color: 'var(--muted-foreground)' }}>
                  {['Diagnose high blood pressure, or anything else', 'Recommend, change or comment on medication', 'Tell you how to lower your blood pressure', 'Replace a clinician who can examine you', 'Claim a phone can measure blood pressure without a cuff'].map((t) => (
                    <li key={t} className="flex gap-2"><span aria-hidden="true" style={{ color: 'var(--muted-foreground)' }}>&middot;</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testing policy. Stated once, plainly. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Do we test the devices ourselves?
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              <strong>No, and we will not pretend otherwise.</strong> We are not a laboratory, we do
              not put cuffs on volunteers, and we do not time apps with a stopwatch.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
              What we do instead is check two things for every monitor we recommend, and drop
              anything that fails either. First, that the exact model number appears on the AMA
              Validated Device Listing, filtered to home devices — not the brand, not the product
              family, the number. Second, that the listing we link to reports that same model
              number in its own specification field.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
              If you ever see a claim on this site that reads like first-hand testing, that is a
              mistake and we want to hear about it.
            </p>
          </div>
        </section>

        {/* Sources. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Where the facts come from
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Every clinical claim on this site traces to one of these, and each is linked at the
              point it is used rather than buried here.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {SOURCES.map((s) => (
                <div key={s.url + s.what} className="px-5 py-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: 'var(--primary)' }}>{s.what}</p>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4 inline-flex items-center min-h-[36px]" style={{ color: 'var(--foreground)' }}>
                    {s.title}
                  </a>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--muted-foreground)' }}>{s.who}. {s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Money and ownership. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              How we make money, and what we own
            </h2>
            <div className="space-y-5">
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Amazon</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  We are an Amazon Associate and earn a commission on qualifying purchases made
                  through links on this site, at no extra cost to you. Our tag is{' '}
                  <span className="num">{AMAZON_TAG}</span>. It changes nothing about which monitors
                  appear: no brand has paid to be listed, no brand has seen a page before
                  publication, and products are dropped when they fail the model-number check
                  regardless of whether they would have earned anything.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{PRODUCT.name}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  We make it. It is our own app, so treat what we say about it accordingly. It is
                  free for your first {PRODUCT.freeReadings} readings and then {PRODUCT.price}{' '}
                  {PRODUCT.priceNote}, with no subscription.{' '}
                  {APP_STORE.released ? '' : 'It is not on an app store yet, and every page on this site says so rather than linking somewhere that does not exist.'}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{SIBLING.name}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Also ours, and we say so every time we link to it. It covers the hardware in
                  depth: model-by-model reviews, validation detail, error codes, device
                  compatibility. This site covers what you do with the numbers afterwards. When the
                  hardware question is genuinely the better answer we send you there rather than
                  writing a thinner version of a page that already exists.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>Email</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  If you join the list we hold your address and nothing else about your health. We
                  never ask for a reading. The average calculator and the cuff helper run entirely
                  in your browser and send nothing anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corrections. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Tell us if we got something wrong
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              We would rather be corrected than be wrong quietly. If a number on this site does not
              match its source, a cuff range has changed, a product is no longer the model we
              describe, or a link is dead, email{' '}
              <a href={`mailto:${PRODUCT.supportEmail}`} className="underline underline-offset-4" style={{ color: 'var(--primary)' }}>
                {PRODUCT.supportEmail}
              </a>{' '}
              and say what and where.
            </p>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Pages carry the date they were last reviewed. When we change a fact rather than a
              phrase, we change that date.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/resources" className="btn-ghost">All resources</Link>
              <Link href="/support" className="btn-ghost">Support</Link>
            </div>
            <p className="text-sm leading-relaxed mt-8" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

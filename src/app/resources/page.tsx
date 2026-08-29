import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MEDICAL_DISCLAIMER } from '@/lib/product';
import { AMAZON_DISCLOSURE } from '@/lib/monitors';
import Link from 'next/link';
import type { Metadata } from 'next';

const URL = 'https://bptrack.app/resources';

export const metadata: Metadata = {
  title: 'Blood Pressure Resources: Monitors, Readings and Charts',
  description:
    'Everything BP Central publishes, in the order you need it. Pick a validated monitor, get the cuff size right, take the reading properly, then understand what the number means.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'Blood Pressure Resources: Monitors, Readings and Charts',
    description: 'Pick a monitor, size the cuff, take the reading, understand the number.',
  },
};

/**
 * The hub.
 *
 * Ordered the way a real person hits these problems rather than by how much
 * traffic each page gets. Someone who has just been told to monitor at home
 * needs a monitor before they need a chart.
 */
const GROUPS = [
  {
    step: 'Start here',
    heading: 'Getting set up',
    blurb: 'Buy the right thing once, instead of buying twice.',
    links: [
      {
        href: '/validated-blood-pressure-monitors',
        title: 'Validated blood pressure monitors',
        desc: 'The four we recommend, every model number checked against the AMA listing, plus the ones we rejected and why.',
      },
      {
        href: '/blood-pressure-cuff-size',
        title: 'Blood pressure cuff size chart',
        desc: 'Measure your arm, match it to the chart. The wrong cuff size changes your reading more than the wrong monitor does.',
      },
    ],
  },
  {
    step: 'Then',
    heading: 'Taking a reading you can trust',
    blurb: 'The same reading taken two different ways gives two different numbers.',
    links: [
      {
        href: '/how-to-read-blood-pressure',
        title: 'How to take and read a blood pressure reading',
        desc: 'What the top and bottom numbers mean, how to sit, and the mistakes that quietly push readings up.',
      },
      {
        href: '/checklist',
        title: 'Home measurement checklist',
        desc: 'A short checklist to run through before each reading. Free.',
      },
    ],
  },
  {
    step: 'Then',
    heading: 'Understanding the number',
    blurb: 'One reading is a data point. A run of readings is information.',
    links: [
      {
        href: '/blood-pressure-chart',
        title: 'Blood pressure chart by category',
        desc: 'The American Heart Association ranges, from normal through to the crisis range.',
      },
      {
        href: '/prehypertension',
        title: 'What is prehypertension?',
        desc: 'The range that used to be called prehypertension, what it was renamed to, and what it means.',
      },
    ],
  },
  {
    step: 'Free tools',
    heading: 'Logs and printables',
    blurb: 'Bring a record to your appointment instead of a memory.',
    links: [
      {
        href: '/free-blood-pressure-log-pdf',
        title: 'Free blood pressure log PDF',
        desc: 'A printable log sheet you can fill in by hand. No email needed.',
      },
      {
        href: '/log-sheet',
        title: 'Printable log sheet',
        desc: 'The paper version, if you would rather write than tap.',
      },
      {
        href: '/aha-blood-pressure-log',
        title: 'AHA blood pressure log',
        desc: 'What the American Heart Association log format asks for, and how to keep the same record digitally.',
      },
      {
        href: '/blood-pressure-average-calculator',
        title: 'Blood pressure average calculator',
        desc: 'Turn a pile of readings into the one number a doctor asks for. Runs in your browser, and nothing you type is sent anywhere.',
      },
    ],
  },
  {
    step: 'Keeping it up',
    heading: 'Tracking over time',
    blurb: 'One reading says very little. Thirty say something.',
    links: [
      {
        href: '/blood-pressure-apps',
        title: 'Blood pressure apps, honestly',
        desc: 'Three different things get called a blood pressure app, and one of them does not work. What the AHA says about measuring without a cuff.',
      },
    ],
  },
] as const;

export default function ResourcesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${URL}#page`,
        name: 'Blood Pressure Resources',
        description:
          'Guides on choosing a validated blood pressure monitor, cuff sizing, taking readings and reading the numbers.',
        url: URL,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bptrack.app' },
          { '@type': 'ListItem', position: 2, name: 'Resources', item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <span
              style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
              className="uppercase text-xs font-semibold mb-6 block"
            >
              Resources
            </span>
            <h1
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', lineHeight: 1.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Everything we publish, in the order you need it
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--foreground)' }}>
              Has a doctor just asked you to check your blood pressure at home? Work down this page.
              Get a monitor that has actually been tested. Get the cuff size right. Learn to take
              the reading the same way each time. Then learn what the number means.
            </p>
          </div>
        </section>

        {GROUPS.map((g, gi) => (
          <section
            key={g.heading}
            style={{ background: gi % 2 === 0 ? 'var(--surface)' : 'var(--background)' }}
          >
            <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
              <span
                style={{ color: 'var(--primary)', letterSpacing: '0.18em' }}
                className="uppercase text-xs font-semibold mb-4 block"
              >
                {g.step}
              </span>
              <h2
                style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
                className="text-3xl font-bold mb-3"
              >
                {g.heading}
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {g.blurb}
              </p>

              <ul className="space-y-0">
                {g.links.map((l) => (
                  <li key={l.href} style={{ borderTop: '1px solid var(--border)' }}>
                    <Link
                      href={l.href}
                      className="block py-6 group transition-opacity hover:opacity-75"
                    >
                      <h3
                        className="font-semibold mb-2 flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
                      >
                        {l.title}
                        <span aria-hidden="true" style={{ color: 'var(--primary)' }}>
                          &rarr;
                        </span>
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {l.desc}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {AMAZON_DISCLOSURE} Some of the guides above link to Amazon. We only recommend
              monitors whose exact model number we checked against the AMA Validated Device Listing
              ourselves.
            </p>
            <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

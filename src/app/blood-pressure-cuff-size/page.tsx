import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { MonitorCard } from '@/components/MonitorCard';
import { AccessoryCard } from '@/components/AccessoryCard';
import { SiblingCallout } from '@/components/SiblingCallout';
import { CUFF_SIZES, MONITORS, VDL_SOURCE, ACCESSORIES, EXTRA_LARGE_ARM } from '@/lib/monitors';
import { MEDICAL_DISCLAIMER } from '@/lib/product';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NextStepStrip } from '@/components/WorkflowModule';
import { CuffSizeHelper } from '@/components/CuffSizeHelper';

const REVIEWED = '19 August 2026';
const URL = 'https://bptrack.app/blood-pressure-cuff-size';

export const metadata: Metadata = {
  title: 'Blood Pressure Cuff Size Chart: Measure Your Arm First',
  description:
    'A cuff that is too small pushes your reading up. Measure around the middle of your upper arm, then match the number to this cuff size chart. Small, adult, large and extra large ranges in inches and cm.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Blood Pressure Cuff Size Chart: Measure Your Arm First',
    description:
      'A cuff that is too small pushes your reading up. Measure your arm, then match it to the chart.',
  },
};

const FAQS = [
  {
    q: 'What size blood pressure cuff do I need?',
    a: 'Measure around the middle of your bare upper arm, halfway between your shoulder and your elbow. Under 9.4 in (24 cm) needs a small adult cuff. About 9 to 14.6 in (23 to 37 cm) is a standard adult cuff. Many monitors now ship a wide range cuff covering 8.6 to 16.5 in (22 to 42 cm). Above that you need a large or extra large cuff.',
  },
  {
    q: 'What happens if the blood pressure cuff is too small?',
    a: 'It reads high. A cuff that does not wrap far enough around your arm has to squeeze harder to stop the blood flow, and the monitor records that extra effort as higher pressure. This is one of the most common reasons a home reading disagrees with the reading taken at a clinic.',
  },
  {
    q: 'What happens if the blood pressure cuff is too big?',
    a: 'It tends to read low, though the effect is usually smaller than the effect of a cuff that is too small. Either way the reading is not trustworthy, so it is worth getting the size right rather than guessing.',
  },
  {
    q: 'How do I measure my arm for a blood pressure cuff?',
    a: 'Let your arm hang loose at your side. Find the midpoint between the tip of your shoulder and the point of your elbow. Wrap a tape measure around your bare arm at that point, snug but not tight, and read the number. Use that measurement, not your shirt size.',
  },
  {
    q: 'Can I use a bigger cuff instead of buying the right size?',
    a: 'Only if your arm measurement falls inside that cuff range. Cuffs print their range on the cuff itself, and there are index lines that show whether it fits when you wrap it. If your arm falls outside the printed range, the reading is not reliable.',
  },
  {
    q: 'Does the cuff need to go on bare skin?',
    a: 'Yes. Put the cuff on a bare upper arm. A rolled up sleeve bunched above the cuff squeezes the arm and can change the reading, so take your arm out of the sleeve instead of pushing it up.',
  },
];

export default function CuffSizePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${URL}#article`,
        headline: 'Blood Pressure Cuff Size Chart: Measure Your Arm First',
        datePublished: '2026-08-19',
        dateModified: '2026-08-19',
        author: { '@type': 'Organization', name: 'Anvil Road LLC' },
        publisher: { '@type': 'Organization', name: 'BP Central' },
        mainEntityOfPage: URL,
        citation: [{ '@type': 'WebPage', name: VDL_SOURCE.name, url: VDL_SOURCE.url }],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bptrack.app' },
          { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://bptrack.app/resources' },
          { '@type': 'ListItem', position: 3, name: 'Blood pressure cuff size', item: URL },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const smallCuffMonitor = MONITORS.find((m) => m.id === 'ad-ua-651sac');

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
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--muted-foreground)' }}
              >
                <li>
                  <Link href="/" className="hover:opacity-70">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/resources" className="hover:opacity-70">
                    Resources
                  </Link>
                </li>
              </ol>
            </nav>

            <h1
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)', lineHeight: 1.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Blood pressure cuff size
            </h1>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              Measure around the middle of your bare upper arm with a tape measure, then match that
              number to the chart below. A cuff that is too small squeezes harder than it should and{' '}
              <strong>pushes your reading up</strong>, which is one of the most common reasons a
              reading at home does not match the one at the clinic. Getting this right matters more
              than which monitor you buy.
            </p>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Reviewed {REVIEWED}. Cuff ranges are taken from the manufacturer specifications listed
              on the AMA Validated Device Listing.
            </p>
          </div>
        </section>

        {/* How to measure */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-8"
            >
              How to measure your arm
            </h2>
            <ol className="space-y-6">
              {[
                'Take your arm out of your sleeve. Do not roll the sleeve up, because a bunched sleeve squeezes the arm above the cuff.',
                'Let your arm hang loose at your side, relaxed.',
                'Find the middle of your upper arm, halfway between the tip of your shoulder and the point of your elbow.',
                'Wrap a tape measure around your bare arm at that point. Snug against the skin, not tight enough to press in.',
                'Write the number down in inches or centimetres, then read the chart below.',
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span
                    className="num font-bold shrink-0"
                    style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }}
                  >
                    {i + 1}
                  </span>
                  <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    {s}
                  </p>
                </li>
              ))}
            </ol>
            <p className="text-sm leading-relaxed mt-8" style={{ color: 'var(--muted-foreground)' }}>
              No tape measure? Use a strip of paper or a piece of string, mark where it meets, then
              hold it against a ruler. That works and it costs nothing.
            </p>
            <div className="mt-6">
              <AffiliateDisclosure variant="accessory" />
            </div>
            <div className="mt-8">
              <CuffSizeHelper />
            </div>

            <div className="mt-4">
              {ACCESSORIES.filter((a) => a.kind === 'tool').map((a) => (
                <AccessoryCard key={a.id} item={a} />
              ))}
            </div>
          </div>
        </section>

        {/* The chart */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-3"
            >
              Blood pressure cuff size chart
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Match your arm measurement to a row. Ranges overlap on purpose, because different
              makers cut their cuffs slightly differently.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">
                  Blood pressure cuff sizes with arm circumference ranges in centimetres and inches
                </caption>
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pr-4 text-xs font-semibold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--foreground)', borderBottom: '2px solid var(--border)' }}
                    >
                      Cuff size
                    </th>
                    <th
                      scope="col"
                      className="py-3 pr-4 text-xs font-semibold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--foreground)', borderBottom: '2px solid var(--border)' }}
                    >
                      Arm, inches
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-xs font-semibold uppercase tracking-[0.14em]"
                      style={{ color: 'var(--foreground)', borderBottom: '2px solid var(--border)' }}
                    >
                      Arm, cm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CUFF_SIZES.map((c) => (
                    <tr key={c.label}>
                      <th
                        scope="row"
                        className="py-4 pr-4 font-semibold align-top"
                        style={{ color: 'var(--foreground)', borderBottom: '1px solid var(--border)' }}
                      >
                        {c.label}
                      </th>
                      <td
                        className="py-4 pr-4 num align-top"
                        style={{ color: 'var(--muted-foreground)', borderBottom: '1px solid var(--border)' }}
                      >
                        {c.inches}
                      </td>
                      <td
                        className="py-4 num align-top"
                        style={{ color: 'var(--muted-foreground)', borderBottom: '1px solid var(--border)' }}
                      >
                        {c.cm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm leading-relaxed mt-6" style={{ color: 'var(--muted-foreground)' }}>
              Most monitors sold today include a wide range cuff, which covers 8.6 to 16.5 in (22 to
              42 cm). That fits a lot of adults, and it is why one cuff is often enough. If your
              measurement sits near either end of that range, look for a monitor that sells a
              separate cuff in your size.
            </p>
          </div>
        </section>

        {/* Small arms */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              If your arm is under 9.4 in (24 cm)
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--foreground)' }}>
              A standard cuff will be loose on you and the reading will drift. You want a small
              adult cuff, 6.3 to 9.4 in (16 to 24 cm). Some monitors sell one separately. One
              validated model ships with it already in the box, which saves the guesswork.
            </p>
            <AffiliateDisclosure />
            <div className="mt-8">
              {smallCuffMonitor && <MonitorCard monitor={smallCuffMonitor} index={0} />}
            </div>
          </div>
        </section>

        {/* Large arms. Honest about the gap. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              If your arm is over 16.5 in (42 cm)
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--foreground)' }}>
              <p>
                This is where home monitoring most often goes wrong, because the cuff in the box
                stops at 16.5 in (42 cm) and people use it anyway. If your arm is bigger than the
                cuff range, the number you get is not usable.
              </p>
              <p>Two things work, in this order.</p>
              <p>
                <strong>Add a large cuff to a validated monitor.</strong>{' '}The A&amp;D Medical
                monitors on our list take a separate large cuff covering 12.2 to 17.7 in (31 to 45
                cm). The monitor stays the validated one. You just fit it with a cuff that reaches
                around your arm.
              </p>
              <p>
                <strong>Above {EXTRA_LARGE_ARM.threshold}, it gets harder.</strong> Extra large
                cuffs going up to about 22 in (56 cm) exist, and there is a specific model worth
                knowing about, but no monitor has cleared our check at that size yet. We wrote the
                whole thing up, including how much a too-small cuff actually costs you in mmHg.
              </p>
              <p>
                <Link
                  href="/extra-large-blood-pressure-cuff"
                  className="font-semibold underline underline-offset-4 inline-flex items-center min-h-[44px]"
                  style={{ color: 'var(--primary)' }}
                >
                  Extra large cuffs and big arms
                </Link>
              </p>
            </div>

            {/* The advice above is useless without a way to act on it. */}
            <h3
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-xl font-bold mt-12 mb-3"
            >
              The large cuffs A&amp;D makes for the monitors on our list
            </h3>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Both reach {EXTRA_LARGE_ARM.threshold}. They are made by A&amp;D, the same company
              that makes the monitor, and A&amp;D names the compatible models itself. We do not list
              third party cuffs sold as &ldquo;compatible with&rdquo; a brand. A cuff that reads long
              turns a validated monitor into an unvalidated one and you would never know.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {ACCESSORIES.filter((a) => a.kind === 'cuff' && a.range.startsWith('12.2')).map((a) => (
                <AccessoryCard key={a.id} item={a} />
              ))}
            </div>
            <div
              className="rounded-lg px-5 py-4 mt-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                You can search the{' '}
                <a
                  href={VDL_SOURCE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                  style={{ color: 'var(--primary)' }}
                >
                  AMA Validated Device Listing
                </a>{' '}
                yourself and filter by cuff size. It is free, and it is the same list we used.
              </p>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            <SiblingCallout
              question="Still not sure which monitor takes the cuff you need?"
              deepLink="/bp-monitor-cuff-sizing-guide"
              deepLinkLabel="Read the cuff sizing guide on BP Monitor Lab"
              placement="cuff-size-footer"
            />
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-8"
            >
              Common questions
            </h2>
            <div className="space-y-0">
              {FAQS.map((f) => (
                <div key={f.q} className="py-6" style={{ borderTop: '1px solid var(--border)' }}>
                  <h3
                    className="font-semibold mb-3"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
                  >
                    {f.q}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              Next steps
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/validated-blood-pressure-monitors" className="btn-primary">
                See the validated monitors
              </Link>
              <Link href="/how-to-read-blood-pressure" className="btn-ghost">
                How to take a reading
              </Link>
            </div>
            <p className="text-xs leading-relaxed mt-10" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            <NextStepStrip current="/blood-pressure-cuff-size" />
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MonitorCard } from '@/components/MonitorCard';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { SiblingCallout } from '@/components/SiblingCallout';
import { MONITORS, REJECTED, VDL_SOURCE } from '@/lib/monitors';
import { MEDICAL_DISCLAIMER, AHA_AMA_HOME_SOURCE } from '@/lib/product';
import Link from 'next/link';
import type { Metadata } from 'next';

const REVIEWED = '19 August 2026';
const URL = 'https://bptrack.app/validated-blood-pressure-monitors';

export const metadata: Metadata = {
  title: 'Validated Blood Pressure Monitors for Home Use',
  description:
    'A validated monitor is one that passed an independent accuracy test. We checked every model number against the AMA Validated Device Listing. Here are the four we recommend and the ones we rejected.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Validated Blood Pressure Monitors for Home Use',
    description:
      'We checked every model number against the AMA Validated Device Listing. Four recommendations, and the ones we rejected.',
  },
};

const FAQS = [
  {
    q: 'What does a validated blood pressure monitor mean?',
    a: 'It means that exact model was tested against a published accuracy standard by an independent review, and it passed. The standard used most often now is ANSI/AAMI/ISO 81060-2:2018. Validation applies to one model number, not to a brand. The same brand can sell a validated monitor and an unvalidated one side by side.',
  },
  {
    q: 'How do I check if my blood pressure monitor is validated?',
    a: 'Find the model number on the bottom of the device or on the box, then search for that exact model number on the Validated Device Listing at validatebp.org. Match the whole number. UA-651 and UA-651BLE are two different entries, and so are BP5250 and BP5255.',
  },
  {
    q: 'Are wrist blood pressure monitors accurate?',
    a: 'Some wrist monitors are validated and do pass the accuracy test. But the Validated Device Listing states that clinical guidelines call for an upper arm device for home monitoring, and that a validated wrist device may be used in its place for particular needs, such as when an upper arm cuff does not fit. Wrist readings depend on holding your wrist at heart level, which is easy to get wrong. Every monitor we recommend is upper arm.',
  },
  {
    q: 'Is a more expensive blood pressure monitor more accurate?',
    a: 'No. Accuracy comes from passing the validation test, and validated monitors sit at every price level. Extra money usually buys Bluetooth, a bigger screen, or memory for more than one person. It does not buy a better reading.',
  },
  {
    q: 'Does cuff size matter more than which monitor I buy?',
    a: 'Often, yes. A cuff that is too small squeezes harder and pushes the reading up. A validated monitor with the wrong cuff can be less accurate than a cheaper one with the right cuff. Measure around the middle of your upper arm before you buy anything.',
  },
  {
    q: 'Do I still need to see a doctor if I monitor at home?',
    a: 'Yes. Home readings are information you bring to a doctor. They do not diagnose anything on their own. One high reading at home is not a diagnosis, and only a doctor or other health professional can make one.',
  },
];

export default function ValidatedMonitorsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${URL}#article`,
        headline: 'Validated Blood Pressure Monitors for Home Use',
        description:
          'We checked every model number against the AMA Validated Device Listing. Four recommendations, and the ones we rejected.',
        datePublished: '2026-08-19',
        dateModified: '2026-08-19',
        author: { '@type': 'Organization', name: 'Anvil Road LLC' },
        publisher: { '@type': 'Organization', name: 'BP Central' },
        mainEntityOfPage: URL,
        citation: [
          { '@type': 'WebPage', name: VDL_SOURCE.name, url: VDL_SOURCE.url },
          { '@type': 'WebPage', name: AHA_AMA_HOME_SOURCE.title, url: AHA_AMA_HOME_SOURCE.url },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bptrack.app' },
          { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://bptrack.app/resources' },
          { '@type': 'ListItem', position: 3, name: 'Validated blood pressure monitors', item: URL },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">
        {/* Hero. Answer-first, because this is the paragraph an AI summary quotes. */}
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
              Validated blood pressure monitors for home use
            </h1>

            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              A validated blood pressure monitor is one whose <strong>exact model number</strong>{' '}
              passed an independent accuracy test. Validation belongs to a model number, not to a
              brand, so the same brand can sell a validated monitor and an unvalidated one on the
              same shelf. We checked every model below against the{' '}
              <a
                href={VDL_SOURCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
                style={{ color: 'var(--primary)' }}
              >
                Validated Device Listing
              </a>
              , the register supported by the American Medical Association, and then checked that
              the Amazon listing reports that same model number.
            </p>

            <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>
              Checked {REVIEWED} against the AMA Validated Device Listing. Written by the team
              behind BP Central. We are not doctors and this page is not medical advice.
            </p>

            <AffiliateDisclosure />
          </div>
        </section>

        {/* What validated actually means */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              What does &quot;validated&quot; actually mean?
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--foreground)' }}>
              <p>
                Almost every blood pressure monitor sold in the United States is cleared to be sold.
                That is a different thing from being tested for accuracy. Clearance says the device
                is safe to put on the market. Validation says somebody put it on real arms, compared
                it to a reference measurement, and it came within the allowed margin.
              </p>
              <p>
                The test has a name. Most monitors on our list were checked against{' '}
                <span className="num">ANSI/AAMI/ISO 81060-2:2018</span>, the current edition of the
                standard. Older entries name the 2013 or 2009 edition. All are real tests. The newer
                edition is simply the newer test.
              </p>
              <p>
                Validation is granted to <strong>one model number</strong>. This is the part that
                trips people up. Omron BP5250 and BP5255 are separate entries. A&amp;D UA-651 and
                UA-651BLE are separate entries. Buying &quot;an Omron&quot; or &quot;an A&amp;D&quot;
                does not mean you bought a validated one.
              </p>
              <div
                className="rounded-lg px-5 py-4 mt-6"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
              >
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  <strong style={{ color: 'var(--foreground)' }}>About the source.</strong> The
                  Validated Device Listing describes itself as {VDL_SOURCE.supportedBy.toLowerCase()}
                  . It states: &quot;{VDL_SOURCE.independence}&quot; It also notes that it is a
                  reference list and that devices cannot be bought on that site. We link to Amazon
                  for buying. We never use a shop to decide what counts as validated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Method */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              How we picked these four
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              We did not test monitors ourselves and we do not pretend to. We are not a lab. What we
              did is check two things for every product, and drop anything that failed either one.
            </p>
            <ol className="space-y-5">
              {[
                {
                  t: 'The model number is on the AMA listing, filtered to home devices',
                  b: 'Not the brand. Not the product family. The exact model number, on a device the listing classes as a home device rather than a clinic or hospital one.',
                },
                {
                  t: 'The Amazon listing reports that same model number',
                  b: 'We opened each listing and read the "Item model number" field. If it did not match the validated number, the product was dropped, even when the brand had validated models.',
                },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span
                    className="num font-bold shrink-0"
                    style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                      {s.t}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {s.b}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="leading-relaxed mt-8" style={{ color: 'var(--foreground)' }}>
              Four monitors cleared both checks and answer four different problems. We would rather
              publish four we can defend than ten padded out with models we could not verify.
            </p>
          </div>
        </section>

        {/* The recommendations */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-3"
            >
              The four we recommend
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Every one is an upper arm monitor. Start by working out your cuff size, because that
              matters more than the choice between these four.
            </p>
            <div className="space-y-8">
              {MONITORS.map((m, i) => (
                <MonitorCard key={m.id} monitor={m} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Rejections. The credibility section. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              What we left out, and why
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: 'var(--foreground)' }}>
              A list of recommendations is easy to write. What it rules out is the part worth
              reading. These are the ones we dropped.
            </p>
            <div className="space-y-0">
              {REJECTED.map((r) => (
                <div
                  key={r.what}
                  className="py-6"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
                  >
                    {r.what}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {r.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wrist question. Targets a real high volume query. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              Are wrist blood pressure monitors accurate?
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--foreground)' }}>
              <p>
                Some are. The Validated Device Listing includes validated wrist devices, so a wrist
                monitor can pass the same accuracy test as an arm monitor.
              </p>
              <p>
                The listing is clear about how to use that, though. In its own words, clinical
                guidelines call for an upper arm device for home monitoring. A validated wrist
                device may be used in its place for certain needs. That covers cases where an upper
                arm cuff will not fit the arm, or where a medical condition rules one out.
              </p>
              <p>
                There is also a practical catch. A wrist device has to sit over the artery and be
                held at heart level, with the wrist still. Hold it too low and the reading comes out
                high. That is easy to get wrong at home and hard to notice when you do.
              </p>
              <p>
                So: upper arm first. If an upper arm cuff genuinely will not fit or will not work for
                you, a validated wrist device is a reasonable second choice, and it is worth asking
                your doctor which to use.
              </p>
            </div>
          </div>
        </section>

        {/* Cuff size bridge */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              Cuff size changes the number more than the brand does
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
              If a cuff is too small for your arm it has to squeeze harder to stop the blood flow,
              and the monitor reads that extra effort as higher pressure. A validated monitor
              wearing the wrong cuff can hand you a worse number than a cheap one wearing the right
              cuff.
            </p>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              It takes one minute and a tape measure to rule this out.
            </p>
            <Link href="/blood-pressure-cuff-size" className="btn-primary">
              Work out your cuff size
            </Link>
          </div>
        </section>

        {/* Deeper hardware questions belong on the sister property, not in a
            thinner second copy of a review it already publishes. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            <SiblingCallout
              question="Want a full review of one of these models before you buy?"
              deepLink="/best-blood-pressure-monitor-for-home"
              deepLinkLabel="Read the monitor reviews on BP Monitor Lab"
              placement="validated-monitors-footer"
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

        {/* Next step */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
            <h2
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}
              className="text-3xl font-bold mb-6"
            >
              Once you have a monitor
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              A monitor gives you one number at one moment. What a doctor can actually use is a run
              of readings taken the same way over days or weeks. The American Heart Association and
              the American Medical Association say the same thing in their joint statement on home
              monitoring: the point is the pattern.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/checklist" className="btn-primary">
                Get the measurement checklist
              </Link>
              <Link href="/how-to-read-blood-pressure" className="btn-ghost">
                How to take a reading
              </Link>
            </div>
            <p className="text-xs leading-relaxed mt-10" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
            <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--muted-foreground)' }}>
              Source for validation status:{' '}
              <a
                href={VDL_SOURCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {VDL_SOURCE.name}
              </a>
              , {VDL_SOURCE.supportedBy.toLowerCase()}. Checked {VDL_SOURCE.checked}. Source for home
              monitoring guidance:{' '}
              <a
                href={AHA_AMA_HOME_SOURCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {AHA_AMA_HOME_SOURCE.title}
              </a>
              , {AHA_AMA_HOME_SOURCE.citation}.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageSchema } from '@/components/PageSchema';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { AccessoryCard } from '@/components/AccessoryCard';
import { SiblingCallout } from '@/components/SiblingCallout';
import { ArmMeasurement } from '@/components/graphics/Illustrations';
import { CUFF_SIZES, ACCESSORIES, EXTRA_LARGE_ARM, VDL_SOURCE } from '@/lib/monitors';
import { MEDICAL_DISCLAIMER, CUFF_SIZE_ERROR } from '@/lib/product';
import Link from 'next/link';
import type { Metadata } from 'next';

const URL = 'https://bptrack.app/extra-large-blood-pressure-cuff';
const REVIEWED = '30 August 2026';

export const metadata: Metadata = {
  title: 'Extra Large Blood Pressure Cuff: What to Do With a Big Arm',
  description:
    'A regular cuff on an arm that needs an extra-large one reads 19.5 mmHg too high, according to a randomised trial. Here is how to measure, which cuff size you need, and what to do when the cuff in the box does not reach.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Extra Large Blood Pressure Cuff: What to Do With a Big Arm',
    description:
      'A regular cuff on an arm that needs an extra-large one reads 19.5 mmHg too high. How to measure, and what to do about it.',
  },
};

const FAQS = [
  {
    q: 'What size blood pressure cuff do I need for a large arm?',
    a: 'Measure around the middle of your bare upper arm first. A large adult cuff covers roughly 12.2 to 17.7 inches (31 to 45 cm) and an extra-large covers roughly 16.9 to 22.0 inches (43 to 56 cm). The wide-range cuff that comes in most boxes stops at about 16.5 inches (42 cm), so anything above that needs a separate cuff.',
  },
  {
    q: 'Does a cuff that is too small give a high blood pressure reading?',
    a: 'Yes, and by more than most people expect. In a randomised crossover trial published in JAMA Internal Medicine in 2023, using a regular cuff on people who needed an extra-large one overstated systolic blood pressure by 19.5 mmHg on average. For people who needed a large cuff it was 4.8 mmHg. The same people were measured both ways, so the difference is the cuff, not the person.',
  },
  {
    q: 'Can I just use the cuff that came with my monitor?',
    a: 'Only if your arm is inside its stated range. Most home monitors ship with a wide-range cuff covering about 8.6 to 16.5 inches (22 to 42 cm). If your arm is bigger than that, forcing the cuff on does not give you a slightly imperfect reading. It gives you a reading that can be wrong by two whole categories.',
  },
  {
    q: 'Can I buy a bigger cuff instead of a new monitor?',
    a: 'Usually yes, and it is the better answer. Most manufacturers sell larger cuffs for their own monitors, so your validated monitor stays the validated one and only the cuff changes. What matters is that the cuff is made by the company that made your monitor and that they name your exact model as compatible.',
  },
  {
    q: 'Are third-party "fits most monitors" cuffs a good idea?',
    a: 'We do not recommend them. A cuff is not a neutral accessory: its dimensions are part of what the monitor was tested with. A cuff that reads long turns a validated monitor into an unvalidated one, and nothing on the display tells you it happened.',
  },
  {
    q: 'What if my arm is bigger than every cuff I can find?',
    a: 'Ask your clinic. They carry larger cuffs and can measure you against their own equipment, and some people are better measured on the forearm or with a different technique that a clinician has to choose. That is a conversation with a professional, not a shopping decision.',
  },
];

export default function ExtraLargeCuffPage() {
  const bigCuffs = ACCESSORIES.filter((a) => a.kind === 'cuff' && a.range.startsWith('12.2'));

  return (
    <>
      <PageSchema
        path="/extra-large-blood-pressure-cuff"
        headline="Extra Large Blood Pressure Cuff: What to Do With a Big Arm"
        published="2026-08-30"
        modified="2026-08-30"
        breadcrumb={[{ name: 'Resources', path: '/resources' }]}
        faqs={FAQS}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">
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
              When the cuff does not reach around your arm
            </h1>

            {/* The answer, and the number, in the first paragraph. */}
            <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              If your upper arm is bigger than the cuff that came in the box, the reading you get is
              not slightly off. In a randomised trial, using a regular cuff on people who needed an
              extra-large one overstated systolic blood pressure by{' '}
              <strong>19.5&nbsp;mmHg</strong>. That is wide enough to move somebody from the normal
              range to stage&nbsp;2 hypertension on the chart, on the strength of the cuff alone.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              The fix is usually a bigger cuff, not a different monitor. Reviewed {REVIEWED}.
            </p>
          </div>
        </section>

        {/* The evidence. This is why the page exists. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              How much the wrong cuff costs you
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              The same {CUFF_SIZE_ERROR.source.participants} people were measured with a regular
              cuff and with the cuff they actually needed, in randomised order. Measuring the same
              arm both ways is what makes this convincing: it rules out the obvious objection that
              people with bigger arms might simply have higher blood pressure.
            </p>

            <div className="rounded-xl overflow-hidden mb-5" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Mean difference in systolic blood pressure when a regular cuff was used instead of
                  the correct size
                </caption>
                <thead>
                  <tr style={{ background: 'var(--background)' }}>
                    <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>
                      Cuff the person actually needed
                    </th>
                    <th scope="col" className="text-right px-5 py-3" style={{ color: 'var(--foreground)' }}>
                      Systolic error
                    </th>
                    <th scope="col" className="text-right px-5 py-3" style={{ color: 'var(--foreground)' }}>
                      95% CI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CUFF_SIZE_ERROR.findings.map((f) => (
                    <tr key={f.needed} className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
                      <th scope="row" className="text-left font-normal px-5 py-3" style={{ color: 'var(--foreground)' }}>
                        {f.needed}
                      </th>
                      <td className="px-5 py-3 text-right num font-semibold" style={{ color: 'var(--primary)' }}>
                        {f.mmHg} mmHg
                      </td>
                      <td className="px-5 py-3 text-right num" style={{ color: 'var(--muted-foreground)' }}>
                        {f.ci}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
              {CUFF_SIZE_ERROR.source.authors}{' '}
              <a
                href={CUFF_SIZE_ERROR.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: 'var(--primary)' }}
              >
                {CUFF_SIZE_ERROR.source.title}
              </a>
              . {CUFF_SIZE_ERROR.source.journal}, {CUFF_SIZE_ERROR.source.year}.
            </p>

            {/* The asymmetry, stated plainly, because it is easy to get backwards. */}
            <div className="rounded-lg px-5 py-4" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                <strong>The error is not symmetric.</strong> A cuff that is too small reads{' '}
                <strong>high</strong>, and the bigger the mismatch the worse it gets. A cuff that is
                too big reads <strong>low</strong>, and by much less. If you are between sizes, that
                asymmetry is worth knowing.
              </p>
            </div>
          </div>
        </section>

        {/* Measure first. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Measure before you buy anything
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              Not your shirt size, and not a guess. Around the middle of your bare upper arm,
              halfway between the tip of your shoulder and the point of your elbow, snug against the
              skin.
            </p>
            <div className="rounded-xl px-6 py-6 mb-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <ArmMeasurement />
            </div>

            <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <caption className="sr-only">Cuff sizes by arm circumference</caption>
                <thead>
                  <tr style={{ background: 'var(--surface)' }}>
                    <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>Cuff size</th>
                    <th scope="col" className="text-right px-5 py-3" style={{ color: 'var(--foreground)' }}>Arm, inches</th>
                    <th scope="col" className="text-right px-5 py-3" style={{ color: 'var(--foreground)' }}>Arm, cm</th>
                  </tr>
                </thead>
                <tbody>
                  {CUFF_SIZES.map((c) => {
                    const big = c.label === 'Large adult' || c.label === 'Extra large';
                    return (
                      <tr key={c.label} className="border-t" style={{ borderColor: 'var(--border)' }}>
                        <th scope="row" className="text-left px-5 py-3 font-normal" style={{ color: big ? 'var(--primary)' : 'var(--foreground)', fontWeight: big ? 600 : 400 }}>
                          {c.label}
                        </th>
                        <td className="px-5 py-3 text-right num" style={{ color: 'var(--muted-foreground)' }}>{c.inches}</td>
                        <td className="px-5 py-3 text-right num" style={{ color: 'var(--muted-foreground)' }}>{c.cm}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Most home monitors ship with the wide range cuff, 8.6 to 16.5 in (22 to 42 cm). If
              your measurement is above that, the cuff in your box is not the right one, however
              far it stretches.{' '}
              <Link href="/blood-pressure-cuff-size" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
                Full cuff size guide
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Route one: keep the validated monitor, change the cuff. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Up to {EXTRA_LARGE_ARM.threshold}: buy the bigger cuff
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              This is the good outcome, and it is cheaper than a monitor. Your monitor stays the
              validated one. Only the cuff changes. What matters is that the cuff is made by the
              company that made your monitor, and that they name your exact model as compatible.
            </p>

            <div className="mb-6">
              <AffiliateDisclosure />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {bigCuffs.map((a) => (
                <AccessoryCard key={a.id} item={a} />
              ))}
            </div>

            <p className="text-sm leading-relaxed mt-6" style={{ color: 'var(--muted-foreground)' }}>
              We do not list third-party cuffs sold as &ldquo;compatible with&rdquo; a brand,
              however good the reviews are. A cuff is not a neutral accessory: its dimensions are
              part of what the monitor was tested with, and one that reads long turns a validated
              monitor into an unvalidated one without anything on the display telling you.
            </p>
          </div>
        </section>

        {/* Route two: above 17.7in. The gate holds. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Above {EXTRA_LARGE_ARM.threshold}: read this before you buy
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
              Here the honest answer is less satisfying, and we would rather give you that than a
              link.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
              The largest cuff either maker on our list sells for a monitor we recommend stops at{' '}
              {EXTRA_LARGE_ARM.threshold}. {EXTRA_LARGE_ARM.brandOption} does sell the{' '}
              <span className="num">{EXTRA_LARGE_ARM.namedOption}</span> with a cuff covering{' '}
              <span className="num">{EXTRA_LARGE_ARM.namedOptionRange}</span>, and we are naming it
              because somebody with a 19 in arm deserves to know it exists.
            </p>
            <div className="rounded-lg px-5 py-4 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                <strong>We are not linking it and it is not on our recommended list</strong>,
                because {EXTRA_LARGE_ARM.reason}. Every monitor we do recommend cleared that check.
                Naming a model is information. Linking it is a recommendation, and we have not
                earned the right to make that one yet.
              </p>
            </div>

            <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
              What to look for yourself
            </h3>
            <ul className="space-y-3 leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              {[
                'An upper arm monitor, not a wrist one. Wrist devices are not the answer to a large arm.',
                'A stated cuff range that covers your actual measurement, with room at both ends rather than exactly at the limit.',
                'The exact model number on the AMA Validated Device Listing, filtered to home devices. Not the brand, not the product family.',
                'The cuff sold by the same manufacturer as the monitor.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              You can search the{' '}
              <a href={VDL_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
                {VDL_SOURCE.name}
              </a>{' '}
              yourself and filter by cuff size. It is free, and it is the same list we use.
            </p>

            <div className="rounded-lg px-5 py-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                <strong>And ask your clinic.</strong> They carry larger cuffs, they can measure you
                against their own equipment, and for some arms a clinician will choose a different
                technique entirely. That is a conversation with a professional, not a shopping
                decision.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-8" style={{ color: 'var(--foreground)' }}>
              Common questions
            </h2>
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              {FAQS.map((f) => (
                <div key={f.q} className="py-6 border-b" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="font-display text-lg mb-2" style={{ color: 'var(--foreground)' }}>{f.q}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-8" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14 space-y-6">
            <ul className="space-y-3">
              {[
                ['/blood-pressure-cuff-size', 'Cuff size chart', 'Every size, and how to measure your arm properly.'],
                ['/validated-blood-pressure-monitors', 'Validated monitors', 'The four whose exact model numbers we checked.'],
                ['/blood-pressure-average-calculator', 'Average calculator', 'Once the cuff fits, this is what to do with the readings.'],
              ].map(([href, title, desc]) => (
                <li key={href}>
                  <Link href={href} className="block rounded-lg px-5 py-4 min-h-[44px]" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
                    <span className="font-semibold block" style={{ color: 'var(--primary)' }}>{title}</span>
                    <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <SiblingCallout
              question="Want the device-side view of cuff compatibility?"
              deepLink="/bp-monitor-cuff-sizing-guide"
              deepLinkLabel="Read the cuff sizing guide on BP Monitor Lab"
              placement="xl-cuff-footer"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

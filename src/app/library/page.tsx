import { appCtaCopy } from '@/lib/appCta';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AppStoreCta, ContextualAppCta } from '@/components/AppStoreCta';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import {
  PRODUCT,
  BP_CATEGORIES,
  AHA_SOURCE,
  AHA_AMA_HOME_SOURCE,
  MEDICAL_DISCLAIMER,
} from '@/lib/product';
import { CHECKLIST_SOURCE } from '@/lib/checklist';

export const metadata: Metadata = {
  title: 'Learn about blood pressure',
  description:
    'Plain explanations of blood pressure ranges and terms, with the American Heart Association source for each one. What the numbers mean, what white coat and masked readings are, and how to take a reading at home.',
  alternates: { canonical: `${PRODUCT.siteUrl}/library` },
};

/**
 * Rewritten 18 August 2026. The previous version of this page advertised "25+
 * reference tables" with full-text search inside the app, and previewed tables
 * the app has never contained: age-adjusted ranges, pulse pressure, isolated
 * systolic hypertension, ambulatory monitoring. It also said those tables
 * "include thresholds and treatment guidance", and every category row carried
 * treatment direction of its own, down to which stage gets medication.
 *
 * The app ships seven short reference articles. It gives no treatment guidance
 * of any kind, on purpose. This page now says both of those things.
 *
 * The measurement tips previously on this page were also wrong against the
 * source: they said two readings two minutes apart, where the AHA says at least
 * one minute, and gave a cuff rule of 80% coverage, where the AHA gives 75-100%
 * of arm circumference for bladder length and 37-50% for width. They have been
 * replaced by a link to the checklist, which is drawn from the statement itself.
 */

const TONE: Record<string, string> = {
  normal: 'oklch(0.62 0.14 150)',
  elevated: 'oklch(0.74 0.14 75)',
  stage1: 'oklch(0.66 0.16 50)',
  stage2: 'oklch(0.45 0.18 25)',
  crisis: 'oklch(0.36 0.16 25)',
};

/** The seven articles that actually ship in the app's Learn tab. */
const IN_APP_ARTICLES = [
  { name: 'Normal blood pressure', summary: 'Less than 120 over less than 80 mmHg.' },
  { name: 'Elevated', summary: '120 to 129 over less than 80 mmHg.' },
  { name: 'Stage 1 range', summary: '130 to 139, or 80 to 89 mmHg.' },
  { name: 'Stage 2 range', summary: '140 or higher, or 90 or higher mmHg.' },
  { name: 'Severe range', summary: 'Higher than 180 and/or higher than 120 mmHg.' },
  { name: 'White-coat hypertension', summary: 'Higher in a medical office than outside it.' },
  { name: 'Masked hypertension', summary: 'Not high in a medical office, higher outside it.' },
];

export default function LibraryPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: 'var(--primary)' }}
            >
              Learn
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl leading-[1.08] mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              What the numbers mean.
            </h1>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Short, plain explanations of blood pressure ranges and the terms you will hear.
              Each one names its source so you can go and read it yourself. None of it tells
              you what to do about your own readings. That part is your doctor&apos;s job.
            </p>
          </div>
        </section>

        {/* The chart */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--foreground)' }}>
              The ranges
            </h2>
            <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              These are the categories on the American Heart Association chart. A category
              describes one reading. It does not describe a person, and it is not a diagnosis.
            </p>

            <div
              className="rounded-xl overflow-hidden"
              style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
            >
              <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {BP_CATEGORIES.map((cat) => (
                  <li
                    key={cat.label}
                    className="flex items-center justify-between gap-4 px-6 py-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          width: 9,
                          height: 9,
                          borderRadius: '50%',
                          background: TONE[cat.tone],
                        }}
                      />
                      <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                        {cat.label}
                      </span>
                    </div>
                    <span className="num text-sm text-right" style={{ color: 'var(--muted-foreground)' }}>
                      {cat.range}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm mt-5 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Values in mmHg. For stage 1 and stage 2, either number on its own is enough to put a
              reading in that row. Source: {AHA_SOURCE.organization},{' '}
              <a href={AHA_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                {AHA_SOURCE.title}
              </a>
              , {AHA_SOURCE.reviewed}.
            </p>

            <div
              className="mt-8 rounded-xl p-6"
              style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                If a reading is over 180 or over 120
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                The American Heart Association asks you to wait one minute and take it again. If it
                is still that high and you have chest pain, shortness of breath, back pain,
                numbness, weakness, a change in vision or trouble speaking, call 911. If it is still
                that high and you do not have those symptoms, contact your health care professional.
              </p>
            </div>
          </div>
        </section>

        {/* What is in the app */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--foreground)' }}>
              What is in the app
            </h2>
            <p className="text-base mb-8 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              The Learn tab in BP Central holds seven short articles. Each one explains what a term
              means, why it matters when you are recording at home, and where the information came
              from. That is the whole list. We would rather ship seven we can stand behind than
              twenty five we cannot.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {IN_APP_ARTICLES.map((a) => (
                <div
                  key={a.name}
                  className="rounded-xl px-5 py-4"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <p className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                    {a.name}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    {a.summary}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              The app does not hold a drug reference and gives no treatment guidance. If you want to
              know what a medicine does or whether to take one, that is a conversation with your
              doctor or pharmacist.
            </p>
          </div>
        </section>

        {/* Taking a good reading */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--foreground)' }}>
              Getting a reading you can trust
            </h2>
            <p className="text-base leading-relaxed mb-6 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Blood pressure measured at a surgery and blood pressure measured at home can differ by
              a lot, which is why home readings are worth keeping. It also means how you take them
              matters. Resting first, sitting properly, and putting the cuff on bare skin all change
              the number you get.
            </p>
            <Link href="/checklist" className="btn-primary">
              Read the home measurement checklist
            </Link>
            <p className="text-sm mt-6 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Sources: {AHA_AMA_HOME_SOURCE.organization}.{' '}
              <a href={AHA_AMA_HOME_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                {AHA_AMA_HOME_SOURCE.title}
              </a>
              . {AHA_AMA_HOME_SOURCE.citation}. And {CHECKLIST_SOURCE.organization}.{' '}
              <a href={CHECKLIST_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                {CHECKLIST_SOURCE.title}
              </a>
              . {CHECKLIST_SOURCE.citation}.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6">
                <h2 className="font-display text-3xl leading-tight mb-4" style={{ color: 'var(--foreground)' }}>
                  Keep your own record
                </h2>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  BP Central saves every reading, shows the range it falls in, and builds your trend
                  over 7, 30 and 90 days. First {PRODUCT.freeReadings} readings free, then{' '}
                  {PRODUCT.price} once.
                </p>
                <ContextualAppCta copy={appCtaCopy("/library")} source="/library" />
              </div>
              <div className="lg:col-span-6 w-full">
                <p className="font-display text-xl mb-3" style={{ color: 'var(--foreground)' }}>
                  Or start with the checklist
                </p>
                <EmailCaptureForm source="/library" />
              </div>
            </div>

            <p className="text-xs leading-relaxed mt-12" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

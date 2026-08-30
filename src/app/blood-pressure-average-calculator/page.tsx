import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageSchema } from '@/components/PageSchema';
import { AverageCalculator } from '@/components/AverageCalculator';
import { AppStoreCta, AppStoreCaption } from '@/components/AppStoreCta';
import { SiblingCallout } from '@/components/SiblingCallout';
import { MEDICAL_DISCLAIMER, SMBP_PROTOCOL, AHA_AMA_HOME_SOURCE, PRODUCT } from '@/lib/product';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NextStepStrip } from '@/components/WorkflowModule';

const URL = 'https://bptrack.app/blood-pressure-average-calculator';
const REVIEWED = '29 August 2026';

export const metadata: Metadata = {
  title: 'Blood Pressure Average Calculator',
  description:
    'Work out the average of your home blood pressure readings. Free, no sign up, and your numbers never leave your browser. Shows the AHA range your average falls in and how many readings the AHA and AMA say to take.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Blood Pressure Average Calculator',
    description:
      'Average your home readings in your browser. Nothing is sent anywhere. Shows the AHA range and the number of readings the AHA and AMA describe.',
  },
};

const FAQS = [
  {
    q: 'How do you calculate average blood pressure?',
    a: 'Add up every systolic number and divide by how many readings you have. Do the same for the diastolic numbers. You average the two columns separately, so the answer is one average systolic over one average diastolic. You never average the two numbers together.',
  },
  {
    q: 'How many blood pressure readings should I average?',
    a: 'The joint statement from the American Heart Association and the American Medical Association describes two readings at least a minute apart, morning and evening. That is four a day. Seven days gives 28 readings, which is the fuller picture, and three days gives 12, which they describe as the minimum. The statement says to average all of them.',
  },
  {
    q: 'Should I throw away the first day of readings?',
    a: 'The AHA and AMA joint statement says to average all of your readings. Some clinical protocols do drop the first day. If your doctor gave you a protocol, follow theirs. This calculator averages whatever you enter.',
  },
  {
    q: 'Does an average blood pressure reading diagnose high blood pressure?',
    a: 'No. An average is arithmetic. Diagnosing high blood pressure is a clinical decision that takes your history, your other results and repeated measurement into account, and only a doctor or another health professional can make it.',
  },
  {
    q: 'Are my readings saved or sent anywhere?',
    a: 'No. The calculation runs in your browser. The numbers are not sent to a server, not stored, and not shared. Closing the tab clears them.',
  },
  {
    q: 'Why is my home average different from the reading at my doctor?',
    a: 'That difference is common enough to have names. Higher in the clinic than at home is called white coat hypertension. Normal in the clinic and higher outside it is called masked hypertension. Both are reasons a doctor may ask for a set of home readings rather than relying on one measurement in the room.',
  },
];

export default function AverageCalculatorPage() {
  return (
    <>
      <PageSchema
        path="/blood-pressure-average-calculator"
        headline="Blood Pressure Average Calculator"
        published="2026-08-29"
        modified="2026-08-29"
        breadcrumb={[{ name: 'Resources', path: '/resources' }]}
        faqs={FAQS}
        citeAha
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
              Blood pressure average calculator
            </h1>

            {/* Answer first. This is the paragraph an AI summary lifts. */}
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              To average your blood pressure, add up all the top numbers and divide by how many
              readings you have, then do the same for the bottom numbers. The two columns are
              averaged separately. One reading on its own says very little. A set of readings
              averaged together is the thing a doctor can actually use.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              Type your readings below. The maths happens in your browser and nothing is sent
              anywhere. Reviewed {REVIEWED}.
            </p>

            <AverageCalculator />
          </div>
        </section>

        {/* How many readings, sourced. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              How many readings should you average?
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              Enough that one odd morning cannot move the answer. The joint policy statement from
              the American Heart Association and the American Medical Association sets out a
              routine that home monitoring research is built on.
            </p>

            <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
              <dl className="text-sm">
                {[
                  ['Readings per sitting', `${SMBP_PROTOCOL.perSession}, at least ${SMBP_PROTOCOL.minutesBetween} minute apart`],
                  ['Sittings per day', `${SMBP_PROTOCOL.sessionsPerDay}, morning and evening`],
                  ['Readings per day', `${SMBP_PROTOCOL.readingsPerDay}`],
                  ['The fuller picture', `${SMBP_PROTOCOL.optimalDays} days, ${SMBP_PROTOCOL.optimalReadings} readings`],
                  ['The minimum', `${SMBP_PROTOCOL.minimumDays} days, ${SMBP_PROTOCOL.minimumReadings} readings`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <dt style={{ color: 'var(--foreground)' }}>{k}</dt>
                    <dd className="num text-right" style={{ color: 'var(--muted-foreground)' }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              {SMBP_PROTOCOL.method}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Source: {AHA_AMA_HOME_SOURCE.organization},{' '}
              <a
                href={AHA_AMA_HOME_SOURCE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: 'var(--primary)' }}
              >
                {AHA_AMA_HOME_SOURCE.title}
              </a>
              , {AHA_AMA_HOME_SOURCE.citation}. If your doctor gave you a different routine, follow
              theirs. They know why they asked.
            </p>
          </div>
        </section>

        {/* What this does not mean. Explicit, because an average looks like a verdict. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              What an average does not tell you
            </h2>
            <ul className="space-y-4 leading-relaxed" style={{ color: 'var(--foreground)' }}>
              {[
                'Whether you have high blood pressure. That is a diagnosis, it takes more than a number, and only a doctor or another health professional can make it.',
                'Whether a medicine is working. Home readings are one input a doctor may use. They are not the answer on their own.',
                'What to do next. This page will never tell you to start, stop or change anything you take.',
                'Whether something is an emergency. An average is a summary of the past. If a reading is very high right now, or you feel unwell, that is a different question and it is urgent.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-6" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>

        {/* App conversion, in the one place it is genuinely the next step. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Tired of typing them in twice?
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              This page is here for the times you have a pile of readings and need one number.
              If you are going to do it every week, {PRODUCT.name} keeps the running average for
              you, over 7, 30 and 90 days, and writes a summary you can take to an appointment.
            </p>
            <AppStoreCta source="/blood-pressure-average-calculator" />
            <AppStoreCaption />
            <p className="text-sm leading-relaxed mt-6" style={{ color: 'var(--muted-foreground)' }}>
              Prefer paper? The{' '}
              <Link href="/log-sheet" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
                printable log sheet
              </Link>{' '}
              has the right columns and costs nothing. Bring it back here when you need the average.
            </p>
          </div>
        </section>

        {/* FAQ, visible, matching the schema exactly. */}
        <section style={{ background: 'var(--background)' }}>
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
          </div>
        </section>

        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
              Next steps
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                ['/checklist', 'Take a reading you can trust', 'The setup that changes the number before you even press the button.'],
                ['/log-sheet', 'Printable blood pressure log', 'The right columns, free to print.'],
                ['/blood-pressure-chart', 'What the ranges mean', 'The AHA categories, in full.'],
                ['/blood-pressure-apps', 'Blood pressure apps, honestly', 'What an app can do, and the one thing none of them can.'],
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
              question="Not sure the monitor giving you these numbers is any good?"
              deepLink="/bp-monitor-accuracy-validation"
              deepLinkLabel="Read about monitor accuracy on BP Monitor Lab"
              placement="calculator-footer"
            />
          </div>
        </section>
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            <NextStepStrip current="/blood-pressure-average-calculator" />
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

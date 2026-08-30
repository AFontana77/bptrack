import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageSchema } from '@/components/PageSchema';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { NextStepStrip } from '@/components/WorkflowModule';
import { SiblingCallout } from '@/components/SiblingCallout';
import { ArmMeasurement, ReadingPosture, ReadingHistory } from '@/components/graphics/Illustrations';
import { CUFF_SIZES } from '@/lib/monitors';
import { MEDICAL_DISCLAIMER, SMBP_PROTOCOL, AHA_AMA_HOME_SOURCE, PRODUCT } from '@/lib/product';
import { CHECKLIST } from '@/lib/checklist';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AppointmentPrep } from '@/components/AppointmentPrep';
import { WorkflowDiagram } from '@/components/graphics/WorkflowDiagram';

const URL = 'https://bptrack.app/tracking-starter-kit';
const REVIEWED = '30 August 2026';

export const metadata: Metadata = {
  title: 'Home Blood Pressure Tracking Starter Kit',
  description:
    'Everything you need to start tracking blood pressure at home and take something useful to your appointment: the measurement checklist, a printable log, what to record, cuff sizing and how to average your readings. Free, and all of it readable here.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Home Blood Pressure Tracking Starter Kit',
    description:
      'The checklist, the printable log, what to record, cuff sizing and how to average. Free, and readable on the page.',
  },
};

/** What a reading is worth recording alongside. Nothing here is a health profile. */
const WHAT_TO_RECORD = [
  ['The top number', 'Systolic. The first, larger number on the display.'],
  ['The bottom number', 'Diastolic. The second, smaller one.'],
  ['Your pulse', 'Most monitors show it next to the two numbers. Write down whatever it shows.'],
  ['The date and time', 'The time matters as much as the date, because readings move through the day.'],
  ['Which arm', 'Whichever one you use, use the same one every time so the readings compare.'],
  ['Anything unusual', 'A rushed morning, a missed dose, a bad night. One word is enough, and it is often the word that explains an odd reading.'],
] as const;

const FAQS = [
  {
    q: 'What is in the blood pressure tracking starter kit?',
    a: 'The measurement checklist, a printable log sheet, a list of what to record with each reading, a cuff size reference, and how to work out your averages before an appointment. All of it is on this page, free, with no email required.',
  },
  {
    q: 'Do I have to give my email to get it?',
    a: 'No. Everything is on this page and the printable log downloads directly. The email option exists only so you can have it in your inbox instead of a browser tab.',
  },
  {
    q: 'How long should I track before an appointment?',
    a: 'The joint statement from the American Heart Association and the American Medical Association describes seven days of readings, morning and evening, two readings each time, as the fuller picture. Three days is the minimum they describe. If your doctor asked for something specific, do that instead.',
  },
  {
    q: 'What should I bring to the appointment?',
    a: 'The readings themselves and the average across them. A doctor can do more with a set of readings and one average than with a single number you remember, and more again if you noted the times.',
  },
  {
    q: 'Do you store my blood pressure readings?',
    a: 'No. This site never asks for a reading. The average calculator runs entirely in your browser and sends nothing anywhere. If you join the email list we hold your address and nothing else about your health.',
  },
];

export default function StarterKitPage() {
  return (
    <>
      <PageSchema
        path="/tracking-starter-kit"
        headline="Home Blood Pressure Tracking Starter Kit"
        published="2026-08-30"
        modified="2026-08-30"
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
              The home tracking starter kit
            </h1>

            <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
              Your doctor asked you to check at home, and nobody told you how. This is the whole
              thing in one place: how to take a reading that means something, what to write down,
              and how to turn a month of numbers into the one figure worth bringing to your next
              appointment.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--muted-foreground)' }}>
              <strong style={{ color: 'var(--foreground)' }}>All of it is on this page.</strong>{' '}
              Nothing here is behind an email form, because none of it should be. Reviewed {REVIEWED}.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-4">
            <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              How the whole thing fits together
            </h2>
            <p className="leading-relaxed mb-7" style={{ color: 'var(--muted-foreground)' }}>
              Three things you do once, then a loop of five you repeat. Most people stop because
              nobody told them the second half was a loop.
            </p>
            <WorkflowDiagram />
          </div>
        </section>

        {/* 1. Take a reading that means something */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--primary)' }}>
              Part one
            </p>
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Take a reading that means something
            </h2>
            <p className="leading-relaxed mb-7" style={{ color: 'var(--foreground)' }}>
              Most of what moves a home reading happens before you press the button. Sit with your
              back supported, feet flat on the floor, and rest the cuffed arm on a table at roughly
              heart height.
            </p>

            <div className="rounded-xl px-6 py-6 mb-7" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <ReadingPosture />
              <p className="text-sm mt-4" style={{ color: 'var(--muted-foreground)' }}>
                Back against the chair, feet flat, arm supported at about heart height, cuff on bare
                skin just above the elbow bend.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-7">
              {CHECKLIST.map((section) => (
                <div key={section.heading}>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--foreground)' }}>
                    {section.heading}
                  </p>
                  <ul className="text-sm space-y-1.5" style={{ color: 'var(--muted-foreground)' }}>
                    {section.steps.map((s) => (
                      <li key={s.title} className="flex gap-2">
                        <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                        <span>{s.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link href="/checklist" className="btn-ghost">
              The full checklist, with the reason for each step
            </Link>
          </div>
        </section>

        {/* 2. Cuff size */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--primary)' }}>
              Part two
            </p>
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Check the cuff actually fits
            </h2>
            <p className="leading-relaxed mb-7" style={{ color: 'var(--foreground)' }}>
              A cuff that is too small squeezes harder than it should and pushes your reading up.
              Measure around the middle of your bare upper arm, halfway between the tip of your
              shoulder and the point of your elbow.
            </p>

            <div className="rounded-xl px-6 py-6 mb-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <ArmMeasurement />
              <p className="text-sm mt-4" style={{ color: 'var(--muted-foreground)' }}>
                Halfway between shoulder and elbow, tape snug against bare skin.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
              <table className="w-full text-sm">
                <caption className="sr-only">Blood pressure cuff sizes by arm circumference</caption>
                <thead>
                  <tr style={{ background: 'var(--surface)' }}>
                    <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>Cuff size</th>
                    <th scope="col" className="text-right px-5 py-3" style={{ color: 'var(--foreground)' }}>Arm, inches</th>
                    <th scope="col" className="text-right px-5 py-3" style={{ color: 'var(--foreground)' }}>Arm, cm</th>
                  </tr>
                </thead>
                <tbody>
                  {CUFF_SIZES.map((c) => (
                    <tr key={c.label} className="border-t" style={{ borderColor: 'var(--border)' }}>
                      <td className="px-5 py-3" style={{ color: 'var(--foreground)' }}>{c.label}</td>
                      <td className="px-5 py-3 text-right num" style={{ color: 'var(--muted-foreground)' }}>{c.inches}</td>
                      <td className="px-5 py-3 text-right num" style={{ color: 'var(--muted-foreground)' }}>{c.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link href="/blood-pressure-cuff-size" className="btn-ghost">
              Full cuff size guide
            </Link>
          </div>
        </section>

        {/* 3. What to record */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--primary)' }}>
              Part three
            </p>
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              What to write down
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              Six things, every time. Nothing on this list is a medical history, and you should not
              start collecting one. It is the reading plus enough context to explain it.
            </p>
            <dl className="rounded-xl overflow-hidden mb-7" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
              {WHAT_TO_RECORD.map(([k, v]) => (
                <div key={k} className="px-5 py-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                  <dt className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{k}</dt>
                  <dd className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/bp-central-blood-pressure-log.pdf" download className="btn-primary" data-placement="starter-kit-pdf">
                Download the printable log
              </a>
              <Link href="/log-sheet" className="btn-ghost">
                Or read it on the site
              </Link>
            </div>
            <p className="text-sm mt-3" style={{ color: 'var(--muted-foreground)' }}>
              PDF, free, no email needed.
            </p>
          </div>
        </section>

        {/* 4. Averages + appointment prep */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--primary)' }}>
              Part four
            </p>
            <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
              Turn the pile into one number
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
              This is the part most people skip, and it is the part that makes the rest worth doing.
              One reading sits anywhere in a wide scatter. The average across a set of them is the
              thing a doctor can use.
            </p>

            <div className="rounded-xl px-6 py-6 mb-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <ReadingHistory />
              <p className="text-sm mt-4" style={{ color: 'var(--muted-foreground)' }}>
                Each dot is one reading. The circled one is the reading people panic about. The line
                is what actually matters.
              </p>
            </div>

            <div className="rounded-xl px-6 py-5 mb-7" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--foreground)' }}>
                <strong>How much to bring.</strong> The AHA and AMA describe{' '}
                {SMBP_PROTOCOL.perSession} readings at least {SMBP_PROTOCOL.minutesBetween} minute
                apart, morning and evening. That is {SMBP_PROTOCOL.readingsPerDay} a day.{' '}
                {SMBP_PROTOCOL.optimalDays} days gives {SMBP_PROTOCOL.optimalReadings} readings and
                is the fuller picture; {SMBP_PROTOCOL.minimumDays} days gives{' '}
                {SMBP_PROTOCOL.minimumReadings} and is the minimum they describe.
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                {AHA_AMA_HOME_SOURCE.organization},{' '}
                <a href={AHA_AMA_HOME_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
                  {AHA_AMA_HOME_SOURCE.title}
                </a>
                , {AHA_AMA_HOME_SOURCE.citation}. If your doctor asked for a different routine, do theirs.
              </p>
            </div>

            <Link href="/blood-pressure-average-calculator" className="btn-primary">
              Work out your average
            </Link>
            <p className="text-sm mt-3" style={{ color: 'var(--muted-foreground)' }}>
              Runs in your browser. Your readings are not sent anywhere.
            </p>
          </div>
        </section>

        <AppointmentPrep />

        {/* Email: a convenience, offered after everything has already been given away. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Want it in your inbox instead?
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
              You already have everything above. If it is easier to have the checklist and the
              routine sitting in your email where you can find it on a Tuesday morning, we will send
              it. We will also tell you when {PRODUCT.name} reaches the App Store.
            </p>
            <EmailCaptureForm source="/tracking-starter-kit" campaign="starter-kit" buttonLabel="Send me the kit" />
            <p className="text-sm leading-relaxed mt-5" style={{ color: 'var(--muted-foreground)' }}>
              We only ask for your email. We never ask for your readings, your age, your
              medications or any condition, and nothing about your health goes into the mailing
              list.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ background: 'var(--background)' }}>
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

        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14 space-y-6">
            <NextStepStrip current="/tracking-starter-kit" />
            <SiblingCallout
              question="Still deciding which monitor to buy?"
              deepLink="/best-blood-pressure-monitor-for-home"
              deepLinkLabel="Read the monitor reviews on BP Monitor Lab"
              placement="starter-kit-footer"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

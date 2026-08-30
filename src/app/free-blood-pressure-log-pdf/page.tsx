import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageSchema } from '@/components/PageSchema';
import { AppStoreCta } from '@/components/AppStoreCta';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { PRODUCT, MEDICAL_DISCLAIMER } from '@/lib/product';
import { CHECKLIST_SOURCE } from '@/lib/checklist';

export const metadata: Metadata = {
  title: 'Printable Blood Pressure Chart and Log PDF, Free',
  description:
    'A free printable blood pressure chart to write your readings on. Two sheets: a 7-day record laid out to the AHA and AMA routine, and a blank log for a routine of your own. Columns for date, time, arm, systolic, diastolic, pulse and notes. No email needed.',
  alternates: { canonical: `${PRODUCT.siteUrl}/free-blood-pressure-log-pdf` },
};

/**
 * Repositioned 18 August 2026.
 *
 * This page used to be built entirely on a feature BP Central does not have.
 * It described tapping Export in the app to produce "a clean PDF with every
 * reading organized by date, a 30-day trend chart, and your average systolic,
 * diastolic, and pulse", and told people to send it to their doctor. None of
 * that exists. The app shares plain text through the phone's share sheet.
 *
 * Worse, the free PDF the page offered did not exist either. There was no file
 * anywhere in the repo.
 *
 * The URL is worth keeping, because people really do search for a printable
 * blood pressure log. So the page now delivers exactly that: a real printable
 * PDF, generated for this site, with BP Central offered honestly as the digital
 * alternative rather than as a PDF generator.
 */

const PDF_PATH = '/bp-central-blood-pressure-log.pdf';

const FAQS = [
  {
    q: 'Is there a free printable blood pressure chart?',
    a: 'Yes. This one is free, needs no email address and no account, and downloads as a PDF with two sheets: a seven day record laid out to the AHA and AMA routine, and a blank log for a schedule of your own.',
  },
  {
    q: 'What should a blood pressure log include?',
    a: 'The top number, the bottom number, your pulse, the date and the time, and a short note about anything unusual such as a rushed morning or a missed dose. Recording which arm you used matters too, because you should use the same one every time for the readings to compare.',
  },
  {
    q: 'How many days should I record before an appointment?',
    a: 'The joint statement from the American Heart Association and the American Medical Association describes two readings at least a minute apart, morning and evening, for seven days. That is 28 readings. Three days, or 12 readings, is the minimum they describe. If your doctor gave you a routine, follow theirs.',
  },
  {
    q: 'Is a paper blood pressure log good enough?',
    a: 'For many people, yes. Most clinics hand out a paper chart for exactly this and it is what they ask to see. Paper struggles later, when you want an average across a month or you cannot find last week’s sheet.',
  },
  {
    q: 'What is the difference between a blood pressure chart and a blood pressure log?',
    a: 'People use both words for both things. A log or record sheet is blank and you write your readings on it, which is what this page gives you. A range chart shows what the numbers mean, from normal through to the crisis range, and lives on our blood pressure chart page.',
  },
  {
    q: 'Do I have to print it, or can I track on my phone?',
    a: 'Either. The printable is free and always will be. BP Central keeps the same log on a phone and works out the averages for you, which is the part paper is worst at.',
  },
];


const WHATS_ON_IT = [
  'Sheet one is a 7-day record: two readings each morning and each evening, which is 28 in total.',
  'Sheet two is blank, for a routine of your own or for a schedule your doctor gave you.',
  'Columns for the top number, the bottom number, your pulse and a note about anything unusual.',
  'The preparation steps printed at the top, so the sheet reminds you before you press the button.',
  'A box at the end of the week for your two averages, which is the figure worth taking to an appointment.',
  'Black and white throughout. It costs nothing to print and it still reads on a mono printer.',
];

export default function FreePdfPage() {
  return (
    <>
      <PageSchema
        path="/free-blood-pressure-log-pdf"
        headline="Printable Blood Pressure Chart and Log PDF"
        published="2026-04-19"
        modified="2026-08-30"
        breadcrumb={[{ name: 'Resources', path: '/resources' }]}
        faqs={FAQS}
        citeAha
      />
      <SiteNav />
      <main id="main-content" className="pt-20">

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: 'var(--primary)' }}
            >
              Free printable
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl leading-[1.08] mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Printable blood pressure chart.
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Two sheets in one PDF. Print them, stick them on the fridge, and write your readings
              down as you take them. No email needed and nothing to sign up for.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={PDF_PATH} download className="btn-primary">
                <Download size={18} />
                Download the PDF, both sheets
              </a>
              <Link href="/checklist" className="btn-ghost">
                Read the measurement checklist
              </Link>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-8" style={{ color: 'var(--foreground)' }}>
              What is on the sheet
            </h2>
            <ul className="flex flex-col gap-4">
              {WHATS_ON_IT.map((item) => (
                <li key={item} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full shrink-0"
                    style={{ background: 'var(--primary)' }}
                  />
                  <span className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-8 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              The preparation steps come from {CHECKLIST_SOURCE.organization}.{' '}
              <a href={CHECKLIST_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                {CHECKLIST_SOURCE.title}
              </a>
              . {CHECKLIST_SOURCE.citation}.
            </p>
          </div>
        </section>

        {/* Previews. The SERP for this term carries an image pack at position 1,
            and a reader deciding whether to spend paper on a download deserves
            to see it first either way. */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--foreground)' }}>
              Two sheets, one download
            </h2>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Use whichever fits. Most people want the first one.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  src: '/brand/previews/log-7day.png',
                  alt: 'Page one of the printable: a seven day blood pressure record with two morning and two evening rows for each day, and columns for the top number, bottom number, pulse and notes.',
                  h: 'Sheet one, the 7-day record',
                  d: 'Laid out to the routine the American Heart Association and American Medical Association describe: two readings a minute apart, morning and evening, for seven days. That is 28 readings, the fuller picture they name.',
                },
                {
                  src: '/brand/previews/log-freeform.png',
                  alt: 'Page two of the printable: a blank blood pressure log with columns for date, time, arm, top number, bottom number, and pulse or notes.',
                  h: 'Sheet two, blank',
                  d: 'Rows and columns, no schedule. If your doctor asked for something different, use this one and do theirs.',
                },
              ].map((x) => (
                <figure key={x.src} className="m-0">
                  <Image
                    src={x.src}
                    alt={x.alt}
                    width={900}
                    height={1165}
                    className="rounded-lg w-full h-auto"
                    style={{ border: '1px solid var(--border)' }}
                  />
                  <figcaption className="mt-4">
                    <span className="font-semibold block mb-1" style={{ color: 'var(--foreground)' }}>{x.h}</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{x.d}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-3" style={{ color: 'var(--foreground)' }}>
              And one for the appointment itself
            </h2>
            <p className="text-lg leading-relaxed mb-6 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              The log is the working document you fill in all week. This is the single page you
              carry in: the dates, the count, your two averages, the monitor and cuff you used, and
              space for the questions you meant to ask.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="/bp-central-appointment-summary.pdf" download className="btn-ghost" data-placement="printables-summary-pdf">
                Download the summary sheet
              </a>
              <Link href="/tracking-starter-kit" className="btn-ghost">
                What to bring, in full
              </Link>
            </div>
          </div>
        </section>

        {/* Disambiguation. "Blood pressure chart" means two different things and
            the search results mix them. Saying so here keeps this page and
            /blood-pressure-chart out of each other's way, and it is the honest
            answer for the reader who wanted the other one. */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--foreground)' }}>
              Wanted the other kind of chart?
            </h2>
            <p className="text-lg leading-relaxed mb-6 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              People search for a &ldquo;blood pressure chart&rdquo; meaning one of two different
              things, and it is worth being clear about which one you have landed on.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-xl px-6 py-5" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>A sheet to write on</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  That is this page. Blank rows, you fill them in.
                </p>
              </div>
              <div className="rounded-xl px-6 py-5" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>A chart of what the numbers mean</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                  The American Heart Association ranges, from normal through to the crisis range.
                </p>
                <Link href="/blood-pressure-chart" className="text-sm font-semibold underline underline-offset-4 inline-flex items-center min-h-[44px]" style={{ color: 'var(--primary)' }}>
                  The blood pressure range chart
                </Link>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-6" style={{ color: 'var(--muted-foreground)' }}>
              The ranges are deliberately not printed on the log sheet. A category table next to a
              row of blank boxes invites people to diagnose themselves at the kitchen table, and
              that is not what a record sheet is for.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--foreground)' }}>
              Paper works. Until it does not.
            </h2>
            <p className="text-lg leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              A paper log is a fine place to start, and plenty of people never need anything else.
              The trouble comes later. Sheets go missing. Working out a three month average by hand
              is nobody&apos;s idea of a good evening. And a stack of paper is hard to read at a
              glance.
            </p>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              BP Central keeps the same log on your phone. It does the averages for you, draws the
              trend over 7, 30 and 90 days, and writes a plain summary you can send from your phone
              when you need to show someone.
            </p>

            <div
              className="rounded-xl p-6 mb-8"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                To be clear about the app
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                BP Central does not make PDFs. Its summary is plain text that goes out through your
                phone&apos;s normal share button, so you can text it, email it or save it. If a PDF
                is what you want, the printable above is the one to use.
              </p>
            </div>

            <AppStoreCta source="/free-blood-pressure-log-pdf" />
            <p className="text-sm mt-5" style={{ color: 'var(--muted-foreground)' }}>
              First {PRODUCT.freeReadings} readings free. Then {PRODUCT.price} once. No subscription.
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6">
                <h2 className="font-display text-2xl mb-3" style={{ color: 'var(--foreground)' }}>
                  Want the whole system?
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  You already have the printable. We will email you the rest of the starter kit:
                  how to take a reading that counts, what to write in each column, cuff sizing, and
                  how to turn a month of numbers into one figure. Every step comes from the
                  American Heart Association.
                </p>
              </div>
              <div className="lg:col-span-6 w-full">
                <EmailCaptureForm source="/free-blood-pressure-log-pdf" campaign="starter-kit" buttonLabel="Send me the kit" />
              </div>
            </div>
            <div className="mt-16 border-t pt-12" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-display text-3xl mb-8" style={{ color: 'var(--foreground)' }}>
                Common questions
              </h2>
              {FAQS.map((f) => (
                <div key={f.q} className="py-5 border-b" style={{ borderColor: 'var(--border)' }}>
                  <h3 className="font-display text-lg mb-2" style={{ color: 'var(--foreground)' }}>{f.q}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed mt-12" style={{ color: 'var(--muted-foreground)' }}>
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>

        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            <aside className="rounded-xl px-6 py-5" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Printed it? The rest of the system is here.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                How to take a reading that counts, what to write in each column, cuff sizing, and how to
                turn a month of numbers into the one figure to bring to your appointment. All free, all
                on the page.
              </p>
              <Link href="/tracking-starter-kit" className="text-sm font-semibold underline underline-offset-4 inline-flex items-center min-h-[44px]" style={{ color: 'var(--primary)' }}>
                The home tracking starter kit
              </Link>
            </aside>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

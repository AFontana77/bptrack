import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AppStoreCta } from '@/components/AppStoreCta';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { PRODUCT, MEDICAL_DISCLAIMER } from '@/lib/product';
import { CHECKLIST_SOURCE } from '@/lib/checklist';

export const metadata: Metadata = {
  title: 'Free Blood Pressure Log PDF',
  description:
    'A free printable blood pressure log PDF. Columns for date, time, arm, systolic, diastolic, pulse and notes, plus the AHA preparation steps. Print it, or keep the same log on your phone.',
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

const WHATS_ON_IT = [
  'Columns for date, time, arm, systolic, diastolic, pulse and a note.',
  '24 rows, which is about a week of morning and evening readings.',
  'The preparation steps printed at the top, so you do not have to remember them.',
  'No category chart, on purpose. A log is for writing down numbers, not for grading them.',
];

export default function FreePdfPage() {
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
              Free printable
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl leading-[1.08] mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Free blood pressure log PDF.
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              One page. Print it, stick it on the fridge, and write your readings down as you take
              them. No email needed and nothing to sign up for.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={PDF_PATH} download className="btn-primary">
                <Download size={18} />
                Download the log PDF
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
                  Want the checklist too?
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  We will email you the one page checklist for taking a reading properly at home.
                  Every step comes from the American Heart Association.
                </p>
              </div>
              <div className="lg:col-span-6 w-full">
                <EmailCaptureForm source="/free-blood-pressure-log-pdf" />
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

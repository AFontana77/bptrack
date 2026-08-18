import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import {
  CHECKLIST,
  CHECKLIST_TITLE,
  CHECKLIST_INTRO,
  CHECKLIST_SOURCE,
  CHECKLIST_DISCLAIMER,
} from '@/lib/checklist';
import { PRODUCT } from '@/lib/product';

export const metadata: Metadata = {
  title: 'Home Blood Pressure Checklist',
  description:
    'A free checklist for taking your blood pressure at home. How long to rest first, how to sit, where the cuff goes, and how many readings to take. Every step comes from the American Heart Association.',
  alternates: { canonical: `${PRODUCT.siteUrl}/checklist` },
};

export default function ChecklistPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: 'var(--primary)' }}
            >
              Free checklist
            </p>
            <h1
              className="font-display text-4xl sm:text-5xl leading-[1.08] mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              {CHECKLIST_TITLE}
            </h1>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--muted-foreground)' }}>
              {CHECKLIST_INTRO}
            </p>

            <div
              className="rounded-xl p-6 sm:p-7 print:hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="font-display text-xl mb-2" style={{ color: 'var(--foreground)' }}>
                Want it in your inbox?
              </p>
              <p className="text-sm mb-5" style={{ color: 'var(--muted-foreground)' }}>
                We will email you the checklist so you have it when you need it. You can also just
                read it below or print this page.
              </p>
              <EmailCaptureForm source="/checklist" />
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-16">
            {CHECKLIST.map((section, i) => (
              <div key={section.heading} className={i > 0 ? 'mt-12' : ''}>
                <h2
                  className="font-display text-2xl mb-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  {section.heading}
                </h2>
                <div className="h-px w-14 mb-6" style={{ background: 'var(--primary)' }} />
                <ul className="flex flex-col gap-5">
                  {section.steps.map((step) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2 w-2 rounded-full shrink-0"
                        style={{ background: 'var(--primary)' }}
                      />
                      <div>
                        <p className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                          {step.title}
                        </p>
                        <p
                          className="text-base leading-relaxed mt-1"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div
              className="mt-14 rounded-xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.16em] mb-3"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Where this comes from
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                {CHECKLIST_SOURCE.organization}. {CHECKLIST_SOURCE.title}. {CHECKLIST_SOURCE.citation}.
              </p>
              <a
                href={CHECKLIST_SOURCE.url}
                className="text-sm font-semibold inline-block mt-3"
                style={{ color: 'var(--primary)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the statement
              </a>
              <p className="text-xs leading-relaxed mt-5" style={{ color: 'var(--muted-foreground)' }}>
                {CHECKLIST_DISCLAIMER}
              </p>
            </div>

            <div className="mt-10 print:hidden">
              <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
                Got the technique sorted? The next part is keeping the numbers.{' '}
                <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  See how BP Central does it
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

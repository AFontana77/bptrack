import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BPTrack — Blood Pressure Reference + Daily Reading Log",
  description: "BPTrack pairs AHA reference ranges with a personal reading log. Search normal ranges, understand your numbers, track trends over time, and share a clean report with your doctor. Free on iPhone and Android.",
};

const BP_CATEGORIES = [
  { label: 'Normal',   range: '<120 / <80',     dot: 'oklch(0.62 0.14 150)', emphasis: false },
  { label: 'Elevated', range: '120–129 / <80',  dot: 'oklch(0.74 0.14 75)',  emphasis: false },
  { label: 'Stage 1',  range: '130–139 / 80–89', dot: 'oklch(0.66 0.16 50)', emphasis: false },
  { label: 'Stage 2',  range: '140+ / 90+',     dot: 'oklch(0.45 0.18 25)',  emphasis: false },
  { label: 'Crisis',   range: '180+ / 120+',    dot: 'oklch(0.36 0.16 25)',  emphasis: true  },
];

const FEATURES = [
  { label: 'Reading log',          desc: 'Systolic, diastolic, pulse, time, posture. Quick entry.' },
  { label: 'AHA categories',       desc: 'Every reading auto-classified against AHA reference ranges.' },
  { label: 'Trend tracking',       desc: '7-day, 30-day, 90-day averages. See where your BP is heading.' },
  { label: 'Doctor-ready exports', desc: 'PDF reports formatted for clinical visits.' },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "BPTrack",
            "applicationCategory": "LifestyleApplication",
            "operatingSystem": "iOS, Android",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "description": "Blood pressure reference data from AHA guidelines. Log your readings, track trends, and share reports with your doctor.",
            "url": "https://www.bptrack.app"
          })
        }}
      />
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Section 1 — Hero (left-aligned, two-column) */}
        <section className="relative" style={{ background: 'var(--background)' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* Left column */}
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-6"
                   style={{ color: 'var(--primary)' }}>
                  AHA-verified ranges · Free reference
                </p>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6"
                    style={{ color: 'var(--foreground)' }}>
                  Know what every blood pressure reading means.
                </h1>

                <p className="text-lg leading-relaxed mb-8 max-w-xl"
                   style={{ color: 'var(--muted-foreground)' }}>
                  BPTrack pairs the official AHA reference ranges with a quick daily log.
                  Search any number. See the category. Watch your trend. Bring a clean PDF
                  to your next appointment.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link href="/library" className="btn-primary">
                    Browse the reference library
                  </Link>
                  <Link href="/free-download" className="btn-ghost">
                    Download the free PDF
                  </Link>
                </div>

                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Reference data only. Not a diagnosis. Talk with your doctor about results.
                </p>
              </div>

              {/* Right column — BP categories reference card */}
              <div className="lg:col-span-5">
                <div className="rounded-lg overflow-hidden"
                     style={{
                       background: 'var(--surface)',
                       border: '1px solid var(--border)',
                       boxShadow: 'var(--shadow-md)'
                     }}>
                  <div className="px-6 py-4"
                       style={{ borderBottom: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em]"
                       style={{ color: 'var(--muted-foreground)' }}>
                      Blood pressure categories
                    </p>
                    <p className="font-display text-base mt-1"
                       style={{ color: 'var(--foreground)' }}>
                      American Heart Association
                    </p>
                  </div>

                  <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {BP_CATEGORIES.map((cat) => (
                      <li key={cat.label}
                          className="flex items-center justify-between px-6 py-4"
                          style={{ borderColor: 'var(--border)' }}>
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: cat.dot,
                            }}
                          />
                          <span className={cat.emphasis ? 'font-semibold' : 'font-medium'}
                                style={{ color: cat.emphasis ? 'var(--primary)' : 'var(--foreground)' }}>
                            {cat.label}
                          </span>
                        </div>
                        <span className="num text-sm"
                              style={{
                                color: cat.emphasis ? 'var(--primary)' : 'var(--muted-foreground)',
                                fontWeight: cat.emphasis ? 600 : 500,
                              }}>
                          {cat.range}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="px-6 py-3 text-xs"
                       style={{
                         background: 'var(--background)',
                         borderTop: '1px solid var(--border)',
                         color: 'var(--muted-foreground)'
                       }}>
                    Values in mmHg. Source: AHA 2017 Hypertension Guideline.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2 — Stat strip (full-width burgundy) */}
        <section style={{ background: 'var(--primary)' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
              <div>
                <div className="font-display num text-5xl mb-2"
                     style={{ color: 'oklch(0.99 0 0)' }}>
                  5
                </div>
                <p className="text-sm uppercase tracking-[0.16em]"
                   style={{ color: 'oklch(0.92 0.02 25)' }}>
                  BP categories
                </p>
              </div>
              <div>
                <div className="font-display text-5xl mb-2"
                     style={{ color: 'oklch(0.99 0 0)' }}>
                  AHA
                </div>
                <p className="text-sm uppercase tracking-[0.16em]"
                   style={{ color: 'oklch(0.92 0.02 25)' }}>
                  + CDC verified
                </p>
              </div>
              <div>
                <div className="font-display num text-5xl mb-2"
                     style={{ color: 'oklch(0.99 0 0)' }}>
                  $0
                </div>
                <p className="text-sm uppercase tracking-[0.16em]"
                   style={{ color: 'oklch(0.92 0.02 25)' }}>
                  to start
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Editorial value section */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <div className="max-w-3xl mb-14">
              <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-5"
                  style={{ color: 'var(--foreground)' }}>
                Most BP apps just log numbers.
              </h2>
              <p className="text-lg leading-relaxed"
                 style={{ color: 'var(--muted-foreground)' }}>
                BPTrack pairs your readings with the AHA reference ranges so you
                know what each number means. Track your trend. Share your log with
                your doctor.
              </p>
            </div>

            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              {FEATURES.map((f) => (
                <div key={f.label}
                     className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 border-b"
                     style={{ borderColor: 'var(--border)' }}>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-lg"
                        style={{ color: 'var(--foreground)' }}>
                      {f.label}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-base leading-relaxed"
                       style={{ color: 'var(--muted-foreground)' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — CTA panel */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
                 style={{ color: 'var(--primary)' }}>
                Free to start
              </p>

              <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-5"
                  style={{ color: 'var(--foreground)' }}>
                Get the printable log first.
              </h2>

              <p className="text-lg leading-relaxed mb-8"
                 style={{ color: 'var(--muted-foreground)' }}>
                Print the AHA reference sheet and a one-week reading log. Use it on
                paper today. Move to the app when you want trend charts and a
                doctor-ready PDF export.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/free-download" className="btn-primary">
                  Get the free PDF
                </Link>
                <Link href="/library" className="btn-ghost">
                  Browse the library
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Blood Pressure Log Sheet",
  description: "A printable daily log with morning and evening readings, pulse, notes, and a 30-day grid. Free printable from BPTrack. No signup required.",
};

const INSIDE = [
  'Morning and evening reading slots',
  'Pulse / heart rate column',
  'Notes for symptoms or medications',
  '30-day grid layout, one page per month',
  'US Letter format, printable at home',
];

export default function FreeDownloadPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                      className="uppercase text-xs font-semibold mb-6 block">
                  Free printable
                </span>
                <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                    className="text-4xl sm:text-5xl font-bold mb-6">
                  Free blood pressure log sheet.
                </h1>
                <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8 max-w-xl">
                  A printable daily log with morning and evening readings, pulse, notes, and a 30-day grid.
                </p>

                <div style={{ background: 'oklch(0.96 0.008 20)', border: '1px solid oklch(0.86 0.012 20)' }}
                     className="p-7">
                  <span style={{ color: 'oklch(0.48 0.015 20)', fontFamily: 'var(--font-body)', letterSpacing: '0.16em' }}
                        className="uppercase text-xs font-semibold mb-3 block">
                    What is inside
                  </span>
                  <ul>
                    {INSIDE.map((item, i) => (
                      <li key={item}
                          style={{
                            borderTop: '1px solid oklch(0.86 0.012 20)',
                            borderBottom: i === INSIDE.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                          }}
                          className="py-3 flex items-center gap-3">
                        <span aria-hidden="true"
                              style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'oklch(0.45 0.18 25)' }} />
                        <span style={{ color: 'oklch(0.18 0.02 20)' }} className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div style={{ background: 'oklch(0.96 0.008 20)', border: '1px solid oklch(0.86 0.012 20)' }}
                     className="p-8">
                  <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                        className="uppercase text-xs font-semibold mb-3 block">
                    Get your free copy
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                      className="text-2xl font-bold mb-3">
                    Send it to my inbox.
                  </h2>
                  <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm mb-6">Enter your email and we will send the PDF.</p>
                  <EmailCaptureForm buttonLabel="Send Me the Free PDF" />
                  <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs mt-4 text-center">No spam. Unsubscribe any time.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Database CTA */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Want more?
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              The searchable database lives in the app.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              The free PDF covers the basics. The BPTrack app gives you the full searchable library and your personal log. Free on iPhone and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get on App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 style={{ border: '1px solid oklch(0.86 0.012 20)', color: 'oklch(0.45 0.18 25)', background: 'transparent', fontFamily: 'var(--font-display)' }}
                 className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition-colors min-h-[48px]">
                Get on Google Play
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

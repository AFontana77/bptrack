import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About BPTrack",
  description: "The story behind BPTrack. Search blood pressure ranges. Log your readings. Know your numbers.",
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              About the project
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              A reference book for blood pressure, with a log built in.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-6 max-w-2xl">
              BPTrack was built because 47% of American adults have high blood pressure but most cannot show their doctor a meaningful log at their appointment. BPTrack pairs AHA and CDC reference tables with a clean daily log so you know where every reading falls, not just whether it feels high.
            </p>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-10 max-w-2xl">
              The companion app for iPhone and Android adds trend charts and exportable PDF reports. The free log sheet on this site gives you the paper version. No app required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/library" className="btn-primary">
                Browse the library
              </Link>
              <Link href="/free-download"
                    style={{ border: '1px solid oklch(0.86 0.012 20)', color: 'oklch(0.45 0.18 25)', background: 'transparent', fontFamily: 'var(--font-display)' }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition-colors min-h-[48px]">
                Free download
              </Link>
            </div>
          </div>
        </section>

        {/* Publisher */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Publisher
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Built by Anvil Road LLC.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed max-w-2xl">
              Anvil Road is an independent publisher and app studio based in New Jersey. We build reference databases, log apps, KDP books, and companion print products across a range of hobby and professional categories. BPTrack is one of 20+ apps in the Anvil Road portfolio. All apps are free to start, with one-time unlocks for unlimited features. No subscriptions.
            </p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

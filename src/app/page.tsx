import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { AppStoreCta } from '@/components/AppStoreCta';
import {
  PRODUCT,
  FEATURES,
  UNLOCK_INCLUDES,
  NOT_INCLUDED,
  BP_CATEGORIES,
  AHA_SOURCE,
  SCREENSHOTS,
} from '@/lib/product';

export const metadata: Metadata = {
  title: 'BP Central - Blood pressure log for iPhone and Android',
  description:
    'Save every blood pressure reading in one place. See your 7, 30 and 90 day trends, tap any point on the chart, and send a plain summary to your doctor. First 10 readings free, then $6.99 once.',
  alternates: { canonical: PRODUCT.siteUrl },
};

const TONE: Record<string, string> = {
  normal: 'oklch(0.62 0.14 150)',
  elevated: 'oklch(0.74 0.14 75)',
  stage1: 'oklch(0.66 0.16 50)',
  stage2: 'oklch(0.45 0.18 25)',
  crisis: 'oklch(0.36 0.16 25)',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BP Central',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'iOS, Android',
            publisher: { '@type': 'Organization', name: PRODUCT.publisher },
            offers: [
              { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'First 10 readings free' },
              { '@type': 'Offer', price: '6.99', priceCurrency: 'USD', description: 'One-time unlock. Not a subscription.' },
            ],
            description:
              'A blood pressure log for your phone. Save each reading, see your trends over 7, 30 and 90 days, and share a plain summary.',
            url: PRODUCT.siteUrl,
          }),
        }}
      />
      <SiteNav />
      <main id="main-content" className="pt-16">

        {/* Hero */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              <div className="lg:col-span-7">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] mb-6"
                  style={{ color: 'var(--primary)' }}
                >
                  For anyone told to check at home
                </p>

                <h1
                  className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6"
                  style={{ color: 'var(--foreground)' }}
                >
                  Your blood pressure readings, all in one place.
                </h1>

                <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--muted-foreground)' }}>
                  Your doctor asked you to check at home. BP Central keeps every reading,
                  shows you how the numbers move over weeks and months, and writes a plain
                  summary you can hand over at your next visit.
                </p>

                <div id="get-the-app" className="scroll-mt-24">
                  <AppStoreCta />
                </div>

                <p className="text-sm mt-5" style={{ color: 'var(--muted-foreground)' }}>
                  First {PRODUCT.freeReadings} readings free. Then {PRODUCT.price} once. No subscription,
                  no account, no ads.
                </p>
              </div>

              {/* Reference card. Real content, so the hero needs no invented screenshot. */}
              <div className="lg:col-span-5">
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      What the ranges are
                    </p>
                    <p className="font-display text-base mt-1" style={{ color: 'var(--foreground)' }}>
                      American Heart Association
                    </p>
                  </div>

                  <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
                    {BP_CATEGORIES.map((cat) => (
                      <li
                        key={cat.label}
                        className="flex items-center justify-between gap-3 px-6 py-3.5"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            style={{
                              display: 'inline-block',
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: TONE[cat.tone],
                            }}
                          />
                          <span className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                            {cat.label}
                          </span>
                        </div>
                        <span className="num text-sm text-right" style={{ color: 'var(--muted-foreground)' }}>
                          {cat.range}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="px-6 py-3 text-xs leading-relaxed"
                    style={{
                      background: 'var(--background)',
                      borderTop: '1px solid var(--border)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Values in mmHg. Source: {AHA_SOURCE.organization},{' '}
                    <a href={AHA_SOURCE.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                      {AHA_SOURCE.title}
                    </a>
                    , {AHA_SOURCE.reviewed}. A range is not a diagnosis.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Why not paper or Notes */}
        <section style={{ background: 'var(--primary)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <h2
              className="font-display text-3xl sm:text-4xl leading-tight mb-6 max-w-2xl"
              style={{ color: 'oklch(0.99 0 0)' }}
            >
              A notes app holds the numbers. It cannot show you the pattern.
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'oklch(0.92 0.02 25)' }}>
              One reading tells you very little. Thirty readings tell you something. BP Central
              does the part that paper and Notes cannot: it works out your averages, draws the
              line, and hands you a tidy summary when you need one.
            </p>
          </div>
        </section>

        {/* What it does */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-3" style={{ color: 'var(--foreground)' }}>
              What you get
            </h2>
            <p className="text-lg mb-12 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Six things, and every one of them is in the app today.
            </p>

            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 py-6 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="md:col-span-4">
                    <h3 className="font-display text-lg" style={{ color: 'var(--foreground)' }}>
                      {f.label}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots, only once real ones exist. */}
        {SCREENSHOTS.length > 0 ? (
          <section style={{ background: 'var(--surface)' }}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
              <h2 className="font-display text-3xl mb-10" style={{ color: 'var(--foreground)' }}>
                A look inside
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {SCREENSHOTS.map((s) => (
                  <figure key={s.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.alt} className="w-full rounded-xl" style={{ border: '1px solid var(--border)' }} />
                    <figcaption className="text-sm mt-3" style={{ color: 'var(--muted-foreground)' }}>
                      {s.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Price */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
                  style={{ color: 'var(--primary)' }}
                >
                  What it costs
                </p>
                <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-5" style={{ color: 'var(--foreground)' }}>
                  Pay once. That is the whole deal.
                </h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  Your first {PRODUCT.freeReadings} readings are free, so you can see whether you
                  like it before you pay anything. After that it is {PRODUCT.price} one time. There
                  is no monthly fee and there never will be.
                </p>
                <AppStoreCta variant="ghost" />
              </div>

              <div className="lg:col-span-6">
                <div
                  className="rounded-xl p-7"
                  style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display num text-5xl" style={{ color: 'var(--primary)' }}>
                      {PRODUCT.price}
                    </span>
                    <span className="text-lg font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                      {PRODUCT.priceNote}
                    </span>
                  </div>
                  <p className="text-sm mt-1 mb-6" style={{ color: 'var(--muted-foreground)' }}>
                    Not a subscription.
                  </p>
                  <ul className="flex flex-col gap-3">
                    {UNLOCK_INCLUDES.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: 'var(--primary)' }}
                        />
                        <span className="text-base" style={{ color: 'var(--foreground)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What it does not do */}
        <section style={{ background: 'var(--background)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
            <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-4" style={{ color: 'var(--foreground)' }}>
              What it does not do
            </h2>
            <p className="text-lg leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Better you find out here than after you pay.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {NOT_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="rounded-xl p-5 text-base leading-relaxed"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* The first item above says you need a monitor. This answers that,
                and nothing more. No banner, no product grid on the homepage. */}
            <p className="text-base leading-relaxed mt-8" style={{ color: 'var(--muted-foreground)' }}>
              Do not have a monitor yet? We checked which ones passed an independent accuracy test
              and wrote up{' '}
              <Link
                href="/validated-blood-pressure-monitors"
                className="underline underline-offset-4"
                style={{ color: 'var(--primary)' }}
              >
                the four we recommend
              </Link>
              , plus{' '}
              <Link
                href="/blood-pressure-cuff-size"
                className="underline underline-offset-4"
                style={{ color: 'var(--primary)' }}
              >
                how to get the cuff size right
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Checklist / email capture */}
        <section style={{ background: 'var(--surface)' }}>
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-6">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  Free checklist
                </p>
                <h2 className="font-display text-3xl leading-tight mb-4" style={{ color: 'var(--foreground)' }}>
                  Getting a good reading is harder than it looks.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Crossed legs, a full bladder, a coffee half an hour ago, a cuff over a sleeve.
                  Each one moves the number. Our one page checklist walks through how to take a
                  reading properly at home. Every step comes from the American Heart Association.
                </p>
                <Link
                  href="/checklist"
                  className="inline-block text-sm font-semibold mt-5"
                  style={{ color: 'var(--primary)' }}
                >
                  Read it on the site instead
                </Link>
              </div>
              <div className="lg:col-span-6 w-full">
                <EmailCaptureForm source="/" />
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

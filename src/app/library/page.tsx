import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BPTrack Library — AHA Blood Pressure Reference Tables",
  description: "Browse 25+ AHA/CDC blood pressure reference tables. Categories, thresholds, age-adjusted ranges, and risk guidance. Full search available in the BPTrack app.",
};

const AHA_CATEGORIES = [
  {
    name: "Normal",
    range: "Under 120 / Under 80",
    risk: "Low",
    guidance: "Maintain with healthy diet, regular exercise, and low sodium intake. Get checked once every two years if you have no other risk factors.",
    dot: "oklch(0.62 0.14 150)",
  },
  {
    name: "Elevated",
    range: "120 to 129 / Under 80",
    risk: "Moderate",
    guidance: "Lifestyle changes recommended. Reduce sodium, increase activity, manage weight. Doctor may monitor more frequently. Not yet treated with medication in most cases.",
    dot: "oklch(0.74 0.14 75)",
  },
  {
    name: "Stage 1 Hypertension",
    range: "130 to 139 / 80 to 89",
    risk: "Moderate to High",
    guidance: "Talk to your doctor. Lifestyle changes are the first step. Medication may be added depending on cardiovascular risk factors and overall health profile.",
    dot: "oklch(0.66 0.16 50)",
  },
  {
    name: "Stage 2 Hypertension",
    range: "140 or higher / 90 or higher",
    risk: "High",
    guidance: "Medication is typically prescribed alongside lifestyle changes. Regular monitoring and follow-up appointments are essential. Do not manage this alone.",
    dot: "oklch(0.45 0.18 25)",
  },
  {
    name: "Hypertensive Crisis",
    range: "Over 180 / Over 120",
    risk: "Emergency",
    guidance: "Seek emergency medical care immediately. Wait five minutes and retest. If still elevated, call 911 or get to an ER. Do not drive yourself.",
    dot: "oklch(0.36 0.16 25)",
    emphasis: true,
  },
  {
    name: "Low Blood Pressure (Hypotension)",
    range: "Under 90 / Under 60",
    risk: "Situational",
    guidance: "May be normal for some people. Symptomatic hypotension (dizziness, fainting, blurred vision) warrants evaluation. Can be caused by dehydration, medication, or underlying conditions.",
    dot: "oklch(0.62 0.12 200)",
  },
];

const REFERENCE_TABLES = [
  { title: "Age-adjusted ranges", desc: "Blood pressure norms shift with age. What is normal at 25 differs from what is expected at 65. These tables give AHA-referenced ranges by decade." },
  { title: "Pulse pressure", desc: "The difference between systolic and diastolic. Widening pulse pressure can indicate arterial stiffness. Tables include normal ranges and what elevated readings suggest." },
  { title: "Orthostatic blood pressure", desc: "How readings change when standing from sitting or lying. A drop of 20+ mmHg systolic on standing may indicate orthostatic hypotension, common in older adults and those on certain medications." },
  { title: "White coat hypertension", desc: "Readings taken in a clinical setting are often higher than at home due to anxiety. The AHA recommends home monitoring to compare. These tables explain the discrepancy and what to do about it." },
  { title: "Isolated systolic hypertension", desc: "When only the top number is elevated (140+ systolic with normal diastolic). More common in older adults and carries its own risk profile. Tables include thresholds and treatment guidance." },
  { title: "Ambulatory monitoring reference", desc: "24-hour BP monitoring gives a fuller picture than a single office reading. These tables include daytime, nighttime, and 24-hour average thresholds used in clinical interpretation." },
];

const TIPS = [
  { title: "Measure at the same time each day", body: "Morning readings before food or medication, and evening readings before bed, give you the most consistent baseline. Time of day affects blood pressure significantly." },
  { title: "Sit quietly for five minutes first", body: "Walking, stress, caffeine, and exercise all temporarily elevate readings. The AHA recommends sitting quietly for five minutes before taking your blood pressure." },
  { title: "Take two readings, two minutes apart", body: "Average the two readings for the most accurate picture. If they differ by more than 5 mmHg, take a third and average all three." },
  { title: "Use the right cuff size", body: "An undersized cuff reads high. An oversized cuff reads low. The cuff bladder should cover 80% of your upper arm circumference. Most home monitors come with standard and large cuffs." },
];

export default function LibraryPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-6 block">
              Reference library
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)', lineHeight: 1.1 }}
                className="text-4xl sm:text-5xl font-bold mb-6">
              BPTrack reference library.
            </h1>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-6 max-w-2xl">
              25+ reference tables from American Heart Association and CDC sources. Blood pressure categories, thresholds, age-adjusted ranges, and clinical context, built into every session.
            </p>
            <p style={{ color: 'oklch(0.45 0.18 25)' }} className="text-sm font-semibold">
              Full-text search available in the free BPTrack app.
            </p>
          </div>
        </section>

        {/* AHA Categories */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Six categories
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              AHA blood pressure categories.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              The American Heart Association defines five blood pressure categories plus hypotension. Each carries different clinical guidance and risk implications.
            </p>
            <div>
              {AHA_CATEGORIES.map((cat, i) => (
                <div key={cat.name}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === AHA_CATEGORIES.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-7 grid sm:grid-cols-[260px_1fr] gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span aria-hidden="true"
                            style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: cat.dot, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-display)', color: cat.emphasis ? 'oklch(0.45 0.18 25)' : 'oklch(0.18 0.02 20)' }}
                            className="font-semibold">
                        {cat.name}
                      </span>
                    </div>
                    <p style={{ color: 'oklch(0.48 0.015 20)', fontVariantNumeric: 'tabular-nums' }}
                       className="text-sm pl-5 mb-1">
                      {cat.range} mmHg
                    </p>
                    <p style={{ color: 'oklch(0.45 0.18 25)' }}
                       className="text-xs uppercase font-semibold tracking-wider pl-5">
                      Risk: {cat.risk}
                    </p>
                  </div>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{cat.guidance}</p>
                </div>
              ))}
            </div>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-xs mt-6">
              Source: American Heart Association. Always consult your doctor for personal medical guidance.
            </p>
          </div>
        </section>

        {/* Additional reference tables */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Inside the app
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Additional reference tables.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              The BPTrack app includes 25+ tables beyond the five AHA categories. A preview of what is inside.
            </p>
            <div>
              {REFERENCE_TABLES.map((item, i) => (
                <div key={item.title}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === REFERENCE_TABLES.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[260px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {item.title}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accurate reading tips */}
        <section style={{ background: 'oklch(0.96 0.008 20)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Technique
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              How to get an accurate reading.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-12 max-w-2xl">
              The reading is only as useful as the technique. Most home measurements are taken incorrectly. These four habits fix most of the common errors.
            </p>
            <div>
              {TIPS.map((tip, i) => (
                <div key={tip.title}
                     style={{
                       borderTop: '1px solid oklch(0.86 0.012 20)',
                       borderBottom: i === TIPS.length - 1 ? '1px solid oklch(0.86 0.012 20)' : 'none',
                     }}
                     className="py-6 grid sm:grid-cols-[260px_1fr] gap-4">
                  <span style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.45 0.18 25)' }}
                        className="text-base font-semibold">
                    {tip.title}
                  </span>
                  <p style={{ color: 'oklch(0.40 0.018 20)' }} className="leading-relaxed">{tip.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App CTA */}
        <section style={{ background: 'oklch(0.99 0.003 20)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20">
            <span style={{ color: 'oklch(0.45 0.18 25)', fontFamily: 'var(--font-body)', letterSpacing: '0.18em' }}
                  className="uppercase text-xs font-semibold mb-5 block">
              Get the app
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.02 20)' }}
                className="text-3xl sm:text-4xl font-bold mb-5">
              Search the full database. Log your readings.
            </h2>
            <p style={{ color: 'oklch(0.40 0.018 20)' }} className="text-lg leading-relaxed mb-8">
              The BPTrack app has all 25+ reference tables with full-text search, plus a daily reading log, 30-day trend chart, and doctor-ready PDF export. Free to download. $6.99 one-time for the log and export.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 style={{ border: '1px solid oklch(0.86 0.012 20)', color: 'oklch(0.45 0.18 25)', background: 'transparent', fontFamily: 'var(--font-display)' }}
                 className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold transition-colors min-h-[48px]">
                Google Play
              </a>
            </div>
            <p style={{ color: 'oklch(0.48 0.015 20)' }} className="text-sm">
              Free. No subscription. No credit card.
            </p>
            <div className="mt-6">
              <Link href="/free-download" style={{ color: 'oklch(0.45 0.18 25)' }} className="text-sm hover:underline">
                Or download the free printable reference sheet first
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

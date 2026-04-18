import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Database, ArrowRight, Search, Heart, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BPTrack Library — AHA Blood Pressure Reference Tables",
  description: "Browse 25+ AHA/CDC blood pressure reference tables — categories, thresholds, age-adjusted ranges, and risk guidance. Full search available in the BPTrack app.",
};

const AHA_CATEGORIES = [
  {
    name: "Normal",
    systolic: "Under 120",
    diastolic: "Under 80",
    risk: "Low",
    guidance: "Maintain with healthy diet, regular exercise, and low sodium intake. Get checked once every two years if you have no other risk factors.",
    color: "#15803D",
  },
  {
    name: "Elevated",
    systolic: "120–129",
    diastolic: "Under 80",
    risk: "Moderate",
    guidance: "Lifestyle changes recommended — reduce sodium, increase activity, manage weight. Doctor may monitor more frequently. Not yet treated with medication in most cases.",
    color: "#CA8A04",
  },
  {
    name: "Stage 1 Hypertension",
    systolic: "130–139",
    diastolic: "80–89",
    risk: "Moderate-High",
    guidance: "Talk to your doctor. Lifestyle changes are the first step. Medication may be added depending on cardiovascular risk factors and overall health profile.",
    color: "#EA580C",
  },
  {
    name: "Stage 2 Hypertension",
    systolic: "140 or higher",
    diastolic: "90 or higher",
    risk: "High",
    guidance: "Medication is typically prescribed alongside lifestyle changes. Regular monitoring and follow-up appointments are essential. Do not manage this alone.",
    color: "#DC2626",
  },
  {
    name: "Hypertensive Crisis",
    systolic: "Over 180",
    diastolic: "Over 120",
    risk: "Emergency",
    guidance: "Seek emergency medical care immediately. Wait five minutes and retest — if still elevated, call 911 or get to an ER. Do not drive yourself. Do not wait to see if it comes down.",
    color: "#7F1D1D",
  },
  {
    name: "Low Blood Pressure (Hypotension)",
    systolic: "Under 90",
    diastolic: "Under 60",
    risk: "Situational",
    guidance: "May be normal for some people. Symptomatic hypotension — dizziness, fainting, blurred vision — warrants evaluation. Can be caused by dehydration, medication, or underlying conditions.",
    color: "#1D4ED8",
  },
];

const REFERENCE_TABLES = [
  { title: "Age-adjusted ranges", desc: "Blood pressure norms shift with age. What's normal at 25 differs from what's expected at 65. These tables give AHA-referenced ranges by decade." },
  { title: "Pulse pressure", desc: "The difference between systolic and diastolic. Widening pulse pressure can indicate arterial stiffness. Tables include normal ranges and what elevated readings suggest." },
  { title: "Orthostatic blood pressure", desc: "How readings change when standing from sitting or lying. A drop of 20+ mmHg systolic on standing may indicate orthostatic hypotension — common in older adults and those on certain medications." },
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
        <section className="py-16 px-4" style={{ backgroundColor: '#FFF5F5' }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex w-14 h-14 bg-red-50 rounded-2xl items-center justify-center mb-6">
              <Database className="text-red-600" size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">BPTrack Reference Library</h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed mb-4">
              25+ reference tables from American Heart Association and CDC sources. Blood pressure categories, thresholds, age-adjusted ranges, and clinical context — built into every session.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-red-700 bg-red-50 px-4 py-2 rounded-full">
              <Search size={14} /> Full-text search available in the free BPTrack app
            </div>
          </div>
        </section>

        {/* AHA Categories */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">AHA Blood Pressure Categories</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The American Heart Association defines five blood pressure categories. Each carries different clinical guidance and risk implications.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {AHA_CATEGORIES.map((cat) => (
                <div key={cat.name} className="rounded-xl border border-gray-100 bg-gray-50 p-6 card-hover">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-50 text-red-700">{cat.risk}</span>
                  </div>
                  <p className="text-sm font-medium mb-1" style={{ color: cat.color }}>
                    Systolic: {cat.systolic} mmHg / Diastolic: {cat.diastolic} mmHg
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{cat.guidance}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-sm text-gray-400">
              Source: American Heart Association. Always consult your doctor for personal medical guidance.
            </p>
          </div>
        </section>

        {/* Additional reference tables */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Additional Reference Tables in the App</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The BPTrack app includes 25+ tables beyond the five AHA categories. A preview of what's inside.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {REFERENCE_TABLES.map(({ title, desc }) => (
                <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 card-hover">
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Accurate reading tips */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How to get an accurate reading</h2>
            <p className="text-gray-600 text-center max-w-xl mx-auto mb-10">
              The reading is only as useful as the technique. Most home measurements are taken incorrectly. These four habits fix most of the common errors.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl bg-gray-50">
                  <CheckCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App CTA */}
        <section className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Search the full database. Log your readings.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              The BPTrack app has all 25+ reference tables with full-text search, plus a daily reading log, 30-day trend chart, and doctor-ready PDF export. Free to download. $6.99 one-time for the log and export.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Google Play
              </a>
            </div>
            <p className="text-sm text-gray-400">Free. No subscription. No credit card.</p>
            <div className="mt-6">
              <Link href="/free-download" className="text-sm text-red-700 hover:underline">
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

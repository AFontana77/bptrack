import Link from 'next/link';
import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Database, BookOpen, BarChart3, Star, ArrowRight, Download, CheckCircle, Heart, Activity, FileText, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BPTrack — Blood Pressure Reference + Daily Reading Log",
  description: "BPTrack pairs AHA/CDC reference tables with a personal reading log. Search normal ranges, understand your numbers, track trends over time, and share a clean report with your doctor. Free on iPhone and Android.",
};

const FEATURES = [
  {
    icon: Database,
    title: "AHA/CDC reference library",
    body: "Every blood pressure category with clinical thresholds, risk context, and what your doctor wants to see. Normal, Elevated, Stage 1, Stage 2, and Hypertensive Crisis — all defined by American Heart Association and CDC standards, not generic internet tables.",
  },
  {
    icon: BookOpen,
    title: "Daily reading log",
    body: "Log systolic, diastolic, and pulse with one tap. Add notes for medication changes, stress, or exercise. Track morning vs. evening readings separately so you can spot patterns that matter.",
  },
  {
    icon: BarChart3,
    title: "30-day trend view",
    body: "See your numbers in context, not just today's reading in isolation. The trend view shows where your average sits against AHA thresholds. Spot white coat syndrome, medication effects, and lifestyle improvements before your next appointment.",
  },
  {
    icon: FileText,
    title: "Doctor-ready report",
    body: "One tap exports your last 30 days as a clean, formatted PDF. No screenshots, no scrolling through your phone in the exam room. Print it, email it, or show it on screen. Doctors actually read these.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Search what your number means",
    body: "Type your systolic reading and find the exact AHA category — Normal, Elevated, Stage 1 Hypertension, Stage 2, or Crisis. Get the clinical threshold, what it means for your health, and what the standard guidance is for that range.",
  },
  {
    step: "2",
    title: "Log every reading",
    body: "Add your systolic, diastolic, and pulse after each check. Note the time of day, any medications, and how you're feeling. Takes 15 seconds. Every entry saves to your personal log automatically.",
  },
  {
    step: "3",
    title: "Share the trend with your doctor",
    body: "Export a 30-day summary PDF before any appointment. Your doctor gets a clean record — not a verbal summary you half-remember. Better data leads to better decisions about medication, lifestyle, and follow-up timing.",
  },
];

const DB_CATEGORIES = [
  { label: "Normal", range: "Under 120/80", risk: "Maintain with healthy habits" },
  { label: "Elevated", range: "120–129 / under 80", risk: "Lifestyle changes recommended" },
  { label: "Stage 1 Hypertension", range: "130–139 / 80–89", risk: "Talk to your doctor" },
  { label: "Stage 2 Hypertension", range: "140+ / 90+", risk: "Medication likely needed" },
  { label: "Hypertensive Crisis", range: "Over 180 / over 120", risk: "Seek emergency care" },
  { label: "Low Blood Pressure", range: "Under 90/60", risk: "May need evaluation if symptomatic" },
];

const FAQS = [
  {
    q: "Is BPTrack free?",
    a: "Yes. The app is free to download and the full reference library is free. The $6.99 one-time unlock adds unlimited log entries, trend charts, and the PDF export. No subscription, no recurring charge — pay once, keep it forever.",
  },
  {
    q: "What blood pressure data is in the app?",
    a: "BPTrack includes 25+ reference tables based on American Heart Association and CDC guidelines. That covers all five AHA pressure categories, age-adjusted ranges, pulse pressure guidance, orthostatic blood pressure norms, and isolated systolic hypertension thresholds.",
  },
  {
    q: "Can I track readings for more than one person?",
    a: "Yes. You can create multiple profiles in the app — useful for tracking readings for a spouse, parent, or anyone else you manage care for. Each profile has its own log and export.",
  },
  {
    q: "Does the app replace my doctor?",
    a: "No. BPTrack gives you reference data and a log — not medical advice. The categories are based on AHA guidelines, but your doctor interprets your specific situation. The app helps you bring better data to that conversation.",
  },
  {
    q: "Can I export my data?",
    a: "Yes. The PDF export covers your last 30 days of readings in a clean, formatted report. Future updates will add CSV export for those who want raw data for spreadsheets or other health apps.",
  },
  {
    q: "Does BPTrack work offline?",
    a: "Yes. The reference library is built into the app — no internet connection needed. Logging also works offline. Your data stays on your device unless you choose to export it.",
  },
];

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">

        {/* Hero */}
        <section className="py-20 px-4" style={{ backgroundColor: '#FFF5F5' }}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full mb-6">
              AHA/CDC reference built in. Free.
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Know what your blood pressure number means.
              <br />
              <span className="text-red-700">Log it. Track it. Share it.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              BPTrack gives you 25+ American Heart Association and CDC reference tables built in — every category, threshold, and risk level, searchable in seconds. Log your daily readings, watch the 30-day trend, and bring a clean PDF report to your next doctor visit. Free on iPhone and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/library" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors press-feedback min-h-[48px]">
                Browse the Reference Library <ArrowRight size={18} />
              </Link>
              <Link href="/free-download" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors min-h-[48px]">
                <Download size={18} /> Free PDF Reference Sheet
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Free app. No credit card. 25+ AHA/CDC reference tables included.
            </p>
          </div>
        </section>

        {/* The database IS the app */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The reference library is built in.
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Most blood pressure log apps give you a blank screen and tell you to "track your readings." BPTrack starts with the data you need to understand what you're tracking. The AHA and CDC reference tables are searchable, organized by category, and available the moment you open the app — no setup, no accounts, no waiting.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-6 rounded-xl bg-gray-50 card-hover">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How BPTrack works</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Three things, done well. That's the whole app.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map(({ step, title, body }) => (
                <div key={step} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-700 font-bold text-lg mb-4">
                    {step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Database preview */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                AHA blood pressure categories
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                The five official AHA categories are in the app with clinical thresholds and risk guidance. Browse a preview below — search the full database in BPTrack.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DB_CATEGORIES.map(({ label, range, risk }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 p-5 card-hover">
                  <h3 className="font-bold text-gray-900 mb-1">{label}</h3>
                  <p className="text-sm font-medium text-red-600 mb-2">{range}</p>
                  <p className="text-xs text-gray-500">{risk}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-sm text-gray-400">
              25+ reference tables total — age-adjusted ranges, pulse pressure norms, orthostatic thresholds, and more in the app.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Free app. One-time unlock.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Download BPTrack free. The reference library is included at no cost. Unlock unlimited log entries, trend charts, and PDF export for a one-time $6.99 — no subscription, no renewal, no account required.
            </p>
            <div className="bg-white rounded-2xl p-8 border border-red-100 mb-8">
              <div className="text-4xl font-bold text-gray-900 mb-1">$6.99</div>
              <div className="text-sm text-gray-400 mb-6">One-time. Yours forever.</div>
              <ul className="text-left space-y-3 mb-6">
                {[
                  "Unlimited reading log entries",
                  "30-day trend chart",
                  "Doctor-ready PDF export",
                  "Multiple profiles (family tracking)",
                  "Works fully offline",
                  "All future updates included",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-red-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Download on App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Get it on Google Play
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center">
              Common questions
            </h2>
            <div className="space-y-6">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="border-b border-gray-100 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Start with the free PDF.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Download the printable AHA blood pressure reference sheet — all five categories with thresholds, on one page. Use it today. Get the app when you're ready to log and track.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/free-download" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors press-feedback min-h-[48px]">
                <Download size={18} /> Get the Free PDF
              </Link>
              <Link href="/library" className="inline-flex items-center justify-center gap-2 border border-red-200 text-red-700 font-medium px-8 py-3 rounded-xl hover:bg-red-50 transition-colors min-h-[48px]">
                Browse the Library
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

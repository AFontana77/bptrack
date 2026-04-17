import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Database, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BPTrack Library — 25+ reference tables",
  description: "AHA/CDC blood pressure categories, age-adjusted ranges, and risk guidance — built into every session. Browse the BPTrack reference database — available in the free app.",
};

const CATEGORIES = [
  { name: "Normal", detail: "Systolic under 120 and diastolic under 80. Maintain with healthy habits." },
  { name: "Elevated", detail: "Systolic 120-129 and diastolic under 80. Lifestyle changes recommended." },
  { name: "Stage 1 Hypertension", detail: "Systolic 130-139 or diastolic 80-89. Talk to your doctor." },
  { name: "Stage 2 Hypertension", detail: "Systolic 140+ or diastolic 90+. Medication likely needed." },
  { name: "Hypertensive Crisis", detail: "Systolic above 180 or diastolic above 120. Seek emergency care." },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              BPTrack Library
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
              25+ reference tables from American Heart Association + CDC. AHA/CDC blood pressure categories, age-adjusted ranges, and risk guidance — built into every session.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-red-700 bg-red-50 px-4 py-2 rounded-full">
              <Search size={14} /> Full search available in the free app
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className="bg-gray-50 rounded-xl p-6 card-hover border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{cat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App CTA */}
        <section className="py-16 px-4 bg-red-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Search the full database in the app.
            </h2>
            <p className="text-gray-600 mb-6">
              The BPTrack app has the complete 25+ reference tables with full-text search, filters, and your personal log — all free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Google Play
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">Free. No subscription. No credit card.</p>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

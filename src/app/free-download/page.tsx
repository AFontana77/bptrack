import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { Download, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Blood Pressure Log Sheet",
  description: "A printable daily log — morning and evening readings, pulse, notes, and a 30-day grid. Free printable from BPTrack — no signup required.",
};

export default function FreeDownloadPage() {
  return (
    <>
      <SiteNav />
      <main id="main-content" className="pt-20">
        <section className="py-20 px-4" style={{ backgroundColor: '#FFF5F5' }}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex w-16 h-16 bg-red-50 rounded-2xl items-center justify-center mb-6">
              <Download className="text-red-600" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free Blood Pressure Log Sheet
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              A printable daily log — morning and evening readings, pulse, notes, and a 30-day grid.
            </p>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-left mb-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">What is inside</h2>
              <ul className="space-y-3">
                            <li key="Morning and evening reading slots" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-red-600 mt-0.5 shrink-0" /> Morning and evening reading slots</li>
            <li key="Pulse / heart rate column" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-red-600 mt-0.5 shrink-0" /> Pulse / heart rate column</li>
            <li key="Notes for symptoms or medications" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-red-600 mt-0.5 shrink-0" /> Notes for symptoms or medications</li>
            <li key="30-day grid layout — one page per month" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-red-600 mt-0.5 shrink-0" /> 30-day grid layout — one page per month</li>
            <li key="US Letter format, printable at home" className="flex items-start gap-3 text-gray-600 text-sm"><CheckCircle size={16} className="text-red-600 mt-0.5 shrink-0" /> US Letter format, printable at home</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <h2 className="font-bold text-gray-900 text-xl mb-2">Get your free copy</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we will send it right to your inbox.</p>
              <EmailCaptureForm buttonLabel="Send Me the Free PDF" />
              <p className="text-xs text-gray-400 mt-4 text-center">No spam. Unsubscribe any time.</p>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want the searchable database?</h2>
            <p className="text-gray-500 mb-6">The free PDF covers the basics. The BPTrack app gives you the full searchable library and your personal log — free on iPhone and Android.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Get on App Store <ArrowRight size={18} />
              </a>
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center justify-center gap-2 bg-black text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-800 transition-colors min-h-[48px]">
                Get on Google Play <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

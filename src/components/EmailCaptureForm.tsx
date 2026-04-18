'use client';
import { ArrowRight } from 'lucide-react';

interface EmailCaptureFormProps {
  buttonLabel: string;
}

export function EmailCaptureForm({ buttonLabel }: EmailCaptureFormProps) {
  return (
    <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
      <input
        type="email"
        required
        placeholder="your@email.com"
        aria-label="Email address"
        className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 text-base min-h-[48px]"
      />
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-700 transition-colors press-feedback min-h-[48px]"
      >
        {buttonLabel} <ArrowRight size={18} />
      </button>
    </form>
  );
}

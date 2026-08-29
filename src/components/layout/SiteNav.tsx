'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLockup } from './BrandLockup';
import { APP_STORE } from '@/lib/product';

/**
 * Nav colours come from the site tokens now, not raw Tailwind reds. The old
 * header mixed `text-red-700` with the burgundy design system, so the brand
 * changed shade depending on which part of the page you looked at.
 */

const links = [
  { href: '/resources', label: 'Resources' },
  { href: '/validated-blood-pressure-monitors', label: 'Monitors' },
  { href: '/blood-pressure-average-calculator', label: 'Calculator' },
  { href: '/library', label: 'Learn' },
  { href: '/checklist', label: 'Free checklist' },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const ctaLabel = APP_STORE.released ? 'Get the app' : 'Get launch news';
  const ctaHref = APP_STORE.released ? APP_STORE.iosUrl : '/#get-the-app';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:text-white"
        style={{ background: 'var(--primary)' }}
      >
        Skip to main content
      </a>
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-md"
        style={{ background: 'rgba(254,251,251,0.9)', borderBottom: '1px solid var(--border)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" aria-label="BP Central home" className="shrink-0">
            <BrandLockup size={32} />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {l.label}
              </Link>
            ))}
            <Link href={ctaHref} className="btn-primary text-sm" style={{ minHeight: 44, padding: '0.6rem 1.15rem' }}>
              {ctaLabel}
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            style={{ color: 'var(--muted-foreground)' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden px-4 py-4 flex flex-col gap-1"
            style={{ borderTop: '1px solid var(--border)', background: 'var(--background)' }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base py-3"
                style={{ color: 'var(--foreground)' }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              className="btn-primary mt-2 text-center"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

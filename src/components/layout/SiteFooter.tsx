import Link from 'next/link';
import { BrandLockup } from './BrandLockup';
import { PRODUCT, MEDICAL_DISCLAIMER } from '@/lib/product';

/**
 * The footer previously linked only to Library, Free Download and About, so
 * Privacy, Terms and Support were reachable from nowhere on the site. Those are
 * the three pages an app store listing and a reviewer look for.
 */

const columns = [
  {
    heading: 'BP Central',
    links: [
      { href: '/', label: 'The app' },
      { href: '/library', label: 'Learn' },
      { href: '/blood-pressure-chart', label: 'Blood pressure chart' },
      { href: '/how-to-read-blood-pressure', label: 'How to read the numbers' },
    ],
  },
  {
    heading: 'Free resources',
    links: [
      { href: '/checklist', label: 'Home measurement checklist' },
      { href: '/log-sheet', label: 'Printable log sheet' },
      { href: '/free-blood-pressure-log-pdf', label: 'Printable log PDF' },
      { href: '/prehypertension', label: 'Elevated readings' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/support', label: 'Support' },
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      className="mt-auto"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLockup size={30} />
            <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              A blood pressure log for your phone. Made by {PRODUCT.publisher}.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-semibold uppercase tracking-[0.14em] mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                {col.heading}
              </p>
              {/* Links are given real height rather than relying on the gap,
                  so they are comfortable to hit on a phone. */}
              <ul className="flex flex-col">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm transition-opacity hover:opacity-70 inline-flex items-center min-h-[36px]"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs leading-relaxed max-w-3xl" style={{ color: 'var(--muted-foreground)' }}>
            {MEDICAL_DISCLAIMER}
          </p>
          <p className="text-xs mt-5" style={{ color: 'var(--muted-foreground)' }}>
            &copy; {new Date().getFullYear()} {PRODUCT.publisher}. {PRODUCT.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}

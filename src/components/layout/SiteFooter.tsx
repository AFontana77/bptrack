import Link from 'next/link';
import { BrandLockup } from './BrandLockup';
import { PRODUCT, MEDICAL_DISCLAIMER } from '@/lib/product';
import { AMAZON_DISCLOSURE } from '@/lib/monitors';

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
      { href: '/resources', label: 'All resources' },
      { href: '/tracking-starter-kit', label: 'Tracking starter kit' },
      { href: '/blood-pressure-chart', label: 'Blood pressure chart' },
      { href: '/how-to-read-blood-pressure', label: 'How to read the numbers' },
      { href: '/blood-pressure-apps', label: 'Blood pressure apps' },
    ],
  },
  {
    heading: 'Choosing a monitor',
    links: [
      { href: '/validated-blood-pressure-monitors', label: 'Validated monitors' },
      { href: '/blood-pressure-cuff-size', label: 'Cuff size chart' },
      { href: '/extra-large-blood-pressure-cuff', label: 'Extra large cuffs' },
      { href: '/checklist', label: 'Measurement checklist' },
      { href: '/library', label: 'Learn' },
    ],
  },
  {
    heading: 'Free printables',
    links: [
      { href: '/log-sheet', label: 'Printable log sheet' },
      { href: '/free-blood-pressure-log-pdf', label: 'Printable log PDF' },
      { href: '/aha-blood-pressure-log', label: 'AHA log format' },
      { href: '/blood-pressure-average-calculator', label: 'Average calculator' },
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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
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
          {/* Amazon requires this sentence clearly and prominently wherever
              Program Content appears. Site wide is the safest place for it. */}
          <p className="text-xs leading-relaxed max-w-3xl mt-4" style={{ color: 'var(--muted-foreground)' }}>
            {AMAZON_DISCLOSURE}
          </p>
          <p className="text-xs mt-5" style={{ color: 'var(--muted-foreground)' }}>
            &copy; {new Date().getFullYear()} {PRODUCT.publisher}. {PRODUCT.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}

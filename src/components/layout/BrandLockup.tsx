import Image from 'next/image';

/**
 * The BP Central lockup: the mark next to the name.
 *
 * The wordmark is LIVE TEXT, not an image, and that is deliberate. The 2026-08-29
 * brand package ships a wordmark and a lockup PNG, and both read "BPTrack" - the
 * app's old name. The product is "BP Central" (App Store listing: "BP Central:
 * Blood Pressure Log"), so neither PNG can go on this site without putting the
 * wrong product name in front of a reader. Rendering the name as text also keeps
 * it selectable, translatable and sharp at any size.
 *
 * The mark is /icons/icon-192.png, replaced 2026-08-29 with the package's symbol
 * (white heart, red ECG, rounded red tile). It arrives pre-rounded with
 * transparent corners, so no border radius is applied here.
 *
 * NOTE: the shipped app binary still carries the older anatomical-heart icon.
 * Site and store will show different marks until the app icon is updated, which
 * needs a new build. Flagged in the M1 report.
 */

interface Props {
  /** Mark size in px. The wordmark scales with it. */
  size?: number;
  /** `dark` is for placing the lockup on the burgundy panel. */
  tone?: 'default' | 'dark';
  showWordmark?: boolean;
  className?: string;
}

export function BrandLockup({
  size = 32,
  tone = 'default',
  showWordmark = true,
  className = '',
}: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/icons/icon-192.png"
        alt=""
        width={size}
        height={size}
        priority
        style={{ width: size, height: size, display: 'block' }}
      />
      {showWordmark ? (
        <span
          className="font-display font-bold tracking-tight"
          style={{
            fontSize: Math.round(size * 0.62),
            color: tone === 'dark' ? '#fff' : 'var(--primary)',
            lineHeight: 1,
          }}
        >
          BP Central
        </span>
      ) : null}
    </span>
  );
}

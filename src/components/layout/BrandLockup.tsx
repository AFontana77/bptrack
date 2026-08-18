import Image from 'next/image';

/**
 * The BP Central lockup: the app's own mark next to the wordmark.
 *
 * The mark is derived from bplog-app/assets/images/icon.png, the icon Anthony
 * approved on 2026-05-20, so someone who installs the app sees the same heart
 * they saw on the site. Nothing new was designed here.
 *
 * The source icon draws its heart as a transparent knockout, which renders
 * black on a dark background, so the web copies in /public were flattened over
 * white first. See the M0.3 handoff.
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
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.24),
          display: 'block',
        }}
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

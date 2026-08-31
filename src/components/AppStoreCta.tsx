'use client';
import { useState } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import {
  IOS,
  ANDROID,
  PLATFORMS,
  PRODUCT,
  anyReleased,
  isLive,
  releasedPlatforms,
  type PlatformState,
} from '@/lib/product';

/**
 * The download call to action.
 *
 * It renders per platform, because the two platforms are on different
 * timelines. iOS is in front of Apple; Android has no Play Console record at
 * all. Whichever goes public first should start converting its own visitors
 * immediately, without the site claiming anything about the other.
 *
 * So there are three shapes, not two:
 *
 *   nothing live      launch-news capture, and each platform's own "coming"
 *                     label, so the reader learns which store to expect
 *   one live          a real store button for that platform, and a plain
 *                     "coming to X" note for the other. NOT a second button.
 *   both live         two real store buttons
 *
 * The old version linked its buttons at apps.apple.com, the store's front
 * page, which is not a link to anything. Nothing here can regress to that: a
 * platform renders a link only when `isLive` says it has both a released flag
 * and a URL, and tools/link_audit.py fails the build in either direction.
 */

interface Props {
  variant?: 'primary' | 'ghost';
  source?: string;
  /** Where on the page this instance sits. Goes into the analytics event. */
  placement?: string;
}

/**
 * A real store link.
 *
 * It carries no onClick. `AffiliateClickTracker` already listens for clicks on
 * any anchor pointing at an App Store or Play host and emits `app_store_click`,
 * so an emit here would double-count every launch-day click — and the number
 * that matters most on launch day is the one you least want doubled.
 *
 * The data attributes are how this component contributes the parts the
 * delegated listener cannot infer from the URL: which placement on the page,
 * and which CTA treatment.
 */
function StoreButton({
  p,
  className,
  placement,
}: {
  p: PlatformState;
  className: string;
  placement: string;
}) {
  return (
    <a
      href={p.url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      data-store-platform={p.platform}
      data-placement={placement}
      data-cta-variant={className.includes('primary') ? 'primary' : 'ghost'}
    >
      {p.releasedLabel}
    </a>
  );
}

export function AppStoreCta({
  variant = 'primary',
  source = 'home-hero',
  placement = 'inline',
}: Props) {
  const [open, setOpen] = useState(false);
  const live = releasedPlatforms();
  const waiting = PLATFORMS.filter((p) => !isLive(p));

  if (live.length > 0) {
    return (
      <div>
        <div className="flex flex-col sm:flex-row gap-3">
          {live.map((p, i) => (
            <StoreButton
              key={p.platform}
              p={p}
              // The first live platform gets the emphasis. With only one store
              // public that is simply the one CTA; it does not imply the other
              // platform is a lesser choice.
              className={i === 0 && variant !== 'ghost' ? 'btn-primary' : 'btn-ghost'}
              placement={placement}
            />
          ))}
        </div>
        {waiting.length > 0 ? (
          <p className="text-sm mt-3" style={{ color: 'var(--muted-foreground)' }}>
            {waiting.map((p) => p.comingSoonLabel).join(' · ')}
          </p>
        ) : null}
      </div>
    );
  }

  // Nothing is public. Offer the only honest thing we have.
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={variant === 'ghost' ? 'btn-ghost' : 'btn-primary'}
          aria-expanded={open}
        >
          Tell me when it launches
        </button>
        <span
          className="inline-flex items-center text-sm px-1"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {IOS.comingSoonLabel}
        </span>
      </div>

      {open ? (
        <div
          className="mt-5 rounded-xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
            Leave your email and we will tell you the day {PRODUCT.name} lands on the App Store.
            You will get the home measurement checklist straight away.
          </p>
          <EmailCaptureForm source={source} campaign="launch-notify" buttonLabel="Keep me posted" />
        </div>
      ) : null}
    </div>
  );
}

/**
 * The line that sits under a download button.
 *
 * It exists because seven pages had hand-written versions of it and every one
 * of them was wrong. They said "Free." and "Free download." next to a CTA for
 * an app that is free for ten readings and then costs $6.99, and they promised
 * "iPhone and Android" for an app that is on neither store and whose Android
 * build was never started.
 *
 * That is exactly the drift src/lib/product.ts was created to stop, so this
 * reads from it instead of repeating it. A platform is named only once there
 * is a store listing to name it on.
 */
export function AppStoreCaption({ className = '' }: { className?: string }) {
  const live = releasedPlatforms();
  const names = live.map((p) => (p.platform === 'ios' ? 'iPhone' : 'Android'));
  const platforms =
    names.length === 0 ? '' : ` ${names.join(' and ')}.`;

  return (
    <p className={`text-sm mt-6 ${className}`} style={{ color: 'var(--muted-foreground)' }}>
      First {PRODUCT.freeReadings} readings free. Then {PRODUCT.price} {PRODUCT.priceNote}. No
      subscription.{platforms}
    </p>
  );
}

/**
 * The post-release one-liner used on resource pages, so each page can say
 * something that follows from what the reader was just doing rather than
 * repeating one generic sentence eight times.
 *
 * While nothing is public this renders the launch-notify path instead, because
 * "log your first 10 readings free in BP Central" is not an offer we can keep
 * when there is nothing to install.
 */
export function ContextualAppCta({
  copy,
  source,
  placement = 'contextual',
}: {
  copy: string;
  source: string;
  placement?: string;
}) {
  if (!anyReleased()) return <AppStoreCta variant="ghost" source={source} placement={placement} />;

  return (
    <div>
      <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
        {copy}
      </p>
      <AppStoreCta variant="primary" source={source} placement={placement} />
      <AppStoreCaption />
    </div>
  );
}

export { IOS, ANDROID };

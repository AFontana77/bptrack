'use client';
import { useState } from 'react';
import { EmailCaptureForm } from './EmailCaptureForm';
import { APP_STORE, PRODUCT } from '@/lib/product';

/**
 * The download call to action.
 *
 * BP Central is not on the App Store yet. The old site linked its download
 * buttons to https://apps.apple.com, the store's front page, which sends a
 * person nowhere useful and reads as a broken promise.
 *
 * So while `APP_STORE.released` is false this offers launch news instead, which
 * is honest and still worth something to both sides. Flip that one flag and
 * paste the real URLs in src/lib/product.ts and every button on the site turns
 * into a real store link. Nothing else needs editing.
 */

interface Props {
  variant?: 'primary' | 'ghost';
  source?: string;
}

export function AppStoreCta({ variant = 'primary', source = 'home-hero' }: Props) {
  const [open, setOpen] = useState(false);

  if (APP_STORE.released) {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={APP_STORE.iosUrl}
          className={variant === 'ghost' ? 'btn-ghost' : 'btn-primary'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {APP_STORE.releasedLabel}
        </a>
        {APP_STORE.androidUrl ? (
          <a href={APP_STORE.androidUrl} className="btn-ghost" target="_blank" rel="noopener noreferrer">
            Get it on Google Play
          </a>
        ) : null}
      </div>
    );
  }

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
          {APP_STORE.comingSoonLabel}
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
 * reads from it instead of repeating it. Platforms are only named once there
 * is a store listing to name them on.
 */
export function AppStoreCaption({ className = '' }: { className?: string }) {
  const platforms = APP_STORE.released
    ? APP_STORE.androidUrl
      ? ' iPhone and Android.'
      : ' iPhone.'
    : '';

  return (
    <p className={`text-sm mt-6 ${className}`} style={{ color: 'var(--muted-foreground)' }}>
      First {PRODUCT.freeReadings} readings free. Then {PRODUCT.price} {PRODUCT.priceNote}. No
      subscription.{platforms}
    </p>
  );
}

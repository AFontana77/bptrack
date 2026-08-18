'use client';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

/**
 * Signup for the home blood pressure checklist.
 *
 * This form used to call preventDefault and do nothing at all, so every address
 * anyone typed was thrown away behind a button that looked like it worked. It
 * now posts to /api/subscribe, which emails the checklist and adds the address
 * to the mailing list.
 *
 * It asks for an email address and nothing else. It never asks for a name, an
 * age, a reading, or anything about anyone's health.
 */

interface Props {
  /** Which page this form sits on. Stored so we know what earns signups. */
  source: string;
  buttonLabel?: string;
  campaign?: string;
  /** `light` sits on the pale surface, `dark` sits on the burgundy panel. */
  tone?: 'light' | 'dark';
}

type State = 'idle' | 'sending' | 'done' | 'error';

export function EmailCaptureForm({
  source,
  buttonLabel = 'Send me the checklist',
  campaign = 'home-bp-checklist',
  tone = 'light',
}: Props) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState('');
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  const dark = tone === 'dark';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;

    if (!consent) {
      setState('error');
      setMessage('Please tick the box so we know it is okay to email you.');
      return;
    }

    setState('sending');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent, source, campaign, _hp: hp }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState('error');
        setMessage(body.error || 'Something went wrong. Please try again.');
        return;
      }
      setState('done');
    } catch {
      setState('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <div
        className="flex items-start gap-3 rounded-xl px-4 py-4"
        style={{
          background: dark ? 'rgba(255,255,255,0.12)' : 'var(--surface)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.25)' : 'var(--border)'}`,
        }}
        role="status"
      >
        <Check size={18} className="mt-0.5 shrink-0" style={{ color: dark ? '#fff' : 'var(--primary)' }} />
        <div>
          <p className="font-semibold" style={{ color: dark ? '#fff' : 'var(--foreground)' }}>
            Check your inbox.
          </p>
          <p className="text-sm mt-1" style={{ color: dark ? 'rgba(255,255,255,0.85)' : 'var(--muted-foreground)' }}>
            The checklist is on its way. If you do not see it in a minute, look in your spam folder.
          </p>
        </div>
      </div>
    );
  }

  const labelColor = dark ? 'rgba(255,255,255,0.85)' : 'var(--muted-foreground)';

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {/* Honeypot. Hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          autoComplete="email"
          className="flex-1 px-4 rounded-lg text-base min-h-[48px]"
          style={{
            background: dark ? 'rgba(255,255,255,0.96)' : '#fff',
            border: `1px solid ${dark ? 'transparent' : 'var(--border)'}`,
            color: 'var(--foreground)',
          }}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="inline-flex items-center justify-center gap-2 font-semibold px-6 rounded-lg min-h-[48px] press-feedback disabled:opacity-60"
          style={{
            background: dark ? '#fff' : 'var(--primary)',
            color: dark ? 'var(--primary)' : '#fff',
          }}
        >
          {state === 'sending' ? 'Sending…' : buttonLabel}
          {state === 'sending' ? null : <ArrowRight size={18} />}
        </button>
      </div>

      <label className="flex items-start gap-2.5 text-sm cursor-pointer" style={{ color: labelColor }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-current"
        />
        <span>
          Send me the checklist and occasional BP Central tips and news. Unsubscribe any time.
        </span>
      </label>

      {state === 'error' && message ? (
        <p className="text-sm" role="alert" style={{ color: dark ? '#ffd9d9' : 'var(--primary)' }}>
          {message}
        </p>
      ) : null}

      <p className="text-xs" style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'var(--muted-foreground)' }}>
        We only ask for your email. We never ask for your readings, and your app data is never used
        for email.
      </p>
    </form>
  );
}

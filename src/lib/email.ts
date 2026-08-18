/**
 * Resend REST helper.
 *
 * Same pattern as anvilroad.com and the skills storefront: call the HTTP
 * endpoint directly so the site takes on no new npm dependency, and reuse the
 * Resend account the portfolio already runs on rather than adding a provider.
 *
 * The sending address must be on a domain verified in Resend.
 * `send.anvilroad.com` is verified today. If a bptrack.app sending domain is
 * verified later, only LEAD_FROM needs to change.
 */

export interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export function resendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

export async function sendEmail(args: SendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');

  const from = process.env.LEAD_FROM || 'BP Central <hello@send.anvilroad.com>';

  const body: Record<string, unknown> = {
    from,
    to: [args.to],
    subject: args.subject,
    html: args.html,
    text: args.text,
  };
  if (args.replyTo) body.reply_to = args.replyTo;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend send failed: ${res.status} ${detail}`);
  }
}

/**
 * Add the address to the Resend audience, which is the list itself: it owns
 * subscribe and unsubscribe state, so the unsubscribe link in every email
 * actually does something.
 *
 * Non-fatal by design. If the audience is not configured yet, the person still
 * gets the checklist they asked for and the signup is still recorded in the
 * notification email.
 */
export async function addToAudience(email: string): Promise<'added' | 'skipped' | 'failed'> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return 'skipped';

  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    return res.ok ? 'added' : 'failed';
  } catch {
    return 'failed';
  }
}

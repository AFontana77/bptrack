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
  /** Address the List-Unsubscribe header points at. Defaults to LEAD_NOTIFY_TO. */
  unsubscribeTo?: string;
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

  /*
   * List-Unsubscribe, so the person gets the native "Unsubscribe" control that
   * Gmail and Apple Mail render next to the sender name.
   *
   * Why this matters here: Resend manages unsubscribe state for BROADCASTS,
   * and these are transactional sends, so without this header the only way out
   * of the list is to read the footer and reply. That is a real path and a
   * human honours it, but it is not the one-tap control people expect and its
   * absence is the kind of thing that gets mail marked as spam rather than
   * unsubscribed from.
   *
   * mailto rather than a URL on purpose: a one-click HTTP unsubscribe endpoint
   * that anything can GET is a way to get people removed from a list they
   * wanted, and we do not have a signed-token endpoint to do it safely yet.
   * RFC 8058 one-click is the upgrade when that exists.
   */
  const unsubTo = args.unsubscribeTo || process.env.LEAD_NOTIFY_TO || 'anthony@anvilroad.com';
  body.headers = {
    'List-Unsubscribe': `<mailto:${unsubTo}?subject=unsubscribe>`,
  };

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

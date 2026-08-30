import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, addToAudience, resendConfigured } from '@/lib/email';
import {
  CHECKLIST,
  CHECKLIST_TITLE,
  CHECKLIST_INTRO,
  CHECKLIST_SOURCE,
  CHECKLIST_DISCLAIMER,
  checklistAsText,
} from '@/lib/checklist';
import { PRODUCT, SMBP_PROTOCOL } from '@/lib/product';
import { CUFF_SIZES } from '@/lib/monitors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Marketing signup for the website. Nothing here touches the app.
 *
 * THE SEPARATION RULE, which is the whole point of this file:
 *
 * BP Central stores blood pressure readings in Supabase under an anonymous
 * identity. This route never reads that database, never imports the Supabase
 * client, and never receives a reading, an average, a blood pressure category,
 * an app user id, or purchase status. The two systems share no storage and no
 * key that could join them. A person on this mailing list and a person using
 * the app are, as far as any system here can tell, unrelated.
 *
 * What is stored, and only this:
 *   email          the address they typed
 *   consent        that they ticked the box, and when
 *   source         which page the form was on
 *   campaign       which offer they responded to
 *
 * The address goes to the Resend audience, which owns subscribe and
 * unsubscribe state. The rest travels in the notification email, which is the
 * record of where a signup came from.
 */

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || 'anthony@anvilroad.com';
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

function checklistHtml(extras = ''): string {
  const sections = CHECKLIST.map(
    (section) => `
      <h3 style="font-size:15px;color:#1A0E0E;margin:26px 0 10px;text-transform:uppercase;letter-spacing:0.06em">${esc(section.heading)}</h3>
      <ul style="margin:0;padding-left:18px;color:#3d3333;font-size:15px;line-height:1.6">
        ${section.steps
          .map((s) => `<li style="margin-bottom:10px"><strong style="color:#1A0E0E">${esc(s.title)}.</strong> ${esc(s.body)}</li>`)
          .join('')}
      </ul>`,
  ).join('');

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F0EF;padding:28px 0;font-family:system-ui,-apple-system,'Segoe UI',sans-serif">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:14px;border:1px solid #e6dcdb;overflow:hidden">
        <tr><td style="padding:30px 32px 0">
          <div style="font-family:Georgia,serif;font-size:22px;color:#A20519;font-weight:bold">BP Central</div>
          <div style="height:3px;background:#A20519;width:44px;margin:16px 0 0"></div>
        </td></tr>
        <tr><td style="padding:22px 32px 0">
          <h1 style="font-family:Georgia,serif;font-size:25px;color:#1A0E0E;margin:0 0 12px;line-height:1.25">${esc(CHECKLIST_TITLE)}</h1>
          <p style="color:#665A5A;font-size:15px;line-height:1.6;margin:0">${esc(CHECKLIST_INTRO)}</p>
        </td></tr>
        <tr><td style="padding:0 32px">${sections}${extras}</td></tr>
        <tr><td style="padding:24px 32px 0">
          <p style="color:#665A5A;font-size:13px;line-height:1.6;margin:0 0 6px"><strong style="color:#1A0E0E">Source.</strong> ${esc(CHECKLIST_SOURCE.organization)}. ${esc(CHECKLIST_SOURCE.title)}. ${esc(CHECKLIST_SOURCE.citation)}.</p>
          <a href="${CHECKLIST_SOURCE.url}" style="color:#A20519;font-size:13px">Read the statement</a>
        </td></tr>
        <tr><td style="padding:20px 32px 0">
          <p style="color:#8a7c7c;font-size:12px;line-height:1.6;margin:0">${esc(CHECKLIST_DISCLAIMER)}</p>
        </td></tr>
        <tr><td style="padding:26px 32px 34px">
          <a href="${PRODUCT.siteUrl}/checklist" style="display:inline-block;background:#A20519;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 26px;border-radius:9px">Open the printable version</a>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#1A0E0E;color:#c9bcbc;font-size:12px;text-align:center">
          <div style="color:#ffffff;font-weight:600;margin-bottom:4px">BP Central</div>
          <div style="margin-bottom:8px">A blood pressure log from ${esc(PRODUCT.publisher)}.</div>
          <div>You asked for this checklist at ${esc(PRODUCT.domain)}. Reply to this email to unsubscribe at any time.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>`;
}

const KIT_TITLE = 'Your home blood pressure tracking starter kit';

/**
 * The starter kit email.
 *
 * /tracking-starter-kit promises "the kit", so this has to send a kit. Sending
 * the bare checklist under that promise is a small lie, and small lies about
 * what is inside an email are how a list stops being opened.
 *
 * It is the checklist plus the three things the kit page adds: what to record,
 * the cuff table, and how much to bring to an appointment. All of it is also
 * public on the site. Nothing safety-related is gated behind an address, and
 * nothing about the reader's health is asked for or stored.
 */
const WHAT_TO_RECORD: [string, string][] = [
  ['The top number', 'Systolic, the first and larger number.'],
  ['The bottom number', 'Diastolic, the second and smaller one.'],
  ['Your pulse', 'Whatever the monitor shows next to the two numbers.'],
  ['The date and time', 'Readings move through the day, so the time matters.'],
  ['Which arm', 'Use the same one every time so the readings compare.'],
  ['Anything unusual', 'A rushed morning, a missed dose, a bad night. One word is enough.'],
];

function kitExtrasText(): string {
  const rec = WHAT_TO_RECORD.map(([k, v]) => `  - ${k}: ${v}`).join('\n');
  const cuffs = CUFF_SIZES.map((c) => `  - ${c.label}: ${c.inches} (${c.cm})`).join('\n');
  return [
    '',
    'WHAT TO WRITE DOWN, EVERY TIME',
    rec,
    '',
    'CUFF SIZES',
    cuffs,
    '  Measure around the middle of your bare upper arm, halfway between shoulder and elbow.',
    '',
    'HOW MUCH TO BRING TO AN APPOINTMENT',
    `  ${SMBP_PROTOCOL.perSession} readings at least ${SMBP_PROTOCOL.minutesBetween} minute apart, morning and evening.`,
    `  ${SMBP_PROTOCOL.optimalDays} days is ${SMBP_PROTOCOL.optimalReadings} readings and the fuller picture.`,
    `  ${SMBP_PROTOCOL.minimumDays} days is ${SMBP_PROTOCOL.minimumReadings} readings and the minimum described.`,
    '  Average all of them. If your doctor asked for a different routine, do theirs.',
    '',
    `Work out the average: ${PRODUCT.siteUrl}/blood-pressure-average-calculator`,
    `Printable log:        ${PRODUCT.siteUrl}/log-sheet`,
    `The whole kit:        ${PRODUCT.siteUrl}/tracking-starter-kit`,
  ].join('\n');
}

function kitExtrasHtml(): string {
  const rec = WHAT_TO_RECORD.map(
    ([k, v]) => `<li style="margin-bottom:9px"><strong style="color:#1A0E0E">${esc(k)}.</strong> ${esc(v)}</li>`,
  ).join('');
  const cuffs = CUFF_SIZES.map(
    (c) => `<tr><td style="padding:5px 12px 5px 0;color:#1A0E0E">${esc(c.label)}</td><td style="padding:5px 0;color:#665A5A" align="right">${esc(c.inches)} &middot; ${esc(c.cm)}</td></tr>`,
  ).join('');
  return `
    <h3 style="font-size:15px;color:#1A0E0E;margin:30px 0 10px;text-transform:uppercase;letter-spacing:0.06em">What to write down, every time</h3>
    <ul style="margin:0;padding-left:18px;color:#3d3333;font-size:15px;line-height:1.6">${rec}</ul>
    <h3 style="font-size:15px;color:#1A0E0E;margin:30px 0 10px;text-transform:uppercase;letter-spacing:0.06em">Cuff sizes</h3>
    <table role="presentation" width="100%" style="font-size:14px;border-collapse:collapse">${cuffs}</table>
    <p style="color:#665A5A;font-size:13px;line-height:1.6;margin:10px 0 0">Measure around the middle of your bare upper arm, halfway between shoulder and elbow.</p>
    <h3 style="font-size:15px;color:#1A0E0E;margin:30px 0 10px;text-transform:uppercase;letter-spacing:0.06em">How much to bring to an appointment</h3>
    <p style="color:#3d3333;font-size:15px;line-height:1.6;margin:0">${SMBP_PROTOCOL.perSession} readings at least ${SMBP_PROTOCOL.minutesBetween} minute apart, morning and evening. ${SMBP_PROTOCOL.optimalDays} days is ${SMBP_PROTOCOL.optimalReadings} readings and the fuller picture; ${SMBP_PROTOCOL.minimumDays} days is ${SMBP_PROTOCOL.minimumReadings} and the minimum described. Average all of them. If your doctor asked for a different routine, do theirs.</p>
    <p style="margin:26px 0 0"><a href="${PRODUCT.siteUrl}/blood-pressure-average-calculator" style="color:#A20519;font-weight:bold;text-decoration:underline">Work out your average</a></p>`;
}

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  // Honeypot. Bots fill it, people never see it. Answer OK so it does not retry.
  if (typeof data._hp === 'string' && data._hp.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = String(data.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please check that email address.' }, { status: 400 });
  }
  if (data.consent !== true) {
    return NextResponse.json({ error: 'Please tick the box so we know it is okay to email you.' }, { status: 400 });
  }

  const source = String(data.source || 'unknown').slice(0, 120);
  const campaign = String(data.campaign || 'home-bp-checklist').slice(0, 80);
  const consentAt = new Date().toISOString();
  const wantsKit = campaign === 'starter-kit';

  // An unconfigured backend must say so rather than showing a success message
  // over a form that threw the address away. That is what the old form did.
  if (!resendConfigured()) {
    console.error('[subscribe] RESEND_API_KEY missing; signup not stored', { source, campaign });
    return NextResponse.json(
      { error: 'Email signup is not switched on yet. Please try again soon.' },
      { status: 503 },
    );
  }

  const audience = await addToAudience(email);

  try {
    await sendEmail({
      to: email,
      replyTo: NOTIFY_TO,
      subject: wantsKit ? KIT_TITLE : CHECKLIST_TITLE,
      text: wantsKit
        ? `${checklistAsText()}
${kitExtrasText()}

You asked for this at ${PRODUCT.domain}. Everything above is also on the site, free. Reply to this email to unsubscribe at any time.`
        : `${checklistAsText()}\n\nPrintable version: ${PRODUCT.siteUrl}/checklist\n\nYou asked for this checklist at ${PRODUCT.domain}. Reply to this email to unsubscribe at any time.`,
      html: wantsKit ? checklistHtml(kitExtrasHtml()) : checklistHtml(),
    });
  } catch (err) {
    console.error('[subscribe] checklist send failed:', err);
    return NextResponse.json(
      { error: 'Something went wrong sending the checklist. Please try again.' },
      { status: 502 },
    );
  }

  // Record of where the signup came from. Non-fatal: they already have it.
  try {
    await sendEmail({
      to: NOTIFY_TO,
      replyTo: email,
      subject: `BP Central signup: ${email}`,
      text: `email: ${email}\nconsent: yes\nconsent_at: ${consentAt}\nsource: ${source}\ncampaign: ${campaign}\naudience: ${audience}`,
      html: `<div style="font-family:system-ui,sans-serif;font-size:14px"><h2 style="font-size:16px">New BP Central signup</h2><table style="border-collapse:collapse"><tr><td style="padding:3px 12px 3px 0;color:#666">email</td><td>${esc(email)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">consent</td><td>yes</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">consent at</td><td>${esc(consentAt)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">source</td><td>${esc(source)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">campaign</td><td>${esc(campaign)}</td></tr><tr><td style="padding:3px 12px 3px 0;color:#666">audience</td><td>${esc(audience)}</td></tr></table></div>`,
    });
  } catch (err) {
    console.error('[subscribe] notification failed (non-fatal):', err);
  }

  return NextResponse.json({ ok: true });
}

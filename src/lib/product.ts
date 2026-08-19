/**
 * Product facts for BP Central, in one place.
 *
 * Why this file exists: before M0.3 the site described features the app does
 * not have. It sold a PDF export, Apple Health sync, accounts and cross-device
 * sync across seven pages. Every one of those claims was written by hand into
 * page copy, so nothing kept them honest as the app changed.
 *
 * Everything a page says about what BP Central does, what it costs, or where
 * to get it should come from here. Checked against app commit 94176f9.
 *
 * If the app gains a feature, add it here first.
 */

export const PRODUCT = {
  name: 'BP Central',
  publisher: 'Anvil Road LLC',
  domain: 'bptrack.app',
  siteUrl: 'https://bptrack.app',
  supportEmail: 'support@bptrack.app',

  freeReadings: 10,
  price: '$6.99',
  priceNote: 'once',
  subscription: false,
} as const;

/**
 * App Store state.
 *
 * BP Central is not on the App Store yet, so the site must not link to one.
 * The old site pointed its download buttons at apps.apple.com, the store's
 * front page, which is not a link to anything.
 *
 * When the listing goes live, set `released: true` and paste the real URLs.
 * Nothing else needs editing: every button on the site reads this object.
 */
export const APP_STORE = {
  released: false,
  iosUrl: '',
  androidUrl: '',
  /** Shown while `released` is false. */
  comingSoonLabel: 'Coming to the App Store',
  releasedLabel: 'Download on the App Store',
} as const;

/**
 * App screenshots.
 *
 * Empty on purpose. No real screenshots of the finished app exist yet, and a
 * marketing site for a health app must not show invented screens. Any section
 * that renders screenshots checks this array first and skips itself when the
 * array is empty, so the page looks finished rather than showing empty frames.
 *
 * To turn the section on: drop the files in /public/screenshots and list them
 * here. The capture list is in the M0.3 handoff.
 */
export const SCREENSHOTS: { src: string; alt: string; caption: string }[] = [];

/** What the app actually does. Each line is a feature you can open and use. */
export const FEATURES = [
  {
    label: 'Fast entry',
    desc: 'Type your top number, bottom number and pulse. Add your arm, your position and a note if you want to. Then save.',
  },
  {
    label: 'Your whole history',
    desc: 'Every reading you save stays in one list. Search it, filter it by date, and tap any reading to see everything you recorded with it.',
  },
  {
    label: 'Trends you can tap',
    desc: 'A chart of your readings over 7, 30 or 90 days, or all of them. Tap any point to see that exact reading, right down to the time of day.',
  },
  {
    label: 'Averages that update',
    desc: 'Your 7, 30 and 90 day averages, plus your average pulse. No maths on your part.',
  },
  {
    label: 'What the numbers mean',
    desc: 'Each reading is shown against the American Heart Association range chart. It tells you the range a reading falls in. It does not tell you that you have a condition.',
  },
  {
    label: 'A summary you can send',
    desc: 'Pick a date range and BP Central writes a plain summary of your readings and averages. Send it to yourself or take it to an appointment using your phone share button.',
  },
] as const;

/** The four lines the app sells behind the unlock. Must match the app paywall. */
export const UNLOCK_INCLUDES = [
  'Unlimited readings',
  'Complete history',
  '7, 30 and 90 day averages and trends',
  'Shareable BP summary',
] as const;

/**
 * Things people ask for that BP Central does not do. Listing them is a feature.
 * It keeps the site honest and it saves refund requests and one-star reviews.
 */
export const NOT_INCLUDED = [
  'BP Central does not measure your blood pressure. You need a monitor. You type in what it shows.',
  'There is no PDF or spreadsheet export. The summary goes out as plain text through your phone share button.',
  'It does not connect to Apple Health, and it does not pair with a cuff.',
  'There are no reminders and no notifications.',
] as const;

/**
 * The AHA range chart, kept in step with src/lib/bp.ts in the app so the site
 * and the app never show a person two different charts.
 *
 * Source: American Heart Association, "Understanding Blood Pressure Readings",
 * last reviewed 14 August 2025.
 */
export const BP_CATEGORIES = [
  { label: 'Normal', range: 'Under 120 / under 80', tone: 'normal' },
  { label: 'Elevated', range: '120 to 129 / under 80', tone: 'elevated' },
  { label: 'High, stage 1', range: '130 to 139 / 80 to 89', tone: 'stage1' },
  { label: 'High, stage 2', range: '140 or higher / 90 or higher', tone: 'stage2' },
  { label: 'Crisis range', range: 'Over 180 and/or over 120', tone: 'crisis' },
] as const;

export const AHA_SOURCE = {
  organization: 'American Heart Association',
  title: 'Understanding Blood Pressure Readings',
  url: 'https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings',
  reviewed: 'last reviewed 14 August 2025',
} as const;

export const AHA_AMA_HOME_SOURCE = {
  organization: 'American Heart Association and American Medical Association',
  title: 'Self-Measured Blood Pressure Monitoring at Home: A Joint Policy Statement',
  citation: 'Circulation. 2020;142(4):e42-e63',
  url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000803',
} as const;

/** One disclaimer, used everywhere, so the wording cannot drift. */
export const MEDICAL_DISCLAIMER =
  'BP Central keeps a record of readings you enter yourself. It does not measure your blood pressure and it is not medical advice. One reading at home does not diagnose anything. Only a doctor or other health professional can do that.';

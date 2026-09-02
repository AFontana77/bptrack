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
 * Store state, held PER PLATFORM.
 *
 * WHY THIS IS TWO OBJECTS AND NOT ONE FLAG
 * It used to be one `released` boolean plus an optional Android URL. That
 * models three of the four states a two-platform launch actually has, and
 * mis-models the fourth. With a single flag, an Android-first launch is
 * unrepresentable: turning `released` on to serve Play users would
 * simultaneously claim an App Store listing that does not exist.
 *
 * The four legitimate states are: neither, iOS only, Android only, both. Each
 * platform now carries its own `released` and its own `url`, so the site can
 * convert the visitors of whichever store went live first without making a
 * claim about the other one.
 *
 * THE RULE EVERY CONSUMER MUST FOLLOW
 * Never infer one platform's availability from the other's, and never render a
 * download control for a platform whose `released` is false. `tools/link_audit.py`
 * enforces both directions: a store URL for an unreleased platform fails the
 * build, and a released platform with no URL fails it too.
 */
/**
 * The shape of one platform's store state.
 *
 * This interface is not decoration. Without it the objects below are `as
 * const`, which makes `url` the LITERAL type `''` while the URL is empty — and
 * every `url !== ''` check in this file then compares two types that cannot
 * overlap, which TypeScript rejects outright.
 *
 * The consequence is that the build compiles perfectly today and breaks the
 * instant somebody pastes a real store URL in. That is the single worst moment
 * for a type error to appear: launch day, under time pressure, in the one edit
 * the whole release depends on.
 *
 * Found by simulating an iOS-only launch and running the build, which is the
 * only way it could have been found before it mattered.
 */
export interface PlatformStore {
  readonly platform: 'ios' | 'android';
  readonly storeName: string;
  /** Is the listing PUBLIC? Not "submitted", not "approved". Public. */
  readonly released: boolean;
  /** Empty until the listing exists. Never a placeholder, never a store front page. */
  readonly url: string;
  readonly appleId?: string;
  readonly bundleId?: string;
  readonly packageName?: string;
  readonly comingSoonLabel: string;
  readonly releasedLabel: string;
  readonly state: string;
}

export const IOS: PlatformStore = {
  platform: 'ios',
  storeName: 'App Store',
  released: true,
  url: 'https://apps.apple.com/us/app/bp-central-blood-pressure-log/id6770084204?uo=4',
  appleId: '6770084204',
  bundleId: 'com.anvilroad.bptrack',
  comingSoonLabel: 'Coming to the App Store',
  releasedLabel: 'Download on the App Store',
  /**
   * Where the iOS release actually stands, verified 2 September 2026.
   *
   * 1.0 build 1.0.0 (2) was submitted 23 August 2026 and came back the same day
   * under Guideline 2.1, Information Needed. Resubmitted 30 August 2026 as
   * submission 6e074296 with the evidence packet Apple asked for. Approved,
   * IAP bptrack_full_unlock approved, and released manually on 1 September
   * 2026 to 175 countries.
   *
   * PUBLIC as of 2 September 2026, and proved rather than taken on trust: the
   * iTunes lookup for Apple ID 6770084204 returns resultCount 1 with
   * sellerName "Anvil Road LLC", bundleId com.anvilroad.bptrack and
   * releaseDate 2026-09-02T07:00:00Z. The `url` above is that response's
   * trackViewUrl, copied verbatim. It was NOT built from a store search.
   *
   * Note for whoever touches the store link: an app called "BP Better" by CS
   * Studios INC. also surfaces on a "BP Central" search. It is not ours. Always
   * derive the URL from the Apple ID or the lookup response, never a search.
   */
  state: 'Released 1 Sep 2026, public on the App Store as of 2 Sep 2026 (iTunes lookup resultCount 1).',
};

export const ANDROID: PlatformStore = {
  platform: 'android',
  storeName: 'Google Play',
  released: false,
  url: '',
  packageName: 'com.anvilroad.bptrack',
  comingSoonLabel: 'Coming to Google Play',
  releasedLabel: 'Get it on Google Play',
  /**
   * Android is at zero, and this was proved rather than assumed.
   *
   * The Play Developer API answers "Package not found: com.anvilroad.bptrack"
   * for an edits().insert on the Anvil Road publishing service account. The
   * same account, in the same call, successfully opens an edit on
   * com.anvilroad.dronelog107 and lists its four tracks, so this is a genuinely
   * absent app record and not a permissions artefact.
   *
   * No Play Console entry means no AAB, no tracks, no store listing, no Data
   * Safety form, no content rating and no pricing. Checked 31 August 2026.
   */
  state: 'No Play Console app record exists. Nothing uploaded. Checked 31 Aug 2026.',
};

export const PLATFORMS: readonly PlatformStore[] = [IOS, ANDROID];
export type PlatformKey = PlatformStore['platform'];
export type PlatformState = PlatformStore;

/** Platforms a visitor can actually download from right now. */
export function releasedPlatforms(): PlatformState[] {
  return PLATFORMS.filter((p) => p.released && p.url !== '');
}

/** True when at least one store listing is public. */
export function anyReleased(): boolean {
  return releasedPlatforms().length > 0;
}

/**
 * A platform is only "live" when it is BOTH marked released AND carries a URL.
 * Treating `released` alone as live is how a flag flipped in a hurry turns into
 * an empty href, which renders as a button that goes nowhere.
 */
export function isLive(p: PlatformState): boolean {
  return p.released && p.url !== '';
}

export const APP_STORE = {
  ios: IOS,
  android: ANDROID,
  stateCheckedOn: '2 September 2026',
} as const;

/**
 * Sister property.
 *
 * BPMonitorLab is ours. It goes deep on the hardware: model by model reviews,
 * validation detail, error codes and cuff compatibility. This site owns the
 * other half, which is what you do with the numbers once you have them.
 *
 * We link to it where it genuinely answers the question better than we can,
 * and we say plainly that we own it. Hiding that would be the shady version of
 * a useful thing.
 */
export const SIBLING = {
  name: 'BP Monitor Lab',
  url: 'https://www.bpmonitorlab.com',
  owns: 'Monitor reviews, model by model, plus error codes and device detail.',
  relationship: 'Also published by Anvil Road LLC.',
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

/**
 * What the app actually does. Each line is a feature you can open and use.
 *
 * `icon` comes from the 2026-08-29 brand package (`09-web/icons`). Four of its
 * ten icons are deliberately NOT used anywhere on this site:
 *
 *   reminders (bell)   BP Central has no reminders and no notifications. See
 *                      NOT_INCLUDED below. A bell on this page would promise a
 *                      feature the app does not have.
 *   medications (pill) There is no medication tracking.
 *   weight (scale)     There is no weight tracking.
 *   settings (gear)    Real, but not a reason anyone downloads anything.
 *
 * An icon is a claim. The three rejected feature icons would each have shipped
 * a false one straight past every text-based check, because no sentence on the
 * page would have changed.
 */
export const FEATURES = [
  {
    label: 'Fast entry',
    icon: '/brand/icons/log-bp.png',
    desc: 'Type your top number, bottom number and pulse. Add your arm, your position and a note if you want to. Then save.',
  },
  {
    label: 'Your whole history',
    icon: '/brand/icons/history.png',
    desc: 'Every reading you save stays in one list. Search it, filter it by date, and tap any reading to see everything you recorded with it.',
  },
  {
    label: 'Trends you can tap',
    icon: '/brand/icons/trends.png',
    desc: 'A chart of your readings over 7, 30 or 90 days, or all of them. Tap any point to see that exact reading, right down to the time of day.',
  },
  {
    label: 'Averages that update',
    icon: '/brand/icons/dashboard.png',
    desc: 'Your 7, 30 and 90 day averages, plus your average pulse. No maths on your part.',
  },
  {
    label: 'What the numbers mean',
    icon: '/brand/icons/notes.png',
    desc: 'Each reading is shown against the American Heart Association range chart. It tells you the range a reading falls in. It does not tell you that you have a condition.',
  },
  {
    label: 'A summary you can send',
    icon: '/brand/icons/reports.png',
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
 * What happens to readings if the phone goes.
 *
 * The log-sheet page used to sell "Never lose your data" against paper. The app
 * cannot support that. Readings sit under an anonymous install identity, so
 * deleting the app or losing the phone can take the history with it. Paper at
 * least survives a dead battery.
 *
 * An honest line converts worse and refunds better.
 */
export const DATA_DURABILITY =
  'Readings are tied to your install, not to an account. If you delete the app or lose the phone, they may not come back.';

/**
 * Things people ask for that BP Central does not do. Listing them is a feature.
 * It keeps the site honest and it saves refund requests and one-star reviews.
 */
export const NOT_INCLUDED = [
  'BP Central does not measure your blood pressure. You need a monitor. You type in what it shows.',
  'There is no PDF or spreadsheet export. The summary goes out as plain text through your phone share button.',
  'It does not connect to Apple Health, and it does not pair with a cuff.',
  'There are no reminders and no notifications.',
  DATA_DURABILITY,
] as const;

/**
 * What to do about a reading over 180 or over 120.
 *
 * WHY THIS IS HERE AND NOT WRITTEN OUT ON EACH PAGE
 * It was written out on each page, and the pages drifted. Three of them told a
 * reader to call 911 on the number alone. The library page told them to wait a
 * minute, take it again, and only call 911 if symptoms came with it. Those are
 * different instructions for the same reading, on the same site.
 *
 * The second one matches the AHA. The first one sends people to an emergency
 * room for a number that a second reading often does not repeat, and it skips
 * the step that decides the answer: whether there are symptoms.
 *
 * So the guidance lives here once and every page renders it.
 *
 * Source: American Heart Association, "Hypertensive Crisis: When You Should
 * Call 911 for High Blood Pressure", and the same body's Understanding Blood
 * Pressure Readings page.
 */
export const CRISIS_GUIDANCE = {
  threshold: 'higher than 180 or higher than 120',
  waitMinutes: 1,
  retake: 'Wait one minute and take it again.',
  symptoms: [
    'chest pain',
    'shortness of breath',
    'back pain',
    'numbness or weakness',
    'a change in vision',
    'trouble speaking',
  ],
  withSymptoms: 'call 911',
  withoutSymptoms: 'contact your doctor right away',
  /** One sentence, for tables and tight spaces. */
  short:
    'Wait a minute and take it again. If it is still that high, call 911 if you also have symptoms, or contact your doctor right away if you do not.',
} as const;

/**
 * The AHA range chart, kept in step with src/lib/bp.ts in the app so the site
 * and the app never show a person two different charts.
 *
 * Source: American Heart Association, "Understanding Blood Pressure Readings",
 * last reviewed 14 August 2025.
 */
export const BP_CATEGORIES = [
  { label: 'Normal', range: 'Under 120 / under 80', tone: 'normal',
    sysMin: 0, sysMax: 119, diaMin: 0, diaMax: 79, join: 'and' },
  { label: 'Elevated', range: '120 to 129 / under 80', tone: 'elevated',
    sysMin: 120, sysMax: 129, diaMin: 0, diaMax: 79, join: 'and' },
  { label: 'High, stage 1', range: '130 to 139 / 80 to 89', tone: 'stage1',
    sysMin: 130, sysMax: 139, diaMin: 80, diaMax: 89, join: 'or' },
  { label: 'High, stage 2', range: '140 or higher / 90 or higher', tone: 'stage2',
    sysMin: 140, sysMax: 180, diaMin: 90, diaMax: 120, join: 'or' },
  { label: 'Crisis range', range: 'Over 180 and/or over 120', tone: 'crisis',
    sysMin: 181, sysMax: 220, diaMin: 121, diaMax: 140, join: 'or' },
] as const;

/**
 * Classify a reading against BP_CATEGORIES.
 *
 * ONE implementation, used by the calculator and by anything else that needs
 * it. Before this, the calculator carried its own copy of the thresholds as
 * hard-coded numbers while BP_CATEGORIES held only display strings, so the
 * site had two sources for one fact and nothing kept them in step.
 *
 * The `join` field is the whole point and it is not decoration. Normal and
 * Elevated require BOTH numbers to be in range. Stage 1, Stage 2 and Crisis
 * need only ONE. That asymmetry is what produces the answer people actually
 * search for: 140 over 70 is stage 2, because the systolic alone puts it
 * there. The higher category wins, and it wins because of the OR, not because
 * of a separate rule someone invented.
 *
 * Evaluated from the top of the scale down, so the highest matching category
 * is returned.
 */
export function classifyBp(sys: number, dia: number): (typeof BP_CATEGORIES)[number] {
  for (let i = BP_CATEGORIES.length - 1; i >= 0; i--) {
    const c = BP_CATEGORIES[i];
    if (c.join === 'or') {
      if (sys >= c.sysMin || dia >= c.diaMin) return c;
    } else {
      if (sys >= c.sysMin && sys <= c.sysMax && dia <= c.diaMax) return c;
    }
  }
  return BP_CATEGORIES[0];
}

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

/**
 * The self-measured blood pressure protocol, from the joint AHA/AMA statement
 * already cited above as AHA_AMA_HOME_SOURCE.
 *
 * These numbers drive the average calculator. They are the reason it can tell
 * someone "you have 9 readings, the minimum useful set is 12" instead of just
 * returning a mean of whatever it was handed.
 *
 * Two things this must NOT say, because the source does not:
 *   - It does not tell anyone to discard the first day. Some clinical protocols
 *     do. This one says to average all of them, so that is what we say.
 *   - It does not turn an average into a diagnosis. The statement is about how
 *     to measure, not about what the number means for one person.
 */
export const SMBP_PROTOCOL = {
  perSession: 2,
  minutesBetween: 1,
  sessionsPerDay: 2,
  readingsPerDay: 4,
  optimalDays: 7,
  optimalReadings: 28,
  minimumDays: 3,
  minimumReadings: 12,
  method:
    'Average every reading you took. The statement warns against the "eyeball method", which means scanning a list and forming an impression instead of working out the number.',
} as const;

/**
 * Apps that claim to read blood pressure off a phone.
 *
 * This is the single most useful true thing this site can tell someone
 * searching for a "blood pressure checker app", and it needs real sources
 * because it contradicts what several App Store listings imply.
 */
export const CUFFLESS_SOURCES = {
  aha: {
    organization: 'American Heart Association',
    title: 'Cuffless Devices for the Measurement of Blood Pressure: A Scientific Statement',
    citation: 'Hypertension, 2026',
    url: 'https://www.ahajournals.org/doi/10.1161/HYP.0000000000000254',
    finding:
      'Cuffless devices such as smartwatches, rings, patches and fingertip monitors are not yet proven accurate enough to diagnose high blood pressure or to guide treatment. The 2025 AHA/ACC High Blood Pressure Guideline recommends against using them for diagnosis or treatment.',
  },
  harvard: {
    organization: 'Harvard Health Publishing',
    title: 'Don’t trust this smartphone app to measure your blood pressure',
    url: 'https://www.health.harvard.edu/heart-health/dont-trust-this-smartphone-app-to-measure-your-blood-pressure',
    finding:
      'Reporting on a JAMA Internal Medicine study of the Instant Blood Pressure app, which found that more than three quarters of people with high blood pressure using it were falsely reassured their blood pressure was normal. Its advice is not to use any app that measures blood pressure with the phone itself.',
  },
} as const;

/**
 * What using the wrong cuff size actually costs, in mmHg.
 *
 * This is the single most useful number this site can give somebody with a
 * large arm, and it is far bigger than most people expect: a regular cuff on
 * an arm that needs an extra-large one overstates systolic by 19.5 mmHg. That
 * is the width of two whole AHA categories. Somebody genuinely in the normal
 * range can be told they have stage 2 hypertension by nothing but a cuff.
 *
 * Randomised crossover trial, so the same people were measured both ways. That
 * matters: it rules out the obvious confounder that people with bigger arms
 * might simply have higher blood pressure.
 *
 * Direction is not symmetric and the copy must not imply it is. A cuff that is
 * too small reads HIGH. A cuff that is too big reads LOW, and by much less.
 */
export const CUFF_SIZE_ERROR = {
  source: {
    authors: 'Ishigami J, Charleston J, Miller ER III, et al.',
    title: 'Effects of Cuff Size on the Accuracy of Blood Pressure Readings: The Cuff(SZ) Randomized Crossover Trial',
    journal: 'JAMA Internal Medicine',
    year: '2023',
    participants: 195,
    url: 'https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2807853',
  },
  /** Mean systolic difference when a REGULAR cuff was used instead of the right one. */
  findings: [
    { needed: 'Extra-large cuff', mmHg: '+19.5', ci: '16.1 to 22.9', direction: 'too high' },
    { needed: 'Large cuff', mmHg: '+4.8', ci: '3.0 to 6.6', direction: 'too high' },
    { needed: 'Small cuff', mmHg: '−3.6', ci: '−5.6 to −1.7', direction: 'too low' },
  ],
} as const;

/** One disclaimer, used everywhere, so the wording cannot drift. */
export const MEDICAL_DISCLAIMER =
  'BP Central keeps a record of readings you enter yourself. It does not measure your blood pressure and it is not medical advice. One reading at home does not diagnose anything. Only a doctor or other health professional can do that.';

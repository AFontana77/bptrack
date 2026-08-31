/**
 * The post-release app pitch, written once per page.
 *
 * WHY THIS IS A MAP AND NOT ONE SENTENCE REUSED
 * Every page here arrives at the app from a different place. Somebody who just
 * typed seven readings into a calculator has a different reason to install
 * than somebody who just measured their arm for a cuff. One shared sentence
 * has to be vague enough to fit both, and vague is the enemy of a CTA.
 *
 * It also has to follow from what the reader was actually doing. A line that
 * ignores the last thing on screen reads as an advert dropped into the page;
 * a line that continues it reads as the obvious next step.
 *
 * THE HARD RULE
 * None of this is shown while no store listing is public. `ContextualAppCta`
 * checks `anyReleased()` first and falls back to launch-news capture, because
 * "log your first 10 readings free in BP Central" is an offer we cannot keep
 * when there is nothing to install. These strings are written now so launch
 * day is a config change, not a copywriting exercise.
 *
 * WHAT THESE MUST NEVER SAY
 * No platform is named here. Which store is live is a runtime fact that
 * belongs to the CTA component, and a sentence promising "on iPhone and
 * Android" would be wrong for the entire period when only one has shipped.
 */
export const APP_CTA_COPY: Record<string, string> = {
  '/blood-pressure-average-calculator':
    'Tired of working this out by hand every time? BP Central keeps your 7, 30 and 90 day averages up to date as your history grows, so the number is already there when someone asks for it.',

  '/log-sheet':
    `Prefer your phone? Log your first 10 readings free in BP Central. The paper sheet still works, and plenty of people use both.`,

  '/free-blood-pressure-log-pdf':
    'Print it, or skip the printer. BP Central holds the same readings on your phone and works out the averages for you.',

  '/how-to-read-blood-pressure':
    'Now keep the readings somewhere useful. A reading you took properly and then lost is the same as one you never took.',

  '/prehypertension':
    'Categories move. Your numbers are the part worth keeping. BP Central holds them, averages them, and gives you something to take to an appointment.',

  '/blood-pressure-chart':
    'The chart tells you what a reading means. A run of readings tells you what is actually going on, and BP Central is where you keep them.',

  // The strongest one on the site. This page's whole argument is that phones
  // cannot measure blood pressure, so the honest pitch is the narrow one.
  '/blood-pressure-apps':
    'BP Central does not pretend your phone can measure blood pressure. It does the part a phone is genuinely good at: recording your cuff readings, averaging them, showing the trend, and handing you a summary.',

  '/validated-blood-pressure-monitors':
    'Once you have a monitor you trust, BP Central keeps what it tells you. Any monitor works, because you type the numbers in.',

  '/blood-pressure-cuff-size':
    'Once the cuff fits, the readings are worth keeping. BP Central organises them and works out your averages.',

  '/extra-large-blood-pressure-cuff':
    'With the right cuff on, your readings finally mean something. BP Central keeps them in one place and averages them for you.',

  '/tracking-starter-kit':
    'The kit gets you started. BP Central is where the readings go after that, with your averages and trends worked out as you add them.',

  '/aha-blood-pressure-log':
    'The routine is the hard part; the arithmetic does not have to be. BP Central follows the same routine and keeps the running averages for you.',

  '/library':
    'When you are ready to start recording, BP Central keeps your readings and works out the averages.',
};

/** Falls back to a plain, honest line rather than throwing on an unmapped page. */
export function appCtaCopy(path: string): string {
  return (
    APP_CTA_COPY[path] ??
    'BP Central keeps your blood pressure readings in one place and works out your averages.'
  );
}

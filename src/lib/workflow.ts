/**
 * The home blood pressure workflow.
 *
 * This is the spine of the site. Everything bptrack.app publishes is a step in
 * one sequence: get a monitor you can trust, take a reading you can trust,
 * write it down, and turn a pile of readings into something a doctor can use.
 *
 * It lives here rather than in the homepage because three places render it and
 * they must not drift: the homepage module, the resources hub, and the
 * next-step links at the foot of the step pages themselves. A reader who
 * arrives on step 5 from Google should be able to see what step 6 is.
 *
 * RULES
 *   - Every step points at a page that actually exists and actually answers it.
 *     A step with no real destination is worse than eight steps that all land.
 *   - `sibling` is set only where BPMonitorLab genuinely holds the better
 *     answer, which is hardware depth. It is not set on the logging steps,
 *     because those are this site's own job.
 *   - The wording is what a person would say out loud, not a heading style.
 */

export type WorkflowStep = {
  n: number;
  /** The step, as a person would say it. */
  title: string;
  /** What actually happens here, one plain sentence. */
  body: string;
  href: string;
  /** Link text for the destination. */
  cta: string;
  /** Path on bpmonitorlab.com, only where it genuinely goes deeper. */
  sibling?: { path: string; label: string };
};

export const WORKFLOW: WorkflowStep[] = [
  {
    n: 1,
    title: 'Choose a monitor',
    body: 'Upper arm, and a model whose exact number passed an independent accuracy test. The brand on the box is not the thing that was tested.',
    href: '/validated-blood-pressure-monitors',
    cta: 'See the four we checked',
    sibling: { path: '/best-blood-pressure-monitor-for-home', label: 'Deeper model reviews on BP Monitor Lab' },
  },
  {
    n: 2,
    title: 'Measure your arm',
    body: 'Around the middle of your bare upper arm. Cuff size changes your reading more than the choice of monitor does.',
    href: '/blood-pressure-cuff-size',
    cta: 'Cuff size chart',
    sibling: { path: '/bp-monitor-cuff-sizing-guide', label: 'Device-side cuff compatibility on BP Monitor Lab' },
  },
  {
    n: 3,
    title: 'Fit the cuff and sit properly',
    body: 'Bare skin, just above the elbow bend, snug. Back supported, feet flat, arm resting at about heart height.',
    href: '/checklist',
    cta: 'The measurement checklist',
  },
  {
    n: 4,
    title: 'Take a reading you can trust',
    body: 'Sit still for five minutes first. No coffee, no exercise, empty bladder, and do not talk while it runs.',
    href: '/how-to-read-blood-pressure',
    cta: 'How to take and read one',
  },
  {
    n: 5,
    title: 'Write it down',
    body: 'Both numbers, your pulse, the date and the time, and a word about anything unusual. On paper or on your phone.',
    href: '/log-sheet',
    cta: 'Printable log sheet',
  },
  {
    n: 6,
    title: 'Work out your average',
    body: 'One reading says very little. The average across a set of them is the number a doctor can actually use.',
    href: '/blood-pressure-average-calculator',
    cta: 'Average calculator',
  },
  {
    n: 7,
    title: 'Get ready for your appointment',
    body: 'Bring a record rather than a memory. The checklist, the log, what to record and how to summarise it, in one place.',
    href: '/tracking-starter-kit',
    cta: 'The tracking starter kit',
  },
  {
    n: 8,
    title: 'Keep going',
    body: 'The value is in the history, and the history only exists if you keep adding to it. Paper works. An app works. Doing nothing does not.',
    href: '/blood-pressure-apps',
    cta: 'Blood pressure apps, honestly',
    sibling: { path: '/bp-monitor-app-comparison', label: 'Brand companion apps compared on BP Monitor Lab' },
  },
];

/** Look up a step by its route, so a page can show "you are here". */
export function stepFor(path: string): WorkflowStep | undefined {
  return WORKFLOW.find((s) => s.href === path);
}

/** The step after this one, for the next-step link at the foot of a page. */
export function nextStep(path: string): WorkflowStep | undefined {
  const i = WORKFLOW.findIndex((s) => s.href === path);
  return i >= 0 ? WORKFLOW[i + 1] : undefined;
}

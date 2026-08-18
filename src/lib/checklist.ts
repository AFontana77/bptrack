/**
 * The Home Blood Pressure Checklist.
 *
 * Every step here is taken from one primary source: the American Heart
 * Association scientific statement on how blood pressure should be measured.
 * The numbers are the statement's own numbers. Nothing was rounded, softened,
 * or filled in from general knowledge.
 *
 *   Muntner P, Shimbo D, Carey RM, et al. "Measurement of Blood Pressure in
 *   Humans: A Scientific Statement From the American Heart Association."
 *   Hypertension. 2019;73(5):e35-e66. doi:10.1161/HYP.0000000000000087
 *
 * Scope rule for anything added here: this is about how to take a reading.
 * It is not about what a reading means, what to do about one, or medicine of
 * any kind. If a line cannot be traced to the source above, it does not ship.
 */

export interface ChecklistStep {
  title: string;
  body: string;
}

export interface ChecklistSection {
  heading: string;
  steps: ChecklistStep[];
}

export const CHECKLIST_TITLE = 'The Home Blood Pressure Checklist';

export const CHECKLIST_INTRO =
  'How you sit, what you did in the half hour before, and where the cuff sits all change the number you get. These are the steps the American Heart Association gives for taking a reading at home.';

export const CHECKLIST: ChecklistSection[] = [
  {
    heading: 'Before you measure',
    steps: [
      {
        title: 'Skip coffee, exercise and smoking for 30 minutes',
        body: 'The AHA asks you to avoid all three for at least 30 minutes before you measure.',
      },
      {
        title: 'Use the bathroom first',
        body: 'A full bladder can change your reading. Empty it before you start.',
      },
      {
        title: 'Sit still for 5 minutes',
        body: 'Sit quietly for at least 5 minutes before the first reading. Do not use the time to answer messages.',
      },
    ],
  },
  {
    heading: 'How to sit',
    steps: [
      {
        title: 'Put your back against the chair',
        body: 'Sit with your back supported. A dining chair works better than a sofa.',
      },
      {
        title: 'Both feet flat on the floor',
        body: 'Keep your feet flat and do not cross your legs.',
      },
      {
        title: 'Rest your arm on a table',
        body: 'The arm wearing the cuff should sit on a flat surface, like a table.',
      },
      {
        title: 'Stay quiet while it runs',
        body: 'Do not talk during the reading.',
      },
    ],
  },
  {
    heading: 'The cuff',
    steps: [
      {
        title: 'Put it on bare skin',
        body: 'Roll your sleeve up or take your arm out. Do not put the cuff over clothes.',
      },
      {
        title: 'Sit it just above your elbow bend',
        body: 'The cuff goes directly above the bend of your arm.',
      },
      {
        title: 'Pull it snug and even',
        body: 'It should be equally snug at the top edge and the bottom edge.',
      },
      {
        title: 'Check the size',
        body: 'Cuff size matters. The AHA says the inner bladder should be 75 to 100 percent as long as the distance around your arm, and 37 to 50 percent as wide. If your monitor came with one cuff and your arm is large or small, look at what other sizes the maker offers.',
      },
    ],
  },
  {
    heading: 'How many readings',
    steps: [
      {
        title: 'Two in the morning, two at night',
        body: 'Take 2 readings at least 1 minute apart in the morning, before any blood pressure medicine, and 2 more at least 1 minute apart in the evening.',
      },
      {
        title: 'Keep it up for 7 days',
        body: 'The AHA prefers 7 days or more, which comes to 28 readings or more. If you cannot manage that, 3 days, or 12 readings, may be enough.',
      },
      {
        title: 'Write every one down',
        body: 'Record each reading, not just the ones you like. The pattern is the useful part, and one number on its own does not say much.',
      },
    ],
  },
];

export const CHECKLIST_SOURCE = {
  organization: 'American Heart Association',
  title: 'Measurement of Blood Pressure in Humans: A Scientific Statement From the American Heart Association',
  citation: 'Hypertension. 2019;73(5):e35-e66',
  doi: '10.1161/HYP.0000000000000087',
  url: 'https://www.ahajournals.org/doi/10.1161/HYP.0000000000000087',
} as const;

export const CHECKLIST_DISCLAIMER =
  'This checklist is about how to take a reading. It is not medical advice. It does not tell you what your numbers mean and it does not tell you to change any treatment. Talk to your doctor about your readings and never change medicine on your own.';

/** Plain-text version, used in the email that delivers the checklist. */
export function checklistAsText(): string {
  const lines: string[] = [CHECKLIST_TITLE, '', CHECKLIST_INTRO, ''];
  for (const section of CHECKLIST) {
    lines.push(section.heading.toUpperCase());
    for (const step of section.steps) {
      lines.push(`- ${step.title}. ${step.body}`);
    }
    lines.push('');
  }
  lines.push(`Source: ${CHECKLIST_SOURCE.organization}. ${CHECKLIST_SOURCE.title}. ${CHECKLIST_SOURCE.citation}.`);
  lines.push(CHECKLIST_SOURCE.url);
  lines.push('');
  lines.push(CHECKLIST_DISCLAIMER);
  return lines.join('\n');
}

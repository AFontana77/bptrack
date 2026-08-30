import Link from 'next/link';

/**
 * The depth half of /blood-pressure-apps.
 *
 * Lives in its own file because the page it belongs to was already long, and a
 * 600-line route file is where sections go to be forgotten. Nothing here is
 * reusable, and it is not meant to be: this is one page's content, extracted
 * for the sake of the person who has to edit it next.
 *
 * Five things the flagship was missing, in the order a reader hits them:
 *
 *   1. Companion apps tie you to one brand of cuff. The practical consequence
 *      nobody mentions at the point of sale.
 *   2. Apple Health vs Health Connect. Widely got wrong, including on our own
 *      sister property.
 *   3. Privacy, as questions to ask rather than accusations to make.
 *   4. Two people sharing one monitor. No measurable search volume, real
 *      problem, and it goes wrong silently.
 *   5. Paper against an app, with paper allowed to win the rows it wins.
 *
 * Deliberately absent: any feature-by-feature comparison of Omron Connect,
 * Health Mate and HealthCoach. BPMonitorLab does that brand by brand, and
 * duplicating it would make both pages worse.
 */

const PRIVACY_QUESTIONS: [string, string][] = [
  [
    'Does it make you create an account?',
    'An account means the readings are tied to an identity somewhere. Some apps need one. Many do not.',
  ],
  [
    'Where do the readings actually live?',
    'On the phone, on a server, or both. "Cloud backup" is a server.',
  ],
  [
    'Can you get your data out?',
    'If there is no export, the history is hostage to the app staying installed and the company staying in business.',
  ],
  [
    'What happens when you delete the app?',
    'On the phone only means gone. On a server means you have to ask.',
  ],
  [
    'Is anything shared, and with whom?',
    'Read the privacy policy for the words "third party", "analytics" and "advertising". This is the question an app store label answers badly.',
  ],
];

const MULTI_USER: [string, string][] = [
  [
    'A monitor with separate user slots.',
    'Two banks, one button to switch. The catch is remembering to press it, every time, before the cuff inflates.',
  ],
  [
    'A guest or single-reading mode.',
    'Keeps the second person out of the first person’s memory, but does not give the second person a history of their own.',
  ],
  [
    'Log separately, on paper or in an app.',
    'The monitor stops being the record. Whoever measured writes it in their own log, and the shared hardware stops mattering.',
  ],
];

/** Paper is allowed to win the rows it wins. */
const PAPER_VS_APP: [string, string, string][] = [
  ['Cost', 'Free, forever', 'Free or paid'],
  ['Works with any monitor', 'Yes', 'Yes, if you type it in'],
  ['Needs charging or updates', 'No', 'Yes'],
  ['Survives a lost sheet', 'No', 'Yes'],
  ['Works out your averages', 'You do the maths', 'Automatic'],
  ['Months of history at a glance', 'A stack of paper', 'A chart'],
  ['A clinic can read it instantly', 'Yes, hand it over', 'Depends what you can show'],
  ['Nobody else can ever see it', 'Yes, if you keep it', 'Depends on the app'],
];

export function AppDepthSections() {
  return (
    <>
      {/* 1. Lock-in */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            A companion app ties you to one brand of cuff
          </h2>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            This is the part nobody mentions when you buy the monitor. Omron Connect works with
            Omron monitors. Withings Health Mate works with Withings. Beurer HealthCoach works with
            Beurer. They are not competing apps you choose between. Each one is the software half of
            a specific piece of hardware.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
            That matters in three ordinary situations. Your monitor breaks and you replace it with a
            different brand. A second person in the house gets their own monitor. Or you have three
            years of history in one app and the company changes the terms. In each case the readings
            and the app are joined at the hip, and moving is a manual export at best.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            <strong>Typing the numbers in yourself avoids all of it.</strong> It costs about eight
            seconds a reading. In exchange the log is yours, it works with whatever monitor you own
            now, and it keeps working with whatever you own next. That is the real trade: a little
            friction for no lock-in.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            We are not going to compare those three apps feature by feature here. Our sister
            property does it properly, brand by brand, and duplicating it would make both pages
            worse.
          </p>
        </div>
      </section>

      {/* 2. The two platform stores. Precise, because the difference is widely
             got wrong, including by people who should know better. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            What about Apple Health and Health Connect?
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            Both come with your phone and both can hold blood pressure. They are not the same kind
            of thing, and the difference decides whether you can use one on its own.
          </p>

          <div className="grid gap-5 sm:grid-cols-2 mb-6">
            <div className="rounded-xl px-6 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Apple Health, on iPhone
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                You can type readings in by hand: Health, then Browse, then Heart, then Blood
                Pressure, then Add Data. No monitor and no other app required. It holds the two
                numbers and the date.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                What it does not do is anything with them. No averaging across a week, and no
                summary to hand over.
              </p>
            </div>
            <div className="rounded-xl px-6 py-5" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Health Connect, on Android
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                This one is commonly misdescribed. Health Connect is a{' '}
                <strong>storage and permissions layer</strong>, not an app you open and type into.
                Google&rsquo;s own documentation describes it as something that &ldquo;stores and
                structures health and fitness data&rdquo; for other apps to read and write.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                It supports blood pressure as a data type, so an app can put readings there. You
                still need that app. Health Connect on its own is not somewhere you can keep a log.
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
            Source:{' '}
            <a
              href="https://developer.android.com/health-and-fitness/health-connect"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: 'var(--primary)' }}
            >
              Health Connect, Android Developers
            </a>
            .
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
            If a free place to put the numbers is all you want and you have an iPhone, Apple Health
            is a perfectly reasonable answer and we are not going to pretend otherwise.
          </p>
        </div>
      </section>

      {/* 3. Privacy as questions, not accusations. We have audited nobody. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Five privacy questions worth asking
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Your blood pressure history is health information about you. We are not going to make
            claims about what any particular app does with it, because we have not audited them.
            These are the questions to put to whichever one you pick, including ours.
          </p>
          <ol className="space-y-4 mb-6" style={{ color: 'var(--foreground)', listStyle: 'none', padding: 0 }}>
            {PRIVACY_QUESTIONS.map(([q, a], i) => (
              <li key={q} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="shrink-0 inline-flex items-center justify-center num"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: 'var(--brand-tint)',
                    border: '1px solid var(--brand-tint-border)',
                    color: 'var(--primary)',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </span>
                <span>
                  <strong className="block mb-1">{q}</strong>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {a}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            For what it is worth on this site: this page has no idea what your blood pressure is,
            and neither does our{' '}
            <Link href="/blood-pressure-average-calculator" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
              average calculator
            </Link>
            , which does its arithmetic in your browser and sends nothing anywhere.
          </p>
        </div>
      </section>

      {/* 4. Two people, one monitor. No measurable volume, real problem. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            Two people, one monitor
          </h2>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            Very common, and it goes wrong quietly. A monitor with one memory bank mixes two
            people&rsquo;s readings into one list, and the averages it shows afterwards belong to
            nobody. You often cannot tell by looking, because every number is plausible.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
            Three ways out, and they are not equally good.
          </p>
          <ul className="space-y-4 mb-6" style={{ color: 'var(--foreground)' }}>
            {MULTI_USER.map(([h, d]) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" style={{ color: 'var(--primary)' }}>
                  &middot;
                </span>
                <span>
                  <strong>{h}</strong> <span style={{ color: 'var(--muted-foreground)' }}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            The third is the one that keeps working. Whatever you choose, the important part is that{' '}
            <strong>each person&rsquo;s readings end up somewhere that is only theirs</strong>,
            because an average across two people is not a number about either of them. And if you
            are sharing a monitor, check the cuff fits <em>both</em> arms.
          </p>
          <Link href="/blood-pressure-cuff-size" className="btn-ghost">
            Check the cuff fits both of you
          </Link>
        </div>
      </section>

      {/* 5. Paper, given a fair hearing by the people selling the alternative. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            Paper against an app, honestly
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            We make an app, so read this knowing that. We also give the printable away free and have
            no intention of stopping, because for a lot of people it is the right answer.
          </p>
          <div className="rounded-xl overflow-x-auto mb-6" style={{ border: '1px solid var(--border)' }}>
            <table className="w-full text-sm" style={{ minWidth: 420 }}>
              <caption className="sr-only">A paper log compared with a tracking app</caption>
              <thead>
                <tr style={{ background: 'var(--background)' }}>
                  <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>
                    Paper
                  </th>
                  <th scope="col" className="text-left px-5 py-3" style={{ color: 'var(--foreground)' }}>
                    App
                  </th>
                </tr>
              </thead>
              <tbody>
                {PAPER_VS_APP.map(([k, a, b]) => (
                  <tr key={k} className="border-t" style={{ borderColor: 'var(--border)', background: 'var(--background)' }}>
                    <th scope="row" className="text-left px-5 py-3 font-medium" style={{ color: 'var(--foreground)' }}>
                      {k}
                    </th>
                    <td className="px-5 py-3" style={{ color: 'var(--muted-foreground)' }}>{a}</td>
                    <td className="px-5 py-3" style={{ color: 'var(--muted-foreground)' }}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            Paper loses on exactly two rows, and they are the two that start to matter after the
            first month: working out the averages, and still having in June the readings you took in
            February.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/free-blood-pressure-log-pdf" className="btn-ghost">
              Take the free printable
            </Link>
            <Link href="/blood-pressure-average-calculator" className="btn-ghost">
              Or do the averages here
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

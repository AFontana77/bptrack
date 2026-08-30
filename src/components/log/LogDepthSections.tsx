import Link from 'next/link';
import { SMBP_PROTOCOL, AHA_AMA_HOME_SOURCE } from '@/lib/product';

/**
 * The depth half of /log-sheet.
 *
 * Targets `blood pressure log`, ~9,900/mo, on a page that was 665 words.
 *
 * The SERP is almost entirely institutional recording sheets: heart.org "My
 * Blood Pressure Log", BHF "chart and diary", the AMA-MAP "7-Day Blood Pressure
 * Recording Log", MSKCC, Kaiser. Three of the four People Also Ask entries are
 * about a specific app called "Blood Pressure Log", so app intent bleeds into
 * this term and gets routed rather than answered here.
 *
 * DUPLICATION GUARD
 * /blood-pressure-apps already carries the full paper-versus-app comparison
 * table. This page must NOT repeat it. It gets two sentences and a link. Two
 * pages arguing the same case at the same length is how a site starts competing
 * with itself.
 *
 * PROTOCOL VALUES COME FROM SMBP_PROTOCOL
 * Not retyped. The same numbers appear on the calculator, the starter kit, the
 * printed PDF and here, and they must never drift apart.
 */

const WHAT_TO_RECORD: [string, string][] = [
  ['The date', 'Obvious until you are looking at an undated sheet in a waiting room.'],
  ['The time', 'Readings move through the day. A column of numbers with no times cannot show a morning pattern.'],
  ['The top number', 'Systolic, the larger one.'],
  ['The bottom number', 'Diastolic, the smaller one.'],
  ['Your pulse', 'Most monitors show it alongside. Write down whatever it displays.'],
  ['Which arm', 'Use the same one every time, and note which it was, so the readings compare with each other.'],
  ['Anything unusual', 'A missed dose, a bad night, a rushed morning, a coffee you forgot about. Usually one word, and often the word that explains an odd reading.'],
];

export function LogDepthSections() {
  return (
    <>
      {/* What to record. The core answer to "how do I create a blood pressure log". */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            What goes in a blood pressure log
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Seven things, and no more than seven. A log is a record of readings, not a health
            diary, and the temptation to add weight, mood, steps and diet is how a log becomes a
            chore you abandon in week three.
          </p>
          <dl className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
            {WHAT_TO_RECORD.map(([k, v]) => (
              <div key={k} className="px-5 py-4 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                <dt className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{k}</dt>
                <dd className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Nothing on that list is medical information about you beyond the reading itself. If a
            clinician has asked you to record something else as well, record that too — but do not
            invent extra fields because a template had them.
          </p>
        </div>
      </section>

      {/* How many, and how often. Canonical values only. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            How many readings, and when
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            Enough that one odd morning cannot move the answer. The joint statement from the
            American Heart Association and the American Medical Association describes the routine
            most home monitoring research is built on.
          </p>
          <div className="rounded-xl overflow-hidden mb-5" style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}>
            <dl className="text-sm">
              {[
                ['Readings per sitting', `${SMBP_PROTOCOL.perSession}, at least ${SMBP_PROTOCOL.minutesBetween} minute apart`],
                ['Sittings per day', `${SMBP_PROTOCOL.sessionsPerDay}, morning and evening`],
                ['Readings per day', `${SMBP_PROTOCOL.readingsPerDay}`],
                ['The fuller picture', `${SMBP_PROTOCOL.optimalDays} days, ${SMBP_PROTOCOL.optimalReadings} readings`],
                ['The minimum', `${SMBP_PROTOCOL.minimumDays} days, ${SMBP_PROTOCOL.minimumReadings} readings`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3 border-b last:border-b-0" style={{ borderColor: 'var(--border)' }}>
                  <dt style={{ color: 'var(--foreground)' }}>{k}</dt>
                  <dd className="num text-right" style={{ color: 'var(--muted-foreground)' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {AHA_AMA_HOME_SOURCE.organization},{' '}
            <a href={AHA_AMA_HOME_SOURCE.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
              {AHA_AMA_HOME_SOURCE.title}
            </a>
            , {AHA_AMA_HOME_SOURCE.citation}.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
            <strong>If your doctor gave you a different routine, use theirs.</strong> They asked for
            a reason, and a general protocol on a website does not know it.
          </p>
        </div>
      </section>

      {/* Organising it. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            How to organise it so it stays useful
          </h2>
          <ul className="space-y-4 mb-6" style={{ color: 'var(--foreground)' }}>
            {[
              ['Group by day, and split morning from evening.', 'A flat list of thirty readings hides the thing most worth seeing, which is whether your mornings and evenings differ.'],
              ['Keep it in one place.', 'Two half-logs, one on paper and one in an app, is worse than either on its own. Pick the one you will actually keep.'],
              ['Write the reading down when you take it.', 'Not later. The gap between the monitor beeping and finding a pen is where home logs die.'],
              ['Do not tidy it up.', 'Leaving out the readings that look bad turns a record into an argument. The high ones are the ones the average exists to put in context.'],
              ['Start a fresh sheet per week.', 'It makes the set you are averaging obvious, and it stops one page turning into an undated year.'],
            ].map(([h, d]) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                <span>
                  <strong>{h}</strong> <span style={{ color: 'var(--muted-foreground)' }}>{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Our printable is laid out this way already: seven days, four readings each, morning and
            evening split, with a box at the end for the two averages.
          </p>
        </div>
      </section>

      {/* Paper vs digital: two sentences and a link. The full case lives on the
          apps page and must not be re-argued here. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Paper or an app?
          </h2>
          <p className="leading-relaxed mb-4" style={{ color: 'var(--foreground)' }}>
            Paper is free, needs no charging, works with any monitor and a clinic can read it the
            second you hand it over. It loses on exactly two things, and both of them arrive after
            the first month: working out the averages, and still having in June the readings you
            took in February.
          </p>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            We make an app and we give the printable away free, so take that as read. We compared
            the two properly, row by row, on a separate page rather than repeating the argument
            here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/blood-pressure-apps" className="btn-ghost">
              Paper against an app, compared
            </Link>
          </div>
        </div>
      </section>

      {/* Sharing it. Routes rather than prescribes. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            Taking it to an appointment
          </h2>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            Bring the readings themselves and the two averages across them. A set of readings with
            one average is something a clinician can work from in a minute; a remembered number is
            not.
          </p>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            We are not going to tell you what format your practice wants, because they differ and
            some will have given you a sheet of their own already. If yours did, theirs wins.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/blood-pressure-average-calculator" className="btn-primary">
              Work out the two averages
            </Link>
            <Link href="/tracking-starter-kit" className="btn-ghost">
              The full appointment checklist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

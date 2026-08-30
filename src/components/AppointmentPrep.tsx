import Link from 'next/link';
import { SMBP_PROTOCOL, AHA_AMA_HOME_SOURCE } from '@/lib/product';

/**
 * Appointment preparation — the end of the workflow.
 *
 * Search demand for this is effectively zero (`blood pressure readings for
 * doctor`, `blood pressure summary for doctor`, `what to bring to doctor
 * appointment blood pressure` all measure 0), which is exactly why it is a
 * section inside the starter kit rather than a URL of its own. The reader job
 * is real; the search is not. Publishing a page for it would be keyword chaff.
 *
 * THE LINE THIS MUST NOT CROSS
 * It does not tell anyone what their doctor wants, because practices differ and
 * we have no way to know. Everything here is either (a) what the AHA/AMA joint
 * statement actually describes, or (b) plainly framed as a suggestion the
 * reader can take or leave. There is no script, no list of questions to demand,
 * and nothing that positions the reader against their clinician.
 */
export function AppointmentPrep() {
  return (
    <section style={{ background: 'var(--background)' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: 'var(--primary)' }}>
          Part five
        </p>
        <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
          Take it to the appointment
        </h2>
        <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
          A month of readings is worth very little in your head and quite a lot on a page. The
          job here is to arrive with something someone can read in under a minute.
        </p>

        <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
          What to bring
        </h3>
        <ul className="space-y-3 mb-6" style={{ color: 'var(--foreground)' }}>
          {[
            [
              'The readings themselves.',
              'The sheet, the app, a photo of the sheet. However you kept them, bring the actual numbers rather than a summary from memory.',
            ],
            [
              'Your two averages.',
              `Average systolic and average diastolic across the set. The AHA and AMA statement describes averaging every reading you took, over ${SMBP_PROTOCOL.optimalDays} days if you managed it.`,
            ],
            [
              'How many readings, and over how long.',
              'Twelve readings across three days and twelve across three months are different things, and the sheet does not say which unless you dated it.',
            ],
            [
              'Which monitor, and whether the cuff fits.',
              'The make and model, and your arm measurement if you know it. A reading taken on the wrong cuff size is wrong by more than most people expect.',
            ],
            [
              'Anything unusual you noted.',
              'A missed dose, a bad week, a rushed morning. The notes column is often the part that explains the odd reading.',
            ],
          ].map(([h, d]) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
              <span>
                <strong>{h}</strong> <span style={{ color: 'var(--muted-foreground)' }}>{d}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl px-6 py-5 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--foreground)' }}>
            <strong>We are not going to tell you what your doctor wants.</strong> Practices differ,
            and some will have given you a specific routine already. If yours did, theirs wins over
            anything on this page.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            The averaging routine above is from {AHA_AMA_HOME_SOURCE.organization},{' '}
            <a
              href={AHA_AMA_HOME_SOURCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
              style={{ color: 'var(--primary)' }}
            >
              {AHA_AMA_HOME_SOURCE.title}
            </a>
            , {AHA_AMA_HOME_SOURCE.citation}.
          </p>
        </div>

        <h3 className="font-display text-xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
          What not to do
        </h3>
        <ul className="space-y-3 mb-7" style={{ color: 'var(--muted-foreground)' }}>
          {[
            'Do not bring only your worst reading. One high number out of thirty is the thing an average exists to put in context, and leading with it skews the conversation.',
            'Do not leave out the readings you think look bad. A log you edited is not a log.',
            'Do not diagnose yourself on the way in. The category a number falls in is a lookup, not a verdict, and it is not the same as being told you have a condition.',
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span aria-hidden="true" style={{ color: 'var(--muted-foreground)' }}>&middot;</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <div
          className="rounded-xl px-6 py-5 mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            A one-page summary sheet
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
            Not the log. This is the cover note: how many readings, over what dates, your two
            averages, which monitor and cuff, and room for the questions you want to ask. Nobody
            wants twenty-eight rows handed across a desk.
          </p>
          <a href="/bp-central-appointment-summary.pdf" download className="btn-primary" data-placement="appointment-summary-pdf">
            Download the summary sheet
          </a>
          <p className="text-xs mt-3" style={{ color: 'var(--muted-foreground)' }}>
            PDF, one page, free, no email needed. It has no category table on it on purpose: a sheet
            that classified its own averages would be interpreting them.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/blood-pressure-average-calculator" className="btn-ghost">
            Work out the two averages
          </Link>
          <Link href="/free-blood-pressure-log-pdf" className="btn-ghost">
            The log sheet it comes from
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { CUFF_SIZE_ERROR, SMBP_PROTOCOL } from '@/lib/product';

/**
 * The depth half of /how-to-read-blood-pressure.
 *
 * BOUNDARY WITH /blood-pressure-chart
 * That page now owns the category table, what systolic and diastolic mean, and
 * the rule about a reading landing in two rows at once. This page must not
 * reprint any of it. Its job is the other half: the physical act of taking a
 * reading and deciding whether to believe it.
 *
 * So the sections here are about variance, repetition and technique - the
 * questions that start "why did I get a different number" rather than "what
 * does this number mean". Those are genuinely different reader jobs and they
 * were previously answered on neither page.
 */
export function ReadingDepthSections() {
  const xl = CUFF_SIZE_ERROR.findings.find((f) => f.needed.startsWith('Extra-large'))!;
  const lg = CUFF_SIZE_ERROR.findings.find((f) => f.needed.startsWith('Large'))!;

  return (
    <>
      {/* Why two readings minutes apart disagree. The most common worry. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            Why you got two different numbers five minutes apart
          </h2>
          <p className="text-lg leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            Because that is what blood pressure does. It is not a fixed property like your height.
            It is a moving quantity that responds to the last few minutes of your life, and a
            monitor that gave you an identical number twice would be the suspicious one.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
            It falls while you sleep and climbs before you wake. It rises when you stand up, when
            you talk, when you are cold, when your bladder is full, and for a while after coffee or
            a cigarette. None of that is a fault in the device and none of it is a symptom.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
            This is exactly why the guidance asks for {SMBP_PROTOCOL.perSession} readings at a
            sitting and {SMBP_PROTOCOL.optimalReadings} across a week, rather than one and a
            verdict. You are not trying to catch the true number. You are trying to see the middle
            of the cloud.
          </p>
        </div>
      </section>

      {/* When to repeat, and when not to. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            When to take another reading
          </h2>
          <ul className="space-y-4 mb-6" style={{ color: 'var(--foreground)' }}>
            {[
              ['Always, once, a minute after the first.', `Two readings a sitting is the routine, not a reaction to a number you dislike. Take both every time and write both down.`],
              ['If something obviously interfered.', 'You talked, the cuff slipped, your arm was hanging, a dog barked. Note it, wait, and take it again properly.'],
              ['If the cuff felt wrong on your arm.', 'Loose, twisted, over a sleeve, or so tight it hurt. That reading is not worth keeping.'],
            ].map(([h, d]) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden="true" style={{ color: 'var(--primary)' }}>&middot;</span>
                <span><strong>{h}</strong> <span style={{ color: 'var(--muted-foreground)' }}>{d}</span></span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg px-5 py-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              <strong>What not to do is measure repeatedly until you get a number you like.</strong>{' '}
              Taking six readings and recording the lowest does not give you a lower blood
              pressure. It gives you a log that is wrong in a direction you chose, and a clinician
              working from it is working from fiction.
            </p>
          </div>
        </div>
      </section>

      {/* Technique, quantified. */}
      <section style={{ background: 'var(--surface)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            How much technique actually changes the number
          </h2>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--foreground)' }}>
            More than most people assume, and the largest single factor is not posture. It is
            whether the cuff is the right size for your arm.
          </p>
          <div className="rounded-xl px-6 py-5 mb-5" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
            <p className="leading-relaxed mb-2" style={{ color: 'var(--foreground)' }}>
              In a randomised trial, using a regular cuff on people who needed an{' '}
              <strong>extra-large</strong> one overstated systolic by{' '}
              <strong className="num">{xl.mmHg} mmHg</strong>. For people who needed a{' '}
              <strong>large</strong> cuff it was <span className="num">{lg.mmHg} mmHg</span>.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {CUFF_SIZE_ERROR.source.authors}{' '}
              <a href={CUFF_SIZE_ERROR.source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2" style={{ color: 'var(--primary)' }}>
                {CUFF_SIZE_ERROR.source.title}
              </a>
              . {CUFF_SIZE_ERROR.source.journal}, {CUFF_SIZE_ERROR.source.year}.
            </p>
          </div>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            That is larger than the width of a whole category. Before you take any reading
            seriously, it is worth knowing the cuff fits — which takes a tape measure and one
            minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/blood-pressure-cuff-size" className="btn-ghost">Check your cuff size</Link>
            <Link href="/checklist" className="btn-ghost">The full setup checklist</Link>
          </div>
        </div>
      </section>

      {/* A single high reading. Routed, not interpreted. */}
      <section style={{ background: 'var(--background)' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-14">
          <h2 className="font-display text-3xl font-bold mb-5" style={{ color: 'var(--foreground)' }}>
            You got one high reading. Now what?
          </h2>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--foreground)' }}>
            First, do not diagnose yourself from it. One reading is one sample, and the categories
            are written about readings that are consistently in a range.
          </p>
          <p className="leading-relaxed mb-5" style={{ color: 'var(--muted-foreground)' }}>
            Sit quietly for five minutes and take it again, properly. If the second reading is much
            lower, the first one probably caught you mid-something. Write both down anyway — the
            log is a record of what happened, not a record of what you wanted to happen.
          </p>
          <div className="rounded-xl px-6 py-5 mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--primary)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              When it is not a wait-and-see
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--foreground)' }}>
              If a reading is very high and you also have chest pain, shortness of breath, back
              pain, numbness or weakness, a change in vision, or trouble speaking,{' '}
              <strong>call 911</strong>. That combination is not a measurement question and it is
              not something to re-check in five minutes.
            </p>
          </div>
          <p className="leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            Short of that, the useful response to a surprising number is not a single better
            reading. It is a set of them, taken properly, averaged, and taken to somebody who can
            examine you.
          </p>
        </div>
      </section>
    </>
  );
}

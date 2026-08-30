/**
 * BPTrack original illustrations.
 *
 * Drawn here as inline SVG, from scratch. Nothing in this file traces or
 * redraws an AHA diagram, an Omron manual figure or any manufacturer artwork.
 * They are geometric rather than anatomical on purpose: the site's whole voice
 * is calm and plain, and a shaded medical illustration would look like it came
 * from a pharmaceutical leaflet.
 *
 * Rules every graphic here follows:
 *
 *   - Colour comes from CSS variables, so they follow the palette and never
 *     hard-code a hex that drifts when the theme moves.
 *   - `role="img"` with a <title>, and `aria-hidden` where a caption beside the
 *     graphic already says the same thing. A screen reader should hear the
 *     point once, not twice.
 *   - A viewBox and no fixed width, so they scale down to a 320px phone.
 *   - No text baked into the artwork. Anything a reader needs to read is real
 *     HTML next to the SVG, so it is selectable, translatable and searchable.
 *     A label rendered inside an image is invisible to everything that matters.
 *   - Nothing here depicts a number, a reading or a result. An illustration
 *     that showed "128/82" would be inventing a person's data.
 */

const INK = 'var(--foreground)';
const MUTED = 'var(--muted-foreground)';
const LINE = 'var(--border)';
const BRAND = 'var(--primary)';
const SURFACE = 'var(--surface)';

/* ------------------------------------------------------------------ */
/* Arm measurement: where to put the tape, and why the midpoint.        */
/* ------------------------------------------------------------------ */
export function ArmMeasurement({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 190" className={className} role="img" aria-labelledby="armTitle" style={{ width: '100%', height: 'auto' }}>
      <title id="armTitle">
        Measure around the middle of the upper arm, halfway between the shoulder and the elbow
      </title>

      {/* shoulder, upper arm, elbow, forearm. One clean diagonal so the
          midpoint is easy to see. */}
      <circle cx="58" cy="56" r="25" fill={SURFACE} stroke={LINE} strokeWidth="2" />
      <path d="M58 56 L214 88" stroke={MUTED} strokeWidth="36" strokeLinecap="round" opacity="0.26" />
      <circle cx="214" cy="88" r="18" fill={SURFACE} stroke={LINE} strokeWidth="2" />
      <path d="M214 88 L276 146" stroke={MUTED} strokeWidth="27" strokeLinecap="round" opacity="0.16" />

      {/* The tape, drawn as a solid band across the arm rather than a ring in
          front of it. A thin outline ellipse read as a floating hoop. */}
      <g transform="rotate(11.6 136 72)">
        <rect x="126" y="48" width="20" height="48" rx="9" fill={BRAND} opacity="0.18" />
        <rect x="126" y="48" width="20" height="48" rx="9" fill="none" stroke={BRAND} strokeWidth="3.5" />
      </g>

      {/* the span, halved */}
      <line x1="58" y1="132" x2="214" y2="132" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="58" y1="126" x2="58" y2="138" stroke={MUTED} strokeWidth="2" />
      <line x1="214" y1="126" x2="214" y2="138" stroke={MUTED} strokeWidth="2" />
      <line x1="136" y1="120" x2="136" y2="144" stroke={BRAND} strokeWidth="3" />

      {/* equal halves, marked the way a drawing marks equal lengths */}
      <line x1="93" y1="126" x2="99" y2="138" stroke={MUTED} strokeWidth="1.6" />
      <line x1="173" y1="126" x2="179" y2="138" stroke={MUTED} strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Reading posture: the setup that changes the number.                  */
/* ------------------------------------------------------------------ */
export function ReadingPosture({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 240" className={className} role="img" aria-labelledby="postureTitle" style={{ width: '100%', height: 'auto' }}>
      <title id="postureTitle">
        Seated with the back supported, feet flat on the floor, and the cuffed arm resting on a
        table at about heart height
      </title>

      <line x1="18" y1="216" x2="322" y2="216" stroke={LINE} strokeWidth="2" />

      {/* Chair. The back stops below the head: an earlier draft ran it through
          the skull and read as a pole driven through the figure. */}
      <path d="M110 216 L110 104" fill="none" stroke={LINE} strokeWidth="2.5" />
      <path d="M110 162 L186 162" fill="none" stroke={LINE} strokeWidth="2.5" />
      <path d="M186 162 L186 216" fill="none" stroke={LINE} strokeWidth="2.5" />

      {/* Table, drawn before the arm so the forearm lands on top of it. */}
      <path d="M208 150 L322 150" stroke={LINE} strokeWidth="3" />
      <path d="M310 150 L310 216" stroke={LINE} strokeWidth="2.5" />

      <path d="M128 96 L131 162" stroke={MUTED} strokeWidth="19" strokeLinecap="round" />
      <circle cx="130" cy="72" r="17" fill={SURFACE} stroke={MUTED} strokeWidth="2.5" />

      <path d="M133 164 L198 168" stroke={MUTED} strokeWidth="16" strokeLinecap="round" />
      <path d="M198 168 L201 208" stroke={MUTED} strokeWidth="14" strokeLinecap="round" />
      <path d="M192 212 L222 212" stroke={MUTED} strokeWidth="7" strokeLinecap="round" />

      {/* The arm hangs OUTSIDE the torso silhouette. Two earlier drafts started
          it inside the body, which hid the upper arm entirely and left a
          forearm apparently growing out of the chest. The shoulder and elbow
          are drawn as joints so the two segments read as separate limbs. */}
      <path d="M142 104 L178 142" stroke={MUTED} strokeWidth="13" strokeLinecap="round" />
      <circle cx="142" cy="104" r="8" fill={MUTED} />
      <circle cx="178" cy="142" r="7" fill={MUTED} />
      <path d="M178 142 L264 142" stroke={MUTED} strokeWidth="12" strokeLinecap="round" />

      {/* Cuff, square to the upper arm it sits on. */}
      <g transform="rotate(46 160 123)">
        <rect x="149" y="109" width="22" height="28" rx="6" fill={BRAND} opacity="0.2" />
        <rect x="149" y="109" width="22" height="28" rx="6" fill="none" stroke={BRAND} strokeWidth="3" />
      </g>

      <rect x="268" y="126" width="38" height="24" rx="4" fill={SURFACE} stroke={MUTED} strokeWidth="2" />
      <line x1="275" y1="135" x2="297" y2="135" stroke={MUTED} strokeWidth="2.5" />
      <line x1="275" y1="142" x2="289" y2="142" stroke={MUTED} strokeWidth="2.5" />

      {/* Heart height. The line stops at the elbow rather than running the full
          length of the forearm, where it looked like a stripe painted on the
          limb instead of a level. */}
      <line x1="131" y1="142" x2="172" y2="142" stroke={BRAND} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
      <circle cx="131" cy="142" r="4.5" fill={BRAND} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Reading history: why one reading tells you almost nothing.           */
/* ------------------------------------------------------------------ */
export function ReadingHistory({ className = '' }: { className?: string }) {
  // Deliberately not real readings. A scatter with a flat-ish trend, so the
  // point ("one dot is noise, the line is the signal") is visible without the
  // graphic pretending to be anyone's data.
  const pts = [
    [18, 62], [42, 40], [66, 74], [90, 52], [114, 86], [138, 58],
    [162, 44], [186, 78], [210, 56], [234, 68], [258, 46], [282, 60],
  ];
  return (
    <svg viewBox="0 0 300 120" className={className} role="img" aria-labelledby="historyTitle" style={{ width: '100%', height: 'auto' }}>
      <title id="historyTitle">
        A single reading sits anywhere in a wide scatter, while many readings settle into a trend
      </title>

      {/* axes */}
      <line x1="10" y1="104" x2="292" y2="104" stroke={LINE} strokeWidth="1.5" />
      <line x1="10" y1="14" x2="10" y2="104" stroke={LINE} strokeWidth="1.5" />

      {/* the band the readings live in */}
      <rect x="10" y="36" width="282" height="54" fill={BRAND} opacity="0.05" />

      {/* the trend through them */}
      <path d="M18 66 C 90 56, 180 60, 282 58" fill="none" stroke={BRAND} strokeWidth="3" strokeLinecap="round" />

      {/* individual readings */}
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" fill={MUTED} opacity="0.55" />
      ))}

      {/* one highlighted dot: the single reading someone panics about */}
      <circle cx="114" cy="86" r="5.5" fill="none" stroke={INK} strokeWidth="2.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small numbered step marker, shared by the workflow module.           */
/* ------------------------------------------------------------------ */
export function StepMark({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center shrink-0 num tabular-nums"
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        background: 'var(--brand-tint)',
        border: '1px solid var(--brand-tint-border)',
        color: 'var(--primary)',
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {n}
    </span>
  );
}

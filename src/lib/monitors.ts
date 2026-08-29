/**
 * Blood pressure monitors we recommend, and the evidence behind each one.
 *
 * Every fact in this file was read off a primary source by hand and checked
 * twice. Nothing here came from an Amazon listing, a press release or a
 * round-up article.
 *
 * Two separate checks have to pass before a monitor can appear on the site:
 *
 *   1. The exact model number is in the AMA Validated Device Listing (VDL) at
 *      validatebp.org, filtered to Device Type = Home. Not the brand. Not the
 *      product family. The exact model number.
 *   2. The Amazon listing we link to reports that same model number in its own
 *      "Item model number" field.
 *
 * If either check fails the product does not go on the site. See REJECTED
 * below for the ones that failed and why, because that list is the reason to
 * trust the one above it.
 *
 * Checked 19 August 2026.
 *
 * WHAT WE MUST NEVER PUT IN THIS FILE
 * Prices, star ratings and review counts. The Amazon Associates Operating
 * Agreement only allows those when they are served through the Product
 * Advertising API or the Creators API, and we use neither. Cuff sizes and
 * model numbers are manufacturer specifications, not Amazon content, so they
 * are safe to state.
 */

/** The tracking ID for this site. One site, one tracking ID. */
export const AMAZON_TAG = 'bpcentral-20';

/**
 * Builds an Amazon Special Link.
 *
 * It has to point straight at amazon.com. No shortener, no /go/ page, no
 * redirect of our own. The Operating Agreement forbids cloaking a Special Link
 * behind a Redirecting Link, and a purchase that arrives through one earns no
 * commission anyway.
 */
export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}&linkCode=ll1&language=en_US&ref_=as_li_ss_tl`;
}

export type Monitor = {
  id: string;
  /** Brand and model exactly as the manufacturer writes them. */
  brand: string;
  model: string;
  name: string;
  asin: string;
  /** The one job this monitor is the best answer to. */
  bestFor: string;
  /** Plain sentence a reader can act on. */
  summary: string;
  /** Cuff sizes, in inches and cm, from the VDL entry. */
  cuffs: string[];
  /** The standard it was tested against, named on its VDL entry. */
  protocol: string;
  /** VDL "Cuff Type" facet. */
  cuffTypes: string;
  /** VDL "Connectivity" facet. */
  connectivity: string;
  /** VDL "Population Served" facet. */
  populations: string;
  /** Deep link to the device's own VDL page, so a reader can check us. */
  vdlUrl: string;
  /** Honest limitation. Every monitor gets one. */
  tradeoff: string;
};

/**
 * The recommendations. Four, not ten.
 *
 * They are deliberately four different answers to four different situations
 * rather than four versions of the same answer. A longer list would mean
 * padding it with models we could not verify to the same standard.
 */
export const MONITORS: Monitor[] = [
  {
    id: 'ad-ua-651',
    brand: 'A&D Medical',
    model: 'UA-651',
    name: 'A&D Medical UA-651 Essential',
    asin: 'B00IWRRS6C',
    bestFor: 'Most people',
    summary:
      'One button on the front. Press it, wait, read the number. There is no app to set up and no account to make. It was tested against the newest version of the accuracy standard.',
    cuffs: [
      'Comes with the wide range cuff, 8.6 to 16.5 in (22 to 42 cm)',
      'Small cuff sold separately, 6.3 to 9.4 in (16 to 24 cm)',
      'Medium cuff sold separately, 9.0 to 14.6 in (23 to 37 cm)',
      'Large cuff sold separately, 12.2 to 17.7 in (31 to 45 cm)',
    ],
    protocol: 'ANSI/AAMI/ISO 81060-2:2018',
    cuffTypes: 'Adult, Large, Small Adult',
    connectivity: 'No connectivity',
    populations: 'General adult',
    vdlUrl: 'https://www.validatebp.org/device/essential-blood-pressure-monitor-2',
    tradeoff:
      'It does not send readings to your phone. You read the screen and type the numbers in yourself.',
  },
  {
    id: 'omron-bp5255',
    brand: 'Omron',
    model: 'BP5255',
    name: 'Omron Silver',
    asin: 'B0DDZP9R7T',
    bestFor: 'A familiar brand, and pregnancy',
    summary:
      'Omron is the name most people already know, and this is the model to look for. It is one of the few on our list whose VDL entry also covers pregnancy.',
    cuffs: ['Comes with the wide range cuff, 8.6 to 16.5 in (22 to 42 cm)'],
    protocol: 'ANSI/AAMI/ISO 81060-2:2009',
    cuffTypes: 'Adult, Large, Small Adult',
    connectivity: 'Bluetooth, smartphone app',
    populations: 'General adult, pregnant',
    vdlUrl: 'https://www.validatebp.org/device/silver-upper-arm-blood-pressure-monitor',
    tradeoff:
      'Its listing on the VDL names an older version of the accuracy standard than the A&D models here. It passed a real test. It was just an earlier edition of the test.',
  },
  {
    id: 'ad-ua-651sac',
    brand: 'A&D Medical',
    model: 'UA-651SAC',
    name: 'A&D Medical UA-651SAC Small Cuff',
    asin: 'B0DCY5FXWQ',
    bestFor: 'Smaller arms',
    summary:
      'This one ships with the small cuff already in the box. If your arm measures under about 9.4 in (24 cm), a standard cuff will read high on you, and this solves that on day one.',
    cuffs: ['Comes with the small cuff, 6.3 to 9.4 in (16 to 24 cm)'],
    protocol: 'ANSI/AAMI/ISO 81060-2:2018',
    cuffTypes: 'Small Adult',
    connectivity: 'No connectivity',
    populations: 'General adult',
    vdlUrl: 'https://www.validatebp.org/device/one-touch-small-cuff-blood-pressure-monitor',
    tradeoff:
      'Only useful if your arm is genuinely small. Measure first. On a normal size arm this cuff will be too tight and will read high.',
  },
  {
    id: 'ad-ua-767f',
    brand: 'A&D Medical',
    model: 'UA-767F',
    name: 'A&D Medical UA-767F Multi User',
    asin: 'B00ZTTAV5Q',
    bestFor: 'More than one person at home',
    summary:
      'Keeps separate memory for up to four people, so two people sharing one monitor do not end up with their readings mixed together.',
    cuffs: [
      'Comes with the wide range cuff, 8.6 to 16.5 in (22 to 42 cm)',
      'Small cuff sold separately, 6.3 to 9.4 in (16 to 24 cm)',
      'Medium cuff sold separately, 9.0 to 14.6 in (23 to 37 cm)',
      'Large cuff sold separately, 12.2 to 17.7 in (31 to 45 cm)',
    ],
    protocol: 'ANSI/AAMI/ISO 81060-2:2018',
    cuffTypes: 'Adult, Large, Small Adult',
    connectivity: 'No connectivity',
    populations: 'General adult',
    vdlUrl: 'https://www.validatebp.org/device/premium-multi-userblood-pressure-monitor',
    tradeoff:
      'More buttons than the UA-651 because it has to know who is measuring. If only one person is going to use it, the extra steps buy you nothing.',
  },
];

/**
 * Products we looked at and did not recommend.
 *
 * This is published on the site on purpose. A recommendation list means very
 * little on its own. What it rules out is the part that shows the rule was
 * real.
 */
export const REJECTED = [
  {
    what: 'Greater Goods blood pressure monitors',
    why:
      'Greater Goods has models on the VDL. The trouble is the Amazon listings do not report those model numbers. The listings we checked reported "BD3439" and, on another, the word "BatteriesIncluded" in the model number field. Neither is a validated model number, so there was no way to prove the box that arrives is the box that was tested.',
  },
  {
    what: 'Wrist monitors',
    why:
      'The VDL validates some wrist devices, and they have their place. But its own guidance is that clinical guidelines call for an upper arm device for home monitoring, with wrist devices kept for specific situations. Everything we recommend is upper arm.',
  },
  {
    what: 'Monitors sold only under a store brand',
    why:
      'Some validated models are made for one retailer. If it is not sold as the validated model number, we cannot check the match, so it is not here.',
  },
  {
    what: 'Anything we could only find at an unclear model number',
    why:
      'Several listings show a product family name and no model number at all. Blood pressure monitor families often contain both a validated model and an unvalidated one. Without the number there is nothing to check.',
  },
] as const;

/** Where the validation claims come from. Named on the page, not buried. */
export const VDL_SOURCE = {
  name: 'Validated Device Listing (VDL)',
  operator: 'US Blood Pressure Validated Device Listing',
  supportedBy: 'A public health service supported by the American Medical Association',
  url: 'https://www.validatebp.org/',
  checked: '19 August 2026',
  independence:
    'The AMA receives no funding from device manufacturers or third parties for developing the VDL Criteria or process.',
  note: 'This list is intended for use as a reference. Devices listed cannot be purchased on this website.',
} as const;

/**
 * The exact sentence Amazon requires, from the Operating Agreement, section 5.
 * Do not reword it.
 */
export const AMAZON_DISCLOSURE = 'As an Amazon Associate I earn from qualifying purchases.';

/** Cuff sizes, as the AMA listing states them. Used by the cuff size guide. */
export const CUFF_SIZES = [
  { label: 'Small adult', cm: '16 to 24 cm', inches: '6.3 to 9.4 in' },
  { label: 'Adult', cm: '23 to 37 cm', inches: '9.0 to 14.6 in' },
  { label: 'Wide range', cm: '22 to 42 cm', inches: '8.6 to 16.5 in' },
  { label: 'Large adult', cm: '31 to 45 cm', inches: '12.2 to 17.7 in' },
  { label: 'Extra large', cm: '43 to 56 cm', inches: '16.9 to 22.0 in' },
] as const;

/**
 * Accessories.
 *
 * A separate export from MONITORS on purpose. A cuff and a tape measure are
 * not validated devices and must never be described as if they were. Validation
 * belongs to a monitor model number. Nothing in this list carries one.
 *
 * The bar for a cuff is different from the bar for a monitor, and it is just as
 * strict:
 *
 *   1. It is made by the same company that makes the monitor it goes on.
 *   2. That company names our exact monitor model in its own compatibility
 *      list. Not "fits most monitors". Not "compatible with Omron". The model
 *      number, written by the maker.
 *
 * Anything sold as "compatible with" by a third party is out, however good the
 * reviews are. A cuff that leaks or reads long turns a validated monitor into
 * an unvalidated one, and the reader has no way to tell that happened.
 *
 * `fits` lists only the monitors WE recommend, taken from the manufacturer's
 * own compatibility text on the listing. Checked 29 August 2026.
 */
export type Accessory = {
  id: string;
  brand: string;
  model: string;
  name: string;
  asin: string;
  kind: 'cuff' | 'tool';
  /** What problem this solves, in one plain sentence. */
  why: string;
  /** Arm range the maker states, inches first. Empty for tools. */
  range: string;
  /** Which of OUR recommended monitors the maker names. */
  fits: string[];
  /** The honest limit. Every item gets one. */
  caveat: string;
};

export const ACCESSORIES: Accessory[] = [
  {
    id: 'tape-myotape',
    brand: 'MyoTape',
    model: 'MT05',
    name: 'MyoTape body tape measure',
    asin: 'B000G7YW7Y',
    kind: 'tool',
    why: 'You cannot pick a cuff size until you have measured your arm, and measuring your own upper arm with an ordinary tape takes two hands you do not have. This one hooks to itself and locks, so you can do it alone.',
    range: '',
    fits: [],
    caveat:
      'It is a tape measure, nothing more. A strip of paper and a ruler works too, and costs nothing. Buy this only if you would rather not fiddle.',
  },
  {
    id: 'cuff-ua-291a',
    brand: 'A&D Medical',
    model: 'UA-291A',
    name: 'A&D Medical UA-291A large cuff',
    asin: 'B0BLT9CM2H',
    kind: 'cuff',
    why: 'The large cuff for the UA-651 and the UA-651SAC. Your monitor stays the validated one. Only the cuff changes.',
    range: '12.2 to 17.7 in (31 to 45 cm)',
    fits: ['UA-651', 'UA-651SAC'],
    caveat:
      'A&D does not name the UA-767F in this cuff\u2019s compatibility list. If yours is the UA-767F, use the UA-291 below instead.',
  },
  {
    id: 'cuff-ua-291',
    brand: 'A&D Medical',
    model: 'UA-291',
    name: 'A&D Medical UA-291 large cuff',
    asin: 'B018H6GEBM',
    kind: 'cuff',
    why: 'The large cuff A&D names for the UA-767F, the multi user monitor on our list. Same arm range as the UA-291A, different compatibility list.',
    range: '12.2 to 17.7 in (31 to 45 cm)',
    fits: ['UA-651', 'UA-767F'],
    caveat:
      'A&D does not name the UA-651SAC here. If yours is the UA-651SAC, use the UA-291A above.',
  },
  {
    id: 'cuff-ua-290a',
    brand: 'A&D Medical',
    model: 'UA-290A',
    name: 'A&D Medical UA-290A medium cuff',
    asin: 'B0BLT633NC',
    kind: 'cuff',
    why: 'A spare or second cuff in the ordinary adult size, for a second person in the house who does not need the wide range one.',
    range: '9.0 to 14.6 in (23 to 37 cm)',
    fits: ['UA-651', 'UA-651SAC'],
    caveat:
      'Most people do not need this. The wide range cuff in the box already covers 8.6 to 16.5 in.',
  },
];

/**
 * Arms bigger than 17.7 in (45 cm).
 *
 * We have no product to sell here and we are not going to invent one. The
 * largest cuff either maker on our list sells for a monitor we recommend stops
 * at 17.7 in.
 *
 * A&D does sell the UA-789AC with a 16.5 to 23.6 in (42 to 60 cm) cuff. We are
 * naming it because a reader with a 19 in arm deserves to know it exists. We
 * are NOT linking it and NOT putting it on the recommended list, because we
 * could not confirm that model number on the AMA listing ourselves. Every
 * monitor we recommend cleared that check. This one has not, so it does not get
 * the same treatment.
 *
 * If the check passes later, it can move up. Until then a missing link beats a
 * wrong one.
 */
export const EXTRA_LARGE_ARM = {
  threshold: '17.7 in (45 cm)',
  brandOption: 'A&D',
  namedOption: 'UA-789AC',
  namedOptionRange: '16.5 to 23.6 in (42 to 60 cm)',
  /** Why it is named but not linked. Reads after the word "because". */
  reason: 'we have not checked that model number against the AMA listing ourselves',
} as const;

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

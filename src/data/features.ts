/**
 * Which parts of the site are live.
 *
 * The site was built ahead of the content: some sections are finished but have
 * nothing real to show yet. Rather than ship them with placeholder data, they
 * are switched off here — one flag, and the section disappears from the home
 * page, the nav, the footer and the sitemap, and its route starts returning a
 * 404. Nothing is deleted; flip the flag back when the content exists.
 *
 * Keep a one-line reason next to every `false` so it is obvious what has to
 * happen before it can be turned on.
 */
export const features = {
  /** OFF: no merchandise to sell yet, and the cart cannot take payments. */
  shop: false,

  /** OFF: the roster is still 13 placeholder fighters with invented records. */
  roster: false,

  /** OFF: depends on the roster — rankings would point at fighters who don't exist. */
  rankings: false,

  /** OFF: the three past events are invented. */
  results: false,

  /** ON: real sponsors, taken from the UFP 6 poster. */
  sponsors: true,

  /** ON: the open call for fighters works and the form validates. */
  signup: true,
} as const;

export type FeatureName = keyof typeof features;

/** True when a section is live. */
export function isEnabled(name: FeatureName): boolean {
  return features[name];
}

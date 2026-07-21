/**
 * Which parts of the site are live.
 *
 * The site was built ahead of the content: some sections are finished but still
 * run on placeholder data. One flag removes a section from the home page, the
 * nav, the footer and the sitemap, and makes its route return 404 — nothing is
 * deleted, so flipping it back brings the section straight back.
 *
 * Right now everything is ON: this is the beta, meant to show the whole thing
 * working end to end. Before the production launch, anything still running on
 * invented data has to be switched off — see `CONTENIDO.md` for what is real
 * and what is not.
 */
export const features = {
  /** BETA: products, prices and photos are placeholders; the cart takes no payments. */
  shop: true,

  /** BETA: 13 placeholder fighters with invented records and no photos. */
  roster: true,

  /** BETA: rankings over placeholder fighters. */
  rankings: true,

  /** BETA: the three past events and their results are invented. */
  results: true,

  /** Real — sponsors taken from the UFP 6 poster. */
  sponsors: true,

  /** Real — the open call works and the form validates. */
  signup: true,
} as const;

export type FeatureName = keyof typeof features;

/** True when a section is live. */
export function isEnabled(name: FeatureName): boolean {
  return features[name];
}

/**
 * Which parts of the site are live.
 *
 * The site was built ahead of the content: some sections are finished but still
 * run on placeholder data. One flag removes a section from the home page, the
 * nav, the footer and the sitemap, and makes its route return 404 — nothing is
 * deleted, so flipping it back brings the section straight back.
 *
 * This is the production configuration (ufpcombat.com): only sections backed by
 * real content are on. The four sections still running on invented data are off
 * — their routes 404 and they vanish from the home, nav, footer and sitemap.
 * Flip one back on the moment its real content lands — see `CONTENIDO.md`.
 */
export const features = {
  /** OFF: no merchandise yet — products, prices and photos would all be invented. */
  shop: false,

  /** OFF: the 13 rostered fighters are placeholders with invented records. */
  roster: false,

  /** OFF: rankings run over the placeholder roster. */
  rankings: false,

  /** OFF: the three past events and their results are invented. */
  results: false,

  /** Real — sponsors taken from the UFP 6 poster. */
  sponsors: true,

  /** Real — the open call works, the form validates and submissions are emailed. */
  signup: true,
} as const;

export type FeatureName = keyof typeof features;

/** True when a section is live. */
export function isEnabled(name: FeatureName): boolean {
  return features[name];
}

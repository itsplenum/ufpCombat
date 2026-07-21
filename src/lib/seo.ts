import type { Metadata } from "next";

/**
 * hreflang alternates for a route: Spanish at the root, English under /en.
 * `path` must start with "/" (e.g. "/rankings", "/evento/ufp-6").
 */
export function localizedAlternates(path: string, locale: string): Metadata["alternates"] {
  const esPath = path === "/" ? "/" : path;
  const enPath = path === "/" ? "/en" : `/en${path}`;

  return {
    canonical: locale === "en" ? enPath : esPath,
    languages: {
      es: esPath,
      en: enPath,
      "x-default": esPath,
    },
  };
}

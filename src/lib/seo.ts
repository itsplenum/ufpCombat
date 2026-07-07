import type { Metadata } from "next";

/**
 * Alternates hreflang para una ruta: español en la raíz, inglés bajo /en.
 * `path` debe empezar con "/" (ej. "/rankings", "/evento/ufp-17").
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

import type { MetadataRoute } from "next";
import { getAllFighters, getBrowsableEvents } from "@/data";
import { site } from "@/data/site";
import { isEnabled } from "@/data/features";

/** Static site routes (locale-agnostic). Sections that are off stay out of the sitemap. */
const staticPaths = [
  "/",
  ...(isEnabled("rankings") ? ["/rankings"] : []),
  ...(isEnabled("shop") ? ["/tienda"] : []),
  ...(isEnabled("signup") ? ["/inscripcion"] : []),
  ...(isEnabled("sponsors") ? ["/patrocinadores"] : []),
];

function entry(path: string): MetadataRoute.Sitemap[number] {
  const esUrl = `${site.domain}${path === "/" ? "" : path}`;
  const enUrl = `${site.domain}/en${path === "/" ? "" : path}`;

  return {
    url: esUrl,
    lastModified: new Date(),
    alternates: { languages: { es: esUrl, en: enUrl } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const eventPaths = getBrowsableEvents().map((event) => `/evento/${event.slug}`);
  const fighterPaths = isEnabled("roster")
    ? getAllFighters().map((fighter) => `/peleador/${fighter.slug}`)
    : [];

  return [...staticPaths, ...eventPaths, ...fighterPaths].map(entry);
}

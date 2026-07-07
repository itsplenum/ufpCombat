import type { MetadataRoute } from "next";
import { getAllEvents, getAllFighters } from "@/data";
import { site } from "@/data/site";

/** Rutas estáticas del sitio (sin locale). */
const staticPaths = ["/", "/rankings", "/tienda", "/inscripcion", "/patrocinadores"];

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
  const eventPaths = getAllEvents().map((event) => `/evento/${event.slug}`);
  const fighterPaths = getAllFighters().map((fighter) => `/peleador/${fighter.slug}`);

  return [...staticPaths, ...eventPaths, ...fighterPaths].map(entry);
}

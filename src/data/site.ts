import type { Localized } from "./types";

/** Global site constants — a single place for branding and contact details. */
export const site = {
  name: "UFP",
  fullName: "Ultimate Fight Promotions",
  domain: "https://ufpcombat.com",
  contactEmail: "contacto@ufpcombat.com",
  /** Sales WhatsApp. wa.me format: country code + number, digits only. */
  whatsappNumber: "573219103153",
  /** Site author credit, shown discreetly in the footer. */
  author: "Plenum",
  authorUrl: "https://github.com/itsplenum",
} as const;

/**
 * Fixed phrases for the top ticker. Deliberately bilingual (fight-poster
 * style) — they are not swapped per locale. The next-event announcement does
 * NOT belong here: `getTickerMessages()` in `data/index.ts` derives it from
 * the event itself.
 */
export const tickerPhrases: string[] = [
  "Boletos a la venta / Tickets on sale now",
  "Peleas en vivo · Boxeo y MMA / Live boxing & MMA",
  "Música en vivo · Corridos bélicos · DJ",
];

/** Copyright line — the year is computed, never hardcoded. */
export function getCopyright(): Localized {
  const year = new Date().getFullYear();
  return {
    es: `© ${year} ${site.fullName}. Todos los derechos reservados.`,
    en: `© ${year} ${site.fullName}. All rights reserved.`,
  };
}

import type { Localized } from "./types";

/** Constantes globales del sitio — un solo lugar para marca y contacto. */
export const site = {
  name: "UFP",
  fullName: "Ultimate Fight Promotions",
  domain: "https://ufpcombat.com",
  contactEmail: "contacto@ufpcombat.com",
} as const;

/**
 * Frases fijas del ticker superior. Deliberadamente bilingües (estilo cartel
 * de pelea) — no se traducen por locale. El anuncio del próximo evento NO va
 * acá: lo deriva `getTickerMessages()` de `data/index.ts` a partir del evento.
 */
export const tickerPhrases: string[] = [
  "Boletos a la venta / Tickets on sale now",
  "PPV disponible en todo el mundo / Worldwide PPV",
];

/** Línea de copyright — el año se calcula, nunca se hardcodea. */
export function getCopyright(): Localized {
  const year = new Date().getFullYear();
  return {
    es: `© ${year} ${site.fullName}. Todos los derechos reservados.`,
    en: `© ${year} ${site.fullName}. All rights reserved.`,
  };
}

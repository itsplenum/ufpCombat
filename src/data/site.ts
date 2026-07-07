import type { Localized } from "./types";

/** Constantes globales del sitio — un solo lugar para marca y contacto. */
export const site = {
  name: "UFP",
  fullName: "Ultimate Fight Promotions",
  domain: "https://ufpcombat.com",
  contactEmail: "contacto@ufpcombat.com",
} as const;

/**
 * Mensajes del ticker superior. Frases deliberadamente bilingües
 * (estilo cartel de pelea) — no se traducen por locale.
 */
export const tickerMessages: string[] = [
  "UFP 17 · Sangre Nueva · 15 Ago 2026 · Arena Ciudad",
  "Boletos a la venta / Tickets on sale now",
  "PPV disponible en todo el mundo / Worldwide PPV",
];

/** Copy reutilizable para zonas legales/SEO. */
export const legal: { copyright: Localized } = {
  copyright: {
    es: "© 2026 Ultimate Fight Promotions. Todos los derechos reservados.",
    en: "© 2026 Ultimate Fight Promotions. All rights reserved.",
  },
};

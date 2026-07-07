import type { Locale, Localized } from "@/data/types";

/** Resuelve un valor `Localized` al idioma activo. */
export function L(value: Localized, locale: Locale): string {
  return value[locale];
}

import type { Locale, Localized } from "@/data/types";

/** Resolves a `Localized` value to the active language. */
export function L(value: Localized, locale: Locale): string {
  return value[locale];
}

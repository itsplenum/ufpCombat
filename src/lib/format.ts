import type { FighterRecord, Locale, UFPEvent } from "@/data/types";

/**
 * "UFP 6: Sangre Nueva" — the event's public name. Brand copy, so it is not
 * localized; kept here so page titles, metadata and CTAs can't drift apart.
 */
export function formatEventName(event: UFPEvent): string {
  return `UFP ${event.number}: ${event.title}`;
}

/** "18-2-0" */
export function formatRecord(record: FighterRecord): string {
  return `${record.wins}-${record.losses}-${record.draws}`;
}

/** "18-2-0 · 14 KO" (or "· 7 SUB" when submissions are the dominant finish). */
export function formatRecordWithFinish(record: FighterRecord): string {
  const finish =
    record.submissions > record.koTko
      ? `${record.submissions} SUB`
      : `${record.koTko} KO`;
  return `${formatRecord(record)} · ${finish}`;
}

const dateLocales: Record<Locale, string> = { es: "es-CO", en: "en-US" };

/** "22,300" — thousands separators per the active locale. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(dateLocales[locale]).format(value);
}

/** "$80.000" / "$350.000" — COP prices, no decimals. */
export function formatPrice(amount: number, locale: Locale): string {
  return `$${formatNumber(amount, locale)}`;
}

/** Date-only strings ("2026-05-24") are formatted in UTC so they don't shift by a day. */
function timeZoneFor(iso: string): string {
  return iso.length === 10 ? "UTC" : "America/Bogota";
}

/** "Vie 7 Ago 2026" / "Fri Aug 7 2026" — the event date line. */
export function formatEventDate(iso: string, locale: Locale): string {
  const formatted = new Intl.DateTimeFormat(dateLocales[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timeZoneFor(iso),
  }).format(new Date(iso));
  // "vie, 7 de ago de 2026" → "Vie 7 Ago 2026"
  return formatted
    .replaceAll(",", "")
    .replaceAll(".", "")
    .split(" ")
    .filter((word) => word.toLowerCase() !== "de")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** "23 MAY 2026" — monospace date stamp used in fight histories and results. */
export function formatDateBadge(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timeZoneFor(iso),
  })
    .format(new Date(iso))
    .replaceAll(",", "")
    .replaceAll(".", "")
    .replaceAll(/\bde\b/gi, "")
    .replaceAll(/\s+/g, " ")
    .toUpperCase();
}

/** "1.80m" */
export function formatMeters(value: number): string {
  return `${value.toFixed(2)}m`;
}

/** "20:00" — the event's local time (Bogotá). */
export function formatEventTime(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Bogota",
  }).format(new Date(iso));
}

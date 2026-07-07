import type { FighterRecord, Locale } from "@/data/types";

/** "18-2-0" */
export function formatRecord(record: FighterRecord): string {
  return `${record.wins}-${record.losses}-${record.draws}`;
}

/** "18-2-0 · 14 KO" (o "· 7 SUB" si domina la sumisión). */
export function formatRecordWithFinish(record: FighterRecord): string {
  const finish =
    record.submissions > record.koTko
      ? `${record.submissions} SUB`
      : `${record.koTko} KO`;
  return `${formatRecord(record)} · ${finish}`;
}

/** "$450" / "$2,400" — precios MXN sin decimales. */
export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

const dateLocales: Record<Locale, string> = { es: "es-MX", en: "en-US" };

/** "Sáb 15 Ago 2026" / "Sat Aug 15 2026" — línea de fecha de evento. */
export function formatEventDate(iso: string, locale: Locale): string {
  const formatted = new Intl.DateTimeFormat(dateLocales[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Mexico_City",
  }).format(new Date(iso));
  // "sáb, 15 ago 2026" → "Sáb 15 Ago 2026"
  return formatted
    .replaceAll(",", "")
    .replaceAll(".", "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** "23 MAY 2026" — sello monospace de fechas en historiales/resultados. */
export function formatDateBadge(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Mexico_City",
  })
    .format(new Date(iso))
    .replaceAll(",", "")
    .replaceAll(".", "")
    .toUpperCase();
}

/** "1.80m" */
export function formatMeters(value: number): string {
  return `${value.toFixed(2)}m`;
}

/** "20:00" — hora local del evento. */
export function formatEventTime(iso: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Mexico_City",
  }).format(new Date(iso));
}

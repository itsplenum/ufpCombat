import { getLocale, getTranslations } from "next-intl/server";
import type { Locale, Venue } from "@/data/types";
import { formatNumber } from "@/lib/format";
import { L } from "@/lib/localize";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface VenueBlockProps {
  venue: Venue;
}

/** Venue block: map/photo + address and key facts in monospace. */
export async function VenueBlock({ venue }: VenueBlockProps) {
  const t = await getTranslations("eventPage");
  const locale = (await getLocale()) as Locale;

  const facts = [
    { label: t("capacity"), value: formatNumber(venue.capacity, locale) },
    { label: t("doors"), value: venue.doorsOpen },
    { label: t("broadcast"), value: L(venue.broadcast, locale) },
  ];

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <PlaceholderImage
        label="mapa / foto de la arena"
        variant="neutral"
        src={venue.mapImage}
        alt={venue.name}
        className="h-[320px] border border-cream/15"
      />
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-4xl uppercase text-cream md:text-[44px]">
          {venue.name}
        </h2>
        <p className="text-[15px] leading-relaxed text-cream/65">{L(venue.address, locale)}</p>
        <div className="flex flex-col gap-2 font-mono text-xs text-cream/55">
          {facts.map(({ label, value }) => (
            <span key={label}>
              {label} — {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

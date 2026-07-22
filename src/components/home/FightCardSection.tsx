import { getLocale, getTranslations } from "next-intl/server";
import { getPublishedFights } from "@/data";
import type { Locale, UFPEvent } from "@/data/types";
import { L } from "@/lib/localize";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface FightCardSectionProps {
  event: UFPEvent;
}

/**
 * Fight-card teaser on the home page: a grid of the undercard's promo posters
 * (the main event has its own tale-of-the-tape section). Kept smaller than that
 * section so the undercard stays secondary. Only bouts that carry poster art
 * show here; the full card — every bout with time, weight and discipline —
 * lives on the event page, which the heading links to.
 *
 * The poster art uses ring names for some fighters; the accessible label uses
 * the official names from the data (same fighters).
 */
export async function FightCardSection({ event }: FightCardSectionProps) {
  const t = await getTranslations("sections.fightCard");
  const locale = (await getLocale()) as Locale;

  const posterBouts = getPublishedFights(event).filter(
    (fight) => fight.order > 0 && fight.poster,
  );

  // Nothing to tease until the undercard has art. An empty "Cartelera" heading
  // would read as broken — and would leave the /#cartelera nav anchor without a
  // target. It comes back as soon as a bout with a poster is published.
  if (posterBouts.length === 0) return null;

  return (
    <Section id="cartelera" width="lg">
      <SectionHeading
        title={t("title")}
        kicker={t("kicker", { event: `UFP ${event.number}` })}
        action={{ label: t("eventPageLink"), href: `/evento/${event.slug}` }}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posterBouts.map((fight) => (
          <div
            key={fight.id}
            className="flex flex-col border border-cream/12 bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-blood"
          >
            <PlaceholderImage
              label={`cartel ${fight.red.name} vs ${fight.blue.name}`}
              src={fight.poster}
              alt={`${fight.red.name} vs ${fight.blue.name}`}
              className="aspect-[3/4]"
              imageClassName="object-top"
            />
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="font-condensed text-sm uppercase tracking-[.18em] text-blood-hover">
                {L(fight.label, locale)}
              </span>
              {fight.divisionLabel ? (
                <span className="font-mono text-[11px] text-cream/65">
                  {L(fight.divisionLabel, locale)}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

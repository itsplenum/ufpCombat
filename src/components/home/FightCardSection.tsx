import { getTranslations } from "next-intl/server";
import { getPublishedFights } from "@/data";
import type { UFPEvent } from "@/data/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FightRow } from "@/components/event/FightRow";

interface FightCardSectionProps {
  event: UFPEvent;
}

/** Fight card for the upcoming event (excluding the main event, which has its own section). */
export async function FightCardSection({ event }: FightCardSectionProps) {
  const t = await getTranslations("sections.fightCard");

  const undercard = getPublishedFights(event).filter((fight) => fight.order > 0);

  // Only the main event is confirmed so far: no undercard means no section to
  // show (an empty "Cartelera" heading would read as broken). It returns as
  // soon as a second bout is published.
  if (undercard.length === 0) return null;

  return (
    <Section id="cartelera" width="md">
      <SectionHeading
        title={t("title")}
        kicker={t("kicker", { event: `UFP ${event.number}` })}
        action={{ label: t("eventPageLink"), href: `/evento/${event.slug}` }}
      />
      <div className="flex flex-col">
        {undercard.map((fight) => (
          <FightRow key={fight.id} fight={fight} />
        ))}
      </div>
    </Section>
  );
}

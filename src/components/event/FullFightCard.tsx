import { getTranslations } from "next-intl/server";
import { isEventUpcoming } from "@/data";
import type { UFPEvent } from "@/data/types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FightCardItem } from "./FightCardItem";

interface FullFightCardProps {
  event: UFPEvent;
}

/**
 * Full fight card for an event, including results once it has happened.
 * Shared by the event page and by the home page, which falls back to the
 * most recent event when nothing is scheduled.
 */
export async function FullFightCard({ event }: FullFightCardProps) {
  const t = await getTranslations("eventPage");

  const orderedFights = [...event.fights].sort((a, b) => a.order - b.order);

  return (
    <Section id="cartelera" background="ink-2" width="md">
      <SectionHeading
        title={t("fullCard")}
        kicker={
          isEventUpcoming(event)
            ? t("fightsCount", { count: orderedFights.length })
            : t("resultsKicker")
        }
      />
      <div className="flex flex-col gap-4">
        {orderedFights.map((fight) => (
          <FightCardItem key={fight.id} fight={fight} />
        ))}
      </div>
    </Section>
  );
}

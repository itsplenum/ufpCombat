import { getLocale, getTranslations } from "next-intl/server";
import { getMainFight } from "@/data";
import type { Locale, UFPEvent } from "@/data/types";
import { L } from "@/lib/localize";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TaleOfTheTape } from "@/components/event/TaleOfTheTape";

interface MainEventSectionProps {
  event: UFPEvent;
}

/** Main event of the upcoming card, with tale of the tape. */
export async function MainEventSection({ event }: MainEventSectionProps) {
  const t = await getTranslations("sections.mainEvent");
  const locale = (await getLocale()) as Locale;

  const mainFight = getMainFight(event);
  if (!mainFight) return null;

  return (
    <Section id="evento" background="ink-2" borderTop>
      <SectionHeading
        title={t("title")}
        kicker={
          mainFight.divisionLabel
            ? t("kicker", { division: L(mainFight.divisionLabel, locale) })
            : undefined
        }
      />
      <TaleOfTheTape fight={mainFight} />
    </Section>
  );
}

import { getLocale, getTranslations } from "next-intl/server";
import { getMainFight } from "@/data";
import type { Locale, UFPEvent } from "@/data/types";
import { L } from "@/lib/localize";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { TaleOfTheTape } from "@/components/event/TaleOfTheTape";

interface MainEventSectionProps {
  event: UFPEvent;
}

/** Main event of the upcoming card: the official poster if there is one, else the tale of the tape. */
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
      {mainFight.poster ? (
        // The official fight poster is the emblematic face of the event — a
        // single centered image with a red glow, bigger than any undercard card.
        <div className="mx-auto w-full max-w-[600px]">
          <PlaceholderImage
            label={`${mainFight.red.name} vs ${mainFight.blue.name}`}
            src={mainFight.poster}
            alt={`${mainFight.red.name} vs ${mainFight.blue.name}`}
            className="aspect-[914/1280] border border-blood/40 shadow-[0_0_90px_-10px_rgba(193,18,31,.5)]"
          />
        </div>
      ) : (
        <TaleOfTheTape fight={mainFight} />
      )}
    </Section>
  );
}

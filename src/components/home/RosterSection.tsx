import { getTranslations } from "next-intl/server";
import { getAllFighters } from "@/data";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FighterCard } from "@/components/fighter/FighterCard";

/** Only the first 8 fighters on the roster get a spot on the home page. */
const HOME_ROSTER_SIZE = 8;

export async function RosterSection() {
  const t = await getTranslations("sections.fighters");
  const roster = getAllFighters().slice(0, HOME_ROSTER_SIZE);

  return (
    <Section id="peleadores" background="ink-2">
      <SectionHeading title={t("title")} kicker={t("kicker")} />
      <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {roster.map((fighter) => (
          <FighterCard key={fighter.slug} fighter={fighter} />
        ))}
      </div>
    </Section>
  );
}

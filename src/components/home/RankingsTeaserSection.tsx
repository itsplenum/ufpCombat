import { getTranslations } from "next-intl/server";
import { getDivisionRankings } from "@/data";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChampionCard } from "@/components/rankings/ChampionCard";

/** Rankings teaser: the 3 headline divisions; the full page lives at /rankings. */
export async function RankingsTeaserSection() {
  const t = await getTranslations("sections.rankings");
  const featuredRankings = getDivisionRankings().slice(0, 3);

  return (
    <Section id="rankings" width="md">
      <SectionHeading
        title={t("title")}
        titleAccent={t("titleAccent")}
        action={{ label: t("fullRankingsLink"), href: "/rankings" }}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {featuredRankings.map((ranking) => (
          <ChampionCard key={ranking.divisionId} ranking={ranking} />
        ))}
      </div>
    </Section>
  );
}

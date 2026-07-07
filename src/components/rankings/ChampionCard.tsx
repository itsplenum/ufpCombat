import { getLocale, getTranslations } from "next-intl/server";
import { getDivision, getFighter } from "@/data";
import type { DivisionRanking, Locale } from "@/data/types";
import { L } from "@/lib/localize";

interface ChampionCardProps {
  ranking: DivisionRanking;
}

/** Card compacta de campeón + top 3 retadores (teaser de rankings en la home). */
export async function ChampionCard({ ranking }: ChampionCardProps) {
  const t = await getTranslations("sections.rankings");
  const locale = (await getLocale()) as Locale;

  const division = getDivision(ranking.divisionId);
  const champion = ranking.championSlug ? getFighter(ranking.championSlug) : undefined;
  const championName = champion
    ? `${champion.firstName} ${champion.lastName}`
    : t("vacant");

  return (
    <div className="flex flex-col gap-3.5 border border-blood/40 bg-linear-160 from-surface-warm to-surface p-6">
      <div className="flex items-center justify-between">
        <span className="font-condensed text-sm uppercase tracking-[.24em] text-blood">
          {division ? L(division.name, locale) : ranking.divisionId}
        </span>
        <span className="font-mono text-[10px] tracking-[.2em] text-cream/40">{t("belt")}</span>
      </div>
      <span className="font-display text-[28px] uppercase leading-none text-cream">
        {championName}
      </span>
      <div className="flex flex-col gap-1.5 font-condensed text-[15px] text-cream/65">
        {ranking.contenders.slice(0, 3).map((contender) => (
          <span key={contender.rank}>
            #{contender.rank} — {contender.name}
          </span>
        ))}
      </div>
    </div>
  );
}

import { getLocale, getTranslations } from "next-intl/server";
import { getDivision } from "@/data";
import type { Fighter, Locale } from "@/data/types";
import { L } from "@/lib/localize";
import { OutlineText } from "@/components/ui/OutlineText";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { BioGrid } from "./BioGrid";
import { RecordBar } from "./RecordBar";

interface FighterHeroProps {
  fighter: Fighter;
}

/** Profile hero: nickname watermark, badge, name, record, bio and full-body photo. */
export async function FighterHero({ fighter }: FighterHeroProps) {
  const t = await getTranslations("fighterPage");
  const locale = (await getLocale()) as Locale;

  const division = getDivision(fighter.divisionId);
  const divisionShort = division ? L(division.shortName, locale) : "";

  const badge = fighter.isChampion
    ? t("championBadge", { division: divisionShort })
    : fighter.rank
      ? t("rankBadge", { rank: fighter.rank, division: divisionShort })
      : divisionShort;

  const disciplineLine = `${fighter.discipline === "mma" ? "MMA" : locale === "es" ? "BOXEO" : "BOXING"} · ${fighter.stats.gym}`;

  return (
    <section className="relative overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_80%_90%_at_75%_50%,rgba(122,12,20,.45),transparent_65%)]">
      {/* Watermark: nickname, falling back to last name */}
      <div className="pointer-events-none absolute -left-5 -top-10 select-none whitespace-nowrap">
        <OutlineText
          strokeColor="rgba(193,18,31,.18)"
          className="text-[min(24vw,340px)] leading-none"
        >
          {fighter.nickname ?? fighter.lastName}
        </OutlineText>
      </div>

      <Reveal
        onScroll={false}
        className="relative mx-auto grid max-w-[1200px] items-end gap-8 px-6 pt-20 md:px-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-12"
      >
        <div className="flex flex-col gap-[18px] pb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-blood px-3.5 py-1.5 font-condensed text-[13px] font-bold uppercase tracking-[.24em] text-cream">
              {badge}
            </span>
            <span className="font-mono text-xs text-cream/60">{disciplineLine}</span>
          </div>

          <h1 className="font-display text-[min(12vw,96px)] uppercase leading-[.94]">
            <span className="block text-[.4em] tracking-[.14em] text-cream/55">
              {fighter.firstName}
              {fighter.nickname ? ` "${fighter.nickname}"` : ""}
            </span>
            <span className="block text-cream">{fighter.lastName}</span>
          </h1>

          <RecordBar record={fighter.record} />
          <BioGrid stats={fighter.stats} />
        </div>

        <PlaceholderImage
          label={t("photoLabel")}
          variant="red"
          src={fighter.photoFull}
          alt={fighter.shortName}
          className="h-[320px] border border-b-0 border-blood/35 lg:h-[520px]"
        />
      </Reveal>
    </section>
  );
}

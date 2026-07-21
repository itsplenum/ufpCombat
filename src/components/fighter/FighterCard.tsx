import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getDivision } from "@/data";
import type { Fighter, Locale } from "@/data/types";
import { formatRecordWithFinish } from "@/lib/format";
import { L } from "@/lib/localize";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface FighterCardProps {
  fighter: Fighter;
}

/** Card de roster: foto, nombre, récord y división. */
export async function FighterCard({ fighter }: FighterCardProps) {
  const t = await getTranslations("fight");
  const locale = (await getLocale()) as Locale;
  const division = getDivision(fighter.divisionId);

  const divisionLine = [
    division ? L(division.shortName, locale) : null,
    fighter.isChampion ? t("champion") : fighter.rank ? `#${fighter.rank}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={`/peleador/${fighter.slug}`}
      className="flex flex-col overflow-hidden border border-cream/10 bg-surface transition-colors hover:border-blood"
    >
      <PlaceholderImage
        label="foto"
        variant="neutral"
        src={fighter.photoBust}
        alt={fighter.shortName}
        className="h-[210px]"
      />
      <div className="flex flex-col gap-1 border-t-2 border-blood px-4 py-3.5">
        <span className="font-display text-[19px] uppercase leading-tight text-cream">
          {fighter.shortName}
        </span>
        <span className="font-mono text-[11px] text-blood-hover">
          {formatRecordWithFinish(fighter.record)}
        </span>
        <span className="font-condensed text-xs uppercase tracking-[.16em] text-cream/60">
          {divisionLine}
        </span>
      </div>
    </Link>
  );
}

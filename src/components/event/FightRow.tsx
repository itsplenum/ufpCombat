import { getLocale, getTranslations } from "next-intl/server";
import type { Fight, Locale } from "@/data/types";
import { L } from "@/lib/localize";

interface FightRowProps {
  fight: Fight;
}

/** Fila compacta de la cartelera en la home. */
export async function FightRow({ fight }: FightRowProps) {
  const t = await getTranslations("fight");
  const locale = (await getLocale()) as Locale;

  return (
    <div className="grid grid-cols-1 items-center gap-2 border-b border-cream/10 px-4 py-5 transition-colors hover:bg-blood/8 md:grid-cols-[110px_1fr_60px_1fr_150px] md:gap-[18px]">
      <span className="font-condensed text-[13px] uppercase tracking-[.2em] text-blood">
        {L(fight.label, locale)}
      </span>
      <span className="font-display text-xl uppercase text-cream md:text-right md:text-2xl">
        {fight.red.name}
      </span>
      <span className="font-condensed text-base font-bold text-cream/55 md:text-center">
        {t("vs")}
      </span>
      <span className="font-display text-xl uppercase text-cream md:text-2xl">
        {fight.blue.name}
      </span>
      <span className="font-mono text-xs text-cream/60 md:text-right">
        {L(fight.divisionLabel, locale)}
      </span>
    </div>
  );
}

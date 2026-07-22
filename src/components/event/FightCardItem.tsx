import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveCorner, type ResolvedCorner } from "@/data";
import type { Fight, Locale } from "@/data/types";
import { formatRecord } from "@/lib/format";
import { L } from "@/lib/localize";
import { OutlineText } from "@/components/ui/OutlineText";

interface FightCardItemProps {
  fight: Fight;
}

function cornerRecordLine(resolved: ResolvedCorner, locale: Locale): string {
  const record = resolved.fighter
    ? formatRecord(resolved.fighter.record)
    : resolved.corner.recordText;
  const tag = resolved.corner.tag ? L(resolved.corner.tag, locale) : null;
  return [record, tag].filter(Boolean).join(" · ");
}

function CornerName({
  resolved,
  align,
}: {
  resolved: ResolvedCorner;
  align: "left" | "right";
}) {
  const className = `font-display text-xl uppercase text-cream md:text-[26px] ${
    align === "right" ? "md:text-right" : ""
  }`;

  if (resolved.corner.slug) {
    return (
      <Link
        href={`/peleador/${resolved.corner.slug}`}
        className={`${className} transition-colors hover:text-blood-hover`}
      >
        {resolved.corner.name}
      </Link>
    );
  }
  return <span className={className}>{resolved.corner.name}</span>;
}

/** Fight card on the event page; shows the result once the fight has happened. */
export async function FightCardItem({ fight }: FightCardItemProps) {
  const t = await getTranslations("eventPage");
  const tFight = await getTranslations("fight");
  const locale = (await getLocale()) as Locale;

  const red = resolveCorner(fight.red);
  const blue = resolveCorner(fight.blue);
  const { result } = fight;

  const resultLine = result
    ? result.winner === null
      ? `${t("draw")} — ${L(result.method, locale)}`
      : [
          t("winner", {
            name: result.winner === "red" ? red.corner.name : blue.corner.name,
          }),
          L(result.method, locale),
          result.round ? t("round", { round: result.round }) : null,
          result.time ?? null,
        ]
          .filter(Boolean)
          .join(" · ")
    : null;

  return (
    <div className="border border-cream/10 bg-surface transition-colors hover:border-blood">
      <div className="grid items-center gap-3 px-7 py-[22px] md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <div className="flex flex-col gap-0.5 md:text-right">
          <CornerName resolved={red} align="right" />
          <span className="font-mono text-[11px] text-blood-hover md:text-right">
            {cornerRecordLine(red, locale)}
          </span>
        </div>

        <div className="flex min-w-[150px] flex-col items-center gap-1">
          <span className="font-condensed text-xs uppercase tracking-[.24em] text-blood-hover">
            {L(fight.label, locale)}
          </span>
          <OutlineText className="text-[22px]">{tFight("vs")}</OutlineText>
          <span className="font-mono text-[11px] text-cream/65">
            {[fight.time, fight.divisionLabel ? L(fight.divisionLabel, locale) : null]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <CornerName resolved={blue} align="left" />
          <span className="font-mono text-[11px] text-blood-hover">
            {cornerRecordLine(blue, locale)}
          </span>
        </div>
      </div>

      {resultLine ? (
        <div className="border-t border-blood/30 bg-blood/8 px-7 py-2.5 text-center font-condensed text-sm font-bold uppercase tracking-[.14em] text-win">
          {resultLine}
        </div>
      ) : null}
    </div>
  );
}

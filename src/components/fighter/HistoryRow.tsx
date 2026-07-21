import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { FightHistoryEntry, Locale } from "@/data/types";
import { formatDateBadge } from "@/lib/format";
import { L } from "@/lib/localize";

interface HistoryRowProps {
  entry: FightHistoryEntry;
}

const outcomeColors: Record<FightHistoryEntry["outcome"], string> = {
  W: "text-win",
  L: "text-blood-hover",
  D: "text-cream/60",
};

/** Fila del historial: resultado, rival, método, evento y fecha. */
export async function HistoryRow({ entry }: HistoryRowProps) {
  const t = await getTranslations("outcome");
  const locale = (await getLocale()) as Locale;

  const opponent = entry.opponentSlug ? (
    <Link
      href={`/peleador/${entry.opponentSlug}`}
      className="transition-colors hover:text-blood-hover"
    >
      vs. {entry.opponentName}
    </Link>
  ) : (
    <>vs. {entry.opponentName}</>
  );

  return (
    <div className="grid grid-cols-[40px_1fr_110px] items-center gap-3 border-b border-cream/10 px-4 py-[18px] transition-colors hover:bg-blood/8 md:grid-cols-[70px_1fr_200px_110px] md:gap-[18px] lg:grid-cols-[70px_1fr_220px_160px_110px]">
      <span className={`font-display text-lg ${outcomeColors[entry.outcome]}`}>
        {t(entry.outcome)}
      </span>
      <span className="font-display text-lg uppercase text-cream md:text-[22px]">
        {opponent}
      </span>
      <span className="hidden font-condensed text-[15px] tracking-[.08em] text-cream/65 md:block">
        {L(entry.method, locale)}
      </span>
      <span className="hidden font-mono text-xs text-cream/60 lg:block">
        {entry.eventSlug ? (
          <Link
            href={`/evento/${entry.eventSlug}`}
            className="transition-colors hover:text-blood-hover"
          >
            {entry.eventName}
          </Link>
        ) : (
          entry.eventName
        )}
      </span>
      <span className="text-right font-mono text-xs text-blood-hover">
        {formatDateBadge(entry.date, locale)}
      </span>
    </div>
  );
}

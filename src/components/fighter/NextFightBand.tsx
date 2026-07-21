import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getNextFightFor } from "@/data";
import type { Locale } from "@/data/types";
import { formatEventDate } from "@/lib/format";

interface NextFightBandProps {
  fighterSlug: string;
}

/** Clickable red band showing the fighter's next scheduled fight. */
export async function NextFightBand({ fighterSlug }: NextFightBandProps) {
  const t = await getTranslations("fighterPage");
  const locale = (await getLocale()) as Locale;

  const nextFight = getNextFightFor(fighterSlug);
  if (!nextFight) return null;

  const { event, opponent } = nextFight;

  return (
    <section className="bg-blood">
      <Link
        href={`/evento/${event.slug}`}
        className="group mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-[22px] text-cream md:px-12"
      >
        <span className="font-condensed text-sm font-bold uppercase tracking-[.26em]">
          {t("nextFight")}
        </span>
        <span className="font-display text-lg uppercase md:text-[26px]">
          vs. {opponent.name} · UFP {event.number}: {event.title} ·{" "}
          {formatEventDate(event.date, locale)}
        </span>
        <span className="border-[1.5px] border-current px-6 py-2.5 font-condensed text-[15px] font-bold uppercase tracking-[.2em] transition-colors group-hover:bg-cream group-hover:text-blood-deep">
          {t("ticketsCta")}
        </span>
      </Link>
    </section>
  );
}

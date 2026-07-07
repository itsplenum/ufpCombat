import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getNextFightFor } from "@/data";
import type { Locale } from "@/data/types";
import { formatEventDate } from "@/lib/format";

interface NextFightBandProps {
  fighterSlug: string;
}

/** Banda roja clickeable con la próxima pelea agendada del peleador. */
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
        className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-[22px] text-ink transition-colors hover:text-cream md:px-12"
      >
        <span className="font-condensed text-sm font-bold uppercase tracking-[.26em]">
          {t("nextFight")}
        </span>
        <span className="font-display text-lg uppercase md:text-[26px]">
          vs. {opponent.name} · UFP {event.number}: {event.title} ·{" "}
          {formatEventDate(event.date, locale)}
        </span>
        <span className="border-[1.5px] border-current px-6 py-2.5 font-condensed text-[15px] font-bold uppercase tracking-[.2em]">
          {t("ticketsCta")}
        </span>
      </Link>
    </section>
  );
}

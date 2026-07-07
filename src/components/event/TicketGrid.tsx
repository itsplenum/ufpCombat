import { getLocale, getTranslations } from "next-intl/server";
import type { Locale, TicketTier } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { L } from "@/lib/localize";

interface TicketGridProps {
  tickets: TicketTier[];
}

/** Grid de zonas de boletos — compartido por home y página de evento. */
export async function TicketGrid({ tickets }: TicketGridProps) {
  const t = await getTranslations("sections.tickets");
  const locale = (await getLocale()) as Locale;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {tickets.map((tier) => (
        <div
          key={tier.id}
          className="flex flex-col gap-3 border border-cream/12 bg-surface px-[22px] py-[26px] transition-all duration-200 hover:-translate-y-1 hover:border-blood"
        >
          <span className="font-condensed text-sm uppercase tracking-[.24em] text-blood">
            {tier.zone}
          </span>
          <span className="font-display text-[40px] text-cream">{formatPrice(tier.price)}</span>
          <span className="text-sm leading-normal text-cream/60">{L(tier.perks, locale)}</span>
          <a
            href="#boletos"
            className="mt-auto border border-blood px-2.5 py-2.5 text-center font-condensed text-sm font-bold uppercase tracking-[.18em] text-blood-hover transition-colors hover:bg-blood hover:text-cream"
          >
            {t("buy")}
          </a>
        </div>
      ))}
    </div>
  );
}

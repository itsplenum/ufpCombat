import { getLocale, getTranslations } from "next-intl/server";
import type { Locale, TicketTier } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { L } from "@/lib/localize";
import { whatsappLink } from "@/lib/whatsapp";

interface TicketGridProps {
  tickets: TicketTier[];
  /** Event the tickets belong to, e.g. "UFP 6: Sangre Nueva" — quoted back in the WhatsApp message. */
  eventName: string;
}

/**
 * Grid of ticket zones — shared by the home page and the event page.
 *
 * The CTA opens WhatsApp with a message naming the event, the zone and the
 * price, so whoever answers already knows what is being asked for. There is no
 * payment gateway yet. Swap point: once a ticketing provider exists, add
 * `ticketUrl` to `TicketTier` in `data/types.ts` and point `href` at it.
 */
export async function TicketGrid({ tickets, eventName }: TicketGridProps) {
  const t = await getTranslations("sections.tickets");
  const locale = (await getLocale()) as Locale;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map((tier) => (
        <div
          key={tier.id}
          className="flex flex-col gap-3 border border-cream/12 bg-surface px-[22px] py-[26px] transition-all duration-200 hover:-translate-y-1 hover:border-blood"
        >
          <span className="font-condensed text-sm uppercase tracking-[.24em] text-blood-hover">
            {tier.zone}
          </span>
          <span className="font-display text-[40px] text-cream">
            {formatPrice(tier.price, locale)}
          </span>
          <span className="text-sm leading-normal text-cream/60">{L(tier.perks, locale)}</span>
          <a
            href={whatsappLink(
              t("buyMessage", {
                event: eventName,
                zone: tier.zone,
                price: formatPrice(tier.price, locale),
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto border border-blood px-2.5 py-2.5 text-center font-condensed text-sm font-bold uppercase tracking-[.18em] text-blood-hover transition-colors hover:bg-blood hover:text-cream"
          >
            {t("buy")}
          </a>
        </div>
      ))}
    </div>
  );
}

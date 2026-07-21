import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBrowsableEvents, getEvent, getMainFight, isEventUpcoming } from "@/data";
import type { Locale } from "@/data/types";
import { site } from "@/data/site";
import { formatEventDate, formatEventName } from "@/lib/format";
import { L } from "@/lib/localize";
import { localizedAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventHero } from "@/components/event/EventHero";
import { ScheduleBand } from "@/components/event/ScheduleBand";
import { FullFightCard } from "@/components/event/FullFightCard";
import { TicketGrid } from "@/components/event/TicketGrid";
import { VenueBlock } from "@/components/event/VenueBlock";

interface EventPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/** See the note on the home page: `isEventUpcoming()` is evaluated at prerender time. */
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBrowsableEvents().map((event) => ({ locale, slug: event.slug })),
  );
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};

  const mainFight = getMainFight(event);
  const description = mainFight
    ? [
        `${mainFight.red.name} vs ${mainFight.blue.name}`,
        mainFight.divisionLabel ? L(mainFight.divisionLabel, locale as Locale) : null,
        event.venue.name,
      ]
        .filter(Boolean)
        .join(" · ")
    : event.venue.name;

  return {
    title: `UFP ${event.number}: ${event.title} · ${formatEventDate(event.date, locale as Locale)}`,
    description,
    alternates: localizedAlternates(`/evento/${event.slug}`, locale),
  };
}

/** Estimated length of a full card (prelims + main card). */
const EVENT_DURATION_HOURS = 4;

function eventEndDate(startIso: string): string {
  const end = new Date(startIso);
  end.setHours(end.getHours() + EVENT_DURATION_HOURS);
  return end.toISOString();
}

/**
 * Structured data so Google indexes the event as a SportsEvent.
 * `eventStatus` only applies to upcoming events: schema.org has no
 * "finished" status, that's conveyed by an `endDate` in the past.
 */
function eventJsonLd(event: NonNullable<ReturnType<typeof getEvent>>) {
  const isUpcoming = isEventUpcoming(event);

  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `UFP ${event.number}: ${event.title}`,
    sport: "Mixed Martial Arts / Boxing",
    startDate: event.date,
    endDate: eventEndDate(event.date),
    ...(isUpcoming ? { eventStatus: "https://schema.org/EventScheduled" } : {}),
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: event.venue.address.es,
    },
    organizer: { "@type": "Organization", name: site.fullName, url: site.domain },
    ...(isUpcoming && event.tickets.length > 0
      ? {
          offers: event.tickets.map((tier) => ({
            "@type": "Offer",
            name: tier.zone,
            price: tier.price,
            priceCurrency: tier.currency,
            availability: tier.soldOut
              ? "https://schema.org/SoldOut"
              : "https://schema.org/InStock",
          })),
        }
      : {}),
  };
}

/** Event page: poster, schedule, full fight card (with results if it already happened), tickets and venue. */
export default async function EventPage({ params }: EventPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = getEvent(slug);
  if (!event || !getBrowsableEvents().includes(event)) notFound();

  const tTickets = await getTranslations("sections.tickets");

  const isUpcoming = isEventUpcoming(event);

  return (
    <>
      <JsonLd data={eventJsonLd(event)} />
      <main>
        <EventHero event={event} />
        <ScheduleBand schedule={event.schedule} />

        <FullFightCard event={event} />

        {isUpcoming && event.tickets.length > 0 ? (
          <Section id="boletos" background="ticket-gradient" width="md" borderTop>
            <SectionHeading title={tTickets("title")} titleAccent={tTickets("titleAccent")} />
            <TicketGrid tickets={event.tickets} eventName={formatEventName(event)} />
          </Section>
        ) : null}

        <Section id="venue" background="ink-2" width="md">
          <VenueBlock venue={event.venue} />
        </Section>
      </main>
      <Footer compact />
    </>
  );
}

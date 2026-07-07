import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllEvents, getEvent, getMainFight } from "@/data";
import type { Locale } from "@/data/types";
import { site } from "@/data/site";
import { formatEventDate } from "@/lib/format";
import { L } from "@/lib/localize";
import { localizedAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventHero } from "@/components/event/EventHero";
import { ScheduleBand } from "@/components/event/ScheduleBand";
import { FightCardItem } from "@/components/event/FightCardItem";
import { TicketGrid } from "@/components/event/TicketGrid";
import { VenueBlock } from "@/components/event/VenueBlock";

interface EventPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllEvents().map((event) => ({ locale, slug: event.slug })),
  );
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};

  const mainFight = getMainFight(event);
  const description = mainFight
    ? `${mainFight.red.name} vs ${mainFight.blue.name} · ${L(mainFight.divisionLabel, locale as Locale)} · ${event.venue.name}`
    : event.venue.name;

  return {
    title: `UFP ${event.number}: ${event.title} · ${formatEventDate(event.date, locale as Locale)}`,
    description,
    alternates: localizedAlternates(`/evento/${event.slug}`, locale),
  };
}

/** Structured data para que Google indexe el evento como SportsEvent. */
function eventJsonLd(event: NonNullable<ReturnType<typeof getEvent>>) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: `UFP ${event.number}: ${event.title}`,
    sport: "Mixed Martial Arts / Boxing",
    startDate: event.date,
    eventStatus:
      event.status === "upcoming"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: event.venue.address.es,
    },
    organizer: { "@type": "Organization", name: site.fullName, url: site.domain },
    ...(event.status === "upcoming" && event.tickets.length > 0
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

/** Página de evento: póster, horarios, cartelera completa (con resultados si ya pasó), boletos y arena. */
export default async function EventPage({ params }: EventPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event = getEvent(slug);
  if (!event) notFound();

  const tEvent = await getTranslations("eventPage");
  const tTickets = await getTranslations("sections.tickets");

  const isUpcoming = event.status === "upcoming";
  const orderedFights = [...event.fights].sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={eventJsonLd(event)} />
      <main>
        <EventHero event={event} />
        <ScheduleBand schedule={event.schedule} />

        <Section id="cartelera" background="ink-2" width="md">
          <SectionHeading
            title={tEvent("fullCard")}
            kicker={
              isUpcoming
                ? tEvent("fightsCount", { count: orderedFights.length })
                : tEvent("resultsKicker")
            }
          />
          <div className="flex flex-col gap-4">
            {orderedFights.map((fight) => (
              <FightCardItem key={fight.id} fight={fight} />
            ))}
          </div>
        </Section>

        {isUpcoming && event.tickets.length > 0 ? (
          <Section id="boletos" background="ticket-gradient" width="md" borderTop>
            <SectionHeading title={tTickets("title")} titleAccent={tTickets("titleAccent")} />
            <TicketGrid tickets={event.tickets} />
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

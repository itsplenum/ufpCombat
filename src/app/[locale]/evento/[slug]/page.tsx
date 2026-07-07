import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllEvents, getEvent } from "@/data";
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

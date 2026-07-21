import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getLatestPastEvent, getUpcomingEvent } from "@/data";
import type { Locale } from "@/data/types";
import { formatEventDate } from "@/lib/format";
import { localizedAlternates } from "@/lib/seo";
import { Ticker } from "@/components/layout/Ticker";
import { Footer } from "@/components/layout/Footer";
import { EventHero } from "@/components/event/EventHero";
import { FullFightCard } from "@/components/event/FullFightCard";
import { HeroSection } from "@/components/home/HeroSection";
import { MainEventSection } from "@/components/home/MainEventSection";
import { FightCardSection } from "@/components/home/FightCardSection";
import { TicketsSection } from "@/components/home/TicketsSection";
import { RosterSection } from "@/components/home/RosterSection";
import { RankingsTeaserSection } from "@/components/home/RankingsTeaserSection";
import { ResultsSection } from "@/components/home/ResultsSection";
import { ShopTeaserSection } from "@/components/home/ShopTeaserSection";
import { SponsorsApplySection } from "@/components/home/SponsorsApplySection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Qué evento es "el próximo" se decide comparando contra la fecha actual, y esa
 * comparación se congela al prerenderizar. Sin ISR, un sitio construido hoy
 * seguiría anunciando un evento ya pasado hasta el siguiente deploy.
 * Una hora es de sobra: el contenido cambia por evento, no por minuto.
 */
export const revalidate = 3600;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const event = getUpcomingEvent();
  const title = event
    ? `UFP ${event.number}: ${event.title} · ${formatEventDate(event.date, locale as Locale)}`
    : undefined;

  return {
    ...(title ? { title } : {}),
    alternates: localizedAlternates("/", locale),
  };
}

/**
 * Home one-pager: el póster del próximo evento + todas las áreas de la promotora.
 *
 * Sin evento agendado la home NO se cae: encabeza con el último evento
 * realizado y su cartelera con resultados, y el resto de las secciones
 * (roster, rankings, tienda, patrocinios) se muestran igual.
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const upcomingEvent = getUpcomingEvent();
  const latestPastEvent = upcomingEvent ? undefined : getLatestPastEvent();

  return (
    <>
      <Ticker />
      <main>
        {upcomingEvent ? (
          <>
            <HeroSection event={upcomingEvent} />
            <MainEventSection event={upcomingEvent} />
            <FightCardSection event={upcomingEvent} />
            <TicketsSection event={upcomingEvent} />
          </>
        ) : null}

        {latestPastEvent ? (
          <>
            <EventHero event={latestPastEvent} />
            <MainEventSection event={latestPastEvent} />
            <FullFightCard event={latestPastEvent} />
          </>
        ) : null}

        <RosterSection />
        <RankingsTeaserSection />
        <ResultsSection />
        <ShopTeaserSection />
        <SponsorsApplySection />
      </main>
      <Footer />
    </>
  );
}

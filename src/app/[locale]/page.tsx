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
 * Which event counts as "the next one" is decided by comparing against the
 * current date, and that comparison is frozen at prerender time. Without ISR,
 * a site built today would keep announcing an event that already happened
 * until the next deploy. An hour is plenty: the content changes per event,
 * not per minute.
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
 * Home one-pager: the next event's poster + every area of the promotion.
 *
 * With no event scheduled the home page does NOT break: it leads with the
 * latest event that took place and its fight card with results, and the rest
 * of the sections (roster, rankings, shop, sponsorships) still show up.
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

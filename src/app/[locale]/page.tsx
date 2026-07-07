import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getUpcomingEvent } from "@/data";
import { Ticker } from "@/components/layout/Ticker";
import { Footer } from "@/components/layout/Footer";
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

/** Home one-pager: el póster del próximo evento + todas las áreas de la promotora. */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const upcomingEvent = getUpcomingEvent();
  if (!upcomingEvent) notFound();

  return (
    <>
      <Ticker />
      <main>
        <HeroSection event={upcomingEvent} />
        <MainEventSection event={upcomingEvent} />
        <FightCardSection event={upcomingEvent} />
        <TicketsSection event={upcomingEvent} />
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

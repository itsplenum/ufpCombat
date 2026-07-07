import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllFighters, getFighter } from "@/data";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FighterHero } from "@/components/fighter/FighterHero";
import { NextFightBand } from "@/components/fighter/NextFightBand";
import { HistoryRow } from "@/components/fighter/HistoryRow";
import { VideoCard } from "@/components/fighter/VideoCard";

interface FighterPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllFighters().map((fighter) => ({ locale, slug: fighter.slug })),
  );
}

/** Perfil de peleador: hero con récord y bio, próxima pelea, historial y highlights. */
export default async function FighterPage({ params }: FighterPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const fighter = getFighter(slug);
  if (!fighter) notFound();

  const t = await getTranslations("fighterPage");

  return (
    <>
      <main>
        <FighterHero fighter={fighter} />
        <NextFightBand fighterSlug={fighter.slug} />

        {fighter.history.length > 0 ? (
          <Section background="ink-2" width="md">
            <SectionHeading title={t("historyTitle")} kicker={t("historyKicker")} />
            <div className="flex flex-col">
              {fighter.history.map((entry) => (
                <HistoryRow key={`${entry.date}-${entry.opponentName}`} entry={entry} />
              ))}
            </div>
          </Section>
        ) : null}

        {fighter.videos.length > 0 ? (
          <Section>
            <SectionHeading title={t("videosTitle")} kicker={t("videosKicker")} />
            <div className="grid gap-5 md:grid-cols-3">
              {fighter.videos.map((video) => (
                <VideoCard key={video.title.es} video={video} />
              ))}
            </div>
          </Section>
        ) : null}
      </main>
      <Footer compact />
    </>
  );
}

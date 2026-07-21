import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getAllFighters, getDivision, getFighter } from "@/data";
import type { Fighter, Locale } from "@/data/types";
import { site } from "@/data/site";
import { formatRecordWithFinish } from "@/lib/format";
import { L } from "@/lib/localize";
import { isEnabled } from "@/data/features";
import { localizedAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
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
  if (!isEnabled("roster")) return [];
  return routing.locales.flatMap((locale) =>
    getAllFighters().map((fighter) => ({ locale, slug: fighter.slug })),
  );
}

export async function generateMetadata({ params }: FighterPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const fighter = getFighter(slug);
  if (!fighter) return {};

  const division = getDivision(fighter.divisionId);

  return {
    title: `${fighter.shortName} — ${formatRecordWithFinish(fighter.record)}`,
    description: division
      ? `${fighter.shortName} · ${L(division.name, locale as Locale)} · ${site.fullName}`
      : fighter.shortName,
    alternates: localizedAlternates(`/peleador/${fighter.slug}`, locale),
  };
}

/** Structured data so Google indexes the fighter as a Person. */
function fighterJsonLd(fighter: Fighter) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${fighter.firstName} ${fighter.lastName}`,
    ...(fighter.nickname ? { alternateName: fighter.nickname } : {}),
    jobTitle: fighter.discipline === "mma" ? "MMA Fighter" : "Boxer",
    nationality: fighter.stats.origin,
    memberOf: { "@type": "SportsOrganization", name: site.fullName, url: site.domain },
  };
}

/** Fighter profile: hero with record and bio, next fight, history and highlights. */
export default async function FighterPage({ params }: FighterPageProps) {
  if (!isEnabled("roster")) notFound();
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const fighter = getFighter(slug);
  if (!fighter) notFound();

  const t = await getTranslations("fighterPage");

  return (
    <>
      <JsonLd data={fighterJsonLd(fighter)} />
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

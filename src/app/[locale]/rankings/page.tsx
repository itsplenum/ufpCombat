import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { OutlineText } from "@/components/ui/OutlineText";
import { Reveal } from "@/components/ui/Reveal";
import { buildRankingsView } from "@/components/rankings/buildRankingsView";
import { PoundForPoundSection } from "@/components/rankings/PoundForPoundSection";
import { RankingsBoard } from "@/components/rankings/RankingsBoard";

interface RankingsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RankingsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rankingsPage" });

  return {
    title: `${t("title")} ${t("titleAccent")}`,
    description: t("officialNote"),
    alternates: localizedAlternates("/rankings", locale),
  };
}

/**
 * /rankings — centro de visualización y fuente de la verdad de los rankings UFP:
 * P4P top 10, campeones por división con defensas y top de retadores con movimientos.
 */
export default async function RankingsPage({ params }: RankingsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("rankingsPage");
  const view = await buildRankingsView();

  return (
    <>
      <main>
        {/* Hero oficial */}
        <section className="relative overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,rgba(122,12,20,.45),transparent_60%)]">
          <div className="pointer-events-none absolute -right-6 -top-12 select-none">
            <OutlineText
              strokeColor="rgba(193,18,31,.15)"
              className="text-[min(28vw,300px)] leading-none"
            >
              TOP 10
            </OutlineText>
          </div>
          <Reveal
            onScroll={false}
            className="relative mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-20 md:px-12"
          >
            <h1 className="font-display text-5xl uppercase leading-[.95] text-cream md:text-[72px]">
              {t("title")} <span className="text-blood">{t("titleAccent")}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="border border-blood/40 bg-surface px-3.5 py-2 font-mono text-[11px] text-cream/60">
                {view.updatedLine}
              </span>
              <span className="font-condensed text-sm uppercase tracking-[.24em] text-cream/55">
                {view.officialNote}
              </span>
            </div>
          </Reveal>
        </section>

        <PoundForPoundSection entries={view.poundForPound} newLabel={view.labels.newBadge} />

        <Section width="lg">
          <RankingsBoard view={view} />
        </Section>
      </main>
      <Footer compact />
    </>
  );
}

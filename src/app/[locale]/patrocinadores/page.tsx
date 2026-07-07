import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { sponsorTiers } from "@/data/sponsors";
import type { Locale } from "@/data/types";
import { L } from "@/lib/localize";
import { Footer } from "@/components/layout/Footer";
import { OutlineText } from "@/components/ui/OutlineText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SponsorForm } from "@/components/forms/SponsorForm";

interface SponsorsPageProps {
  params: Promise<{ locale: string }>;
}

/** Métricas de alcance para el pitch (placeholder hasta tener datos reales). */
const reachStats = [
  { key: "statAttendance", value: "20,500+" },
  { key: "statPpv", value: "2.1M" },
  { key: "statSocial", value: "3.4M" },
] as const;

const SPONSOR_LOGO_SLOTS = 6;

/** /patrocinadores — pitch de alcance, paquetes y contacto comercial. */
export default async function SponsorsPage({ params }: SponsorsPageProps) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);

  const t = await getTranslations("sponsorsPage");
  const locale = (await getLocale()) as Locale;

  return (
    <>
      <main>
        <section className="relative overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,rgba(122,12,20,.5),transparent_60%)]">
          <div className="pointer-events-none absolute -right-8 -top-8 select-none">
            <OutlineText
              strokeColor="rgba(193,18,31,.14)"
              className="text-[min(22vw,260px)] leading-none"
            >
              UFP
            </OutlineText>
          </div>
          <Reveal
            onScroll={false}
            className="relative mx-auto flex max-w-[1100px] flex-col gap-6 px-6 py-20 md:px-12"
          >
            <span className="font-condensed text-sm uppercase tracking-[.3em] text-blood-hover">
              {t("kicker")}
            </span>
            <h1 className="font-display text-5xl uppercase leading-[.95] text-cream md:text-[72px]">
              {t("title")} <span className="text-blood">{t("titleAccent")}</span>
            </h1>
            <p className="max-w-[640px] text-[15px] leading-relaxed text-cream/65">
              {t("pitch")}
            </p>
            <div className="flex flex-wrap gap-8">
              {reachStats.map(({ key, value }) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="font-display text-[40px] leading-none text-blood">
                    {value}
                  </span>
                  <span className="font-mono text-[11px] tracking-[.14em] text-cream/50">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <Section background="ink-2" width="md">
          <SectionHeading title={t("tiersTitle")} />
          <div className="grid gap-5 lg:grid-cols-3">
            {sponsorTiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col gap-4 border border-blood/40 bg-linear-160 from-surface-warm to-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blood"
              >
                <span className="font-display text-2xl uppercase leading-tight text-cream">
                  {L(tier.name, locale)}
                </span>
                <p className="text-sm leading-relaxed text-cream/60">{L(tier.pitch, locale)}</p>
                <span className="font-condensed text-xs uppercase tracking-[.24em] text-blood">
                  {t("perksLabel")}
                </span>
                <ul className="flex flex-col gap-2">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk.es}
                      className="flex items-baseline gap-2.5 text-sm text-cream/70"
                    >
                      <span className="font-display text-blood">/</span>
                      {L(perk, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section width="md">
          <SectionHeading title={t("currentSponsors")} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {Array.from({ length: SPONSOR_LOGO_SLOTS }, (_, index) => (
              <div
                key={index}
                className="flex h-[70px] items-center justify-center border border-dashed border-cream/20 bg-surface font-mono text-[10px] text-cream/35"
              >
                [ logo ]
              </div>
            ))}
          </div>
        </Section>

        <Section background="ink-2" width="md">
          <SectionHeading title={t("formTitle")} />
          <div className="border border-blood/40 bg-linear-160 from-surface-warm to-surface p-6 md:p-9">
            <SponsorForm />
          </div>
        </Section>
      </main>
      <Footer compact />
    </>
  );
}

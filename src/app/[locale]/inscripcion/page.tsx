import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/lib/seo";
import { Footer } from "@/components/layout/Footer";
import { OutlineText } from "@/components/ui/OutlineText";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ApplicationFormFull } from "@/components/forms/ApplicationFormFull";

interface ApplyPageProps {
  params: Promise<{ locale: string }>;
}

const REQUIREMENT_KEYS = ["req1", "req2", "req3", "req4"] as const;

export async function generateMetadata({ params }: ApplyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "applyPage" });

  return {
    title: `${t("title")} ${t("titleAccent")}`,
    description: t("pitch"),
    alternates: localizedAlternates("/inscripcion", locale),
  };
}

/** /inscripcion — convocatoria abierta con formulario completo de aplicación. */
export default async function ApplyPage({ params }: ApplyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("applyPage");

  return (
    <>
      <main>
        <section className="relative overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,rgba(122,12,20,.5),transparent_60%)]">
          <div className="pointer-events-none absolute -left-6 -top-10 select-none whitespace-nowrap">
            <OutlineText
              strokeColor="rgba(193,18,31,.14)"
              className="text-[min(22vw,260px)] leading-none"
            >
              UFP
            </OutlineText>
          </div>
          <Reveal
            onScroll={false}
            className="relative mx-auto flex max-w-[1100px] flex-col gap-4 px-6 py-20 md:px-12"
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
          </Reveal>
        </section>

        <Section background="ink-2" width="md">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-3xl uppercase text-cream">
                {t("requirements")}
              </h2>
              <ul className="flex flex-col gap-3">
                {REQUIREMENT_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-baseline gap-3 text-[15px] leading-relaxed text-cream/65"
                  >
                    <span className="font-display text-blood-hover">/</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-blood/40 bg-linear-160 from-surface-warm to-surface p-6 md:p-9">
              <ApplicationFormFull />
            </div>
          </div>
        </Section>
      </main>
      <Footer compact />
    </>
  );
}

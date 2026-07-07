import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ApplicationFormMini } from "@/components/forms/ApplicationFormMini";

const SPONSOR_LOGO_SLOTS = 3;

/** Bloque doble: pitch a patrocinadores + convocatoria de peleadores. */
export async function SponsorsApplySection() {
  const t = await getTranslations("sections");

  return (
    <Section background="ink-2">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Patrocinadores */}
        <div id="patrocinadores" className="flex flex-col gap-[22px]">
          <h2 className="font-display text-3xl uppercase text-cream md:text-[40px]">
            {t("sponsors.title")}
          </h2>
          <p className="text-[15px] leading-relaxed text-cream/65">{t("sponsors.pitch")}</p>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: SPONSOR_LOGO_SLOTS }, (_, index) => (
              <div
                key={index}
                className="flex h-[70px] items-center justify-center border border-dashed border-cream/20 bg-surface font-mono text-[10px] text-cream/35"
              >
                [ logo ]
              </div>
            ))}
          </div>
          <CtaButton href="/patrocinadores" variant="outlineRed" className="self-start">
            {t("sponsors.kitCta")}
          </CtaButton>
        </div>

        {/* Inscripción de peleadores */}
        <div
          id="inscripcion"
          className="flex flex-col gap-[22px] border border-blood/40 bg-linear-160 from-surface-warm to-surface p-6 md:p-9"
        >
          <h2 className="font-display text-3xl uppercase text-cream md:text-[40px]">
            {t("apply.title")} <span className="text-blood">{t("apply.titleAccent")}</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-cream/65">{t("apply.pitch")}</p>
          <ApplicationFormMini />
        </div>
      </div>
    </Section>
  );
}

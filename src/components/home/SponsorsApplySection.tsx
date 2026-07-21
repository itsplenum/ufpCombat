import { getTranslations } from "next-intl/server";
import { isEnabled } from "@/data/features";
import { sponsorBrands } from "@/data/sponsors";
import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
import { ApplicationFormMini } from "@/components/forms/ApplicationFormMini";

/** Real sponsor names to preview on the home page; the full grid lives on /patrocinadores. */
const HOME_SPONSOR_COUNT = 6;

/** Two-up block: sponsor pitch + fighter open call. Each half follows its feature flag. */
export async function SponsorsApplySection() {
  const t = await getTranslations("sections");

  const showSponsors = isEnabled("sponsors");
  const showSignup = isEnabled("signup");
  if (!showSponsors && !showSignup) return null;

  const brands = sponsorBrands.slice(0, HOME_SPONSOR_COUNT);

  return (
    <Section background="ink-2">
      <div className={`grid gap-12 ${showSponsors && showSignup ? "lg:grid-cols-2" : ""}`}>
        {showSponsors ? (
          <div id="patrocinadores" className="flex flex-col gap-[22px]">
            <h2 className="font-display text-3xl uppercase text-cream md:text-[40px]">
              {t("sponsors.title")}
            </h2>
            <p className="text-[15px] leading-relaxed text-cream/65">{t("sponsors.pitch")}</p>
            <div className="grid grid-cols-3 gap-3">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-[70px] items-center justify-center border border-cream/20 bg-surface px-2 text-center font-condensed text-xs uppercase leading-tight tracking-[.12em] text-cream/75"
                >
                  {brand.name}
                </div>
              ))}
            </div>
            <CtaButton href="/patrocinadores" variant="outlineRed" className="self-start">
              {t("sponsors.kitCta")}
            </CtaButton>
          </div>
        ) : null}

        {showSignup ? (
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
        ) : null}
      </div>
    </Section>
  );
}

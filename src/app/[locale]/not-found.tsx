import { getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { OutlineText } from "@/components/ui/OutlineText";
import { CtaButton } from "@/components/ui/CtaButton";

/**
 * 404 dentro de un locale válido — slug de peleador/evento inexistente, links
 * viejos, URLs compartidas mal. Renderiza dentro del layout del locale, así que
 * conserva nav, fuentes y footer.
 *
 * Las URLs que no matchean ninguna ruta (locale inválido incluido) las atiende
 * `src/app/global-not-found.tsx`, que no puede depender de este layout.
 */
export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <>
      <main className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,rgba(122,12,20,.45),transparent_60%)]">
        <div className="pointer-events-none absolute -right-6 -top-10 select-none">
          <OutlineText
            strokeColor="rgba(193,18,31,.15)"
            className="text-[clamp(140px,26vw,300px)] leading-none"
          >
            {t("code")}
          </OutlineText>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-6 px-6 py-24">
          <span className="font-condensed text-sm font-bold uppercase tracking-[.24em] text-blood-hover">
            {t("code")}
          </span>
          <h1 className="font-display text-[clamp(44px,9vw,96px)] uppercase leading-[.92] text-cream">
            {t("title")}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-cream/60">{t("body")}</p>
          <CtaButton href="/" size="lg">
            {t("cta")}
          </CtaButton>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { setRequestLocale } from "next-intl/server";
import { Ticker } from "@/components/layout/Ticker";
import { Footer } from "@/components/layout/Footer";
import { OutlineText } from "@/components/ui/OutlineText";
import { CtaButton } from "@/components/ui/CtaButton";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

/** Home — shell temporal de F0; las secciones completas llegan en F1. */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Ticker />
      <main>
        <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_90%_70%_at_50%_110%,rgba(122,12,20,.55),transparent_60%)]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] select-none">
            <OutlineText
              strokeColor="rgba(193,18,31,.22)"
              className="text-[min(38vw,540px)] leading-none"
            >
              UFP
            </OutlineText>
          </div>
          <div className="relative flex flex-col items-center gap-5 text-center">
            <h1 className="animate-flicker font-display text-[min(11vw,150px)] uppercase leading-[.92]">
              <span className="block text-cream">UFP 17</span>
              <span className="block text-blood [text-shadow:0_0_60px_rgba(193,18,31,.5)]">
                Sangre Nueva
              </span>
            </h1>
            <CtaButton href="/#boletos" size="lg">
              Comprar boletos
            </CtaButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

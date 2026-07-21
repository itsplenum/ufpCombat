import { getLocale, getTranslations } from "next-intl/server";
import type { Locale, UFPEvent } from "@/data/types";
import { formatEventDate, formatEventTime } from "@/lib/format";
import { Countdown } from "@/components/event/Countdown";
import { CtaButton } from "@/components/ui/CtaButton";
import { OutlineText } from "@/components/ui/OutlineText";
import { Reveal } from "@/components/ui/Reveal";

interface HeroSectionProps {
  event: UFPEvent;
}

/** Home hero: UFP watermark, event title, live countdown and CTAs. */
export async function HeroSection({ event }: HeroSectionProps) {
  const t = await getTranslations("hero");
  const locale = (await getLocale()) as Locale;

  const dateLine = [
    formatEventDate(event.date, locale),
    formatEventTime(event.date),
    event.venue.name,
    t("disciplines"),
  ].join(" · ");

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_90%_70%_at_50%_110%,rgba(122,12,20,.55),transparent_60%)]"
    >
      {/* Diagonal line texture */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(242,236,228,.02)_0_2px,transparent_2px_14px)]" />

      {/* Giant watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] select-none">
        <OutlineText
          strokeColor="rgba(193,18,31,.22)"
          className="text-[min(38vw,540px)] leading-none"
        >
          UFP
        </OutlineText>
      </div>

      <Reveal onScroll={false} className="relative flex flex-col items-center gap-[18px] px-6 py-16 text-center md:px-12">
        <div className="flex items-center gap-3.5 font-condensed text-[15px] uppercase tracking-[.34em] text-blood-hover">
          <span className="h-px w-11 bg-blood" />
          <span>{t("nextEvent")}</span>
          <span className="h-px w-11 bg-blood" />
        </div>

        <h1 className="animate-flicker font-display text-[min(11vw,150px)] uppercase leading-[.92] tracking-[.01em]">
          <span className="block text-cream">UFP {event.number}</span>
          <span className="block text-blood [text-shadow:0_0_60px_rgba(193,18,31,.5)]">
            {event.title}
          </span>
        </h1>

        <p className="font-condensed text-base uppercase tracking-[.2em] text-cream/70 md:text-xl">
          {dateLine}
        </p>

        <div className="mt-2">
          <Countdown targetIso={event.date} />
        </div>

        <div className="mt-2.5 flex flex-wrap justify-center gap-4">
          <CtaButton href="/#boletos" size="lg">
            {t("buyTickets")}
          </CtaButton>
          <CtaButton href="/#cartelera" variant="outline" size="lg">
            {t("seeCard")}
          </CtaButton>
        </div>
      </Reveal>
    </section>
  );
}

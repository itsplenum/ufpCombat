import { getLocale, getTranslations } from "next-intl/server";
import { getMainFight, isEventUpcoming, resolveCorner } from "@/data";
import type { Locale, UFPEvent } from "@/data/types";
import { formatEventDate } from "@/lib/format";
import { CtaButton } from "@/components/ui/CtaButton";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { DaysRemaining } from "./DaysRemaining";

interface EventHeroProps {
  event: UFPEvent;
}

/** Hero tipo póster: los dos estelares frente a frente con el título del evento al centro. */
export async function EventHero({ event }: EventHeroProps) {
  const tHero = await getTranslations("hero");
  const tEvent = await getTranslations("eventPage");
  const tFight = await getTranslations("fight");
  const locale = (await getLocale()) as Locale;

  const mainFight = getMainFight(event);
  const red = mainFight ? resolveCorner(mainFight.red) : undefined;
  const blue = mainFight ? resolveCorner(mainFight.blue) : undefined;
  const isUpcoming = isEventUpcoming(event);

  // Nombres separados: concatenar y volver a partir por " vs " rompe con
  // cualquier apellido que contenga esa secuencia.
  const redName = red ? (red.fighter?.lastName ?? red.corner.name) : null;
  const blueName = blue ? (blue.fighter?.lastName ?? blue.corner.name) : null;

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden border-b border-blood/35 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(122,12,20,.5),transparent_60%)]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(242,236,228,.02)_0_2px,transparent_2px_14px)]" />

      <Reveal
        onScroll={false}
        className="relative mx-auto grid w-full max-w-[1200px] items-center gap-8 px-6 py-[70px] md:px-12 lg:grid-cols-[1fr_1.2fr_1fr]"
      >
        <PlaceholderImage
          label={`${red?.fighter?.lastName ?? "esquina roja"} — pose frente a frente`}
          variant="red"
          className="hidden h-[440px] -rotate-[1.5deg] border border-blood/35 lg:flex"
        />

        <div className="flex flex-col items-center gap-3.5 text-center">
          <span className="font-condensed text-sm uppercase tracking-[.34em] text-blood-hover">
            {formatEventDate(event.date, locale)} · {event.venue.name}
          </span>
          <h1 className="font-display text-[min(14vw,110px)] uppercase leading-[.92]">
            <span className="block text-cream">UFP {event.number}</span>
            <span className="block text-blood [text-shadow:0_0_60px_rgba(193,18,31,.5)]">
              {event.title}
            </span>
          </h1>
          {redName && blueName ? (
            <div className="font-display text-[22px] uppercase leading-tight text-cream/85">
              {redName} <span className="text-blood">{tFight("vs")}</span> {blueName}
            </div>
          ) : null}
          <span className="font-mono text-xs text-cream/60">
            {mainFight?.isTitleFight ? `${tEvent("championship")} · ` : ""}
            {isUpcoming ? (
              <DaysRemaining targetIso={event.date} />
            ) : (
              tEvent("finished")
            )}
          </span>
          {isUpcoming && event.tickets.length > 0 ? (
            <CtaButton href="#boletos" size="lg">
              {tHero("buyTickets")}
            </CtaButton>
          ) : null}
        </div>

        <PlaceholderImage
          label={`${blue?.fighter?.lastName ?? "esquina azul"} — pose frente a frente`}
          variant="blue"
          className="hidden h-[440px] rotate-[1.5deg] border border-cream/20 lg:flex"
        />
      </Reveal>
    </section>
  );
}

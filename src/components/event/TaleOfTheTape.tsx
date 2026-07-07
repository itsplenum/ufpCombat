import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveCorner } from "@/data";
import type { Fight, Locale } from "@/data/types";
import { formatMeters, formatRecordWithFinish } from "@/lib/format";
import { L } from "@/lib/localize";
import { OutlineText } from "@/components/ui/OutlineText";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface TaleOfTheTapeProps {
  fight: Fight;
}

/**
 * Comparativa de la pelea estelar: foto + placa de cada esquina y
 * stats frente a frente (altura, alcance, edad, guardia).
 */
export async function TaleOfTheTape({ fight }: TaleOfTheTapeProps) {
  const t = await getTranslations("fight");
  const locale = (await getLocale()) as Locale;

  const red = resolveCorner(fight.red);
  const blue = resolveCorner(fight.blue);

  const comparisons =
    red.fighter && blue.fighter
      ? [
          {
            label: t("height"),
            red: formatMeters(red.fighter.stats.heightM),
            blue: formatMeters(blue.fighter.stats.heightM),
          },
          {
            label: t("reach"),
            red: formatMeters(red.fighter.stats.reachM),
            blue: formatMeters(blue.fighter.stats.reachM),
          },
          {
            label: t("age"),
            red: String(red.fighter.stats.age),
            blue: String(blue.fighter.stats.age),
          },
          {
            label: t("stance"),
            red: t(red.fighter.stats.stance),
            blue: t(blue.fighter.stats.stance),
          },
        ]
      : [];

  const redSubtitle = [
    red.fighter ? formatRecordWithFinish(red.fighter.record) : red.corner.recordText,
    fight.red.tag ? L(fight.red.tag, locale) : null,
    t("viewProfile"),
  ]
    .filter(Boolean)
    .join(" · ");

  const blueSubtitle = [
    blue.fighter ? formatRecordWithFinish(blue.fighter.record) : blue.corner.recordText,
    fight.blue.tag ? L(fight.blue.tag, locale) : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="grid items-stretch gap-8 md:grid-cols-[1fr_auto_1fr]">
      {/* Esquina roja */}
      <div className="flex flex-col text-right">
        <PlaceholderImage
          label={`foto ${red.corner.name} — esquina roja`}
          variant="red"
          className="h-[340px] border border-blood/35"
        />
        <Link
          href={red.corner.slug ? `/peleador/${red.corner.slug}` : "/#peleadores"}
          className="block bg-blood px-5 py-4 transition-colors hover:bg-blood-hover"
        >
          <div className="font-display text-2xl uppercase leading-none text-ink md:text-[32px]">
            {red.corner.name}
          </div>
          <div className="font-condensed text-[15px] uppercase tracking-[.16em] text-ink/70">
            {redSubtitle}
          </div>
        </Link>
      </div>

      {/* Centro: VS + stats comparadas */}
      <div className="flex flex-col items-center justify-center gap-2">
        <OutlineText strokeWidth="1.5px" className="text-[64px]">
          {t("vs")}
        </OutlineText>
        <div className="flex flex-col gap-1.5 text-center font-mono text-xs text-cream/55">
          {comparisons.map(({ label, red: redValue, blue: blueValue }) => (
            <span key={label}>
              {redValue} — {label.toUpperCase()} — {blueValue}
            </span>
          ))}
        </div>
      </div>

      {/* Esquina azul */}
      <div className="flex flex-col">
        <PlaceholderImage
          label={`foto ${blue.corner.name} — esquina azul`}
          variant="blue"
          className="h-[340px] border border-cream/20"
        />
        {blue.corner.slug ? (
          <Link
            href={`/peleador/${blue.corner.slug}`}
            className="block bg-cream px-5 py-4 transition-colors hover:bg-blood-hover"
          >
            <div className="font-display text-2xl uppercase leading-none text-ink md:text-[32px]">
              {blue.corner.name}
            </div>
            <div className="font-condensed text-[15px] uppercase tracking-[.16em] text-ink/60">
              {blueSubtitle}
            </div>
          </Link>
        ) : (
          <div className="bg-cream px-5 py-4">
            <div className="font-display text-2xl uppercase leading-none text-ink md:text-[32px]">
              {blue.corner.name}
            </div>
            <div className="font-condensed text-[15px] uppercase tracking-[.16em] text-ink/60">
              {blueSubtitle}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

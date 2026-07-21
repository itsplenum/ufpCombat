import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveCorner, type ResolvedCorner } from "@/data";
import type { Fight, Locale } from "@/data/types";
import { formatMeters, formatRecordWithFinish } from "@/lib/format";
import { L } from "@/lib/localize";
import { OutlineText } from "@/components/ui/OutlineText";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface TaleOfTheTapeProps {
  fight: Fight;
}

type Corner = "red" | "blue";

const cornerStyles: Record<
  Corner,
  { photo: string; plate: string; name: string; subtitle: string }
> = {
  // Sobre `bg-blood` el texto va en crema: el ink al 70% quedaba en ~2.3:1.
  red: {
    photo: "border border-blood/35",
    plate: "bg-blood",
    name: "text-cream",
    subtitle: "text-cream/90",
  },
  blue: {
    photo: "border border-cream/20",
    plate: "bg-cream",
    name: "text-ink",
    subtitle: "text-ink/60",
  },
};

/** "18-2-0 · 14 KO · CAMPEÓN" — récord del roster o texto suelto del rival externo. */
function cornerSubtitle(resolved: ResolvedCorner, locale: Locale): string {
  const record = resolved.fighter
    ? formatRecordWithFinish(resolved.fighter.record)
    : resolved.corner.recordText;
  const tag = resolved.corner.tag ? L(resolved.corner.tag, locale) : null;
  return [record, tag].filter(Boolean).join(" · ");
}

/**
 * Placa con el nombre de una esquina. Es link al perfil solo si el peleador
 * está en el roster — ambas esquinas se comportan igual.
 */
function CornerPlate({
  resolved,
  corner,
  subtitle,
  viewProfileLabel,
}: {
  resolved: ResolvedCorner;
  corner: Corner;
  subtitle: string;
  viewProfileLabel: string;
}) {
  const styles = cornerStyles[corner];
  const { slug, name } = resolved.corner;

  const content = (
    <>
      <div
        className={`font-display text-2xl uppercase leading-none md:text-[32px] ${styles.name}`}
      >
        {name}
      </div>
      <div
        className={`font-condensed text-[15px] uppercase tracking-[.16em] ${styles.subtitle}`}
      >
        {slug ? [subtitle, viewProfileLabel].filter(Boolean).join(" · ") : subtitle}
      </div>
    </>
  );

  if (!slug) {
    return <div className={`${styles.plate} px-5 py-4`}>{content}</div>;
  }

  return (
    <Link
      href={`/peleador/${slug}`}
      className={`block ${styles.plate} px-5 py-4 transition-colors hover:bg-blood-hover`}
    >
      {content}
    </Link>
  );
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

  const viewProfileLabel = t("viewProfile");

  return (
    <div className="grid items-stretch gap-8 md:grid-cols-[1fr_auto_1fr]">
      {/* Esquina roja */}
      <div className="flex flex-col text-right">
        <PlaceholderImage
          label={`foto ${red.corner.name} — esquina roja`}
          variant="red"
          className={`h-[340px] ${cornerStyles.red.photo}`}
        />
        <CornerPlate
          resolved={red}
          corner="red"
          subtitle={cornerSubtitle(red, locale)}
          viewProfileLabel={viewProfileLabel}
        />
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
          className={`h-[340px] ${cornerStyles.blue.photo}`}
        />
        <CornerPlate
          resolved={blue}
          corner="blue"
          subtitle={cornerSubtitle(blue, locale)}
          viewProfileLabel={viewProfileLabel}
        />
      </div>
    </div>
  );
}

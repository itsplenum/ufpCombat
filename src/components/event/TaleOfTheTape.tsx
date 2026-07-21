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
  // On `bg-blood` the text has to be cream: ink at 70% only reached ~2.3:1.
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

/** "18-2-0 · 14 KO · CAMPEÓN" — roster record, or free-form text for an outside opponent. */
function cornerSubtitle(resolved: ResolvedCorner, locale: Locale): string {
  const record = resolved.fighter
    ? formatRecordWithFinish(resolved.fighter.record)
    : resolved.corner.recordText;
  const tag = resolved.corner.tag ? L(resolved.corner.tag, locale) : null;
  return [record, tag].filter(Boolean).join(" · ");
}

/**
 * Name plate for one corner. Links to the profile only if the fighter is on
 * the roster — both corners behave the same way.
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
 * Main-event comparison: photo + name plate for each corner and
 * head-to-head stats (height, reach, age, stance).
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
      {/* Red corner */}
      <div className="flex flex-col text-right">
        <PlaceholderImage
          label={`foto ${red.corner.name} — esquina roja`}
          src={red.corner.photo ?? red.fighter?.photoFull}
          alt={red.corner.name}
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

      {/* Center: VS + compared stats */}
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

      {/* Blue corner */}
      <div className="flex flex-col">
        <PlaceholderImage
          label={`foto ${blue.corner.name} — esquina azul`}
          src={blue.corner.photo ?? blue.fighter?.photoFull}
          alt={blue.corner.name}
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

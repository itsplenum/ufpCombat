import { getTranslations } from "next-intl/server";
import type { FighterRecord } from "@/data/types";

interface RecordBarProps {
  record: FighterRecord;
}

/** Barra de récord del perfil: victorias / derrotas / KO (rojo) / sumisión. */
export async function RecordBar({ record }: RecordBarProps) {
  const t = await getTranslations("fighterPage");

  const cells = [
    { value: record.wins, label: t("wins") },
    { value: record.losses, label: t("losses") },
    { value: record.koTko, label: t("koTko"), highlighted: true },
    { value: record.submissions, label: t("submissions") },
  ];

  return (
    <div className="flex border border-cream/15">
      {cells.map(({ value, label, highlighted }, index) => (
        <div
          key={label}
          className={`flex flex-1 flex-col items-center gap-0.5 px-2.5 py-4 ${
            index < cells.length - 1 ? "border-r border-cream/15" : ""
          }`}
        >
          <span
            className={`font-display text-[34px] ${highlighted ? "text-blood" : "text-cream"}`}
          >
            {value}
          </span>
          <span className="text-center font-condensed text-xs uppercase tracking-[.2em] text-cream/60">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

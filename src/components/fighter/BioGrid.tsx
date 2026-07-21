import { getTranslations } from "next-intl/server";
import type { FighterStats } from "@/data/types";
import { formatMeters } from "@/lib/format";

interface BioGridProps {
  stats: FighterStats;
}

/** Fighter's physical stats and background, in monospace. */
export async function BioGrid({ stats }: BioGridProps) {
  const tBio = await getTranslations("fighterPage");
  const tFight = await getTranslations("fight");

  const entries = [
    { label: tBio("height"), value: formatMeters(stats.heightM) },
    { label: tBio("reach"), value: formatMeters(stats.reachM) },
    { label: tBio("age"), value: String(stats.age) },
    { label: tBio("stance"), value: tFight(stats.stance).toUpperCase() },
    { label: tBio("weight"), value: `${stats.weightKg}kg` },
    { label: tBio("gym"), value: stats.gym },
    { label: tBio("origin"), value: stats.origin },
    { label: tBio("debut"), value: String(stats.debutYear) },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-7 gap-y-2.5 font-mono text-xs text-cream/60 md:grid-cols-4">
      {entries.map(({ label, value }) => (
        <span key={label}>
          {label} — {value}
        </span>
      ))}
    </div>
  );
}

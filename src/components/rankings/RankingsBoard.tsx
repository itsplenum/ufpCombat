"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Discipline } from "@/data/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { MovementBadge } from "./MovementBadge";
import type { ContenderView, DivisionRankingView, RankingsView } from "./buildRankingsView";

type DisciplineFilter = "all" | Discipline;

interface RankingsBoardProps {
  view: RankingsView;
}

function ContenderRow({
  contender,
  labels,
  showLastFight,
}: {
  contender: ContenderView;
  labels: RankingsView["labels"];
  showLastFight: boolean;
}) {
  const name = contender.href ? (
    <Link href={contender.href} className="transition-colors hover:text-blood-hover">
      {contender.name}
    </Link>
  ) : (
    contender.name
  );

  return (
    <div
      className={`grid items-center gap-3 border-b border-cream/10 px-4 py-3 transition-colors hover:bg-blood/8 ${
        showLastFight
          ? "grid-cols-[32px_44px_1fr_90px] md:grid-cols-[40px_54px_1fr_110px_1fr]"
          : "grid-cols-[32px_44px_1fr_90px] md:grid-cols-[40px_54px_1fr_110px]"
      }`}
    >
      <span className="font-display text-lg text-cream/55">{contender.rank}</span>
      <MovementBadge movement={contender.movement} newLabel={labels.newBadge} />
      <span className="font-display text-lg uppercase text-cream md:text-xl">{name}</span>
      <span className="font-mono text-xs text-blood-hover">{contender.record}</span>
      {showLastFight ? (
        <span className="hidden font-mono text-[11px] text-cream/65 md:block">
          {contender.lastFight ?? ""}
        </span>
      ) : null}
    </div>
  );
}

function TableHeader({
  labels,
  showLastFight,
}: {
  labels: RankingsView["labels"];
  showLastFight: boolean;
}) {
  return (
    <div
      className={`grid gap-3 border-b border-blood/40 px-4 pb-2 font-condensed text-[11px] uppercase tracking-[.24em] text-cream/65 ${
        showLastFight
          ? "grid-cols-[32px_44px_1fr_90px] md:grid-cols-[40px_54px_1fr_110px_1fr]"
          : "grid-cols-[32px_44px_1fr_90px] md:grid-cols-[40px_54px_1fr_110px]"
      }`}
    >
      <span>{labels.colRank}</span>
      <span>{labels.colMovement}</span>
      <span>{labels.colFighter}</span>
      <span>{labels.colRecord}</span>
      {showLastFight ? <span className="hidden md:block">{labels.colLastFight}</span> : null}
    </div>
  );
}

function ChampionSpotlight({
  division,
  labels,
}: {
  division: DivisionRankingView;
  labels: RankingsView["labels"];
}) {
  if (!division.champion) {
    const topContender = division.contenders[0];

    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 border border-dashed border-blood/40 bg-surface p-6 text-center">
        <span className="font-display text-[28px] uppercase text-blood [text-shadow:0_0_40px_rgba(193,18,31,.4)]">
          {labels.vacantTitle}
        </span>
        {topContender ? (
          <span className="font-mono text-[11px] text-cream/65">#1 — {topContender.name}</span>
        ) : null}
      </div>
    );
  }

  const { champion } = division;

  return (
    <Link
      href={champion.href}
      className="group flex h-full flex-col border border-blood/40 bg-linear-160 from-surface-warm to-surface transition-colors hover:border-blood"
    >
      <PlaceholderImage
        label={`foto ${champion.name}`}
        variant="red"
        className="h-[180px] border-b border-blood/30"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="self-start bg-blood px-2.5 py-1 font-condensed text-[11px] font-bold uppercase tracking-[.24em] text-cream">
          {labels.champion}
        </span>
        <span className="font-display text-[28px] uppercase leading-none text-cream">
          {champion.nickname ? `"${champion.nickname}" ` : ""}
          {champion.name}
        </span>
        <span className="font-mono text-xs text-blood-hover">{champion.recordLine}</span>
        <span className="font-condensed text-sm uppercase tracking-[.14em] text-cream/55">
          {champion.defensesLine}
        </span>
        {champion.nextFightLine ? (
          <span className="font-mono text-[11px] text-cream/65">{champion.nextFightLine}</span>
        ) : null}
        <span className="mt-auto font-condensed text-sm font-bold uppercase tracking-[.2em] text-blood-hover transition-colors group-hover:text-cream">
          {labels.viewProfile}
        </span>
      </div>
    </Link>
  );
}

/** Full rankings board with a client-side discipline filter. */
export function RankingsBoard({ view }: RankingsBoardProps) {
  const [filter, setFilter] = useState<DisciplineFilter>("all");

  const tabs: { id: DisciplineFilter; label: string }[] = [
    { id: "all", label: view.labels.filterAll },
    { id: "mma", label: view.labels.filterMma },
    { id: "boxing", label: view.labels.filterBoxing },
  ];

  const visibleDivisions = view.divisions.filter(
    (division) => filter === "all" || division.discipline === filter,
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Discipline filter */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            aria-pressed={filter === tab.id}
            className={`cursor-pointer px-6 py-2.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] transition-colors ${
              filter === tab.id
                ? "clip-cta-sm bg-blood text-cream"
                : "border border-cream/20 text-cream/60 hover:border-blood hover:text-blood-hover"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {visibleDivisions.map((division) => (
        <div key={division.id} id={division.id} className="scroll-mt-20">
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            <div className="flex flex-col gap-4">
              <h3 className="font-display text-[26px] uppercase leading-tight text-cream">
                {division.name}
              </h3>
              <ChampionSpotlight division={division} labels={view.labels} />
            </div>
            <div className="flex flex-col self-start">
              <TableHeader labels={view.labels} showLastFight />
              {division.contenders.map((contender) => (
                <ContenderRow
                  key={contender.rank}
                  contender={contender}
                  labels={view.labels}
                  showLastFight
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

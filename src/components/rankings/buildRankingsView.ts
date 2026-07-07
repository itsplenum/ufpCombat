import { getLocale, getTranslations } from "next-intl/server";
import { getDivision, getFighter, getNextFightFor } from "@/data";
import { divisionRankings, poundForPound, rankingsUpdatedAt } from "@/data/rankings";
import type { Discipline, Locale, RankedContender, RankMovement } from "@/data/types";
import { formatDateBadge, formatEventDate, formatRecordWithFinish } from "@/lib/format";
import { L } from "@/lib/localize";

/**
 * View-model de /rankings: todo localizado y resuelto en servidor para que
 * el board cliente (filtro por disciplina) solo reciba strings serializables.
 */

export interface ContenderView {
  rank: number;
  name: string;
  record: string;
  movement: RankMovement;
  lastFight?: string;
  href?: string;
}

export interface ChampionView {
  name: string;
  nickname?: string;
  recordLine: string;
  defensesLine: string;
  href: string;
  nextFightLine?: string;
}

export interface DivisionRankingView {
  id: string;
  discipline: Discipline;
  name: string;
  champion?: ChampionView;
  contenders: ContenderView[];
}

export interface RankingsView {
  updatedLine: string;
  officialNote: string;
  poundForPound: ContenderView[];
  divisions: DivisionRankingView[];
  labels: {
    champion: string;
    vacantTitle: string;
    colRank: string;
    colFighter: string;
    colRecord: string;
    colLastFight: string;
    colMovement: string;
    newBadge: string;
    viewProfile: string;
    filterAll: string;
    filterMma: string;
    filterBoxing: string;
  };
}

function toContenderView(contender: RankedContender, locale: Locale): ContenderView {
  return {
    rank: contender.rank,
    name: contender.name,
    record: contender.record,
    movement: contender.movement,
    lastFight: contender.lastFight ? L(contender.lastFight, locale) : undefined,
    href: contender.slug ? `/peleador/${contender.slug}` : undefined,
  };
}

export async function buildRankingsView(): Promise<RankingsView> {
  const t = await getTranslations("rankingsPage");
  const locale = (await getLocale()) as Locale;

  const divisions: DivisionRankingView[] = divisionRankings.map((ranking) => {
    const division = getDivision(ranking.divisionId);
    const champion = ranking.championSlug ? getFighter(ranking.championSlug) : undefined;

    let championView: ChampionView | undefined;
    if (champion) {
      const nextFight = getNextFightFor(champion.slug);
      championView = {
        name: `${champion.firstName} ${champion.lastName}`,
        nickname: champion.nickname,
        recordLine: formatRecordWithFinish(champion.record),
        defensesLine: t("defenses", { count: ranking.defenses }),
        href: `/peleador/${champion.slug}`,
        nextFightLine: nextFight
          ? t("nextFightLine", {
              line: `vs. ${nextFight.opponent.name} · UFP ${nextFight.event.number} · ${formatEventDate(nextFight.event.date, locale)}`,
            })
          : undefined,
      };
    }

    return {
      id: ranking.divisionId,
      discipline: division?.discipline ?? "mma",
      name: division ? L(division.name, locale) : ranking.divisionId,
      champion: championView,
      contenders: ranking.contenders.map((contender) => toContenderView(contender, locale)),
    };
  });

  return {
    updatedLine: t("updatedLine", { date: formatDateBadge(rankingsUpdatedAt, locale) }),
    officialNote: t("officialNote"),
    poundForPound: poundForPound.map((entry) => toContenderView(entry, locale)),
    divisions,
    labels: {
      champion: t("champion"),
      vacantTitle: t("vacantTitle"),
      colRank: t("colRank"),
      colFighter: t("colFighter"),
      colRecord: t("colRecord"),
      colLastFight: t("colLastFight"),
      colMovement: t("colMovement"),
      newBadge: t("new"),
      viewProfile: t("viewProfile"),
      filterAll: t("filterAll"),
      filterMma: t("filterMma"),
      filterBoxing: t("filterBoxing"),
    },
  };
}

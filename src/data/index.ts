import { formatEventDate } from "@/lib/format";
import { divisions } from "./divisions";
import { events } from "./events";
import { fighters } from "./fighters";
import { divisionRankings } from "./rankings";
import { tickerPhrases } from "./site";
import type {
  Division,
  DivisionRanking,
  Fight,
  FightCorner,
  Fighter,
  Locale,
  UFPEvent,
} from "./types";

/**
 * Selectores de contenido — único punto de acceso a los datos.
 * Para migrar a un CMS headless solo hay que volver async estas funciones.
 */

export function getAllFighters(): Fighter[] {
  return fighters;
}

export function getFighter(slug: string): Fighter | undefined {
  return fighters.find((fighter) => fighter.slug === slug);
}

export function getAllEvents(): UFPEvent[] {
  return events;
}

export function getEvent(slug: string): UFPEvent | undefined {
  return events.find((event) => event.slug === slug);
}

/**
 * Un evento es "próximo" mientras su fecha no haya pasado. La fecha manda:
 * así la home no se congela esperando que alguien edite `events.ts` a mano.
 * `status: "past"` funciona como override manual para archivar un evento
 * antes de tiempo (cancelado, pospuesto sin fecha nueva).
 */
export function isEventUpcoming(event: UFPEvent): boolean {
  return event.status !== "past" && new Date(event.date).getTime() > Date.now();
}

/** Próximo evento (el de fecha más cercana entre los que aún no ocurrieron). */
export function getUpcomingEvent(): UFPEvent | undefined {
  return events
    .filter(isEventUpcoming)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}

/** Eventos ya ocurridos (o archivados a mano), del más reciente al más antiguo. */
export function getPastEvents(): UFPEvent[] {
  return events
    .filter((event) => !isEventUpcoming(event))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Último evento realizado — fallback de la home cuando no hay nada agendado. */
export function getLatestPastEvent(): UFPEvent | undefined {
  return getPastEvents()[0];
}

/** Pelea estelar de un evento (order 0). */
export function getMainFight(event: UFPEvent): Fight | undefined {
  return event.fights.find((fight) => fight.order === 0);
}

export function getDivision(id: string): Division | undefined {
  return divisions.find((division) => division.id === id);
}

export function getDivisionRankings(): DivisionRanking[] {
  return divisionRankings;
}

/**
 * Mensajes del ticker superior: el anuncio del próximo evento se deriva del
 * propio evento (número, título, fecha y sede viven solo en `events.ts`),
 * seguido de las frases fijas de `site.ts`.
 */
export function getTickerMessages(locale: Locale): string[] {
  const upcomingEvent = getUpcomingEvent();
  if (!upcomingEvent) return tickerPhrases;

  const announcement = [
    `UFP ${upcomingEvent.number}`,
    upcomingEvent.title,
    formatEventDate(upcomingEvent.date, locale),
    upcomingEvent.venue.name,
  ].join(" · ");

  return [announcement, ...tickerPhrases];
}

/** Esquina resuelta contra el roster para render (récord + link a perfil). */
export interface ResolvedCorner {
  corner: FightCorner;
  fighter?: Fighter;
}

export function resolveCorner(corner: FightCorner): ResolvedCorner {
  return {
    corner,
    fighter: corner.slug ? getFighter(corner.slug) : undefined,
  };
}

/** Próxima pelea agendada de un peleador (para la banda "Próxima pelea" del perfil). */
export function getNextFightFor(
  fighterSlug: string,
): { event: UFPEvent; fight: Fight; opponent: FightCorner } | undefined {
  for (const event of events.filter(isEventUpcoming)) {
    for (const fight of event.fights) {
      if (fight.red.slug === fighterSlug) {
        return { event, fight, opponent: fight.blue };
      }
      if (fight.blue.slug === fighterSlug) {
        return { event, fight, opponent: fight.red };
      }
    }
  }
  return undefined;
}

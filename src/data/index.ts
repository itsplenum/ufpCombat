import { divisions } from "./divisions";
import { events } from "./events";
import { fighters } from "./fighters";
import { divisionRankings } from "./rankings";
import type {
  Division,
  DivisionRanking,
  Fight,
  FightCorner,
  Fighter,
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

/** Próximo evento (el de fecha más cercana entre los upcoming). */
export function getUpcomingEvent(): UFPEvent | undefined {
  return events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}

/** Eventos pasados, del más reciente al más antiguo. */
export function getPastEvents(): UFPEvent[] {
  return events
    .filter((event) => event.status === "past")
    .sort((a, b) => b.date.localeCompare(a.date));
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
  for (const event of events.filter((e) => e.status === "upcoming")) {
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

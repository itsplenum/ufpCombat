import { formatEventDate } from "@/lib/format";
import { divisions } from "./divisions";
import { isEnabled } from "./features";
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
 * Content selectors — the single point of access to the data.
 * Migrating to a headless CMS only requires making these functions async.
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
 * An event counts as upcoming as long as its date has not passed. The date is
 * what decides, so the home page never goes stale waiting for someone to edit
 * `events.ts` by hand. `status: "past"` acts as a manual override to archive an
 * event early (cancelled, or postponed with no new date).
 */
export function isEventUpcoming(event: UFPEvent): boolean {
  return event.status !== "past" && new Date(event.date).getTime() > Date.now();
}

/** The next event (the soonest one among those that have not happened yet). */
export function getUpcomingEvent(): UFPEvent | undefined {
  return events
    .filter(isEventUpcoming)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
}

/** Events that already took place (or were archived by hand), newest first. */
export function getPastEvents(): UFPEvent[] {
  return events
    .filter((event) => !isEventUpcoming(event))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Events the site is allowed to show. With results switched off the archive is
 * hidden, so only what is still ahead remains browsable.
 */
export function getBrowsableEvents(): UFPEvent[] {
  return isEnabled("results") ? events : events.filter(isEventUpcoming);
}

/** Most recent event held — the home page falls back to it when nothing is scheduled. */
export function getLatestPastEvent(): UFPEvent | undefined {
  return getPastEvents()[0];
}

/**
 * Bouts that are cleared to be shown publicly. Drafts are matchups that exist
 * in the data but are not confirmed yet, so nothing on the site may surface
 * them — always read a card through this, never `event.fights` directly.
 */
export function getPublishedFights(event: UFPEvent): Fight[] {
  return event.fights.filter((fight) => !fight.draft);
}

/** Main event of a card (order 0). */
export function getMainFight(event: UFPEvent): Fight | undefined {
  return getPublishedFights(event).find((fight) => fight.order === 0);
}

export function getDivision(id: string): Division | undefined {
  return divisions.find((division) => division.id === id);
}

export function getDivisionRankings(): DivisionRanking[] {
  return divisionRankings;
}

/**
 * Messages for the top ticker: the announcement of the next event is derived
 * from the event itself (number, title, date and venue live only in
 * `events.ts`), followed by the fixed phrases from `site.ts`.
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

/** A corner resolved against the roster for rendering (record + profile link). */
export interface ResolvedCorner {
  corner: FightCorner;
  fighter?: Fighter;
}

/**
 * Resolves a corner against the roster.
 *
 * With the roster switched off there are no profile pages, so the slug is
 * dropped here — the single place that decides whether a corner links
 * anywhere. Without this, fight cards would keep linking to /peleador/... and
 * every one of those links would 404.
 */
export function resolveCorner(corner: FightCorner): ResolvedCorner {
  if (!isEnabled("roster")) {
    return {
      corner: {
        name: corner.name,
        recordText: corner.recordText,
        tag: corner.tag,
        photo: corner.photo,
      },
    };
  }

  return {
    corner,
    fighter: corner.slug ? getFighter(corner.slug) : undefined,
  };
}

/** A fighter's next scheduled bout (for the "Próxima pelea" band on their profile). */
export function getNextFightFor(
  fighterSlug: string,
): { event: UFPEvent; fight: Fight; opponent: FightCorner } | undefined {
  for (const event of events.filter(isEventUpcoming)) {
    for (const fight of getPublishedFights(event)) {
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

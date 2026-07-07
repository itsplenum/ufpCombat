/**
 * Modelos de datos del sitio UFP.
 *
 * Estos tipos son la "fuente de la verdad" del contenido: los shapes vienen
 * de los prototipos del handoff de diseño y están pensados para mapear 1:1
 * a un CMS headless en el futuro (solo habría que volver async los
 * selectores de `data/index.ts`).
 */

export type Locale = "es" | "en";

/** Copy que cambia por idioma. Nombres de marca (eventos, apodos) NO se localizan. */
export type Localized = { es: string; en: string };

export type Discipline = "mma" | "boxing";

export type Stance = "orthodox" | "southpaw";

export interface FighterRecord {
  wins: number;
  losses: number;
  draws: number;
  koTko: number;
  submissions: number;
}

export interface FighterStats {
  heightM: number;
  reachM: number;
  age: number;
  stance: Stance;
  weightKg: number;
  gym: string;
  origin: string;
  debutYear: number;
}

export type FightOutcome = "W" | "L" | "D";

export interface FightHistoryEntry {
  outcome: FightOutcome;
  opponentName: string;
  /** Presente solo si el rival está en el roster (habilita el link al perfil). */
  opponentSlug?: string;
  method: Localized;
  eventName: string;
  eventSlug?: string;
  /** ISO YYYY-MM-DD */
  date: string;
}

export interface VideoClip {
  title: Localized;
  duration: string;
  url?: string;
}

export interface Fighter {
  slug: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  /** Nombre corto para cards y cartelera, ej. '"El Verdugo" Ríos'. */
  shortName: string;
  discipline: Discipline;
  /** Referencia a RankingDivision.id */
  divisionId: string;
  record: FighterRecord;
  stats: FighterStats;
  isChampion: boolean;
  /** Posición como retador (si aplica). */
  rank?: number;
  history: FightHistoryEntry[];
  videos: VideoClip[];
  /** Sin foto ⇒ se renderiza PlaceholderImage con rayas. */
  photoFull?: string;
  photoBust?: string;
}

export interface FightResult {
  /** null = empate / sin decisión */
  winnerSlug: string | null;
  method: Localized;
  round?: number;
  time?: string;
  /** Resumen para cards de resultados, ej. "Ríos vence a Herrera por KO — R3". */
  summary: Localized;
}

export interface Fight {
  id: string;
  /** Posición en la cartelera: 0 = pelea estelar. */
  order: number;
  /** Ej. "Estelar · Título", "Co-estelar", "Boxeo 10R". */
  label: Localized;
  discipline: Discipline;
  /** Ej. "MMA · Wélter · 5R". */
  divisionLabel: Localized;
  rounds: number;
  isTitleFight: boolean;
  redSlug: string;
  blueSlug: string;
  /** Ej. "CAMPEÓN" / "#1". */
  redTag?: Localized;
  blueTag?: Localized;
  /** Solo en eventos pasados. */
  result?: FightResult;
}

export interface TicketTier {
  id: string;
  zone: string;
  price: number;
  currency: "MXN";
  perks: Localized;
  featured?: boolean;
  soldOut?: boolean;
}

export interface Venue {
  name: string;
  address: Localized;
  capacity: number;
  doorsOpen: string;
  broadcast: Localized;
  mapImage?: string;
}

export type EventStatus = "upcoming" | "past";

export interface EventScheduleItem {
  time: string;
  label: Localized;
}

export interface UFPEvent {
  slug: string;
  number: number;
  /** Subtítulo de marca, ej. "Sangre Nueva" — no se localiza. */
  title: string;
  status: EventStatus;
  /** ISO con zona horaria — target del countdown. */
  date: string;
  venue: Venue;
  schedule: EventScheduleItem[];
  fights: Fight[];
  tickets: TicketTier[];
  /** Destacado del evento (para cards de resultados de eventos pasados). */
  highlight?: { summary: Localized; videoDuration?: string };
}

/** Movimiento en el ranking desde la última actualización. */
export type RankMovement = number | "new";

export interface RankedContender {
  rank: number;
  /** Presente solo si el peleador está en el roster. */
  slug?: string;
  name: string;
  /** Récord como texto, ej. "21-1-0" (retadores fuera del roster no tienen objeto Fighter). */
  record: string;
  movement: RankMovement;
}

export interface RankingDivision {
  id: string;
  name: Localized;
  discipline: Discipline;
  /** null ⇒ título vacante. */
  championSlug: string | null;
  /** Defensas del título del campeón actual. */
  defenses: number;
  contenders: RankedContender[];
}

export interface PoundForPoundRanking {
  updatedAt: string;
  entries: RankedContender[];
}

export type ProductCategory = "apparel" | "accessories" | "collectible";

export interface Product {
  slug: string;
  name: Localized;
  price: number;
  currency: "MXN";
  category: ProductCategory;
  image?: string;
}

export interface SponsorTier {
  id: string;
  name: Localized;
  pitch: Localized;
  perks: Localized[];
}

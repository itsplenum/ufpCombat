/**
 * Data models for the UFP site.
 *
 * These types are the source of truth for content: the shapes come from the
 * design handoff prototypes and are meant to map 1:1 onto a headless CMS later
 * on (all it would take is making the selectors in `data/index.ts` async).
 */

export type Locale = "es" | "en";

/** Copy that changes per language. Brand names (events, nicknames) are NOT localized. */
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
  /** Set only when the opponent is on the roster (enables the link to their profile). */
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
  /** Short name for cards and the fight card, e.g. '"El Verdugo" Ríos'. */
  shortName: string;
  discipline: Discipline;
  /** Reference to Division.id */
  divisionId: string;
  record: FighterRecord;
  stats: FighterStats;
  isChampion: boolean;
  /** Contender position (when applicable). */
  rank?: number;
  history: FightHistoryEntry[];
  videos: VideoClip[];
  /** No photo ⇒ PlaceholderImage renders its stripes instead. */
  photoFull?: string;
  photoBust?: string;
}

export interface FightResult {
  /** Winning corner; null = draw / no decision. */
  winner: "red" | "blue" | null;
  method: Localized;
  round?: number;
  time?: string;
  /** Summary for result cards, e.g. "Ríos vence a Herrera por KO — R3". */
  summary: Localized;
}

/**
 * One corner of a fight. With a `slug` it resolves against the roster (record
 * and profile link); without one it is an outside opponent contributing only a
 * name and a record.
 */
export interface FightCorner {
  slug?: string;
  name: string;
  /** Record as plain text, for opponents who are not on the roster. */
  recordText?: string;
  /** E.g. "CAMPEÓN" / "#1". */
  tag?: Localized;
}

export interface Fight {
  id: string;
  /** Slot on the fight card: 0 = main event. */
  order: number;
  /** E.g. "Estelar · Título", "Co-estelar", "Boxeo 10R". */
  label: Localized;
  discipline: Discipline;
  /** E.g. "MMA · Wélter · 5R". */
  divisionLabel: Localized;
  rounds: number;
  isTitleFight: boolean;
  red: FightCorner;
  blue: FightCorner;
  /** Past events only. */
  result?: FightResult;
}

export interface TicketTier {
  id: string;
  zone: string;
  price: number;
  currency: "COP";
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
  /** Brand subtitle, e.g. "Sangre Nueva" — not localized. */
  title: string;
  status: EventStatus;
  /** ISO string with a time zone offset — the countdown target. */
  date: string;
  venue: Venue;
  schedule: EventScheduleItem[];
  fights: Fight[];
  tickets: TicketTier[];
  /** Event highlight (used by result cards for past events). */
  highlight?: { summary: Localized; videoDuration?: string };
}

/** Weight division — its own entity so fighters and rankings can reference it. */
export interface Division {
  id: string;
  /** E.g. "Peso Wélter · MMA". */
  name: Localized;
  /** For compact cards, e.g. "Wélter" / "Boxeo Mediano". */
  shortName: Localized;
  discipline: Discipline;
}

/** Movement in the rankings since the committee's last update. */
export type RankMovement = number | "new";

export interface RankedContender {
  rank: number;
  /** Set only when the fighter is on the roster. */
  slug?: string;
  name: string;
  /** Record as plain text, e.g. "21-1-0" (contenders outside the roster have no Fighter object). */
  record: string;
  movement: RankMovement;
  /** Last fight, e.g. "G — KO vs. Herrera · UFP 5". */
  lastFight?: Localized;
}

export interface DivisionRanking {
  divisionId: string;
  /** null ⇒ vacant title. */
  championSlug: string | null;
  /** Title defenses by the current champion. */
  defenses: number;
  contenders: RankedContender[];
}

export type ProductCategory = "apparel" | "accessories" | "collectible";

export interface Product {
  slug: string;
  name: Localized;
  price: number;
  currency: "COP";
  category: ProductCategory;
  image?: string;
}

export interface SponsorTier {
  id: string;
  name: Localized;
  pitch: Localized;
  perks: Localized[];
}

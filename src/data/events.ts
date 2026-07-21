import type { TicketTier, UFPEvent, Venue } from "./types";

/**
 * Real venue for UFP 6, taken from the official poster.
 * TODO(owner): confirm the street address and the venue capacity — the poster
 * gives neither, so both are left out rather than guessed.
 */
const monasterioClub: Venue = {
  name: "Monasterio Club",
  address: {
    es: "Granada, Meta. El evento arranca a las 8:00 p.m.",
    en: "Granada, Meta, Colombia. Doors from 8:00 PM.",
  },
  doorsOpen: "20:00",
};

const ufp6Tickets: TicketTier[] = [
  {
    id: "general",
    zone: "General",
    price: 80000,
    currency: "COP",
    perks: {
      es: "Gradas superiores. La fiesta completa.",
      en: "Upper stands. The full party.",
    },
  },
  {
    id: "preferente",
    zone: "Preferente",
    price: 150000,
    currency: "COP",
    perks: {
      es: "Vista lateral privilegiada del octágono.",
      en: "Prime side view of the octagon.",
    },
  },
  {
    id: "ringside",
    zone: "Ringside",
    price: 350000,
    currency: "COP",
    perks: {
      es: "A metros de la acción. Salpica.",
      en: "Feet from the action. It splashes.",
    },
  },
  {
    id: "vip-cage",
    zone: "VIP Cage",
    price: 750000,
    currency: "COP",
    perks: {
      es: "Primera fila + acceso backstage + meet & greet.",
      en: "Front row + backstage access + meet & greet.",
    },
    featured: true,
  },
];

/** UFP events. Adding a new event = adding one object here. */
export const events: UFPEvent[] = [
  {
    slug: "ufp-6",
    number: 6,
    title: "Champions",
    status: "upcoming",
    date: "2026-08-07T20:00:00-05:00",
    venue: monasterioClub,
    // Straight from the poster: an 8:00 PM start, live music and a special
    // guest. TODO(owner): confirm the running order of fights vs. music.
    schedule: [
      { time: "20:00", label: { es: "Arranca la noche", en: "Doors / show starts" } },
      { time: "—", label: { es: "Peleas en vivo · Boxeo y MMA", en: "Live fights · Boxing & MMA" } },
      { time: "—", label: { es: "Música en vivo · Corridos bélicos", en: "Live music · Corridos bélicos" } },
      { time: "—", label: { es: "Invitado especial MB · Bailarinas · DJ", en: "Special guest MB · Dancers · DJ" } },
    ],
    /**
     * Real lineup announced on the UFP 6 poster: ten fighters, five per side.
     *
     * TODO(owner) — the poster does NOT state any of this, so it is provisional:
     *   1. WHO FIGHTS WHOM. Pairings below follow the poster's left-to-right
     *      order (1st left vs 1st right). Confirm before going public.
     *   2. Which bouts are boxing and which are MMA (the poster only says the
     *      card mixes both). Everything is tagged `mma` as a placeholder.
     *   3. Weight divisions, number of rounds, and which bout is the main event.
     * Division and round labels are omitted on purpose rather than invented.
     */
    fights: [
      {
        id: "ufp6-fight-1",
        order: 0,
        label: { es: "Pelea estelar", en: "Main event" },
        discipline: "mma",
        isTitleFight: false,
        red: { name: "Garzón Palma" },
        blue: { name: "Carlos Bravo" },
      },
      {
        id: "ufp6-fight-2",
        order: 1,
        label: { es: "Co-estelar", en: "Co-main" },
        discipline: "mma",
        isTitleFight: false,
        red: { name: "El Zurdo" },
        blue: { name: "Lobo" },
      },
      {
        id: "ufp6-fight-3",
        order: 2,
        label: { es: "Cartelera principal", en: "Main card" },
        discipline: "mma",
        isTitleFight: false,
        red: { name: "Zuluaga" },
        blue: { name: "Medina" },
      },
      {
        id: "ufp6-fight-4",
        order: 3,
        label: { es: "Cartelera principal", en: "Main card" },
        discipline: "mma",
        isTitleFight: false,
        red: { name: "Psicópata" },
        blue: { name: "Ochoa" },
      },
      {
        id: "ufp6-fight-5",
        order: 4,
        label: { es: "Apertura", en: "Opener" },
        discipline: "mma",
        isTitleFight: false,
        red: { name: "Leo Wi" },
        blue: { name: "Orozco" },
      },
    ],
    tickets: ufp6Tickets,
  },
  {
    slug: "ufp-5",
    number: 5,
    title: "Juicio Final",
    status: "past",
    date: "2026-05-23T20:00:00-05:00",
    venue: monasterioClub,
    schedule: [],
    fights: [
      {
        id: "ufp5-main",
        order: 0,
        label: { es: "Estelar · Título", en: "Main event · Title" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Wélter · 5R", en: "MMA · Welterweight · 5R" },
        rounds: 5,
        isTitleFight: true,
        red: {
          slug: "marco-rios",
          name: '"El Verdugo" Marco Ríos',
          tag: { es: "CAMPEÓN", en: "CHAMPION" },
        },
        blue: { slug: "andres-herrera", name: "Andrés Herrera" },
        result: {
          winner: "red",
          method: { es: "KO — golpes", en: "KO — punches" },
          round: 3,
          time: "2:14",
          summary: {
            es: "Ríos vence a Herrera por KO — R3",
            en: "Ríos defeats Herrera by KO — R3",
          },
        },
      },
      {
        id: "ufp5-colead",
        order: 1,
        label: { es: "Co-estelar", en: "Co-main" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Ligero · 3R", en: "MMA · Lightweight · 3R" },
        rounds: 3,
        isTitleFight: false,
        red: { slug: "adrian-vega", name: '"La Pantera" Vega' },
        blue: { name: "Rodrigo Fuentes", recordText: "14-5-0" },
        result: {
          winner: "red",
          method: { es: "Sumisión — triángulo", en: "Submission — triangle" },
          round: 2,
          summary: {
            es: "Vega somete a Fuentes — triángulo, R2",
            en: "Vega submits Fuentes — triangle, R2",
          },
        },
      },
      {
        id: "ufp5-boxing",
        order: 2,
        label: { es: "Boxeo 10R", en: "Boxing 10R" },
        discipline: "boxing",
        divisionLabel: { es: "Boxeo · Mediano · 10R", en: "Boxing · Middleweight · 10R" },
        rounds: 10,
        isTitleFight: false,
        red: { slug: "tyrone-bell", name: "Tyrone Bell" },
        blue: { name: "Saúl García", recordText: "17-6-0" },
        result: {
          winner: "red",
          method: { es: "Decisión mayoritaria", en: "Majority decision" },
          summary: {
            es: "Bell vence a García por decisión mayoritaria",
            en: "Bell defeats García by majority decision",
          },
        },
      },
      {
        id: "ufp5-prelim",
        order: 3,
        label: { es: "Preliminar", en: "Prelim" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Pluma · 3R", en: "MMA · Featherweight · 3R" },
        rounds: 3,
        isTitleFight: false,
        red: { slug: "bruno-salazar", name: "Bruno Salazar" },
        blue: { name: "Álvaro Pinto", recordText: "6-3-0" },
        result: {
          winner: "red",
          method: { es: "KO — rodilla voladora", en: "KO — flying knee" },
          round: 1,
          summary: {
            es: "Salazar noquea a Pinto — rodilla voladora, R1",
            en: "Salazar knocks out Pinto — flying knee, R1",
          },
        },
      },
      {
        id: "ufp5-opener",
        order: 4,
        label: { es: "Apertura", en: "Opener" },
        discipline: "boxing",
        divisionLabel: { es: "Boxeo · Wélter · 8R", en: "Boxing · Welterweight · 8R" },
        rounds: 8,
        isTitleFight: false,
        red: { slug: "luca-moretti", name: "Luca Moretti" },
        blue: { name: "Owen Doyle", recordText: "9-4-0" },
        result: {
          winner: "red",
          method: { es: "KO — recto de derecha", en: "KO — straight right" },
          round: 5,
          summary: {
            es: "Moretti noquea a Doyle — R5",
            en: "Moretti knocks out Doyle — R5",
          },
        },
      },
    ],
    tickets: [],
    highlight: {
      summary: {
        es: "Ríos vence a Herrera por KO — R3",
        en: "Ríos defeats Herrera by KO — R3",
      },
      videoDuration: "04:12",
    },
  },
  {
    slug: "ufp-4",
    number: 4,
    title: "Territorio",
    status: "past",
    date: "2026-03-14T20:00:00-05:00",
    venue: monasterioClub,
    schedule: [],
    fights: [
      {
        id: "ufp4-main",
        order: 0,
        label: { es: "Estelar", en: "Main event" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Paja Fem. · 5R", en: "MMA · W. Strawweight · 5R" },
        rounds: 5,
        isTitleFight: false,
        red: { slug: "sofia-mendoza", name: 'Sofía "Reina" Mendoza' },
        blue: { name: "Valeria López", recordText: "11-2-0" },
        result: {
          winner: "red",
          method: { es: "Decisión unánime", en: "Unanimous decision" },
          summary: {
            es: "Mendoza vence a López por decisión unánime",
            en: "Mendoza defeats López by unanimous decision",
          },
        },
      },
      {
        id: "ufp4-colead",
        order: 1,
        label: { es: "Co-estelar", en: "Co-main" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Wélter · 3R", en: "MMA · Welterweight · 3R" },
        rounds: 3,
        isTitleFight: false,
        red: { slug: "dmitri-volkov", name: 'Dmitri "Iron" Volkov' },
        blue: { name: "Javier Castillo", recordText: "13-4-0" },
        result: {
          winner: "red",
          method: { es: "Decisión unánime", en: "Unanimous decision" },
          summary: {
            es: "Volkov vence a Castillo por decisión unánime",
            en: "Volkov defeats Castillo by unanimous decision",
          },
        },
      },
      {
        id: "ufp4-boxing",
        order: 2,
        label: { es: "Boxeo 8R", en: "Boxing 8R" },
        discipline: "boxing",
        divisionLabel: { es: "Boxeo · Wélter · 8R", en: "Boxing · Welterweight · 8R" },
        rounds: 8,
        isTitleFight: false,
        red: { slug: "diego-paz", name: 'Diego "El Toro" Paz' },
        blue: { name: "Felipe Rocha", recordText: "12-3-0" },
        result: {
          winner: "red",
          method: { es: "KO — cruzado de izquierda", en: "KO — left cross" },
          round: 3,
          summary: {
            es: "Paz noquea a Rocha — R3",
            en: "Paz knocks out Rocha — R3",
          },
        },
      },
    ],
    tickets: [],
    highlight: {
      summary: {
        es: "Mendoza vence a López por decisión unánime",
        en: "Mendoza defeats López by unanimous decision",
      },
      videoDuration: "03:37",
    },
  },
  {
    slug: "ufp-3",
    number: 3,
    title: "Fuego Cruzado",
    status: "past",
    date: "2026-01-17T20:00:00-05:00",
    venue: monasterioClub,
    schedule: [],
    fights: [
      {
        id: "ufp3-main",
        order: 0,
        label: { es: "Estelar · Título", en: "Main event · Title" },
        discipline: "boxing",
        divisionLabel: { es: "Boxeo · Mediano · 12R", en: "Boxing · Middleweight · 12R" },
        rounds: 12,
        isTitleFight: true,
        red: {
          slug: "ivan-cruz",
          name: 'Iván "Dinamita" Cruz',
          tag: { es: "CAMPEÓN", en: "CHAMPION" },
        },
        blue: { name: "Marcus Okafor", recordText: "21-2-0" },
        result: {
          winner: "red",
          method: { es: "TKO — esquina detiene", en: "TKO — corner stoppage" },
          round: 7,
          summary: {
            es: "Cruz vence a Okafor por TKO — R7",
            en: "Cruz defeats Okafor by TKO — R7",
          },
        },
      },
      {
        id: "ufp3-colead",
        order: 1,
        label: { es: "Co-estelar", en: "Co-main" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Wélter · 3R", en: "MMA · Welterweight · 3R" },
        rounds: 3,
        isTitleFight: false,
        red: { slug: "marco-rios", name: '"El Verdugo" Marco Ríos' },
        blue: { name: "Jordan Blake", recordText: "15-3-0" },
        result: {
          winner: "red",
          method: { es: "TKO — paro médico", en: "TKO — doctor stoppage" },
          round: 2,
          summary: {
            es: "Ríos vence a Blake por TKO — R2",
            en: "Ríos defeats Blake by TKO — R2",
          },
        },
      },
      {
        id: "ufp3-prelim",
        order: 2,
        label: { es: "Preliminar", en: "Prelim" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Paja Fem. · 3R", en: "MMA · W. Strawweight · 3R" },
        rounds: 3,
        isTitleFight: false,
        red: { slug: "anna-kovacs", name: "Anna Kovács" },
        blue: { name: "Marta Silva", recordText: "7-4-0" },
        result: {
          winner: "red",
          method: { es: "Sumisión — mataleón", en: "Submission — rear-naked choke" },
          round: 2,
          summary: {
            es: "Kovács somete a Silva — mataleón, R2",
            en: "Kovács submits Silva — rear-naked choke, R2",
          },
        },
      },
    ],
    tickets: [],
    highlight: {
      summary: {
        es: "Cruz vence a Okafor por TKO — R7",
        en: "Cruz defeats Okafor by TKO — R7",
      },
      videoDuration: "05:08",
    },
  },
];

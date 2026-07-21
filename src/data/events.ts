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

/**
 * Real UFP 6 ticketing, straight from the official price graphic. Prices are
 * per box/table (except the single seat), which the perks make explicit so no
 * one reads a group price as per-head. Ordered so the three ringside boxes
 * fill the first row and the two VIP tables the second.
 */
const ufp6Tickets: TicketTier[] = [
  {
    id: "palco-6",
    zone: "Palco · 6 personas",
    price: 450000,
    currency: "COP",
    perks: {
      es: "A 1 m de la jaula. Precio del palco completo.",
      en: "1 m from the cage. Price for the whole box.",
    },
    featured: true,
  },
  {
    id: "palco-4",
    zone: "Palco · 4 personas",
    price: 300000,
    currency: "COP",
    perks: {
      es: "A 1 m de la jaula. Precio del palco completo.",
      en: "1 m from the cage. Price for the whole box.",
    },
  },
  {
    id: "palco-1",
    zone: "Palco · 1 persona",
    price: 100000,
    currency: "COP",
    perks: {
      es: "A 1 m de la jaula. Puesto individual.",
      en: "1 m from the cage. Single seat.",
    },
  },
  {
    id: "vip-oro",
    zone: "VIP Oro · 4 personas",
    price: 200000,
    currency: "COP",
    perks: {
      es: "A 2,5 m de la jaula. Precio de la mesa (4).",
      en: "2.5 m from the cage. Price for the table (4).",
    },
  },
  {
    id: "vip-plata",
    zone: "VIP Plata · 4 personas",
    price: 100000,
    currency: "COP",
    perks: {
      es: "A 3,5 m de la jaula. Precio de la mesa (4).",
      en: "3.5 m from the cage. Price for the table (4).",
    },
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
     * UFP 6 lineup. Only the main event is confirmed: Leo Wi vs Carlos Bravo.
     *
     * The other four bouts are DRAFTS (`draft: true`) — the poster announces
     * the ten fighters but not the matchups, so these pairings are guesses kept
     * for reference only. They are filtered out of everything public by
     * `getPublishedFights()`; flip `draft` off as each one is confirmed.
     *
     * TODO(owner): confirm the remaining matchups, which bouts are boxing vs
     * MMA (all tagged `mma` for now), weight classes and round counts.
     */
    fights: [
      {
        id: "ufp6-main",
        order: 0,
        label: { es: "Pelea estelar", en: "Main event" },
        discipline: "mma",
        isTitleFight: false,
        red: { name: "Leo Wi" },
        blue: { name: "Carlos Bravo", photo: "/fighters/carlos-bravo.png" },
      },
      {
        id: "ufp6-draft-1",
        order: 1,
        label: { es: "Por confirmar", en: "TBA" },
        discipline: "mma",
        isTitleFight: false,
        draft: true,
        red: { name: "Garzón Palma" },
        blue: { name: "Lobo" },
      },
      {
        id: "ufp6-draft-2",
        order: 2,
        label: { es: "Por confirmar", en: "TBA" },
        discipline: "mma",
        isTitleFight: false,
        draft: true,
        red: { name: "El Zurdo" },
        blue: { name: "Medina" },
      },
      {
        id: "ufp6-draft-3",
        order: 3,
        label: { es: "Por confirmar", en: "TBA" },
        discipline: "mma",
        isTitleFight: false,
        draft: true,
        red: { name: "Zuluaga" },
        blue: { name: "Ochoa" },
      },
      {
        id: "ufp6-draft-4",
        order: 4,
        label: { es: "Por confirmar", en: "TBA" },
        discipline: "mma",
        isTitleFight: false,
        draft: true,
        red: { name: "Psicópata" },
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

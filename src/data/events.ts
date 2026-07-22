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
  {
    id: "general",
    zone: "General",
    price: 30000,
    currency: "COP",
    perks: {
      es: "Entrada general. La opción más económica.",
      en: "General admission. The most affordable option.",
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
    // Entertainment timeline from the official run-of-show. The bouts (with
    // weight and discipline) live in `fights`; this band lists only the show
    // blocks so times aren't duplicated across the two.
    schedule: [
      { time: "20:40", label: { es: "Lucha de brazo", en: "Arm wrestling" } },
      { time: "23:10", label: { es: "MB · Invitado especial", en: "MB · Special guest" } },
      { time: "23:20", label: { es: "MB con bailarinas", en: "MB with dancers" } },
      { time: "23:30", label: { es: "Zonder", en: "Zonder" } },
      { time: "23:45", label: { es: "Apocalipto & King Ryan", en: "Apocalipto & King Ryan" } },
      { time: "00:00", label: { es: "DJ · Lucha de brazo", en: "DJ · Arm wrestling" } },
      { time: "02:10", label: { es: "Show de bailarinas", en: "Dancers show" } },
      { time: "02:30", label: { es: "MB", en: "MB" } },
      { time: "02:45", label: { es: "DJ", en: "DJ" } },
    ],
    /**
     * UFP 6 full card, from the official run-of-show. `order` runs from the
     * main event (0) down the bill; `time` is the scheduled start. Six bouts
     * carry a promo `poster` (the home fight-card grid renders those). The
     * poster art uses ring names for some fighters (e.g. "El Zurdo", "Lobo");
     * the data here uses the official names from the schedule — same fighters.
     */
    fights: [
      {
        id: "ufp6-main",
        order: 0,
        label: { es: "Estelar · Título", en: "Main event · Title" },
        discipline: "mma",
        divisionLabel: { es: "MMA · Título Nacional", en: "MMA · National Title" },
        time: "03:30",
        poster: "/fights/leo-vs-bravo.jpg",
        isTitleFight: true,
        red: {
          name: "Leo Wi",
          photo: "/fighters/leo-wi.jpg",
          tag: { es: "CAMPEÓN", en: "CHAMPION" },
        },
        blue: { name: "Carlos Bravo", photo: "/fighters/carlos-bravo.jpg" },
      },
      {
        id: "ufp6-comain",
        order: 1,
        label: { es: "Co-estelar", en: "Co-main" },
        discipline: "mma",
        divisionLabel: { es: "MMA · 83 kg", en: "MMA · 83 kg" },
        time: "03:00",
        poster: "/fights/pelea2.jpg",
        isTitleFight: false,
        red: { name: "Luis Ramírez" },
        blue: { name: 'Jhon "Psicópata" Gutiérrez' },
      },
      {
        id: "ufp6-espinosa-leon",
        order: 2,
        label: { es: "Preliminar", en: "Prelim" },
        discipline: "mma",
        divisionLabel: { es: "MMA · 61 kg", en: "MMA · 61 kg" },
        time: "01:35",
        poster: "/fights/pelea6.jpg",
        isTitleFight: false,
        red: { name: "Yon Espinosa" },
        blue: { name: "Óscar León" },
      },
      {
        id: "ufp6-quintero-duque",
        order: 3,
        label: { es: "Preliminar", en: "Prelim" },
        discipline: "mma",
        divisionLabel: { es: "MMA · 54 kg", en: "MMA · 54 kg" },
        time: "01:15",
        isTitleFight: false,
        red: { name: "Juan David Quintero" },
        blue: { name: "Emmanuel Duque" },
      },
      {
        id: "ufp6-medina-zuluaga",
        order: 4,
        label: { es: "Preliminar", en: "Prelim" },
        discipline: "mma",
        divisionLabel: { es: "MMA · 66 kg", en: "MMA · 66 kg" },
        time: "00:50",
        poster: "/fights/pelea3.jpg",
        isTitleFight: false,
        red: { name: "Maicol Medina" },
        blue: { name: "Alejandro Zuluaga" },
      },
      {
        id: "ufp6-yepes-garzon",
        order: 5,
        label: { es: "Preliminar", en: "Prelim" },
        discipline: "mma",
        divisionLabel: { es: "MMA · 63 kg", en: "MMA · 63 kg" },
        time: "00:30",
        poster: "/fights/pelea5.jpg",
        isTitleFight: false,
        red: { name: "Jorge Yepes" },
        blue: { name: "Garzón Palma" },
      },
      {
        id: "ufp6-arango-linares",
        order: 6,
        label: { es: "Boxeo", en: "Boxing" },
        discipline: "boxing",
        divisionLabel: { es: "Boxeo", en: "Boxing" },
        time: "22:45",
        poster: "/fights/pelea1.jpg",
        isTitleFight: false,
        red: { name: "Andrés Arango" },
        blue: { name: "Kevin Linares" },
      },
      {
        id: "ufp6-aranguren-birray",
        order: 7,
        label: { es: "Boxeo", en: "Boxing" },
        discipline: "boxing",
        divisionLabel: { es: "Boxeo · 65 kg", en: "Boxing · 65 kg" },
        time: "22:20",
        isTitleFight: false,
        red: { name: "Camilo Aranguren" },
        blue: { name: "Birray" },
      },
      {
        id: "ufp6-suarez-ochoa",
        order: 8,
        label: { es: "Apertura", en: "Opener" },
        discipline: "mma",
        divisionLabel: { es: "MMA · 70 kg", en: "MMA · 70 kg" },
        time: "22:00",
        poster: "/fights/pelea4.jpg",
        isTitleFight: false,
        red: { name: "Jhon Suárez" },
        blue: { name: "Gallego Ochoa" },
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

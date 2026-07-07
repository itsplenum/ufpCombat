import type { DivisionRanking, RankedContender } from "./types";

/**
 * Rankings oficiales UFP — actualizados por el comité tras cada evento.
 * Última actualización: día siguiente a UFP 16.
 */
export const rankingsUpdatedAt = "2026-05-24";

/**
 * Libra por libra: los mejores del roster sin importar división.
 */
export const poundForPound: RankedContender[] = [
  { rank: 1, slug: "marco-rios", name: "Marco Ríos", record: "18-2-0", movement: 0 },
  { rank: 2, slug: "ivan-cruz", name: "Iván Cruz", record: "24-2-1", movement: 0 },
  { rank: 3, slug: "dmitri-volkov", name: "Dmitri Volkov", record: "21-1-0", movement: 1 },
  { rank: 4, slug: "sofia-mendoza", name: "Sofía Mendoza", record: "9-0-0", movement: 1 },
  { rank: 5, slug: "adrian-vega", name: "Adrián Vega", record: "12-3-0", movement: -2 },
  { rank: 6, slug: "tyrone-bell", name: "Tyrone Bell", record: "19-3-1", movement: 0 },
  { rank: 7, slug: "diego-paz", name: "Diego Paz", record: "11-0-0", movement: 2 },
  { rank: 8, slug: "andres-herrera", name: "Andrés Herrera", record: "16-4-0", movement: -1 },
  { rank: 9, slug: "kenji-nakamura", name: "Kenji Nakamura", record: "15-4-0", movement: -1 },
  { rank: 10, slug: "bruno-salazar", name: "Bruno Salazar", record: "7-1-0", movement: "new" },
];

/** Rankings por división. El orden define el orden de render en /rankings. */
export const divisionRankings: DivisionRanking[] = [
  {
    divisionId: "mma-welter",
    championSlug: "marco-rios",
    defenses: 2,
    contenders: [
      {
        rank: 1,
        slug: "dmitri-volkov",
        name: "Dmitri Volkov",
        record: "21-1-0",
        movement: 1,
        lastFight: { es: "G — Dec. vs. Castillo · UFP 15", en: "W — Dec. vs. Castillo · UFP 15" },
      },
      {
        rank: 2,
        slug: "andres-herrera",
        name: "Andrés Herrera",
        record: "16-4-0",
        movement: -1,
        lastFight: { es: "P — KO vs. Ríos · UFP 16", en: "L — KO vs. Ríos · UFP 16" },
      },
      {
        rank: 3,
        name: "Javier Castillo",
        record: "13-4-0",
        movement: 0,
        lastFight: { es: "P — Dec. vs. Volkov · UFP 15", en: "L — Dec. vs. Volkov · UFP 15" },
      },
      { rank: 4, name: "Rafael Duarte", record: "14-3-0", movement: 1 },
      { rank: 5, name: "Caio Ferreira", record: "16-5-0", movement: -1 },
      { rank: 6, name: "Jordan Blake", record: "15-3-0", movement: 0 },
      { rank: 7, name: "Émile Girard", record: "11-2-0", movement: 2 },
      { rank: 8, name: "Tomás Aguirre", record: "12-4-0", movement: 0 },
      { rank: 9, name: "Miguel Santos", record: "13-6-0", movement: -2 },
      { rank: 10, name: "Piotr Nowak", record: "9-1-0", movement: "new" },
    ],
  },
  {
    divisionId: "mma-lightweight",
    championSlug: null,
    defenses: 0,
    contenders: [
      {
        rank: 1,
        slug: "adrian-vega",
        name: "Adrián Vega",
        record: "12-3-0",
        movement: 0,
        lastFight: { es: "G — Sum. vs. Fuentes · UFP 16", en: "W — Sub. vs. Fuentes · UFP 16" },
      },
      {
        rank: 2,
        slug: "kenji-nakamura",
        name: "Kenji Nakamura",
        record: "15-4-0",
        movement: 0,
        lastFight: { es: "P — Dec. vs. Fuentes · UFP 13", en: "L — Dec. vs. Fuentes · UFP 13" },
      },
      {
        rank: 3,
        name: "Rodrigo Fuentes",
        record: "14-5-0",
        movement: -1,
        lastFight: { es: "P — Sum. vs. Vega · UFP 16", en: "L — Sub. vs. Vega · UFP 16" },
      },
      { rank: 4, name: "Danny Okoye", record: "10-2-0", movement: 0 },
      { rank: 5, name: "Facundo Lima", record: "11-3-0", movement: 1 },
      { rank: 6, name: "Aleksi Virtanen", record: "9-2-0", movement: -1 },
      { rank: 7, name: "Théo Lambert", record: "12-5-0", movement: 0 },
      { rank: 8, name: "Santiago Rueda", record: "8-2-0", movement: 1 },
      { rank: 9, name: "Cole Bennett", record: "10-4-0", movement: -1 },
      { rank: 10, name: "Ferran Costa", record: "7-1-0", movement: "new" },
    ],
  },
  {
    divisionId: "box-middleweight",
    championSlug: "ivan-cruz",
    defenses: 3,
    contenders: [
      {
        rank: 1,
        slug: "tyrone-bell",
        name: "Tyrone Bell",
        record: "19-3-1",
        movement: 0,
        lastFight: { es: "G — Dec. vs. García · UFP 16", en: "W — Dec. vs. García · UFP 16" },
      },
      {
        rank: 2,
        name: "Marcus Okafor",
        record: "21-2-0",
        movement: 0,
        lastFight: { es: "P — TKO vs. Cruz · UFP 14", en: "L — TKO vs. Cruz · UFP 14" },
      },
      {
        rank: 3,
        name: "Saúl García",
        record: "17-6-0",
        movement: -1,
        lastFight: { es: "P — Dec. vs. Bell · UFP 16", en: "L — Dec. vs. Bell · UFP 16" },
      },
      { rank: 4, name: "Héctor Manzano", record: "15-2-0", movement: 1 },
      { rank: 5, name: "Andrej Kovač", record: "18-4-0", movement: 0 },
      { rank: 6, name: "Deon Walker", record: "14-3-0", movement: 0 },
      { rank: 7, name: "Rubén Peralta", record: "12-2-0", movement: 2 },
      { rank: 8, name: "Giorgio Ferri", record: "16-5-1", movement: -1 },
      { rank: 9, name: "Amir Rahimi", record: "11-1-0", movement: "new" },
      { rank: 10, name: "Clyde Morrison", record: "13-4-0", movement: -2 },
    ],
  },
  {
    divisionId: "mma-strawweight-w",
    championSlug: null,
    defenses: 0,
    contenders: [
      {
        rank: 1,
        slug: "sofia-mendoza",
        name: "Sofía Mendoza",
        record: "9-0-0",
        movement: 0,
        lastFight: { es: "G — Dec. vs. López · UFP 15", en: "W — Dec. vs. López · UFP 15" },
      },
      {
        rank: 2,
        slug: "anna-kovacs",
        name: "Anna Kovács",
        record: "8-2-0",
        movement: 1,
        lastFight: { es: "G — Sum. vs. Silva · UFP 14", en: "W — Sub. vs. Silva · UFP 14" },
      },
      { rank: 3, name: "Valeria López", record: "11-2-0", movement: -1 },
      { rank: 4, name: "Marta Silva", record: "7-4-0", movement: 0 },
      { rank: 5, name: "Yuki Tanabe", record: "6-1-0", movement: "new" },
    ],
  },
  {
    divisionId: "mma-featherweight",
    championSlug: null,
    defenses: 0,
    contenders: [
      {
        rank: 1,
        slug: "bruno-salazar",
        name: "Bruno Salazar",
        record: "7-1-0",
        movement: 1,
        lastFight: { es: "G — KO vs. Pinto · UFP 16", en: "W — KO vs. Pinto · UFP 16" },
      },
      {
        rank: 2,
        slug: "jamal-carter",
        name: "Jamal Carter",
        record: "6-1-0",
        movement: -1,
        lastFight: { es: "G — TKO vs. Vidal · UFP 15", en: "W — TKO vs. Vidal · UFP 15" },
      },
      { rank: 3, name: "Álvaro Pinto", record: "6-3-0", movement: 0 },
      { rank: 4, name: "Nico Vidal", record: "8-3-0", movement: 0 },
      { rank: 5, name: "Ilya Petrov", record: "5-0-0", movement: "new" },
    ],
  },
  {
    divisionId: "box-welterweight",
    championSlug: null,
    defenses: 0,
    contenders: [
      {
        rank: 1,
        slug: "diego-paz",
        name: "Diego Paz",
        record: "11-0-0",
        movement: 0,
        lastFight: { es: "G — KO vs. Rocha · UFP 15", en: "W — KO vs. Rocha · UFP 15" },
      },
      {
        rank: 2,
        slug: "luca-moretti",
        name: "Luca Moretti",
        record: "10-2-0",
        movement: 1,
        lastFight: { es: "G — KO vs. Doyle · UFP 16", en: "W — KO vs. Doyle · UFP 16" },
      },
      { rank: 3, name: "Felipe Rocha", record: "12-3-0", movement: -1 },
      { rank: 4, name: "Owen Doyle", record: "9-4-0", movement: 0 },
      { rank: 5, name: "Karim Belkacem", record: "8-1-0", movement: "new" },
    ],
  },
];

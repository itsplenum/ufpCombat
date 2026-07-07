import type { Division } from "./types";

export const divisions: Division[] = [
  {
    id: "mma-welter",
    name: { es: "Peso Wélter · MMA", en: "Welterweight · MMA" },
    shortName: { es: "Wélter", en: "Welterweight" },
    discipline: "mma",
  },
  {
    id: "mma-lightweight",
    name: { es: "Peso Ligero · MMA", en: "Lightweight · MMA" },
    shortName: { es: "Ligero", en: "Lightweight" },
    discipline: "mma",
  },
  {
    id: "mma-featherweight",
    name: { es: "Peso Pluma · MMA", en: "Featherweight · MMA" },
    shortName: { es: "Pluma", en: "Featherweight" },
    discipline: "mma",
  },
  {
    id: "mma-strawweight-w",
    name: { es: "Paja Femenil · MMA", en: "Women's Strawweight · MMA" },
    shortName: { es: "Paja Femenil", en: "W. Strawweight" },
    discipline: "mma",
  },
  {
    id: "box-middleweight",
    name: { es: "Mediano · Boxeo", en: "Middleweight · Boxing" },
    shortName: { es: "Boxeo Mediano", en: "Boxing Middleweight" },
    discipline: "boxing",
  },
  {
    id: "box-welterweight",
    name: { es: "Wélter · Boxeo", en: "Welterweight · Boxing" },
    shortName: { es: "Boxeo Wélter", en: "Boxing Welterweight" },
    discipline: "boxing",
  },
];

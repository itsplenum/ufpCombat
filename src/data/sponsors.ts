import type { SponsorBrand, SponsorTier } from "./types";

/**
 * Official UFP 6 sponsors, read off the event poster.
 *
 * TODO(owner): two logos on the poster were not legible enough to transcribe
 * (an orange circular badge and the rightmost one carrying a phone number) —
 * send the names and they get added here. Logos themselves are still missing:
 * without `logo` the grid falls back to the brand name set in type.
 */
export const sponsorBrands: SponsorBrand[] = [
  { name: "Monasterio", kind: "venue" },
  { name: "Sobre Ruedas", kind: "official" },
  { name: "Passion Fruit", kind: "official" },
  { name: "Kromasol", kind: "official" },
  { name: "La Fonda del Arroz", kind: "official" },
  { name: "Grupo Colsolar", kind: "official" },
  { name: "Bloom X", kind: "official" },
  { name: "Voltios Burger", kind: "official" },
  { name: "Aguardiente Antioqueño", kind: "official" },
  { name: "Somos", kind: "media" },
  { name: "Combatam", kind: "media" },
  { name: "Caray Combat Sports", kind: "media" },
];

/** Sponsorship packages, from largest to smallest. */
export const sponsorTiers: SponsorTier[] = [
  {
    id: "naming",
    name: { es: "Naming del evento", en: "Event naming rights" },
    pitch: {
      es: "Tu marca en el nombre del evento: 'UFP 7 presentado por…'. Presencia total en el evento, redes y campaña.",
      en: "Your brand in the event name: 'UFP 7 presented by…'. Full presence across the event, social and campaign.",
    },
    perks: [
      { es: "Logo en el centro del octágono", en: "Logo at the center of the octagon" },
      { es: "Menciones desde el escenario", en: "Mentions from the stage" },
      { es: "Activaciones en el evento", en: "On-site activations" },
      { es: "Suite VIP + hospitality", en: "VIP suite + hospitality" },
    ],
  },
  {
    id: "octagon",
    name: { es: "Octágono / Ring", en: "Octagon / Ring" },
    pitch: {
      es: "Branding en lona, esquinas y vallas. En cada repetición de KO, ahí está tu marca.",
      en: "Canvas, corner and cage branding. Every KO replay carries your brand.",
    },
    perks: [
      { es: "Logo en lona y esquinas", en: "Canvas and corner logos" },
      { es: "Backdrop de entrevistas", en: "Interview backdrop" },
      { es: "Boletos ringside", en: "Ringside tickets" },
    ],
  },
  {
    id: "official",
    name: { es: "Patrocinador oficial", en: "Official sponsor" },
    pitch: {
      es: "Presencia en pantallas, sitio web, redes y materiales del evento.",
      en: "Presence on screens, website, social media and event materials.",
    },
    perks: [
      { es: "Logo en pantallas del evento", en: "Event screen logos" },
      { es: "Presencia en ufpcombat.com", en: "Presence on ufpcombat.com" },
      { es: "Contenido en redes UFP", en: "UFP social media content" },
    ],
  },
];

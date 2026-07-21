import type { SponsorTier } from "./types";

/** Sponsorship packages, from largest to smallest. */
export const sponsorTiers: SponsorTier[] = [
  {
    id: "naming",
    name: { es: "Naming del evento", en: "Event naming rights" },
    pitch: {
      es: "Tu marca en el nombre del evento: 'UFP 7 presentado por…'. Presencia total en arena, PPV y campaña.",
      en: "Your brand in the event name: 'UFP 7 presented by…'. Full presence across arena, PPV and campaign.",
    },
    perks: [
      { es: "Logo en el centro del octágono", en: "Logo at the center of the octagon" },
      { es: "Menciones en transmisión PPV", en: "PPV broadcast mentions" },
      { es: "Activaciones en la arena", en: "In-arena activations" },
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
      { es: "Logo en pantallas de arena", en: "Arena screen logos" },
      { es: "Presencia en ufpcombat.com", en: "Presence on ufpcombat.com" },
      { es: "Contenido en redes UFP", en: "UFP social media content" },
    ],
  },
];

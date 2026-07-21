import type { Product } from "./types";

/** Official merch catalog. The home page shows the first 4. */
export const products: Product[] = [
  {
    slug: "playera-ufp-6",
    name: { es: "Playera UFP 6 · Sangre Nueva", en: "UFP 6 Tee · Sangre Nueva" },
    price: 90000,
    currency: "COP",
    category: "apparel",
  },
  {
    slug: "hoodie-blackout",
    name: { es: "Hoodie UFP Blackout", en: "UFP Blackout Hoodie" },
    price: 180000,
    currency: "COP",
    category: "apparel",
  },
  {
    slug: "gorra-snapback",
    name: { es: "Gorra Snapback UFP", en: "UFP Snapback Cap" },
    price: 75000,
    currency: "COP",
    category: "accessories",
  },
  {
    slug: "guantes-firmados",
    name: { es: "Guantes réplica firmados", en: "Signed replica gloves" },
    price: 320000,
    currency: "COP",
    category: "collectible",
  },
  {
    slug: "playera-el-verdugo",
    name: { es: 'Playera "El Verdugo" Ríos', en: '"El Verdugo" Ríos Tee' },
    price: 95000,
    currency: "COP",
    category: "apparel",
  },
  {
    slug: "shorts-entrenamiento",
    name: { es: "Shorts de entrenamiento UFP", en: "UFP Training Shorts" },
    price: 120000,
    currency: "COP",
    category: "apparel",
  },
  {
    slug: "toalla-esquina",
    name: { es: "Toalla de esquina UFP", en: "UFP Corner Towel" },
    price: 60000,
    currency: "COP",
    category: "accessories",
  },
  {
    slug: "poster-ufp-6",
    name: { es: "Póster oficial UFP 6 (firmado)", en: "Official UFP 6 Poster (signed)" },
    price: 150000,
    currency: "COP",
    category: "collectible",
  },
];

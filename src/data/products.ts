import type { Product } from "./types";

/** Catálogo de merch oficial. La home muestra los primeros 4. */
export const products: Product[] = [
  {
    slug: "playera-ufp-17",
    name: { es: "Playera UFP 17 · Sangre Nueva", en: "UFP 17 Tee · Sangre Nueva" },
    price: 390,
    currency: "MXN",
    category: "apparel",
  },
  {
    slug: "hoodie-blackout",
    name: { es: "Hoodie UFP Blackout", en: "UFP Blackout Hoodie" },
    price: 890,
    currency: "MXN",
    category: "apparel",
  },
  {
    slug: "gorra-snapback",
    name: { es: "Gorra Snapback UFP", en: "UFP Snapback Cap" },
    price: 340,
    currency: "MXN",
    category: "accessories",
  },
  {
    slug: "guantes-firmados",
    name: { es: "Guantes réplica firmados", en: "Signed replica gloves" },
    price: 1500,
    currency: "MXN",
    category: "collectible",
  },
  {
    slug: "playera-el-verdugo",
    name: { es: 'Playera "El Verdugo" Ríos', en: '"El Verdugo" Ríos Tee' },
    price: 420,
    currency: "MXN",
    category: "apparel",
  },
  {
    slug: "shorts-entrenamiento",
    name: { es: "Shorts de entrenamiento UFP", en: "UFP Training Shorts" },
    price: 560,
    currency: "MXN",
    category: "apparel",
  },
  {
    slug: "toalla-esquina",
    name: { es: "Toalla de esquina UFP", en: "UFP Corner Towel" },
    price: 280,
    currency: "MXN",
    category: "accessories",
  },
  {
    slug: "poster-ufp-17",
    name: { es: "Póster oficial UFP 17 (firmado)", en: "Official UFP 17 Poster (signed)" },
    price: 750,
    currency: "MXN",
    category: "collectible",
  },
];

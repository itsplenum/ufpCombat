/**
 * Primary navigation links. Home sections use `/#anchor` so they work from
 * any page; rankings and shop have routes of their own.
 * The key is the entry in messages under `nav.*`.
 */
export const primaryNavLinks = [
  { key: "event", href: "/#evento" },
  { key: "fightCard", href: "/#cartelera" },
  { key: "fighters", href: "/#peleadores" },
  { key: "rankings", href: "/rankings" },
  { key: "results", href: "/#resultados" },
  { key: "shop", href: "/tienda" },
] as const;

export const footerNavLinks = [
  { key: "event", href: "/#evento" },
  { key: "fightCard", href: "/#cartelera" },
  { key: "shop", href: "/tienda" },
  { key: "signup", href: "/inscripcion", namespace: "footer" },
  { key: "sponsors", href: "/patrocinadores", namespace: "footer" },
] as const;

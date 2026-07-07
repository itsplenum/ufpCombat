/**
 * Links de navegación principales. Las secciones de la home usan `/#ancla`
 * para funcionar desde cualquier página; rankings y tienda tienen ruta propia.
 * La key es la entrada en messages `nav.*`.
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

import { type FeatureName, isEnabled } from "@/data/features";

/**
 * Primary navigation links. Home sections use `/#anchor` so they work from any
 * page; rankings and shop have routes of their own. The key is the entry in
 * messages under `nav.*`.
 *
 * `feature` ties a link to a section flag: when that section is off, the link
 * disappears everywhere it is rendered. Links with no `feature` are always on.
 */
interface NavLink {
  key: string;
  href: string;
  namespace?: string;
  feature?: FeatureName;
}

const primaryLinks: NavLink[] = [
  { key: "event", href: "/#evento" },
  { key: "fightCard", href: "/#cartelera" },
  { key: "fighters", href: "/#peleadores", feature: "roster" },
  { key: "rankings", href: "/rankings", feature: "rankings" },
  { key: "results", href: "/#resultados", feature: "results" },
  { key: "shop", href: "/tienda", feature: "shop" },
];

const footerLinks: NavLink[] = [
  { key: "event", href: "/#evento" },
  { key: "fightCard", href: "/#cartelera" },
  { key: "shop", href: "/tienda", feature: "shop" },
  { key: "signup", href: "/inscripcion", namespace: "footer", feature: "signup" },
  { key: "sponsors", href: "/patrocinadores", namespace: "footer", feature: "sponsors" },
];

function live(links: NavLink[]): NavLink[] {
  return links.filter((link) => !link.feature || isEnabled(link.feature));
}

export const primaryNavLinks = live(primaryLinks);
export const footerNavLinks = live(footerLinks);

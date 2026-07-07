import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { OutlineText } from "@/components/ui/OutlineText";
import { legal } from "@/data/site";
import { L } from "@/lib/localize";
import type { Locale } from "@/data/types";
import { footerNavLinks } from "./navLinks";

interface FooterProps {
  /** Versión reducida para páginas interiores (evento, peleador). */
  compact?: boolean;
}

/** Pie de página: "UFP" outline + nav secundaria + línea legal. */
export async function Footer({ compact = false }: FooterProps) {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const copyright = L(legal.copyright, locale);

  if (compact) {
    return (
      <footer className="border-t border-blood/35 bg-ink p-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <Link href="/">
            <OutlineText className="text-5xl leading-none">UFP</OutlineText>
          </Link>
          <span className="font-mono text-[11px] text-cream/35">{copyright}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-blood/35 bg-ink px-12 pb-10 pt-14">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Link href="/">
            <OutlineText className="text-7xl leading-none">UFP</OutlineText>
          </Link>
          <nav className="flex flex-wrap gap-5 font-condensed text-sm uppercase tracking-[.18em]">
            {footerNavLinks.map(({ key, href, ...link }) => {
              const namespace = "namespace" in link ? link.namespace : "nav";
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-cream/60 transition-colors hover:text-blood-hover"
                >
                  {t(`${namespace}.${key}`)}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 font-mono text-[11px] text-cream/35">
          <span>{copyright}</span>
          <span>ES / EN · {t("footer.contact")}</span>
        </div>
      </div>
    </footer>
  );
}

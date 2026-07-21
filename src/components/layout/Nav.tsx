import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaButton } from "@/components/ui/CtaButton";
import { LanguageToggle } from "./LanguageToggle";
import { NavMobile } from "./NavMobile";
import { primaryNavLinks } from "./navLinks";

/** Sticky navigation bar present on every page. */
export async function Nav() {
  const t = await getTranslations();

  const links = primaryNavLinks.map(({ key, href }) => ({
    href,
    label: t(`nav.${key}`),
  }));

  return (
    <header className="sticky top-0 z-100 flex h-16 items-center gap-7 border-b border-blood/35 bg-ink/88 px-7 backdrop-blur-[12px]">
      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-display text-3xl leading-none tracking-[.02em] text-blood">
          {t("brand.name")}
        </span>
        <span className="hidden font-condensed text-[11px] uppercase tracking-[.32em] text-cream/65 sm:inline">
          {t("brand.tagline")}
        </span>
      </Link>

      <nav className="ml-auto hidden gap-[22px] font-condensed text-[15px] uppercase tracking-[.14em] lg:flex">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-cream/75 transition-colors hover:text-blood-hover"
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:block">
        <LanguageToggle />
      </div>

      <CtaButton href="/#boletos" size="sm" className="hidden lg:inline-block">
        {t("nav.tickets")}
      </CtaButton>

      <NavMobile
        links={links}
        ticketsLabel={t("nav.tickets")}
        openLabel={t("nav.openMenu")}
        closeLabel={t("nav.closeMenu")}
      />
    </header>
  );
}

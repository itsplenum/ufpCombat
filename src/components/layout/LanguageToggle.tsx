"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Par de links ES / EN que conservan la ruta actual al cambiar de idioma. */
export function LanguageToggle() {
  const pathname = usePathname();
  const activeLocale = useLocale();

  return (
    <span className="flex items-center gap-2 font-condensed text-sm uppercase tracking-[.14em]">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 && <span className="text-cream/55">/</span>}
          <Link
            href={pathname}
            locale={locale}
            className={
              locale === activeLocale
                ? "text-blood-hover"
                : "text-cream/60 transition-colors hover:text-cream"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </span>
  );
}

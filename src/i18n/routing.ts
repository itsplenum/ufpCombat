import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Spanish lives at the root (/), English under /en
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];

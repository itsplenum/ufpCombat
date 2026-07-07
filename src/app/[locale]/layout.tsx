import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Anton, Barlow, Barlow_Condensed } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Nav } from "@/components/layout/Nav";
import { site } from "@/data/site";
import "../globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const barlow = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.fullName}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Ultimate Fight Promotions — MMA y Boxeo. Eventos, cartelera, peleadores, rankings oficiales, boletos y PPV.",
  metadataBase: new URL(site.domain),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <Nav />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

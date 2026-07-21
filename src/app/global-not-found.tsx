import type { Metadata } from "next";
import { Anton, Barlow, Barlow_Condensed } from "next/font/google";
import { site } from "@/data/site";
import esMessages from "@/i18n/messages/es.json";
import "./globals.css";

/**
 * 404 para URLs que no matchean ninguna ruta — incluye locales inválidos
 * (`/fr/rankings`), que no llegan a renderizar el layout de `[locale]`.
 *
 * Next saltea el render normal acá, así que este archivo tiene que traer sus
 * propios estilos, fuentes y `<html>`. Por lo mismo no hay contexto de
 * next-intl: los textos salen del locale por defecto (es) leídos directo del
 * JSON, sin `NextIntlClientProvider`.
 */

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const barlow = Barlow({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-barlow" });
const barlowCondensed = Barlow_Condensed({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const t = esMessages.notFound;

export const metadata: Metadata = {
  title: `${t.code} · ${site.name}`,
  description: t.body,
};

export default function GlobalNotFound() {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <main className="flex min-h-screen items-center bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,rgba(122,12,20,.45),transparent_60%)]">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-6 px-6 py-24">
            <span className="font-condensed text-sm font-bold uppercase tracking-[.24em] text-blood-hover">
              {t.code}
            </span>
            <h1 className="font-display text-[clamp(44px,9vw,96px)] uppercase leading-[.92] text-cream">
              {t.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-cream/60">{t.body}</p>
            {/* `<a>` a propósito y no `<Link>`: esta página saltea el render
                normal del App Router, así que conviene una navegación dura. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="clip-cta inline-block bg-blood px-10 py-4 text-center font-condensed text-lg font-bold uppercase tracking-[.2em] text-cream transition-colors duration-200 hover:bg-blood-hover hover:text-ink"
            >
              {t.cta}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}

import { getLocale } from "next-intl/server";
import { getTickerMessages } from "@/data";
import type { Locale } from "@/data/types";

/**
 * Red announcement marquee. The content is duplicated so that the
 * translateX(-50%) animation loops seamlessly.
 */
export async function Ticker() {
  const locale = (await getLocale()) as Locale;
  const messages = getTickerMessages(locale);
  const loop = [...messages, ...messages];

  return (
    <div className="overflow-hidden border-b border-ink bg-blood">
      <div className="flex w-max animate-marquee py-[7px] font-condensed text-sm font-bold uppercase tracking-[.22em] text-cream">
        {loop.map((message, index) => (
          <span key={index} className="flex">
            <span className="px-6">{message}</span>
            <span className="px-6">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

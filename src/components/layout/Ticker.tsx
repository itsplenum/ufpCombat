import { tickerMessages } from "@/data/site";

/**
 * Marquee rojo de anuncios. El contenido se duplica para que la animación
 * translateX(-50%) haga un loop perfecto.
 */
export function Ticker() {
  const loop = [...tickerMessages, ...tickerMessages];

  return (
    <div className="overflow-hidden border-b border-ink bg-blood">
      <div className="flex w-max animate-marquee py-[7px] font-condensed text-sm font-bold uppercase tracking-[.22em] text-ink">
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

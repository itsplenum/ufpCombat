import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale, UFPEvent } from "@/data/types";
import { formatDateBadge } from "@/lib/format";
import { L } from "@/lib/localize";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlayBadge } from "@/components/ui/PlayBadge";

interface ResultCardProps {
  event: UFPEvent;
}

/** Card de evento pasado: thumbnail de video + resultado destacado. */
export async function ResultCard({ event }: ResultCardProps) {
  const locale = (await getLocale()) as Locale;

  return (
    <Link
      href={`/evento/${event.slug}`}
      className="flex flex-col border border-cream/10 bg-surface transition-colors hover:border-blood"
    >
      <div className="relative h-[170px]">
        <PlaceholderImage label="video highlights" variant="red" className="h-full" />
        <span className="absolute inset-0 flex items-center justify-center">
          <PlayBadge />
        </span>
        {event.highlight?.videoDuration ? (
          <span className="absolute bottom-2.5 right-3 font-mono text-[10px] text-cream/40">
            {event.highlight.videoDuration}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-[18px] py-4">
        <span className="font-display text-xl uppercase text-cream">
          UFP {event.number}: {event.title}
        </span>
        {event.highlight ? (
          <span className="text-sm text-cream/60">{L(event.highlight.summary, locale)}</span>
        ) : null}
        <span className="font-mono text-[11px] text-blood-hover">
          {formatDateBadge(event.date, locale)}
        </span>
      </div>
    </Link>
  );
}

import { getLocale } from "next-intl/server";
import type { Locale, VideoClip } from "@/data/types";
import { L } from "@/lib/localize";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { PlayBadge } from "@/components/ui/PlayBadge";

interface VideoCardProps {
  video: VideoClip;
}

/** Card de video highlight con duración. */
export async function VideoCard({ video }: VideoCardProps) {
  const locale = (await getLocale()) as Locale;

  return (
    <div className="flex flex-col border border-cream/10 bg-surface transition-colors hover:border-blood">
      <div className="relative h-[180px]">
        <PlaceholderImage label="video" variant="red" className="h-full" />
        <span className="absolute inset-0 flex items-center justify-center">
          <PlayBadge />
        </span>
        <span className="absolute bottom-2.5 right-3 font-mono text-[10px] text-cream/40">
          {video.duration}
        </span>
      </div>
      <div className="px-4 py-3.5">
        <span className="font-condensed text-base font-semibold uppercase tracking-[.06em] text-cream">
          {L(video.title, locale)}
        </span>
      </div>
    </div>
  );
}

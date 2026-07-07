import { getLocale } from "next-intl/server";
import type { EventScheduleItem, Locale } from "@/data/types";
import { L } from "@/lib/localize";

interface ScheduleBandProps {
  schedule: EventScheduleItem[];
}

/** Banda roja de horarios del evento. */
export async function ScheduleBand({ schedule }: ScheduleBandProps) {
  const locale = (await getLocale()) as Locale;

  if (schedule.length === 0) return null;

  return (
    <section className="bg-blood">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-x-12 gap-y-2 px-6 py-[18px] font-condensed text-[15px] font-bold uppercase tracking-[.2em] text-ink md:px-12">
        {schedule.map((item) => (
          <span key={item.time}>
            {item.time} — {L(item.label, locale)}
          </span>
        ))}
      </div>
    </section>
  );
}

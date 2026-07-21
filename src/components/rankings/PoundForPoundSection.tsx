import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OutlineText } from "@/components/ui/OutlineText";
import { MovementBadge } from "./MovementBadge";
import type { ContenderView } from "./buildRankingsView";

interface PoundForPoundSectionProps {
  entries: ContenderView[];
  newLabel: string;
}

/** Pound-for-pound top 10: #1 in a featured card + a list from 2 to 10. */
export async function PoundForPoundSection({ entries, newLabel }: PoundForPoundSectionProps) {
  const t = await getTranslations("rankingsPage");

  const [first, ...rest] = entries;
  if (!first) return null;

  return (
    <Section id="p4p" background="ink-2" width="md" borderTop>
      <SectionHeading title={t("p4pTitle")} kicker={t("p4pKicker")} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* The P4P #1 */}
        <Link
          href={first.href ?? "/rankings"}
          className="relative flex flex-col justify-end gap-2 overflow-hidden border border-blood/40 bg-linear-160 from-surface-warm to-surface p-8 transition-colors hover:border-blood"
        >
          <div className="pointer-events-none absolute -right-4 -top-8 select-none">
            <OutlineText strokeColor="rgba(193,18,31,.25)" className="text-[160px] leading-none">
              #1
            </OutlineText>
          </div>
          <span className="font-condensed text-sm uppercase tracking-[.3em] text-blood-hover">
            {t("p4pTitle")} #1
          </span>
          <span className="font-display text-5xl uppercase leading-none text-cream md:text-[56px]">
            {first.name}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-blood-hover">{first.record}</span>
            <MovementBadge movement={first.movement} newLabel={newLabel} />
          </div>
        </Link>

        {/* #2 – #10 */}
        <div className="flex flex-col self-start">
          {rest.map((entry) => (
            <div
              key={entry.rank}
              className="grid grid-cols-[40px_54px_1fr_90px] items-center gap-3 border-b border-cream/10 px-4 py-[11px] transition-colors hover:bg-blood/8"
            >
              <span className="font-display text-lg text-cream/55">{entry.rank}</span>
              <MovementBadge movement={entry.movement} newLabel={newLabel} />
              <span className="font-display text-lg uppercase text-cream">
                {entry.href ? (
                  <Link href={entry.href} className="transition-colors hover:text-blood-hover">
                    {entry.name}
                  </Link>
                ) : (
                  entry.name
                )}
              </span>
              <span className="font-mono text-xs text-blood-hover">{entry.record}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

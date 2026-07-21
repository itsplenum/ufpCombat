import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface SectionHeadingProps {
  title: ReactNode;
  /** Portion of the title rendered in red, e.g. "& Rankings". */
  titleAccent?: ReactNode;
  /** Small letterspaced label to the right of the title. */
  kicker?: ReactNode;
  /** Right-aligned action link, e.g. "Página del evento →". */
  action?: { label: string; href: string };
}

/** Standard section header: Anton title + red kicker + optional link. */
export function SectionHeading({ title, titleAccent, kicker, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <h2 className="font-display text-4xl uppercase text-cream md:text-[52px]">
        {title}
        {titleAccent ? <span className="text-blood"> {titleAccent}</span> : null}
      </h2>
      {kicker ? (
        <span className="font-condensed text-sm uppercase tracking-[.3em] text-blood-hover">
          {kicker}
        </span>
      ) : null}
      {action ? (
        <Link
          href={action.href}
          className="ml-auto border-b border-blood font-condensed text-sm font-bold uppercase tracking-[.2em] text-blood-hover transition-colors hover:text-cream"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

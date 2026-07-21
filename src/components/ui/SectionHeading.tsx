import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

interface SectionHeadingProps {
  title: ReactNode;
  /** Parte del título en rojo, ej. "& Rankings". */
  titleAccent?: ReactNode;
  /** Etiqueta pequeña letterspaced a la derecha del título. */
  kicker?: ReactNode;
  /** Link de acción alineado a la derecha, ej. "Página del evento →". */
  action?: { label: string; href: string };
}

/** Encabezado estándar de sección: título Anton + kicker rojo + link opcional. */
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

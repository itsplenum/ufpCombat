import type { RankMovement } from "@/data/types";

interface MovementBadgeProps {
  movement: RankMovement;
  newLabel: string;
}

/** Indicador de movimiento en el ranking: ▲ sube (verde), ▼ baja (rojo), — igual, NEW debut. */
export function MovementBadge({ movement, newLabel }: MovementBadgeProps) {
  if (movement === "new") {
    return (
      <span className="bg-blood px-1.5 py-0.5 font-condensed text-[10px] font-bold tracking-[.14em] text-cream">
        {newLabel}
      </span>
    );
  }
  if (movement > 0) {
    return <span className="font-mono text-xs text-win">▲{movement}</span>;
  }
  if (movement < 0) {
    return <span className="font-mono text-xs text-blood-hover">▼{Math.abs(movement)}</span>;
  }
  return <span className="font-mono text-xs text-cream/65">—</span>;
}

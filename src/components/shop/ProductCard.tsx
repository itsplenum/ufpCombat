import type { ReactNode } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface ProductCardProps {
  name: string;
  priceLabel: string;
  image?: string;
  /** Slot para el botón de carrito (solo en /tienda). */
  action?: ReactNode;
}

/** Card de producto — puro, usable en server (home) y client (catálogo con carrito). */
export function ProductCard({ name, priceLabel, image, action }: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2.5 transition-transform duration-200 hover:-translate-y-1">
      <PlaceholderImage
        label="producto"
        variant="neutral"
        src={image}
        alt={name}
        className="h-[200px] border border-cream/10"
      />
      <span className="font-condensed text-base font-semibold uppercase tracking-[.08em] text-cream">
        {name}
      </span>
      <span className="font-mono text-[13px] text-blood-hover">{priceLabel}</span>
      {action}
    </div>
  );
}

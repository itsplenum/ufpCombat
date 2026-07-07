import { getLocale } from "next-intl/server";
import type { Locale, Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { L } from "@/lib/localize";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { ReactNode } from "react";

interface ProductCardProps {
  product: Product;
  /** Slot para el botón de carrito (solo en /tienda). */
  action?: ReactNode;
}

/** Card de producto de la tienda. */
export async function ProductCard({ product, action }: ProductCardProps) {
  const locale = (await getLocale()) as Locale;

  return (
    <div className="flex flex-col gap-2.5 transition-transform duration-200 hover:-translate-y-1">
      <PlaceholderImage
        label="producto"
        variant="neutral"
        src={product.image}
        alt={L(product.name, locale)}
        className="h-[200px] border border-cream/10"
      />
      <span className="font-condensed text-base font-semibold uppercase tracking-[.08em] text-cream">
        {L(product.name, locale)}
      </span>
      <span className="font-mono text-[13px] text-blood-hover">{formatPrice(product.price)}</span>
      {action}
    </div>
  );
}

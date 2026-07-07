"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import type { ShopLabels } from "./ShopCatalog";

interface CartDrawerProps {
  labels: ShopLabels;
}

/** Botón flotante de carrito + drawer lateral con items y total. */
export function CartDrawer({ labels }: CartDrawerProps) {
  const { items, itemCount, total, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={labels.cart}
        className="fixed bottom-6 right-6 z-110 flex cursor-pointer items-center gap-2.5 bg-blood px-5 py-3.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-cream shadow-[0_0_40px_rgba(193,18,31,.5)] transition-colors hover:bg-blood-hover hover:text-ink clip-cta-sm"
      >
        {labels.cart}
        <span className="flex size-6 items-center justify-center rounded-full bg-ink font-mono text-xs text-cream">
          {itemCount}
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-120">
          {/* Backdrop */}
          <button
            type="button"
            aria-label={labels.closeCart}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 cursor-pointer bg-ink/70 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col border-l border-blood/40 bg-ink-2 p-6">
            <div className="flex items-center justify-between border-b border-blood/30 pb-4">
              <span className="font-display text-2xl uppercase text-cream">{labels.cart}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={labels.closeCart}
                className="cursor-pointer font-mono text-lg text-cream/60 transition-colors hover:text-blood-hover"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-5">
              {items.length === 0 ? (
                <span className="font-condensed text-base uppercase tracking-[.14em] text-cream/45">
                  {labels.cartEmpty}
                </span>
              ) : (
                items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-start justify-between gap-3 border-b border-cream/10 pb-4"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-condensed text-[15px] font-semibold uppercase tracking-[.06em] text-cream">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-cream/50">
                        {item.quantity} × {formatPrice(item.price)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      className="cursor-pointer font-condensed text-xs uppercase tracking-[.14em] text-blood-hover transition-colors hover:text-cream"
                    >
                      {labels.remove}
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-blood/30 pt-4">
              <div className="flex justify-between font-condensed text-lg font-bold uppercase tracking-[.14em] text-cream">
                <span>{labels.total}</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                disabled
                className="border border-cream/20 px-4 py-3.5 font-condensed text-[15px] font-bold uppercase tracking-[.2em] text-cream/40"
              >
                {labels.checkoutSoon}
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}

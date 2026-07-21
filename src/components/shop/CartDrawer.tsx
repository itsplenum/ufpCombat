"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useLocale } from "next-intl";
import { formatPrice } from "@/lib/format";
import type { Locale } from "@/data/types";
import { useCart } from "./CartProvider";
import type { ShopLabels } from "./ShopCatalog";

interface CartDrawerProps {
  labels: ShopLabels;
}

const FOCUSABLE_SELECTOR = "button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])";

const quantityButtonClass =
  "flex size-7 cursor-pointer items-center justify-center border border-cream/25 font-mono text-sm text-cream transition-colors hover:border-blood-hover hover:text-blood-hover";

/** Floating cart button + side drawer with items, quantities and total. */
export function CartDrawer({ labels }: CartDrawerProps) {
  const { items, itemCount, total, addItem, decreaseItem, removeItem } = useCart();
  const locale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);

  const titleId = useId();
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  /* On open: focus the close button and lock body scroll.
     On close: focus returns to the floating button that opened the drawer. */
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const opener = openerRef.current;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [isOpen]);

  /** Escape closes; Tab stays trapped inside the panel. */
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusables = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        ref={openerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={labels.cart}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-110 flex cursor-pointer items-center gap-2.5 bg-blood px-5 py-3.5 font-condensed text-[15px] font-bold uppercase tracking-[.18em] text-cream shadow-[0_0_40px_rgba(193,18,31,.5)] transition-colors hover:bg-blood-hover hover:text-ink clip-cta-sm"
      >
        {labels.cart}
        <span className="flex size-6 items-center justify-center rounded-full bg-ink font-mono text-xs text-cream">
          {itemCount}
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-120">
          {/* Backdrop: purely decorative and clickable, kept out of the tab order
              (closing by keyboard is Escape or the panel's ✕ button). */}
          <div
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 cursor-pointer bg-ink/70 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={handleKeyDown}
            className="absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col border-l border-blood/40 bg-ink-2 p-6"
          >
            <div className="flex items-center justify-between border-b border-blood/30 pb-4">
              <span id={titleId} className="font-display text-2xl uppercase text-cream">
                {labels.cart}
              </span>
              <button
                ref={closeButtonRef}
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
                <span className="font-condensed text-base uppercase tracking-[.14em] text-cream/55">
                  {labels.cartEmpty}
                </span>
              ) : (
                items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-start justify-between gap-3 border-b border-cream/10 pb-4"
                  >
                    <div className="flex flex-col gap-2">
                      <span className="font-condensed text-[15px] font-semibold uppercase tracking-[.06em] text-cream">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decreaseItem(item.slug)}
                          aria-label={`${labels.decreaseQuantity}: ${item.name}`}
                          className={quantityButtonClass}
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center font-mono text-xs text-cream/80">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            addItem({ slug: item.slug, name: item.name, price: item.price })
                          }
                          aria-label={`${labels.increaseQuantity}: ${item.name}`}
                          className={quantityButtonClass}
                        >
                          +
                        </button>
                        <span className="font-mono text-xs text-cream/60">
                          × {formatPrice(item.price, locale)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.slug)}
                      aria-label={`${labels.remove}: ${item.name}`}
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
                <span className="font-mono">{formatPrice(total, locale)}</span>
              </div>
              <button
                type="button"
                disabled
                className="border border-cream/20 px-4 py-3.5 font-condensed text-[15px] font-bold uppercase tracking-[.2em] text-cream/55"
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

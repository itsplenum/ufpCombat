"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  decreaseItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  hasItem: (slug: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Mock cart store backed by localStorage: it persists across visits, syncs
 * between tabs (the "storage" event) and SSR always sees an empty cart.
 */
const CART_STORAGE_KEY = "ufp-cart";
const emptyCart: CartItem[] = [];
const listeners = new Set<() => void>();

let cachedRaw: string | null = null;
let cachedItems: CartItem[] = emptyCart;

function readCart(): CartItem[] {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : emptyCart;
    } catch {
      cachedItems = emptyCart;
    }
  }
  return cachedItems;
}

function writeCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  listeners.forEach((notify) => notify());
}

function subscribeToCart(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribeToCart, readCart, () => emptyCart);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    const current = readCart();
    const existing = current.find((entry) => entry.slug === item.slug);
    const next = existing
      ? current.map((entry) =>
          entry.slug === item.slug ? { ...entry, quantity: entry.quantity + 1 } : entry,
        )
      : [...current, { ...item, quantity: 1 }];
    writeCart(next);
  }, []);

  /** Drops one unit; once it hits zero the item leaves the cart. */
  const decreaseItem = useCallback((slug: string) => {
    const next = readCart()
      .map((entry) => (entry.slug === slug ? { ...entry, quantity: entry.quantity - 1 } : entry))
      .filter((entry) => entry.quantity > 0);
    writeCart(next);
  }, []);

  const removeItem = useCallback((slug: string) => {
    writeCart(readCart().filter((entry) => entry.slug !== slug));
  }, []);

  const hasItem = useCallback(
    (slug: string) => items.some((entry) => entry.slug === slug),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, entry) => sum + entry.quantity, 0),
      total: items.reduce((sum, entry) => sum + entry.price * entry.quantity, 0),
      addItem,
      decreaseItem,
      removeItem,
      hasItem,
    }),
    [items, addItem, decreaseItem, removeItem, hasItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return context;
}

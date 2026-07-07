"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
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
  removeItem: (slug: string) => void;
  hasItem: (slug: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "ufp-cart";

/** Carrito mock: contexto + persistencia en localStorage. Sin checkout real todavía. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // localStorage corrupto o bloqueado — se arranca con carrito vacío
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.slug === item.slug);
      if (existing) {
        return current.map((entry) =>
          entry.slug === item.slug ? { ...entry, quantity: entry.quantity + 1 } : entry,
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((entry) => entry.slug !== slug));
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
      removeItem,
      hasItem,
    }),
    [items, addItem, removeItem, hasItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}

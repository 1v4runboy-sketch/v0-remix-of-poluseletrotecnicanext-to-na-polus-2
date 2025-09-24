// /components/CartProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;              // slug + variação
  slug: string;
  title: string;
  unit: "un" | "m" | "kg";
  qty: number;
  variantLabel?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "POLUS_CART_V1";

export const CART = {
  loadCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
  saveCart(items: CartItem[]) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  },
};

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(CART.loadCart());
  }, []);

  useEffect(() => {
    CART.saveCart(items);
  }, [items]);

  const api = useMemo<CartContextType>(() => ({
    items,
    addItem: (item) => {
      setItems((prev) => {
        const i = prev.findIndex((x) => x.id === item.id);
        if (i >= 0) {
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + item.qty };
          return next;
        }
        return [...prev, item];
      });
    },
    removeItem: (id) => setItems((prev) => prev.filter((x) => x.id !== id)),
    updateQty: (id, qty) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x))),
    clearCart: () => setItems([]),
    count: items.reduce((n, it) => n + it.qty, 0),
  }), [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

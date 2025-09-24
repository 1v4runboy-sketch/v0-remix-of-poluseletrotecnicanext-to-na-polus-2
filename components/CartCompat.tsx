// components/CartCompat.tsx
"use client";

import { useEffect } from "react";
import { setupCartCompat } from "../lib/cart";

/** Monta a camada window.CART para o CartProvider existente */
export default function CartCompat() {
  useEffect(() => {
    setupCartCompat();
  }, []);
  return null;
}

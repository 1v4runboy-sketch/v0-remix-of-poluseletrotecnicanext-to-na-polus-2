// /components/RootProviders.tsx
"use client";

import React from "react";
import CartProvider from "./CartProvider";

export default function RootProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

import type { Metadata } from "next";
import "./globals.css";
import CartProvider from "../components/CartProvider";
import HeaderShell from "../components/HeaderShell";

export const metadata: Metadata = {
  title: "Polus Eletrotécnica",
  description: "Catálogo técnico Polus Eletrotécnica — componentes que movem a indústria.",
    generator: 'v0.app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <HeaderShell />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

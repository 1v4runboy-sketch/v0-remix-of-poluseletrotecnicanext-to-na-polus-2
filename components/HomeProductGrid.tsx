"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product, products } from "@/lib/products";
import { motion } from "framer-motion";

/**
 * HomeProductGrid
 * - Renderiza a grade inicial de produtos
 * - Suporta produtos com variações (ex.: tinta azul WEG unificada)
 */
export default function HomeProductGrid() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    // Aqui poderíamos aplicar filtros, ordenação etc no futuro
    setItems(products);
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
      >
        {items.map((product) => (
          <motion.div
            key={product.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// /lib/product-helpers.ts
import type { CatalogItem, UnifiedProduct, Product } from "./types";
import { guessBrandLogo } from "./brands";
import { UNIFIED_PRODUCTS, OTHER_PRODUCTS } from "./unified-products";

export function isUnified(x: CatalogItem): x is UnifiedProduct {
  return (x as UnifiedProduct).isUnifiedCard === true;
}
export function isSingle(x: CatalogItem): x is Product {
  return !(x as any).isUnifiedCard;
}

export function brandLogoFor(x: CatalogItem) {
  const b = (x as any).brand as string | undefined;
  return guessBrandLogo(b || "");
}

// Busca simples
export function filterCatalog(opts: {
  q?: string;
  category?: string[];
  brand?: string[];
}) {
  const q = (opts.q || "").trim().toLowerCase();
  const cat = opts.category || [];
  const br = opts.brand || [];

  const within = (v: string, arr: string[]) =>
    !arr?.length || arr.includes(v);

  const base = [...UNIFIED_PRODUCTS, ...OTHER_PRODUCTS];

  return base.filter((p) => {
    const title = p.title.toLowerCase();
    const catOk = within(p.category, cat);
    const brOk = within((p.brand || "").toUpperCase(), br.map(s=>s.toUpperCase()));
    const qOk = !q || title.includes(q) || (p.subcategory || "").toLowerCase().includes(q);
    return catOk && brOk && qOk;
  });
}

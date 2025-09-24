// lib/catalog.ts
import { PRODUCTS, type Product } from "./products";
import { UNIFIED_PRODUCTS, type UnifiedCard } from "./unified-products";

const HIDE_SINGLE_SLUGS = new Set<string>([
  // já ocultávamos vários; reforço para evitar duplicados:
  // Cabos e Espaguetes (todos cobertos por cards)
  ...PRODUCTS.filter(p => p.category === "Cabos Elétricos").map(p => p.slug),
  ...PRODUCTS.filter(p => p.category === "Isolantes" && (p.subcategory?.toLowerCase().includes("espaguete") ?? false)).map(p => p.slug),
  ...PRODUCTS.filter(p => p.category === "Cadarços").map(p => p.slug),

  // Permanentes (todos os µF caem nos cards unificados)
  ...PRODUCTS.filter(p => p.slug.startsWith("capacitor-permanente-")).map(p => p.slug),

  // Rolamentos (listas longas — mostramos pelos cards agrupados)
  ...PRODUCTS.filter(p => p.slug.startsWith("rolamento-")).map(p => p.slug),

  // Fita Linear (apenas pelo card unificado)
  ...PRODUCTS.filter(p => p.slug.startsWith("fita-linear-")).map(p => p.slug),

  // Bases, Caixas, Placas, Protetores e Acamadores via cards
  ...PRODUCTS.filter(p =>
    ["Bases de Motor WEG","Caixas de Ligação","Proteção e Segurança","Acamadores"]
      .includes(p.category) || (p.subcategory === "Placas de Borne")
  ).map(p => p.slug),
]);

export type CatalogCard = {
  type: "group" | "single";
  slug: string;
  title: string;
  brand?: string | null;
  category: string;
  subcategory?: string;
  coverSrc: string;
  imagesCount: number;
  variantsCount?: number;
};

function toCardFromUnified(u: UnifiedCard): CatalogCard {
  const cover = u.coverImage ?? u.images[0]?.src ?? "/polus-placeholder.webp";
  return {
    type: "group",
    slug: u.slug,
    title: u.title,
    brand: u.brand ?? null,
    category: u.category,
    subcategory: u.subcategory,
    coverSrc: cover,
    imagesCount: u.images?.length ?? 0,
    variantsCount: u.variants?.length ?? 0,
  };
}
function toCardFromSingle(p: Product): CatalogCard {
  const cover = p.images?.[0]?.src ?? "/polus-placeholder.webp";
  return {
    type: "single",
    slug: p.slug,
    title: p.title,
    brand: p.brand ?? null,
    category: p.category,
    subcategory: p.subcategory,
    coverSrc: cover,
    imagesCount: p.images?.length ?? 0,
  };
}

export function getAllCards(): CatalogCard[] {
  const unified = UNIFIED_PRODUCTS.map(toCardFromUnified);
  const singles = PRODUCTS.filter(p => !HIDE_SINGLE_SLUGS.has(p.slug)).map(toCardFromSingle);
  return [...unified, ...singles];
}

export function findUnifiedBySlug(slug: string): UnifiedCard | undefined {
  return UNIFIED_PRODUCTS.find(u => u.slug === slug);
}
export function findSingleBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function findAnyBySlug(slug: string):
  | { type: "group"; data: UnifiedCard }
  | { type: "single"; data: Product }
  | undefined {
  const u = findUnifiedBySlug(slug);
  if (u) return { type: "group", data: u };
  const s = findSingleBySlug(slug);
  if (s) return { type: "single", data: s };
  return undefined;
}

export function getSimilar(slug: string, limit = 8): CatalogCard[] {
  const resolved = findAnyBySlug(slug);
  if (!resolved) return [];
  const baseCat = (resolved as any).data.category as string;
  const baseSub = (resolved as any).data.subcategory as string | undefined;
  const all = getAllCards().filter(c => c.slug !== slug);

  let sim = all.filter(c => c.subcategory && baseSub && c.subcategory === baseSub);
  if (sim.length < limit) {
    sim = [...sim, ...all.filter(c => c.category === baseCat && !sim.some(s => s.slug === c.slug))];
  }
  return sim.slice(0, limit);
}

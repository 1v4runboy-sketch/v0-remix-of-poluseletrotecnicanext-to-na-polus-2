// /lib/unified-catalog.ts
import { PRODUCTS } from "./products";
import { UNIFIED_PRODUCTS } from "./unified-products";
import { shouldHideForUnified } from "./unified-filters";
import { resolveBrandLogo } from "./brand-logos";

export type CatalogItem = {
  type: "unified" | "single";
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  brand?: string | null;
  images: Array<{ src: string; alt: string }>;
  variants?: Array<{
    id: string;
    label: string;
    unit: "m" | "kg" | "un";
    minQty?: number;
    stepQty?: number;
    attrs?: Record<string, any>;
    images?: Array<{ src: string; alt: string }>;
  }>;
  shortDescription?: string | null;
  brandLogo?: string | null;
};

function applyCoverOverrides(item: CatalogItem): CatalogItem {
  const t = item.title.toLowerCase();

  // Capas dos permanentes
  if (t.includes("permanentes 250v")) {
    item.images = [{ src: "/produtos/capacitor-permanente-250v-02uf-1.webp", alt: item.title }];
  }
  if (t.includes("permanentes 380") || t.includes("permanentes 400")) {
    item.images = [{ src: "/produtos/capacitor-permanente-380-400vac-02uf-2.webp", alt: item.title }];
  }
  // Espaguete Fibra de Vidro
  if (t.includes("espaguete") && t.includes("fibra") && t.includes("vidro")) {
    item.images = [
      { src: "/produtos/espaguete-fiberglass-1.webp", alt: item.title },
      { src: "/produtos/espaguete-fiberglass-2.webp", alt: item.title },
    ];
  }
  // Espaguete 155°
  if (t.includes("espaguete") && t.includes("155")) {
    item.images = [
      { src: "/produtos/espaguetes-flexpoli-155-1.webp", alt: item.title },
      { src: "/produtos/espaguetes-flexpoli-155-2.webp", alt: item.title },
    ];
  }
  return item;
}

export function buildCatalog(): CatalogItem[] {
  const unified: CatalogItem[] =
    UNIFIED_PRODUCTS.map((u: any) => {
      const item: CatalogItem = {
        type: "unified",
        slug: u.slug,
        title: u.title,
        category: u.category,
        subcategory: u.subcategory,
        brand: u.brand ?? null,
        images: u.images?.length ? u.images : [{ src: "/polus-logo.svg", alt: u.title }],
        variants: u.variants || [],
        shortDescription: u.shortDescription || null,
        brandLogo: resolveBrandLogo(u),
      };
      return applyCoverOverrides(item);
    }) || [];

  const singles: CatalogItem[] = PRODUCTS
    .filter((p) => !shouldHideForUnified(p))
    .map((p) => ({
      type: "single",
      slug: p.slug,
      title: p.title,
      category: p.category,
      subcategory: p.subcategory,
      brand: p.brand ?? null,
      images: p.images?.length ? p.images : [{ src: "/polus-logo.svg", alt: p.title }],
      variants: p.variants || [],
      shortDescription: p.shortDescription || null,
      brandLogo: resolveBrandLogo(p),
    }));

  return [...unified, ...singles];
}

export function findBySlug(slug: string): CatalogItem | null {
  const all = buildCatalog();
  return all.find((i) => i.slug === slug) || null;
}

export function similarTo(item: CatalogItem, limit = 8): CatalogItem[] {
  const all = buildCatalog().filter((i) => i.slug !== item.slug);
  const sameSub = all.filter((i) => i.subcategory && i.subcategory === item.subcategory);
  const sameCat = all.filter((i) => i.category === item.category);
  const unique = [...new Map([...sameSub, ...sameCat].map((x) => [x.slug, x])).values()];
  return unique.slice(0, limit);
}

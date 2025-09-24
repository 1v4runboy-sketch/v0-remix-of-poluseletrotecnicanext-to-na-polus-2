// /lib/types.ts
export type ImageAsset = { src: string; alt?: string };

export type Variant = {
  id: string;
  label: string;
  unit: "m" | "kg" | "un";
  minQty?: number;
  stepQty?: number;
  attrs?: Record<string, any>;
  images?: ImageAsset[]; // opcional: imagens específicas da variação
};

export type Product = {
  id?: string;
  slug: string;
  title: string;
  brand?: string | null;
  category: string;
  subcategory: string;
  shortDescription?: string | null;
  images: ImageAsset[];
  variants?: Variant[];
  techSpecs?: any;
  metaCollection?: { type: string; bucket: string };
};

export type UnifiedProduct = {
  slug: string;
  title: string;
  brand?: string | null;
  category: string;
  subcategory: string;
  shortDescription?: string | null;
  images: ImageAsset[]; // imagens do card unificado (capa + extras)
  coverImage?: string;  // caminho da imagem capa do card
  variants: Variant[];  // variações completas (modelo/medida/µF/AWG etc.)
  techSpecs?: any;
  tags?: string[];
  isUnifiedCard: true;
  // chave para montar imagem por variação (quando existirem assets granularizados)
  variantAssetsKey?: string;
};

export type CatalogItem = UnifiedProduct | Product;

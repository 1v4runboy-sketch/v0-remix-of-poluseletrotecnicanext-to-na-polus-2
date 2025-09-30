// /app/produto/[slug]/page.tsx  (Server Component)

import ProductDetailClient from '../../../components/ProductDetailClient';
import { UNIFIED_PRODUCTS } from '../../../lib/unified-products';
// Ajuste este import conforme seu projeto:
import { PRODUCTS as CATALOG } from '../../../lib/products';

type NextParams = { params: { slug: string } };

export function generateStaticParams() {
  // Opcional: permitir pré-render dos unificados
  return UNIFIED_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: NextParams) {
  const { slug } = params;

  // 1) Tenta família unificada
  const family = UNIFIED_PRODUCTS.find((p) => p.slug === slug);

  if (family) {
    const childSlugs = (family.variants || [])
      .map((v) => v.attrs?.childSlug)
      .filter(Boolean) as string[];

    // Mapa mínimo: slug -> { images, techSpecs, title }
    const childLookup = Object.fromEntries(
      childSlugs.map((s) => {
        const found = CATALOG.find((c: any) => c.slug === s);
        if (!found) return [s, undefined];
        const pick = {
          slug: found.slug,
          title: found.title,
          images: found.images || [],
          techSpecs: found.techSpecs || null,
        };
        return [s, pick];
      })
    );

    return (
      <main className="pb-12">
        <ProductDetailClient product={family as any} childLookup={childLookup} />
      </main>
    );
  }

  // 2) Fallback para item individual do catálogo
  const single = CATALOG.find((c: any) => c.slug === slug);
  if (single) {
    // Adapta o item individual para o componente
    const adapted = {
      slug: single.slug,
      title: single.title,
      brand: single.brand || null,
      category: single.category || '',
      subcategory: single.subcategory || '',
      shortDescription: single.shortDescription || '',
      description: single.description || '',
      images: single.images || [],
      variants: [], // item avulso não tem variações
      techSpecs: single.techSpecs || null,
    };

    return (
      <main className="pb-12">
        <ProductDetailClient product={adapted as any} />
      </main>
    );
  }

  // 3) Not found simples
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-xl font-semibold">Produto não encontrado</h1>
      <p className="mt-2 text-sm text-neutral-600">
        O produto solicitado não existe ou foi movido.
      </p>
    </main>
  );
}

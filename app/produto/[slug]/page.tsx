// app/produto/[slug]/page.tsx
import { Metadata } from 'next';
import PdpClient from '../../../components/PdpClient';
import { getUnifiedBySlug, getSimilarProducts } from '../../../lib/unified-products';
import { PRODUCTS } from '../../../lib/products';

function pickEntity(slug: string) {
  // 1) Família unificada
  const uni = getUnifiedBySlug(slug);
  if (uni) {
    return {
      type: 'unified',
      slug: uni.slug,
      title: uni.title,
      brandLogo: uni.brandLogo,
      category: uni.category,
      subcategory: uni.subcategory,
      images: uni.images,
      variants: uni.variants,
      tech: uni.tech,
      description: uni.description,
      variantImagesMap: (uni as any).variantImagesMap,
    };
  }
  // 2) Produto individual
  const single = (PRODUCTS as any[]).find((p) => p.slug === slug);
  if (single) {
    return {
      type: 'single',
      slug: single.slug,
      title: single.title || single.name,
      brandLogo: single.brandLogo,
      category: single.category,
      subcategory: single.subcategory,
      images: (single.images || []).map((s: string) => ({ src: s })),
      variants: single.variants || [],
      tech: single.tech || single.specs,
      description: single.description || single.summary,
      variantImagesMap: (single as any).variantImagesMap,
    };
  }
  return null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entity = pickEntity(params.slug);
  if (!entity) {
    return {
      title: 'Produto não encontrado | Polus',
      description: 'O produto solicitado não foi encontrado.',
    };
  }
  return {
    title: `${entity.title} | Polus Eletrotécnica`,
    description: entity.description || 'Catálogo técnico Polus Eletrotécnica',
    openGraph: {
      title: `${entity.title} | Polus Eletrotécnica`,
      description: entity.description || '',
      images: entity.images?.length ? [entity.images[0].src] : ['/polus-logo.svg'],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const entity = pickEntity(params.slug);
  if (!entity) {
    return (
      <main className="max-w-6xl mx-auto px-3 md:px-6 lg:px-8 py-6">
        <div className="rounded-lg border p-6 text-center text-zinc-600 dark:text-zinc-300">
          Produto não encontrado.
        </div>
      </main>
    );
  }

  const similar = getSimilarProducts(params.slug);

  return (
    <main className="max-w-6xl mx-auto px-3 md:px-6 lg:px-8 py-6">
      <PdpClient entity={entity as any} similar={similar as any} />
    </main>
  );
}

// app/produto/[slug]/page.tsx
import { UNIFIED_PRODUCTS } from '../../../lib/unified-products';
import { products as RAW_PRODUCTS } from '../../../lib/products';
import { prettyTitle } from '../../../lib/title';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // permita SSG para todas as páginas de produto
  const slugs = [
    ...UNIFIED_PRODUCTS.map(p => p.slug),
    ...RAW_PRODUCTS.map(p => p.slug),
  ];
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: any) {
  const item =
    UNIFIED_PRODUCTS.find((p) => p.slug === params.slug) ||
    RAW_PRODUCTS.find((p) => p.slug === params.slug);

  if (!item) return { title: 'Produto | Polus Eletrotécnica' };

  const title = prettyTitle(item.title || item.slug);
  return {
    title: `${title} | Polus`,
    description: `${title} — catálogo técnico Polus Eletrotécnica.`,
    openGraph: {
      title,
      description: `${title} — catálogo técnico Polus Eletrotécnica.`,
      images: item.images?.length ? [item.images[0].src] : ['/polus-logo.svg']
    }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const item =
    UNIFIED_PRODUCTS.find((p) => p.slug === params.slug) ||
    RAW_PRODUCTS.find((p) => p.slug === params.slug);

  if (!item) return notFound();

  // relacionados: mesma categoria (exclui self)
  const related = [
    ...UNIFIED_PRODUCTS,
    ...RAW_PRODUCTS
  ].filter((p) => p.slug !== item.slug && p.category === item.category).slice(0, 8);

  return <ProductDetailClient item={item as any} related={related as any[]} />;
}

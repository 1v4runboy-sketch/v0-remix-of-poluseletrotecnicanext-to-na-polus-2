'use client';

import { useEffect, useMemo, useState } from 'react';
import VariationSelect from './VariationSelect';
import ProductGallery from './ProductGallery';

type Variant = {
  id: string;
  label: string;
  unit?: string;
  attrs?: { childSlug?: string; [k: string]: any };
};

type ImageT = { src: string; alt?: string };

type ProductUnified = {
  slug: string;
  title: string;
  brand?: string | null;
  category?: string;
  subcategory?: string;
  shortDescription?: string | null;
  description?: string | null;
  images?: ImageT[];
  variants?: Variant[];
  techSpecs?: Record<string, any> | null;
};

type ChildMinimal = {
  slug: string;
  title?: string;
  images?: ImageT[];
  techSpecs?: Record<string, any> | null;
};

type Props = {
  product: ProductUnified;
  childLookup?: Record<string, ChildMinimal | undefined>;
  whatsapp?: string; // ex.: '551135992935'
};

function deriveSpecs(product: ProductUnified, variant?: Variant): Record<string, string> {
  const specs: Record<string, string> = {};
  if (product.brand) specs['Marca'] = product.brand;
  if (product.category) specs['Categoria'] = product.category;
  if (product.subcategory) specs['Subcategoria'] = product.subcategory;

  if (variant?.label) {
    specs['Variação'] = variant.label;
    // heurísticas básicas:
    if (variant.label.includes('µF')) {
      const cap = variant.label.match(/(\d+)\s*µF/i)?.[1];
      if (cap) specs['Capacitância'] = `${cap} µF`;
    }
    if (/AWG/i.test(variant.label)) {
      const awg = variant.label.match(/AWG\s*([0-9]+)/i)?.[1];
      if (awg) specs['Bitola (AWG)'] = awg;
    }
    if (variant.label.includes('mm')) {
      const mm = variant.label.match(/(\d+[.,]?\d*)\s*mm/i)?.[1];
      if (mm) specs['Diâmetro (mm)'] = mm.replace(',', '.');
    }
  }
  if (variant?.unit) {
    const map: Record<string, string> = { m: 'Metro', un: 'Unidade', kg: 'Quilo' };
    specs['Unidade'] = map[variant.unit] ?? variant.unit;
  }
  return specs;
}

export default function ProductDetailClient({
  product,
  childLookup = {},
  whatsapp = '551135992935',
}: Props) {
  const [activeId, setActiveId] = useState<string | undefined>(product.variants?.[0]?.id);

  useEffect(() => {
    setActiveId(product.variants?.[0]?.id);
  }, [product.slug]);

  const activeVariant = useMemo(
    () => product.variants?.find((v) => v.id === activeId),
    [product.variants, activeId]
  );

  const activeChild =
    activeVariant?.attrs?.childSlug ? childLookup[activeVariant.attrs.childSlug] : undefined;

  const images = activeChild?.images?.length ? activeChild.images : product.images || [];
  const specFromChild = activeChild?.techSpecs || {};
  const specFallback = product.techSpecs || {};
  const derived = deriveSpecs(product, activeVariant);

  const tech = useMemo(
    () => ({ ...specFallback, ...derived, ...specFromChild }),
    [specFallback, derived, specFromChild]
  );

  const title = product.title;
  const sub = product.shortDescription;

  const whatsHref = useMemo(() => {
    const txt = encodeURIComponent(
      `Olá! Gostaria de cotar o produto:\n• ${title}\n• Variação: ${activeVariant?.label || '-'}\n• Código: ${activeVariant?.attrs?.childSlug || product.slug}`
    );
    return `https://wa.me/${whatsapp}?text=${txt}`;
  }, [title, activeVariant, product.slug, whatsapp]);

  const addToCart = () => {
    if (typeof window === 'undefined') return;
    const payload = {
      slug: activeVariant?.attrs?.childSlug || product.slug,
      title: `${title} — ${activeVariant?.label || 'Padrão'}`,
      qty: 1,
      meta: { variantId: activeVariant?.id, productSlug: product.slug },
    };
    try {
      // Integra-se ao seu carrinho existente se houver
      // Ex.: window.CART.addItem(payload)
      // Fallback: evento customizado
      // @ts-ignore
      if (window.CART?.addItem) {
        // @ts-ignore
        window.CART.addItem(payload);
      } else {
        window.dispatchEvent(new CustomEvent('cart:add', { detail: payload }));
      }
    } catch (e) {
      console.error('Falha ao adicionar ao carrinho', e);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-3 py-6 sm:px-6 lg:grid-cols-2 lg:py-10">
      {/* Galeria */}
      <div className="order-1 lg:order-none">
        <ProductGallery images={images} />
      </div>

      {/* Conteúdo */}
      <div className="order-2 lg:order-none">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h1>
        {sub && (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {sub}
          </p>
        )}

        {/* Seletor de variações */}
        {product.variants?.length ? (
          <div className="mt-5">
            <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Variações disponíveis
            </div>
            <VariationSelect
              product={product}
              selectedId={activeId}
              onChange={(v) => setActiveId(v.id)}
              childLookup={childLookup}
              buttonLabel="Selecionar medida/modelo"
            />
          </div>
        ) : null}

        {/* Ações */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Pedir cotação
          </a>
          <button
            onClick={addToCart}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition-all hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-sm dark:text-emerald-300 dark:hover:bg-emerald-900/30"
          >
            Adicionar ao carrinho
          </button>
        </div>

        {/* Descrição */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
            Descrição do Produto
          </h2>
          <div className="prose prose-neutral mt-2 max-w-none text-sm dark:prose-invert">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p>
                {product.shortDescription ||
                  'Produto técnico de alta confiabilidade. Consulte as variações e especificações.'}
              </p>
            )}
          </div>
        </section>

        {/* Informações Técnicas */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
            Informações Técnicas
          </h2>
          <div className="mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <dl className="divide-y divide-neutral-200 text-sm dark:divide-neutral-800">
              {Object.entries(tech).map(([k, v]) => {
                if (v == null || v === '') return null;
                return (
                  <div key={k} className="grid grid-cols-3 gap-3 px-4 py-2">
                    <dt className="col-span-1 truncate text-neutral-500 dark:text-neutral-400">
                      {k}
                    </dt>
                    <dd className="col-span-2 text-neutral-900 dark:text-neutral-100">
                      {typeof v === 'string' ? v : JSON.stringify(v)}
                    </dd>
                  </div>
                );
              })}
              {!Object.keys(tech).length && (
                <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
                  Especificações não informadas para esta variação.
                </div>
              )}
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
}

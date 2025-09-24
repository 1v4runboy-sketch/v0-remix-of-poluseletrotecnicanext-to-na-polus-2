// components/ProductDetailClient.tsx
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { prettyTitle } from '../lib/title';
import { brandLogoFor } from '../lib/brand-logos';

type Img = { src: string; alt?: string };
type Variant = { id: string; label: string; images?: Img[]; attrs?: Record<string, any> };
type Item = {
  kind?: 'group';
  slug: string;
  title: string;
  brand?: string | null;
  category?: string;
  subcategory?: string;
  shortDescription?: string | null;
  images: Img[];
  variants?: Variant[];
  description?: string;
};

function buildWhatsLink(item: Item, variant?: Variant) {
  const phone = '551135992935';
  const title = prettyTitle(item.title || item.slug);
  const suffix = variant ? ` – variação: ${variant.label}` : '';
  const text = encodeURIComponent(`Olá! Gostaria de uma cotação de:\n${title}${suffix}\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}`);
  return `https://wa.me/${phone}?text=${text}`;
}

export default function ProductDetailClient({ item, related }: { item: Item; related: Item[] }) {
  const [selected, setSelected] = useState<Variant | undefined>(item.variants?.[0]);

  const images: Img[] = useMemo(() => {
    if (selected?.images?.length) return selected.images;
    return item.images || [];
  }, [item.images, selected]);

  const brandLogo = brandLogoFor(item);
  const title = prettyTitle(item.title || item.slug);

  // "Adicionar ao carrinho": tenta usar o seu contexto, cai no fallback global se necessário
  const addToCart = () => {
    try {
      // @ts-ignore
      const { addItem } = require('./CartProviderCtx'); // caso você tenha um wrapper
      if (addItem) {
        addItem({
          id: `${item.slug}${selected ? `:${selected.id}` : ''}`,
          name: `${title}${selected ? ` – ${selected.label}` : ''}`,
          price: 0,
          qty: 1,
          image: images?.[0]?.src
        });
        return;
      }
    } catch (_) {}

    // Fallback: tenta window.CART
    if (typeof window !== 'undefined' && (window as any).CART?.add) {
      (window as any).CART.add({
        id: `${item.slug}${selected ? `:${selected.id}` : ''}`,
        name: `${title}${selected ? ` – ${selected.label}` : ''}`,
        price: 0,
        qty: 1,
        image: images?.[0]?.src
      });
      return;
    }

    alert('Carrinho indisponível no momento.');
  };

  return (
    <div className="mx-auto max-w-6xl px-3 md:px-6 lg:px-8 py-6 md:py-10">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Galeria */}
        <div>
          <ImageCarousel images={images} />
        </div>

        {/* Conteúdo */}
        <div>
          <div className="flex items-center gap-3">
            {brandLogo && (
              <Image src={brandLogo.src} alt={brandLogo.alt} width={90} height={32} className="h-6 w-auto" />
            )}
            <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h1>
          </div>

          {item.shortDescription && (
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{item.shortDescription}</p>
          )}

          {/* Variações */}
          {!!item.variants?.length && (
            <div className="mt-4">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Variações</div>
              <div className="flex flex-wrap gap-2">
                {item.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelected(v)}
                    className={`rounded-md border px-3 py-1.5 text-sm transition
                      ${selected?.id === v.id
                        ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
                        : 'border-zinc-300 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
                      }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ações */}
          <div className="mt-5 flex items-center gap-3">
            <a
              href={buildWhatsLink(item, selected)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current"><path d="M20.52 3.48A11.94 11.94 0 0012.07 0C5.58 0 .3 5.28.3 11.77c0 2.08.54 4.05 1.57 5.8L0 24l6.58-1.73a11.73 11.73 0 005.49 1.39h.01c6.49 0 11.77-5.28 11.77-11.77 0-3.15-1.23-6.11-3.33-8.31zM12.08 21.3h-.01a9.62 9.62 0 01-4.89-1.34l-.35-.2-3.91 1.03 1.04-3.81-.23-.39a9.54 9.54 0 01-1.49-5.16c0-5.32 4.34-9.66 9.66-9.66 2.58 0 5 1 6.84 2.82a9.61 9.61 0 012.83 6.83c0 5.32-4.34 9.66-9.66 9.66zm5.32-7.21c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.14-.16.19-.33.22-.62.08-.29-.15-1.23-.45-2.34-1.43a8.7 8.7 0 01-1.61-1.99c-.17-.29-.02-.45.13-.6.13-.13.29-.34.45-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.03-.51-.08-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48l-.55-.01c-.19 0-.51.07-.78.36-.26.29-1 1-1 2.45 0 1.44 1.03 2.83 1.17 3.02.15.19 2.02 3.09 4.89 4.33.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.06-.12-.24-.19-.52-.34z"/></svg>
              Solicitar cotação
            </a>

            <button
              onClick={addToCart}
              className="inline-flex items-center gap-2 rounded-md bg-zinc-900 hover:bg-black text-white px-4 py-2 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900"
            >
              Adicionar ao carrinho
            </button>
          </div>

          {/* Texto técnico / aplicações */}
          <div className="mt-6 prose prose-zinc dark:prose-invert max-w-none">
            <h3>Informações do produto</h3>
            <p>
              {item.shortDescription || 'Produto técnico da linha Polus Eletrotécnica, selecionado para alta confiabilidade em aplicações industriais.'}
            </p>
            <h4>Aplicações típicas</h4>
            <ul>
              <li>Manutenção e fabricação de motores elétricos</li>
              <li>Ambientes industriais e eletrotécnicos</li>
              <li>Oficinas e centros de reparo</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {!!related?.length && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Produtos semelhantes</h2>
          <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/produto/${r.slug}`} className="group block">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 hover:shadow-sm transition bg-white/60 dark:bg-zinc-900/60">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={r.images?.[0]?.src || '/polus-logo.svg'}
                      alt={r.images?.[0]?.alt || r.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="mt-2 text-sm font-medium line-clamp-2">{prettyTitle(r.title || r.slug)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

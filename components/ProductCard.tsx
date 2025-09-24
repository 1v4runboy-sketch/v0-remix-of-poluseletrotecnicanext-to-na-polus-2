// components/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { prettyTitle } from '../lib/title';
import { brandLogoFor } from '../lib/brand-logos';

type Img = { src: string; alt?: string };
type Variant = { id: string; label: string; images?: Img[] };
type AnyItem = {
  kind?: 'group';
  slug: string;
  title: string;
  brand?: string | null;
  category?: string;
  subcategory?: string;
  shortDescription?: string | null;
  images: Img[];
  variants?: Variant[];
};

function pickCoverImage(item: AnyItem): Img {
  // overrides específicos
  if (item.slug === 'capacitores-permanentes-250v') {
    return { src: '/produtos/capacitor-permanente-250v-02uf-1.webp', alt: item.title };
  }
  if (item.slug === 'capacitores-permanentes-380-400v') {
    return { src: '/produtos/capacitor-permanente-380-400vac-02uf-2.webp', alt: item.title };
  }
  if (item.images?.length) return item.images[0];
  return { src: '/polus-logo.svg', alt: item.title || 'Produto' };
}

export default function ProductCard({ item }: { item: AnyItem }) {
  if (!item || !item.slug) return null;

  const href = `/produto/${item.slug}`;
  const cover = pickCoverImage(item);
  const [imgSrc, setImgSrc] = useState(cover.src);

  useEffect(() => {
    setImgSrc(cover.src);
  }, [cover.src]);

  const brandLogo = brandLogoFor(item);
  const isGroup = item.kind === 'group';
  const title = prettyTitle(item.title || item.slug);

  return (
    <Link href={href} className="group block">
      <article className="relative overflow-hidden rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={imgSrc}
            alt={cover.alt || title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain object-center p-4 group-hover:scale-[1.02] transition-transform"
            priority={false}
            onError={() => setImgSrc('/polus-logo.svg')}
          />
          {brandLogo && (
            <div className="absolute left-2 top-2 bg-white/80 dark:bg-black/60 rounded-md px-2 py-1 shadow-sm">
              <Image
                src={brandLogo.src}
                alt={brandLogo.alt}
                width={64}
                height={20}
                className="h-5 w-auto"
              />
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="line-clamp-2 font-semibold text-zinc-900 dark:text-zinc-100 text-sm md:text-[15px]">
            {title}
          </h3>

          {isGroup && (
            <p className="mt-1 text-[12px] text-zinc-500 dark:text-zinc-400">
              {item.variants?.length ?? 0} variação(ões)
            </p>
          )}

          {item.shortDescription && (
            <p className="mt-1 text-[12px] text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {item.shortDescription}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

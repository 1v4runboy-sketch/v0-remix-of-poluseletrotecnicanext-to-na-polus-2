'use client';
import Link from 'next/link';

function slugify(s: string) {
  return String(s || '')
    .normalize('NFD').replace(/\u0300-\u036f/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function Breadcrumbs({ product, brandName }: { product: any; brandName?: string }) {
  const category = String(product?.category || '').trim();
  const brand = String(brandName || '').trim();

  const items = [
    { name: 'Início', href: '/' },
    brand ? { name: brand, href: `/produtos/${slugify(brand)}` } : null,
    category ? { name: category, href: `/produtos/${slugify(category)}` } : null,
    { name: String(product?.title || product?.slug || 'Produto'), href: '' },
  ].filter(Boolean) as {name: string; href: string}[];

  return (
    <nav className="text-sm text-slate-600 dark:text-slate-300" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1">
              {last || !it.href
                ? <span className="font-medium">{it.name}</span>
                : <Link href={it.href} className="hover:underline">{it.name}</Link>
              }
              {!last && <span className="px-1">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

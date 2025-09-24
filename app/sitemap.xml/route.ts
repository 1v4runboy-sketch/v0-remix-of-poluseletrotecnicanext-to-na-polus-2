import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/withCards';
import { resolveBrand } from '@/lib/site';

function slugify(s: string) {
  return String(s || '')
    .normalize('NFD').replace(/\u0300-\u036f/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.poluseletrotecnica.com.br';

export async function GET() {
  const urls = new Set<string>();
  urls.add(`${BASE}/`);

  for (const p of (PRODUCTS as any[])) {
    if (!p?.slug) continue;
    urls.add(`${BASE}/produto/${p.slug}`);
  }

  const brands = new Set<string>();
  const cats = new Set<string>();
  for (const p of (PRODUCTS as any[])) {
    const b = resolveBrand(p).name;
    if (b) brands.add(`${BASE}/produtos/${slugify(b)}`);
    if (p?.category) cats.add(`${BASE}/produtos/${slugify(String(p.category))}`);
  }
  brands.forEach(u => urls.add(u));
  cats.forEach(u => urls.add(u));

  const today = new Date().toISOString().slice(0,10);
  const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls).map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === BASE + '/' ? '1.0' : '0.6'}</priority></url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}

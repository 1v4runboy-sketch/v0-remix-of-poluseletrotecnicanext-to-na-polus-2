'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import ProductGrid from './ProductGrid';

import type { Product } from '../lib/products';
import { PRODUCTS } from '../lib/products';
import { UNIFIED_PRODUCTS } from '../lib/unified-products';

import { deriveUnifiedFromProducts } from '../lib/unified-derive';
import { visibleSingles } from '../lib/visibility';

// Utils
const norm = (s?: string | null) => (s || '').toLowerCase();
const parseCSV = (v?: string | null) =>
  (v || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
const includesAny = (hay: string, needles: string[]) =>
  !needles.length || needles.some((n) => norm(hay).includes(n));

/** Cria uma “chave de família” canônica para deduplicação/mesclagem de cards unificados. */
function familyKey(p: Product): string {
  const s = norm(p.slug);
  const cat = norm(p.category);
  const sub = norm(p.subcategory);

  // Bases de Motor WEG
  if (s.includes('base') && s.includes('motor') && s.includes('weg')) return 'bases-motor-weg';
  if (cat === 'bases de motor weg') return 'bases-motor-weg';

  // Fitas Lineares
  if (s.includes('fita') && s.includes('linear')) return 'fitas-lineares';
  if (cat === 'fitas lineares') return 'fitas-lineares';

  // Vernizes WEG 5L
  if (s.includes('verniz') && s.includes('weg') && (s.includes('5l') || s.includes('5-l'))) return 'vernizes-weg-5l';

  // Tintas WEG Azul (5002/5007/5009) — manter um único card
  if ((cat === 'tintas e vernizes' && sub === 'tintas weg') && s.includes('tinta-weg-azul')) {
    return 'tintas-weg-azul';
  }

  // Fios Esmaltados (separar alumínio e cobre)
  if (s.includes('fio-aluminio-esmaltado-')) return 'fios-esmaltados-aluminio';
  if (s.includes('fio-de-cobre-esmaltado-')) return 'fios-esmaltados-cobre';

  // Rolamentos (mantemos subfamílias distintas)
  if (s.includes('rolamentos') && s.includes('nsk') && s.includes('zz')) return 'rolamentos-nsk-zz';
  if (s.includes('rolamentos') && s.includes('nsk') && s.includes('ddu')) return 'rolamentos-nsk-ddu';
  if (s.includes('rolamentos') && s.includes('hch') && s.includes('zz')) return 'rolamentos-hch-zz';
  if (s.includes('rolamentos') && s.includes('hch') && s.includes('ddu')) return 'rolamentos-hch-ddu';

  // Default: o próprio slug (não deduplica com outros)
  return p.slug;
}

/** Mescla lista manual + dinâmica por família.
 *  Preferimos o CARD MANUAL (se existir), e adicionamos variações do card dinâmico que faltarem.
 */
function mergeUnifiedCards(manual: Product[], derived: Product[]): Product[] {
  const all = [...manual, ...derived];
  const byKey = new Map<string, Product>();

  for (const item of all) {
    const key = familyKey(item);
    if (!byKey.has(key)) {
      byKey.set(key, { ...item });
      continue;
    }

    // já existe um card para a família
    const chosen = byKey.get(key)!; // mantemos o primeiro (manual vem antes, pois passamos [manual,...derived])

    // Mescla variações
    const toArr = (p?: Product) => (Array.isArray(p?.variants) ? [...p!.variants] : []);
    const a = toArr(chosen);
    const b = toArr(item);
    const seen = new Set<string>();
    const getSlugFromVar = (v: any) => (v?.attrs?.productSlug || v?.id || '').toString();

    for (const v of a) seen.add(getSlugFromVar(v));
    for (const v of b) {
      const keyV = getSlugFromVar(v);
      if (keyV && !seen.has(keyV)) {
        a.push(v);
        seen.add(keyV);
      }
    }

    byKey.set(key, { ...chosen, variants: a });
  }

  // ordena para mostrar cards com mais variações primeiro
  return [...byKey.values()].sort((x, y) => (y.variants?.length || 0) - (x.variants?.length || 0));
}

/** Filtros de busca / categoria / marca */
function applyFilters(items: Product[], opts: { q: string; categories: string[]; brands: string[] }) {
  const { q, categories, brands } = opts;
  const words = q ? q.split(/\s+/).map(w => w.toLowerCase()) : [];
  return items.filter((p) => {
    const hay = `${norm(p.title)} ${norm(p.slug)} ${norm(p.category)} ${norm(p.subcategory)} ${norm(p.brand)}`;
    const textOk = !words.length || words.every(w => hay.includes(w));
    const catOk = includesAny(`${p.category} ${p.subcategory}`, categories);
    const brOk = includesAny(p.brand || '', brands);
    return textOk && catOk && brOk;
  });
}

export default function ProductListPageClient() {
  const searchParams = useSearchParams();
  const q = (searchParams.get('q') || '').trim();
  const categories = parseCSV(searchParams.get('category'));
  const brands = parseCSV(searchParams.get('brand'));

  // 1) Gera unificados dinâmicos a partir do seu lib/products
  const derivedUnified = useMemo(() => deriveUnifiedFromProducts(PRODUCTS), []);

  // 2) Mescla com os cards manuais e elimina duplicações por família
  const unified = useMemo(
    () => mergeUnifiedCards(UNIFIED_PRODUCTS || [], derivedUnified),
    [derivedUnified]
  );

  // 3) Singles visíveis = TODOS os produtos que não são variações dos unificados e não caem nas famílias “forçadas a ocultar”
  const singles = useMemo(() => visibleSingles(PRODUCTS, unified), [unified]);

  // 4) Catálogo final
  const catalog = useMemo(() => [...unified, ...singles], [unified, singles]);

  // 5) Filtros
  const filtered = useMemo(
    () => applyFilters(catalog, { q, categories, brands }),
    [catalog, q, categories.join(','), brands.join(',')]
  );

  // 6) Ordena cards com variações primeiro
  const ordered = useMemo(() => {
    const score = (p: Product) => (Array.isArray(p.variants) && p.variants.length ? 0 : 1);
    return [...filtered].sort((a, b) => score(a) - score(b));
  }, [filtered]);

  // 7) Paginação
  const pageSize = 24;
  const [page, setPage] = React.useState(1);
  const totalPages = Math.max(1, Math.ceil(ordered.length / pageSize));
  const from = (page - 1) * pageSize;
  const pageItems = ordered.slice(from, from + pageSize);
  React.useEffect(() => setPage(1), [q, categories.join(','), brands.join(',')]);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-base md:text-lg font-semibold tracking-tight">Catálogo de Produtos</h2>
          <p className="text-sm text-muted-foreground">
            {ordered.length} resultado{ordered.length === 1 ? '' : 's'}{q ? ` para “${q}”` : ''}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 rounded-md border text-sm hover:bg-accent disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            aria-label="Página anterior"
          >
            ←
          </button>
          <span className="text-sm tabular-nums">{page} / {totalPages}</span>
          <button
            className="px-3 py-1 rounded-md border text-sm hover:bg-accent disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            aria-label="Próxima página"
          >
            →
          </button>
        </div>
      </div>

      {pageItems.length ? (
        <ProductGrid items={pageItems} />
      ) : (
        <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
          Nenhum produto encontrado. Ajuste os filtros ou tente outra busca.
        </div>
      )}
    </div>
  );
}

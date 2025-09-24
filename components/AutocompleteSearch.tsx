'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as SEARCH from '../lib/search';
import { PRODUCTS } from '../lib/products';
import { resolveBrand } from '../lib/site';

export default function AutocompleteSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement|null>(null);

  const idx = useMemo(()=> SEARCH.buildIndex(PRODUCTS as any), []);

  const [debounced, setDebounced] = useState(q);
  useEffect(()=>{
    const id = setTimeout(()=> setDebounced(q), 220);
    return ()=> clearTimeout(id);
  }, [q]);

  const sug = useMemo(()=> SEARCH.suggest(idx, debounced), [idx, debounced]);

  function goToList(params: Record<string, string|string[]>) {
    const qs = new URLSearchParams(Array.from(searchParams.entries()));
    qs.delete('page');
    Object.entries(params).forEach(([k,v])=>{
      if (Array.isArray(v)) qs.set(k, v.join(','));
      else if (v) qs.set(k, v);
      else qs.delete(k);
    });
    router.push(`${pathname}?${qs.toString()}`);
    setOpen(false);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToList({ q });
  }

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <input
          ref={inputRef}
          value={q}
          onChange={(e)=>{ setQ(e.target.value); setOpen(true); }}
          onFocus={()=> setOpen(true)}
          placeholder="Buscar por produto, marca, categoria…"
          className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none"
        />
        <button className="px-3 py-2 text-sm rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900">Buscar</button>
      </form>

      {open && (q.trim().length > 0) && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
          {sug.products.length > 0 && (
            <div className="p-2">
              <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 px-1 mb-1">Produtos</div>
              <ul className="max-h-64 overflow-auto">
                {sug.products.map((p:any)=>{
                  const b = resolveBrand(p).name;
                  return (
                    <li key={p.slug}>
                      <button
                        className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
                        onClick={()=> router.push(`/produto/${p.slug}#product-gallery`)}
                      >
                        <div className="text-sm">{p.title || p.slug}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{b} · {p.category}{p.subcategory ? ` · ${p.subcategory}` : ''}</div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 p-2 border-t border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 px-1 mb-1">Marcas</div>
              <div className="flex flex-wrap gap-1">
                {sug.brands.map((b)=> (
                  <button key={b} onClick={()=> goToList({ q, brand: b })}
                    className="px-2 py-1 rounded-md text-xs ring-1 ring-slate-200 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 px-1 mb-1">Categorias</div>
              <div className="flex flex-wrap gap-1">
                {sug.categories.map((c)=> (
                  <button key={c} onClick={()=> goToList({ q, category: c })}
                    className="px-2 py-1 rounded-md text-xs ring-1 ring-slate-200 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
            Pressione <kbd>Enter</kbd> para buscar por “{q}”
          </div>
        </div>
      )}
    </div>
  );
}

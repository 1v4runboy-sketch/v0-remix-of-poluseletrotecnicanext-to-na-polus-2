// components/ProductListPageClient.tsx
'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductGrid from './ProductGrid'
import { getRenderableCatalog } from '../lib/visibility'

type AnyItem = {
  slug: string
  title: string
  category?: string
  subcategory?: string
  brand?: string | null
  images?: Array<{ src: string; alt: string }>
  shortDescription?: string | null
  variants?: any[]
  cover?: string
  raw?: any
}

function toTitleNice(s: string) {
  if (!s) return s
  // Se já tem espaços/mix de maiúsculas, mantém
  if (/[A-Z]/.test(s) && /\s/.test(s)) return s
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

export default function ProductListPageClient() {
  const router = useRouter()
  const sp = useSearchParams()

  const q = (sp.get('q') || '').trim().toLowerCase()
  const cat = (sp.get('category') || '').trim().toLowerCase()
  const sub = (sp.get('subcategory') || '').trim().toLowerCase()
  const brand = (sp.get('brand') || '').trim().toLowerCase()

  // Carrega dados renderizáveis (famílias + solo permitido)
  const ALL = React.useMemo<AnyItem[]>(() => {
    const data = getRenderableCatalog()
    return data.map((d: any) => ({
      slug: d.slug,
      title: d.title || d.name || d.slug,
      category: d.category || '',
      subcategory: d.subcategory || '',
      brand: d.brand ?? null,
      images: d.images || (d.cover ? [{ src: d.cover, alt: d.title || d.slug }] : []),
      shortDescription: d.shortDescription ?? null,
      variants: d.variants ?? [],
      cover: d.cover || '',
      raw: d,
    }))
  }, [])

  const categories = React.useMemo(() => {
    const set = new Set<string>()
    ALL.forEach((p) => p.category && set.add(p.category))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [ALL])

  const subcategories = React.useMemo(() => {
    const set = new Set<string>()
    ALL.forEach((p) => p.subcategory && set.add(p.subcategory))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [ALL])

  const brands = React.useMemo(() => {
    const set = new Set<string>()
    ALL.forEach((p) => p.brand && set.add(p.brand))
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [ALL])

  const filtered = React.useMemo(() => {
    return ALL.filter((p) => {
      const text = `${p.title ?? ''} ${p.slug ?? ''} ${p.category ?? ''} ${p.subcategory ?? ''} ${p.brand ?? ''}`.toLowerCase()
      const textOk = !q || text.includes(q)
      if (!textOk) return false

      const catOk = !cat || (p.category ?? '').toLowerCase() === cat
      const subOk = !sub || (p.subcategory ?? '').toLowerCase() === sub
      const brOk = !brand || (p.brand ?? '').toLowerCase() === brand
      return catOk && subOk && brOk
    })
  }, [ALL, q, cat, sub, brand])

  const [text, setText] = React.useState<string>(q)
  React.useEffect(() => setText(q), [q])

  function applySearch(partial: { q?: string; category?: string; subcategory?: string; brand?: string }) {
    const params = new URLSearchParams(sp.toString())
    if (partial.q !== undefined) partial.q ? params.set('q', partial.q) : params.delete('q')
    if (partial.category !== undefined) partial.category ? params.set('category', partial.category) : params.delete('category')
    if (partial.subcategory !== undefined) partial.subcategory ? params.set('subcategory', partial.subcategory) : params.delete('subcategory')
    if (partial.brand !== undefined) partial.brand ? params.set('brand', partial.brand) : params.delete('brand')
    const qs = params.toString()
    router.push(qs ? `/?${qs}` : '/')
  }

  return (
    <div className="w-full">
      {/* Busca + filtros (referência do seu layout original) */}
      <div className="mb-4 grid gap-2 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="flex">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applySearch({ q: text })}
            placeholder='ex.: tinta weg 3,6 L, cadarço 3/4"'
            className="w-full rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none
                       dark:border-white/10 dark:bg-[#0d1324]"
          />
          <button
            onClick={() => applySearch({ q: text })}
            className="rounded-r-md bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700"
          >
            Buscar
          </button>
        </div>

        <select
          value={cat}
          onChange={(e) => applySearch({ category: e.target.value })}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none
                     dark:border-white/10 dark:bg-[#0d1324]"
        >
          <option value="">Categoria</option>
          {categories.map((c) => (
            <option key={c} value={c.toLowerCase()}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sub}
          onChange={(e) => applySearch({ subcategory: e.target.value })}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none
                     dark:border-white/10 dark:bg-[#0d1324]"
        >
          <option value="">Subcategoria</option>
          {subcategories.map((s) => (
            <option key={s} value={s.toLowerCase()}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => applySearch({ brand: e.target.value })}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none
                     dark:border-white/10 dark:bg-[#0d1324]"
        >
          <option value="">Marca</option>
          {brands.map((b) => (
            <option key={b} value={b.toLowerCase()}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <ProductGrid
        items={filtered.map((p) => ({
          slug: p.slug,
          title: toTitleNice(p.title),
          subtitle: p.subcategory || p.category || '',
          image: p.images?.[0]?.src || p.cover || '',
          brand: p.brand || null,
          href: `/produto/${p.slug}`,
          raw: p,
        }))}
      />
    </div>
  )
}

'use client'

import * as React from 'react'
import ProductGallery from './ProductGallery'
import ProductCard from './ProductCard'
import { getSimilarProducts } from '../lib/unified-products'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

type ImageLike = { src: string; alt?: string }
type VariantLike = { id: string; label: string; attrs?: Record<string, any> }

type ProductLike = {
  kind?: 'family'
  slug: string
  title?: string
  name?: string
  category?: string
  subcategory?: string
  shortDescription?: string
  description?: string
  brandLogo?: string | { light: string; dark: string }
  images?: ImageLike[]
  cardImage?: ImageLike
  variants?: VariantLike[]
  techSpecs?: Record<string, any>
}

/* ---------- mesma regra de logos do ProductCard, para a “tag” ao lado do título ---------- */

function inferBrandLogo(item: ProductLike): string | { light: string; dark: string } | undefined {
  const slug = (item.slug || '').toLowerCase()
  const title = (item.title || item.name || '').toLowerCase()
  const full = `${slug} ${title}`

  if (full.includes('cadarco') || full.includes('cadarços')) return undefined
  if (/ventoinha-weg-paralela-(63|71|90)/i.test(slug) || /ventoinha.*paralela.*(63|71|90)/i.test(title)) {
    return '/marcas/dsantis-logo.webp'
  }
  if (full.includes('barbante') || full.includes('encerado')) return '/marcas/cifa.webp'
  if (full.includes('jacuzzi') || /bracket.*jacuzzi|flange.*jacuzzi|corpo.*(pre|pré).*filtro.*jacuzzi|cest[oa].*coletor.*jacuzzi/i.test(full)) {
    // Para voltar ao comportamento light= Lanc, dark= Jacuzzi, troque a linha abaixo:
    // return { light: '/marcas/lanc-comercial.webp', dark: '/marcas/jacuzzi.webp' }
    return '/marcas/jacuzzi.webp'
  }
  if (full.includes('resina calas') || /calas.*(95ab|91ac)/i.test(full)) return '/marcas/lanc-comercial.webp'
  if (full.includes('tinta weg') || full.includes('verniz weg') || full.includes('diluente weg')) return '/marcas/weg.webp'
  if (full.includes('fio de cobre') || full.includes('fio cobre')) return '/marcas/condupasqua-logo.svg'
  if (full.includes('fio de aluminio') || full.includes('fio de alumínio') || full.includes('fio-aluminio') || full.includes('fio-alumínio')) {
    return '/marcas/logotipo-sao-marco.webp'
  }
  if (full.includes('rotor igui')) return '/marcas/igui.webp'
  if (full.includes('dancor') || full.includes('flange intermediaria dancor') || full.includes('flange intermediária dancor')) {
    return '/marcas/dancor.webp'
  }
  if (full.includes('solda cobix') || full.includes('cobix')) return '/marcas/cobix.webp'
  return undefined
}

function resolveBrandLogo(item: ProductLike): { type: 'none'|'single'|'themed', light?: string; dark?: string; src?: string } {
  const given = item.brandLogo
  if (typeof given === 'string') return { type: 'single', src: given }
  if (given && typeof given === 'object' && (given.light || given.dark)) {
    return { type: 'themed', light: given.light, dark: given.dark }
  }
  const inferred = inferBrandLogo(item)
  if (typeof inferred === 'string') return { type: 'single', src: inferred }
  if (inferred && typeof inferred === 'object') return { type: 'themed', light: inferred.light, dark: inferred.dark }
  return { type: 'none' }
}

function titleOf(item: ProductLike) {
  const t = (item.title || item.name || '').trim()
  return t || 'Produto'
}

function computeBaseImages(item: ProductLike): ImageLike[] {
  const imgs: ImageLike[] = []
  if (item.cardImage?.src) imgs.push(item.cardImage)
  if (Array.isArray(item.images)) {
    for (const im of item.images) if (im?.src) imgs.push(im)
  }
  if (imgs.length === 0) imgs.push({ src: '/polus-logo.svg', alt: 'Produto' })
  // remove duplicadas
  const seen = new Set<string>()
  return imgs.filter((x) => !seen.has(x.src) && seen.add(x.src))
}

function imagesForVariant(base: ImageLike[], v?: VariantLike | null): ImageLike[] {
  if (!v?.attrs?.image?.src) return base
  const vi: ImageLike = { src: v.attrs.image.src, alt: v.attrs.image.alt || v.label }
  const dedup = [vi, ...base]
  const seen = new Set<string>()
  return dedup.filter((x) => !seen.has(x.src) && seen.add(x.src))
}

/* --------------------------------- Componente --------------------------------- */

export default function ProductPdpClient({ product, initialVariantId }: { product: ProductLike; initialVariantId?: string }) {
  const router = useRouter()
  const search = useSearchParams()
  const galleryRef = React.useRef<HTMLDivElement | null>(null)

  const title = titleOf(product)
  const brand = resolveBrandLogo(product)

  const baseImages = React.useMemo(() => computeBaseImages(product), [product])

  const [openVar, setOpenVar] = React.useState<boolean>(false)
  const [variantId, setVariantId] = React.useState<string | undefined>(
    initialVariantId || (product.variants?.[0]?.id ?? undefined)
  )

  const currentVariant = React.useMemo(
    () => product.variants?.find((v) => v.id === variantId),
    [product.variants, variantId]
  )

  const galleryImages = React.useMemo(
    () => imagesForVariant(baseImages, currentVariant),
    [baseImages, currentVariant]
  )

  // Sempre posicionar na foto ao entrar (e se navegar entre produtos)
  React.useEffect(() => {
    const t = setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 40)
    return () => clearTimeout(t)
  }, [product?.slug])

  // Atualiza URL “shallow” com ?v=... ao trocar variação (sem recarregar a página)
  React.useEffect(() => {
    if (!variantId) return
    const url = new URL(window.location.href)
    url.searchParams.set('v', variantId)
    window.history.replaceState({}, '', url.toString())
  }, [variantId])

  const handleChooseVariant = (v: VariantLike) => {
    setVariantId(v.id)
    // rolar levemente para reforçar foco na galeria
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 10)
  }

  const similar = React.useMemo(
    () => getSimilarProducts(product.slug, product.category || '', 8),
    [product.slug, product.category]
  )

  return (
    <div className="mx-auto max-w-6xl">
      {/* Cabeçalho: Título + marca */}
      <header className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-extrabold uppercase tracking-wide text-slate-900 dark:text-white">
            {title}
          </h1>
          {product.subcategory && (
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {product.category ? `${product.category} · ` : ''}{product.subcategory}
            </div>
          )}
        </div>

        {/* “Chip” da marca ao lado do título */}
        <div className="flex items-center gap-2">
          {brand.type === 'single' && brand.src && (
            <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-2 py-1 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
              <img src={brand.src} alt="Marca" className="h-6 w-auto md:h-7" />
            </span>
          )}
          {brand.type === 'themed' && (
            <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/90 px-2 py-1 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
              {brand.light && <img src={brand.light} alt="Marca" className="h-6 w-auto md:h-7 block dark:hidden" />}
              {brand.dark && <img src={brand.dark} alt="Marca" className="h-6 w-auto md:h-7 hidden dark:block" />}
            </span>
          )}
        </div>
      </header>

      {/* Duas colunas: galeria (esq) + infos (dir) */}
      <section className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Galeria */}
        <div id="media" ref={galleryRef}>
          <ProductGallery images={galleryImages} />
        </div>

        {/* Painel de informações */}
        <aside>
          {/* Descrição curta */}
          {product.shortDescription && (
            <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{product.shortDescription}</p>
          )}

          {/* Seletor de variações */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-5">
              <button
                type="button"
                onClick={() => setOpenVar((v) => !v)}
                className="
                  inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300
                  px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50
                  dark:border-slate-700 dark:text-slate-200 hover:dark:bg-slate-800
                "
              >
                {openVar ? 'Ocultar variações' : 'Selecionar variação'}
                <span className="text-xs text-slate-400">({product.variants.length})</span>
              </button>

              {openVar && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleChooseVariant(v)}
                      className={[
                        'rounded-full border px-3 py-1.5 text-sm transition',
                        v.id === variantId
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 hover:dark:bg-slate-800',
                      ].join(' ')}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Informações técnicas (quando fornecidas) */}
          {product.techSpecs && (
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">
                Informações Técnicas
              </h2>
              <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                <dl className="divide-y divide-slate-200 text-sm dark:divide-slate-700">
                  {Object.entries(product.techSpecs).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 bg-white odd:bg-slate-50 dark:bg-slate-900 dark:odd:bg-slate-950">
                      <dt className="col-span-1 px-3 py-2 font-medium text-slate-700 dark:text-slate-300">{k}</dt>
                      <dd className="col-span-2 px-3 py-2 text-slate-600 dark:text-slate-400">
                        {typeof v === 'string' ? v : JSON.stringify(v)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}

          {/* Descrição longa (se existir) */}
          {product.description && (
            <div className="prose prose-sm max-w-none prose-slate dark:prose-invert">
              <h2>Descrição do Produto</h2>
              <p>{product.description}</p>
            </div>
          )}
        </aside>
      </section>

      {/* Produtos semelhantes */}
      {similar && similar.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-900 dark:text-slate-100">
            Produtos semelhantes
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {similar.map((it: any) => (
              <ProductCard key={it.slug} item={it} anchorMedia />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

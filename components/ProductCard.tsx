'use client'

import Link from 'next/link'
import * as React from 'react'

/** Tipos genéricos para suportar famílias e itens individuais */
type ImageLike = { src: string; alt?: string }
type VariantLike = { id: string; label: string; attrs?: Record<string, any> }

type UnifiedItem = {
  kind?: 'family'
  slug: string
  title?: string
  name?: string
  category?: string
  subcategory?: string
  shortDescription?: string
  brandLogo?: string | { light: string; dark: string }
  images?: ImageLike[]
  cardImage?: ImageLike
  variants?: VariantLike[]
}

type Props = {
  item?: UnifiedItem | null
  /** se true, linka com #media (útil nos “produtos semelhantes”) */
  anchorMedia?: boolean
}

/* --------------------------------- Helpers -------------------------------- */

const WHATS = '551135992935'

// Utilitário seguro
const lc = (s?: string) => (s || '').toLowerCase()

function firstImage(item?: UnifiedItem | null): ImageLike {
  if (item?.cardImage?.src) return item.cardImage
  const im = item?.images?.[0]
  if (im?.src) return im
  return { src: '/polus-logo.svg', alt: 'Produto' }
}

function titleOf(item?: UnifiedItem | null) {
  const t = (item?.title || item?.name || '').trim()
  return t || 'Produto'
}

function slugOf(item?: UnifiedItem | null) {
  return (item?.slug || '').trim()
}

/**
 * Regras de logos por título/slug quando brandLogo não vier no item.
 * (Mesmas regras que combinamos anteriormente.)
 */
function inferBrandLogo(item?: UnifiedItem | null): string | { light: string; dark: string } | undefined {
  if (!item) return undefined

  const slug = lc(item.slug)
  const title = lc(item.title || item.name)
  const full = `${slug} ${title}`

  // Nunca colocar logo em Cadarços
  if (full.includes('cadarco') || full.includes('cadarços') || full.includes('cadarço')) return undefined

  // Ventoinha WEG Similar (paralela 63/71/90)
  if (/ventoinha-weg-paralela-(63|71|90)/i.test(slug) || /ventoinha.*paralela.*(63|71|90)/i.test(title)) {
    return '/marcas/dsantis-logo.webp'
  }

  // Barbante Encerado
  if (full.includes('barbante') || full.includes('encerado')) return '/marcas/cifa.webp'

  // Jacuzzi (Bracket A/B, Flange Adaptadora A, Corpo Pré-filtro A/B, Cesto Coletor A/B)
  if (
    full.includes('jacuzzi') ||
    /bracket.*jacuzzi|flange.*jacuzzi|corpo.*(pre|pré).*filtro.*jacuzzi|cest[oa].*coletor.*jacuzzi/i.test(full)
  ) {
    // Se quiser alternância light/dark (Lanc/Jacuzzi), troque por:
    // return { light: '/marcas/lanc-comercial.webp', dark: '/marcas/jacuzzi.webp' }
    return '/marcas/jacuzzi.webp'
  }

  // Resinas Calas
  if (full.includes('resina calas') || /calas.*(95ab|91ac)/i.test(full)) return '/marcas/lanc-comercial.webp'

  // Tintas / Vernizes / Diluentes WEG
  if (full.includes('tinta weg') || full.includes('verniz weg') || full.includes('diluente weg')) return '/marcas/weg.webp'

  // Fios
  if (full.includes('fio de cobre') || full.includes('fio cobre')) return '/marcas/condupasqua-logo.svg'
  if (full.includes('fio de aluminio') || full.includes('fio de alumínio') || full.includes('fio-aluminio') || full.includes('fio-alumínio')) {
    return '/marcas/logotipo-sao-marco.webp'
  }

  // Rotor Igui
  if (full.includes('rotor igui')) return '/marcas/igui.webp'

  // Dancor
  if (full.includes('dancor') || full.includes('flange intermediaria dancor') || full.includes('flange intermediária dancor')) {
    return '/marcas/dancor.webp'
  }

  // Cobix
  if (full.includes('solda cobix') || full.includes('cobix')) return '/marcas/cobix.webp'

  return undefined
}

function resolveBrandLogo(
  item?: UnifiedItem | null
): { type: 'none' | 'single' | 'themed'; light?: string; dark?: string; src?: string } {
  if (!item) return { type: 'none' }

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

/* ------------------------------- Placeholder ------------------------------- */
/**
 * Se algum item vier undefined, não derruba o grid e não quebra a página.
 * Você pode trocar por um esqueleto se preferir.
 */
function NullCard() {
  if (process.env.NODE_ENV !== 'production') {
    // Ajuda de debug no console do navegador:
    console.warn('[ProductCard] item veio undefined/null — card ignorado.')
  }
  return null
}

/* ------------------------------- Componente -------------------------------- */

export default function ProductCard({ item, anchorMedia }: Props) {
  if (!item) return <NullCard />

  const slug = slugOf(item)
  const title = titleOf(item)
  const brand = resolveBrandLogo(item)
  const hero = firstImage(item)

  // Se o slug estiver vazio por algum motivo, evita quebrar Link
  const href = slug ? `/produto/${slug}${anchorMedia ? '#media' : ''}` : '#'

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden rounded-2xl border
        border-slate-200 bg-white shadow-sm transition
        hover:-translate-y-0.5 hover:shadow-lg
        dark:border-slate-800 dark:bg-slate-950
      "
      aria-label={title}
    >
      {/* Cabeçalho do card: espaço dedicado para a logo (não interfere na foto) */}
      <div className="flex items-center justify-between gap-2 px-3 pt-3">
        {/* Marca (chip) */}
        <div className="min-h-[36px]">
          {brand.type === 'single' && brand.src && (
            <div className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white/90 px-2 py-1 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
              <img
                src={brand.src}
                alt="Marca"
                className="h-6 w-auto md:h-7"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}
          {brand.type === 'themed' && (
            <div className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white/90 px-2 py-1 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
              {brand.light && (
                <img
                  src={brand.light}
                  alt="Marca"
                  className="h-6 w-auto md:h-7 block dark:hidden"
                  loading="lazy"
                  decoding="async"
                />
              )}
              {brand.dark && (
                <img
                  src={brand.dark}
                  alt="Marca"
                  className="h-6 w-auto md:h-7 hidden dark:block"
                  loading="lazy"
                  decoding="async"
                />
              )}
            </div>
          )}
        </div>

        {/* CTA Whats curto */}
        <a
          href={`https://wa.me/${WHATS}?text=${encodeURIComponent(`Olá! Tenho interesse no produto: ${title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden rounded-md border border-emerald-600 px-2 py-1 text-xs font-medium text-emerald-700
            transition hover:bg-emerald-600 hover:text-white
            dark:border-emerald-500 dark:text-emerald-300 hover:dark:bg-emerald-500 hover:dark:text-slate-900
            md:inline-block
          "
        >
          Pedir cotação
        </a>
      </div>

      {/* Imagem central */}
      {/* Se slug faltar, não cria Link clicável para evitar navegação inválida */}
      {slug ? (
        <Link href={href} className="mt-2 block px-3">
          <div
            className="
              relative overflow-hidden rounded-xl border border-slate-200 bg-white
              dark:border-slate-800 dark:bg-slate-900
            "
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={hero.src}
              alt={hero.alt || title}
              className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Link>
      ) : (
        <div className="mt-2 px-3">
          <div
            className="
              relative overflow-hidden rounded-xl border border-slate-200 bg-white
              dark:border-slate-800 dark:bg-slate-900
            "
            style={{ aspectRatio: '1 / 1' }}
          >
            <img
              src={hero.src}
              alt={hero.alt || title}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}

      {/* Título + Subtítulo */}
      <div className="px-3 pb-3 pt-3">
        <h3 className="line-clamp-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {item.shortDescription && (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
            {item.shortDescription}
          </p>
        )}
      </div>

      {/* Ações do card */}
      <div className="mt-auto flex gap-2 px-3 pb-3">
        <Link
          href={href}
          className={[
            'inline-flex flex-1 items-center justify-center rounded-lg border border-slate-300 px-3 py-2',
            'text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50',
            'dark:border-slate-700 dark:text-slate-200 hover:dark:border-slate-600 hover:dark:bg-slate-800',
            !slug ? 'pointer-events-none opacity-50' : '',
          ].join(' ')}
          aria-disabled={!slug}
          tabIndex={!slug ? -1 : 0}
        >
          Ver detalhes
        </Link>
        <a
          href={`https://wa.me/${WHATS}?text=${encodeURIComponent(`Olá! Quero cotar: ${title}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex flex-1 items-center justify-center rounded-lg bg-emerald-600 px-3 py-2
            text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2
            dark:focus-visible:ring-offset-slate-950
          "
        >
          Pedir cotação
        </a>
      </div>
    </article>
  )
}

'use client'

import * as React from 'react'
import ProductCard from './ProductCard'

import { UNIFIED_PRODUCTS } from '../lib/unified-products'
import { PRODUCTS } from '../lib/products'

// Tipos flexíveis para unified + individuais
type Img = { src: string; alt?: string }
type AnyItem = {
  slug?: string
  title?: string
  brand?: string | null
  category?: string
  subcategory?: string
  images?: Img[]
  cover?: Img
  kind?: 'unified' | 'single'
  brandLogo?: string | { light: string; dark: string }
  variants?: any[]
  [key: string]: any
}

// ------------------ REGRAS DE OCULTAÇÃO (soltos que têm família unificada) ------------------
// ATENÇÃO: Estes regex operam sobre o *slug* do produto em lib/products.
const HIDE_SLUG_PATTERNS: RegExp[] = [
  // Cabos
  /^cabo-silicone-/,
  /^cabo-lides-/,

  // Espaguetes
  /^espaguete-flexnor-130c-/,
  /^espaguete-silicone-200c-/,
  /^espaguete-fiberglass/,         // fibra de vidro
  /^espaguetes-flexpoli-155/,      // 155°C

  // Protetores térmicos
  /^protetor-termico-weg-/,

  // Capacitores permanentes (250V, 380/400V, 440/450V)
  /^capacitor-permanente-250v-/,
  /^capacitor-permanente-380-400vac-/,
  /^capacitor-permanente-440-450vac-/,

  // Placas de borne
  /^placa-borne-weg-/,

  // Caixas de ligação WEG
  /^caixa-de-ligacao-weg-/,

  // Cadarços (todas as variações)
  /^cadarco-/,

  // Fitas lineares (unificadas)
  /^fita-linear-/,

  // Bases WEG (unificadas)
  /^base-motor-weg-/,
  /^base-weg-56-extra-grande$/,

  // Rolamentos (famílias unificadas)
  /^rolamento-/,

  // Fios esmaltados (famílias unificadas)
  /^fio-aluminio-esmaltado-/,
  /^fio-de-cobre-esmaltado-/,

  // Tintas WEG Azul (5002/5007/5009) – família unificada
  /^tinta-weg-azul-(5002|5007|5009)-3-6l$/,

  // Vernizes WEG 5L – família unificada (inclui o 1314 com "-secagem-estufa")
  /^verniz-weg-(1303|1333|1314)-5l(?:-secagem-estufa)?$/,

  // Ventoinhas WEG (Similar) – se unificado, esconder individuais
  /^ventoinha-weg-paralela-(63|71|90)$/,

  // NOVOS: esconder individuais de ACAMADORES (família unificada)
  /^acamador-/,

  // NOVOS: esconder todos os PLATINADOS individuais (Weg/Kohlbach; originais/similares)
  /^platinado-/,
]

// “Brancas” que SEMPRE devem aparecer como individuais
const MUST_KEEP_SLUGS: string[] = [
  // Tintas WEG individuais (fora do Azul)
  'tinta-weg-preta-3-6l',
  'tinta-weg-vermelha-criptal-3-6l',

  // Diluentes e Vernizes 1L
  'verniz-weg-1303-1l',
  'diluente-weg-1l',
  'diluente-weg-1014-5l',

  // Itens diversos (devem ficar individuais)
  'solda-cobix-1-5mm-500g',
  'oleo-dieletrico-1l',
  'oleo-dieletrico-5l',
  'resina-calas-95ab-incolor',
  'resina-calas-91ac-vermelha',
  'flange-intermediaria-dancor',
  'rotor-igui',

  // Jacuzzi / Lanc Comercial (ficam individuais)
  'bracket-jacuzzi-a',
  'bracket-jacuzzi-b',
  'flange-adaptadora-jacuzzi-a',
  'corpo-pre-filtro-jacuzzi-a',
  'corpo-pre-filtro-jacuzzi-b',
  'cesto-coletor-jacuzzi-a',
  'cesto-coletor-jacuzzi-b',

  // Barbante
  'barbante-encerado-300g',
]

// Liberações pontuais para permitir um “solto” específico mesmo se o regex bloquear
const EXCEPTIONS_ALLOW_SOLTO: string[] = [
  // 'exemplo-de-slug-que-quero-mostrar-mesmo-sendo-solto'
]

// ------------------ HELPERS ------------------
const normalize = (s?: string) =>
  (s || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

function isHiddenBySlug(slug: string) {
  if (!slug) return false
  if (MUST_KEEP_SLUGS.includes(slug)) return false
  if (EXCEPTIONS_ALLOW_SOLTO.includes(slug)) return false
  return HIDE_SLUG_PATTERNS.some((re) => re.test(slug))
}

// Garante imagem de capa
function adaptForCard(item: AnyItem): AnyItem | null {
  const slug = item.slug
  const title = item.title || item.familyTitle || item.name
  if (!slug || !title) return null

  let images: Img[] = []
  if (Array.isArray(item.images) && item.images.length) {
    images = item.images
  } else if (item.cover && item.cover.src) {
    images = [item.cover]
  }
  if (!images.length) {
    images = [{ src: '/produtos/placeholder.webp', alt: String(title) }]
  }

  return { ...item, slug, title, images }
}

function getUnifiedCards(): AnyItem[] {
  return UNIFIED_PRODUCTS
    .map((u: AnyItem) => ({ ...u, kind: 'unified' as const }))
    .map(adaptForCard)
    .filter(Boolean) as AnyItem[]
}

function getStandaloneCards(): AnyItem[] {
  const kept = PRODUCTS.filter((p: AnyItem) => {
    const slug = p.slug || ''
    if (MUST_KEEP_SLUGS.includes(slug)) return true
    if (isHiddenBySlug(slug)) return false
    return true
  })

  return kept
    .map((s: AnyItem) => ({ ...s, kind: 'single' as const }))
    .map(adaptForCard)
    .filter(Boolean) as AnyItem[]
}

function sortForGrid(a: AnyItem, b: AnyItem) {
  const ka = a.kind === 'unified' ? 0 : 1
  const kb = b.kind === 'unified' ? 0 : 1
  if (ka !== kb) return ka - kb
  return normalize(a.title).localeCompare(normalize(b.title))
}

// ------------------ COMPONENTE ------------------
export default function ProductListPageClient() {
  const [items, setItems] = React.useState<AnyItem[]>([])

  React.useEffect(() => {
    const unified = getUnifiedCards()
    const singles = getStandaloneCards()

    const seen = new Set<string>()
    const merged: AnyItem[] = []
    for (const it of [...unified, ...singles]) {
      if (!it?.slug) continue
      if (seen.has(it.slug)) continue
      seen.add(it.slug)
      merged.push(it)
    }

    setItems(merged.sort(sortForGrid))
  }, [])

  return (
    <section className="w-full">
      <div
        className="
          grid gap-4
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {items.length > 0 ? (
          items.map((item) => <ProductCard key={item.slug} item={item} />)
        ) : (
          <div className="col-span-full text-center text-slate-500 dark:text-slate-300 py-10">
            Nenhum produto para exibir.
          </div>
        )}
      </div>
    </section>
  )
}

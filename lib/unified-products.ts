// lib/unified-products.ts
// -----------------------------------------------------------------------------
// Catálogo unificado (famílias) + filtros para esconder itens "soltos" (individuais)
// Este arquivo:
// - Exibe os cards unificados na Home (famílias principais);
// - Esconde duplicatas "soltas" destes mesmos grupos;
// - Resolve imagens automaticamente de produtos individuais (quando possível);
// - Fornece utilitários para a Home e PDP.
// -----------------------------------------------------------------------------

import { PRODUCTS } from './products'

// --------------------------- Tipos -------------------------------------------

export type ImageLike = { src: string; alt?: string }

export type VariantLike = {
  id: string
  label: string
  attrs?: Record<string, any> // { uf, awg, diametro_mm, image, ... }
}

export type UnifiedProduct = {
  kind: 'family'
  slug: string
  title: string
  category: string
  subcategory?: string
  shortDescription?: string
  brandLogo?: string | { light: string; dark: string }
  images: ImageLike[]
  cardImage?: ImageLike
  variants?: VariantLike[]
  techSpecs?: Record<string, any>
}

// ----------------------- Helpers: imagens/extração ---------------------------

type AnyProduct = any

function productMatches(p: AnyProduct, re: RegExp) {
  const s = String(p?.slug || '')
  const t = String(p?.title || p?.name || '')
  return re.test(s) || re.test(t)
}

function extractImagesFromProduct(p: AnyProduct): ImageLike[] {
  // Tenta cardImage -> images[] -> image
  const arr: ImageLike[] = []
  if (p?.cardImage?.src) arr.push({ src: p.cardImage.src, alt: p.cardImage.alt || p.title || p.name })
  if (Array.isArray(p?.images)) {
    for (const im of p.images) {
      if (im?.src) arr.push({ src: im.src, alt: im.alt || p.title || p.name })
    }
  }
  if (p?.image) arr.push({ src: p.image, alt: p.title || p.name })
  // Filtro de duplicadas por src
  const seen = new Set<string>()
  return arr.filter((im) => {
    if (!im?.src) return false
    if (seen.has(im.src)) return false
    seen.add(im.src)
    return true
  })
}

function imagesFromMatches(regexes: RegExp[], limit = 3): ImageLike[] {
  const imgs: ImageLike[] = []
  const seen = new Set<string>()
  for (const re of regexes) {
    for (const p of PRODUCTS) {
      if (productMatches(p, re)) {
        const arr = extractImagesFromProduct(p)
        for (const im of arr) {
          if (im?.src && !seen.has(im.src)) {
            imgs.push(im)
            seen.add(im.src)
            if (imgs.length >= limit) return imgs
          }
        }
      }
    }
  }
  return imgs
}

function firstImageFrom(regexes: RegExp[], fallbackAlt = 'Produto'): ImageLike {
  const list = imagesFromMatches(regexes, 1)
  if (list.length) return list[0]
  return { src: '/polus-logo.svg', alt: fallbackAlt }
}

function padUF(n: number) {
  return n < 10 ? `0${n}` : String(n)
}

function findCapacitorPermanenteImage(
  sistema: '250v'|'380-400vac'|'440-450vac',
  uf: number
): ImageLike | undefined {
  const patterns = [
    new RegExp(`^capacitor-permanente-${sistema}-${padUF(uf)}uf`, 'i'),
    new RegExp(`^capacitor-permanente-${sistema}-${uf}uf`, 'i'),
  ]
  const imgs = imagesFromMatches(patterns, 1)
  return imgs[0]
}

function listBearingSizes(brand: 'hch'|'nsk', seal: 'zz'|'ddu') {
  const set = new Set<string>()
  for (const p of PRODUCTS) {
    const m = String(p?.slug || '').match(new RegExp(`^rolamento-(\\d{3,4})-${brand}-${seal}$`, 'i'))
    if (m && m[1]) set.add(m[1])
  }
  const list = Array.from(set).sort((a, b) => Number(a) - Number(b))
  return list.map((num) => ({ id: `${brand}-${seal}-${num}`, label: num }))
}

// ----------------------- Famílias (cards unificados) -------------------------

const FAMILIAS: UnifiedProduct[] = [
  // ---------------------------------------------------------------------------
  // CABOS
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'cabos-silicone',
    title: 'Cabos de Silicone',
    category: 'Cabos',
    subcategory: 'Silicone',
    shortDescription: 'Cabos de silicone para alta temperatura (inclui 22 AWG).',
    brandLogo: '/marcas/tramar.webp',
    images: imagesFromMatches([/^cabo-silicone-\d{2}awg-/i], 3).length
      ? imagesFromMatches([/^cabo-silicone-\d{2}awg-/i], 3)
      : [{ src: '/polus-logo.svg', alt: 'Cabos de Silicone' }],
    cardImage: firstImageFrom([/^cabo-silicone-\d{2}awg-/i], 'Cabos de Silicone'),
    variants: [22, 24, 20, 18, 16, 14, 12, 10].map((awg) => ({
      id: `sil-${awg}awg`,
      label: `${awg} AWG`,
      attrs: { awg }
    })),
  },
  {
    kind: 'family',
    slug: 'cabos-lides',
    title: 'Cabos Lides',
    category: 'Cabos',
    subcategory: 'Lides (LEEDS)',
    shortDescription: 'Cabos lides em várias bitolas (inclui 22 AWG).',
    brandLogo: '/marcas/cofibam.webp',
    images: imagesFromMatches([/^cabo-lides-\d{2}awg-/i], 3).length
      ? imagesFromMatches([/^cabo-lides-\d{2}awg-/i], 3)
      : [{ src: '/polus-logo.svg', alt: 'Cabos Lides' }],
    cardImage: firstImageFrom([/^cabo-lides-\d{2}awg-/i], 'Cabos Lides'),
    variants: [22, 24, 20, 18, 16, 14, 12, 10].map((awg) => ({
      id: `lides-${awg}awg`,
      label: `${awg} AWG`,
      attrs: { awg }
    })),
  },

  // ---------------------------------------------------------------------------
  // ESPAGUETES
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'espaguete-silicone-200c',
    title: 'Espaguete Silicone 200 °C',
    category: 'Isolantes',
    subcategory: 'Espaguete 200 °C',
    shortDescription: 'Espaguete de silicone para 200 °C em diversas bitolas.',
    brandLogo: '/marcas/tramar.webp',
    images: imagesFromMatches([/^espaguete-silicone-200c-/i], 3).length
      ? imagesFromMatches([/^espaguete-silicone-200c-/i], 3)
      : [
          { src: '/produtos/espaguetes-silicone-200-1.webp', alt: 'Espaguete Silicone 200 °C' },
          { src: '/produtos/espaguetes-silicone-200-2.webp', alt: 'Espaguete Silicone 200 °C' },
        ],
    cardImage: firstImageFrom([/^espaguete-silicone-200c-/i], 'Espaguete Silicone 200 °C'),
    variants: [
      '0,08 mm','1,00 mm','2,00 mm','3,00 mm','4,00 mm','4,50 mm','5,00 mm','6,00 mm',
      '7,00 mm','8,00 mm','10,00 mm','12,00 mm','14,00 mm','15,00 mm','16,00 mm',
      '18,00 mm','20,00 mm','25,00 mm'
    ].map((label, i) => ({ id: `es200-${i}`, label })),
  },

  {
    kind: 'family',
    slug: 'espaguete-flexnor-130c',
    title: 'Espaguete Flexnor 130 °C',
    category: 'Isolantes',
    subcategory: 'Espaguete 130 °C',
    shortDescription: 'Espaguete 130 °C (Flexnor) por bitola.',
    brandLogo: '/marcas/cofibam.webp',
    images: imagesFromMatches([/^espaguete-flexnor-130c-/i], 3).length
      ? imagesFromMatches([/^espaguete-flexnor-130c-/i], 3)
      : [
          { src: '/produtos/espaguetes-flexnor-130-1.webp', alt: 'Espaguete Flexnor 130 °C' },
          { src: '/produtos/espaguetes-flexnor-130-2.webp', alt: 'Espaguete Flexnor 130 °C' },
        ],
    cardImage: firstImageFrom([/^espaguete-flexnor-130c-/i], 'Espaguete Flexnor 130 °C'),
    variants: [
      '0,08 mm','1,00 mm','2,00 mm','3,00 mm','4,00 mm','4,50 mm','5,00 mm','6,00 mm',
      '7,00 mm','8,00 mm','10,00 mm','12,00 mm','14,00 mm','15,00 mm','16,00 mm',
      '18,00 mm','20,00 mm','25,00 mm'
    ].map((label, i) => ({ id: `es130-${i}`, label })),
  },

  {
    kind: 'family',
    slug: 'espaguete-155c',
    title: 'Espaguete 155 °C',
    category: 'Isolantes',
    subcategory: 'Espaguete 155 °C',
    shortDescription: 'Espaguete Flexpoli 155 °C em várias bitolas.',
    brandLogo: '/marcas/cofibam.webp',
    images: [
      { src: '/produtos/espaguetes-flexpoli-155-1.webp', alt: 'Espaguete 155 °C' },
      { src: '/produtos/espaguetes-flexpoli-155-2.webp', alt: 'Espaguete 155 °C' },
    ],
    cardImage: { src: '/produtos/espaguetes-flexpoli-155-1.webp', alt: 'Espaguete 155 °C' },
    variants: [
      '0,08 mm','1,00 mm','2,00 mm','3,00 mm','4,00 mm','4,50 mm','5,00 mm','6,00 mm',
      '7,00 mm','8,00 mm','10,00 mm','12,00 mm','14,00 mm','15,00 mm','16,00 mm',
      '18,00 mm','20,00 mm','25,00 mm'
    ].map((label, i) => ({ id: `es155-${i}`, label })),
  },

  {
    kind: 'family',
    slug: 'espaguete-fibra-de-vidro',
    title: 'Espaguete Fibra de Vidro',
    category: 'Isolantes',
    subcategory: 'Espaguete Fibra de Vidro',
    shortDescription: 'Espaguete de fibra de vidro com excelente resistência térmica.',
    brandLogo: '/marcas/tramar.webp',
    images: [
      { src: '/produtos/espaguete-fiberglass-1.webp', alt: 'Espaguete Fibra de Vidro' },
      { src: '/produtos/espaguete-fiberglass-2.webp', alt: 'Espaguete Fibra de Vidro' },
    ],
    cardImage: { src: '/produtos/espaguete-fiberglass-1.webp', alt: 'Espaguete Fibra de Vidro' },
    variants: ['1,00 mm','2,00 mm','3,00 mm','4,00 mm','5,00 mm','6,00 mm','8,00 mm','10,00 mm']
      .map((label, i) => ({ id: `fib-${i}`, label })),
  },

  // ---------------------------------------------------------------------------
  // CAPACITORES PERMANENTES (RUN)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'capacitores-permanentes-250v',
    title: 'Capacitores Permanentes 250 V',
    category: 'Capacitores',
    subcategory: 'Permanentes 250 V',
    shortDescription: 'Linha completa de 02 µF a 100 µF.',
    brandLogo: '/marcas/jl-capacitores.webp',
    images: imagesFromMatches([/^capacitor-permanente-250v-/i], 3).length
      ? imagesFromMatches([/^capacitor-permanente-250v-/i], 3)
      : [{ src: '/produtos/capacitor-permanente-250v-02uf-1.webp', alt: 'Capacitor Permanente 250V' }],
    cardImage: firstImageFrom([/^capacitor-permanente-250v-/i], 'Capacitor Permanente 250V'),
    variants: [2,3,4,5,6,7,8,10,12,15,18,20,22,25,30,40,45,50,55,60,65,70,80,90,100].map((uf) => ({
      id: `cp250-${uf}uf`,
      label: `${String(uf).padStart(2,'0')} µF`,
      attrs: { uf, image: findCapacitorPermanenteImage('250v', uf) }
    })),
  },
  {
    kind: 'family',
    slug: 'capacitores-permanentes-380-400vac',
    title: 'Capacitores Permanentes 380–400 VAC',
    category: 'Capacitores',
    subcategory: 'Permanentes 380–400 VAC',
    shortDescription: 'Linha completa de 02 µF a 100 µF.',
    brandLogo: '/marcas/jl-capacitores.webp',
    images: imagesFromMatches([/^capacitor-permanente-380-400vac-/i], 3).length
      ? imagesFromMatches([/^capacitor-permanente-380-400vac-/i], 3)
      : [{ src: '/produtos/capacitor-permanente-380-400vac-02uf-2.webp', alt: 'Capacitor Permanente 380–400VAC' }],
    cardImage: firstImageFrom([/^capacitor-permanente-380-400vac-/i], 'Capacitor Permanente 380–400VAC'),
    variants: [2,3,4,5,6,7,8,9,10,12,15,16,18,20,25,30,35,40,45,50,55,60,65,70,80,90,100].map((uf) => ({
      id: `cp380-${uf}uf`,
      label: `${String(uf).padStart(2,'0')} µF`,
      attrs: { uf, image: findCapacitorPermanenteImage('380-400vac', uf) }
    })),
  },
  {
    kind: 'family',
    slug: 'capacitores-permanentes-440-450vac',
    title: 'Capacitores Permanentes 440–450 VAC',
    category: 'Capacitores',
    subcategory: 'Permanentes 440–450 VAC',
    shortDescription: 'Linha completa de 02 µF a 100 µF.',
    brandLogo: '/marcas/jl-capacitores.webp',
    images: imagesFromMatches([/^capacitor-permanente-440-450vac-/i], 3).length
      ? imagesFromMatches([/^capacitor-permanente-440-450vac-/i], 3)
      : [{ src: '/polus-logo.svg', alt: 'Capacitor Permanente 440–450VAC' }],
    cardImage: firstImageFrom([/^capacitor-permanente-440-450vac-/i], 'Capacitor Permanente 440–450VAC'),
    variants: [2,3,4,5,6,7,8,9,10,12,15,16,18,20,25,30,35,40,45,50,55,60,65,70,80,90,100].map((uf) => ({
      id: `cp440-${uf}uf`,
      label: `${String(uf).padStart(2,'0')} µF`,
      attrs: { uf, image: findCapacitorPermanenteImage('440-450vac', uf) }
    })),
  },

  // ---------------------------------------------------------------------------
  // CAPACITORES ELETROLÍTICOS (mantidos)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'capacitores-eletroliticos-110v',
    title: 'Capacitores Eletrolíticos 110 V',
    category: 'Capacitores',
    subcategory: 'Eletrolíticos 110 V',
    brandLogo: '/marcas/jl-capacitores.webp',
    images: [
      { src: '/produtos/capacitor-eletrolitico-eletrolitico-110v-1.webp', alt: 'Eletrolítico 110V' },
      { src: '/produtos/capacitor-eletrolitico-eletrolitico-110v-2.webp', alt: 'Eletrolítico 110V' },
    ],
    variants: [10,22,33,47,68,82,100].map((uf, i) => ({ id: `e110-${i}`, label: `${uf} µF`, attrs: { uf } })),
  },
  {
    kind: 'family',
    slug: 'capacitores-eletroliticos-220v',
    title: 'Capacitores Eletrolíticos 220 V',
    category: 'Capacitores',
    subcategory: 'Eletrolíticos 220 V',
    brandLogo: '/marcas/jl-capacitores.webp',
    images: [
      { src: '/produtos/capacitor-eletrolitico-eletrolitico-220v-1.webp', alt: 'Eletrolítico 220V' },
      { src: '/produtos/capacitor-eletrolitico-eletrolitico-220v-2.webp', alt: 'Eletrolítico 220V' },
    ],
    variants: [10,22,33,47,68,82,100].map((uf, i) => ({ id: `e220-${i}`, label: `${uf} µF`, attrs: { uf } })),
  },
  {
    kind: 'family',
    slug: 'capacitores-eletroliticos-mini',
    title: 'Capacitores Eletrolíticos Mini',
    category: 'Capacitores',
    subcategory: 'Eletrolíticos Mini',
    brandLogo: '/marcas/jl-capacitores.webp',
    images: [
      { src: '/produtos/capacitor-mini-1.webp', alt: 'Eletrolítico Mini' },
      { src: '/produtos/capacitor-mini-2.webp', alt: 'Eletrolítico Mini' },
    ],
    variants: [10,22,33,47,68].map((uf, i) => ({ id: `emin-${i}`, label: `${uf} µF`, attrs: { uf } })),
  },

  // ---------------------------------------------------------------------------
  // PROTETORES TÉRMICOS WEG
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'protetores-termicos-weg',
    title: 'Protetores Térmicos WEG',
    category: 'Proteção',
    subcategory: 'Protetores Térmicos',
    brandLogo: '/marcas/weg.webp',
    images: imagesFromMatches([/^protetor-termico-weg-(130c|155c|180c)$/i], 3).length
      ? imagesFromMatches([/^protetor-termico-weg-(130c|155c|180c)$/i], 3)
      : [{ src: '/produtos/protetor-termico-weg-130c-1.webp', alt: 'Protetor Térmico WEG' }],
    cardImage: firstImageFrom([/^protetor-termico-weg-(130c|155c|180c)$/i], 'Protetores Térmicos WEG'),
    variants: [
      { id: 'pt-130', label: '130 °C' },
      { id: 'pt-155', label: '155 °C' },
      { id: 'pt-180', label: '180 °C' },
    ],
  },

  // ---------------------------------------------------------------------------
  // CADARÇOS (sem logo, medidas fracionadas)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'cadarcos-laranja',
    title: 'Cadarços Laranja',
    category: 'Cadarços',
    shortDescription: 'Medidas: 1/2", 5/8", 3/4", 1".',
    images: imagesFromMatches([/^cadarco-laranja-/i], 3).length
      ? imagesFromMatches([/^cadarco-laranja-/i], 3)
      : [{ src: '/produtos/cadarco-laranja-1.webp', alt: 'Cadarço Laranja' }],
    cardImage: firstImageFrom([/^cadarco-laranja-/i], 'Cadarços Laranja'),
    variants: ['1/2"', '5/8"', '3/4"', '1"'].map((label, i) => ({ id: `cl-${i}`, label })),
  },
  {
    kind: 'family',
    slug: 'cadarcos-algodao',
    title: 'Cadarços Algodão',
    category: 'Cadarços',
    shortDescription: 'Medidas: 1/2", 5/8", 3/4", 1".',
    images: imagesFromMatches([/^cadarco-algodao-/i], 3).length
      ? imagesFromMatches([/^cadarco-algodao-/i], 3)
      : [{ src: '/produtos/cadarco-algodao-1.webp', alt: 'Cadarço Algodão' }],
    cardImage: firstImageFrom([/^cadarco-algodao-/i], 'Cadarços Algodão'),
    variants: ['1/2"', '5/8"', '3/4"', '1"'].map((label, i) => ({ id: `ca-${i}`, label })),
  },
  {
    kind: 'family',
    slug: 'cadarcos-fibra-de-vidro',
    title: 'Cadarços Fibra de Vidro',
    category: 'Cadarços',
    shortDescription: 'Medidas: 1/2", 5/8", 3/4", 1".',
    images: imagesFromMatches([/^cadarco-fibra-de-vidro-/i], 3).length
      ? imagesFromMatches([/^cadarco-fibra-de-vidro-/i], 3)
      : [{ src: '/produtos/cadarco-fibra-vidro-1.webp', alt: 'Cadarço Fibra de Vidro' }],
    cardImage: firstImageFrom([/^cadarco-fibra-de-vidro-/i], 'Cadarços Fibra de Vidro'),
    variants: ['1/2"', '5/8"', '3/4"', '1"'].map((label, i) => ({ id: `cf-${i}`, label })),
  },
  {
    kind: 'family',
    slug: 'cadarcos-poliester',
    title: 'Cadarços Poliéster',
    category: 'Cadarços',
    shortDescription: 'Medidas: 1/2", 5/8", 3/4", 1".',
    images: imagesFromMatches([/^cadarco-poliester-/i], 3).length
      ? imagesFromMatches([/^cadarco-poliester-/i], 3)
      : [{ src: '/produtos/cadarco-poliester-1.webp', alt: 'Cadarço Poliéster' }],
    cardImage: firstImageFrom([/^cadarco-poliester-/i], 'Cadarços Poliéster'),
    variants: ['1/2"', '5/8"', '3/4"', '1"'].map((label, i) => ({ id: `cp-${i}`, label })),
  },

  // ---------------------------------------------------------------------------
  // FITA LINEAR
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'fita-linear',
    title: 'Fita Linear',
    category: 'Isolantes',
    subcategory: 'Fitas',
    shortDescription: 'Fitas lineares por largura (6–25 mm).',
    images: imagesFromMatches([/^fita-linear-(6mm|12mm|19mm|25mm)$/i], 3).length
      ? imagesFromMatches([/^fita-linear-(6mm|12mm|19mm|25mm)$/i], 3)
      : [{ src: '/produtos/fita-linear-6mm-1.webp', alt: 'Fita Linear' }],
    cardImage: firstImageFrom([/^fita-linear-(6mm|12mm|19mm|25mm)$/i], 'Fita Linear'),
    variants: ['6 mm', '12 mm', '19 mm', '25 mm'].map((label, i) => ({ id: `fl-${i}`, label })),
  },

  // ---------------------------------------------------------------------------
  // BASE PARA MOTORES WEG
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'base-motores-weg',
    title: 'Base para Motores WEG',
    category: 'Componentes e Peças',
    subcategory: 'Bases',
    brandLogo: '/marcas/weg.webp',
    images: imagesFromMatches(
      [/^base-motor-weg-(42w-pequena|48w-media|56w-grande)$/i, /^base-weg-56-extra-grande$/i],
      3
    ).length
      ? imagesFromMatches(
          [/^base-motor-weg-(42w-pequena|48w-media|56w-grande)$/i, /^base-weg-56-extra-grande$/i],
          3
        )
      : [{ src: '/produtos/base-motor-weg-48w-media-1.webp', alt: 'Base Motor WEG' }],
    cardImage: firstImageFrom(
      [/^base-motor-weg-(42w-pequena|48w-media|56w-grande)$/i, /^base-weg-56-extra-grande$/i],
      'Base Motor WEG'
    ),
    variants: [
      { id: 'b-42w', label: '42W (Pequena)' },
      { id: 'b-48w', label: '48W (Média)' },
      { id: 'b-56w', label: '56W (Grande)' },
      { id: 'b-56x', label: '56 (Extra Grande)' },
    ],
  },

  // ---------------------------------------------------------------------------
  // ROLAMENTOS — 4 FAMÍLIAS (NSK/HCH x ZZ/DDU)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'rolamentos-nsk-zz',
    title: 'Rolamentos NSK ZZ',
    category: 'Rolamentos',
    shortDescription: 'Linha NSK com blindagem ZZ.',
    brandLogo: '/marcas/nsk-logo.webp',
    images: imagesFromMatches([/^rolamento-\d{3,4}-nsk-zz$/i], 3).length
      ? imagesFromMatches([/^rolamento-\d{3,4}-nsk-zz$/i], 3)
      : [{ src: '/produtos/rolamento-6203-nsk-zz-1.webp', alt: 'Rolamentos NSK ZZ' }],
    cardImage: firstImageFrom([/^rolamento-\d{3,4}-nsk-zz$/i], 'Rolamentos NSK ZZ'),
    variants: listBearingSizes('nsk', 'zz'),
  },
  {
    kind: 'family',
    slug: 'rolamentos-nsk-ddu',
    title: 'Rolamentos NSK DDU',
    category: 'Rolamentos',
    shortDescription: 'Linha NSK com vedação DDU.',
    brandLogo: '/marcas/nsk-logo.webp',
    images: imagesFromMatches([/^rolamento-\d{3,4}-nsk-ddu$/i], 3).length
      ? imagesFromMatches([/^rolamento-\d{3,4}-nsk-ddu$/i], 3)
      : [{ src: '/produtos/rolamento-6203-nsk-zz-1.webp', alt: 'Rolamentos NSK DDU' }],
    cardImage: firstImageFrom([/^rolamento-\d{3,4}-nsk-ddu$/i], 'Rolamentos NSK DDU'),
    variants: listBearingSizes('nsk', 'ddu'),
  },
  {
    kind: 'family',
    slug: 'rolamentos-hch-zz',
    title: 'Rolamentos HCH ZZ',
    category: 'Rolamentos',
    shortDescription: 'Linha HCH com blindagem ZZ.',
    brandLogo: '/marcas/hch-logo.webp',
    images: imagesFromMatches([/^rolamento-\d{3,4}-hch-zz$/i], 3).length
      ? imagesFromMatches([/^rolamento-\d{3,4}-hch-zz$/i], 3)
      : [{ src: '/produtos/rolamento-6203-nsk-zz-1.webp', alt: 'Rolamentos HCH ZZ' }],
    cardImage: firstImageFrom([/^rolamento-\d{3,4}-hch-zz$/i], 'Rolamentos HCH ZZ'),
    variants: listBearingSizes('hch', 'zz'),
  },
  {
    kind: 'family',
    slug: 'rolamentos-hch-ddu',
    title: 'Rolamentos HCH DDU',
    category: 'Rolamentos',
    shortDescription: 'Linha HCH com vedação DDU.',
    brandLogo: '/marcas/hch-logo.webp',
    images: imagesFromMatches([/^rolamento-\d{3,4}-hch-ddu$/i], 3).length
      ? imagesFromMatches([/^rolamento-\d{3,4}-hch-ddu$/i], 3)
      : [{ src: '/produtos/rolamento-6203-nsk-zz-1.webp', alt: 'Rolamentos HCH DDU' }],
    cardImage: firstImageFrom([/^rolamento-\d{3,4}-hch-ddu$/i], 'Rolamentos HCH DDU'),
    variants: listBearingSizes('hch', 'ddu'),
  },

  // ---------------------------------------------------------------------------
  // PLACA DE BORNE WEG (unificado)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'placa-borne-weg',
    title: 'Placas de Borne WEG',
    category: 'Componentes e Peças',
    subcategory: 'Placas de Borne',
    brandLogo: '/marcas/weg.webp',
    images: imagesFromMatches([/^placa-borne-weg-k1m\d+$/i], 3).length
      ? imagesFromMatches([/^placa-borne-weg-k1m\d+$/i], 3)
      : [{ src: '/produtos/placa-borne-weg-k1m4-1.webp', alt: 'Placa de Borne WEG' }],
    cardImage: firstImageFrom([/^placa-borne-weg-k1m\d+$/i], 'Placa de Borne WEG'),
  },

  // ---------------------------------------------------------------------------
  // TINTA WEG AZUL 3,6 L
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'tinta-weg-azul-3-6l',
    title: 'Tinta WEG Azul 3,6 L',
    category: 'Tintas e Vernizes',
    subcategory: 'Tintas WEG',
    brandLogo: '/marcas/weg.webp',
    images: imagesFromMatches([/^tinta-weg-azul-(5002|5007|5009)-3-6l$/i], 3).length
      ? imagesFromMatches([/^tinta-weg-azul-(5002|5007|5009)-3-6l$/i], 3)
      : [{ src: '/produtos/tinta-weg-azul-5002-3-6l-1.webp', alt: 'Tinta WEG Azul' }],
    cardImage: firstImageFrom([/^tinta-weg-azul-(5002|5007|5009)-3-6l$/i], 'Tinta WEG Azul 3,6 L'),
    variants: [
      { id: 'az-5002', label: '5002' },
      { id: 'az-5007', label: '5007' },
      { id: 'az-5009', label: '5009' },
    ],
  },

  // ---------------------------------------------------------------------------
  // CAIXAS DE LIGAÇÃO WEG (unificado)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'caixas-de-ligacao-weg',
    title: 'Caixas de Ligação WEG',
    category: 'Componentes e Peças',
    subcategory: 'Caixas',
    brandLogo: '/marcas/weg.webp',
    images: imagesFromMatches([
      /^caixa-de-ligacao-weg-(63-71-80|90-100|112-132|160-180|200)$/i
    ], 3).length
      ? imagesFromMatches([/^caixa-de-ligacao-weg-(63-71-80|90-100|112-132|160-180|200)$/i], 3)
      : [{ src: '/produtos/caixa-de-ligacao-weg-63-71-80-1.webp', alt: 'Caixa de Ligação WEG' }],
    cardImage: firstImageFrom([/^caixa-de-ligacao-weg-(63-71-80|90-100|112-132|160-180|200)$/i], 'Caixas de Ligação WEG'),
    variants: [
      { id: 'cx-63-71-80', label: '63/71/80' },
      { id: 'cx-90-100',  label: '90/100' },
      { id: 'cx-112-132', label: '112/132' },
      { id: 'cx-160-180', label: '160/180' },
      { id: 'cx-200',     label: '200' },
    ],
  },

  // ---------------------------------------------------------------------------
  // TINTAS I9 COLOR — nomes de arquivos com underscore (_)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'tintas-i9-color',
    title: 'Tintas I9 Color',
    category: 'Tintas e Vernizes',
    subcategory: 'I9 Color',
    shortDescription: 'Cores unificadas I9 Color.',
    images: [
      { src: '/produtos/i9_color_preto_brilhante_1.webp', alt: 'I9 Color Preto Brilhante' },
      { src: '/produtos/i9_color_verde.webp', alt: 'I9 Color Verde' },
      { src: '/produtos/i9_color_amarelo_1.webp', alt: 'I9 Color Amarelo' },
      { src: '/produtos/i9_color_preto_fosco_1.webp', alt: 'I9 Color Preto Fosco' },
      { src: '/produtos/i9_color_vermelho.webp', alt: 'I9 Color Vermelho' },
      { src: '/produtos/i9_color_cinza_placa_1.webp', alt: 'I9 Color Cinza Placa' },
      { src: '/produtos/i9_color_azul_motor_escuro_1.webp', alt: 'I9 Color Azul Motor Escuro' },
    ],
    cardImage: { src: '/produtos/i9_color_preto_brilhante_1.webp', alt: 'Tintas I9 Color' },
    variants: [
      'Preto Brilhante', 'Preto Fosco', 'Verde', 'Amarelo', 'Vermelho', 'Cinza Placa', 'Azul Motor Escuro'
    ].map((label, i) => ({ id: `i9-${i}`, label })),
  },

  // ---------------------------------------------------------------------------
  // CAPAS PARA CAPACITOR (Plástica/Chapa – unificados, com underscore)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'capas-capacitor-plastica',
    title: 'Capas para Capacitor (Plástica)',
    category: 'Acessórios',
    subcategory: 'Capas de Capacitor',
    images: [
      { src: '/produtos/capa_capacitor_plastica_pequena.webp', alt: 'Capa Capacitor Plástica Pequena' },
      { src: '/produtos/capa_capacitor_plastica_media.webp', alt: 'Capa Capacitor Plástica Média' },
      { src: '/produtos/capa_capacitor_plastica_grande.webp', alt: 'Capa Capacitor Plástica Grande' },
    ],
    cardImage: { src: '/produtos/capa_capacitor_plastica_media.webp', alt: 'Capa Capacitor Plástica' },
    variants: [
      { id: 'ccp-p', label: 'Pequena' },
      { id: 'ccp-m', label: 'Média' },
      { id: 'ccp-g', label: 'Grande' },
    ],
  },
  {
    kind: 'family',
    slug: 'capas-capacitor-chapa',
    title: 'Capas para Capacitor (Chapa)',
    category: 'Acessórios',
    subcategory: 'Capas de Capacitor',
    images: [
      { src: '/produtos/capa_capacitor_chapa_pequena.webp', alt: 'Capa Capacitor Chapa Pequena' },
      { src: '/produtos/capa_capacitor_chapa_media.webp', alt: 'Capa Capacitor Chapa Média' },
      { src: '/produtos/capa_capacitor_chapa_grande_1.webp', alt: 'Capa Capacitor Chapa Grande' },
      { src: '/produtos/capa_capacitor_chapa_grande_2.webp', alt: 'Capa Capacitor Chapa Grande' },
      { src: '/produtos/capa_capacitor_chapa_grande_3.webp', alt: 'Capa Capacitor Chapa Grande' },
    ],
    cardImage: { src: '/produtos/capa_capacitor_chapa_media.webp', alt: 'Capa Capacitor Chapa' },
    variants: [
      { id: 'ccc-p', label: 'Pequena' },
      { id: 'ccc-m', label: 'Média' },
      { id: 'ccc-g', label: 'Grande' },
    ],
  },

  // ---------------------------------------------------------------------------
  // VENTOINHAS WEG (Similar) — unificado
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'ventoinhas-weg-similar',
    title: 'Ventoinhas WEG (Similar)',
    category: 'Componentes e Peças',
    subcategory: 'Ventoinhas WEG',
    shortDescription: 'Ventoinhas paralelas para motores WEG (linha similar).',
    brandLogo: '/marcas/dsantis-logo.webp',
    images: imagesFromMatches([/^ventoinha-weg-paralela-(63|71|90)$/i], 3).length
      ? imagesFromMatches([/^ventoinha-weg-paralela-(63|71|90)$/i], 3)
      : [
          { src: '/produtos/ventoinha-weg-paralela-63-1.webp', alt: 'Ventoinha WEG 63' },
          { src: '/produtos/ventoinha-weg-paralela-71-1.webp', alt: 'Ventoinha WEG 71' },
          { src: '/produtos/ventoinha-weg-paralela-90-1.webp', alt: 'Ventoinha WEG 90' },
        ],
    variants: [
      { id: 'v-63', label: 'Paralela 63', attrs: { modelo: '63' } },
      { id: 'v-71', label: 'Paralela 71', attrs: { modelo: '71' } },
      { id: 'v-90', label: 'Paralela 90', attrs: { modelo: '90' } },
    ],
  },

  // ---------------------------------------------------------------------------
  // VERNIZES WEG — 5 L (unificado)
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'vernizes-weg-5l',
    title: 'Vernizes WEG 5 L',
    category: 'Tintas e Vernizes',
    subcategory: 'Vernizes e Diluentes',
    shortDescription: 'Linha WEG 5 L: 1303, 1333 e 1314 (secagem estufa).',
    brandLogo: '/marcas/weg.webp',
    images: [
      { src: '/produtos/verniz-weg-1303-5l-1.webp', alt: 'Verniz WEG 1303 5 L' },
      { src: '/produtos/verniz-weg-1333-5l-1.webp', alt: 'Verniz WEG 1333 5 L' },
      { src: '/produtos/verniz-weg-1314-5l-secagem-estufa-1.webp', alt: 'Verniz WEG 1314 5 L (Estufa)' },
    ],
    variants: [
      { id: 'v-1303', label: 'Código 1303', attrs: { codigo: '1303' } },
      { id: 'v-1333', label: 'Código 1333', attrs: { codigo: '1333' } },
      { id: 'v-1314', label: 'Código 1314 (Estufa)', attrs: { codigo: '1314' } },
    ],
  },

  // ---------------------------------------------------------------------------
  // PLATINADOS (WEG / WEG Similar / KOHLBACH / KOHLBACH Similar) — unificados
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'platinados-weg',
    title: 'Platinados WEG',
    category: 'Platinados',
    shortDescription: 'Família WEG original.',
    brandLogo: '/marcas/weg.webp',
    images: imagesFromMatches([/^platinado-.*weg.*original/i], 3).length
      ? imagesFromMatches([/^platinado-.*weg.*original/i], 3)
      : [{ src: '/produtos/platinado-56-1-haste-1-hp-weg-original.webp', alt: 'Platinado WEG' }],
    variants: [
      { id: 'p-42', label: '42 Moderninho' },
      { id: 'p-48-1h', label: '48 — 1 Haste 3/4 CV' },
      { id: 'p-48-2h', label: '48 — 2 Hastes 3/4 CV' },
      { id: 'p-56-1h', label: '56 — 1 Haste 1 HP' },
      { id: 'p-56-2h', label: '56 — 2 Hastes 1 HP' },
    ],
  },
  {
    kind: 'family',
    slug: 'platinados-weg-similar',
    title: 'Platinados WEG (Similar)',
    category: 'Platinados',
    shortDescription: 'Família WEG Similar.',
    brandLogo: '/marcas/dsantis-logo.webp',
    images: imagesFromMatches([/^platinado-.*weg.*similar/i], 3).length
      ? imagesFromMatches([/^platinado-.*weg.*similar/i], 3)
      : [{ src: '/produtos/platinado-56-1-haste-1-hp-weg-similar.webp', alt: 'Platinado Similar' }],
    variants: [
      { id: 'ps-42', label: '42 Moderninho (Similar)' },
      { id: 'ps-48-1h', label: '48 — 1 Haste 3/4 CV (Similar)' },
      { id: 'ps-48-2h', label: '48 — 2 Hastes 3/4 CV (Similar)' },
      { id: 'ps-56-1h', label: '56 — 1 Haste 1 HP (Similar)' },
      { id: 'ps-56-2h', label: '56 — 2 Hastes 1 HP (Similar)' },
    ],
  },
  {
    kind: 'family',
    slug: 'platinados-kohlbach',
    title: 'Platinados Kohlbach',
    category: 'Platinados',
    shortDescription: 'Linha Kohlbach.',
    brandLogo: '/marcas/kohlbach-logo-redk-black.svg',
    images: imagesFromMatches([/^platinado-.*kohlbach(?!.*similar)/i], 3).length
      ? imagesFromMatches([/^platinado-.*kohlbach(?!.*similar)/i], 3)
      : [{ src: '/produtos/platinado-moderninho-pequeno-1-cv-tipo-garfo-kohlbach.webp', alt: 'Platinado Kohlbach' }],
    variants: [
      { id: 'k-mod-1c', label: 'Moderninho Pequeno 1 CV (Garfo)' },
      { id: 'k-mod-3c', label: 'Moderninho Grande 3 CV (Garfo)' },
      { id: 'k-ant-15', label: 'Antigo Pequeno 1.5 CV' },
      { id: 'k-ant-75', label: 'Antigo Grande 7.5 CV' },
    ],
  },
  {
    kind: 'family',
    slug: 'platinados-kohlbach-similar',
    title: 'Platinados Kohlbach (Similar)',
    category: 'Platinados',
    shortDescription: 'Kohlbach Similar.',
    brandLogo: '/marcas/kohlbach-logo-redk-black.svg',
    images: imagesFromMatches([/^platinado-.*kohlbach.*similar/i], 3).length
      ? imagesFromMatches([/^platinado-.*kohlbach.*similar/i], 3)
      : [{ src: '/produtos/platinado-moderninho-novo-2-contatos-kohlbach-similar.webp', alt: 'Kohlbach Similar' }],
    variants: [
      { id: 'ks-novo-2c', label: 'Moderninho Novo 2 Contatos (Similar)' },
      { id: 'ks-novo-1c', label: 'Moderninho Novo 1 Contato (Similar)' },
    ],
  },

  // ---------------------------------------------------------------------------
  // ACAMADORES — NOVO CARD DE FAMÍLIA
  // ---------------------------------------------------------------------------
  {
    kind: 'family',
    slug: 'acamadores',
    title: 'Acamadores',
    category: 'Ferramentas',
    subcategory: 'Acabamento',
    shortDescription: 'Linha completa: Micro, Pequeno, Médio e Grande.',
    images: imagesFromMatches([/^acamador-(micro|pequeno|medio|médio|grande)$/i], 3).length
      ? imagesFromMatches([/^acamador-(micro|pequeno|medio|médio|grande)$/i], 3)
      : [{ src: '/polus-logo.svg', alt: 'Acamadores' }],
    cardImage: firstImageFrom([/^acamador-(micro|pequeno|medio|médio|grande)$/i], 'Acamadores'),
    variants: [
      { id: 'a-micro', label: 'Micro' },
      { id: 'a-peq', label: 'Pequeno' },
      { id: 'a-med', label: 'Médio' },
      { id: 'a-gra', label: 'Grande' },
    ],
  },
]

// ---------------------- Ocultar cards “soltos” (individuais) -----------------

export const UNIFIED_HIDE_PATTERNS: RegExp[] = [
  // Cabos
  /^cabo-silicone-\d{2}awg-/i,
  /^cabo-lides-\d{2}awg-/i,

  // Espaguetes “soltos”
  /^espaguete-(silicone-200c|flexnor-130c)-/i,
  /^espaguete-155c-/i,
  /^espaguete-fibra-de-vidro-/i,

  // Capacitores permanentes (run)
  /^capacitor-permanente-(250v|380-400vac|440-450vac)-\d+uf$/i,

  // Platinados (todas as variações soltas)
  /^platinado-/i,

  // Ventoinhas WEG (soltas)
  /^ventoinha-weg-paralela-(63|71|90)$/i,

  // Vernizes 5 L (soltos)
  /^verniz-weg-(1303|1333|1314)-5l/i,

  // Acamadores (soltos)
  /^acamador-(micro|pequeno|medio|médio|grande)$/i,

  // Placas de borne WEG (soltos)
  /^placa-borne-weg-k1m\d+$/i,

  // Protetores térmicos WEG (soltos)
  /^protetor-termico-weg-(130c|155c|180c)$/i,

  // Tinta WEG Azul (soltas)
  /^tinta-weg-azul-(5002|5007|5009)-3-6l$/i,

  // Fita linear (soltas)
  /^fita-linear-(6mm|12mm|19mm|25mm)$/i,

  // Caixas de ligação WEG (soltas)
  /^caixa-de-ligacao-weg-(63-71-80|90-100|112-132|160-180|200)$/i,

  // Cadarços (soltos)
  /^cadarco-(laranja|algodao|fibra-de-vidro|poliester)-/i,

  // Rolamentos (soltos)
  /^rolamento-\d{3,4}-(hch|nsk)-(ddu|zz)$/i,

  // I9 Color (soltos)
  /^(tinta-)?i9[_ -]?col+o?r/i,

  // Capas de capacitor (soltos) – com underscore
  /^capa[_-]capacitor[_-](plastica|chapa)[_-](pequena|media|grande)([_-]\d+)?$/i,

  // Bases Motor WEG (soltos) – variações de slug para não sobrar nenhum
  /^base-motor-weg-(42w-pequena|48w-media|56w-grande)$/i,
  /^base-weg-56-extra-grande$/i,
  /^base[- ]?weg[- ]?56.*$/i,
  /^base[- ]?motor[- ]?weg[- ]?(42|48|56).*/i,
  /^base[- ]?(para-)?motor[- ]?weg.*$/i,
]

// ------------------------- Exportações/utilitários ---------------------------

export const UNIFIED_PRODUCTS: UnifiedProduct[] = FAMILIAS

export function shouldHideBySlug(slug?: string | null): boolean {
  if (!slug) return false
  return UNIFIED_HIDE_PATTERNS.some((re) => re.test(slug))
}

export function isUnifiedSlug(slug?: string | null): boolean {
  if (!slug) return false
  return UNIFIED_PRODUCTS.some((f) => f.slug === slug)
}

export function getUnifiedBySlug(slug?: string | null) {
  if (!slug) return undefined
  return UNIFIED_PRODUCTS.find((f) => f.slug === slug)
}

export function getCatalogForHome() {
  // Famílias aparecem sempre:
  const families = UNIFIED_PRODUCTS

  // Itens individuais NÃO-pertencentes a famílias:
  const singles = PRODUCTS.filter((p) => !shouldHideBySlug(p.slug))

  return [...families, ...singles]
}

/** Produtos semelhantes (por categoria), misturando famílias e individuais */
export function getSimilarProducts(currentSlug: string, category?: string | null, take = 8) {
  const cat = (category || '').trim().toLowerCase()
  const fam = UNIFIED_PRODUCTS.filter((f) => f.slug !== currentSlug && f.category.toLowerCase() === cat)
  const ind = PRODUCTS.filter(
    (p) => p.slug !== currentSlug && !shouldHideBySlug(p.slug) && (p.category || '').toLowerCase() === cat
  )
  return [...fam, ...ind].slice(0, take)
}

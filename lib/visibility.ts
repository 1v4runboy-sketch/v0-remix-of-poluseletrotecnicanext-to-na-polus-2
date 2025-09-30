// lib/visibility.ts
import { PRODUCTS, type Product } from './products'
import { UNIFIED_PRODUCTS } from './unified-products'

/**
 * Prefixos dos itens individuais que são cobertos por cards unificados.
 * Tudo que começar com esses slugs é ocultado na Home (pois a família já aparece).
 * Mantemos apenas prefixos "seguros".
 */
const HIDE_PREFIXES: string[] = [
  // Cabos
  'cabo-silicone-',
  'cabo-lides-',

  // Capacitores permanentes (todas as tensões)
  'capacitor-permanente-250v-',
  'capacitor-permanente-380-400vac-',
  'capacitor-permanente-440-450vac-',

  // Espaguetes + cadarços
  'espaguete-flexnor-130c-',
  'espaguete-silicone-200c-',
  'cadarco-',

  // Caixas e bases WEG
  'caixa-de-ligacao-weg-',
  'base-motor-weg-',
  'base-weg-56-',

  // Placas, protetores, rolamentos, acamadores, fita linear
  'placa-borne-weg-',
  'protetor-termico-weg-',
  'rolamento-',
  'fita-linear-',
  'acamador-',

  // Tintas WEG azul — ficam somente os cards unificados
  'tinta-weg-azul-',

  // Famílias de fios esmaltados (os cards unificados representam o grupo)
  'fio-aluminio-esmaltado-',
  'fio-de-cobre-esmaltado-',

  // >>> NOVOS: esconder itens individuais de PLATINADOS e VENTOINHAS
  'platinado-',
  'ventoinha-weg-paralela-',
]

/**
 * Itens individuais que DEVEM aparecer (exceções).
 * Mantenha essa whitelist alinhada com os que você quer exibir na Home.
 */
const NEVER_HIDE = new Set<string>([
  'solda-cobix-1-5mm-500g',
  // OBS: ventoinhas individuais foram removidas desta whitelist
  'flange-adaptadora-jacuzzi-a',
  'barbante-encerado-300g',
  'resina-calas-95ab-incolor',
  'resina-calas-91ac-vermelha',
  'tinta-weg-preta-3-6l',
  'tinta-weg-vermelha-criptal-3-6l',
  'rotor-igui',
])

/**
 * BLOQUEIO EXATO (por slug) — remove só os três vernizes WEG 5L individuais.
 */
const EXACT_HIDE = new Set<string>([
  'verniz-weg-1333-5l',
  'verniz-weg-1303-5l',
  'verniz-weg-1314-5l-secagem-estufa',
])

export function shouldHideSlug(slug: string): boolean {
  if (EXACT_HIDE.has(slug)) return true
  if (NEVER_HIDE.has(slug)) return false
  return HIDE_PREFIXES.some((p) => slug.startsWith(p))
}

/** Produtos individuais visíveis (não cobertos por família) */
export function visibleSoloProducts(): Product[] {
  return PRODUCTS.filter((p) => !shouldHideSlug(p.slug))
}

/** Catálogo final para a Home: famílias unificadas + individuais permitidos */
export function getRenderableCatalog(): any[] {
  const families = [...UNIFIED_PRODUCTS] as any[]
  const solo = visibleSoloProducts()
  const sortedSolo = [...solo].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  return [...families, ...sortedSolo]
}

// @/lib/withCards.ts
import { PRODUCTS as RAW } from "./products" // Importando PRODUCTS como RAW para usar nas funções

type P = {
  id?: string
  slug: string
  title: string
  brand?: string | null
  category: string
  subcategory: string
  shortDescription?: string | null
  images: Array<{ src: string; alt: string }>
  variants?: Array<{
    id: string
    label: string
    unit: "m" | "kg" | "un"
    minQty?: number
    stepQty?: number
    attrs?: Record<string, any>
  }>
  techSpecs?: any
  metaCollection?: { type: string; bucket: string }
}

// Função de coleta de imagens para garantir que não haja duplicação
const collectImages = (items: P[]) => {
  const seen = new Set<string>(),
    out: { src: string; alt: string }[] = []
  for (const d of items) {
    const imgs = Array.isArray(d.images) ? d.images : []
    for (const im of imgs) {
      const src = typeof im === "string" ? im : im?.src || ""
      if (src && !seen.has(src)) {
        seen.add(src)
        out.push({ src, alt: d.slug })
      }
    }
  }
  return out
}

// Função para unificar as placas de Borne
function buildPlacasBorne(all: P[]) {
  const placas = all.filter((p: P) => p.category === "Placas de Borne")
  const unificado = placas.filter((p: P) => p.title.includes("Unificado"))
  return unificado.length > 0
    ? {
        id: "placas-borne-unificado",
        slug: "placas-borne-unificado",
        title: "Placas de Borne Unificado",
        category: "Placas de Borne",
        subcategory: "Unificado",
        images: collectImages(unificado),
        variants: unificado.map((d: P) => ({
          id: d.slug,
          label: d.title || d.slug,
          unit: "un" as const,
          minQty: 1,
          stepQty: 1,
          attrs: { sourceSlug: d.slug },
        })),
        shortDescription: "Placas de Borne Unificadas",
        metaCollection: { type: "placas-borne", bucket: "unificado" },
      }
    : null
}

// Função para unificar cabos por AWG
function buildCabosCards(all: P[]) {
  const cabos = all.filter((p: P) => p.category === "Cabos Elétricos")
  const unificado = cabos.filter((p: P) => p.title.includes("AWG"))
  return unificado.length > 0
    ? {
        id: "cabos-unificado",
        slug: "cabos-unificado",
        title: "Cabos Unificados",
        category: "Cabos Elétricos",
        subcategory: "AWG",
        images: collectImages(unificado),
        variants: unificado.map((d: P) => ({
          id: d.slug,
          label: d.title || d.slug,
          unit: "m" as const,
          minQty: 1,
          stepQty: 1,
          attrs: { sourceSlug: d.slug },
        })),
        shortDescription: "Cabos Unificados por AWG",
        metaCollection: { type: "cabos", bucket: "unificado" },
      }
    : null
}

// Função para unificar capacitores por UF
function buildCapacitoresCards(all: P[]) {
  const capacitores = all.filter((p: P) => p.category === "Capacitores")
  const unificado = capacitores.filter((p: P) => p.title.includes("UF"))
  return unificado.length > 0
    ? {
        id: "capacitores-unificado",
        slug: "capacitores-unificado",
        title: "Capacitores Unificados",
        category: "Capacitores",
        subcategory: "UF",
        images: collectImages(unificado),
        variants: unificado.map((d: P) => ({
          id: d.slug,
          label: d.title || d.slug,
          unit: "un" as const,
          minQty: 1,
          stepQty: 1,
          attrs: { sourceSlug: d.slug },
        })),
        shortDescription: "Capacitores Unificados por UF",
        metaCollection: { type: "capacitores", bucket: "unificado" },
      }
    : null
}

// Função para unificar espaguetes por tipo
function buildEspaguetesCards(all: P[]) {
  const espaguetes = all.filter((p: P) => p.category === "Espaguetes")
  const unificado = espaguetes.filter((p: P) => p.title.includes("Tipo"))
  return unificado.length > 0
    ? {
        id: "espaguetes-unificado",
        slug: "espaguetes-unificado",
        title: "Espaguetes Unificados",
        category: "Espaguetes",
        subcategory: "Tipo",
        images: collectImages(unificado),
        variants: unificado.map((d: P) => ({
          id: d.slug,
          label: d.title || d.slug,
          unit: "un" as const,
          minQty: 1,
          stepQty: 1,
          attrs: { sourceSlug: d.slug },
        })),
        shortDescription: "Espaguetes Unificados por Tipo",
        metaCollection: { type: "espaguetes", bucket: "unificado" },
      }
    : null
}

// Função para unificar protetores térmicos
function buildProtetoresTermicosCards(all: P[]) {
  const protetores = all.filter((p: P) => p.category === "Protetores Térmicos")
  const unificado = protetores.filter((p: P) => p.title.includes("Termico"))
  return unificado.length > 0
    ? {
        id: "protetores-termicos-unificado",
        slug: "protetores-termicos-unificado",
        title: "Protetores Térmicos Unificados",
        category: "Protetores Térmicos",
        subcategory: "Termico",
        images: collectImages(unificado),
        variants: unificado.map((d: P) => ({
          id: d.slug,
          label: d.title || d.slug,
          unit: "un" as const,
          minQty: 1,
          stepQty: 1,
          attrs: { sourceSlug: d.slug },
        })),
        shortDescription: "Protetores Térmicos Unificados",
        metaCollection: { type: "protetores-termicos", bucket: "unificado" },
      }
    : null
}

// Função para filtrar produtos unificados
function isFromUnifiedFamily(product: P) {
  return product.slug.includes("unificado")
}

const UNIFIED_CARDS = [
  buildCabosCards(RAW),
  buildPlacasBorne(RAW),
  buildCapacitoresCards(RAW),
  buildEspaguetesCards(RAW),
  buildProtetoresTermicosCards(RAW),
].filter(Boolean) as P[]

export const PRODUCTS = [...RAW, ...UNIFIED_CARDS]

export const products = PRODUCTS

export type Product = P

// Exportando as unificações
export const CARDS = UNIFIED_CARDS

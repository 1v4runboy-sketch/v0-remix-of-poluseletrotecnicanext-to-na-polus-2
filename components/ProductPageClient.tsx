"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import * as DB from "@/lib/withCards"

type P = any

const N = (s?: string) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

function uniqBy<T>(arr: T[], key: (x: T) => string) {
  const m = new Map<string, T>()
  for (const x of arr) {
    const k = key(x)
    if (!m.has(k)) m.set(k, x)
  }
  return Array.from(m.values())
}

function firstImg(p?: P) {
  const imgs = (p?.images || []) as { src: string; alt?: string }[]
  return imgs?.[0]?.src || "/produtos/placeholder.webp"
}

const isBlueItem = (p: P) => {
  const s = `${p?.title || ""} ${p?.slug || ""}`
  return /tinta/i.test(s) && /weg/i.test(s) && (/azul/i.test(s) || /\b(5002|5007|5009)\b/i.test(s))
}

const azulCode = (s: string): string | null => (String(s).match(/\b(5002|5007|5009)\b/i) || [, null])[1]
const vol = (s: string): string | null => {
  const m = String(s).match(/\b(1|3[.,\- ]?6|5)\s*l\b/i)
  if (!m) return null
  const v = m[1].replace("-", ".").replace(",", ".").replace(" ", ".")
  return v === "3.6" ? "3,6 L" : `${v} L`.replace(".0", "")
}

export default function ProductPageClient() {
  const params = useParams() as { slug?: string }
  const router = useRouter()
  const slug = String(params?.slug || "")

  const ALL = (DB.PRODUCTS as P[]) || []
  const base = useMemo(() => ALL.find((p) => String(p?.slug || "") === slug), [ALL, slug])

  const azulFamily = useMemo(() => {
    const family = ALL.filter(isBlueItem)
    if (!family.length) return null
    const variants = uniqBy(
      family.map((d) => {
        const label = azulCode(`${d.title} ${d.slug}`) || vol(`${d.title} ${d.slug}`) || (d.title || d.slug)
        return { id: d.slug, label, attrs: { sourceSlug: d.slug } }
      }),
      (x) => x.id,
    ).sort((a: any, b: any) => {
      const order = ["5007", "5009", "5002"]
      const ia = order.indexOf(String(a.label))
      const ib = order.indexOf(String(b.label))
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      return String(a.label).localeCompare(String(b.label))
    })
    const card: P = {
      id: "",
      slug: "tintas-weg-azul",
      title: "Tintas WEG Azul",
      brand: "WEG",
      category: "Tintas e Vernizes",
      subcategory: "Tintas WEG",
      images: family[0]?.images || [],
      variants,
      shortDescription: "Variações por código (5007/5009/5002) • unidade: un",
      techSpecs: null,
      metaCollection: { type: "tintas", cor: "azul" },
    }
    return { family, card }
  }, [ALL])

  const isBlueRoute = slug === "tintas-weg-azul" || (base && isBlueItem(base))

  const view = useMemo(() => {
    if (isBlueRoute && azulFamily) {
      if (base) {
        const label = azulCode(`${base.title} ${base.slug}`) || vol(`${base.title} ${base.slug}`) || (base.title || base.slug)
        return {
          ...azulFamily.card,
          title: `Tintas WEG Azul — ${label}`,
          images: base.images?.length ? base.images : azulFamily.card.images,
        }
      }
      return azulFamily.card
    }
    return base || null
  }, [isBlueRoute, azulFamily, base])

  if (!view) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-xl font-semibold">Produto não encontrado</h1>
      </div>
    )
  }

  const variants = (view.variants as any[]) || []
  const goto = (toSlug: string) => router.push(`/produto/${encodeURIComponent(toSlug)}`)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={firstImg(view)} alt={String(view?.title || "")} className="max-h-72 object-contain" />
        </div>
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {String(view?.category || "")} {view?.subcategory ? `• ${view.subcategory}` : ""}
          </div>
          <h1 className="text-xl font-semibold">{String(view?.title || "")}</h1>

          {variants.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Variações</div>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                  const slugToGo = String(v?.attrs?.sourceSlug || v?.id || "")
                  const label = String(v?.label || v?.id || "")
                  return (
                    <button
                      key={slugToGo}
                      onClick={() => goto(slugToGo)}
                      className="px-3 py-1.5 text-sm rounded-md border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

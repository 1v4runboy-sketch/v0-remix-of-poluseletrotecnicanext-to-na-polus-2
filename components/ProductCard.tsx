// components/ProductCard.tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

type Props = {
  slug: string
  title: string
  subtitle?: string
  image?: string
  href: string
  brand?: string | null
  raw?: any
}

function pickBrandLogo({ slug = '', raw, resolvedTheme }: { slug?: string; raw?: any; resolvedTheme: string }) {
  const cat = (raw?.category || '').toLowerCase()
  const title = (raw?.title || '').toLowerCase()

  // Jacuzzi: logo depende do tema (light/dark)
  const jacuzziLightDark = {
    light: '/marcas/lanc-comercial.webp',
    dark: '/marcas/jacuzzi.webp',
  }

  if (cat.includes('cabos de silicone') || cat.includes('espaguete silicone') || title.includes('fibra de vidro')) {
    return '/marcas/tramar.webp'
  }
  if (cat.includes('cabos lides') || cat.includes('espaguete flexnor') || title.includes('155')) {
    return '/marcas/cofibam.webp'
  }
  if (slug.startsWith('capacitor-permanente-')) {
    return '/marcas/jl-capacitores.webp'
  }
  if (title.includes('fio de cobre')) {
    return '/marcas/condupasqua-logo.svg'
  }
  if (title.includes('fio de alumínio') || title.includes('fio de aluminio')) {
    return '/marcas/logotipo-sao-marco.webp'
  }
  if (
    title.includes('caixa de ligação') ||
    title.includes('protetor térmico') ||
    (title.includes('platinado') && title.includes('original')) ||
    title.includes('placa de borne') ||
    title.includes('tinta weg') ||
    title.includes('verniz weg') ||
    title.includes('base de motor')
  ) {
    return '/marcas/weg.webp'
  }
  if (title.includes('paralela') && title.includes('weg')) {
    return '/marcas/dsantis-logo.webp'
  }
  if (title.includes('kohlbach')) {
    return '/marcas/kohlbach.webp'
  }
  if (title.includes('resina calas') || title.includes('calas')) {
    return '/marcas/lanc-comercial.webp'
  }
  if (title.includes('jacuzzi')) {
    return resolvedTheme === 'dark' ? jacuzziLightDark.dark : jacuzziLightDark.light
  }
  if (title.includes('barbante')) {
    return '/marcas/cifa.webp'
  }
  if (title.includes('igui')) {
    return '/marcas/igui.webp'
  }
  if (title.includes('dancor')) {
    return '/marcas/dancor.webp'
  }
  if (title.includes('solda') && title.includes('cobix')) {
    return '/marcas/cobix.webp'
  }

  // fallback se houver brand no item
  const brand = raw?.brand || ''
  if (brand) return brand
  return null
}

export default function ProductCard(props: Props) {
  const { slug, title, subtitle, image, href, raw } = props
  const { resolvedTheme } = useTheme()
  const logo = pickBrandLogo({ slug, raw, resolvedTheme })

  return (
    <div
      className="group relative rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition
                 hover:shadow-md dark:border-white/10 dark:bg-[#0e1730]"
      role="listitem"
    >
      {/* Logo da marca (maior e com contraste) */}
      {logo && (
        <div className="absolute left-3 top-3 z-10 rounded bg-white/90 p-1.5 shadow dark:bg-black/40">
          <img
            src={logo}
            alt=""
            className="h-7 w-auto md:h-8"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Imagem do produto */}
      <Link href={href} className="block">
        <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white
                        dark:border-white/10 dark:bg-[#0b1222]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="text-xs text-gray-400">Sem imagem</div>
          )}
        </div>
      </Link>

      {/* Título e subtítulo */}
      <div className="mt-3 space-y-0.5">
        <Link href={href} className="line-clamp-2 block text-sm font-semibold text-gray-900 hover:underline
                                     dark:text-gray-100">
          {title}
        </Link>
        {subtitle ? (
          <div className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
        ) : null}
      </div>

      {/* Ações */}
      <div className="mt-3 flex gap-2">
        <Link
          href={`https://wa.me/551135992935?text=Olá%20Polus!%20Gostaria%20de%20uma%20cotação%20para:%20${encodeURIComponent(
            title,
          )}`}
          target="_blank"
          className="inline-flex flex-1 items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white
                     hover:bg-green-700"
        >
          Pedir cotação
        </Link>
        <Link
          href={href}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900
                     hover:bg-gray-50 dark:border-white/10 dark:text-gray-100 dark:hover:bg-[#0d152b]"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  )
}

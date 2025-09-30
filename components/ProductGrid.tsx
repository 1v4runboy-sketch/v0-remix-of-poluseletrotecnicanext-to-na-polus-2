// components/ProductGrid.tsx
'use client'

import * as React from 'react'
import ProductCard from './ProductCard'

type CardItem = {
  slug: string
  title: string
  subtitle?: string
  image?: string
  brand?: string | null
  href: string
  raw?: any
}

export default function ProductGrid({ items }: { items: CardItem[] }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      role="list"
    >
      {items.map((it) => (
        <ProductCard key={it.slug} {...it} />
      ))}
    </div>
  )
}

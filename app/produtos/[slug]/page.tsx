// app/produtos/[slug]/page.tsx
import ProductGrid from '@/components/ProductGrid'
import UNIFIED_PRODUCTS, { groupByCategory, ALL_CATEGORIES, subcategoriesOf, slugify } from '@/lib/unified-products'

type PageProps = {
  params: { slug: string }
}

// slug no formato: categoria ou categoria/subcategoria
function parseSlug(slug: string): { category: string; subcategory?: string } {
  const parts = slug.split('/')
  const catSlug = parts[0]
  const subSlug = parts[1]
  const category = ALL_CATEGORIES.find(c => slugify(c) === catSlug) || parts[0]
  const subcategory = subSlug
    ? subcategoriesOf(category).find(s => slugify(s) === subSlug)
    : undefined
  return { category, subcategory }
}

export function generateStaticParams() {
  // gera rotas /produtos/<categoria> e /produtos/<categoria>/<sub>
  const params: { slug: string }[] = []
  for (const c of ALL_CATEGORIES) {
    const cSlug = slugify(c)
    params.push({ slug: cSlug })
    for (const s of subcategoriesOf(c)) {
      const sSlug = slugify(s)
      params.push({ slug: `${cSlug}/${sSlug}` })
    }
  }
  return params
}

export default function Page({ params }: PageProps) {
  const { category, subcategory } = parseSlug(params.slug)
  const items = groupByCategory(category, subcategory)

  return (
    <main className="container">
      <header style={{ margin: '1rem 0' }}>
        <h1>{subcategory ? `${category} — ${subcategory}` : category}</h1>
        <p style={{ color: '#666' }}>
          {items.length} produto{items.length === 1 ? '' : 's'}
        </p>
      </header>

      <ProductGrid products={items} />
    </main>
  )
}

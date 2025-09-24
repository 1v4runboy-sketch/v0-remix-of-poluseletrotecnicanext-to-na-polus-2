export interface ProductImage {
  src: string
  alt: string
}

export interface ProductVariant {
  id: string
  label: string
  unit: "m" | "kg" | "un"
  minQty?: number
  stepQty?: number
  attrs?: Record<string, any>
}

export interface ProductTechSpecs {
  [key: string]: string | number
}

export interface Product {
  id?: string
  slug: string
  title: string
  brand?: string | null
  category: string
  subcategory: string
  shortDescription?: string | null
  images: ProductImage[]
  variants?: ProductVariant[]
  techSpecs?: ProductTechSpecs
  metaCollection?: {
    type: string
    bucket: string
  }
}

export interface ProductCategory {
  name: string
  slug: string
  subcategories: string[]
  productCount: number
}

export interface ProductBrand {
  name: string
  slug: string
  logo?: string
  productCount: number
}

export const ProductUtils = {
  // Normaliza texto para busca
  normalizeText: (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  },

  // Gera slug a partir do título
  generateSlug: (title: string): string => {
    return ProductUtils.normalizeText(title).replace(/\s+/g, "-").replace(/-+/g, "-")
  },

  // Formata preço (se necessário no futuro)
  formatPrice: (price: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  },

  // Filtra produtos por categoria
  filterByCategory: (products: Product[], category: string): Product[] => {
    return products.filter(
      (product) => ProductUtils.normalizeText(product.category) === ProductUtils.normalizeText(category),
    )
  },

  // Filtra produtos por marca
  filterByBrand: (products: Product[], brand: string): Product[] => {
    return products.filter(
      (product) => product.brand && ProductUtils.normalizeText(product.brand) === ProductUtils.normalizeText(brand),
    )
  },

  // Busca produtos por texto
  searchProducts: (products: Product[], query: string): Product[] => {
    const normalizedQuery = ProductUtils.normalizeText(query)

    return products.filter((product) => {
      const searchText = [
        product.title,
        product.brand || "",
        product.category,
        product.subcategory,
        product.shortDescription || "",
      ].join(" ")

      return ProductUtils.normalizeText(searchText).includes(normalizedQuery)
    })
  },
}

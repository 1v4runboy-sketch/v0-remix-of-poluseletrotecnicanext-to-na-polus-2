export type Product = {
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

export const PRODUCTS: Product[] = [
  {
    id: "",
    slug: "cabo-silicone-02awg-200c-600v",
    title: "cabo-silicone-02awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-02awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-02awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-02awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-04awg-200c-600v",
    title: "cabo-silicone-04awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-04awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-04awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-04awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-06awg-200c-600v",
    title: "cabo-silicone-06awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-06awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-06awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-06awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-08awg-200c-600v",
    title: "cabo-silicone-08awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-08awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-08awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-08awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-10awg-200c-600v",
    title: "cabo-silicone-10awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-10awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-10awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-10awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-12awg-200c-600v",
    title: "cabo-silicone-12awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-12awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-12awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-12awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-14awg-200c-600v",
    title: "cabo-silicone-14awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-14awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-14awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-14awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-16awg-200c-600v",
    title: "cabo-silicone-16awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-16awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-16awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-16awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-18awg-200c-600v",
    title: "cabo-silicone-18awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-18awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-18awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-18awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-20awg-200c-600v",
    title: "cabo-silicone-20awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-20awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-20awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-20awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-silicone-22awg-200c-600v",
    title: "cabo-silicone-22awg-200c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-silicone-22awg-200c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-22awg-200c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-silicone-22awg-200c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-02awg-130c-600v",
    title: "cabo-lides-02awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-02awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-02awg-130c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-02awg-130c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-04awg-130c-600v",
    title: "cabo-lides-04awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-04awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-04awg-130c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-04awg-130c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-06awg-130c-600v",
    title: "cabo-lides-06awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-06awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-06awg-130c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-06awg-130c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-08awg-130c-600v",
    title: "cabo-lides-08awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-08awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-08awg-130c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-08awg-130c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-10awg-130c-600v",
    title: "cabo-lides-10awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-10awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-10awg-130c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-10awg-130c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-12awg-130c-600v",
    title: "cabo-lides-12awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-12awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-12awg-130c-600v-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-12awg-130c-600v-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-14awg-130c-600v",
    title: "cabo-lides-14awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-14awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-14awg-130c-600v-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-16awg-130c-600v",
    title: "cabo-lides-16awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-16awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-16awg-130c-600v-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-18awg-130c-600v",
    title: "cabo-lides-18awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-18awg-130c-600v-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cabo-lides-18awg-130c-600v-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-20awg-130c-600v",
    title: "cabo-lides-20awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-20awg-130c-600v-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabo-lides-22awg-130c-600v",
    title: "cabo-lides-22awg-130c-600v",
    brand: null,
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cabo-lides-22awg-130c-600v-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-02uf",
    title: "capacitor-permanente-250v-02uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-02uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-03uf",
    title: "capacitor-permanente-250v-03uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-03uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-04uf",
    title: "capacitor-permanente-250v-04uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-04uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-05uf",
    title: "capacitor-permanente-250v-05uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-05uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-06uf",
    title: "capacitor-permanente-250v-06uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-06uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-07uf",
    title: "capacitor-permanente-250v-07uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-07uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-08uf",
    title: "capacitor-permanente-250v-08uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-08uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-10uf",
    title: "capacitor-permanente-250v-10uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-10uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-10uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-10uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-12uf",
    title: "capacitor-permanente-250v-12uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-12uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-12uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-12uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-15uf",
    title: "capacitor-permanente-250v-15uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-15uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-15uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-15uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-18uf",
    title: "capacitor-permanente-250v-18uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-18uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-18uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-18uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-20uf",
    title: "capacitor-permanente-250v-20uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-20uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-20uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-20uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-22uf",
    title: "capacitor-permanente-250v-22uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-22uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-22uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-22uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-25uf",
    title: "capacitor-permanente-250v-25uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-25uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-25uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-30uf",
    title: "capacitor-permanente-250v-30uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-30uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-30uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-40uf",
    title: "capacitor-permanente-250v-40uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-40uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-45uf",
    title: "capacitor-permanente-250v-45uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-45uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-45uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-50uf",
    title: "capacitor-permanente-250v-50uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-50uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-55uf",
    title: "capacitor-permanente-250v-55uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-55uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-60uf",
    title: "capacitor-permanente-250v-60uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-60uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-65uf",
    title: "capacitor-permanente-250v-65uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-65uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-65uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-70uf",
    title: "capacitor-permanente-250v-70uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-70uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-70uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-80uf",
    title: "capacitor-permanente-250v-80uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-80uf-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-90uf",
    title: "capacitor-permanente-250v-90uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-90uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-90uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-250v-100uf",
    title: "capacitor-permanente-250v-100uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-250v-100uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-100uf-2.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-250v-100uf-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-02uf",
    title: "capacitor-permanente-380-400vac-02uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-02uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-02uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-03uf",
    title: "capacitor-permanente-380-400vac-03uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-03uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-03uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-04uf",
    title: "capacitor-permanente-380-400vac-04uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-04uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-04uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-05uf",
    title: "capacitor-permanente-380-400vac-05uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-05uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-05uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-06uf",
    title: "capacitor-permanente-380-400vac-06uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-06uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-06uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-07uf",
    title: "capacitor-permanente-380-400vac-07uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-07uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-07uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-08uf",
    title: "capacitor-permanente-380-400vac-08uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-08uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-08uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-09uf",
    title: "capacitor-permanente-380-400vac-09uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-09uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-09uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-10uf",
    title: "capacitor-permanente-380-400vac-10uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-10uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-10uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-12uf",
    title: "capacitor-permanente-380-400vac-12uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-12uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-12uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-15uf",
    title: "capacitor-permanente-380-400vac-15uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-15uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-15uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-16uf",
    title: "capacitor-permanente-380-400vac-16uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-16uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-16uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-18uf",
    title: "capacitor-permanente-380-400vac-18uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-18uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-18uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-20uf",
    title: "capacitor-permanente-380-400vac-20uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-20uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-20uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-25uf",
    title: "capacitor-permanente-380-400vac-25uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-25uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-25uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-30uf",
    title: "capacitor-permanente-380-400vac-30uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-30uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-30uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-35uf",
    title: "capacitor-permanente-380-400vac-35uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-35uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-35uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-40uf",
    title: "capacitor-permanente-380-400vac-40uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-40uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-40uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-45uf",
    title: "capacitor-permanente-380-400vac-45uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-45uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-45uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-50uf",
    title: "capacitor-permanente-380-400vac-50uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-50uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-50uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-55uf",
    title: "capacitor-permanente-380-400vac-55uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-55uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-55uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-60uf",
    title: "capacitor-permanente-380-400vac-60uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-60uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-60uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-65uf",
    title: "capacitor-permanente-380-400vac-65uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-65uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-65uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-70uf",
    title: "capacitor-permanente-380-400vac-70uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-70uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-70uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-80uf",
    title: "capacitor-permanente-380-400vac-80uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-80uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-80uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-90uf",
    title: "capacitor-permanente-380-400vac-90uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-90uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-90uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-380-400vac-100uf",
    title: "capacitor-permanente-380-400vac-100uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-380-400vac-100uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-380-400vac-100uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-02uf",
    title: "capacitor-permanente-440-450vac-02uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-02uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-02uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-03uf",
    title: "capacitor-permanente-440-450vac-03uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-03uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-03uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-04uf",
    title: "capacitor-permanente-440-450vac-04uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-04uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-04uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-05uf",
    title: "capacitor-permanente-440-450vac-05uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-05uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-05uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-06uf",
    title: "capacitor-permanente-440-450vac-06uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-06uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-06uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-07uf",
    title: "capacitor-permanente-440-450vac-07uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-07uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-07uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-08uf",
    title: "capacitor-permanente-440-450vac-08uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-08uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-08uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-09uf",
    title: "capacitor-permanente-440-450vac-09uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-09uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-09uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-10uf",
    title: "capacitor-permanente-440-450vac-10uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-10uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-10uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-12uf",
    title: "capacitor-permanente-440-450vac-12uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-12uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-12uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-15uf",
    title: "capacitor-permanente-440-450vac-15uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-15uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-15uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-16uf",
    title: "capacitor-permanente-440-450vac-16uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-16uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-16uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-18uf",
    title: "capacitor-permanente-440-450vac-18uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-18uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-18uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-20uf",
    title: "capacitor-permanente-440-450vac-20uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-20uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-20uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-25uf",
    title: "capacitor-permanente-440-450vac-25uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-25uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-25uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-30uf",
    title: "capacitor-permanente-440-450vac-30uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-30uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-30uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-35uf",
    title: "capacitor-permanente-440-450vac-35uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-35uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-35uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-40uf",
    title: "capacitor-permanente-440-450vac-40uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-40uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-40uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-45uf",
    title: "capacitor-permanente-440-450vac-45uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-45uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-45uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-50uf",
    title: "capacitor-permanente-440-450vac-50uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-50uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-50uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-55uf",
    title: "capacitor-permanente-440-450vac-55uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-55uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-55uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-60uf",
    title: "capacitor-permanente-440-450vac-60uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-60uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-60uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-65uf",
    title: "capacitor-permanente-440-450vac-65uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-65uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-65uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-70uf",
    title: "capacitor-permanente-440-450vac-70uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-70uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-70uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-80uf",
    title: "capacitor-permanente-440-450vac-80uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-80uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-80uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-90uf",
    title: "capacitor-permanente-440-450vac-90uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-90uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-90uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitor-permanente-440-450vac-100uf",
    title: "capacitor-permanente-440-450vac-100uf",
    brand: null,
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: null,
    images: [
      {
        src: "/produtos/capacitor-permanente-440-450vac-100uf-1.webp",
        alt: "",
      },
      {
        src: "/produtos/capacitor-permanente-440-450vac-100uf-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "oleo-dieletrico-1l",
    title: "oleo-dieletrico-1l",
    brand: null,
    category: "Óleos e Fluidos",
    subcategory: "Óleos Dielétricos",
    shortDescription: null,
    images: [
      {
        src: "/produtos/oleo-dieletrico-1l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/oleo-dieletrico-1l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "oleo-dieletrico-5l",
    title: "oleo-dieletrico-5l",
    brand: null,
    category: "Óleos e Fluidos",
    subcategory: "Óleos Dielétricos",
    shortDescription: null,
    images: [
      {
        src: "/produtos/oleo-dieletrico-5l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/oleo-dieletrico-5l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rotor-igui",
    title: "rotor-igui",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "IGUI",
    shortDescription: null,
    images: [
      {
        src: "/produtos/rotor-igui-1.webp",
        alt: "",
      },
      {
        src: "/produtos/rotor-igui-2.webp",
        alt: "",
      },
      {
        src: "/produtos/rotor-igui-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "solda-cobix-1-5mm-500g",
    title: "solda-cobix-1-5mm-500g",
    brand: null,
    category: "Ferramentas e Insumos",
    subcategory: "Soldas",
    shortDescription: null,
    images: [
      {
        src: "/produtos/solda-cobix-1-5mm-500g-1.webp",
        alt: "",
      },
      {
        src: "/produtos/solda-cobix-1-5mm-500g-2.webp",
        alt: "",
      },
      {
        src: "/produtos/solda-cobix-1-5mm-500g-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "ventoinha-weg-paralela-63",
    title: "ventoinha-weg-paralela-63",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Ventoinhas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/ventoinha-weg-paralela-63-1.webp",
        alt: "",
      },
      {
        src: "/produtos/ventoinha-weg-paralela-63-2.webp",
        alt: "",
      },
      {
        src: "/produtos/ventoinha-weg-paralela-63-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "ventoinha-weg-paralela-71",
    title: "ventoinha-weg-paralela-71",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Ventoinhas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/ventoinha-weg-paralela-71-1.webp",
        alt: "",
      },
      {
        src: "/produtos/ventoinha-weg-paralela-71-2.webp",
        alt: "",
      },
      {
        src: "/produtos/ventoinha-weg-paralela-71-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "ventoinha-weg-paralela-90",
    title: "ventoinha-weg-paralela-90",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Ventoinhas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/ventoinha-weg-paralela-90-1.webp",
        alt: "",
      },
      {
        src: "/produtos/ventoinha-weg-paralela-90-2.webp",
        alt: "",
      },
      {
        src: "/produtos/ventoinha-weg-paralela-90-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "flange-intermediaria-dancor",
    title: "flange-intermediaria-dancor",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Dancor",
    shortDescription: null,
    images: [
      {
        src: "/produtos/flange-intermediaria-dancor-1.webp",
        alt: "",
      },
      {
        src: "/produtos/flange-intermediaria-dancor-2.webp",
        alt: "",
      },
      {
        src: "/produtos/flange-intermediaria-dancor-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fio-aluminio-esmaltado-04-25-awg",
    title: "fio-aluminio-esmaltado-04-25-awg",
    brand: null,
    category: "Fios e Cabos",
    subcategory: "Fios Esmaltados",
    shortDescription: null,
    images: [
      {
        src: "/produtos/fio-aluminio-esmaltado-04-25-awg-1.webp",
        alt: "",
      },
      {
        src: "/produtos/fio-aluminio-esmaltado-04-25-awg-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fio-de-cobre-esmaltado-04-33-awg",
    title: "fio-de-cobre-esmaltado-04-33-awg",
    brand: null,
    category: "Fios e Cabos",
    subcategory: "Fios Esmaltados",
    shortDescription: null,
    images: [
      {
        src: "/produtos/fio-de-cobre-esmaltado-04-33-awg-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m4",
    title: "placa-borne-weg-k1m4",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m4-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m4-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m5",
    title: "placa-borne-weg-k1m5",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m5-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m5-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m6",
    title: "placa-borne-weg-k1m6",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m6-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m6-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m8",
    title: "placa-borne-weg-k1m8",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m8-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m8-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m10",
    title: "placa-borne-weg-k1m10",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m10-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m10-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m12",
    title: "placa-borne-weg-k1m12",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m12-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m12-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "placa-borne-weg-k1m16",
    title: "placa-borne-weg-k1m16",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: null,
    images: [
      {
        src: "/produtos/placa-borne-weg-k1m16-1.webp",
        alt: "",
      },
      {
        src: "/produtos/placa-borne-weg-k1m16-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "protetor-termico-weg-130c",
    title: "protetor-termico-weg-130c",
    brand: null,
    category: "Proteção e Segurança",
    subcategory: "Protetores Térmicos",
    shortDescription: null,
    images: [
      {
        src: "/produtos/protetor-termico-weg-130c-1.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "protetor-termico-weg-155c",
    title: "protetor-termico-weg-155c",
    brand: null,
    category: "Proteção e Segurança",
    subcategory: "Protetores Térmicos",
    shortDescription: null,
    images: [
      {
        src: "/produtos/protetor-termico-weg-155c-1.webp",
        alt: "",
      },
      {
        src: "/produtos/protetor-termico-weg-155c-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "protetor-termico-weg-180c",
    title: "protetor-termico-weg-180c",
    brand: null,
    category: "Proteção e Segurança",
    subcategory: "Protetores Térmicos",
    shortDescription: null,
    images: [
      {
        src: "/produtos/protetor-termico-weg-180c-1.webp",
        alt: "",
      },
      {
        src: "/produtos/protetor-termico-weg-180c-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "barbante-encerado-300g",
    title: "barbante-encerado-300g",
    brand: null,
    category: "Ferramentas e Insumos",
    subcategory: "Acessórios",
    shortDescription: null,
    images: [
      {
        src: "/produtos/barbante-encerado-300g-1.webp",
        alt: "",
      },
      {
        src: "/produtos/barbante-encerado-300g-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "bracket-jacuzzi-a",
    title: "bracket-jacuzzi-a",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/bracket-jacuzzi-a-1.webp",
        alt: "",
      },
      {
        src: "/produtos/bracket-jacuzzi-a-2.webp",
        alt: "",
      },
      {
        src: "/produtos/bracket-jacuzzi-a-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "bracket-jacuzzi-b",
    title: "bracket-jacuzzi-b",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/bracket-jacuzzi-b-1.webp",
        alt: "",
      },
      {
        src: "/produtos/bracket-jacuzzi-b-2.webp",
        alt: "",
      },
      {
        src: "/produtos/bracket-jacuzzi-b-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "flange-adaptadora-jacuzzi-a",
    title: "flange-adaptadora-jacuzzi-a",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/flange-adaptadora-jacuzzi-a-1.webp",
        alt: "",
      },
      {
        src: "/produtos/flange-adaptadora-jacuzzi-a-2.webp",
        alt: "",
      },
      {
        src: "/produtos/flange-adaptadora-jacuzzi-a-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "corpo-pre-filtro-jacuzzi-A",
    title: "corpo-pre-filtro-jacuzzi-A",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/corpo-pre-filtro-jacuzzi-a-1.webp",
        alt: "",
      },
      {
        src: "/produtos/corpo-pre-filtro-jacuzzi-a-2.webp",
        alt: "",
      },
      {
        src: "/produtos/corpo-pre-filtro-jacuzzi-a-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "corpo-pre-filtro-jacuzzi-b",
    title: "corpo-pre-filtro-jacuzzi-b",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/corpo-pre-filtro-jacuzzi-b-1.webp",
        alt: "",
      },
      {
        src: "/produtos/corpo-pre-filtro-jacuzzi-b-2.webp",
        alt: "",
      },
      {
        src: "/produtos/corpo-pre-filtro-jacuzzi-b-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cesto-coletor-jacuzzi-a",
    title: "cesto-coletor-jacuzzi-a",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cesto-coletor-jacuzzi-a-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cesto-coletor-jacuzzi-a-2.webp",
        alt: "",
      },
      {
        src: "/produtos/cesto-coletor-jacuzzi-a-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cesto-coletor-jacuzzi-b",
    title: "cesto-coletor-jacuzzi-b",
    brand: null,
    category: "Componentes e Peças",
    subcategory: "Jacuzzi",
    shortDescription: null,
    images: [
      {
        src: "/produtos/cesto-coletor-jacuzzi-b-1.webp",
        alt: "",
      },
      {
        src: "/produtos/cesto-coletor-jacuzzi-b-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "resina-calas-95ab-incolor",
    title: "resina-calas-95ab-incolor",
    brand: null,
    category: "Resinas",
    subcategory: "Calas",
    shortDescription: null,
    images: [
      {
        src: "/produtos/resina-calas-95ab-incolor-1.webp",
        alt: "",
      },
      {
        src: "/produtos/resina-calas-95ab-incolor-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "resina-calas-91ac-vermelha",
    title: "resina-calas-91ac-vermelha",
    brand: null,
    category: "Resinas",
    subcategory: "Calas",
    shortDescription: null,
    images: [
      {
        src: "/produtos/resina-calas-91ac-vermelha-1.webp",
        alt: "",
      },
      {
        src: "/produtos/resina-calas-91ac-vermelha-2.webp",
        alt: "",
      },
      {
        src: "/produtos/resina-calas-91ac-vermelha-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "tinta-weg-preta-3-6l",
    title: "tinta-weg-preta-3-6l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/tinta-weg-preta-3-6l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-preta-3-6l-2.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-preta-3-6l-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "tinta-weg-azul-5007-3-6l",
    title: "tinta-weg-azul-5007-3-6l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/tinta-weg-azul-5007-3-6l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-azul-5007-3-6l-2.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-azul-5007-3-6l-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "tinta-weg-azul-5002-3-6l",
    title: "tinta-weg-azul-5002-3-6l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/tinta-weg-azul-5002-3-6l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-azul-5002-3-6l-2.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-azul-5002-3-6l-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "tinta-weg-azul-5009-3-6l",
    title: "tinta-weg-azul-5009-3-6l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/tinta-weg-azul-5009-3-6l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-azul-5009-3-6l-2.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-azul-5009-3-6l-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "tinta-weg-vermelha-criptal-3-6l",
    title: "tinta-weg-vermelha-criptal-3-6l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: null,
    images: [
      {
        src: "/produtos/tinta-weg-vermelha-criptal-3-6l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-vermelha-criptal-3-6l-2.webp",
        alt: "",
      },
      {
        src: "/produtos/tinta-weg-vermelha-criptal-3-6l-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "verniz-weg-1303-1l",
    title: "verniz-weg-1303-1l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: null,
    images: [
      {
        src: "/produtos/verniz-weg-1303-1l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/verniz-weg-1303-1l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "diluente-weg-1l",
    title: "diluente-weg-1l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: null,
    images: [
      {
        src: "/produtos/diluente-weg-1l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/diluente-weg-1l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "verniz-weg-1303-5l",
    title: "verniz-weg-1303-5l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: null,
    images: [
      {
        src: "/produtos/verniz-weg-1303-5l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/verniz-weg-1303-5l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "verniz-weg-1333-5l",
    title: "verniz-weg-1333-5l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: null,
    images: [
      {
        src: "/produtos/verniz-weg-1333-5l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/verniz-weg-1333-5l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "verniz-weg-1314-5l-secagem-estufa",
    title: "verniz-weg-1314-5l-secagem-estufa",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: null,
    images: [
      {
        src: "/produtos/verniz-weg-1314-5l-secagem-estufa-1.webp",
        alt: "",
      },
      {
        src: "/produtos/verniz-weg-1314-5l-secagem-estufa-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "diluente-weg-1014-5l",
    title: "diluente-weg-1014-5l",
    brand: null,
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: null,
    images: [
      {
        src: "/produtos/diluente-weg-1014-5l-1.webp",
        alt: "",
      },
      {
        src: "/produtos/diluente-weg-1014-5l-2.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-0-08mm",
    title: "espaguete-flexnor-130c-0-08mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-0-08mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-0-08mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-0-08mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-1-00mm",
    title: "espaguete-flexnor-130c-1-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-1-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-1-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-1-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-2-00mm",
    title: "espaguete-flexnor-130c-2-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-2-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-2-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-2-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-3-00mm",
    title: "espaguete-flexnor-130c-3-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-3-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-3-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-3-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-4-00mm",
    title: "espaguete-flexnor-130c-4-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-4-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-4-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-4-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-4-50mm",
    title: "espaguete-flexnor-130c-4-50mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-4-50mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-4-50mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-4-50mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-5-00mm",
    title: "espaguete-flexnor-130c-5-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-5-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-5-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-5-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-6-00mm",
    title: "espaguete-flexnor-130c-6-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-6-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-6-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-6-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-7-00mm",
    title: "espaguete-flexnor-130c-7-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-7-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-7-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-7-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-8-00mm",
    title: "espaguete-flexnor-130c-8-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-8-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-8-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-8-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-10-00mm",
    title: "espaguete-flexnor-130c-10-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-10-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-10-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-10-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-12-00mm",
    title: "espaguete-flexnor-130c-12-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-12-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-12-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-12-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-14-00mm",
    title: "espaguete-flexnor-130c-14-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-14-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-14-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-14-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-15-00mm",
    title: "espaguete-flexnor-130c-15-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-15-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-15-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-15-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-16-00mm",
    title: "espaguete-flexnor-130c-16-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-16-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-16-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-16-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-18-00mm",
    title: "espaguete-flexnor-130c-18-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-18-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-18-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-18-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-20-00mm",
    title: "espaguete-flexnor-130c-20-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-20-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-20-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-20-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-flexnor-130c-25-00mm",
    title: "espaguete-flexnor-130c-25-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-flexnor-130c-25-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-25-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-flexnor-130c-25-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-0-08mm",
    title: "espaguete-silicone-200c-0-08mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-0-08mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-0-08mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-0-08mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-1-00mm",
    title: "espaguete-silicone-200c-1-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-1-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-1-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-1-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-2-00mm",
    title: "espaguete-silicone-200c-2-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-2-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-2-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-2-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-3-00mm",
    title: "espaguete-silicone-200c-3-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-3-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-3-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-3-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-4-00mm",
    title: "espaguete-silicone-200c-4-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-4-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-4-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-4-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-4-50mm",
    title: "espaguete-silicone-200c-4-50mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-4-50mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-4-50mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-4-50mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-5-00mm",
    title: "espaguete-silicone-200c-5-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-5-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-5-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-5-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-6-00mm",
    title: "espaguete-silicone-200c-6-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-6-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-6-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-6-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-7-00mm",
    title: "espaguete-silicone-200c-7-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-7-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-7-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-7-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-8-00mm",
    title: "espaguete-silicone-200c-8-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-8-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-8-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-8-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-10-00mm",
    title: "espaguete-silicone-200c-10-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-10-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-10-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-10-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-12-00mm",
    title: "espaguete-silicone-200c-12-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-12-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-12-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-12-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-14-00mm",
    title: "espaguete-silicone-200c-14-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-14-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-14-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-14-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-15-00mm",
    title: "espaguete-silicone-200c-15-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-15-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-15-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-15-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-16-00mm",
    title: "espaguete-silicone-200c-16-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-16-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-16-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-16-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-18-00mm",
    title: "espaguete-silicone-200c-18-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-18-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-18-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-18-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-20-00mm",
    title: "espaguete-silicone-200c-20-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-20-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-20-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-20-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguete-silicone-200c-25-00mm",
    title: "espaguete-silicone-200c-25-00mm",
    brand: null,
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: null,
    images: [
      {
        src: "/produtos/espaguete-silicone-200c-25-00mm-1.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-25-00mm-2.webp",
        alt: "",
      },
      {
        src: "/produtos/espaguete-silicone-200c-25-00mm-3.webp",
        alt: "",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "acamador-grande",
    title: "Acamador – Grande",
    brand: "Sem marca",
    category: "Acamadores",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/acamador-grande.webp",
        alt: "Acamador – Grande",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "acamador-medio",
    title: "Acamador – Médio",
    brand: "Sem marca",
    category: "Acamadores",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/acamador-medio.webp",
        alt: "Acamador – Médio",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "acamador-pequeno",
    title: "Acamador – Pequeno",
    brand: "Sem marca",
    category: "Acamadores",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/acamador-pequeno.webp",
        alt: "Acamador – Pequeno",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "acamador-micro",
    title: "Acamador – Micro",
    brand: "Sem marca",
    category: "Acamadores",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/acamador-micro.webp",
        alt: "Acamador – Micro",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "base-motor-weg-42w-pequena",
    title: "Base de Motor WEG 42W (Pequena)",
    brand: "WEG",
    category: "Bases de Motor WEG",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/base-motor-weg-42w-pequena.webp",
        alt: "Base de Motor WEG 42W (Pequena)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "base-motor-weg-48w-media",
    title: "Base de Motor WEG 48W (Média)",
    brand: "WEG",
    category: "Bases de Motor WEG",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/base-motor-weg-48w-media.webp",
        alt: "Base de Motor WEG 48W (Média)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "base-motor-weg-56w-grande",
    title: "Base de Motor WEG 56W (Grande)",
    brand: "WEG",
    category: "Bases de Motor WEG",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/base-motor-weg-56w-grande.webp",
        alt: "Base de Motor WEG 56W (Grande)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "base-weg-56-extra-grande",
    title: "Base WEG 56 (Extra Grande)",
    brand: "WEG",
    category: "Bases de Motor WEG",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/base-weg-56-extra-grande.webp",
        alt: "Base WEG 56 (Extra Grande)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "caixa-de-ligacao-weg-63-71-80",
    title: "Caixa de Ligação WEG 63/71/80",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/caixa-de-ligacao-weg-63-71-80.webp",
        alt: "Caixa de Ligação WEG 63/71/80",
      },
      {
        src: "/produtos/caixa-de-ligacao-weg-63-71-80-alt.webp",
        alt: "Caixa de Ligação WEG 63/71/80",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "caixa-de-ligacao-weg-90-100",
    title: "Caixa de Ligação WEG 90/100",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/caixa-de-ligacao-weg-90-100.webp",
        alt: "Caixa de Ligação WEG 90/100",
      },
      {
        src: "/produtos/caixa-de-ligacao-weg-90-100-alt.webp",
        alt: "Caixa de Ligação WEG 90/100",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "caixa-de-ligacao-weg-112-132",
    title: "Caixa de Ligação WEG 112/132",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/caixa-de-ligacao-weg-112-132.webp",
        alt: "Caixa de Ligação WEG 112/132",
      },
      {
        src: "/produtos/caixa-de-ligacao-weg-112-132-alt.webp",
        alt: "Caixa de Ligação WEG 112/132",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "caixa-de-ligacao-weg-160-180",
    title: "Caixa de Ligação WEG 160/180",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/caixa-de-ligacao-weg-160-180-1.webp",
        alt: "Caixa de Ligação WEG 160/180",
      },
      {
        src: "/produtos/caixa-de-ligacao-weg-160-180-2.webp",
        alt: "Caixa de Ligação WEG 160/180",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "caixa-de-ligacao-weg-200",
    title: "Caixa de Ligação WEG 200",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/caixa-de-ligacao-weg-200-1.webp",
        alt: "Caixa de Ligação WEG 200",
      },
      {
        src: "/produtos/caixa-de-ligacao-weg-200-2.webp",
        alt: "Caixa de Ligação WEG 200",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-laranja-1-2",
    title: 'Cadarço Laranja 1/2"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-laranja-1-2-1.webp",
        alt: 'Cadarço Laranja 1/2"',
      },
      {
        src: "/produtos/cadarco-laranja-1-2-2.webp",
        alt: 'Cadarço Laranja 1/2"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-laranja-3-4",
    title: 'Cadarço Laranja 3/4"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-laranja-3-4-1.webp",
        alt: 'Cadarço Laranja 3/4"',
      },
      {
        src: "/produtos/cadarco-laranja-3-4-2.webp",
        alt: 'Cadarço Laranja 3/4"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-laranja-5-8",
    title: 'Cadarço Laranja 5/8"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-laranja-5-8-1.webp",
        alt: 'Cadarço Laranja 5/8"',
      },
      {
        src: "/produtos/cadarco-laranja-5-8-2.webp",
        alt: 'Cadarço Laranja 5/8"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-laranja-1",
    title: 'Cadarço Laranja 1"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-laranja-1-1.webp",
        alt: 'Cadarço Laranja 1"',
      },
      {
        src: "/produtos/cadarco-laranja-1-2.webp",
        alt: 'Cadarço Laranja 1"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-algodao-1-2",
    title: 'Cadarço de Algodão 1/2"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-algodao-1-2.webp",
        alt: 'Cadarço de Algodão 1/2"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-algodao-3-4",
    title: 'Cadarço de Algodão 3/4"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-algodao-3-4.webp",
        alt: 'Cadarço de Algodão 3/4"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-algodao-5-8",
    title: 'Cadarço de Algodão 5/8"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-algodao-5-8.webp",
        alt: 'Cadarço de Algodão 5/8"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-algodao-1",
    title: 'Cadarço de Algodão 1"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-algodao-1.webp",
        alt: 'Cadarço de Algodão 1"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-fibra-de-vidro-1-2",
    title: 'Cadarço de Fibra de Vidro 1/2"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-fibra-de-vidro-1-2-1.webp",
        alt: 'Cadarço de Fibra de Vidro 1/2"',
      },
      {
        src: "/produtos/cadarco-fibra-de-vidro-1-2-2.webp",
        alt: 'Cadarço de Fibra de Vidro 1/2"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-fibra-de-vidro-3-4",
    title: 'Cadarço de Fibra de Vidro 3/4"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-fibra-de-vidro-3-4-1.webp",
        alt: 'Cadarço de Fibra de Vidro 3/4"',
      },
      {
        src: "/produtos/cadarco-fibra-de-vidro-3-4-2.webp",
        alt: 'Cadarço de Fibra de Vidro 3/4"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-fibra-de-vidro-5-8",
    title: 'Cadarço de Fibra de Vidro 5/8"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-fibra-de-vidro-5-8-1.webp",
        alt: 'Cadarço de Fibra de Vidro 5/8"',
      },
      {
        src: "/produtos/cadarco-fibra-de-vidro-5-8-2.webp",
        alt: 'Cadarço de Fibra de Vidro 5/8"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-fibra-de-vidro-1",
    title: 'Cadarço de Fibra de Vidro 1"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-fibra-de-vidro-1-1.webp",
        alt: 'Cadarço de Fibra de Vidro 1"',
      },
      {
        src: "/produtos/cadarco-fibra-de-vidro-1-2.webp",
        alt: 'Cadarço de Fibra de Vidro 1"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-poliester-1-2",
    title: 'Cadarço de Poliéster 1/2"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-poliester-1-2-1.webp",
        alt: 'Cadarço de Poliéster 1/2"',
      },
      {
        src: "/produtos/cadarco-poliester-1-2-2.webp",
        alt: 'Cadarço de Poliéster 1/2"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-poliester-3-4",
    title: 'Cadarço de Poliéster 3/4"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-poliester-3-4-1.webp",
        alt: 'Cadarço de Poliéster 3/4"',
      },
      {
        src: "/produtos/cadarco-poliester-3-4-2.webp",
        alt: 'Cadarço de Poliéster 3/4"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-poliester-5-8",
    title: 'Cadarço de Poliéster 5/8"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-poliester-5-8-1.webp",
        alt: 'Cadarço de Poliéster 5/8"',
      },
      {
        src: "/produtos/cadarco-poliester-5-8-2.webp",
        alt: 'Cadarço de Poliéster 5/8"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarco-poliester-1",
    title: 'Cadarço de Poliéster 1"',
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/cadarco-poliester-1-1.webp",
        alt: 'Cadarço de Poliéster 1"',
      },
      {
        src: "/produtos/cadarco-poliester-1-2.webp",
        alt: 'Cadarço de Poliéster 1"',
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fita-linear-6mm",
    title: "Fita Linear 6MM",
    brand: "Sem marca",
    category: "Fitas Lineares",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/fita-linear-6mm-1.webp",
        alt: "Fita Linear 6MM",
      },
      {
        src: "/produtos/fita-linear-6mm-2.webp",
        alt: "Fita Linear 6MM",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fita-linear-12mm",
    title: "Fita Linear 12MM",
    brand: "Sem marca",
    category: "Fitas Lineares",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/fita-linear-12mm-1.webp",
        alt: "Fita Linear 12MM",
      },
      {
        src: "/produtos/fita-linear-12mm-2.webp",
        alt: "Fita Linear 12MM",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fita-linear-19mm",
    title: "Fita Linear 19MM",
    brand: "Sem marca",
    category: "Fitas Lineares",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/fita-linear-19mm-1.webp",
        alt: "Fita Linear 19MM",
      },
      {
        src: "/produtos/fita-linear-19mm-2.webp",
        alt: "Fita Linear 19MM",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fita-linear-25mm",
    title: "Fita Linear 25MM",
    brand: "Sem marca",
    category: "Fitas Lineares",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/fita-linear-25mm-1.webp",
        alt: "Fita Linear 25MM",
      },
      {
        src: "/produtos/fita-linear-25mm-2.webp",
        alt: "Fita Linear 25MM",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-56-1-haste-1-hp-weg-similar",
    title: "Platinado 56 1 Haste 1 HP WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-56-1-haste-1-hp-weg-similar.webp",
        alt: "Platinado 56 1 Haste 1 HP WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-56-1-haste-1-hp-weg-original",
    title: "Platinado 56 1 Haste 1 HP WEG (Original)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-56-1-haste-1-hp-weg-original.webp",
        alt: "Platinado 56 1 Haste 1 HP WEG (Original)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-56-2-hastes-1hp-weg-similar",
    title: "Platinado 56 2 Hastes 1HP WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-56-2-hastes-1hp-weg-similar.webp",
        alt: "Platinado 56 2 Hastes 1HP WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-56-2-hastes-1hp-weg-original",
    title: "Platinado 56 2 Hastes 1HP WEG (Original)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-56-2-hastes-1hp-weg-original.webp",
        alt: "Platinado 56 2 Hastes 1HP WEG (Original)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-48-1-haste-3-4-cv-weg-similar",
    title: "Platinado 48 1 Haste 3/4 CV WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-48-1-haste-3-4-cv-weg-similar.webp",
        alt: "Platinado 48 1 Haste 3/4 CV WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-48-1-haste-3-4-cv-weg-original",
    title: "Platinado 48 1 Haste 3/4 CV WEG (Original)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-48-1-haste-3-4-cv-weg-original.webp",
        alt: "Platinado 48 1 Haste 3/4 CV WEG (Original)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-48-2-hastes-3-4-cv-weg-similar",
    title: "Platinado 48 2 Hastes 3/4 CV WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-48-2-hastes-3-4-cv-weg-similar.webp",
        alt: "Platinado 48 2 Hastes 3/4 CV WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-48-2-hastes-3-4-cv-weg-original",
    title: "Platinado 48 2 Hastes 3/4 CV WEG (Original)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-48-2-hastes-3-4-cv-weg-original.webp",
        alt: "Platinado 48 2 Hastes 3/4 CV WEG (Original)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-42-moderninho-weg-similar",
    title: "42 Moderninho WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-42-moderninho-weg-similar.webp",
        alt: "42 Moderninho WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-42-moderninho-weg-10361410",
    title: "42 Moderninho WEG – 10361410",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-42-moderninho-weg-10361410.webp",
        alt: "42 Moderninho WEG – 10361410",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-cortador-de-grama-1-haste-weg-similar",
    title: "Cortador de Grama 1 Haste WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-cortador-de-grama-1-haste-weg-similar.webp",
        alt: "Cortador de Grama 1 Haste WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-cortador-de-grama-1-haste-weg-10017338",
    title: "Cortador de Grama 1 Haste WEG – 10017338",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-cortador-de-grama-1-haste-weg-10017338.webp",
        alt: "Cortador de Grama 1 Haste WEG – 10017338",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-cortador-de-grama-2-hastes-weg-similar",
    title: "Cortador de Grama 2 Hastes WEG (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-cortador-de-grama-2-hastes-weg-similar.webp",
        alt: "Cortador de Grama 2 Hastes WEG (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-rural-5hp-weg-10017200",
    title: "Rural 5HP WEG – 10017200",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-rural-5hp-weg-10017200.webp",
        alt: "Rural 5HP WEG – 10017200",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-rural-weg-5hp-similar",
    title: "Rural WEG 5HP (Similar)",
    brand: "WEG",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-rural-weg-5hp-similar.webp",
        alt: "Rural WEG 5HP (Similar)",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-moderninho-novo-1-contato-kohlbach-similar",
    title: "Moderninho Novo 1 Contato (Similar) – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-moderninho-novo-1-contato-kohlbach-similar.webp",
        alt: "Moderninho Novo 1 Contato (Similar) – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-moderninho-pequeno-1-cv-tipo-garfo-kohlbach",
    title: "Moderninho Pequeno 1 CV Tipo Garfo – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-moderninho-pequeno-1-cv-tipo-garfo-kohlbach.webp",
        alt: "Moderninho Pequeno 1 CV Tipo Garfo – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-antigo-grande-7-5-cv-kohlbach",
    title: "Antigo Grande 7.5 CV – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-antigo-grande-7-5-cv-kohlbach.webp",
        alt: "Antigo Grande 7.5 CV – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-laranja-2-hastes-kohlbach",
    title: "Laranja 2 Hastes – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-laranja-2-hastes-kohlbach.webp",
        alt: "Laranja 2 Hastes – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-moderninho-grande-3-cv-tipo-garfo-kohlbach",
    title: "Moderninho Grande 3 CV Tipo Garfo – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-moderninho-grande-3-cv-tipo-garfo-kohlbach.webp",
        alt: "Moderninho Grande 3 CV Tipo Garfo – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-antigo-pequeno-1-5-cv-kohlbach",
    title: "Antigo Pequeno 1.5 CV – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-antigo-pequeno-1-5-cv-kohlbach.webp",
        alt: "Antigo Pequeno 1.5 CV – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-moderninho-novo-2-contatos-kohlbach-similar",
    title: "Moderninho Novo 2 Contatos (Similar) – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-moderninho-novo-2-contatos-kohlbach-similar.webp",
        alt: "Moderninho Novo 2 Contatos (Similar) – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-laranja-1-haste-kohlbach",
    title: "Laranja 1 Haste – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-laranja-1-haste-kohlbach.webp",
        alt: "Laranja 1 Haste – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-kohlbach-moderninho-novo-2-contatos",
    title: "Kohlbach Moderninho Novo 2 Contatos",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-kohlbach-moderninho-novo-2-contatos.webp",
        alt: "Kohlbach Moderninho Novo 2 Contatos",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinado-moderninho-novo-1-contato-kohlbach",
    title: "Moderninho Novo 1 Contato – Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "",
    shortDescription: "",
    images: [
      {
        src: "/produtos/platinado-moderninho-novo-1-contato-kohlbach.webp",
        alt: "Moderninho Novo 1 Contato – Kohlbach",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-605-hch-ddu",
    title: "Rolamento HCH 605 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "5×14×5 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 605 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 605 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-605-hch-zz",
    title: "Rolamento HCH 605 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "5×14×5 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 605 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 605 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-605-nsk-ddu",
    title: "Rolamento NSK 605 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "5×14×5 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 605 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 605 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-605-nsk-zz",
    title: "Rolamento NSK 605 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "5×14×5 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 605 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 605 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-606-hch-ddu",
    title: "Rolamento HCH 606 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "6×17×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 606 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 606 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-606-hch-zz",
    title: "Rolamento HCH 606 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "6×17×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 606 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 606 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-606-nsk-ddu",
    title: "Rolamento NSK 606 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "6×17×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 606 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 606 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-606-nsk-zz",
    title: "Rolamento NSK 606 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "6×17×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 606 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 606 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-607-hch-ddu",
    title: "Rolamento HCH 607 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "7×19×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 607 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 607 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-607-hch-zz",
    title: "Rolamento HCH 607 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "7×19×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 607 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 607 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-607-nsk-ddu",
    title: "Rolamento NSK 607 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "7×19×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 607 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 607 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-607-nsk-zz",
    title: "Rolamento NSK 607 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "7×19×6 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 607 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 607 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-608-hch-ddu",
    title: "Rolamento HCH 608 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "8×22×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 608 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 608 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-608-hch-zz",
    title: "Rolamento HCH 608 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "8×22×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 608 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 608 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-608-nsk-ddu",
    title: "Rolamento NSK 608 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "8×22×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 608 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 608 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-608-nsk-zz",
    title: "Rolamento NSK 608 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "8×22×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 608 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 608 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-609-hch-ddu",
    title: "Rolamento HCH 609 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "9×24×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 609 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 609 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-609-hch-zz",
    title: "Rolamento HCH 609 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "9×24×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 609 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 609 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-609-nsk-ddu",
    title: "Rolamento NSK 609 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "9×24×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 609 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 609 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-609-nsk-zz",
    title: "Rolamento NSK 609 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 600",
    shortDescription: "9×24×7 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 609 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 609 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6000-hch-ddu",
    title: "Rolamento HCH 6000 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "10×26×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6000 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6000 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6000-hch-zz",
    title: "Rolamento HCH 6000 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "10×26×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6000 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6000 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6000-nsk-ddu",
    title: "Rolamento NSK 6000 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "10×26×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6000 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6000 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6000-nsk-zz",
    title: "Rolamento NSK 6000 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "10×26×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6000 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6000 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6001-hch-ddu",
    title: "Rolamento HCH 6001 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "12×28×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6001 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6001 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6001-hch-zz",
    title: "Rolamento HCH 6001 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "12×28×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6001 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6001 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6001-nsk-ddu",
    title: "Rolamento NSK 6001 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "12×28×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6001 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6001 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6001-nsk-zz",
    title: "Rolamento NSK 6001 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "12×28×8 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6001 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6001 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6002-hch-ddu",
    title: "Rolamento HCH 6002 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "15×32×9 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6002 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6002 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6002-hch-zz",
    title: "Rolamento HCH 6002 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "15×32×9 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6002 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6002 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6002-nsk-ddu",
    title: "Rolamento NSK 6002 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "15×32×9 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6002 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6002 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6002-nsk-zz",
    title: "Rolamento NSK 6002 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "15×32×9 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6002 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6002 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6003-hch-ddu",
    title: "Rolamento HCH 6003 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "17×35×10 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6003 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6003 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6003-hch-zz",
    title: "Rolamento HCH 6003 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "17×35×10 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6003 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6003 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6003-nsk-ddu",
    title: "Rolamento NSK 6003 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "17×35×10 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6003 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6003 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6003-nsk-zz",
    title: "Rolamento NSK 6003 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "17×35×10 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6003 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6003 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6004-hch-ddu",
    title: "Rolamento HCH 6004 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "20×42×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6004 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6004 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6004-hch-zz",
    title: "Rolamento HCH 6004 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "20×42×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6004 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6004 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6004-nsk-ddu",
    title: "Rolamento NSK 6004 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "20×42×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6004 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6004 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6004-nsk-zz",
    title: "Rolamento NSK 6004 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "20×42×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6004 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6004 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6005-hch-ddu",
    title: "Rolamento HCH 6005 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "25×47×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6005 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6005 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6005-hch-zz",
    title: "Rolamento HCH 6005 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "25×47×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6005 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6005 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6005-nsk-ddu",
    title: "Rolamento NSK 6005 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "25×47×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6005 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6005 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6005-nsk-zz",
    title: "Rolamento NSK 6005 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "25×47×12 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6005 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6005 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6006-hch-ddu",
    title: "Rolamento HCH 6006 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "30×55×13 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6006 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6006 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6006-hch-zz",
    title: "Rolamento HCH 6006 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "30×55×13 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6006 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6006 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6006-nsk-ddu",
    title: "Rolamento NSK 6006 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "30×55×13 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6006 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6006 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6006-nsk-zz",
    title: "Rolamento NSK 6006 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "30×55×13 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6006 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6006 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6007-hch-ddu",
    title: "Rolamento HCH 6007 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "35×62×14 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6007 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6007 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6007-hch-zz",
    title: "Rolamento HCH 6007 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "35×62×14 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6007 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6007 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6007-nsk-ddu",
    title: "Rolamento NSK 6007 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "35×62×14 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6007 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6007 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6007-nsk-zz",
    title: "Rolamento NSK 6007 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "35×62×14 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6007 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6007 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6008-hch-ddu",
    title: "Rolamento HCH 6008 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "40×68×15 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6008 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6008 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6008-hch-zz",
    title: "Rolamento HCH 6008 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "40×68×15 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6008 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6008 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6008-nsk-ddu",
    title: "Rolamento NSK 6008 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "40×68×15 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6008 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6008 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6008-nsk-zz",
    title: "Rolamento NSK 6008 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "40×68×15 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6008 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6008 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6009-hch-ddu",
    title: "Rolamento HCH 6009 DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "45×75×16 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-hch-ddu-1.webp",
        alt: "Rolamento HCH 6009 DDU",
      },
      {
        src: "/produtos/rolamentos-hch-ddu-2.webp",
        alt: "Rolamento HCH 6009 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6009-hch-zz",
    title: "Rolamento HCH 6009 ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "45×75×16 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-hch-zz-1.webp",
        alt: "Rolamento HCH 6009 ZZ",
      },
      {
        src: "/produtos/rolamentos-hch-zz-2.webp",
        alt: "Rolamento HCH 6009 ZZ",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6009-nsk-ddu",
    title: "Rolamento NSK 6009 DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "45×75×16 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação DDU.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-ddu-1.webp",
        alt: "Rolamento NSK 6009 DDU",
      },
      {
        src: "/produtos/rolamentos-nsk-ddu-2.webp",
        alt: "Rolamento NSK 6009 DDU",
      },
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamento-6009-nsk-zz",
    title: "Rolamento NSK 6009 ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Série 6000",
    shortDescription: "45×75×16 mm • Esferas de aço, canaletas retificadas, baixo ruído. Vedação ZZ.",
    images: [
      {
        src: "/produtos/rolamentos-nsk-zz-1.webp",
        alt: "Rolamento NSK 6009 ZZ",
      },
      {
        src: "/produtos/rolamentos-nsk-zz-2.webp",
        alt: "Rolamento NSK 6009 ZZ",
      },
    ],
    techSpecs: null,
  },
]

export const products = PRODUCTS

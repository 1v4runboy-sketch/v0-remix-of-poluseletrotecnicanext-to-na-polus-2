// lib/unified-products.ts
import type { Product } from "./products"

// --------------------
// Helpers de formatação
// --------------------
const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n))
const awgSlug = (awg: number, kind: "silicone" | "lides") =>
  kind === "silicone"
    ? `cabo-silicone-${pad2(awg)}awg-200c-600v`
    : `cabo-lides-${pad2(awg)}awg-130c-600v`

const mmToSlug = (mm: number) => {
  // 0.08 -> "0-08mm"; 1 -> "1-00mm"; 4.5 -> "4-50mm"
  const fixed = mm.toFixed(2).replace(".", "-")
  return `${fixed}mm`
}

const flexnorSlug = (mm: number) => `espaguete-flexnor-130c-${mmToSlug(mm)}`
const siliconeSlug = (mm: number) => `espaguete-silicone-200c-${mmToSlug(mm)}`
const ufSlug = (uf: number) => (uf < 10 ? `0${uf}` : String(uf))

const mkVar = (
  id: string,
  label: string,
  unit: "m" | "kg" | "un" = "un",
  childSlug?: string,
  extra?: Record<string, any>
) => ({
  id,
  label,
  unit,
  ...(childSlug ? { attrs: { childSlug, ...(extra || {}) } } : extra ? { attrs: extra } : {}),
})

// --------------------
// Listas (constantes)
// --------------------
const CABOS_AWG = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]

const ESP_SIZES: number[] = [
  0.08, 1, 2, 3, 4, 4.5, 5, 6, 7, 8, 10, 12, 14, 15, 16, 18, 20, 25,
]

const UF_250V = [
  2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 18, 20, 22, 25, 30, 40, 45, 50, 55, 60, 65, 70, 80, 90, 100,
]
const UF_380 = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80,
  90, 100,
]
const UF_440 = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80,
  90, 100,
]

// Para eletrolíticos: lista inicial (podemos substituir pela lista exata do CSV quando desejar)
const UF_ELET_110 = [60, 80, 100, 120, 130, 140, 150, 160, 180, 200, 220, 250, 300, 350, 400]
const UF_ELET_220 = [20, 25, 30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 100, 120, 130, 140, 150]
const UF_ELET_MINI = [20, 25, 30, 40, 50, 60, 70, 80, 100, 120, 150]

// Rolamentos (séries disponíveis no seu products.ts)
const R_CODES = [
  "605", "606", "607", "608", "609",
  "6000", "6001", "6002", "6003", "6004", "6005", "6006", "6007", "6008", "6009",
]

// --------------------
// UNIFIED PRODUCTS
// --------------------
export const UNIFIED_PRODUCTS: Product[] = [
  // ---------------------------------------------------------------------------
  // CABOS
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "cabos-silicone-200c-600v",
    title: "Cabos de Silicone (200 °C • 600 V)",
    brand: "TRAMAR",
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: "Família completa TRAMAR – AWG 02 a AWG 22.",
    images: [
      { src: "/produtos/cabo-silicone-10awg-200c-600v-1.webp", alt: "Cabo de Silicone 10 AWG 200 °C 600 V" },
      { src: "/produtos/cabo-silicone-10awg-200c-600v-2.webp", alt: "Cabo de Silicone 10 AWG 200 °C 600 V" },
    ],
    variants: CABOS_AWG.map((g) =>
      mkVar(
        `sil-${g}awg`,
        `AWG ${pad2(g)} • 200 °C • 600 V`,
        "m",
        awgSlug(g, "silicone")
      )
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "cabos-lides-130c-600v",
    title: "Cabos Lides (130 °C • 600 V)",
    brand: "COFIBAM",
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: "Família completa COFIBAM – AWG 02 a AWG 22.",
    images: [
      { src: "/produtos/cabo-lides-10awg-130c-600v-1.webp", alt: "Cabo Lides 10 AWG 130 °C 600 V" },
      { src: "/produtos/cabo-lides-10awg-130c-600v-2.webp", alt: "Cabo Lides 10 AWG 130 °C 600 V" },
    ],
    variants: CABOS_AWG.map((g) =>
      mkVar(
        `lides-${g}awg`,
        `AWG ${pad2(g)} • 130 °C • 600 V`,
        "m",
        awgSlug(g, "lides")
      )
    ),
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // ESPAGUETES
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "espaguetes-flexnor-130c",
    title: "Espaguetes Flexnor 130 °C",
    brand: "COFIBAM",
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: "Diâmetros de 0,08 mm a 25,00 mm.",
    images: [
      { src: "/produtos/espaguete-flexnor-130c-1-00mm-1.webp", alt: "Espaguete Flexnor 130°C 1,00 mm" },
      { src: "/produtos/espaguete-flexnor-130c-1-00mm-2.webp", alt: "Espaguete Flexnor 130°C 1,00 mm" },
    ],
    variants: ESP_SIZES.map((s) =>
      mkVar(
        `flex130-${s}`,
        `${s.toFixed(2).replace(".", ",")} mm`,
        "m",
        flexnorSlug(s)
      )
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguetes-silicone-200c",
    title: "Espaguetes Silicone 200 °C",
    brand: "TRAMAR",
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: "Diâmetros de 0,08 mm a 25,00 mm.",
    images: [
      { src: "/produtos/espaguete-silicone-200c-1-00mm-1.webp", alt: "Espaguete Silicone 200°C 1,00 mm" },
      { src: "/produtos/espaguete-silicone-200c-1-00mm-2.webp", alt: "Espaguete Silicone 200°C 1,00 mm" },
    ],
    variants: ESP_SIZES.map((s) =>
      mkVar(
        `sil200-${s}`,
        `${s.toFixed(2).replace(".", ",")} mm`,
        "m",
        siliconeSlug(s)
      )
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguetes-155c",
    title: "Espaguetes 155 °C",
    brand: "COFIBAM",
    category: "Isolantes",
    subcategory: "Espaguete 155°C",
    shortDescription: "Linha Flexpoli 155 °C – variações por diâmetro.",
    images: [
      { src: "/produtos/espaguetes-flexpoli-155-1.webp", alt: "Espaguete 155°C (Flexpoli)" },
      { src: "/produtos/espaguetes-flexpoli-155-2.webp", alt: "Espaguete 155°C (Flexpoli)" },
    ],
    variants: ESP_SIZES.map((s) =>
      mkVar(`esp155-${s}`, `${s.toFixed(2).replace(".", ",")} mm`, "m")
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "espaguetes-fibra-de-vidro",
    title: "Espaguetes Fibra de Vidro",
    brand: "TRAMAR",
    category: "Isolantes",
    subcategory: "Espaguete Fibra de Vidro",
    shortDescription: "Isolação em fibra de vidro – variações por diâmetro.",
    images: [
      { src: "/produtos/espaguete-fiberglass-1.webp", alt: "Espaguete Fibra de Vidro" },
      { src: "/produtos/espaguete-fiberglass-2.webp", alt: "Espaguete Fibra de Vidro" },
    ],
    variants: ESP_SIZES.map((s) =>
      mkVar(`espfg-${s}`, `${s.toFixed(2).replace(".", ",")} mm`, "m")
    ),
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // CADARÇOS (sem logo/marca nos cards, conforme pedido — brand: null)
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "cadarcos-laranja",
    title: "Cadarços Laranja",
    brand: null,
    category: "Cadarços",
    subcategory: "",
    shortDescription: 'Medidas: 1/2", 5/8", 3/4" e 1".',
    images: [
      { src: "/produtos/cadarco-laranja-1-2-1.webp", alt: 'Cadarço Laranja 1/2"' },
      { src: "/produtos/cadarco-laranja-1-2-2.webp", alt: 'Cadarço Laranja 1/2"' },
    ],
    variants: [
      mkVar("cd-lar-1-2", '1/2"', "m", "cadarco-laranja-1-2"),
      mkVar("cd-lar-5-8", '5/8"', "m", "cadarco-laranja-5-8"),
      mkVar("cd-lar-3-4", '3/4"', "m", "cadarco-laranja-3-4"),
      mkVar("cd-lar-1", '1"', "m", "cadarco-laranja-1"),
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarcos-algodao",
    title: "Cadarços de Algodão",
    brand: null,
    category: "Cadarços",
    subcategory: "",
    shortDescription: 'Medidas: 1/2", 5/8", 3/4" e 1".',
    images: [
      { src: "/produtos/cadarco-algodao-1-2.webp", alt: 'Cadarço de Algodão 1/2"' },
    ],
    variants: [
      mkVar("cd-alg-1-2", '1/2"', "m", "cadarco-algodao-1-2"),
      mkVar("cd-alg-5-8", '5/8"', "m", "cadarco-algodao-5-8"),
      mkVar("cd-alg-3-4", '3/4"', "m", "cadarco-algodao-3-4"),
      mkVar("cd-alg-1", '1"', "m", "cadarco-algodao-1"),
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarcos-fibra-de-vidro",
    title: "Cadarços de Fibra de Vidro",
    brand: null,
    category: "Cadarços",
    subcategory: "",
    shortDescription: 'Medidas: 1/2", 5/8", 3/4" e 1".',
    images: [
      { src: "/produtos/cadarco-fibra-de-vidro-1-2-1.webp", alt: 'Cadarço de Fibra de Vidro 1/2"' },
      { src: "/produtos/cadarco-fibra-de-vidro-1-2-2.webp", alt: 'Cadarço de Fibra de Vidro 1/2"' },
    ],
    variants: [
      mkVar("cd-fv-1-2", '1/2"', "m", "cadarco-fibra-de-vidro-1-2"),
      mkVar("cd-fv-5-8", '5/8"', "m", "cadarco-fibra-de-vidro-5-8"),
      mkVar("cd-fv-3-4", '3/4"', "m", "cadarco-fibra-de-vidro-3-4"),
      mkVar("cd-fv-1", '1"', "m", "cadarco-fibra-de-vidro-1"),
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "cadarcos-poliester",
    title: "Cadarços de Poliéster",
    brand: null,
    category: "Cadarços",
    subcategory: "",
    shortDescription: 'Medidas: 1/2", 5/8", 3/4" e 1".',
    images: [
      { src: "/produtos/cadarco-poliester-1-2-1.webp", alt: 'Cadarço de Poliéster 1/2"' },
      { src: "/produtos/cadarco-poliester-1-2-2.webp", alt: 'Cadarço de Poliéster 1/2"' },
    ],
    variants: [
      mkVar("cd-pol-1-2", '1/2"', "m", "cadarco-poliester-1-2"),
      mkVar("cd-pol-5-8", '5/8"', "m", "cadarco-poliester-5-8"),
      mkVar("cd-pol-3-4", '3/4"', "m", "cadarco-poliester-3-4"),
      mkVar("cd-pol-1", '1"', "m", "cadarco-poliester-1"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // FITA LINEAR
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "fita-linear",
    title: "Fita Linear",
    brand: null,
    category: "Fitas Lineares",
    subcategory: "",
    shortDescription: "Larguras 6 mm, 12 mm, 19 mm e 25 mm.",
    images: [
      { src: "/produtos/fita-linear-12mm-1.webp", alt: "Fita Linear 12 mm" },
      { src: "/produtos/fita-linear-12mm-2.webp", alt: "Fita Linear 12 mm" },
    ],
    variants: [
      mkVar("fita-6", "6 mm", "m", "fita-linear-6mm"),
      mkVar("fita-12", "12 mm", "m", "fita-linear-12mm"),
      mkVar("fita-19", "19 mm", "m", "fita-linear-19mm"),
      mkVar("fita-25", "25 mm", "m", "fita-linear-25mm"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // BASES DE MOTOR WEG
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "bases-de-motor-weg",
    title: "Bases de Motor WEG",
    brand: "WEG",
    category: "Bases de Motor WEG",
    subcategory: "",
    shortDescription: "42W (Pequena), 48W (Média), 56W (Grande) e 56 (Extra Grande).",
    images: [
      { src: "/produtos/base-motor-weg-56w-grande.webp", alt: "Base de Motor WEG 56W (Grande)" },
    ],
    variants: [
      mkVar("base-42w-peq", "WEG 42W – Pequena", "un", "base-motor-weg-42w-pequena"),
      mkVar("base-48w-med", "WEG 48W – Média", "un", "base-motor-weg-48w-media"),
      mkVar("base-56w-gra", "WEG 56W – Grande", "un", "base-motor-weg-56w-grande"),
      mkVar("base-56-exg", "WEG 56 – Extra Grande", "un", "base-weg-56-extra-grande"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // CAIXAS DE LIGAÇÃO WEG
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "caixas-de-ligacao-weg",
    title: "Caixas de Ligação WEG",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "Conjuntos 63/71/80, 90/100, 112/132, 160/180 e 200.",
    images: [
      { src: "/produtos/caixa-de-ligacao-weg-90-100.webp", alt: "Caixa de Ligação WEG 90/100" },
    ],
    variants: [
      mkVar("cx-63-71-80", "63/71/80", "un", "caixa-de-ligacao-weg-63-71-80"),
      mkVar("cx-90-100", "90/100", "un", "caixa-de-ligacao-weg-90-100"),
      mkVar("cx-112-132", "112/132", "un", "caixa-de-ligacao-weg-112-132"),
      mkVar("cx-160-180", "160/180", "un", "caixa-de-ligacao-weg-160-180"),
      mkVar("cx-200", "200", "un", "caixa-de-ligacao-weg-200"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // PLACAS DE BORNE WEG
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "placas-de-borne-weg",
    title: "Placas de Borne WEG",
    brand: "WEG",
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: "Modelos K1M4, K1M5, K1M6, K1M8, K1M10, K1M12 e K1M16.",
    images: [
      { src: "/produtos/placa-borne-weg-k1m10-1.webp", alt: "Placa de Borne WEG K1M10" },
    ],
    variants: [
      mkVar("k1m4", "K1M4", "un", "placa-borne-weg-k1m4"),
      mkVar("k1m5", "K1M5", "un", "placa-borne-weg-k1m5"),
      mkVar("k1m6", "K1M6", "un", "placa-borne-weg-k1m6"),
      mkVar("k1m8", "K1M8", "un", "placa-borne-weg-k1m8"),
      mkVar("k1m10", "K1M10", "un", "placa-borne-weg-k1m10"),
      mkVar("k1m12", "K1M12", "un", "placa-borne-weg-k1m12"),
      mkVar("k1m16", "K1M16", "un", "placa-borne-weg-k1m16"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // PROTETORES TÉRMICOS WEG
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "protetores-termicos-weg",
    title: "Protetores Térmicos WEG",
    brand: "WEG",
    category: "Proteção e Segurança",
    subcategory: "Protetores Térmicos",
    shortDescription: "Temperaturas de atuação: 130 °C, 155 °C e 180 °C.",
    images: [{ src: "/produtos/protetor-termico-weg-155c-1.webp", alt: "Protetor Térmico WEG 155 °C" }],
    variants: [
      mkVar("pt-130", "130 °C", "un", "protetor-termico-weg-130c"),
      mkVar("pt-155", "155 °C", "un", "protetor-termico-weg-155c"),
      mkVar("pt-180", "180 °C", "un", "protetor-termico-weg-180c"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // TINTAS WEG – AZUL
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "tintas-weg-azul",
    title: "Tintas WEG – Azul",
    brand: "WEG",
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: "Códigos VEG: 5002 • 5007 • 5009 (embalagem 3,6 L).",
    images: [
      { src: "/produtos/tinta-weg-azul-5007-3-6l-1.webp", alt: "Tinta WEG Azul 5007 3,6 L" },
    ],
    variants: [
      mkVar("az-5002", "Azul 5002 (3,6 L)", "un", "tinta-weg-azul-5002-3-6l"),
      mkVar("az-5007", "Azul 5007 (3,6 L)", "un", "tinta-weg-azul-5007-3-6l"),
      mkVar("az-5009", "Azul 5009 (3,6 L)", "un", "tinta-weg-azul-5009-3-6l"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // VERNIZES WEG – 5 L
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "vernizes-weg-5l",
    title: "Vernizes WEG – 5 L",
    brand: "WEG",
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: "WEG 1303 • WEG 1333 • WEG 1314 (secagem em estufa).",
    images: [
      { src: "/produtos/verniz-weg-1333-5l-1.webp", alt: "Verniz WEG 1333 5 L" },
    ],
    variants: [
      mkVar("vz-1303", "WEG 1303 (5 L)", "un", "verniz-weg-1303-5l"),
      mkVar("vz-1333", "WEG 1333 (5 L)", "un", "verniz-weg-1333-5l"),
      mkVar("vz-1314", "WEG 1314 (5 L) • Secagem Estufa", "un", "verniz-weg-1314-5l-secagem-estufa"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // CAPACITORES PERMANENTES
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "capacitores-permanentes-250v",
    title: "Capacitores Permanentes 250 V",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: "Família completa (02 µF a 100 µF).",
    images: [
      { src: "/produtos/capacitor-permanente-250v-02uf-1.webp", alt: "Capacitor Permanente 250 V 02 µF" },
    ],
    variants: UF_250V.map((uf) =>
      mkVar(`cp250-${uf}`, `${uf} µF`, "un", `capacitor-permanente-250v-${ufSlug(uf)}uf`)
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitores-permanentes-380-400v",
    title: "Capacitores Permanentes 380/400 V",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: "Família completa (02 µF a 100 µF).",
    images: [
      { src: "/produtos/capacitor-permanente-380-400vac-02uf-2.webp", alt: "Capacitor Permanente 380/400 V 02 µF" },
    ],
    variants: UF_380.map((uf) =>
      mkVar(
        `cp400-${uf}`,
        `${uf} µF`,
        "un",
        `capacitor-permanente-380-400vac-${ufSlug(uf)}uf`
      )
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitores-permanentes-440-450v",
    title: "Capacitores Permanentes 440/450 V",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: "Família completa (02 µF a 100 µF).",
    images: [
      { src: "/produtos/capacitor-permanente-440-450vac-02uf-1.webp", alt: "Capacitor Permanente 440/450 V 02 µF" },
    ],
    variants: UF_440.map((uf) =>
      mkVar(
        `cp450-${uf}`,
        `${uf} µF`,
        "un",
        `capacitor-permanente-440-450vac-${ufSlug(uf)}uf`
      )
    ),
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // CAPACITORES ELETROLÍTICOS (fotos garantidas — variações podem ser refinadas com seu CSV)
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "capacitores-eletroliticos-110v",
    title: "Capacitores Eletrolíticos 110 V (Partida)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Eletrolíticos 110V",
    shortDescription: "Linha de partida 110 V – consulte variações em µF.",
    images: [
      { src: "/produtos/capacitor-eletrolitico-eletrolitico-110v-1.webp", alt: "Capacitor Eletrolítico 110 V" },
      { src: "/produtos/capacitor-eletrolitico-eletrolitico-110v-2.webp", alt: "Capacitor Eletrolítico 110 V" },
    ],
    variants: UF_ELET_110.map((uf) => mkVar(`cel110-${uf}`, `${uf} µF`)),
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitores-eletroliticos-220v",
    title: "Capacitores Eletrolíticos 220 V (Partida)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Eletrolíticos 220V",
    shortDescription: "Linha de partida 220 V – consulte variações em µF.",
    images: [
      { src: "/produtos/capacitor-eletrolitico-eletrolitico-220v-1.webp", alt: "Capacitor Eletrolítico 220 V" },
      { src: "/produtos/capacitor-eletrolitico-eletrolitico-220v-2.webp", alt: "Capacitor Eletrolítico 220 V" },
    ],
    variants: UF_ELET_220.map((uf) => mkVar(`cel220-${uf}`, `${uf} µF`)),
    techSpecs: null,
  },
  {
    id: "",
    slug: "capacitores-eletroliticos-mini",
    title: "Capacitores Eletrolíticos Mini",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Eletrolíticos Mini",
    shortDescription: "Linha Mini – dimensões reduzidas, diversas capacitâncias.",
    images: [
      { src: "/produtos/capacitor-mini-1.webp", alt: "Capacitor Eletrolítico Mini" },
      { src: "/produtos/capacitor-mini-2.webp", alt: "Capacitor Eletrolítico Mini" },
    ],
    variants: UF_ELET_MINI.map((uf) => mkVar(`celmini-${uf}`, `${uf} µF`)),
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // ROLAMENTOS – FAMÍLIAS
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "rolamentos-nsk-skf-ddu",
    title: "Rolamentos NSK/SKF – DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Vedação DDU",
    shortDescription: "Séries 600/6000 – vedação dupla de borracha (DDU).",
    images: [
      { src: "/produtos/rolamentos-nsk-ddu-1.webp", alt: "Rolamento NSK DDU" },
    ],
    variants: R_CODES.map((code) =>
      mkVar(`nskddu-${code}`, `${code} • DDU`, "un", `rolamento-${code}-nsk-ddu`)
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamentos-nsk-skf-zz",
    title: "Rolamentos NSK/SKF – ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Vedação ZZ",
    shortDescription: "Séries 600/6000 – blindagem metálica dupla (ZZ).",
    images: [
      { src: "/produtos/rolamentos-nsk-zz-1.webp", alt: "Rolamento NSK ZZ" },
    ],
    variants: R_CODES.map((code) =>
      mkVar(`nskzz-${code}`, `${code} • ZZ`, "un", `rolamento-${code}-nsk-zz`)
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamentos-hch-ddu",
    title: "Rolamentos HCH – DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Vedação DDU",
    shortDescription: "Séries 600/6000 – vedação dupla de borracha (DDU).",
    images: [
      { src: "/produtos/rolamentos-hch-ddu-1.webp", alt: "Rolamento HCH DDU" },
    ],
    variants: R_CODES.map((code) =>
      mkVar(`hchddu-${code}`, `${code} • DDU`, "un", `rolamento-${code}-hch-ddu`)
    ),
    techSpecs: null,
  },
  {
    id: "",
    slug: "rolamentos-hch-zz",
    title: "Rolamentos HCH – ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Vedação ZZ",
    shortDescription: "Séries 600/6000 – blindagem metálica dupla (ZZ).",
    images: [
      { src: "/produtos/rolamentos-hch-zz-1.webp", alt: "Rolamento HCH ZZ" },
    ],
    variants: R_CODES.map((code) =>
      mkVar(`hchzz-${code}`, `${code} • ZZ`, "un", `rolamento-${code}-hch-zz`)
    ),
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // FIOS ESMALTADOS
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "fio-esmaltado-de-cobre",
    title: "Fio de Cobre Esmaltado",
    brand: "Condupasqua",
    category: "Fios e Cabos",
    subcategory: "Fios Esmaltados",
    shortDescription: "Fio de cobre esmaltado – variações por AWG.",
    images: [
      { src: "/produtos/fio-de-cobre-esmaltado-04-33-awg-1.webp", alt: "Fio de Cobre Esmaltado AWG 33" },
    ],
    variants: [
      mkVar("fc-33", "AWG 33", "kg", "fio-de-cobre-esmaltado-04-33-awg"),
      // Se surgirem novos AWGs, basta adicionar aqui apontando para os slugs correspondentes.
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "fio-esmaltado-de-aluminio",
    title: "Fio de Alumínio Esmaltado",
    brand: "São Marco",
    category: "Fios e Cabos",
    subcategory: "Fios Esmaltados",
    shortDescription: "Fio de alumínio esmaltado – variações por AWG.",
    images: [
      { src: "/produtos/fio-aluminio-esmaltado-04-25-awg-1.webp", alt: "Fio de Alumínio Esmaltado AWG 25" },
      { src: "/produtos/fio-aluminio-esmaltado-04-25-awg-2.webp", alt: "Fio de Alumínio Esmaltado AWG 25" },
    ],
    variants: [
      mkVar("fa-25", "AWG 25", "kg", "fio-aluminio-esmaltado-04-25-awg"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // ACAMADORES
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "acamadores",
    title: "Acamadores",
    brand: null,
    category: "Acamadores",
    subcategory: "",
    shortDescription: "Modelos Micro, Pequeno, Médio e Grande.",
    images: [{ src: "/produtos/acamador-medio.webp", alt: "Acamador – Médio" }],
    variants: [
      mkVar("ac-micro", "Micro", "un", "acamador-micro"),
      mkVar("ac-pequeno", "Pequeno", "un", "acamador-pequeno"),
      mkVar("ac-medio", "Médio", "un", "acamador-medio"),
      mkVar("ac-grande", "Grande", "un", "acamador-grande"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // PLATINADOS (WEG, WEG Similar, Kohlbach, Kohlbach Similar)
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "platinados-weg",
    title: "Platinados WEG",
    brand: "WEG",
    category: "Platinados",
    subcategory: "WEG (Original)",
    shortDescription: "Moderninho, 48, 56, Cortador de Grama, Rural.",
    images: [
      { src: "/produtos/platinado-56-1-haste-1-hp-weg-original.webp", alt: "Platinado 56 1 Haste 1 HP WEG (Original)" }
    ],
    variants: [
      mkVar("weg-56-1h-1hp-orig", "56 • 1 haste • 1 HP (Original)", "un", "platinado-56-1-haste-1-hp-weg-original"),
      mkVar("weg-56-2h-1hp-orig", "56 • 2 hastes • 1 HP (Original)", "un", "platinado-56-2-hastes-1hp-weg-original"),
      mkVar("weg-48-1h-3-4cv-orig", "48 • 1 haste • 3/4 CV (Original)", "un", "platinado-48-1-haste-3-4-cv-weg-original"),
      mkVar("weg-48-2h-3-4cv-orig", "48 • 2 hastes • 3/4 CV (Original)", "un", "platinado-48-2-hastes-3-4-cv-weg-original"),
      mkVar("weg-42-moderninho-10361410", "42 Moderninho • 10361410 (Original)", "un", "platinado-42-moderninho-weg-10361410"),
      mkVar("weg-cortador-1h-10017338", "Cortador de Grama • 1 haste • 10017338 (Original)", "un", "platinado-cortador-de-grama-1-haste-weg-10017338"),
      mkVar("weg-rural-5hp-10017200", "Rural • 5 HP • 10017200 (Original)", "un", "platinado-rural-5hp-weg-10017200"),
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinados-weg-similar",
    title: "Platinados WEG (Similar)",
    brand: "DSANTIS",
    category: "Platinados",
    subcategory: "WEG (Similar)",
    shortDescription: "Moderninho, 48, 56, Cortador de Grama, Rural.",
    images: [
      { src: "/produtos/platinado-56-1-haste-1-hp-weg-similar.webp", alt: "Platinado 56 1 Haste 1 HP WEG (Similar)" }
    ],
    variants: [
      mkVar("weg-56-1h-1hp-sim", "56 • 1 haste • 1 HP (Similar)", "un", "platinado-56-1-haste-1-hp-weg-similar"),
      mkVar("weg-56-2h-1hp-sim", "56 • 2 hastes • 1 HP (Similar)", "un", "platinado-56-2-hastes-1hp-weg-similar"),
      mkVar("weg-48-1h-3-4cv-sim", "48 • 1 haste • 3/4 CV (Similar)", "un", "platinado-48-1-haste-3-4-cv-weg-similar"),
      mkVar("weg-48-2h-3-4cv-sim", "48 • 2 hastes • 3/4 CV (Similar)", "un", "platinado-48-2-hastes-3-4-cv-weg-similar"),
      mkVar("weg-42-moderninho-sim", "42 Moderninho (Similar)", "un", "platinado-42-moderninho-weg-similar"),
      mkVar("weg-cortador-1h-sim", "Cortador de Grama • 1 haste (Similar)", "un", "platinado-cortador-de-grama-1-haste-weg-similar"),
      mkVar("weg-cortador-2h-sim", "Cortador de Grama • 2 hastes (Similar)", "un", "platinado-cortador-de-grama-2-hastes-weg-similar"),
      mkVar("weg-rural-5hp-sim", "Rural • 5 HP (Similar)", "un", "platinado-rural-weg-5hp-similar"),
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinados-kohlbach",
    title: "Platinados Kohlbach",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "Kohlbach (Original)",
    shortDescription: "Moderninho, Laranja e Antigo (várias capacidades).",
    images: [
      { src: "/produtos/platinado-moderninho-pequeno-1-cv-tipo-garfo-kohlbach.webp", alt: "Moderninho Pequeno 1 CV Tipo Garfo – Kohlbach" }
    ],
    variants: [
      mkVar("kb-moderninho-1c", "Moderninho Novo • 1 contato", "un", "platinado-moderninho-novo-1-contato-kohlbach"),
      mkVar("kb-moderninho-2c", "Moderninho Novo • 2 contatos", "un", "platinado-kohlbach-moderninho-novo-2-contatos"),
      mkVar("kb-peq-1cv-garfo", "Moderninho Pequeno • 1 CV • Tipo Garfo", "un", "platinado-moderninho-pequeno-1-cv-tipo-garfo-kohlbach"),
      mkVar("kb-gr-3cv-garfo", "Moderninho Grande • 3 CV • Tipo Garfo", "un", "platinado-moderninho-grande-3-cv-tipo-garfo-kohlbach"),
      mkVar("kb-laranja-1h", "Laranja • 1 haste", "un", "platinado-laranja-1-haste-kohlbach"),
      mkVar("kb-laranja-2h", "Laranja • 2 hastes", "un", "platinado-laranja-2-hastes-kohlbach"),
      mkVar("kb-antigo-peq-1-5cv", "Antigo • Pequeno • 1,5 CV", "un", "platinado-antigo-pequeno-1-5-cv-kohlbach"),
      mkVar("kb-antigo-gr-7-5cv", "Antigo • Grande • 7,5 CV", "un", "platinado-antigo-grande-7-5-cv-kohlbach"),
    ],
    techSpecs: null,
  },
  {
    id: "",
    slug: "platinados-kohlbach-similar",
    title: "Platinados Kohlbach (Similar)",
    brand: "KOHLBACH",
    category: "Platinados",
    subcategory: "Kohlbach (Similar)",
    shortDescription: "Versões compatíveis da linha Kohlbach.",
    images: [
      { src: "/produtos/platinado-moderninho-novo-2-contatos-kohlbach-similar.webp", alt: "Moderninho Novo 2 Contatos (Similar) – Kohlbach" }
    ],
    variants: [
      mkVar("kb-moderninho-1c-sim", "Moderninho Novo • 1 contato (Similar)", "un", "platinado-moderninho-novo-1-contato-kohlbach-similar"),
      mkVar("kb-moderninho-2c-sim", "Moderninho Novo • 2 contatos (Similar)", "un", "platinado-moderninho-novo-2-contatos-kohlbach-similar"),
    ],
    techSpecs: null,
  },

  // ---------------------------------------------------------------------------
  // VENTOINHAS WEG (SIMILAR)
  // ---------------------------------------------------------------------------
  {
    id: "",
    slug: "ventoinhas-weg-similar",
    title: "Ventoinhas WEG (Similar)",
    brand: "DSANTIS",
    category: "Componentes e Peças",
    subcategory: "Ventoinhas WEG (Similar)",
    shortDescription: "Carenagens paralelas 63 • 71 • 90.",
    images: [
      { src: "/produtos/ventoinha-weg-paralela-63-1.webp", alt: "Ventoinha WEG paralela 63 (Similar)" }
    ],
    variants: [
      mkVar("vent-63", "Paralela 63", "un", "ventoinha-weg-paralela-63"),
      mkVar("vent-71", "Paralela 71", "un", "ventoinha-weg-paralela-71"),
      mkVar("vent-90", "Paralela 90", "un", "ventoinha-weg-paralela-90"),
    ],
    techSpecs: null,
  },
]

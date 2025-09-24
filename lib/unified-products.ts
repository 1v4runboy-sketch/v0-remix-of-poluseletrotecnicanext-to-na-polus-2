// lib/unified-products.ts
// Catálogo unificado premium — Polus Eletrotécnica
//
// Estrutura compatível com seu Product + campos extras para unificação.
// "covers" define quais slugs INDIVIDUAIS serão ocultos quando os cards unificados estiverem ativos.
// "kind: 'unified'" é usado pelos componentes para reconhecer o card de coleção.
//
// Observação: as variações (variants) estão preenchidas com rótulos, unidade e, quando aplicável,
// imagens específicas por variação (para trocar foto ao selecionar).

import type { Product } from "./products";

export type UnifiedCoverRule =
  | string
  | {
      includes?: string; // começa com
      equals?: string;   // igual ao slug
    };

export type UnifiedProduct = Omit<Product, "id"> & {
  kind: "unified";
  covers: UnifiedCoverRule[];
};

const IMG = (src: string, alt = "") => ({ src, alt });

/* ===========================
   Conjuntos de variações úteis
   =========================== */
const AWG_SILICONE = ["02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];
const ESPAGUETE_MEDIDAS_MM = [
  "0,08 mm",
  "1,00 mm",
  "2,00 mm",
  "3,00 mm",
  "4,00 mm",
  "4,50 mm",
  "5,00 mm",
  "6,00 mm",
  "7,00 mm",
  "8,00 mm",
  "10,00 mm",
  "12,00 mm",
  "14,00 mm",
  "15,00 mm",
  "16,00 mm",
  "18,00 mm",
  "20,00 mm",
  "25,00 mm",
];

// µF dos permanentes (a partir da sua lista consolidada)
const UF_250V = [
  "02µF","03µF","04µF","05µF","06µF","07µF","08µF","10µF","12µF","15µF","18µF","20µF",
  "22µF","25µF","30µF","40µF","45µF","50µF","55µF","60µF","65µF","70µF","80µF","90µF","100µF",
];

const UF_380_400V = [
  "02µF","03µF","04µF","05µF","06µF","07µF","08µF","09µF","10µF","12µF","15µF","16µF","18µF",
  "20µF","25µF","30µF","35µF","40µF","45µF","50µF","55µF","60µF","65µF","70µF","80µF","90µF","100µF",
];

const UF_440_450V = [
  "02µF","03µF","04µF","05µF","06µF","07µF","08µF","09µF","10µF","12µF","15µF","16µF","18µF",
  "20µF","25µF","30µF","35µF","40µF","45µF","50µF","55µF","60µF","65µF","70µF","80µF","90µF","100µF",
];

// Par UFs dos ELETROLÍTICOS (extraídos do CSV que você enviou)
const UFS_ELETR_110V = [
  "124/149 µF","124/189 µF","161/193 µF","186/223 µF","189/227 µF",
  "216/259 µF","227/272 µF","259/311 µF","324/388 µF","378/454 µF",
  "430/516 µF","516/619 µF","602/722 µF","703/843 µF","860/1032 µF",
  "1080/1296 µF","1280/1540 µF",
];

const UFS_ELETR_220V = [
  "16/19 µF","16/24 µF","20/24 µF","24/29 µF","24/36 µF",
  "30/36 µF","36/43 µF","43/52 µF","54/65 µF","63/76 µF",
  "71/86 µF","86/103 µF","100/120 µF","117/141 µF","143/171 µF",
  "180/216 µF","213/255 µF","256/308 µF","324/387 µF","430/516 µF",
];

const UFS_ELETR_MINI = [
  "60/72 µF","70/84 µF","80/96 µF","100/120 µF","120/144 µF","120/156 µF",
];

/* ===========================
   UNIFIED_PRODUCTS
   =========================== */

export const UNIFIED_PRODUCTS: UnifiedProduct[] = [
  /* CABOS */
  {
    kind: "unified",
    slug: "cabos-de-silicone-tramar",
    title: "Cabos de Silicone 200°C (Tramar)",
    brand: "Tramar",
    category: "Cabos Elétricos",
    subcategory: "Cabos de Silicone",
    shortDescription: "Cabos de silicone 200°C • 600V • AWG 02 a 22.",
    images: [
      IMG("/produtos/cabo-silicone-10awg-200c-600v-1.webp", "Cabo Silicone 10 AWG"),
      IMG("/produtos/cabo-silicone-10awg-200c-600v-2.webp", "Cabo Silicone 10 AWG"),
    ],
    variants: AWG_SILICONE.map((aw) => ({
      id: `silicone-awg-${aw}`,
      label: `AWG ${aw}`,
      unit: "m",
      attrs: { awg: aw, temp: "200°C", tensao: "600V" },
      // quando houver imagem por AWG, mostre-a:
      // (existem 3 imagens por AWG no seu /public/produtos)
      // usamos pelo menos a 1ª se existir
      ...(Number(aw) >= 2 && Number(aw) <= 22
        ? {
            images: [
              IMG(`/produtos/cabo-silicone-${aw}awg-200c-600v-1.webp`, `Cabo Silicone ${aw} AWG`),
            ],
          }
        : {}),
    })),
    techSpecs: null,
    covers: [{ includes: "cabo-silicone-" }],
  },
  {
    kind: "unified",
    slug: "cabos-lides-cofibam",
    title: "Cabos Lides 130°C (Cofibam)",
    brand: "Cofibam",
    category: "Cabos Elétricos",
    subcategory: "Cabos Lides",
    shortDescription: "Cabos Lides 130°C • 600V • AWG 02 a 22.",
    images: [
      IMG("/produtos/cabo-lides-10awg-130c-600v-1.webp", "Cabo Lides 10 AWG"),
      IMG("/produtos/cabo-lides-10awg-130c-600v-2.webp", "Cabo Lides 10 AWG"),
    ],
    variants: AWG_SILICONE.map((aw) => ({
      id: `lides-awg-${aw}`,
      label: `AWG ${aw}`,
      unit: "m",
      attrs: { awg: aw, temp: "130°C", tensao: "600V" },
      images: [IMG(`/produtos/cabo-lides-${aw}awg-130c-600v-1.webp`, `Cabo Lides ${aw} AWG`)],
    })),
    techSpecs: null,
    covers: [{ includes: "cabo-lides-" }],
  },

  /* ESPAGUETES */
  {
    kind: "unified",
    slug: "espaguete-flexnor-130c",
    title: "Espaguete Flexnor 130°C (Cofibam)",
    brand: "Cofibam",
    category: "Isolantes",
    subcategory: "Espaguete Flexnor 130°C",
    shortDescription: "Espaguete têxtil isolante 130°C • variações de diâmetro.",
    images: [
      IMG("/produtos/espaguete-flexnor-130c-2-00mm-1.webp", "Espaguete Flexnor 2,00 mm"),
      IMG("/produtos/espaguete-flexnor-130c-2-00mm-2.webp", "Espaguete Flexnor 2,00 mm"),
    ],
    variants: ESPAGUETE_MEDIDAS_MM.map((mm) => {
      // ajustar o padrão de arquivo: vírgula -> ponto, e mm -> -mm, com zeros já no nome
      const canonical = mm.replace(",", "-").replace(".","-").replace(" ", "").replace("mm", "mm");
      const file = canonical; // já vem no formato x-xxmm
      return {
        id: `flexnor-130-${file}`,
        label: mm,
        unit: "m",
        attrs: { diametro: mm, classe: "130°C" },
        images: [
          IMG(`/produtos/espaguete-flexnor-130c-${file}-1.webp`, `Espaguete 130°C ${mm}`),
        ],
      };
    }),
    techSpecs: null,
    covers: [{ includes: "espaguete-flexnor-130c-" }],
  },
  {
    kind: "unified",
    slug: "espaguete-silicone-200c",
    title: "Espaguete Silicone 200°C (Tramar)",
    brand: "Tramar",
    category: "Isolantes",
    subcategory: "Espaguete Silicone 200°C",
    shortDescription: "Espaguete silicone 200°C • variações de diâmetro.",
    images: [
      IMG("/produtos/espaguete-silicone-200c-2-00mm-1.webp", "Espaguete Silicone 2,00 mm"),
      IMG("/produtos/espaguete-silicone-200c-2-00mm-2.webp", "Espaguete Silicone 2,00 mm"),
    ],
    variants: ESPAGUETE_MEDIDAS_MM.map((mm) => {
      const canonical = mm.replace(",", "-").replace(".","-").replace(" ", "").replace("mm", "mm");
      return {
        id: `esp-silicone-200-${canonical}`,
        label: mm,
        unit: "m",
        attrs: { diametro: mm, classe: "200°C" },
        images: [
          IMG(`/produtos/espaguete-silicone-200c-${canonical}-1.webp`, `Espaguete 200°C ${mm}`),
        ],
      };
    }),
    techSpecs: null,
    covers: [{ includes: "espaguete-silicone-200c-" }],
  },
  {
    kind: "unified",
    slug: "espaguete-flexpoli-155c",
    title: "Espaguete 155°C (Cofibam)",
    brand: "Cofibam",
    category: "Isolantes",
    subcategory: "Espaguete 155°C",
    shortDescription: "Espaguete 155°C • variações de diâmetro.",
    images: [
      IMG("/produtos/espaguetes-flexpoli-155-1.webp", "Espaguete 155°C"),
      IMG("/produtos/espaguetes-flexpoli-155-2.webp", "Espaguete 155°C"),
    ],
    variants: ESPAGUETE_MEDIDAS_MM.map((mm) => ({
      id: `esp-155-${mm.replace(",", ".")}`,
      label: mm,
      unit: "m",
      attrs: { diametro: mm, classe: "155°C" },
      // (imagens genéricas – se você subir por diâmetro depois, o componente já troca)
    })),
    techSpecs: null,
    // (sem covers porque não há itens individuais 155°C no seu lib/products)
    covers: [],
  },
  {
    kind: "unified",
    slug: "espaguete-fibra-de-vidro",
    title: "Espaguete Fibra de Vidro (Tramar)",
    brand: "Tramar",
    category: "Isolantes",
    subcategory: "Espaguete Fibra de Vidro",
    shortDescription: "Espaguete em fibra de vidro • alta resistência térmica.",
    images: [
      IMG("/produtos/espaguete-fiberglass-1.webp", "Espaguete Fibra de Vidro"),
      IMG("/produtos/espaguete-fiberglass-2.webp", "Espaguete Fibra de Vidro"),
    ],
    variants: ESPAGUETE_MEDIDAS_MM.map((mm) => ({
      id: `esp-fiberglass-${mm.replace(",", ".")}`,
      label: mm,
      unit: "m",
      attrs: { diametro: mm },
    })),
    techSpecs: null,
    covers: [],
  },

  /* CADARÇOS (frações) */
  {
    kind: "unified",
    slug: "cadarcos-laranja",
    title: "Cadarços Laranja",
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "Cadarços laranja • 1/2\", 3/4\", 5/8\" e 1\".",
    images: [
      IMG("/produtos/cadarco-laranja-1-2-1.webp", 'Cadarço Laranja 1/2"'),
      IMG("/produtos/cadarco-laranja-1-2-2.webp", 'Cadarço Laranja 1/2"'),
    ],
    variants: [
      { id: "laranja-1-2", label: '1/2"', unit: "m", images: [IMG("/produtos/cadarco-laranja-1-2-1.webp")] },
      { id: "laranja-3-4", label: '3/4"', unit: "m", images: [IMG("/produtos/cadarco-laranja-3-4-1.webp")] },
      { id: "laranja-5-8", label: '5/8"', unit: "m", images: [IMG("/produtos/cadarco-laranja-5-8-1.webp")] },
      { id: "laranja-1",   label: '1"',    unit: "m", images: [IMG("/produtos/cadarco-laranja-1-1.webp")] },
    ],
    techSpecs: null,
    covers: [
      { includes: "cadarco-laranja-" },
    ],
  },
  {
    kind: "unified",
    slug: "cadarcos-algodao",
    title: "Cadarços de Algodão",
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "Cadarços de algodão • 1/2\", 3/4\", 5/8\" e 1\".",
    images: [
      IMG("/produtos/cadarco-algodao-1-2.webp", 'Cadarço de Algodão 1/2"'),
    ],
    variants: [
      { id: "algodao-1-2", label: '1/2"', unit: "m", images: [IMG("/produtos/cadarco-algodao-1-2.webp")] },
      { id: "algodao-3-4", label: '3/4"', unit: "m", images: [IMG("/produtos/cadarco-algodao-3-4.webp")] },
      { id: "algodao-5-8", label: '5/8"', unit: "m", images: [IMG("/produtos/cadarco-algodao-5-8.webp")] },
      { id: "algodao-1",   label: '1"',    unit: "m", images: [IMG("/produtos/cadarco-algodao-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "cadarco-algodao-" }],
  },
  {
    kind: "unified",
    slug: "cadarcos-fibra-de-vidro",
    title: "Cadarços de Fibra de Vidro",
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "Cadarços de fibra de vidro • 1/2\", 3/4\", 5/8\" e 1\".",
    images: [
      IMG("/produtos/cadarco-fibra-de-vidro-1-2-1.webp", 'Cadarço Fibra de Vidro 1/2"'),
    ],
    variants: [
      { id: "fibra-1-2", label: '1/2"', unit: "m", images: [IMG("/produtos/cadarco-fibra-de-vidro-1-2-1.webp")] },
      { id: "fibra-3-4", label: '3/4"', unit: "m", images: [IMG("/produtos/cadarco-fibra-de-vidro-3-4-1.webp")] },
      { id: "fibra-5-8", label: '5/8"', unit: "m", images: [IMG("/produtos/cadarco-fibra-de-vidro-5-8-1.webp")] },
      { id: "fibra-1",   label: '1"',    unit: "m", images: [IMG("/produtos/cadarco-fibra-de-vidro-1-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "cadarco-fibra-de-vidro-" }],
  },
  {
    kind: "unified",
    slug: "cadarcos-poliester",
    title: "Cadarços de Poliéster",
    brand: "Sem marca",
    category: "Cadarços",
    subcategory: "",
    shortDescription: "Cadarços de poliéster • 1/2\", 3/4\", 5/8\" e 1\".",
    images: [
      IMG("/produtos/cadarco-poliester-1-2-1.webp", 'Cadarço Poliéster 1/2"'),
    ],
    variants: [
      { id: "poli-1-2", label: '1/2"', unit: "m", images: [IMG("/produtos/cadarco-poliester-1-2-1.webp")] },
      { id: "poli-3-4", label: '3/4"', unit: "m", images: [IMG("/produtos/cadarco-poliester-3-4-1.webp")] },
      { id: "poli-5-8", label: '5/8"', unit: "m", images: [IMG("/produtos/cadarco-poliester-5-8-1.webp")] },
      { id: "poli-1",   label: '1"',    unit: "m", images: [IMG("/produtos/cadarco-poliester-1-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "cadarco-poliester-" }],
  },

  /* FITA LINEAR */
  {
    kind: "unified",
    slug: "fitas-lineares",
    title: "Fitas Lineares",
    brand: "Sem marca",
    category: "Fitas Lineares",
    subcategory: "",
    shortDescription: "Fitas lineares em diferentes larguras.",
    images: [
      IMG("/produtos/fita-linear-12mm-1.webp", "Fita Linear"),
      IMG("/produtos/fita-linear-12mm-2.webp", "Fita Linear"),
    ],
    variants: [
      { id: "fita-6mm",  label: "6 mm",  unit: "m", images: [IMG("/produtos/fita-linear-6mm-1.webp")] },
      { id: "fita-12mm", label: "12 mm", unit: "m", images: [IMG("/produtos/fita-linear-12mm-1.webp")] },
      { id: "fita-19mm", label: "19 mm", unit: "m", images: [IMG("/produtos/fita-linear-19mm-1.webp")] },
      { id: "fita-25mm", label: "25 mm", unit: "m", images: [IMG("/produtos/fita-linear-25mm-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "fita-linear-" }],
  },

  /* ACAMADORES */
  {
    kind: "unified",
    slug: "acamadores",
    title: "Acamadores",
    brand: "Sem marca",
    category: "Acamadores",
    subcategory: "",
    shortDescription: "Acamadores em tamanhos: Micro, Pequeno, Médio e Grande.",
    images: [
      IMG("/produtos/acamador-medio.webp", "Acamador Médio"),
      IMG("/produtos/acamador-grande.webp", "Acamador Grande"),
    ],
    variants: [
      { id: "acamador-micro",   label: "Micro",   unit: "un", images: [IMG("/produtos/acamador-micro.webp")] },
      { id: "acamador-pequeno", label: "Pequeno", unit: "un", images: [IMG("/produtos/acamador-pequeno.webp")] },
      { id: "acamador-medio",   label: "Médio",   unit: "un", images: [IMG("/produtos/acamador-medio.webp")] },
      { id: "acamador-grande",  label: "Grande",  unit: "un", images: [IMG("/produtos/acamador-grande.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "acamador-" }],
  },

  /* CAIXAS DE LIGAÇÃO WEG */
  {
    kind: "unified",
    slug: "caixas-de-ligacao-weg",
    title: "Caixas de Ligação WEG",
    brand: "WEG",
    category: "Caixas de Ligação",
    subcategory: "",
    shortDescription: "Modelos: 63/71/80 · 90/100 · 112/132 · 160/180 · 200.",
    images: [
      IMG("/produtos/caixa-de-ligacao-weg-90-100.webp", "Caixa de Ligação WEG"),
      IMG("/produtos/caixa-de-ligacao-weg-112-132.webp", "Caixa de Ligação WEG"),
    ],
    variants: [
      { id: "cx-63-71-80",  label: "63 / 71 / 80",   unit: "un", images: [IMG("/produtos/caixa-de-ligacao-weg-63-71-80.webp")] },
      { id: "cx-90-100",    label: "90 / 100",       unit: "un", images: [IMG("/produtos/caixa-de-ligacao-weg-90-100.webp")] },
      { id: "cx-112-132",   label: "112 / 132",      unit: "un", images: [IMG("/produtos/caixa-de-ligacao-weg-112-132.webp")] },
      { id: "cx-160-180",   label: "160 / 180",      unit: "un", images: [IMG("/produtos/caixa-de-ligacao-weg-160-180-1.webp")] },
      { id: "cx-200",       label: "200",            unit: "un", images: [IMG("/produtos/caixa-de-ligacao-weg-200-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "caixa-de-ligacao-weg-" }],
  },

  /* BASES DE MOTOR WEG */
  {
    kind: "unified",
    slug: "bases-de-motor-weg",
    title: "Bases para Motores WEG",
    brand: "WEG",
    category: "Bases de Motor WEG",
    subcategory: "",
    shortDescription: "WEG 42W (Pequena) · 48W (Média) · 56W (Grande) · 56 (Extra Grande).",
    images: [
      IMG("/produtos/base-motor-weg-48w-media.webp", "Base de Motor WEG"),
      IMG("/produtos/base-motor-weg-56w-grande.webp", "Base de Motor WEG"),
    ],
    variants: [
      { id: "base-42w-peq",   label: "WEG 42W (Pequena)",     unit: "un", images: [IMG("/produtos/base-motor-weg-42w-pequena.webp")] },
      { id: "base-48w-med",   label: "WEG 48W (Média)",       unit: "un", images: [IMG("/produtos/base-motor-weg-48w-media.webp")] },
      { id: "base-56w-gra",   label: "WEG 56W (Grande)",      unit: "un", images: [IMG("/produtos/base-motor-weg-56w-grande.webp")] },
      { id: "base-56-extra",  label: "WEG 56 (Extra Grande)", unit: "un", images: [IMG("/produtos/base-weg-56-extra-grande.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "base-motor-weg-" }, { equals: "base-weg-56-extra-grande" }],
  },

  /* PLACAS DE BORNE WEG */
  {
    kind: "unified",
    slug: "placas-de-borne-weg",
    title: "Placas de Borne WEG",
    brand: "WEG",
    category: "Componentes e Peças",
    subcategory: "Placas de Borne",
    shortDescription: "Modelos K1M4 · K1M5 · K1M6 · K1M8 · K1M10 · K1M12 · K1M16.",
    images: [
      IMG("/produtos/placa-borne-weg-k1m6-1.webp", "Placa de Borne WEG"),
      IMG("/produtos/placa-borne-weg-k1m8-1.webp", "Placa de Borne WEG"),
    ],
    variants: [
      { id: "k1m4",  label: "K1M4",  unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m4-1.webp")] },
      { id: "k1m5",  label: "K1M5",  unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m5-1.webp")] },
      { id: "k1m6",  label: "K1M6",  unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m6-1.webp")] },
      { id: "k1m8",  label: "K1M8",  unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m8-1.webp")] },
      { id: "k1m10", label: "K1M10", unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m10-1.webp")] },
      { id: "k1m12", label: "K1M12", unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m12-1.webp")] },
      { id: "k1m16", label: "K1M16", unit: "un", images: [IMG("/produtos/placa-borne-weg-k1m16-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "placa-borne-weg-" }],
  },

  /* PROTETORES TÉRMICOS WEG */
  {
    kind: "unified",
    slug: "protetores-termicos-weg",
    title: "Protetores Térmicos WEG",
    brand: "WEG",
    category: "Proteção e Segurança",
    subcategory: "Protetores Térmicos",
    shortDescription: "Temperaturas: 130°C · 155°C · 180°C.",
    images: [
      IMG("/produtos/protetor-termico-weg-155c-1.webp", "Protetor Térmico WEG"),
      IMG("/produtos/protetor-termico-weg-180c-1.webp", "Protetor Térmico WEG"),
    ],
    variants: [
      { id: "pt-130", label: "130°C", unit: "un", images: [IMG("/produtos/protetor-termico-weg-130c-1.webp")] },
      { id: "pt-155", label: "155°C", unit: "un", images: [IMG("/produtos/protetor-termico-weg-155c-1.webp")] },
      { id: "pt-180", label: "180°C", unit: "un", images: [IMG("/produtos/protetor-termico-weg-180c-1.webp")] },
    ],
    techSpecs: null,
    covers: [{ includes: "protetor-termico-weg-" }],
  },

  /* CAPACITORES PERMANENTES */
  {
    kind: "unified",
    slug: "capacitores-permanentes-250v",
    title: "Capacitores Permanentes 250V (JL)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Permanentes 250VAC",
    shortDescription: "Capacitores permanentes 250V com ampla gama de µF.",
    images: [
      IMG("/produtos/capacitor-permanente-250v-02uf-1.webp", "Capacitores 250V"),
      IMG("/produtos/capacitor-permanente-250v-10uf-2.webp", "Capacitores 250V"),
    ],
    variants: UF_250V.map((uf) => ({
      id: `perm-250-${uf}`,
      label: uf,
      unit: "un",
      attrs: { uf, tensao: "250V" },
    })),
    techSpecs: null,
    covers: [{ includes: "capacitor-permanente-250v-" }],
  },
  {
    kind: "unified",
    slug: "capacitores-permanentes-380-400v",
    title: "Capacitores Permanentes 380/400V (JL)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Permanentes 380/400VAC",
    shortDescription: "Capacitores permanentes 380/400V com ampla gama de µF.",
    images: [
      IMG("/produtos/capacitor-permanente-380-400vac-02uf-2.webp", "Capacitores 380/400V"),
      IMG("/produtos/capacitor-permanente-380-400vac-10uf-1.webp", "Capacitores 380/400V"),
    ],
    variants: UF_380_400V.map((uf) => ({
      id: `perm-400-${uf}`,
      label: uf,
      unit: "un",
      attrs: { uf, tensao: "380/400V" },
    })),
    techSpecs: null,
    covers: [{ includes: "capacitor-permanente-380-400vac-" }],
  },
  {
    kind: "unified",
    slug: "capacitores-permanentes-440-450v",
    title: "Capacitores Permanentes 440/450V (JL)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Permanentes 440/450VAC",
    shortDescription: "Capacitores permanentes 440/450V com ampla gama de µF.",
    images: [
      IMG("/produtos/capacitor-permanente-440-450vac-02uf-1.webp", "Capacitores 440/450V"),
      IMG("/produtos/capacitor-permanente-440-450vac-10uf-2.webp", "Capacitores 440/450V"),
    ],
    variants: UF_440_450V.map((uf) => ({
      id: `perm-450-${uf}`,
      label: uf,
      unit: "un",
      attrs: { uf, tensao: "440/450V" },
    })),
    techSpecs: null,
    covers: [{ includes: "capacitor-permanente-440-450vac-" }],
  },

  /* CAPACITORES ELETROLÍTICOS – PARTIDA */
  {
    kind: "unified",
    slug: "capacitores-eletroliticos-110v",
    title: "Capacitores Eletrolíticos 110V (JL)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Eletrolíticos 110V",
    shortDescription: "Capacitores de partida 110V (dupla capacitância).",
    images: [
      IMG("/produtos/capacitor-eletrolitico-eletrolitico-110v-1.webp", "Eletrolítico 110V"),
      IMG("/produtos/capacitor-eletrolitico-eletrolitico-110v-2.webp", "Eletrolítico 110V"),
    ],
    variants: UFS_ELETR_110V.map((pair) => ({
      id: `eletr-110-${pair.replace(/[^\d]/g, "")}`,
      label: pair,
      unit: "un",
      attrs: { uf: pair, tensao: "110V" },
    })),
    techSpecs: null,
    covers: [], // (não havia no seu lib/products; apenas unificado)
  },
  {
    kind: "unified",
    slug: "capacitores-eletroliticos-220v",
    title: "Capacitores Eletrolíticos 220V (JL)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Eletrolíticos 220V",
    shortDescription: "Capacitores de partida 220V (dupla capacitância).",
    images: [
      IMG("/produtos/capacitor-eletrolitico-eletrolitico-220v-1.webp", "Eletrolítico 220V"),
      IMG("/produtos/capacitor-eletrolitico-eletrolitico-220v-2.webp", "Eletrolítico 220V"),
    ],
    variants: UFS_ELETR_220V.map((pair) => ({
      id: `eletr-220-${pair.replace(/[^\d]/g, "")}`,
      label: pair,
      unit: "un",
      attrs: { uf: pair, tensao: "220V" },
    })),
    techSpecs: null,
    covers: [],
  },
  {
    kind: "unified",
    slug: "capacitores-eletroliticos-mini",
    title: "Capacitores Eletrolíticos MINI (JL)",
    brand: "JL Capacitores",
    category: "Capacitores",
    subcategory: "Eletrolíticos MINI",
    shortDescription: "Linha MINI – partida compacta (dupla capacitância).",
    images: [
      IMG("/produtos/capacitor-mini-1.webp", "Eletrolítico MINI"),
      IMG("/produtos/capacitor-mini-2.webp", "Eletrolítico MINI"),
    ],
    variants: UFS_ELETR_MINI.map((pair) => ({
      id: `eletr-mini-${pair.replace(/[^\d]/g, "")}`,
      label: pair,
      unit: "un",
      attrs: { uf: pair },
    })),
    techSpecs: null,
    covers: [],
  },

  /* ROLAMENTOS (4 agrupamentos) */
  {
    kind: "unified",
    slug: "rolamentos-nsk-skf-ddu",
    title: "Rolamentos NSK/SKF DDU",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Vedação DDU",
    shortDescription: "Séries 600/6000 – Vedação DDU (borracha).",
    images: [
      IMG("/produtos/rolamentos-nsk-ddu-1.webp", "Rolamentos DDU"),
      IMG("/produtos/rolamentos-nsk-ddu-2.webp", "Rolamentos DDU"),
    ],
    variants: [
      "605","606","607","608","609","6000","6001","6002","6003","6004","6005","6006","6007","6008","6009",
    ].map((code) => ({
      id: `nskddu-${code}`,
      label: code,
      unit: "un",
      attrs: { serie: code, vedacao: "DDU" },
    })),
    techSpecs: null,
    covers: [], // os itens individuais têm slugs "rolamento-..." (ver último agrupamento remove todos)
  },
  {
    kind: "unified",
    slug: "rolamentos-nsk-skf-zz",
    title: "Rolamentos NSK/SKF ZZ",
    brand: "NSK",
    category: "Rolamentos",
    subcategory: "Vedação ZZ",
    shortDescription: "Séries 600/6000 – Vedação ZZ (blindagem metálica).",
    images: [
      IMG("/produtos/rolamentos-nsk-zz-1.webp", "Rolamentos ZZ"),
      IMG("/produtos/rolamentos-nsk-zz-2.webp", "Rolamentos ZZ"),
    ],
    variants: [
      "605","606","607","608","609","6000","6001","6002","6003","6004","6005","6006","6007","6008","6009",
    ].map((code) => ({
      id: `nskzz-${code}`,
      label: code,
      unit: "un",
      attrs: { serie: code, vedacao: "ZZ" },
    })),
    techSpecs: null,
    covers: [],
  },
  {
    kind: "unified",
    slug: "rolamentos-hch-ddu",
    title: "Rolamentos HCH DDU",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Vedação DDU",
    shortDescription: "Séries 600/6000 – Vedação DDU (borracha).",
    images: [
      IMG("/produtos/rolamentos-hch-ddu-1.webp", "Rolamentos HCH DDU"),
      IMG("/produtos/rolamentos-hch-ddu-2.webp", "Rolamentos HCH DDU"),
    ],
    variants: [
      "605","606","607","608","609","6000","6001","6002","6003","6004","6005","6006","6007","6008","6009",
    ].map((code) => ({
      id: `hchddu-${code}`,
      label: code,
      unit: "un",
      attrs: { serie: code, vedacao: "DDU" },
    })),
    techSpecs: null,
    covers: [],
  },
  {
    kind: "unified",
    slug: "rolamentos-hch-zz",
    title: "Rolamentos HCH ZZ",
    brand: "HCH",
    category: "Rolamentos",
    subcategory: "Vedação ZZ",
    shortDescription: "Séries 600/6000 – Vedação ZZ (blindagem metálica).",
    images: [
      IMG("/produtos/rolamentos-hch-zz-1.webp", "Rolamentos HCH ZZ"),
      IMG("/produtos/rolamentos-hch-zz-2.webp", "Rolamentos HCH ZZ"),
    ],
    variants: [
      "605","606","607","608","609","6000","6001","6002","6003","6004","6005","6006","6007","6008","6009",
    ].map((code) => ({
      id: `hchzz-${code}`,
      label: code,
      unit: "un",
      attrs: { serie: code, vedacao: "ZZ" },
    })),
    techSpecs: null,
    // esta regra oculta TODOS os "rolamento-*" individuais do lib/products
    covers: [{ includes: "rolamento-" }],
  },

  /* TINTAS WEG – AZUL (5002/5007/5009) */
  {
    kind: "unified",
    slug: "tintas-weg-azul",
    title: "Tintas WEG – Azul (3,6L)",
    brand: "WEG",
    category: "Tintas e Vernizes",
    subcategory: "Tintas WEG",
    shortDescription: "Variações de azul: 5002 · 5007 · 5009.",
    images: [
      IMG("/produtos/tinta-weg-azul-5007-3-6l-1.webp", "Tinta Azul 5007"),
      IMG("/produtos/tinta-weg-azul-5007-3-6l-2.webp", "Tinta Azul 5007"),
    ],
    variants: [
      { id: "azul-5002", label: "Azul 5002", unit: "un", images: [IMG("/produtos/tinta-weg-azul-5002-3-6l-1.webp")] },
      { id: "azul-5007", label: "Azul 5007", unit: "un", images: [IMG("/produtos/tinta-weg-azul-5007-3-6l-1.webp")] },
      { id: "azul-5009", label: "Azul 5009", unit: "un", images: [IMG("/produtos/tinta-weg-azul-5009-3-6l-1.webp")] },
    ],
    techSpecs: null,
    covers: [
      { equals: "tinta-weg-azul-5002-3-6l" },
      { equals: "tinta-weg-azul-5007-3-6l" },
      { equals: "tinta-weg-azul-5009-3-6l" },
    ],
  },

  /* VERNIZES WEG – 5L (1303, 1333, 1314) */
  {
    kind: "unified",
    slug: "vernizes-weg-5l",
    title: "Vernizes WEG (5L)",
    brand: "WEG",
    category: "Tintas e Vernizes",
    subcategory: "Vernizes e Diluentes",
    shortDescription: "Códigos: 1303 · 1333 · 1314 (Secagem Estufa).",
    images: [
      IMG("/produtos/verniz-weg-1303-5l-1.webp", "Verniz 1303 – 5L"),
      IMG("/produtos/verniz-weg-1333-5l-1.webp", "Verniz 1333 – 5L"),
    ],
    variants: [
      { id: "verniz-1303-5l", label: "Verniz 1303 (5L)", unit: "un", images: [IMG("/produtos/verniz-weg-1303-5l-1.webp")] },
      { id: "verniz-1333-5l", label: "Verniz 1333 (5L)", unit: "un", images: [IMG("/produtos/verniz-weg-1333-5l-1.webp")] },
      { id: "verniz-1314-5l", label: "Verniz 1314 Secagem Estufa (5L)", unit: "un", images: [IMG("/produtos/verniz-weg-1314-5l-secagem-estufa-1.webp")] },
    ],
    techSpecs: null,
    covers: [
      { equals: "verniz-weg-1303-5l" },
      { equals: "verniz-weg-1333-5l" },
      { equals: "verniz-weg-1314-5l-secagem-estufa" },
    ],
  },

  /* FIOS ESMALTADOS */
  {
    kind: "unified",
    slug: "fio-esmaltado-de-cobre",
    title: "Fio Esmaltado de Cobre",
    brand: "Condupasqua",
    category: "Fios e Cabos",
    subcategory: "Fios Esmaltados",
    shortDescription: "Gamas típicas de AWG (ex.: 04–33 AWG).",
    images: [
      IMG("/produtos/fio-de-cobre-esmaltado-04-33-awg-1.webp", "Fio de Cobre Esmaltado"),
    ],
    // O seu lib/products tem 04–33 AWG; caso queira listar um a um, basta expandir
    variants: Array.from({ length: 33 - 4 + 1 }, (_, i) => 4 + i).map((awg) => ({
      id: `cobre-awg-${String(awg).padStart(2, "0")}`,
      label: `AWG ${awg}`,
      unit: "kg",
    })),
    techSpecs: null,
    covers: [{ includes: "fio-de-cobre-esmaltado" }],
  },
  {
    kind: "unified",
    slug: "fio-esmaltado-de-aluminio",
    title: "Fio Esmaltado de Alumínio",
    brand: "São Marco",
    category: "Fios e Cabos",
    subcategory: "Fios Esmaltados",
    shortDescription: "Gamas típicas de AWG (ex.: 04–25 AWG).",
    images: [
      // ✅ Corrigido conforme você pediu:
      IMG("/produtos/fio-aluminio-esmaltado-04-25-awg-1.webp", "Fio de Alumínio Esmaltado"),
      IMG("/produtos/fio-aluminio-esmaltado-04-25-awg-2.webp", "Fio de Alumínio Esmaltado"),
    ],
    variants: Array.from({ length: 25 - 4 + 1 }, (_, i) => 4 + i).map((awg) => ({
      id: `aluminio-awg-${String(awg).padStart(2, "0")}`,
      label: `AWG ${awg}`,
      unit: "kg",
    })),
    techSpecs: null,
    covers: [{ includes: "fio-aluminio-esmaltado" }],
  },
];

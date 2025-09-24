// /lib/brands.ts
export const BRAND_LOGOS: Record<string, string> = {
  // Cabos & Espaguetes
  TRAMAR: "/marcas/tramar.webp",
  COFIBAM: "/marcas/cofibam.webp",

  // Capacitores
  "JL CAPACITORES": "/marcas/jl-capacitores.webp",

  // Fios
  CONDUPASQUA: "/marcas/condupasqua-logo.svg",
  "SÃO MARCO": "/marcas/logotipo-sao-marco.webp",

  // WEG e paralelos
  WEG: "/marcas/weg.webp",
  DSANTIS: "/marcas/dsantis-logo.webp",

  // Platinados Kohlbach
  KOHLBACH: "/marcas/kohlbach.webp",

  // Resinas Calas
  "LANC COMERCIAL": "/marcas/lanc-comercial.webp",

  // Jacuzzi / Dancor / IGUI
  JACUZZI: "/marcas/jacuzzi.webp",
  DANCOR: "/marcas/dancor.webp",
  IGUI: "/marcas/igui.webp",

  // Acessórios
  CIFA: "/marcas/cifa.webp",
  COBIX: "/marcas/cobix.webp",

  // Rolamentos
  NSK: "/marcas/nsk-logo.webp",
  HCH: "/marcas/hch-logo.webp",
};

export function guessBrandLogo(brand?: string | null) {
  if (!brand) return null;
  const key = brand.trim().toUpperCase();
  return BRAND_LOGOS[key] || null;
}

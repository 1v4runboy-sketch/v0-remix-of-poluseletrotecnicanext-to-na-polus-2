// lib/brand-logos.ts
export function brandLogoFor(item: any): { src: string; alt: string } | null {
  // Em alguns pontos recebemos "grupo unificado" (com title/slug próprios)
  // e em outros um "produto simples". Vamos decidir pela regra mais forte.
  const title = (item?.title || item?.name || '').toLowerCase();
  const slug = (item?.slug || '').toLowerCase();
  const brand = (item?.brand || '').toLowerCase();
  const category = (item?.category || '').toLowerCase();
  const subcategory = (item?.subcategory || '').toLowerCase();

  // Caminhos oficiais enviados por você:
  const logos = {
    weg: { src: '/marcas/weg.webp', alt: 'WEG' },
    dsantis: { src: '/marcas/dsantis-logo.webp', alt: 'DSantis' },
    jlcap: { src: '/marcas/jl-capacitores.webp', alt: 'JL Capacitores' },
    cofibam: { src: '/marcas/cofibam.webp', alt: 'Cofibam' },
    tramar: { src: '/marcas/tramar.webp', alt: 'Tramar' },
    condupasqua: { src: '/marcas/condupasqua-logo.svg', alt: 'Condupasqua' },
    saomarco: { src: '/marcas/logotipo-sao-marco.webp', alt: 'São Marco' },
    nsk: { src: '/marcas/nsk-logo.webp', alt: 'NSK' },
    hch: { src: '/marcas/hch-logo.webp', alt: 'HCH' },
    kohlbach: { src: '/marcas/kohlbach.webp', alt: 'Kohlbach' },
    lanc: { src: '/marcas/lanc-comercial.webp', alt: 'LANC Comercial' },
    jacuzzi: { src: '/marcas/jacuzzi.webp', alt: 'Jacuzzi' },
    cifa: { src: '/marcas/cifa.webp', alt: 'Cifa' },
    cobix: { src: '/marcas/cobix.webp', alt: 'Cobix' },
    igui: { src: '/marcas/igui.webp', alt: 'IGUI' },
    dancor: { src: '/marcas/dancor.webp', alt: 'Dancor' },
  };

  // Regras específicas (as mais fortes primeiro):
  // 1) Platinados WEG: "Original" = WEG; "Similar" = DSantis
  if (category.includes('platinado') || title.includes('platinado')) {
    if (title.includes('original')) return logos.weg;
    if (title.includes('similar')) return logos.dsantis;
    if (slug.includes('weg')) return logos.weg;
    if (slug.includes('kohlbach')) return logos.kohlbach;
  }

  // 2) Itens WEG (caixas de ligação, protetores térmicos, bases, tintas, placas de borne)
  if (
    slug.includes('weg') ||
    title.includes('weg') ||
    category.includes('bases de motor weg') ||
    subcategory.includes('placas de borne') ||
    subcategory.includes('tintas weg') ||
    subcategory.includes('protetores térmicos')
  ) return logos.weg;

  // 3) Capacitores (JL)
  if (category.includes('capacitor') || slug.startsWith('capacitor-')) return logos.jlcap;

  // 4) Cabos / Espaguetes
  if (subcategory.includes('espaguete silicone') || title.includes('silicone 200')) return logos.tramar;
  if (subcategory.includes('espaguete flexnor') || title.includes('flexnor 130')) return logos.cofibam;
  if (title.includes('espaguete 155') || slug.includes('espaguete-155') || title.includes('flexpoli')) return logos.cofibam;
  if (title.includes('fibra de vidro') || slug.includes('fiberglass')) return logos.tramar;

  if (category.includes('cabos elétricos')) {
    if (subcategory.includes('cabos de silicone')) return logos.tramar;
    if (subcategory.includes('cabos lides') || slug.includes('cabo-lides')) return logos.cofibam;
  }

  // 5) Fios
  if (slug.includes('fio-de-cobre') || title.includes('fio de cobre')) return logos.condupasqua;
  if (slug.includes('fio-aluminio')) return logos.saomarco;

  // 6) Rolamentos
  if (slug.includes('rolamento') || category.includes('rolamentos')) {
    if (slug.includes('nsk')) return logos.nsk;
    if (slug.includes('hch')) return logos.hch;
  }

  // 7) Jacuzzi no claro = LANC; no escuro = Jacuzzi (vamos usar LANC como padrão neutro)
  if (slug.includes('jacuzzi')) return logos.lanc;

  // 8) Outras regras por brand literal:
  if (brand === 'weg') return logos.weg;
  if (brand === 'jl' || brand.includes('capacitor')) return logos.jlcap;
  if (brand.includes('tramar')) return logos.tramar;
  if (brand.includes('cofibam')) return logos.cofibam;
  if (brand.includes('kohlbach')) return logos.kohlbach;
  if (brand.includes('cifa')) return logos.cifa;
  if (brand.includes('cobix')) return logos.cobix;
  if (brand.includes('igui')) return logos.igui;
  if (brand.includes('dancor')) return logos.dancor;

  return null;
}

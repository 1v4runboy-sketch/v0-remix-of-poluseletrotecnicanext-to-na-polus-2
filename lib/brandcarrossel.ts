/**
 * Polus Eletrotécnica – brandcarrossel (fonte única)
 * ---------------------------------------------------------
 * - Caminhos ABSOLUTOS ("/marcas/...") para /public/marcas
 * - Aliases → chave canônica (MAIÚSCULA)
 * - Label “bonito” para UI e ?brand=
 * - Escalas 2× nas marcas solicitadas (Jacuzzi, Cofibam, Cifa, iGUi, Condupasqua, Tramar)
 * - Lista duplicada (A+B) para marquee contínuo
 */

export const BRAND_FILES: Record<string, string> = {
  'WEG': '/marcas/weg.webp',
  'NSK': '/marcas/nsk-logo.webp',
  'HCH': '/marcas/hch-logo.webp',
  'JL CAPACITORES': '/marcas/jl-capacitores.webp',
  'LANC COMERCIAL': '/marcas/lanc-comercial.webp',
  'IGUI': '/marcas/igui.webp',
  'JACUZZI': '/marcas/jacuzzi.webp',
  'TRAMAR': '/marcas/tramar.webp',
  'COFIBAM': '/marcas/cofibam.webp',
  'CIFA FIOS E LINHAS': '/marcas/cifa.webp',
  'COBIX': '/marcas/cobix.webp',
  'DANCOR': '/marcas/dancor.webp',
  'CONDUPASQUA': '/marcas/condupasqua-logo.svg',
  'POLUS': '/polus-logo.svg', // fallback visual
};

const ALIASES: Record<string, string> = {
  'weg':'WEG','nsk':'NSK','hch':'HCH',
  'jl':'JL CAPACITORES','jl capacitores':'JL CAPACITORES','jl-capacitores':'JL CAPACITORES','jl capasitores':'JL CAPACITORES',
  'lanc comercial':'LANC COMERCIAL','lanque comercial':'LANC COMERCIAL','lanq':'LANC COMERCIAL',
  'ig':'IGUI','igu':'IGUI','igui':'IGUI',
  'jacuzzi':'JACUZZI','tramar':'TRAMAR',
  'cofibam':'COFIBAM','cofiban':'COFIBAM',
  'cifa':'CIFA FIOS E LINHAS','sifa':'CIFA FIOS E LINHAS','cifa fios e linhas':'CIFA FIOS E LINHAS','sifa fios e linhas':'CIFA FIOS E LINHAS',
  'cobix':'COBIX','dancor':'DANCOR',
  'condupasqua':'CONDUPASQUA',
  'polus':'POLUS',
};

export const BRANDS_ORDER: string[] = [
  'WEG','NSK','HCH','JL CAPACITORES','LANC COMERCIAL','IGUI','JACUZZI',
  'TRAMAR','COFIBAM','CIFA FIOS E LINHAS','COBIX','DANCOR','CONDUPASQUA',
];

function _norm(x: any){
  return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}

/** Converte qualquer nome para a chave canônica (MAIÚSCULA) */
export function toBrandKey(name: any){
  const n = _norm(name);
  if (!n) return 'POLUS';
  return ALIASES[n] || String(name).toUpperCase().trim();
}

/** Label amigável para UI e para ?brand= */
const FRIENDLY: Record<string,string> = {
  'IGUI':'iGUi','JL CAPACITORES':'JL Capacitores','LANC COMERCIAL':'LANC Comercial',
  'CIFA FIOS E LINHAS':'Cifa','COBIX':'Solda Cobix','CONDUPASQUA':'Condupasqua',
};
export function friendlyLabelFor(keyOrName: string){
  const k = toBrandKey(keyOrName);
  return FRIENDLY[k] || k;
}

/** Logo por marca (ABSOLUTO) */
export function brandLogoFor(name: any){
  const key = toBrandKey(name);
  return BRAND_FILES[key] || BRAND_FILES['POLUS'];
}

/** Duplica sequência A+B para marquee contínuo */
export function logosForCarousel(order = BRANDS_ORDER){
  const seq = Array.from(order||[]);
  return [...seq, ...seq];
}

/** Escala 2× para: Jacuzzi, Cofibam, Cifa, iGUi, Condupasqua, Tramar */
export function brandScale(name: any){
  const key = toBrandKey(name);
  switch (key) {
    case 'JACUZZI':
    case 'COFIBAM':
    case 'CIFA FIOS E LINHAS':
    case 'IGUI':
    case 'CONDUPASQUA':
    case 'TRAMAR':
      return 2;
    default:
      return 1;
  }
}

/** Glow sutil no dark */
export function brandGlowDark(name: any){
  const key = toBrandKey(name);
  switch (key) {
    case 'WEG': return 'radial-gradient(120% 120% at 50% 50%, rgba(30,120,214,.40) 0%, transparent 62%)';
    case 'NSK': return 'radial-gradient(120% 120% at 50% 50%, rgba(220,40,50,.40) 0%, transparent 62%)';
    case 'HCH': return 'radial-gradient(120% 120% at 50% 50%, rgba(44,153,204,.40) 0%, transparent 62%)';
    case 'JL CAPACITORES': return 'radial-gradient(120% 120% at 50% 50%, rgba(60,110,200,.40) 0%, transparent 62%)';
    case 'LANC COMERCIAL': return 'radial-gradient(120% 120% at 50% 50%, rgba(220,40,40,.42) 0%, transparent 62%)';
    case 'IGUI': return 'radial-gradient(120% 120% at 50% 50%, rgba(80,180,255,.42) 0%, transparent 62%)';
    case 'JACUZZI': return 'radial-gradient(120% 120% at 50% 50%, rgba(80,155,240,.42) 0%, transparent 62%)';
    case 'COFIBAM': return 'radial-gradient(120% 120% at 50% 50%, rgba(60,130,220,.42) 0%, transparent 62%)';
    case 'CIFA FIOS E LINHAS': return 'radial-gradient(120% 120% at 50% 50%, rgba(60,140,240,.42) 0%, transparent 62%)';
    case 'DANCOR': return 'radial-gradient(120% 120% at 50% 50%, rgba(40,90,180,.42) 0%, transparent 62%)';
    case 'TRAMAR':
      return 'radial-gradient(120% 120% at 50% 50%, rgba(34,147,255,.34) 0%, transparent 62%), linear-gradient(90deg, rgba(250,120,40,.28), rgba(34,147,255,.28))';
    case 'COBIX':
      return 'radial-gradient(120% 120% at 50% 50%, rgba(255,95,95,.34) 0%, transparent 62%), linear-gradient(90deg, rgba(255,80,80,.26), rgba(50,110,220,.26))';
    case 'CONDUPASQUA':
      return 'radial-gradient(120% 120% at 50% 50%, rgba(220,60,60,.36) 0%, transparent 62%)';
    default:
      return 'radial-gradient(120% 120% at 50% 50%, rgba(255,255,255,.40) 0%, transparent 62%)';
  }
}

/** Resolve o objeto visual completo para o carrossel */
export function resolveBrandVisual(name: any){
  const key = toBrandKey(name);
  return {
    key,
    logoSrc: brandLogoFor(key),
    scale: brandScale(key),
    glowDark: brandGlowDark(key),
    label: friendlyLabelFor(key),
  };
}

/** Lista de objetos prontos para o carrossel, duplicada A+B */
export function carouselItems(order = BRANDS_ORDER){
  return logosForCarousel(order).map((key) => resolveBrandVisual(key));
}

/** Export default (compatível com import default) */
const BRANDCARROSSEL_DEFAULT = {
  BRAND_FILES, BRANDS_ORDER,
  toBrandKey, brandLogoFor, logosForCarousel,
  brandScale, brandGlowDark, resolveBrandVisual,
  friendlyLabelFor, carouselItems,
};
export default BRANDCARROSSEL_DEFAULT;

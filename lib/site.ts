// /lib/site.ts — utilidades do site (títulos, imagem segura, marcas, descrições ricas)

// -----------------------------------------------------------------------------
// Links & Títulos
// -----------------------------------------------------------------------------
export const SITE = {
  instagram: 'https://www.instagram.com/_poluseletrotecnica/',
};

export function whatsappHref(text?: string) {
  return `https://wa.me/551135992935?text=${encodeURIComponent('Olá! Gostaria de uma cotação: ' + (text || ''))}`;
}

export function prettyTitle(input?: string) {
  if (!input) return '';
  let s = String(input).replace(/\s*-\s*/g, ' – ').replace(/\s+/g, ' ').trim();

  const lowers = new Set(['de','da','do','das','dos','e','ou','em','no','na','nos','nas','com','para','por','sob','sobre','entre','sem','a','ao','aos','às','à','até','ante','após','perante','desde','contra']);
  const keepUpper = new Set(['WEG','NSK','HCH','JL','CV','HP','AC','DC','VAC','VDC','IP','HZ','KW','KV','MM','ºC']);

  const words = s.split(' ');
  const out = words.map((w, i) => {
    if (!w) return w;
    if (/[0-9/]/.test(w)) return w;
    const token = w.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (keepUpper.has(token.toUpperCase())) return token.toUpperCase();
    if (i > 0 && lowers.has(token.toLowerCase())) return w.toLowerCase();
    return w.slice(0,1).toUpperCase() + w.slice(1).toLowerCase();
  });

  return out.join(' ');
}
export const titleCaseSmart = prettyTitle;
export function titleUpper(s?: string) { return String(s || '').toUpperCase(); }

// -----------------------------------------------------------------------------
// Normalização e Busca
// -----------------------------------------------------------------------------
function stripAccents(s: string) {
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
export function toSearchBlob(p: any) {
  const parts: string[] = [];
  if (p?.title) parts.push(p.title);
  if (p?.slug) parts.push(p.slug);
  if (p?.shortDescription) parts.push(p.shortDescription);
  if (p?.category) parts.push(p.category);
  if (p?.subcategory) parts.push(p.subcategory);
  if (Array.isArray(p?.images)) {
    for (const im of p.images) {
      const src = typeof im === 'string' ? im : (im?.src || '');
      if (src) parts.push(src);
    }
  }
  return stripAccents(parts.join(' ').toLowerCase());
}

// -----------------------------------------------------------------------------
// Imagem segura
// -----------------------------------------------------------------------------
export function toSrc(input?: string | { src?: string }) {
  if (!input) return null as any;
  let raw = typeof input === 'string' ? input : (input?.src ?? '');
  if (!raw) return null as any;

  raw = raw.trim();
  if (!raw) return null as any;

  if (/^(https?:)?\/\//i.test(raw) || /^data:/i.test(raw)) return raw;

  let p = raw.startsWith('/') ? raw : '/' + raw;
  p = p.replace(/\/{2,}/g, '/');

  try {
    const decoded = decodeURI(p);
    return encodeURI(decoded);
  } catch {
    return encodeURI(p);
  }
}
export function imgProps(img?: string | { src?: string; alt?: string }) {
  const src = toSrc(img) || undefined;
  const alt = (typeof img === 'string') ? '' : (img?.alt || '');
  return { src, alt };
}

// -----------------------------------------------------------------------------
// Marcas (logos + aliases)
// -----------------------------------------------------------------------------
type BrandDef = { logo: string; friendly?: string; tokens: string[] };

const BRANDS: Record<string, BrandDef> = {
  'POLUS':               { logo: '/polus-logo.svg',                 tokens: ['polus'], friendly: 'Polus' },
  'WEG':                 { logo: '/marcas/weg.webp',                tokens: ['weg'] },
  'NSK':                 { logo: '/marcas/nsk-logo.webp',           tokens: ['nsk'] },
  'HCH':                 { logo: '/marcas/hch-logo.webp',           tokens: ['hch'] },
  'JL CAPACITORES':      { logo: '/marcas/jl-capacitores.webp',     tokens: ['jl capacitores','jl-capacitores'], friendly: 'JL Capacitores' },
  'LANC COMERCIAL':      { logo: '/marcas/lanc-comercial.webp',     tokens: ['lanc comercial','lanc-comercial'], friendly: 'LANC Comercial' },
  'IGUI':                { logo: '/marcas/igui.webp',               tokens: ['igui','igu'], friendly: 'iGUi' },
  'JACUZZI':             { logo: '/marcas/jacuzzi.webp',            tokens: ['jacuzzi'] },
  'TRAMAR':              { logo: '/marcas/tramar.webp',             tokens: ['tramar'] },
  'COFIBAM':             { logo: '/marcas/cofibam.webp',            tokens: ['cofibam','cofiban'] },
  'COBIX':               { logo: '/marcas/cobix.webp',              tokens: ['cobix','solda cobix','solda-cobix'], friendly: 'Solda Cobix' },
  'DANCOR':              { logo: '/marcas/dancor.webp',             tokens: ['dancor'] },
  'CIFA FIOS E LINHAS':  { logo: '/marcas/cifa.webp',               tokens: ['cifa','sifa','cifa fios e linhas','sifa fios e linhas'], friendly: 'Cifa' },
  'CONDUPASQUA':         { logo: '/marcas/condupasqua-logo.svg',    tokens: ['condupasqua'], friendly: 'Condupasqua' },
  'KOHLBACH':            { logo: '/marcas/kohlbach.webp',           tokens: ['kohlbach'] },

  // >>> DSantis (coloque a imagem em /public/marcas/dsantis-logo.webp)
  'DSANTIS':             { logo: '/marcas/dsantis-logo.webp',       tokens: ['dsantis','d santis','d-santis'], friendly: 'DSantis' },
};

const ALIASES: Record<string, string> = (() => {
  const map: Record<string, string> = {
    'polus':'POLUS',
    'weg':'WEG','nsk':'NSK','hch':'HCH',
    'jl capacitores':'JL CAPACITORES','jl-capacitores':'JL CAPACITORES',
    'lanc comercial':'LANC COMERCIAL','lanc-comercial':'LANC COMERCIAL',
    'igui':'IGUI','igu':'IGUI',
    'jacuzzi':'JACUZZI','tramar':'TRAMAR',
    'cofibam':'COFIBAM','cofiban':'COFIBAM',
    'cobix':'COBIX','solda cobix':'COBIX','solda-cobix':'COBIX',
    'dancor':'DANCOR',
    'cifa':'CIFA FIOS E LINHAS','sifa':'CIFA FIOS E LINHAS','cifa fios e linhas':'CIFA FIOS E LINHAS','sifa fios e linhas':'CIFA FIOS E LINHAS',
    'condupasqua':'CONDUPASQUA',
    'kohlbach':'KOHLBACH',
    // DSantis
    'dsantis':'DSANTIS','d santis':'DSANTIS','d-santis':'DSANTIS',
  };
  for (const [key, def] of Object.entries(BRANDS)) {
    for (const t of def.tokens) {
      map[stripAccents(t.toLowerCase())] = key;
    }
  }
  return map;
})();

// -----------------------------------------------------------------------------
// Regras de negócio → marca implícita
// -----------------------------------------------------------------------------
function mapBrandByBusinessRules(p: any): string | '' {
  const c = stripAccents(`${p?.category||''} ${p?.subcategory||''} ${p?.title||''} ${p?.slug||''}`.toLowerCase());

  // >>> DSantis para “platinado(s) weg similar/silimilar/semelhante”
  if (/\bplatinad/.test(c) && /\bweg\b/.test(c) && (/\bsimilar\b/.test(c) || /\bsilimilar\b/.test(c) || /\bsemelhant/.test(c))) {
    return 'DSANTIS';
  }

  if (/\bcapacitor(es)?\b/.test(c) || /\beletrol(ito|i)t(ic|i)os?\b/.test(c) || /\bpermanente(s)?\b/.test(c)) {
    return 'JL CAPACITORES';
  }
  if (/\bbarbant(e)?\b/.test(c) && /\bencerad/.test(c)) return 'CIFA FIOS E LINHAS';
  if (/\bcabos?\b/.test(c) && /\blides\b/.test(c)) return 'COFIBAM';
  if (/\bcabos?\b/.test(c) && /\bsilicone\b/.test(c)) return 'TRAMAR';
  if (/\bespaguet(es|e)\b/.test(c) && /\bflexnor\b/.test(c)) return 'COFIBAM';
  if (/\bespaguet(es|e)\b/.test(c) && /\bfiberglass\b/.test(c)) return 'COFIBAM';
  if (/\bfios?\b/.test(c) && (/\baluminio\b/.test(c) || /\bcobre\b/.test(c))) return 'CONDUPASQUA';
  if (/\bcaixas? de ligacao\b/.test(c) && /\bweg\b/.test(c)) return 'WEG';
  if (/\bplatinado/.test(c)) {
    if (/\bweg\b/.test(c)) return 'WEG';
    if (/\bkohlbach\b/.test(c)) return 'KOHLBACH';
  }
  return '';
}

function matchBrandByTokens(blob: string): string | '' {
  for (const [key, def] of Object.entries(BRANDS)) {
    for (const t of def.tokens) {
      const token = stripAccents(t.toLowerCase());
      const re = new RegExp(`(?:^|[^a-z0-9])${token}(?:$|[^a-z0-9])`, 'i');
      if (re.test(blob) || blob.includes(token)) return key;
    }
  }
  return '';
}

// -----------------------------------------------------------------------------
// API pública de marca
// -----------------------------------------------------------------------------
export function resolveBrand(p: any) {
  const raw = (p?.brand ?? '').toString().trim();
  const blob = toSearchBlob(p);

  if (stripAccents(raw.toLowerCase()) === 'sem marca') {
    const def = BRANDS['POLUS'];
    return { key: 'POLUS', name: def.friendly || 'Polus', logoSrc: def.logo };
  }

  if (raw) {
    const alias = stripAccents(raw.toLowerCase());
    const keyFromRaw = (ALIASES as any)[alias] || stripAccents(raw).toUpperCase().trim();
    if (keyFromRaw && (BRANDS as any)[keyFromRaw]) {
      const def = (BRANDS as any)[keyFromRaw];
      return { key: keyFromRaw, name: def.friendly || keyFromRaw, logoSrc: def.logo };
    }
  }

  const byBiz = mapBrandByBusinessRules(p);
  if (byBiz && (BRANDS as any)[byBiz]) {
    const def = (BRANDS as any)[byBiz];
    return { key: byBiz, name: def.friendly || byBiz, logoSrc: def.logo };
  }

  const byToken = matchBrandByTokens(blob);
  if (byToken && (BRANDS as any)[byToken]) {
    const def = (BRANDS as any)[byToken];
    return { key: byToken, name: def.friendly || byToken, logoSrc: def.logo };
  }

  return { key: 'POLUS', name: 'Polus', logoSrc: '/polus-logo.svg' };
}

// -----------------------------------------------------------------------------
// Textos ricos (detalhes)
// -----------------------------------------------------------------------------
export function buildProductDetails(p: any) {
  const blob = toSearchBlob(p);
  const norm = (s: any) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const cat = norm(p?.category); const title = norm(p?.title); const slug = norm(p?.slug);
  const bag = `${cat} ${title} ${slug} ${norm(blob)}`;

  const out: any = { desc: '', applications: [], features: [], notes: [] };

  if (cat.includes('caixas de ligacao') || /(^|\W)caixa(s)? de ligacao(\W|$)/.test(bag)) {
    out.desc = 'Caixa de ligação para motores: protege bornes e interligações, facilita manutenção e contribui para a vedação do conjunto.';
    out.applications.push('Proteção e organização de bornes','Inspeção e manutenção com acesso prático','Uso em ambientes industriais');
    out.features.push('Construção robusta','Passagens para prensa-cabos (conforme modelo)','Compatível com carcaças indicadas','Acabamento com proteção anticorrosiva');
    out.notes.push('Conferir carcaça e furação','Kit pode não incluir bornes/vedações','Instalar desenergizado com EPIs');
  }

  if (cat.includes('cadarcos') || /(^|\W)cadar(c|ç)o(s)?(\W|$)/.test(bag)) {
    if (/fibra(\s+de)?\s+vidro/.test(bag)) {
      out.desc = 'Cadarço em fibra de vidro para amarração técnica — alta resistência térmica e estabilidade dimensional.';
      out.features.push('Classe térmica elevada','Boa resistência mecânica','Compatível com impregnação/verniz');
    } else if (/poli(e|é)ster/.test(bag)) {
      out.desc = 'Cadarço de poliéster — resistência mecânica, boa conformação e ótimo custo-benefício.';
      out.features.push('Resiste à abrasão','Conformação fácil','Aplicação rápida');
    } else if (/algod(ao|ão)/.test(bag)) {
      out.desc = 'Cadarço de algodão — macio, conformável e de fácil manuseio.';
      out.features.push('Textura macia','Acabamento limpo','Compatível com impregnação');
    } else {
      out.desc = 'Cadarço têxtil para amarração e acabamento de enrolamentos.';
      out.features.push('Textura estável','Boa tração','Diversas larguras');
    }
    out.applications.push('Amarração de bobinas','Fixação de isolantes/espaguetes','Acabamento em motores/transformadores');
    out.notes.push('Aplicar tensão uniforme','Selagem das pontas','Observar classe térmica do sistema');
  }

  if (/\bcapacitor/.test(bag)) {
    out.applications.push('Motores monofásicos, bombas, ventiladores');
    out.features.push('Tensão nominal típica 250–450 VAC');
  }
  if (/\bcabo(s)? de silicone/.test(bag) || /\bsilicone\b/.test(bag)) {
    out.features.push('Isolação em silicone para alta temperatura');
  }

  if (!out.desc) {
    const base = (p?.title || '').trim() || 'Componente técnico';
    const catName = (p?.category || 'Linha profissional').trim();
    out.desc = `${base} da linha ${catName}. Indicado para montagem, manutenção e reposição em aplicações industriais.`;
  }
  if (!out.applications.length) out.applications.push('Uso em manutenção eletromecânica','Integração em montagens e retrofit','Aplicações gerais em oficinas e indústria');
  if (!out.features.length) out.features.push('Construção robusta','Compatível com boas práticas elétricas','Fácil instalação e manutenção');
  if (!out.notes.length) out.notes.push('Verificar compatibilidade','Instalar desenergizado','Seguir orientações de segurança');

  return out;
}

// -----------------------------------------------------------------------------
// ++ ADIÇÕES: brandScale() e productHref() ++
// -----------------------------------------------------------------------------
export function brandScale(brandKey?: string): number {
  const key = String(brandKey || '').toUpperCase().trim();
  switch (key) {
    case 'WEG': return 1.0;
    case 'JACUZZI': return 2.0;
    case 'COFIBAM': return 2.0;
    case 'IGUI': return 1.5;
    case 'COBIX': return 1.0;
    case 'KOHLBACH': return 3.0;
    case 'CONDUPASQUA': return 3.0;
    case 'TRAMAR': return 1.3;
    case 'CIFA FIOS E LINHAS': return 3.0;
    case 'DSANTIS': return 1.2;
    default: return 1.0;
  }
}

export function productHref(p: any, opts?: { anchor?: 'gallery' | '' }) {
  const base = `/produto/${p?.slug || ''}`;
  return opts?.anchor === 'gallery' ? `${base}#product-gallery` : base;
}

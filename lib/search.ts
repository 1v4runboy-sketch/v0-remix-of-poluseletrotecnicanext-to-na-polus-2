// lib/search.ts — busca robusta com sinônimos, fuzzy, UF/voltagem e sugestões (sem libs externas)
// Imports RELATIVOS (sem "@/")
import { PRODUCTS } from './withCards';
import { resolveBrand } from './site';

type P = any;

function stripAccents(s: string) {
  return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
export function normalize(s?: string) {
  return stripAccents(String(s || '').toLowerCase().trim());
}
export function tokenize(s?: string) {
  return normalize(s).split(/[^a-z0-9]+/).filter(Boolean);
}

// Sinônimos/aliases PT-BR (pode ampliar à vontade)
const SYN: Record<string,string[]> = {
  // categorias
  'capacitor': ['cap','capacit','cap de partida','eletrolitico','eletrolítico','capacitores','capacitor de partida'],
  'platinado': ['plat','contato motor','platina','platinados'],
  'espaguete': ['manga','tubo isolante','isop','espaguetes','mangueira elétrica'],
  'cadarco': ['cadarço','cadarcos','cadarços','fitilho','amarração'],
  'fita': ['fitas','fitas lineares','fita linear'],
  'caixa de ligacao': ['caixa motor','caixa ligação','caixas de ligação'],
  'rolamento': ['rolamentos','bearing'],
  'fio de cobre': ['fio cobre','cobre nu','condutor cobre'],
  'fio de aluminio': ['fio aluminio','fio alumínio','condutor aluminio','condutor alumínio'],

  // marcas (reforço — resolveBrand já cobre aliases)
  'jl capacitores': ['jl','jl-capacitores','capacitores jl'],
  'cofibam': ['cofiban'],
  'cifa': ['cifa fios e linhas','cifa fios','cifa linhas'],
  'jacuzzi': ['jacuzi','jacusy','jaccuzi'],
  'kohlbach': ['kolbach','kolbac','colbuck','colbach'],
  'condupasqua': ['condu pasqua','condutasqua','condopasqua'],
};

function expandSynonyms(tokens: string[]): string[] {
  const out: string[] = [...tokens];
  for (const t of tokens) {
    for (const [canon, variants] of Object.entries(SYN)) {
      if (canon === t || variants.some(v => normalize(v) === t)) {
        out.push(normalize(canon));
        variants.forEach(v => out.push(normalize(v)));
      }
    }
  }
  return Array.from(new Set(out));
}

// Extração de UF e tensão do texto (título/slug)
export function parseUF(s?: string) {
  const t = normalize(s);
  const m2 = t.match(/(\d{2,5})\s*\/\s*(\d{2,5})\s*uf\b/); // 340/408 uf
  if (m2) return { ufMin: parseInt(m2[1], 10), ufMax: parseInt(m2[2], 10) };
  const m1 = t.match(/(\d{2,5})\s*uf\b/);
  if (m1) return { ufMin: parseInt(m1[1], 10), ufMax: parseInt(m1[1], 10) };
  return { ufMin: NaN, ufMax: NaN };
}
export function parseVoltage(s?: string) {
  const t = normalize(s);
  if (/\b(110|127)\s*v\b/.test(t)) return 110;
  if (/\b220\s*v\b/.test(t)) return 220;
  return NaN;
}

// Levenshtein compacto (fuzzy leve, tolerância 1)
function lev(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  const prev = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) prev[j] = j;
  for (let i = 1; i <= al; i++) {
    const curr = [i];
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= bl; j++) prev[j] = curr[j];
  }
  return prev[bl];
}
function fuzzyMatch(t: string, s: string, maxDist = 1) {
  return s.includes(t) || lev(t, s) <= maxDist;
}

// Índice
export type Indexed = P & {
  _normTitle: string;
  _normSlug: string;
  _normBrand: string;
  _normCat: string;
  _normSub: string;
  _ufMin?: number;
  _ufMax?: number;
  _volt?: number;
}

export function buildIndex(list: P[] = PRODUCTS as any): Indexed[] {
  return list.map((p) => {
    const brand = resolveBrand(p);
    const base = `${p?.title || ''} ${p?.slug || ''}`;
    const { ufMin, ufMax } = parseUF(base);
    const volt = parseVoltage(base);
    return Object.assign({}, p, {
      _normTitle: normalize(p?.title),
      _normSlug: normalize(p?.slug),
      _normBrand: normalize(brand?.name || ''),
      _normCat: normalize(p?.category),
      _normSub: normalize(p?.subcategory),
      _ufMin: ufMin,
      _ufMax: ufMax,
      _volt: volt,
    });
  });
}

// Scoring por relevância (título > slug > marca > categoria > sub | bônus por números | fuzzy leve)
export function score(q: string, it: Indexed) {
  if (!q) return 0;
  const terms = expandSynonyms(tokenize(q));
  if (!terms.length) return 0;
  let s = 0;
  for (const t of terms) {
    if (!t) continue;
    if (it._normTitle.includes(t)) s += 6;
    if (it._normSlug.includes(t)) s += 3;
    if (it._normBrand.includes(t)) s += 2;
    if (it._normCat.includes(t)) s += 1.5;
    if (it._normSub.includes(t)) s += 1;
    if (fuzzyMatch(t, it._normBrand)) s += 0.6;
    if (fuzzyMatch(t, it._normCat)) s += 0.4;
    if (fuzzyMatch(t, it._normSub)) s += 0.2;
    const n = parseInt(t, 10);
    if (!isNaN(n)) {
      if (n === it._volt) s += 3;
      if (!isNaN(it._ufMin!) && (n === it._ufMin || n === it._ufMax)) s += 3;
    }
  }
  const allInTitle = terms.every(t => it._normTitle.includes(t));
  if (allInTitle) s += 3;
  return s;
}

// Facetas simples (com contadores) — opcional para exibir na UI
export function buildFacets(list: Indexed[]) {
  const byBrand = new Map<string, number>();
  const byCat = new Map<string, number>();
  const bySub = new Map<string, number>();
  for (const p of list) {
    const b = resolveBrand(p).name;
    if (b) byBrand.set(b, (byBrand.get(b) || 0) + 1);
    if (p?.category) byCat.set(String(p.category), (byCat.get(String(p.category)) || 0) + 1);
    if (p?.subcategory) bySub.set(String(p.subcategory), (bySub.get(String(p.subcategory)) || 0) + 1);
  }
  const obj = (m: Map<any, number>) =>
    Array.from(m.entries()).sort((a,b)=> String(a[0]).localeCompare(String(b[0]), 'pt-BR'))
      .map(([v,c]) => ({ value: v, count: c }));
  return { brands: obj(byBrand), categories: obj(byCat), subcategories: obj(bySub) };
}

export type QueryFilters = { brands?: string[]; categories?: string[]; subs?: string[]; };

export function queryProducts(idx: Indexed[], q: string, filters: QueryFilters, sort: 'RELEVANCIA'|'A-Z'|'Z-A'|'NOVOS') {
  const qn = normalize(q);

  let list = idx.filter((it) => {
    if (filters?.brands?.length) {
      const b = resolveBrand(it).name;
      if (!filters.brands.includes(b)) return false;
    }
    if (filters?.categories?.length) {
      if (!filters.categories.includes(String(it.category || ''))) return false;
    }
    if (filters?.subs?.length) {
      if (!filters.subs.includes(String(it.subcategory || ''))) return false;
    }
    if (!qn) return true;
    return score(qn, it) > 0;
  });

  if (sort === 'A-Z') list = list.slice().sort((a,b)=> String(a.title||a.slug).localeCompare(String(b.title||b.slug),'pt-BR'));
  else if (sort === 'Z-A') list = list.slice().sort((a,b)=> String(b.title||b.slug).localeCompare(String(a.title||a.slug),'pt-BR'));
  else if (sort === 'NOVOS') list = list.slice().sort((a,b)=> String(b.slug||b.title).localeCompare(String(a.slug||a.title),'pt-BR'));
  else list = list.slice().sort((a,b)=> score(qn, b) - score(qn, a));

  return list;
}

// Sugestões (produtos top-8 por score + marcas/categorias que batem os termos)
export function suggest(idx: Indexed[], q: string) {
  const qn = normalize(q);
  if (!qn) return { products: [], brands: [], categories: [] };

  const terms = expandSynonyms(tokenize(qn));
  const scored = idx.map(p => ({ p, sc: score(qn, p) })).filter(x => x.sc > 0)
    .sort((a,b)=> b.sc - a.sc).slice(0, 8).map(x=>x.p);

  const bset = new Set<string>(), cset = new Set<string>();
  for (const it of idx) {
    const b = resolveBrand(it).name;
    if (terms.every(t => normalize(b).includes(t))) bset.add(b);
    const c = String(it.category||'');
    if (terms.every(t => normalize(c).includes(t))) cset.add(c);
    if (bset.size >= 6 && cset.size >= 6) break;
  }

  return { products: scored, brands: Array.from(bset).slice(0,6), categories: Array.from(cset).slice(0,6) };
}

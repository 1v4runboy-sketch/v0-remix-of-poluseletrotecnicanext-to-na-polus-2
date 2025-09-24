// @/lib/catalogSafe.ts
// Fonte segura: SEMPRE mostra os originais de /lib/products e SOMA os cards
// (Acamadores + Tinta Azul WEG). Canonicalização é OPCIONAL.

import { PRODUCTS as RAW } from '@/lib/products';
type P = any;

const N = (s?: string) => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const HAS = (h:string,n:string) => N(h).includes(N(n));

const dedupeBySlug = (list:P[]) => { const m=new Map<string,P>(); for(const p of list){ const k=String(p?.slug||''); if(!m.has(k)) m.set(k,p);} return Array.from(m.values()); };
const uniqBy = <T,>(arr:T[], key:(x:T)=>string) => { const m=new Map<string,T>(); for(const x of arr){ const k=key(x); if(!m.has(k)) m.set(k,x);} return Array.from(m.values()); };

function collectImages(items:P[]){
  const seen=new Set<string>(); const out:{src:string;alt:string}[]=[];
  for(const d of items){ const imgs=Array.isArray(d.images)?d.images:[]; for(const im of imgs){ const src=typeof im==='string'?im:(im?.src||''); if(src && !seen.has(src)){ seen.add(src); out.push({src,alt:d.slug}); } } }
  return out;
}

/* ---------- ACAMADORES (card opcional) ---------- */
function isAcamador(p:P){ const bag=`${p?.title||''} ${p?.slug||''} ${p?.category||''} ${p?.subcategory||''}`; return /\bacamador(es)?\b/i.test(bag); }
function sizeFrom(raw:string){
  let m=raw.match(/(\d+(?:[.,]\d+)?)\s*mm/i); if(m) return `${m[1].replace(',', '.')} mm`;
  m=raw.match(/\bN[º°o]?\s*([0-9]{1,3})\b/i); if(m) return `Nº ${m[1]}`;
  m=raw.match(/(\d+\s*\/\s*\d+)\s*(?:\"|in|pol)\b/i); if(m) return m[1].replace(/\s+/g,'')+'"';
  return '';
}
function levelFrom(raw:string){ const s=N(raw); if(s.includes('micro')) return 'Micro'; if(s.includes('pequeno')) return 'Pequeno'; if(s.includes('medio')||s.includes('médio')) return 'Médio'; if(s.includes('grande')) return 'Grande'; return ''; }
function buildCardAcamadores(all:P[]){
  const list=all.filter(isAcamador); if(!list.length) return null;
  const variants=uniqBy(list.map((d:P)=>{ const base=`${d.title||''} ${d.slug||''}`; const size=sizeFrom(base); const lvl=levelFrom(base); const label=(size||lvl||d.title||d.slug).trim(); return { id:d.slug, label, unit:'un', minQty:1, stepQty:1, attrs:{ sourceSlug:d.slug, size:size||null, level:lvl||null } }; }), v=> v.id)
    .sort((a:any,b:any)=>{ const order=(x:string)=>['Micro','Pequeno','Médio','Grande'].indexOf(x); const ao=order(a.label), bo=order(b.label); if(ao!==-1 || bo!==-1) return (ao==-1?999:ao)-(bo==-1?999:bo); return String(a.label).localeCompare(String(b.label)); });
  return { id:'', slug:'acamadores', title:'Acamadores', brand:null, category:'Acamadores', subcategory:'', images:collectImages(list), variants, shortDescription:'Variações por tamanho/medida (unidade: un)', techSpecs:null, metaCollection:{ type:'acamadores', bucket:'unificado' } };
}

/* ---------- TINTAS AZUL WEG (card opcional) ---------- */
function isTintaWegAzul(p:P){ const bag=`${p?.title||''} ${p?.slug||''} ${p?.category||''} ${p?.subcategory||''}`; return /\btinta\b/i.test(bag) && /\bweg\b/i.test(bag) && /\bazul\b/i.test(bag) && !/\bverniz\b/i.test(bag) && !/\bdiluente\b/i.test(bag); }
const is36 = (raw:string)=> /\b3[\s.,-]?6\s*l\b/i.test(raw);
const volume = (raw:string)=>{ const l=raw.match(/(\d+(?:[.,]\d+)?)\s*l\b/i); const ml=raw.match(/(\d+(?:[.,]\d+)?)\s*ml\b/i); if(l) return `${l[1].replace(',', '.')} L`; if(ml) return `${ml[1].replace(',', '.')} mL`; return ''; };
const code = (raw:string)=>{ const S=String(raw||'').toUpperCase(); for(const w of ['5002','5007','5009']) if(new RegExp(`\\b${w}\\b`).test(S)) return w; const cand=S.match(/\b[A-Z0-9]{3,8}\b/g)||[]; const bad=new Set(['TINTA','WEG','AZUL','VERMELHA','PRETA','L','ML']); return cand.find(x=> !bad.has(x) && /[A-Z]/.test(x) && /\d/.test(x))||''; };
function buildCardTintasAzul(all:P[]){
  const list=all.filter(isTintaWegAzul); if(!list.length) return null;
  const prefer36=list.filter(d=> is36(`${d.title} ${d.slug}`)); const pool=prefer36.length? prefer36 : list;
  const variantsRaw=pool.map((d:P)=>{ const c=code(`${d.title} ${d.slug}`); const v=volume(`${d.title} ${d.slug}`); return { id:d.slug, label: c ? (v? `${c} — ${v}` : c) : (v || d.title || d.slug), unit:'un', minQty:1, stepQty:1, attrs:{ sourceSlug:d.slug, code:c||null, volume:v||null } }; });
  const withCode=variantsRaw.filter(v=> !!v.attrs.code);
  const variants=(withCode.length? uniqBy(withCode, v=> String(v.attrs.code)) : uniqBy(variantsRaw, v=> v.label)).sort((a,b)=> String(a.label).localeCompare(String(b.label)));
  return { id:'', slug:'tintas-weg-azul', title:'Tintas Azul WEG', brand:'WEG', category:'Tintas', subcategory:'Tintas WEG', images:collectImages(pool), variants, shortDescription:'Variações por código (unidade: un)', techSpecs:null, metaCollection:{ type:'tintas', bucket:'azul' } };
}

/* ---------- build & export ---------- */
const CARDS:P[] = [ buildCardAcamadores(RAW), buildCardTintasAzul(RAW) ].filter(Boolean) as P[];
export const PRODUCTS:P[] = dedupeBySlug([...RAW, ...CARDS]);

/* ---------- canonicalização OPCIONAL ---------- */
export function canonicalize(list:P[], families:{ acamadores?:boolean; tintasAzul?:boolean } = {}){
  const isCanon=(slug:string)=> ['acamadores','tintas-weg-azul'].includes(String(slug||''));
  const isAcam=(p:P)=> isAcamador(p);
  const isTAzul=(p:P)=> isTintaWegAzul(p);
  const others = list.filter(p=> !( (families.acamadores && isAcam(p)) || (families.tintasAzul && isTAzul(p)) ));
  const canonFromList=list.filter(p=> isCanon(p.slug));
  const canonFromAll =PRODUCTS.filter(p=> isCanon(p.slug));
  const canon = (canonFromList.length? canonFromList : canonFromAll).filter(p=> (families.acamadores && p.slug==='acamadores') || (families.tintasAzul && p.slug==='tintas-weg-azul'));
  return dedupeBySlug([...canon, ...others]);
}

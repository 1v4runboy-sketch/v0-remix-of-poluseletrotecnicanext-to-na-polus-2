// /lib/visibility.ts
import type { Product } from './products';

/** Normaliza string */
const norm = (s?: string | null) => (s || '').toLowerCase();

/** Regras de ocultação forçada para singles (SKUs individuais) */
function shouldForceHideSingle(p: Product): boolean {
  const s = norm(p.slug);
  const cat = norm(p.category);
  const sub = norm(p.subcategory);

  // 1) Rolamentos (tudo individual vira oculto)
  if (cat === 'rolamentos' || /^rolamento-/.test(s)) return true;

  // 2) Cabos (Silicone / Lides)
  if (cat === 'cabos elétricos' && (sub === 'cabos de silicone' || sub === 'cabos lides')) return true;
  if (/^cabo-silicone-/.test(s) || /^cabo-lides-/.test(s)) return true;

  // 3) Capacitores permanentes 250V/380-400/440-450
  if (cat === 'capacitores' && (
      sub === 'permanentes 250vac' ||
      sub === 'permanentes 380/400vac' ||
      sub === 'permanentes 440/450vac'
    )) return true;
  if (/^capacitor-permanente-/.test(s)) return true;

  // 4) Placas de Borne WEG
  if ((cat === 'componentes e peças' && sub === 'placas de borne') || /^placa-borne-weg-/.test(s)) return true;

  // 5) Protetores Térmicos WEG
  if ((cat === 'proteção e segurança' && sub === 'protetores térmicos') || /^protetor-termico-weg-/.test(s)) return true;

  // 6) Espaguetes 130°C e Silicone 200°C
  if ((cat === 'isolantes' && (sub === 'espaguete flexnor 130°c' || sub === 'espaguete silicone 200°c'))) return true;
  if (/^espaguete-flexnor-130c-/.test(s) || /^espaguete-silicone-200c-/.test(s)) return true;

  // 7) Vernizes WEG 5L
  if ((cat === 'tintas e vernizes' && sub === 'vernizes e diluentes') &&
       (s.includes('verniz-weg-1303-5l') || s.includes('verniz-weg-1333-5l') || s.includes('verniz-weg-1314-5l'))) {
    return true;
  }

  // 8) Acamadores
  if (cat === 'acamadores' || /^acamador-/.test(s)) return true;

  // 9) Caixas de Ligação WEG
  if ((cat === 'caixas de ligação') || /^caixa-de-ligacao-weg-/.test(s)) return true;

  // 10) Cadarços (todas as variações)
  if (cat === 'cadarços' || /^cadarco-/.test(s)) return true;

  // 11) Tintas WEG Azul (5002 / 5007 / 5009) – ocultar singles
  if ((cat === 'tintas e vernizes' && sub === 'tintas weg') &&
      /tinta-weg-azul-(5002|5007|5009)/.test(s)) {
    return true;
  }
  if (/^tinta-weg-azul-(5002|5007|5009)-/.test(s)) return true;

  // 12) Fio Esmaltado de Alumínio – ocultar singles
  if ((cat === 'fios e cabos' && sub === 'fios esmaltados' && s.includes('fio-aluminio-esmaltado-')) ||
       /^fio-aluminio-esmaltado-/.test(s)) {
    return true;
  }

  return false;
}

/** Mapeia slugs "filhos" (variantes) dos cards unificados para ocultar os singles. */
export function hiddenSlugsFromUnified(unifiedCards: Product[]): Set<string> {
  const hidden = new Set<string>();

  for (const card of unifiedCards) {
    const vars = Array.isArray(card.variants) ? card.variants : [];
    for (const v of vars) {
      const anyV = v as any;
      const fromAttrs = anyV?.attrs?.productSlug || anyV?.attrs?.slug;
      const fromId = typeof v.id === 'string' ? v.id : undefined;
      const target = (fromAttrs || fromId || '').trim();
      if (target) hidden.add(target);
    }
  }
  return hidden;
}

/** Retorna apenas os produtos individuais que:
 *  - NÃO estão listados como variação de nenhum card unificado;
 *  - E TAMBÉM não caem nas famílias que devemos ocultar forçadamente.
 */
export function visibleSingles(allProducts: Product[], unifiedCards: Product[]) {
  const hidden = hiddenSlugsFromUnified(unifiedCards);
  return allProducts.filter((p) => !hidden.has(p.slug) && !shouldForceHideSingle(p));
}

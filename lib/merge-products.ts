// lib/merge-products.ts
import { UNIFIED_PRODUCTS } from './unified-products';

type Product = any;

const EXCLUDE_PATTERNS: Array<RegExp> = [
  /^rolamento-/,
  /^cabo-silicone-/,
  /^cabo-lides-/,
  /^capacitor-permanente-/,
  /^placa-borne-/,
  /^protetor-termico-/,
  /^espaguete-flexnor-130c-/,
  /^espaguete-silicone-200c-/,
  /^espaguete-155/,
  /flexpoli-155/,
  /^verniz-weg-.*-5l/,
  /^acamador-/,
  /^caixa-de-ligacao-weg-/,
  /^cadarco-/,
  /^tinta-weg-azul-500[279]-3-6l/,

  // >>> NOVOS: ocultar itens individuais de "fio de alumínio (esmaltado)" porque agora há o card unificado <<<
  /^fio-esmaltado-aluminio/,
  /^fio-esmaltado-de-aluminio/,
  /^fio-aluminio/,
];

export function isExcludedByUnification(slug: string): boolean {
  return EXCLUDE_PATTERNS.some((re) => re.test((slug || '').toLowerCase()));
}

/**
 * Mescla os cards unificados com os produtos soltos restantes,
 * removendo tudo que deve aparecer unificado.
 */
export function buildCatalog(products: Product[]) {
  const remaining = (products || []).filter((p) => !isExcludedByUnification((p?.slug || '').toLowerCase()));
  return [...UNIFIED_PRODUCTS, ...remaining];
}

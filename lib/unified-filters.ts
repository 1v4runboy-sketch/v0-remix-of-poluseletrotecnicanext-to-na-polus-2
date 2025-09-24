// /lib/unified-filters.ts
import type { Product } from "./products";

const HIDDEN_PATTERNS: RegExp[] = [
  /^cabo-silicone-/,
  /^cabo-lides-/,
  /^espaguete-/,
  /^capacitor-permanente-/,
  /^rolamento-/,
  /^caixa-de-ligacao-weg-/,
  /^base-motor-weg-/,
  /^base-weg-/,
  /^placa-borne-weg-/,
  /^protetor-termico-weg-/,
  /^tinta-weg-azul-(5002|5007|5009)-/,
  /^verniz-weg-(1303|1333|1314)-5l/,
  /^fita-linear-/,
  /^acamador-/,
  /^fio-aluminio-esmaltado-/,
  /^fio-de-cobre-esmaltado-/,
  /^resina-calas-/,
];

export function shouldHideForUnified(p: Product): boolean {
  const slug = p.slug?.toLowerCase() || "";
  return HIDDEN_PATTERNS.some((re) => re.test(slug));
}

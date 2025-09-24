// /lib/unified-derive.ts
import type { Product } from './products';

type Img = { src: string; alt: string };

const firstImg = (p?: Product): Img =>
  p?.images?.[0] || { src: '/polus-logo.svg', alt: '' };

export function deriveUnifiedFromProducts(products: Product[]): Product[] {
  const unified: Product[] = [];

  // ---------------------------
  // ROLAMENTOS (NSK/SKF e HCH) — ZZ / DDU
  // Slugs: rolamento-605-hch-ddu, rolamento-6004-nsk-zz, etc.
  // ---------------------------
  const reBearing = /^rolamento-(\d{3,4})-(nsk|skf|hch)-(ddu|zz)$/i;

  type Group = { slug: string; title: string; brand: string; items: Product[]; cover?: Img };
  const groups: Record<string, Group> = {
    'nsk-zz': { slug: 'rolamentos-nsk-zz', title: 'Rolamentos NSK/SKF ZZ', brand: 'NSK', items: [] },
    'nsk-ddu': { slug: 'rolamentos-nsk-ddu', title: 'Rolamentos NSK/SKF DDU', brand: 'NSK', items: [] },
    'hch-zz': { slug: 'rolamentos-hch-zz', title: 'Rolamentos HCH ZZ', brand: 'HCH', items: [] },
    'hch-ddu': { slug: 'rolamentos-hch-ddu', title: 'Rolamentos HCH DDU', brand: 'HCH', items: [] },
  };

  for (const p of products) {
    const m = p.slug.match(reBearing);
    if (!m) continue;
    const brandKey = (m[2].toLowerCase() === 'nsk' || m[2].toLowerCase() === 'skf') ? 'nsk' : 'hch';
    const seal = m[3].toLowerCase(); // zz | ddu
    const g = groups[`${brandKey}-${seal}`];
    if (!g) continue;
    if (!g.cover) g.cover = firstImg(p);
    g.items.push(p);
  }

  for (const g of Object.values(groups)) {
    if (!g.items.length) continue;
    unified.push({
      id: '',
      slug: g.slug,
      title: g.title,
      brand: g.brand,
      category: 'Rolamentos',
      subcategory: 'Rolamentos de Esferas',
      images: [g.cover!],
      variants: g.items
        .sort((a, b) => a.slug.localeCompare(b.slug))
        .map((item) => {
          const m = item.slug.match(reBearing)!;
          const serie = m[1];
          const ved = m[3].toUpperCase();
          return {
            id: item.slug,               // <- uso o slug do item para ocultação segura
            label: serie,                // 605, 6004, 6203...
            unit: 'un' as const,
            attrs: {
              series: serie,
              seal: ved,
              brand: g.brand,
              productSlug: item.slug,    // <- referência explícita
              image: item.images?.[0]?.src,
            },
          };
        }),
      techSpecs: null,
      shortDescription: null,
    });
  }

  // ---------------------------
  // VERNIZES WEG 5L — 1303, 1333, 1314 (Secagem Estufa)
  // ---------------------------
  const vernizes = products.filter((p) => /^verniz-weg-(1303|1333|1314).*5l/i.test(p.slug));
  if (vernizes.length) {
    const cover = firstImg(vernizes.find(v => /1303/.test(v.slug)) || vernizes[0]);
    unified.push({
      id: '',
      slug: 'vernizes-weg-5l',
      title: 'Vernizes WEG 5L',
      brand: 'WEG',
      category: 'Tintas e Vernizes',
      subcategory: 'Vernizes 5L',
      images: [cover],
      variants: vernizes
        .map((v) => {
          const code = v.slug.includes('1303') ? '1303' : v.slug.includes('1333') ? '1333' : '1314 (Secagem Estufa)';
          return {
            id: v.slug,
            label: code,
            unit: 'un' as const,
            attrs: { code, productSlug: v.slug, image: v.images?.[0]?.src },
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label)),
      techSpecs: null,
      shortDescription: null,
    });
  }

  // ---------------------------
  // BASES DE MOTOR WEG
  // ---------------------------
  const baseSlugs = [
    'base-motor-weg-42w-pequena',
    'base-motor-weg-48w-media',
    'base-motor-weg-56w-grande',
    'base-weg-56-extra-grande',
  ];
  const bases = products.filter((p) => baseSlugs.includes(p.slug));
  if (bases.length) {
    const cover = firstImg(bases.find(b => /42w/.test(b.slug)) || bases[0]);
    unified.push({
      id: '',
      slug: 'bases-motor-weg',
      title: 'Bases de Motor WEG',
      brand: 'WEG',
      category: 'Bases de Motor WEG',
      subcategory: '',
      images: [cover],
      variants: bases.map((b) => {
        const label =
          b.slug.includes('42w') ? '42W (Pequena)' :
          b.slug.includes('48w') ? '48W (Média)' :
          b.slug.includes('56w-grande') ? '56W (Grande)' :
          '56 (Extra Grande)';
        return {
          id: b.slug,
          label,
          unit: 'un' as const,
          attrs: { size: label, productSlug: b.slug, image: b.images?.[0]?.src },
        };
      }),
      techSpecs: null,
      shortDescription: null,
    });
  }

  // ---------------------------
  // (Opcional) FITAS LINEARES – 6/12/19/25mm
  // ---------------------------
  const fitas = products.filter((p) => /^fita-linear-\d+mm$/i.test(p.slug));
  if (fitas.length) {
    const cover = firstImg(fitas.find(f => /12mm/.test(f.slug)) || fitas[0]);
    unified.push({
      id: '',
      slug: 'fitas-lineares',
      title: 'Fitas Lineares',
      brand: 'Sem marca',
      category: 'Fitas Lineares',
      subcategory: '',
      images: [cover],
      variants: fitas
        .map((f) => {
          const mm = f.slug.match(/(\d+)mm/i)?.[1] || '';
          return {
            id: f.slug,
            label: `${mm} mm`,
            unit: 'm' as const,
            attrs: { sizeMM: mm, productSlug: f.slug, image: f.images?.[0]?.src },
          };
        })
        .sort((a, b) => Number(a.attrs?.sizeMM || 0) - Number(b.attrs?.sizeMM || 0)),
      techSpecs: null,
      shortDescription: null,
    });
  }

  return unified;
}

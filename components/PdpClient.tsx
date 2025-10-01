'use client';

import * as React from 'react';
import { useMemo, useState, useEffect, useCallback } from 'react';
import ProductGallery from './ProductGallery';

type BrandLogo = string | { light: string; dark: string };
type ImageLike = { src: string; alt?: string };
type VariantLike = { id: string; label: string; unit?: string; attrs?: Record<string, any> };

type EntityLike = {
  slug: string;
  title: string;
  brandLogo?: BrandLogo;
  category?: string;
  subcategory?: string;
  images?: ImageLike[] | string[];
  variants?: VariantLike[];
  description?: string;
  tech?: Record<string, string | number> | Array<[string, string | number]> | string;
  variantImagesMap?: Record<string, ImageLike[] | string[]>;
};

function asImageList(v?: ImageLike[] | string[]) {
  const arr = (v || []).map((it) => (typeof it === 'string' ? { src: it } : it)).filter(Boolean);
  const out: ImageLike[] = [];
  const seen = new Set<string>();
  for (const im of arr) {
    if (!im?.src || seen.has(im.src)) continue;
    seen.add(im.src);
    out.push({ src: im.src, alt: im.alt || '' });
  }
  return out;
}

// -------------------- Normalizadores de rótulos --------------------
function normalizeUFLabel(label: string) {
  // Exemplos: "2µF" -> "02uf"; "02 uF" -> "02uf"
  let s = (label || '').toLowerCase().trim();
  s = s.replace(/[μµ]/g, 'u');
  s = s.replace(/\s+/g, '');
  // mantém apenas [0-9a-z]
  s = s.replace(/[^0-9a-z]/g, '');
  // garante "xxuf"
  const m = s.match(/(\d{1,3})u?f/);
  if (m) {
    const n = m[1].padStart(2, '0');
    return `${n}uf`;
  }
  // fallback
  const d = s.match(/\d+/)?.[0] || '';
  return `${d.padStart(2, '0')}uf`;
}

function normalizeAWGLabel(label: string) {
  // Exemplos: "04/25 AWG" -> "04-25-awg"; "22 AWG" -> "22-awg"
  let s = (label || '').toLowerCase().trim();
  s = s.replace(/\s+/g, ' ');
  s = s.replace(/awg/i, '').trim();
  s = s.replace(/[^0-9a-z]+/g, '-'); // troca separadores por '-'
  s = s.replace(/^-+|-+$/g, '');
  if (!/awg$/.test(s)) s = `${s}-awg`;
  return s;
}

function normalizeMMLabel(label: string) {
  // Exemplos: "4,50 mm" -> "4-50mm", "1,00 mm" -> "1-00mm", "8 mm" -> "8mm"
  let s = (label || '').toLowerCase();
  s = s.replace(',', '.').replace(/\s/g, '');
  const m = s.match(/(\d+(?:\.\d+)?)mm/);
  if (!m) return s.replace(/[^0-9a-z-]/g, '');
  const num = m[1];
  if (num.includes('.')) {
    const [i, d] = num.split('.');
    const dec = (d || '').padEnd(2, '0').slice(0, 2);
    return `${i}-${dec}mm`;
  }
  return `${num}mm`;
}

// -------------------- Heurística para achar imagens por variação --------------------
function guessVariantImages(entity: EntityLike, variant: VariantLike): ImageLike[] {
  // 1) Se existir um mapa explícito (variantImagesMap), usa com prioridade
  if (entity.variantImagesMap && entity.variantImagesMap[variant.id]) {
    return asImageList(entity.variantImagesMap[variant.id]);
  }

  const baseImgs = asImageList(entity.images);
  const slug = (entity.slug || '').toLowerCase();
  const title = (entity.title || '').toLowerCase();
  const category = (entity.category || '').toLowerCase();
  const label = (variant?.label || '').toLowerCase();

  // ------ CAPACITORES PERMANENTES (250V / 380-400VAC / 440-450VAC) ------
  const isCapPerm =
    /capacitor/.test(slug + ' ' + title + ' ' + category) &&
    /(permanente|permanentes)/.test(slug + ' ' + title + ' ' + category);

  if (isCapPerm) {
    const l = normalizeUFLabel(label); // "02uf"
    // Descobrir a família pela tensão olhando slug/title/category
    const hay = slug + ' ' + title + ' ' + category;
    let prefix = '';
    if (/250\s*v|250v/.test(hay)) prefix = 'capacitor-permanente-250v-';
    else if (/(380|400)\s*vac|380-400/.test(hay)) prefix = 'capacitor-permanente-380-400vac-';
    else if (/(440|450)\s*vac|440-450/.test(hay)) prefix = 'capacitor-permanente-440-450vac-';

    if (prefix) {
      const g1 = `/produtos/${prefix}${l}-1.webp`;
      const g2 = `/produtos/${prefix}${l}-2.webp`;
      // Retorna as imagens candidatas primeiro (a galeria valida/carrega com onload)
      return [
        { src: g1, alt: `${entity.title} ${variant.label}` },
        { src: g2, alt: `${entity.title} ${variant.label}` },
        ...baseImgs
      ];
    }
  }

  // ------ FIOS (COBRE/ALUMÍNIO) por AWG ------
  const isWire = /fio-|fio /.test(slug + ' ' + title) || /fio/.test(category);
  if (isWire && /awg/i.test(label)) {
    const awg = normalizeAWGLabel(label); // "04-25-awg", "22-awg", etc.
    const isAlu = /(aluminio|alumínio)/.test(slug + ' ' + title + ' ' + category);
    const base = isAlu ? 'fio-aluminio-esmaltado-' : 'fio-cobre-esmaltado-';
    const g1 = `/produtos/${base}${awg}-1.webp`;
    const g2 = `/produtos/${base}${awg}-2.webp`;
    return [
      { src: g1, alt: `${entity.title} ${variant.label}` },
      { src: g2, alt: `${entity.title} ${variant.label}` },
      ...baseImgs
    ];
  }

  // ------ ESPAGUETES (se tiverem imagens específicas por diâmetro; senão cai no fallback) ------
  const isHose = /(espaguete|espagueti)/.test(slug + ' ' + title + ' ' + category);
  if (isHose) {
    const mm = normalizeMMLabel(label); // "1-00mm" ou "8mm"
    // Tente múltiplos prefixos que você usa no /public/produtos
    const prefixes = [
      'espaguete-flexnor-130c-',
      'espaguete-silicone-200c-',
      'espaguete-fiberglass-',
      'espaguetes-flexpoli-155-',
    ];
    const guesses: ImageLike[] = [];
    for (const p of prefixes) {
      guesses.push({ src: `/produtos/${p}${mm}-1.webp`, alt: `${entity.title} ${variant.label}` });
      guesses.push({ src: `/produtos/${p}${mm}-2.webp`, alt: `${entity.title} ${variant.label}` });
    }
    if (guesses.length) return [...guesses, ...baseImgs];
  }

  // Fallback global: mantém imagens padrão
  return baseImgs;
}

// -------------------- Marca (logo) --------------------
function BrandLogoNode({ logo }: { logo?: BrandLogo }) {
  if (!logo) return null;
  if (typeof logo === 'string') {
    return <img src={logo} alt="logo da marca" className="h-6 w-auto object-contain" loading="lazy" decoding="async" />;
  }
  return (
    <picture>
      <source srcSet={logo.dark} media="(prefers-color-scheme: dark)" />
      <img src={logo.light} alt="logo da marca" className="h-6 w-auto object-contain" loading="lazy" decoding="async" />
    </picture>
  );
}

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

type PdpClientProps = {
  entity: EntityLike;
  similar?: Array<{ slug: string; title: string; brandLogo?: BrandLogo; images?: ImageLike[] | string[] }>;
};

export default function PdpClient({ entity, similar }: PdpClientProps) {
  const variants = useMemo<VariantLike[]>(() => entity.variants || [], [entity]);
  const [showVariants, setShowVariants] = useState(false);
  const [selected, setSelected] = useState<VariantLike | null>(variants[0] || null);

  // Zera seleção quando trocar de produto
  useEffect(() => {
    setSelected(variants[0] || null);
  }, [entity.slug]); // eslint-disable-line

  // Monta lista de imagens para a variação selecionada (ou padrão)
  const galleryImages = useMemo<ImageLike[]>(() => {
    if (selected) return guessVariantImages(entity, selected);
    return asImageList(entity.images);
  }, [entity, selected]);

  const handleSelectVariant = useCallback((v: VariantLike) => {
    setSelected(v);
    setShowVariants(false);
  }, []);

  const whatsappHref = useMemo(() => {
    const text = selected ? `${entity.title} — ${selected.label}` : entity.title;
    return `https://wa.me/551135992935?text=${encodeURIComponent('Quero cotação de: ' + text)}`;
  }, [entity.title, selected]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      {/* Galeria */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 md:p-4">
        {/* A troca de variação força recomputar as imagens e a ProductGallery faz crossfade */}
        <ProductGallery key={selected?.id || 'no-variant'} images={galleryImages} title={entity.title} />
      </div>

      {/* Infos */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {entity.title}
          </h1>
          <div className="shrink-0">
            <BrandLogoNode logo={entity.brandLogo} />
          </div>
        </div>

        {entity.category && (
          <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {entity.category}
            {entity.subcategory ? ` · ${entity.subcategory}` : ''}
          </div>
        )}

        {/* Ações */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {variants.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowVariants(true)}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition"
              >
                Selecionar variação
              </button>
              {selected && (
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  Selecionada: <strong>{selected.label}</strong>
                </span>
              )}
            </>
          )}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-semibold shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition"
          >
            Pedir cotação via WhatsApp
          </a>
        </div>

        {/* Descrição */}
        {entity.description && (
          <div className="prose prose-zinc dark:prose-invert max-w-none mt-2">
            <p>{entity.description}</p>
          </div>
        )}

        {/* Informações técnicas */}
        {entity.tech && (
          <div className="mt-2">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200 mb-1">
              Informações técnicas
            </div>
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {Array.isArray(entity.tech) ? (
                <table className="w-full text-sm">
                  <tbody>
                    {entity.tech.map((row, idx) => (
                      <tr key={idx} className={idx % 2 ? 'bg-zinc-50 dark:bg-zinc-900/40' : ''}>
                        <td className="py-2 px-3 text-zinc-600 dark:text-zinc-300">{row[0]}</td>
                        <td className="py-2 px-3 text-zinc-800 dark:text-zinc-100">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : typeof entity.tech === 'string' ? (
                <div className="p-3 text-sm text-zinc-700 dark:text-zinc-200">{entity.tech}</div>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(entity.tech as Record<string, any>).map(([k, v], idx) => (
                      <tr key={k} className={idx % 2 ? 'bg-zinc-50 dark:bg-zinc-900/40' : ''}>
                        <td className="py-2 px-3 text-zinc-600 dark:text-zinc-300">{k}</td>
                        <td className="py-2 px-3 text-zinc-800 dark:text-zinc-100">
                          {typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Semelhantes */}
        {similar && similar.length > 0 && (
          <div className="pt-2">
            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-100 mb-2">Produtos semelhantes</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {similar.map((s) => {
                const sims = asImageList(s.images);
                return (
                  <a
                    key={s.slug}
                    href={`/produto/${s.slug}`}
                    className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded bg-zinc-50 dark:bg-zinc-800 overflow-hidden flex items-center justify-center">
                        <img
                          src={sims[0]?.src || '/polus-logo.svg'}
                          alt={s.slug}
                          className="w-full h-full object-contain group-hover:scale-105 transition"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-zinc-800 dark:text-zinc-100 line-clamp-2">
                          {s.title}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal de variações */}
      {variants.length > 0 && (
        <div
          className={cx(
            'fixed inset-0 z-50 flex items-end sm:items-center justify-center',
            showVariants ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
          role="dialog"
          aria-modal="true"
          onClick={() => setShowVariants(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity" />
          <div
            className="relative z-10 m-2 w-full max-w-lg rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Selecione uma variação
              </div>
              <button
                className="px-2 py-1 rounded-md text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200"
                onClick={() => setShowVariants(false)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="p-3 max-h-[60vh] overflow-auto grid grid-cols-2 sm:grid-cols-3 gap-2">
              {variants.map((v) => {
                const active = v.id === selected?.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleSelectVariant(v)}
                    className={cx(
                      'px-3 py-2 rounded-md border text-sm text-left transition',
                      active
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
                        : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
                    )}
                    aria-pressed={active}
                  >
                    <div className="font-medium">{v.label}</div>
                    {v.unit && <div className="text-xs opacity-70 mt-0.5">Unid.: {v.unit}</div>}
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 text-right">
              <button
                onClick={() => setShowVariants(false)}
                className="px-4 py-2 rounded-md text-sm font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

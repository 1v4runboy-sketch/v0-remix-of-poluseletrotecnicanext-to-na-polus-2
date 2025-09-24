'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/components/CartProvider';

type Variant = {
  id: string;
  label: string;
  unit?: 'm' | 'kg' | 'un';
  minQty?: number;
  stepQty?: number;
  attrs?: Record<string, any>;
};

function unitLabel(u?: 'm'|'kg'|'un') {
  if (u === 'm')  return 'metros';
  if (u === 'kg') return 'kg';
  return 'un';
}

/* ---------------- helpers de normalização ---------------- */
function labelUFVAC(v?: Variant) {
  const uf = String(v?.attrs?.UF || '').toUpperCase().trim();
  const vac = String(v?.attrs?.VAC || '').toUpperCase().trim();
  if (uf && vac) return `${uf} ${vac}`;
  if (uf) return uf;
  return '';
}

/** Extrai “63/71”, “90/100”, “112/132”, “160/180” ou “200” do label/slug. */
function caixaModel(label: string, slug: string) {
  const s = `${label} ${slug}`.toLowerCase();
  const pair = s.match(/(\d{2,3})\s*[/\-]\s*(\d{2,3})/);
  if (pair) return `${pair[1]}/${pair[2]}`;
  const single = s.match(/(?:^|\D)(\d{3})(?:\D|$)/); // “200”
  if (single) return single[1];
  return '';
}

/** Normaliza Base de Motor: 42W (Pequena) / 48W (Média) / 56W (Grande) / 56H (Extragrande) */
function baseModel(label: string, slug: string) {
  const s = `${label} ${slug}`.toLowerCase();
  const code = s.match(/\b(\d{2}[a-z]?)w\b/);          // 42w / 48w / 56w / 56h
  let size = '';
  if (/extra[\s-]?grande/.test(s)) size = 'Extragrande';
  else if (/m[eé]dia/.test(s))     size = 'Média';
  else if (/grande/.test(s))       size = 'Grande';
  else if (/pequena/.test(s))      size = 'Pequena';

  if (code) {
    const cod = code[1].toUpperCase();
    return size ? `Base de Motor WEG ${cod} (${size})` : `Base de Motor WEG ${cod}`;
  }
  return label.replace(/^bases?\s+para\s+motores\s+[-–]\s*/i,'').trim();
}

/** Extrai K1M… das placas de borne */
function placaBorneModel(label: string, slug: string) {
  const s = `${label} ${slug}`.toUpperCase().replace(/-/g,' ');
  const m = s.match(/\bK\s*1\s*M\s*(\d{1,2})\b/) || s.match(/\bK1M(\d{1,2})\b/);
  if (m) return `K1M${m[1]}`;
  const via = s.match(/(\d{1,3})\s*VIAS/); if (via) return `${via[1]} VIAS`;
  const pol = s.match(/(\d{1,3})\s*POLOS/); if (pol) return `${pol[1]} POLOS`;
  return label.replace(/^placa\s+borne\s+weg\s+/i,'').trim();
}

/** Monta um “modelo/sigla” para usar após “—” em TODAS as famílias. */
function modelFromVariant(product: any, v: Variant) {
  const title = String(product?.title || '').toLowerCase();
  const cat   = String(product?.category || '').toLowerCase();
  const sub   = String(product?.subcategory || '').toLowerCase();

  const code  = (v?.attrs?.code  || '').toString().trim();
  const model = (v?.attrs?.model || '').toString().trim();
  const ufvac = labelUFVAC(v);
  const awg   = (v?.attrs?.awg   || '').toString().trim();
  const mm    = (v?.attrs?.size_mm || '').toString().trim();
  const pol   = (v?.attrs?.size_in || '').toString().trim();
  const vol   = (v?.attrs?.volume  || '').toString().trim();

  if (code)  return code;
  if (model) return model;
  if (ufvac) return ufvac;

  if (cat.includes('caixas de ligacao') || title.includes('caixa de ligação')) {
    const m = caixaModel(v.label, v.id);
    if (m) return m;
  }

  if (title.includes('base') || cat.includes('base')) {
    const m = baseModel(v.label, v.id);
    if (m) return m;
  }

  if (title.includes('placas de borne') || sub.includes('borne')) {
    const m = placaBorneModel(v.label, v.id);
    if (m) return m;
  }

  if (awg) return `AWG ${awg}`;
  if (mm)  return `${mm} mm`;
  if (pol) return pol;
  if (vol) return vol;

  const base = String(product?.title || '').trim();
  return String(v.label || '').replace(new RegExp(`^${base}\\s*`, 'i'), '').replace(/\s{2,}/g,' ').trim();
}

/** EXIBIÇÃO: "Nome do produto — MODELO/SIGLA" */
function optionText(product: any, v: Variant) {
  const base  = String(product?.title || product?.slug || '').trim();
  const model = modelFromVariant(product, v);
  return model ? `${base} — ${model}` : base;
}

/* ---------------- componente ---------------- */
export default function AddToCart({
  product,
  compact = false,
  selectedVariantId,
  onVariantChange,
}:{
  product:any;
  compact?: boolean;
  selectedVariantId?: string;
  onVariantChange?: (variantId:string)=>void;
}) {
  const cart = useCart();

  const variants: Variant[] = useMemo(() => {
    const v = Array.isArray(product?.variants) ? product.variants : [];
    return v.map((it:any) => ({
      id: String(it.id ?? it.slug ?? it.label ?? ''),
      label: String(it.label ?? it.title ?? it.name ?? '').trim() || 'Variação',
      unit: (it.unit === 'm' || it.unit === 'kg') ? it.unit : (it.unit === 'un' ? 'un' : undefined),
      minQty: typeof it.minQty === 'number' ? Math.max(1, Math.floor(it.minQty)) : undefined,
      stepQty: typeof it.stepQty === 'number' ? Math.max(1, Math.floor(it.stepQty)) : undefined,
      attrs: it.attrs || {},
    }));
  }, [product]);

  const inferredUnit: 'm'|'kg'|'un' = useMemo(() => {
    const cat = String(product?.category || '').toLowerCase();
    if (cat.includes('cabo')) return 'm';
    if (cat.includes('fio'))  return 'kg';
    return 'un';
  }, [product?.category]);

  const firstVariant = variants[0];
  const [innerSelId, setInnerSelId] = useState<string>(selectedVariantId || firstVariant?.id || '');
  useEffect(()=> { if (selectedVariantId && selectedVariantId !== innerSelId) setInnerSelId(selectedVariantId); }, [selectedVariantId]);

  const selId = (selectedVariantId ?? innerSelId);
  const currentVariant = useMemo<Variant | null>(
    () => variants.find(v => v.id === selId) || (variants.length ? variants[0] : null),
    [variants, selId]
  );

  const isCadarco = product?.metaCollection?.type === 'cadarcos' || String(product?.subcategory || '').toLowerCase().includes('cadar');
  const isWires   = product?.metaCollection?.type === 'wires' || String(product?.category || '').toLowerCase().includes('fios');

  const unit: 'm'|'kg'|'un' = (currentVariant?.unit || inferredUnit);
  const minQty = currentVariant?.minQty ?? (unit === 'm' || unit === 'kg' ? 1 : 1);
  const stepQty = currentVariant?.stepQty ?? 1;

  const [qty, setQty] = useState<number>(minQty);
  useEffect(() => { setQty(minQty); }, [minQty, selId]);

  function changeVariant(id:string){
    if (onVariantChange) onVariantChange(id);
    else setInnerSelId(id);
  }

  function add() {
    const v = currentVariant ? {
      id: currentVariant.id,
      label: currentVariant.label,
      unit,
      attrs: { ...(currentVariant.attrs || {}), display: optionText(product, currentVariant) },
    } : { id: '', label: '', unit };

    const safeQty = Math.max(minQty, Math.floor(Number(qty) || minQty));
    cart.add(product, safeQty, v as any);
    cart.open();
    try { window.dispatchEvent(new Event('polus:cart:open')); } catch {}
  }

  const selectLabel = isCadarco ? 'Medidas' : isWires ? 'Bitola (AWG)' : 'Variação';

  return (
    <div className={compact ? '' : 'rounded-xl ring-1 ring-zinc-200/70 dark:ring-white/10 p-4 bg-white dark:bg-zinc-900'}>
      {!compact && <h3 className="text-sm font-semibold mb-2">Cotação</h3>}

      {variants.length > 0 && (
        <div className="mb-3">
          <label htmlFor="variant" className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {selectLabel}
          </label>
          <select
            id="variant"
            value={currentVariant?.id || ''}
            onChange={(e)=> changeVariant(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2 text-sm"
          >
            {variants.map(v => (
              <option key={v.id} value={v.id}>{optionText(product, v)}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="qty" className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
            Quantidade ({unitLabel(unit)}) {minQty > 1 ? `(mín. ${minQty})` : ''}
          </label>
          <input
            id="qty"
            type="number"
            min={minQty}
            step={stepQty}
            inputMode="numeric"
            value={qty}
            onChange={(e)=> setQty(Math.max(minQty, Math.floor(Number(e.target.value || minQty))))}
            className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2 text-sm"
          />
        </div>

        <button
          onClick={add}
          className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-semibold shadow hover:bg-emerald-700"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

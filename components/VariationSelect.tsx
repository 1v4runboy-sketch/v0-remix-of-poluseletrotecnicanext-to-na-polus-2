'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';

type Variant = {
  id: string;
  label: string;
  unit?: string;
  attrs?: { childSlug?: string; [k: string]: any };
};

type ProductLike = {
  slug: string;
  title: string;
  variants?: Variant[];
};

type ChildMinimal = {
  slug: string;
  title?: string;
  images?: { src: string; alt?: string }[];
  techSpecs?: Record<string, any> | null;
};

type Props = {
  product: ProductLike;
  selectedId?: string;
  onChange?: (variant: Variant) => void;
  // childLookup: somente os filhos utilizados por este produto
  childLookup?: Record<string, ChildMinimal | undefined>;
  buttonLabel?: string; // ex.: "Selecionar Medida"
};

function classNames(...xs: (string | false | null | undefined)[]) {
  return xs.filter(Boolean).join(' ');
}

export default function VariationSelect({
  product,
  selectedId,
  onChange,
  childLookup = {},
  buttonLabel = 'Selecionar variação',
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const variants = product.variants ?? [];

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedId) ?? variants[0],
    [variants, selectedId]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return variants;
    return variants.filter((v) => v.label.toLowerCase().includes(q));
  }, [variants, query]);

  // Fecha ao clicar fora
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as HTMLElement;
      if (buttonRef.current && buttonRef.current.contains(target)) return;
      const pop = document.getElementById('variation-popover');
      if (pop && pop.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [open]);

  const handleSelect = (v: Variant) => {
    startTransition(() => {
      onChange?.(v);
      setOpen(false);
    });
  };

  const label = selectedVariant ? selectedVariant.label : buttonLabel;

  return (
    <div className="relative inline-block w-full max-w-xl">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={classNames(
          'w-full select-none rounded-lg border border-emerald-500/70 bg-white/70 px-4 py-2 text-left text-sm font-medium text-emerald-900 shadow-sm',
          'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
          'dark:bg-emerald-900/20 dark:text-emerald-100 dark:border-emerald-400/70'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="truncate">{label}</span>
          <svg
            className={classNames(
              'h-4 w-4 transition-transform',
              open ? 'rotate-180' : 'rotate-0'
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
          </svg>
        </div>
      </button>

      {open && (
        <div
          id="variation-popover"
          className={classNames(
            'absolute z-40 mt-2 w-[min(640px,92vw)] rounded-xl border border-neutral-200/70 bg-white/95 p-3 shadow-2xl backdrop-blur',
            'dark:bg-neutral-900/90 dark:border-neutral-800/80'
          )}
        >
          <div className="mb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar variações…"
              className={classNames(
                'w-full rounded-md border border-neutral-300 px-3 py-2 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400',
                'dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100'
              )}
            />
          </div>

          <ul
            role="listbox"
            aria-activedescendant={selectedVariant?.id}
            className="grid max-h-[52vh] grid-cols-1 gap-2 overflow-auto p-1 sm:grid-cols-2"
          >
            {filtered.map((v) => {
              const isActive = v.id === selectedVariant?.id;
              const hasChild = !!v.attrs?.childSlug;
              const hasImage = hasChild && childLookup[v.attrs!.childSlug!]?.images?.length;
              return (
                <li key={v.id} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => handleSelect(v)}
                    className={classNames(
                      'group w-full rounded-lg border px-3 py-2 text-left text-sm transition-all',
                      'hover:-translate-y-0.5 hover:shadow-md',
                      isActive
                        ? 'border-emerald-500 ring-2 ring-emerald-400/60 dark:ring-emerald-300/50'
                        : 'border-neutral-200 dark:border-neutral-800',
                      'bg-white/70 dark:bg-neutral-900/70'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={classNames(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-md border',
                          hasImage
                            ? 'border-emerald-300/60 bg-emerald-50/70 dark:bg-emerald-900/20'
                            : 'border-neutral-200 dark:border-neutral-800'
                        )}
                        title={hasImage ? 'Esta variação tem imagem própria' : 'Imagem herdada do produto'}
                      >
                        {hasImage ? (
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                            IMG
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-500">—</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div
                          className={classNames(
                            'truncate font-medium',
                            isActive ? 'text-emerald-800 dark:text-emerald-200' : 'text-neutral-900 dark:text-neutral-100'
                          )}
                        >
                          {v.label}
                        </div>
                        {v.unit && (
                          <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                            Unidade: {v.unit}
                          </div>
                        )}
                        {hasChild && (
                          <div className="mt-0.5 truncate text-xs text-neutral-400">
                            código: {v.attrs!.childSlug}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex items-center justify-between">
            <div
              className={classNames(
                'text-xs',
                isPending ? 'text-emerald-600 dark:text-emerald-300' : 'text-neutral-500 dark:text-neutral-400'
              )}
            >
              {isPending ? 'Aplicando variação…' : `${filtered.length} variação(ões)`}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800/60"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

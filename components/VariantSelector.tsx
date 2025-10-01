// components/VariantSelector.tsx
'use client';

import * as React from 'react';

type Variant = { id: string; label: string; attrs?: Record<string, any> };

export default function VariantSelector({
  variants,
  value,
  onChange,
}: {
  variants: Variant[];
  value: Variant | null;
  onChange: (v: Variant | null) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        onClick={() => setOpen((s) => !s)}
      >
        {value ? `Selecionado: ${value.label}` : 'Ver modelos disponíveis'}
      </button>

      {open && (
        <div className="mt-3 max-h-64 overflow-auto rounded-md border border-slate-200 bg-white p-2 shadow dark:border-slate-700 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {variants.map((v) => {
              const active = value?.id === v.id;
              return (
                <button
                  key={v.id}
                  className={[
                    'rounded-md border px-3 py-2 text-sm text-left transition-colors',
                    active
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-200',
                  ].join(' ')}
                  onClick={() => {
                    onChange(v);
                    setOpen(false);
                  }}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

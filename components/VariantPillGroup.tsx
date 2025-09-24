// /components/VariantPillGroup.tsx
"use client";

export default function VariantPillGroup({
  variants,
  activeId,
  onChange,
}: {
  variants: { id: string; label: string }[];
  activeId?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => {
        const active = v.id === activeId;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className={
              "rounded-full border px-3 py-1 text-sm transition " +
              (active
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400 dark:border-white/10 dark:bg-white/5 dark:text-neutral-100")
            }
          >
            {v.label}
          </button>
        );
      })}
    </div>
  );
}

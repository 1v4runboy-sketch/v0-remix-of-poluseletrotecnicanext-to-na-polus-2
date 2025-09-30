'use client';

import { useEffect, useMemo, useState } from 'react';
import FadeImage from './FadeImage';

type Img = { src: string; alt?: string };

type Props = {
  images?: Img[];
  className?: string;
  thumbCols?: number; // default 5
};

export default function ProductGallery({ images = [], className = '', thumbCols = 5 }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [images?.[0]?.src]);

  const thumbs = useMemo(() => images.slice(0, 8), [images]);

  if (!images.length) {
    return (
      <div className="rounded-lg border border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        Sem imagens disponíveis
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-900">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          <FadeImage
            key={images[active]?.src}
            src={images[active]?.src}
            alt={images[active]?.alt || 'Produto'}
            className="h-full w-full"
            imgClassName="hover:scale-[1.03] transition-transform duration-500 ease-out"
            rounded="rounded-lg"
            priority
          />
        </div>
      </div>

      {thumbs.length > 1 && (
        <div
          className={`mt-3 grid gap-2`}
          style={{ gridTemplateColumns: `repeat(${thumbCols}, minmax(0, 1fr))` }}
        >
          {thumbs.map((im, i) => {
            const isActive = i === active;
            return (
              <button
                key={im.src + i}
                onClick={() => setActive(i)}
                className={[
                  'relative aspect-square overflow-hidden rounded-lg border transition-all',
                  isActive
                    ? 'border-emerald-500 ring-2 ring-emerald-400/60'
                    : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700',
                ].join(' ')}
                aria-label={`Miniatura ${i + 1}`}
              >
                <img
                  src={im.src}
                  alt={im.alt || 'Miniatura'}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

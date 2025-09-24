// components/ImageCarousel.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

type Img = { src: string; alt?: string };

export default function ImageCarousel({ images }: { images: Img[] }) {
  const valid = (images || []).filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [broken, setBroken] = useState(false);

  if (!valid.length) return null;

  const prev = () => { setBroken(false); setIdx((i) => (i - 1 + valid.length) % valid.length); };
  const next = () => { setBroken(false); setIdx((i) => (i + 1) % valid.length); };

  const current = valid[idx];

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60">
      <div className="relative aspect-[4/3]">
        <Image
          key={`${current.src}-${broken ? 'fallback' : 'ok'}`}
          src={broken ? '/polus-logo.svg' : current.src}
          alt={current.alt || ''}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
          priority={false}
          onError={() => setBroken(true)}
        />
      </div>

      {valid.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white w-9 h-9 grid place-items-center hover:bg-black/70"
            aria-label="Anterior"
          >‹</button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white w-9 h-9 grid place-items-center hover:bg-black/70"
            aria-label="Próxima"
          >›</button>
        </>
      )}
    </div>
  );
}

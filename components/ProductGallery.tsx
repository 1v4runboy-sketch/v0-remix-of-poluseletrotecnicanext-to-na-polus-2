// components/ProductGallery.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export type GalleryImage = { src: string; alt?: string };

type Props = {
  images: GalleryImage[];
  title: string;
};

export default function ProductGallery({ images, title }: Props) {
  const pics = useMemo(() => images?.length ? images : [{ src: "/polus-placeholder.webp", alt: title }], [images, title]);
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx((i) => (i - 1 + pics.length) % pics.length), [pics.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % pics.length), [pics.length]);

  // teclado
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next]);

  // pré-carregar próxima imagem
  useEffect(() => {
    const n = new Image();
    n.src = pics[(idx + 1) % pics.length]?.src ?? "";
  }, [idx, pics]);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Image
          key={pics[idx].src}
          src={pics[idx].src}
          alt={pics[idx].alt || title}
          fill
          className="object-contain p-4 transition-opacity duration-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {pics.length > 1 && (
          <>
            <button
              aria-label="Imagem anterior"
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-zinc-800 shadow hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-100"
            >
              ‹
            </button>
            <button
              aria-label="Próxima imagem"
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-zinc-800 shadow hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      {pics.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
          {pics.slice(0, 12).map((img, i) => (
            <button
              key={img.src + i}
              onClick={() => setIdx(i)}
              className={`relative aspect-square overflow-hidden rounded border ${i === idx ? "border-sky-500" : "border-zinc-200 dark:border-white/10"}`}
              aria-label={`Miniatura ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt || title} className="h-full w-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

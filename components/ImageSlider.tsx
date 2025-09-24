// /components/ImageSlider.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
type Img = { src: string; alt: string };

export default function ImageSlider({ images }: { images: Img[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: "smooth" });
  };

  if (!images?.length) return null;

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory scroll-px-4 items-center gap-4 overflow-x-auto rounded-2xl border border-neutral-200 p-3 dark:border-white/10"
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative h-[320px] w-full shrink-0 snap-center md:h-[420px] md:w-[560px]">
            <Image
              src={img.src}
              alt={img.alt || "Imagem do produto"}
              fill
              className="object-contain"
              sizes="(max-width:768px) 100vw, 560px"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 shadow backdrop-blur hover:scale-[1.03] dark:bg-black/40"
        aria-label="Imagem anterior"
      >
        ‹
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 shadow backdrop-blur hover:scale-[1.03] dark:bg-black/40"
        aria-label="Próxima imagem"
      >
        ›
      </button>
    </div>
  );
}

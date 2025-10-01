'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

type ImageLike = { src: string; alt?: string };

type Props = {
  images: ImageLike[];
  title: string;
};

function preload(src: string) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

export default function ProductGallery({ images, title }: Props) {
  // Normaliza/garante lista única e válida
  const imgs = useMemo(() => {
    const arr = (images || []).filter(Boolean);
    const seen = new Set<string>();
    const out: ImageLike[] = [];
    for (const im of arr) {
      const src = im?.src || '';
      if (!src || seen.has(src)) continue;
      seen.add(src);
      out.push({ src, alt: im.alt || title });
    }
    return out.length ? out : [{ src: '/polus-logo.svg', alt: title }];
  }, [images, title]);

  const [index, setIndex] = useState(0);
  const [displaySrc, setDisplaySrc] = useState(imgs[0]?.src || '');
  const [displayAlt, setDisplayAlt] = useState(imgs[0]?.alt || title);
  const [loading, setLoading] = useState(false);

  // Sempre que a lista de imagens muda (variação trocada), zera o índice e atualiza o display com crossfade
  useEffect(() => {
    setIndex(0);
    const first = imgs[0];
    if (!first) return;
    setLoading(true);
    const im = new Image();
    im.onload = () => {
      setDisplaySrc(first.src);
      setDisplayAlt(first.alt || title);
      setLoading(false);
    };
    im.onerror = () => {
      setDisplaySrc('/polus-logo.svg');
      setDisplayAlt(title);
      setLoading(false);
    };
    im.src = first.src;
    // Pré‑carrega as próximas
    if (imgs[1]) preload(imgs[1].src);
  }, [imgs, title]);

  // Pré-carrega anterior e próxima da imagem atual
  useEffect(() => {
    const n = imgs.length;
    if (n <= 1) return;
    const next = (index + 1) % n;
    const prev = (index - 1 + n) % n;
    if (imgs[next]) preload(imgs[next].src);
    if (imgs[prev]) preload(imgs[prev].src);
  }, [index, imgs]);

  const go = (dir: 1 | -1) => {
    setIndex((i) => {
      const n = imgs.length;
      const ni = (i + dir + n) % n;
      setLoading(true);
      const im = new Image();
      im.onload = () => {
        setDisplaySrc(imgs[ni].src);
        setDisplayAlt(imgs[ni].alt || title);
        setLoading(false);
      };
      im.onerror = () => {
        setDisplaySrc(imgs[0].src);
        setDisplayAlt(imgs[0].alt || title);
        setLoading(false);
      };
      im.src = imgs[ni].src;
      return ni;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Imagem principal com crossfade */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white dark:bg-zinc-900">
        <img
          key={'main-' + displaySrc}
          src={displaySrc}
          alt={displayAlt}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          decoding="async"
          loading="eager"
        />
        {loading && (
          <div className="absolute inset-0 grid place-content-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent" />
          </div>
        )}

        {imgs.length > 1 && (
          <>
            <button
              aria-label="Imagem anterior"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 dark:bg-zinc-800/80 shadow hover:bg-white dark:hover:bg-zinc-800 transition"
            >
              ‹
            </button>
            <button
              aria-label="Próxima imagem"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 dark:bg-zinc-800/80 shadow hover:bg-white dark:hover:bg-zinc-800 transition"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbs */}
      {imgs.length > 1 && (
        <div className="grid grid-cols-6 gap-2">
          {imgs.map((im, i) => (
            <button
              key={im.src + i}
              onClick={() => {
                setLoading(true);
                const img = new Image();
                img.onload = () => {
                  setIndex(i);
                  setDisplaySrc(im.src);
                  setDisplayAlt(im.alt || title);
                  setLoading(false);
                };
                img.onerror = () => setLoading(false);
                img.src = im.src;
              }}
              className={`aspect-square overflow-hidden rounded-md border transition ${
                i === index
                  ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
              }`}
              aria-pressed={i === index}
            >
              <img
                src={im.src}
                alt={im.alt || title}
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {/* Dots */}
      {imgs.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {imgs.map((_, i) => (
            <button
              key={'dot-' + i}
              onClick={() => go((i - index) as 1 | -1)}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-emerald-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              aria-label={`Ir para imagem ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

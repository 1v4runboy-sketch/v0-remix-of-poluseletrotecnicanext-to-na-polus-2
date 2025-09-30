'use client';

import { useEffect, useState } from 'react';

type FadeImageProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  rounded?: string; // ex.: 'rounded-lg'
  priority?: boolean;
};

export default function FadeImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  rounded = 'rounded-md',
  priority = false,
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className={`relative ${rounded} ${className}`}>
      {!loaded && (
        <div
          aria-hidden
          className={`absolute inset-0 ${rounded} animate-pulse bg-neutral-200/70 dark:bg-neutral-800/60`}
        />
      )}

      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        className={`w-full h-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${rounded} ${imgClassName}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

'use client';
import { useEffect, useRef } from 'react';

export default function CenterOnMount({
  selector = '#product-gallery',
  offset = 24,
}: { selector?: string; offset?: number; }) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    const el = (typeof document !== 'undefined' ? document.querySelector(selector) as HTMLElement | null : null);
    if (!el) return;

    const hasHash = (typeof location !== 'undefined') && location.hash === selector;
    let cameFromCard = false; try { cameFromCard = sessionStorage.getItem('focusOnImage') === '1'; } catch {}

    if (!hasHash && !cameFromCard) return;
    ran.current = true;

    let cancel = false;
    const canceler = () => { cancel = true; };
    window.addEventListener('wheel', canceler, { passive: true });
    window.addEventListener('touchstart', canceler, { passive: true });
    window.addEventListener('keydown', canceler, { passive: true });
    window.addEventListener('scroll', canceler, { passive: true });

    const centerOnce = () => {
      if (cancel) return;
      try {
        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top + rect.height/2 - window.innerHeight/2 - offset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      } catch {}
    };

    const r1 = requestAnimationFrame(centerOnce);
    const t2 = setTimeout(centerOnce, 120);
    const t3 = setTimeout(centerOnce, 300);
    const t4 = setTimeout(centerOnce, 600);

    const imgs = Array.from(el.querySelectorAll('img')) as HTMLImageElement[];
    const onLoad = () => setTimeout(centerOnce, 50);
    imgs.forEach(img => { if (!img.complete) img.addEventListener('load', onLoad, { once: true }); });

    try { sessionStorage.removeItem('focusOnImage'); } catch {}

    return () => {
      cancelAnimationFrame(r1 as any);
      clearTimeout(t2 as any); clearTimeout(t3 as any); clearTimeout(t4 as any);
      window.removeEventListener('wheel', canceler);
      window.removeEventListener('touchstart', canceler);
      window.removeEventListener('keydown', canceler);
      window.removeEventListener('scroll', canceler);
      imgs.forEach(img => img.removeEventListener('load', onLoad));
    };
  }, [selector, offset]);

  return null;
}

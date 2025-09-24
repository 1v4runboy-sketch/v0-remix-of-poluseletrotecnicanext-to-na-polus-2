'use client';
import { useEffect } from 'react';

export default function HashScroll({ offset=24 }:{
  offset?: number
}){
  useEffect(()=>{
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const targetId = hash === '#img' ? 'product-gallery' : (hash.replace(/^#/, '') || 'product-gallery');
    const tryScroll = () => {
      const el = document.getElementById(targetId) || document.querySelector('#product-image') || document.querySelector('#product-gallery');
      if (el) {
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          window.scrollBy({ top: -offset, behavior: 'auto' });
        } catch {}
      }
    };
    const id = setTimeout(tryScroll, 80);
    const id2 = setTimeout(tryScroll, 240);
    const id3 = setTimeout(tryScroll, 520);
    return ()=> { clearTimeout(id); clearTimeout(id2); clearTimeout(id3); };
  }, [offset]);

  return null;
}

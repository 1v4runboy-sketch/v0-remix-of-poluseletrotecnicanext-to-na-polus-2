'use client';
import React, { useState } from 'react';

const images = [
  '/loja/fachada-1.png',
  '/loja/fachada-2.png',
  '/loja/fachada-3.png',
];

export default function LojaGallery(){
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  function onOpen(idx:number){ setI(idx); setOpen(true); }

  return (
    <div>
      {/* Miniaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {images.map((src, idx)=> (
          <button
            key={idx}
            onClick={()=>onOpen(idx)}
            className="overflow-hidden rounded-lg border border-black/10 dark:border-white/10"
          >
            <img
              src={src}
              alt={`Fachada ${idx+1}`}
              className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-[1.02]"
              onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/produtos/placeholder.webp'; }}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={()=>setOpen(false)}
        >
          <img
            src={images[i]}
            alt={`Fachada ${i+1}`}
            className="max-w-[92vw] max-h-[92vh] rounded-xl shadow-2xl"
            onClick={(e)=> e.stopPropagation()}
            onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/produtos/placeholder.webp'; }}
          />
          <button
            onClick={()=>setOpen(false)}
            className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-white/90 text-slate-900 text-sm font-semibold shadow hover:bg-white"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}

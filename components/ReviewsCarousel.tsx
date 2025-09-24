'use client';

import { useEffect, useState } from 'react';
import reviews from '@/lib/reviews';

function Stars({ n=5 }: { n?: number }) {
  const full = Math.max(0, Math.min(5, n));
  return (
    <div className="text-amber-500 text-sm" aria-label={`${full} de 5`}>
      {'★'.repeat(full)}{'☆'.repeat(5-full)}
    </div>
  );
}

export default function ReviewsCarousel(){
  const [i, setI] = useState(0);
  const len = reviews.length;

  useEffect(()=>{
    const t = setInterval(()=> setI(prev => (prev+1)%len), 3500);
    return ()=> clearInterval(t);
  },[len]);

  function go(n:number){ setI( (n+len) % len ); }
  const r = reviews[i];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-5">
      <div className="relative min-h-[140px]">
        <figure
          key={i}
          className="absolute inset-0 animate-in fade-in-50 zoom-in-95 duration-500"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <img
              src={r.avatar || '/produtos/placeholder.webp'}
              alt={r.name}
              className="h-12 w-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/produtos/placeholder.webp'; }}
            />
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-100">{r.name}</div>
              <Stars n={r.rating} />
            </div>
          </div>
          <blockquote className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            “{r.text}”
          </blockquote>
        </figure>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({length: len}, (_,idx)=>(
            <button
              key={idx}
              aria-label={`Ir para depoimento ${idx+1}`}
              onClick={()=>go(idx)}
              className={`h-2 w-2 rounded-full transition ${i===idx ? 'bg-slate-900 dark:bg-white' : 'bg-slate-300 dark:bg-slate-600'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={()=>go(i-1)} className="px-3 py-1 text-sm rounded-md border border-slate-300 dark:border-slate-600">Anterior</button>
          <button onClick={()=>go(i+1)} className="px-3 py-1 text-sm rounded-md border border-slate-300 dark:border-slate-600">Próximo</button>
        </div>
      </div>
    </div>
  );
}

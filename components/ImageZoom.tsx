'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  alt?: string;
  className?: string;   // pode conter w-full aspect-[4/3]
  hoverScale?: number;  // 1.6 default
  maxZoom?: number;     // 4 default
};

export default function ImageZoom({ src, alt = '', className = '', hoverScale = 1.6, maxZoom = 4 }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [open, setOpen] = useState(false);

  function onMove(e: React.MouseEvent) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    imgRef.current.style.transformOrigin = `${Math.min(1, Math.max(0, x))*100}% ${Math.min(1, Math.max(0, y))*100}%`;
  }

  return (
    <>
      <div
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={onMove}
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') setOpen(true); }}
        aria-label="Ampliar imagem"
        title="Clique para ampliar"
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="w-full h-full object-contain select-none will-change-transform"
          draggable={false}
          style={{
            transform: `scale(${hovering ? hoverScale : 1}) translateZ(0)`,
            transition: 'transform 140ms ease',
            transformOrigin: '50% 50%',
          }}
          onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/produtos/placeholder.webp'; }}
        />
        <div className="pointer-events-none absolute right-2 top-2 rounded-md px-2 py-1 text-[11px] bg-black/50 text-white">
          zoom
        </div>
      </div>

      {open && <FullscreenViewer src={src} alt={alt} onClose={()=> setOpen(false)} maxZoom={maxZoom} />}
    </>
  );
}

function FullscreenViewer({ src, alt, onClose, maxZoom = 4 }:{ src:string; alt?:string; onClose:()=>void; maxZoom?:number }) {
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const stateRef = useRef({ dragging:false, sx:0, sy:0, stx:0, sty:0 });

  useEffect(()=>{
    const onKey = (e:KeyboardEvent)=> { if(e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const clamp = (v:number,a:number,b:number)=> Math.max(a, Math.min(b, v));
  const onWheel = (e: React.WheelEvent)=> { e.preventDefault(); const ds = e.deltaY > 0 ? -0.2 : 0.2; setScale(s => clamp(Number((s+ds).toFixed(2)), 1, maxZoom)); };
  const onPointerDown = (e: React.PointerEvent)=> { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); stateRef.current = { dragging:true, sx:e.clientX, sy:e.clientY, stx:tx, sty:ty }; };
  const onPointerMove = (e: React.PointerEvent)=> { if (!stateRef.current.dragging || scale <= 1) return; const dx = e.clientX - stateRef.current.sx; const dy = e.clientY - stateRef.current.sy; setTx(stateRef.current.stx + dx); setTy(stateRef.current.sty + dy); };
  const onPointerUp = ()=> { stateRef.current.dragging = false; };
  const onDblClick = ()=> { setScale(s => s > 1 ? 1 : 2); if (scale <= 1) { setTx(0); setTy(0); } };

  // pinch mobile
  const touches = useRef<Map<number, {x:number,y:number}>>(new Map());
  const pinchStart = useRef({ d:0, s:1 });
  const dist = () => {
    const arr = Array.from(touches.current.values());
    if (arr.length < 2) return 0;
    const [a,b] = arr; return Math.hypot(a.x-b.x, a.y-b.y);
  };
  const onTouchStart = (e: React.TouchEvent)=> { for (let i=0;i<e.touches.length;i++){ const t=e.touches[i]; touches.current.set(t.identifier,{x:t.clientX,y:t.clientY}); } if (touches.current.size===2){ pinchStart.current={ d:dist(), s:scale }; } };
  const onTouchMove  = (e: React.TouchEvent)=> { for (let i=0;i<e.touches.length;i++){ const t=e.touches[i]; touches.current.set(t.identifier,{x:t.clientX,y:t.clientY}); } if (touches.current.size===2 && pinchStart.current.d>0){ const ratio=dist()/pinchStart.current.d; setScale(s=>Math.max(1,Math.min(maxZoom, pinchStart.current.s*ratio))); } };
  const onTouchEnd   = (e: React.TouchEvent)=> { for (let i=0;i<e.changedTouches.length;i++){ touches.current.delete(e.changedTouches[i].identifier); } if (touches.current.size<2){ pinchStart.current={ d:0, s:scale }; } };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
         onWheel={onWheel} onDoubleClick={onDblClick}>
      <button onClick={onClose} className="absolute top-3 right-3 rounded-md bg-white/90 text-slate-900 px-3 py-1.5 text-sm hover:bg-white" aria-label="Fechar">
        Fechar ✕
      </button>

      <div className="max-h-[92vh] max-w-[92vw] overflow-hidden rounded-lg border border-white/10 bg-black/30 touch-pan-y"
           onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
           onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <img
          src={src} alt={alt || ''} draggable={false} className="select-none"
          style={{ transform:`translate(${tx}px, ${ty}px) scale(${scale})`, transformOrigin:'center center',
                   transition:'transform 60ms linear', maxHeight:'92vh', maxWidth:'92vw', objectFit:'contain' }}
          onError={(e)=>{ (e.currentTarget as HTMLImageElement).src='/produtos/placeholder.webp'; }}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/90 text-slate-900 px-2 py-1 text-sm">
        <button onClick={()=> setScale(s => Math.max(1, Number((s-0.2).toFixed(2))))} className="px-3 py-1 rounded hover:bg-white">−</button>
        <div className="px-2 tabular-nums">{Math.round(scale*100)}%</div>
        <button onClick={()=> setScale(s => Math.min(maxZoom, Number((s+0.2).toFixed(2))))} className="px-3 py-1 rounded hover:bg-white">+</button>
      </div>
    </div>
  );
}

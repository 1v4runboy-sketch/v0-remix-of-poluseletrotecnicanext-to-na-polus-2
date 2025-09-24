'use client';
import { useEffect, useRef } from 'react';
import { useCart } from '@/components/CartProvider';

export default function CartDrawer(){
  const cart = useCart();
  const prevOverflow = useRef<string>('');

  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') cart.close(); };
    if (cart.isOpen) {
      prevOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return ()=> {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow.current || '';
    };
  }, [cart.isOpen]);

  function onOverlayClick(){ cart.close(); }

  const items = (cart.cart?.items || []) as any[];

  return (
    <div aria-hidden={!cart.isOpen} className={'fixed inset-0 ' + (cart.isOpen ? 'z-[9999] pointer-events-auto' : 'pointer-events-none')}>
      {/* overlay */}
      <div onClick={onOverlayClick} className={'absolute inset-0 bg-black/40 transition-opacity ' + (cart.isOpen ? 'opacity-100' : 'opacity-0')} />

      {/* drawer */}
      <aside
        role="dialog" aria-label="Carrinho" onClick={(e)=> e.stopPropagation()}
        className={
          'absolute right-0 top-0 h-full w-full sm:max-w-[420px] md:max-w-[480px] ' +
          'bg-white dark:bg-slate-900 shadow-2xl transform transition-transform will-change-transform ' +
          (cart.isOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        {/* Header sticky */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <h2 className="text-base font-semibold">Carrinho</h2>
            <span className="ml-auto text-sm opacity-70">{items.length} item(s)</span>
            <button onClick={() => cart.close()} className="ml-2 rounded px-2 py-1 text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              Fechar
            </button>
          </div>
        </div>

        {/* Conteúdo + footer sticky */}
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {items.length === 0 && <div className="text-sm opacity-70">Seu carrinho está vazio.</div>}
            {items.map((it:any)=> {
              const step = 1;               // m/kg/un => 1
              const min = 1;
              const unit = it.unit === 'kg' ? 'kg' : (it.unit === 'm' ? 'm' : 'un');
              return (
                <div key={it.id} className="flex items-center gap-3 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{it.title}</div>
                    <div className="text-xs opacity-70">
                      {it.brandName || ''}{it.brandName && it.variantLabel ? ' • ' : ''}{it.variantLabel || ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={min}
                      step={step}
                      value={it.qty}
                      onChange={(e)=> cart.setQty(it.id, Math.max(min, Math.floor(Number(e.target.value||min))))}
                      className="w-16 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1 text-sm"
                    />
                    <span className="text-xs px-1 opacity-70">{unit}</span>
                  </div>
                  <button onClick={()=> cart.remove(it.id)} className="text-xs border border-slate-300 dark:border-slate-700 rounded px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-800">
                    Remover
                  </button>
                </div>
              );
            })}
          </div>

          <div className="sticky bottom-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 p-3 space-y-2">
            <textarea
              id="polus_cart_note"
              placeholder="Observações do pedido (opcional)"
              className="w-full h-20 resize-none rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2 text-sm"
            />
            <div className="flex items-center gap-2">
              <button onClick={()=> cart.clear()} className="px-3 py-2 rounded border border-slate-300 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                Limpar
              </button>
              <a
                href={cart.quoteHref((document.getElementById('polus_cart_note') as HTMLTextAreaElement)?.value || '')}
                target="_blank" rel="noopener noreferrer"
                className="ml-auto px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Solicitar cotação no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

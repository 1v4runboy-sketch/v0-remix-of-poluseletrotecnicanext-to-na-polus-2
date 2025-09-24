'use client';
import { useCart } from '@/components/CartProvider';

export default function CartButton(){
  const cart = useCart();
  const count = cart.count();
  return (
    <button
      onClick={cart.toggle}
      className="fixed z-[1000] right-4 bottom-24 md:bottom-6 h-12 w-12 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg ring-1 ring-slate-200 dark:ring-slate-700 flex items-center justify-center"
      aria-label="Abrir carrinho"
      title="Carrinho"
    >
      🛒
      {count>0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center shadow">
          {count}
        </span>
      )}
    </button>
  );
}

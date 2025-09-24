'use client';
import CartProvider, { useCart } from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import CartButton from '@/components/CartButton';

function CartPageInner(){
  const cart = useCart();
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Carrinho</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-3">Abra o carrinho para revisar seus itens e solicitar a cotação no WhatsApp.</p>
      <button onClick={cart.open} className="px-4 py-2 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900">
        Abrir carrinho
      </button>
      <CartDrawer />
      <CartButton />
    </main>
  );
}

export default function CartPage(){
  return (
    <CartProvider>
      <CartPageInner />
    </CartProvider>
  );
}

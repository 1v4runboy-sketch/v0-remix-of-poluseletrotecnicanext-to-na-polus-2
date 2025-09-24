// /lib/cart.ts
// API de carrinho baseada em módulo (para import) + camada de compatibilidade em window.CART

export type Unit = "m" | "kg" | "un";

export type VariantInfo = {
  id?: string;
  label?: string;
  unit?: Unit;
  minQty?: number;
  stepQty?: number;
  attrs?: Record<string, any>;
};

export type CartItem = {
  key: string;            // chave única no carrinho (slug + variação)
  slug: string;
  title: string;
  image?: string | null;
  brand?: string | null;
  unit: Unit;
  qty: number;
  variant?: VariantInfo | null;
  price?: number | null;  // opcional
};

export type CartState = { items: CartItem[] };

export const CART_STORAGE_KEY = "polus.cart.v1";
export const DEFAULT_WHATSAPP = "551135992935";

// -----------------------
// Helpers internos
// -----------------------
function isBrowser() {
  return typeof window !== "undefined";
}

function makeKey(slug: string, variantLabel?: string) {
  return [slug, (variantLabel || "").trim().toLowerCase()].filter(Boolean).join("__");
}

function readStorage(): CartState {
  if (!isBrowser()) return { items: [] };
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.items)) return { items: parsed.items };
    if (Array.isArray(parsed)) return { items: parsed }; // compat legado
    return { items: [] };
  } catch {
    return { items: [] };
  }
}

function writeStorage(state: CartState) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: state.items }));
  } catch {}
}

function normalizeCart(cartLike: CartState | CartItem[] | undefined | null): CartItem[] {
  if (!cartLike) return [];
  return Array.isArray(cartLike) ? cartLike : cartLike.items || [];
}

// -----------------------
// API EXPORTADA (módulo)
// -----------------------
export function loadCart(): CartItem[] {
  return readStorage().items;
}

export function saveCart(items: CartItem[]): void {
  writeStorage({ items });
}

export function itemsCount(cartLike?: CartState | CartItem[]): number {
  return normalizeCart(cartLike).reduce((acc, it) => acc + (Number(it.qty) || 0), 0);
}

export type ProductLike = {
  slug: string;
  title: string;
  brand?: string | null;
  images?: Array<{ src: string; alt: string }>;
};

export function addItem(
  cart: CartState,
  product: ProductLike,
  qty: number = 1,
  variant?: VariantInfo | null
): CartState {
  const items = [...(cart?.items || [])];
  const key = makeKey(product.slug, variant?.label);
  const idx = items.findIndex((it) => it.key === key);

  const image = product.images?.[0]?.src ?? null;
  const unit: Unit = variant?.unit || "un";

  if (idx >= 0) {
    items[idx] = { ...items[idx], qty: Math.max(1, items[idx].qty + qty) };
  } else {
    items.push({
      key,
      slug: product.slug,
      title: product.title,
      image,
      brand: product.brand ?? null,
      unit,
      qty: Math.max(1, qty),
      variant: variant ?? null,
    });
  }
  const next = { items };
  saveCart(next.items);
  return next;
}

// alias para código que usa nome antigo
export const addToCart = addItem;

export function updateQty(cart: CartState, key: string, qty: number): CartState {
  const items = [...(cart?.items || [])];
  const idx = items.findIndex((it) => it.key === key);
  if (idx >= 0) {
    if (qty <= 0) items.splice(idx, 1);
    else items[idx] = { ...items[idx], qty };
  }
  const next = { items };
  saveCart(next.items);
  return next;
}

export function removeItem(cart: CartState, key: string): CartState {
  return updateQty(cart, key, 0);
}

export function clearCart(): void {
  saveCart([]);
}

export function quoteHref(
  cartLike?: CartState | CartItem[],
  whatsapp = DEFAULT_WHATSAPP,
  extraNote?: string
): string {
  const items = normalizeCart(cartLike);
  const lines = items.map((it) => {
    const v = it.variant?.label ? ` – ${it.variant.label}` : "";
    return `• ${it.title}${v}  x${it.qty}`;
  });
  if (extraNote) lines.push("", extraNote);
  const text = encodeURIComponent(`Olá! Gostaria de cotar:\n${lines.join("\n")}`);
  return `https://wa.me/${whatsapp}?text=${text}`;
}

// -----------------------
// Camada de compatibilidade em window.CART
// -----------------------
declare global {
  interface Window {
    CART?: any;
  }
}

export function setupCartCompat(): void {
  if (!isBrowser()) return;
  const api = {
    loadCart,
    saveCart,
    itemsCount,
    addItem,
    addToCart,   // alias
    updateQty,
    removeItem,
    clearCart,
    quoteHref,
    STORAGE_KEY: CART_STORAGE_KEY,
  };
  // expõe no window (sem quebrar caso já exista)
  window.CART = { ...(window.CART || {}), ...api };
}

// opcional: inicializa compat automaticamente no client
if (isBrowser()) {
  try {
    setupCartCompat();
  } catch {}
}

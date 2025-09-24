// components/ProductGrid.tsx
import ProductCard from './ProductCard';

export default function ProductGrid({ items }: { items: any[] }) {
  if (!items?.length) {
    return (
      <div className="text-center text-zinc-600 dark:text-zinc-400 py-12">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:gap-4 md:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((it) => (
        <ProductCard key={it.slug} item={it} />
      ))}
    </div>
  );
}

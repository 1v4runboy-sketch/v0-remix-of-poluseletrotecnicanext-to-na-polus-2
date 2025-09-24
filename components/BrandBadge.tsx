// /components/BrandBadge.tsx
import Image from "next/image";

export default function BrandBadge({ src, alt = "Marca" }: { src?: string | null; alt?: string }) {
  if (!src) return null;
  return (
    <div className="absolute left-2 top-2 z-10 rounded bg-white/85 px-1.5 py-1 shadow ring-1 ring-black/5 dark:bg-black/55">
      <Image src={src} alt={alt} width={56} height={20} className="h-5 w-auto object-contain" />
    </div>
  );
}

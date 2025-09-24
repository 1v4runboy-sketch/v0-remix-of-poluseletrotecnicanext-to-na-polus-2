// app/page.tsx  (Server Component)

import BrandCarousel from '../components/BrandCarousel';
import ProductListPageClient from '../components/ProductListPageClient';
import SiteFooter from '../components/SiteFooter';
import OrgJsonLd from '../components/OrgJsonLd';

// seus flutuantes já existentes:
import WhatsFloat from '../components/WhatsFloat';
import InstagramFloat from '../components/InstagramFloat';

export async function generateMetadata({ searchParams }: { searchParams: any }) {
  const q = (searchParams?.q || '').trim();
  const cat = (searchParams?.category || '').split(',').filter(Boolean);
  const brand = (searchParams?.brand || '').split(',').filter(Boolean);

  const parts:string[] = [];
  if (q) parts.push(`Busca por “${q}”`);
  if (cat.length) parts.push(`Categorias: ${cat.join(', ')}`);
  if (brand.length) parts.push(`Marcas: ${brand.join(', ')}`);

  const desc = parts.length
    ? `${parts.join(' · ')} — Catálogo técnico Polus Eletrotécnica.`
    : 'Catálogo técnico Polus Eletrotécnica — componentes que movem a indústria.';

  return {
    title: q ? `Resultados para ${q} | Polus` : 'Polus Eletrotécnica — Catálogo Técnico',
    description: desc,
    openGraph: {
      title: q ? `Resultados: ${q} | Polus` : 'Polus Eletrotécnica — Catálogo Técnico',
      description: desc,
      images: ['/polus-logo.svg'],
      url: '/',
      type: 'website'
    }
  };
}

export default function HomePage() {
  return (
    <main>
      <OrgJsonLd />

      {/* HERO com imagem animada (webp) */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/Loop-ezgif.com-video-to-webp-converter.webp"
          alt="Polus Eletrotécnica"
          className="w-full object-cover"
          style={{ height: 'clamp(480px, 68vh, 880px)' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Overlays cinematográficos */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:from-black/60 dark:via-black/30 dark:to-[#0b1222]" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-4">
            <div className="text-white/90 tracking-[0.22em] uppercase text-sm md:text-base">Polus Eletrotécnica</div>
            <div className="mt-2 text-white font-semibold text-2xl md:text-4xl">CATÁLOGO TÉCNICO</div>
            <div className="mt-2 text-white/80 text-sm">Componentes que movem a indústria</div>
          </div>
        </div>
      </section>

      {/* MARCAS QUE TRABALHAMOS */}
      <section className="mt-6 md:mt-8">
        <BrandCarousel />
      </section>

      {/* FILTROS + GRADE DE PRODUTOS */}
      <section className="mt-6 md:mt-8 px-3 md:px-6 lg:px-8">
        <ProductListPageClient />
      </section>

      {/* Botões flutuantes como era antes */}
      <WhatsFloat />
      <InstagramFloat />

      {/* Rodapé global */}
      <SiteFooter />
    </main>
  );
}

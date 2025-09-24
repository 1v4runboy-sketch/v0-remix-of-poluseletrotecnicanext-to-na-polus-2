import LojaGallery from '@/components/LojaGallery';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Loja & Avaliações — Polus Eletrotécnica',
  description: 'Fotos da loja, avaliações de clientes e localização no mapa.',
};

export default function LojaPage(){
  return (
    <main className="pb-12">
      {/* Título */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Loja & Avaliações</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Fotos da fachada, avaliações de clientes e como chegar até nós.
        </p>
      </div>

      {/* Galeria da Fachada */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Fachada</h2>
          <LojaGallery />
        </div>
      </section>

      {/* Avaliações (carrossel) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Avaliações dos clientes</h2>
        <ReviewsCarousel />
      </section>

      {/* Google Maps */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-8">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Como chegar</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
          <iframe
            title="Mapa — Polus Eletrotécnica"
            src={`https://maps.google.com/?q=Polus%20Eletrot%C3%A9cnica&output=embed`}
            className="w-full h-[380px] md:h-[520px]"
            loading="lazy"
          />
        </div>
      </section>

      {/* Rodapé */}
      <div className="mt-10">
        <SiteFooter />
      </div>
    </main>
  );
}

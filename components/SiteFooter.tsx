'use client';

import Link from 'next/link';
import * as DB from '@/lib/withCards';
import * as SITE from '@/lib/site';

const SOURCE = (DB && (DB.default || DB.products || DB.PRODUCTS)) || [];
const PRODUCTS = Array.isArray(SOURCE) ? SOURCE : [];

function uniq(arr: any[]) { return Array.from(new Set(arr.filter(Boolean))); }

export default function SiteFooter() {
  const instagram = (SITE && (SITE.SITE?.instagram)) || 'https://www.instagram.com/_poluseletrotecnica/';
  const whatsapp  = typeof SITE?.whatsappHref === 'function'
    ? SITE.whatsappHref('Olá! Vim pelo site da Polus.')
    : 'https://wa.me/551135992935?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Polus.';
  const maps = 'https://maps.google.com/?q=Polus%20Eletrot%C3%A9cnica';

  const categories = uniq(PRODUCTS.map((p:any) => String(p?.category || '').trim()))
    .filter(Boolean)
    .sort((a,b)=>a.localeCompare(b,'pt-BR'));

  const catHref = (c:string) => `/?category=${encodeURIComponent(c)}#gridTop`;

  return (
    <footer className="mt-12 border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#0a1c35]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Polus Eletrotécnica</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Componentes técnicos para manutenção e fabricação industrial.
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            CNPJ: <span className="font-medium">05.886.392/0001-51</span>
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Contato</h4>
          <ul className="text-sm space-y-2">
            <li><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline dark:text-emerald-400">WhatsApp</a></li>
            <li><a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
            <li><a href={maps} target="_blank" rel="noopener noreferrer" className="hover:underline">Google Maps</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Categorias</h4>
          {categories.length ? (
            <ul className="text-sm grid grid-cols-1 gap-2">
              {categories.map((c:string) => (
                <li key={c}><a href={catHref(c)} className="hover:underline">{c}</a></li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">—</p>
          )}
        </div>

        {/* NOVO: navegação com Loja & Avaliações */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">Navegação</h4>
          <ul className="text-sm space-y-2">
            <li><Link href="/" className="hover:underline">Início</Link></li>
            <li><Link href="/loja" className="hover:underline">Loja & Avaliações</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
          <span>© 2025 Polus Eletrotécnica — Todos os direitos reservados.</span>
          <span className="opacity-80">Desenvolvido com Next.js</span>
        </div>
      </div>
    </footer>
  );
}

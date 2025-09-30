'use client';

import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <>
      {/* Overlay que cobre a tela ao abrir a sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-50 w-3/4 sm:w-1/3 bg-white dark:bg-[#0b1222] transform transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Botão de Fechar Sidebar */}
          <button
            onClick={toggleSidebar}
            className="absolute top-5 right-5 text-white text-2xl"
          >
            ✕
          </button>

          {/* Conteúdo da Sidebar */}
          <div className="mt-16 space-y-6">
            <Link href="/" className="text-lg text-white">Home</Link>
            <Link href="/produtos" className="text-lg text-white">Produtos</Link>
            <Link href="/contato" className="text-lg text-white">Contato</Link>
            <Link href="/loja" className="text-lg text-white">Ir para Loja</Link>
            <Link href="/avaliacoes" className="text-lg text-white">Avaliações</Link>
            <div className="mt-4">
              <h4 className="text-white font-semibold">Categorias</h4>
              <ul className="text-white space-y-2">
                <li><Link href="/produtos/cabos" className="hover:underline">Cabos</Link></li>
                <li><Link href="/produtos/protetores-termicos" className="hover:underline">Protetores Térmicos</Link></li>
                <li><Link href="/produtos/fios" className="hover:underline">Fios</Link></li>
                <li><Link href="/produtos/resinas" className="hover:underline">Resinas</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

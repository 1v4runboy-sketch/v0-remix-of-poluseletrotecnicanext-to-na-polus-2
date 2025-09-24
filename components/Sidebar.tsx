'use client';

import { useEffect, useRef } from 'react';
import ClientPortal from './ClientPortal';
import Link from 'next/link';

export default function Sidebar({ open, onClose }) {
  const touchStartX = useRef<number|null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  function onOverlayClick(e:any) {
    if (e.target === e.currentTarget) onClose?.();
  }

  if (!open) return null;

  return (
    <ClientPortal>
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-[2px]"
        onClick={onOverlayClick}
      >
        <aside
          className="absolute left-0 top-0 h-full w-[82%] max-w-[360px] bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-700"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="font-semibold">Navegação</div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              Fechar
            </button>
          </div>

          <nav className="p-4 space-y-2 text-slate-700 dark:text-slate-200">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
              Início
            </Link>

            {/* NOVO */}
            <Link href="/loja" className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800">
              Loja & Avaliações
            </Link>

            <a
              href="https://www.instagram.com/_poluseletrotecnica/"
              target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/551135992935"
              target="_blank" rel="noopener noreferrer"
              className="block px-3 py-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              WhatsApp
            </a>
          </nav>
        </aside>
      </div>
    </ClientPortal>
  );
}

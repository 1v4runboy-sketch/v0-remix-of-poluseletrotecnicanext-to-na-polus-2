// /components/HeaderShell.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import LogoSpinner from "./LogoSpinner";

/**
 * Header fixo e leve:
 * - Esquerda: botão que aciona a sidebar (ícone muda conforme tema: loading-logo-black/white).
 * - Centro: LogoSpinner (usa public/polus-logo.svg).
 * - Direita: navegação básica (sem reimplementar tema/carrinho — mantenha os seus).
 *
 * Observação importante:
 *  - NÃO movemos WhatsApp/Instagram floats para cá. Eles continuam onde já estavam
 *    (ex.: components/WhatsFloat.tsx / components/WhatsButton.tsx).
 *  - O botão da esquerda não importa seu Sidebar. Ele apenas dispara um CustomEvent
 *    "toggle-sidebar" e alterna aria-expanded — seu Sidebar original pode capturar isso.
 */

export default function HeaderShell() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggleSidebar = useCallback(() => {
    setOpen((v) => !v);
    // Evento global para seu Sidebar já existente
    const ev = new CustomEvent("toggle-sidebar", {
      detail: { source: "HeaderShell", ts: Date.now() },
    });
    document.dispatchEvent(ev);
    // Atualiza aria-expanded
    if (btnRef.current) {
      btnRef.current.setAttribute("aria-expanded", (!open).toString());
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-[#0b1222]/70">
      <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-3 md:px-6">
        {/* ESQUERDA — Botão para abrir Sidebar (logo 'loading' com tema) */}
        <div className="flex items-center gap-2">
          <button
            ref={btnRef}
            type="button"
            aria-label="Abrir menu lateral"
            aria-controls="site-sidebar"
            aria-expanded={open}
            onClick={handleToggleSidebar}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-black/5 transition hover:scale-[1.02] hover:ring-black/10 dark:ring-white/10 dark:hover:ring-white/20"
          >
            {/* Tema CLARO */}
            <Image
              src="/loading-logo-black.svg"
              alt="Abrir menu"
              width={24}
              height={24}
              className="block h-6 w-6 dark:hidden"
              priority
            />
            {/* Tema ESCURO */}
            <Image
              src="/loading-logo-white.svg"
              alt="Abrir menu"
              width={24}
              height={24}
              className="hidden h-6 w-6 dark:block"
              priority
            />
          </button>

          {/* Marca compacta à esquerda (link Home) — opcional */}
          <Link
            href="/"
            aria-label="Página inicial"
            className="hidden items-center gap-2 sm:inline-flex"
          >
            <Image
              src="/polus-logo.svg"
              alt="Polus Eletrotécnica"
              width={24}
              height={24}
              className="h-6 w-6 opacity-90"
              priority
            />
            <span className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
              Polus
            </span>
          </Link>
        </div>

        {/* CENTRO — Logo giratória (aparece do sm para cima) */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
          <LogoSpinner />
        </div>

        {/* DIREITA — Navegação leve (mantenha seus botões originais aqui, se quiser) */}
        <nav
          aria-label="Navegação principal"
          className="flex items-center gap-3 md:gap-4"
        >
          {/* Exemplo de links leves que não conflitam com seu layout */}
          <Link
            href="/#catalogo"
            className="text-sm text-neutral-700 hover:underline dark:text-neutral-200"
          >
            Catálogo
          </Link>
          <Link
            href="/avaliacoes"
            className="hidden text-sm text-neutral-700 hover:underline dark:text-neutral-200 sm:inline"
          >
            Avaliações
          </Link>
          <Link
            href="/loja"
            className="hidden text-sm text-neutral-700 hover:underline dark:text-neutral-200 sm:inline"
          >
            Loja
          </Link>

          {/* Espaço reservado para seus componentes EXISTENTES (sem recriar nada):
             - Se o seu header original incluía "ThemeToggle", "CartButton", etc.,
               basta reativar as linhas abaixo apontando para os SEUS arquivos. */}

          {/* Exemplo (descomente e ajuste o caminho se EXISTIREM no seu projeto):
              <ThemeToggle />
              <CartButton />
          */}
          <Link
            href="/carrinho"
            aria-label="Abrir carrinho"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-black/5 transition hover:scale-[1.02] hover:ring-black/10 dark:ring-white/10 dark:hover:ring-white/20"
          >
            {/* Ícone de carrinho leve sem depender de contexto (não quebra CartProvider) */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-neutral-800 dark:text-neutral-100"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M7 18a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm10 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 2h2.18a2 2 0 0 1 1.94 1.5L7.38 5H20a1 1 0 0 1 .97 1.24l-2 8A2 2 0 0 1 17.03 16H9a2 2 0 0 1-1.94-1.5L5 6H3V4h1.38L3.9 2.63A1 1 0 0 0 3 2Z" />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}

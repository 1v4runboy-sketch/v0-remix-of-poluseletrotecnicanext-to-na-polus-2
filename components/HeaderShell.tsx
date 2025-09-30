'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle'; // Componente do toggle de tema

export default function HeaderShell() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Altera o tema
  useEffect(() => {
    if (mounted) {
      const storedTheme = localStorage.getItem('polus-theme');
      setTheme(storedTheme ? (storedTheme as 'light' | 'dark') : 'dark');
    }
  }, [mounted]);

  // Alterna entre o tema claro e escuro
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('polus-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);

  // Abre e fecha a sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0b1222]/70 bg-white dark:bg-[#0b1222] border-b border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-[1400px] px-3 md:px-6 h-14 flex items-center justify-between">
        {/* Botão da Sidebar */}
        <button
          onClick={toggleSidebar}
          aria-label="Abrir menu lateral"
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <Image
            src={theme === 'dark' ? '/loading-logo-white.svg' : '/loading-logo-black.svg'}
            alt="Menu"
            width={20}
            height={20}
            className="w-5 h-5"
            priority
          />
        </button>

        {/* Logo Central Giratória */}
        <Link href="/" aria-label="Polus Eletrotécnica" className="block">
          <Image
            src="/polus-logo.svg"
            alt="Polus Eletrotécnica"
            width={150}  // Ajuste de tamanho da logo
            height={40}  // Ajuste de altura da logo
            className="h-10 w-auto animate-spin-slow motion-reduce:animate-none"
          />
        </Link>

        {/* Ações à Direita: Tema e Carrinho */}
        <div className="flex items-center gap-2">
          {/* Toggle de Tema */}
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </div>
      </div>

      {/* Sidebar Lateral */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

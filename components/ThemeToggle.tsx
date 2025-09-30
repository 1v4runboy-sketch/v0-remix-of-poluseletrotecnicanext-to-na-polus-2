'use client';

import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

export default function ThemeToggle({ toggleTheme, theme }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="inline-flex items-center gap-2 px-3 h-10 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#0f1a2a] hover:bg-black/5 dark:hover:bg-white/10 transition"
    >
      <span className="text-xs font-medium hidden sm:inline">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      <div className="relative w-10 h-5 rounded-full bg-black/10 dark:bg-white/20">
        <div
          className={`absolute top-[2px] h-[16px] w-[16px] rounded-full bg-emerald-500 transition-transform ${
            theme === 'dark' ? 'translate-x-[22px]' : 'translate-x-[2px]'
          }`}
        />
      </div>
    </button>
  );
}

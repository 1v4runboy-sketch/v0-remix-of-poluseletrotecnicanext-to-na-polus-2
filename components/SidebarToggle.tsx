'use client';

/**
 * Botão de abrir Sidebar — sem círculo (fundo transparente) e 30% maior.
 * Troca o SVG automaticamente por tema:
 *  - Tema claro: ícone PRETO (/loading-logo-black.svg)
 *  - Tema escuro: ícone BRANCO (/loading-logo-white.svg)
 *
 * Z-index altíssimo para aparecer sobre a faixa branca da Home.
 */
export default function SidebarToggle(props) {
  const handle = () => {
    if (typeof props?.onClick === 'function') return props.onClick();
    if (typeof props?.onOpen === 'function') return props.onOpen();
    try { window.dispatchEvent(new CustomEvent('sidebar:open')); } catch {}
  };

  return (
    <button
      type="button"
      aria-label="Abrir menu"
      onClick={handle}
      className={`relative inline-flex items-center justify-center
        bg-transparent p-0 m-0 border-0 outline-none
        hover:scale-[1.03] active:scale-[0.98] transition will-change-transform
        focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70
        z-[9999] ${props?.className||''}`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* ~30% maior que o anterior */}
      <img
        src="/loading-logo-black.svg"
        alt=""
        className="sidebar-icon h-10 w-10 md:h-12 md:w-12 block dark:hidden select-none pointer-events-none"
        draggable={false}
      />
      <img
        src="/loading-logo-white.svg"
        alt=""
        className="sidebar-icon h-10 w-10 md:h-12 md:w-12 hidden dark:block select-none pointer-events-none"
        draggable={false}
      />
      <span className="sr-only">Abrir menu</span>

      <style jsx>{`
        /* Sombras sutis para legibilidade sobre branco/azul escuro */
        .sidebar-icon { filter: drop-shadow(0 1px 1px rgba(0,0,0,.30)); }
        :global(html.dark) .sidebar-icon { filter: drop-shadow(0 1px 1px rgba(0,0,0,.35)); }
      `}</style>
    </button>
  );
}

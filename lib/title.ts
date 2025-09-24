// lib/title.ts
const FORCE_UPPER = new Set(['AWG', 'WEG', 'NSK', 'HCH', 'HP', 'CV', 'MM']);

export function prettyTitle(input: string): string {
  if (!input) return '';
  // se já está bonito, apenas normalizamos espaços
  const raw = input.replace(/\s+/g, ' ').trim();

  // quando vem "estilo slug"
  const base = raw.includes('-') && !raw.includes('–')
    ? raw.replace(/-/g, ' ')
    : raw;

  return base
    .split(' ')
    .map(part => {
      const p = part.replace(/[^\wÀ-ú"/]/g, '');
      if (FORCE_UPPER.has(p.toUpperCase())) return p.toUpperCase();
      // manter frações 1/2", 3/4" etc
      if (/\d+\/\d+/.test(p)) return p;
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(' ')
    .replace(/\s+"/g, '"')  // tira espaço antes de aspas
    .replace(/"\s/g, '"');
}

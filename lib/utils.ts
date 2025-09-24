// @/lib/utils.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Função para formatar preços no formato R$
export const getPriceFormatted = (price: number | string) => {
  // Certificar-se que o preço é um número
  const parsedPrice = parseFloat(price.toString());
  if (isNaN(parsedPrice)) return 'Preço inválido';

  // Formatar o preço em formato brasileiro (ex: R$ 1.000,00)
  return parsedPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Função já existente (não removida)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

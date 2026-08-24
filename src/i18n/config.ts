/**
 * Configuração central de i18n.
 * Mantém os locales e o locale padrão em um único lugar,
 * usado tanto pelo `astro.config.mjs` quanto pelos helpers.
 */

export const defaultLocale = 'pt-br';

export const locales = ['pt-br', 'en'] as const;

export type Locale = (typeof locales)[number];

export const languages: Record<Locale, string> = {
  'pt-br': 'Português (BR)',
  'en': 'English',
};

/** Verifica se uma string é um locale válido. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

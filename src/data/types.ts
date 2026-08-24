import type { Locale } from '../i18n/config';

/**
 * Valor traduzível: uma entrada por locale suportado.
 * Permite manter PT-BR e EN lado a lado em um único registro de dado,
 * respeitando o modelo bilíngue das specs (ex.: `title` + `titlePt`).
 */
export type Localized<T = string> = Record<Locale, T>;

/** Resolve um valor localizado para o locale atual (fallback PT-BR). */
export function pick<T>(locale: Locale, value: Localized<T>): T {
  return value[locale] ?? value['pt-br'];
}

/** Converte para o formato { pt, en } esperado pelos dados das specs. */
export function bilingual(pt: string, en: string): Localized {
  return { 'pt-br': pt, en };
}

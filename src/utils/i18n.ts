import type { Locale } from '../i18n/config';
import { ui } from '../i18n/ui';
import { defaultLocale, isLocale, locales } from '../i18n/config';

/**
 * Retorna uma função `t(key)` que resolve strings traduzidas para o locale.
 * Faz fallback para o locale padrão (PT-BR) e, em último caso, retorna a própria chave.
 */
export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key] ?? key;
  };
}

/**
 * Obtém o locale atual a partir do objeto Astro (Astro.currentLocale).
 * Garante um locale válido, com fallback para o padrão.
 */
export function getLocale(currentLocale: string | undefined): Locale {
  if (currentLocale && isLocale(currentLocale)) return currentLocale;
  return defaultLocale;
}

/**
 * Remove o prefixo de locale do início de um pathname.
 * Ex.: `/en/members` -> `/members`; `/pt-br` -> `/`.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  return '/' + segments.join('/');
}

/**
 * Gera a URL de um locale alternativo preservando o caminho da página atual.
 */
export function getAlternateLocaleUrl(currentLocale: Locale, pathname: string): string {
  const target = locales.find((l) => l !== currentLocale) ?? defaultLocale;
  const rest = stripLocale(pathname);
  return localeUrl(target, rest === '/' ? '/' : rest);
}

/**
 * Constrói uma URL interna prefixada pelo locale, sempre com barra final
 * (compatível com `trailingSlash: 'always'`).
 * Ex.: localeUrl('pt-br', '/areas') -> '/pt-br/areas/'
 *      localeUrl('pt-br', '/')      -> '/pt-br/'
 */
export function localeUrl(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const url = `/${locale}${clean}`;
  return url.endsWith('/') ? url : `${url}/`;
}

export type NavItem = { key: string; href: string };

/**
 * Itens de navegação principal. `href` é relativo ao locale (sem prefixo),
 * e o prefixo é aplicado no componente Navbar.
 */
export const navItems: NavItem[] = [
  { key: 'nav.members', href: '/members' },
  { key: 'nav.artifacts', href: '/artifacts' },
  { key: 'nav.news', href: '/news' },
  { key: 'nav.join', href: '/join' },
  { key: 'nav.partners', href: '/partners' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.contact', href: '/contact' },
];

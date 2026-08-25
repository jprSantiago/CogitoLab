import { describe, expect, it } from 'vitest';
import {
  getAlternateLocaleUrl,
  getLocale,
  localeUrl,
  stripLocale,
  useTranslations,
} from '../../src/utils/i18n';
import { ui } from '../../src/i18n/ui';

describe('useTranslations (t)', () => {
  it('returns the PT-BR string for pt-br', () => {
    const t = useTranslations('pt-br');
    expect(t('nav.members')).toBe('Membros');
  });

  it('returns the EN string for en', () => {
    const t = useTranslations('en');
    expect(t('nav.members')).toBe('Members');
  });

  it('returns the EN string for an EN key distinct from its PT-BR counterpart', () => {
    // Sanity: with the dictionary parity enforced by the "dictionary parity" test,
    // every key exists in both locales, so a real key must resolve to its own locale
    // value (never silently fall back to the other language).
    const tEn = useTranslations('en');
    const tPt = useTranslations('pt-br');
    expect(tEn('nav.members')).toBe('Members');
    expect(tPt('nav.members')).toBe('Membros');
    expect(tEn('nav.members')).not.toBe(tPt('nav.members'));
  });

  it('returns the key itself when it is missing in every locale', () => {
    const t = useTranslations('pt-br');
    expect(t('this.key.does.not.exist')).toBe('this.key.does.not.exist');
  });
});

describe('getLocale', () => {
  it('returns a valid locale as-is', () => {
    expect(getLocale('en')).toBe('en');
    expect(getLocale('pt-br')).toBe('pt-br');
  });

  it('falls back to the default locale for undefined or invalid values', () => {
    expect(getLocale(undefined)).toBe('pt-br');
    expect(getLocale('fr')).toBe('pt-br');
    expect(getLocale('')).toBe('pt-br');
  });
});

describe('stripLocale', () => {
  it('removes a locale prefix, returning the rest with a leading slash', () => {
    expect(stripLocale('/en/members')).toBe('/members');
    expect(stripLocale('/pt-br/about')).toBe('/about');
  });

  it('collapses the locale root to a single slash', () => {
    expect(stripLocale('/en')).toBe('/');
    expect(stripLocale('/pt-br')).toBe('/');
  });

  it('leaves locale-less paths untouched (except normalization)', () => {
    expect(stripLocale('/members')).toBe('/members');
  });
});

describe('localeUrl', () => {
  it('prefixes the locale and always ends with a slash', () => {
    expect(localeUrl('pt-br', '/')).toBe('/pt-br/');
    expect(localeUrl('pt-br', '/members')).toBe('/pt-br/members/');
    expect(localeUrl('en', 'contact')).toBe('/en/contact/');
  });
});

describe('getAlternateLocaleUrl', () => {
  it('switches to the other locale while preserving the path', () => {
    expect(getAlternateLocaleUrl('pt-br', '/pt-br/members')).toBe('/en/members/');
    expect(getAlternateLocaleUrl('en', '/en/contact')).toBe('/pt-br/contact/');
  });

  it('handles the root path', () => {
    expect(getAlternateLocaleUrl('pt-br', '/pt-br/')).toBe('/en/');
  });
});

describe('i18n dictionary parity', () => {
  it('exposes exactly the same set of keys in every locale', () => {
    const ptKeys = Object.keys(ui['pt-br']).sort();
    const enKeys = Object.keys(ui['en']).sort();
    expect(enKeys).toEqual(ptKeys);
  });

  it('has non-empty values for every key in every locale', () => {
    for (const locale of Object.keys(ui) as Array<keyof typeof ui>) {
      for (const value of Object.values(ui[locale])) {
        expect(value.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

import { beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import Navbar from '../../src/components/layout/Navbar.astro';
import Footer from '../../src/components/layout/Footer.astro';
import { navItems } from '../../src/utils/i18n';
import { renderComponent } from './render-helper';

const distDir = resolve(process.cwd(), 'dist');

beforeAll(() => {
  if (!existsSync(distDir)) {
    execSync('npm run build', { stdio: 'ignore', timeout: 180_000 });
  }
}, 200_000);

describe('Navbar — Portuguese (pt-br)', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Navbar, {
      props: { currentLocale: 'pt-br', pathname: '/pt-br/members/' },
    });
  });

  it('renders the translated navigation labels', () => {
    expect(html).toContain('Membros');
    expect(html).toContain('Sobre');
    expect(html).toContain('Contato');
  });

  it('exposes an accessible skip link', () => {
    expect(html).toContain('href="#main"');
    expect(html).toContain('Pular para o conteúdo');
  });

  it('uses an aria-label on the nav landmark', () => {
    expect(html).toContain('aria-label="Navegação principal"');
  });

  it('switches language to /en/ preserving the current path', () => {
    expect(html).toContain('href="/en/members/"');
    expect(html).toContain('lang="en"');
    expect(html).toContain('>EN<');
  });
});

describe('Navbar — English (en)', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Navbar, {
      props: { currentLocale: 'en', pathname: '/en/members/' },
    });
  });

  it('renders the translated navigation labels', () => {
    expect(html).toContain('Members');
    expect(html).toContain('About');
    expect(html).toContain('Contact');
  });

  it('exposes an accessible skip link in English', () => {
    expect(html).toContain('Skip to content');
  });

  it('uses an aria-label on the nav landmark in English', () => {
    expect(html).toContain('aria-label="Main navigation"');
  });

  it('switches language to /pt-br/ preserving the current path', () => {
    expect(html).toContain('href="/pt-br/members/"');
    expect(html).toContain('lang="pt-br"');
  });
});

describe('Footer — Portuguese (pt-br)', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Footer, { props: { currentLocale: 'pt-br' } });
  });

  it('renders translated labels and internal links', () => {
    expect(html).toContain('reservados');
    expect(html).toContain('href="/pt-br/members/"');
    expect(html).toContain('href="/pt-br/contact/"');
  });
});

describe('Footer — English (en)', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Footer, { props: { currentLocale: 'en' } });
  });

  it('renders translated labels and internal links', () => {
    expect(html).toContain('All rights reserved');
    expect(html).toContain('href="/en/members/"');
    expect(html).toContain('href="/en/contact/"');
  });
});

describe('Navigation — every navItem resolves to a built page (both locales)', () => {
  for (const locale of ['pt-br', 'en'] as const) {
    for (const item of navItems) {
      it(`page exists for ${locale}${item.href}`, () => {
        const target = resolve(distDir, locale, item.href.replace(/^\//, ''), 'index.html');
        expect(existsSync(target)).toBe(true);
      });
    }
  }
});

import { beforeAll, describe, expect, it } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Teste de integração de ponta a ponta via build estático.
 *
 * O `experimental_AstroContainer` (usado em `sections.test.ts`) não resolve
 * `Astro.currentLocale` a partir da URL, então a renderização EN das seções
 * internas não era coberta. Este teste roda o `astro build` real e inspeciona
 * o HTML gerado em `dist/`, validando PT-BR e EN de forma definitiva e
 * exercitando a integração das Fases 0/1/2 (i18n, consolidação na home).
 */
const distDir = resolve(process.cwd(), 'dist');

function read(localePath: string): string {
  const file = resolve(distDir, localePath);
  if (!existsSync(file)) {
    throw new Error(`Arquivo de build ausente: ${file}. O build falhou ou não foi executado.`);
  }
  return readFileSync(file, 'utf-8');
}

beforeAll(() => {
  if (!existsSync(distDir)) {
    execSync('npm run build', { stdio: 'ignore', timeout: 180_000 });
  }
}, 200_000);

describe('Build output — locale correctness', () => {
  it('renders the EN home with lang="en" and English content', () => {
    const html = read('en/index.html');
    expect(html).toContain('<html lang="en"');
    expect(html).toContain('Research Areas');
    expect(html).toContain('Members');
  });

  it('renders the PT-BR home with lang="pt-br" and Portuguese content', () => {
    const html = read('pt-br/index.html');
    expect(html).toContain('<html lang="pt-br"');
    expect(html).toContain('Áreas de Pesquisa');
    expect(html).toContain('Membros');
  });
});

describe('Build output — home consolidation (Fase 1)', () => {
  it('exposes Areas/Projects/Publications anchors on both locales', () => {
    for (const locale of ['en', 'pt-br']) {
      const html = read(`${locale}/index.html`);
      expect(html).toContain('id="areas"');
      expect(html).toContain('id="projects"');
      expect(html).toContain('id="publications"');
    }
  });
});

describe('Build output — section pages per locale', () => {
  it('renders the Members page in EN and PT-BR with correct language', () => {
    const en = read('en/members/index.html');
    const pt = read('pt-br/members/index.html');
    expect(en).toContain('<html lang="en"');
    expect(en).toContain('Members');
    expect(pt).toContain('<html lang="pt-br"');
    expect(pt).toContain('Membros');
  });
});

import { beforeAll, describe, expect, it } from 'vitest';
import Navbar from '../../src/components/layout/Navbar.astro';
import Members from '../../src/components/sections/Members.astro';
import BaseLayout from '../../src/layouts/BaseLayout.astro';
import { renderComponent } from './render-helper';

function anchors(html: string): string[] {
  return [...html.matchAll(/<a\s[^>]*>/g)].map((m) => m[0]);
}

describe('Accessibility — language and landmarks', () => {
  let layoutHtml = '';
  beforeAll(async () => {
    layoutHtml = await renderComponent(BaseLayout, {
      props: { title: 'Teste' },
      url: 'https://example.com/pt-br/',
    });
  });

  it('BaseLayout sets the document lang attribute', () => {
    expect(layoutHtml).toContain('<html lang="pt-br">');
    expect(layoutHtml).toContain('id="main"');
  });

  let navHtml = '';
  beforeAll(async () => {
    navHtml = await renderComponent(Navbar, {
      props: { currentLocale: 'pt-br', pathname: '/pt-br/' },
    });
  });

  it('Navbar exposes a navigation landmark with an aria-label', () => {
    expect(navHtml).toContain('<nav');
    expect(navHtml).toContain('aria-label="Navegação principal"');
  });
});

describe('Accessibility — skip link and focus', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Navbar, {
      props: { currentLocale: 'pt-br', pathname: '/pt-br/' },
    });
  });

  it('Navbar provides a skip link to the main content', () => {
    expect(html).toContain('href="#main"');
  });

  it('Navbar marks the active item with aria-current', async () => {
    const active = await renderComponent(Navbar, {
      props: { currentLocale: 'pt-br', pathname: '/pt-br/members/' },
    });
    expect(active).toContain('aria-current="page"');
  });
});

describe('Accessibility — links and images', () => {
  let navHtml = '';
  beforeAll(async () => {
    navHtml = await renderComponent(Navbar, {
      props: { currentLocale: 'pt-br', pathname: '/pt-br/' },
    });
  });

  it('every anchor in Navbar has a non-empty href', () => {
    const links = anchors(navHtml);
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) {
      expect(a).toMatch(/\shref="[^"]+/);
    }
  });

  let membersHtml = '';
  beforeAll(async () => {
    membersHtml = await renderComponent(Members);
  });

  it('Members section does not render images without alt text', () => {
    const imgs = [...membersHtml.matchAll(/<img\s[^>]*>/g)].map((m) => m[0]);
    for (const img of imgs) {
      expect(img).toMatch(/\salt="/);
    }
  });
});

describe('Accessibility — interactive controls', () => {
  let membersHtml = '';
  beforeAll(async () => {
    membersHtml = await renderComponent(Members);
  });

  it('Members filter buttons expose aria-pressed state', () => {
    const buttons = [...membersHtml.matchAll(/<button\s[^>]*>/g)].map((m) => m[0]);
    expect(buttons.length).toBeGreaterThan(0);
    for (const b of buttons) {
      expect(b).toMatch(/\saria-pressed="(true|false)"/);
    }
  });

  it('Members provides a reachable heading structure', () => {
    expect(membersHtml).toMatch(/<h1/);
    expect(membersHtml).toMatch(/<h2/);
  });
});

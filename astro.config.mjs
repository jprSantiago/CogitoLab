// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Site configurado para deploy no GitHub Pages.
// A base é ajustada automaticamente no CI via variável de ambiente, se necessário.
export default defineConfig({
  // `site` e `base` são ajustados pelo CI para pages de projeto (ex.: /CogitoLab/).
  site: process.env.ASTRO_SITE || 'https://cogitolab.github.io',
  base: process.env.ASTRO_BASE || '/',
  trailingSlash: 'always',

  // i18n: URLs prefixadas (/pt-br/..., /en/...)
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: { enabled: false },
});

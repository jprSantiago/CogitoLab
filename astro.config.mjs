// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Site configurado para deploy no GitHub Pages.
// A base é ajustada automaticamente no CI via variável de ambiente, se necessário.
export default defineConfig({
  // `site` e `base` são ajustados pelo CI para pages de projeto (ex.: /CogitoLab/).
  // O padrão já reflete a project page deste repo para builds locais/uploads.
  site: process.env.ASTRO_SITE || 'https://jprsantiago.github.io/CogitoLab',
  base: process.env.ASTRO_BASE || '/CogitoLab/',
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

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt-br',
        locales: { 'pt-br': 'pt-br', en: 'en' },
      },
    }),
  ],
});

/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// Vitest é configurado com o `getViteConfig` do Astro para herdar o
// processamento de arquivos `.astro` (compilação via Vite plugin do Astro)
// e as opções do projeto (i18n, trailingSlash). Isso permite testar
// componentes e helpers lado a lado com o código de produção.
export default getViteConfig(
  {
    test: {
      environment: 'node',
      include: ['tests/**/*.test.ts'],
      globals: true,
      coverage: {
        provider: 'v8',
        reportsDirectory: './coverage',
        include: ['src/**/*.{ts,astro}'],
        exclude: [
          'src/styles/**',
          'src/pages/**',
          'src/layouts/**',
          'src/scripts/**',
          '**/*.d.ts',
          '**/types.ts',
        ],
      },
    },
  },
  {
    site: 'https://cogitolab.github.io',
    trailingSlash: 'always',
    i18n: {
      defaultLocale: 'pt-br',
      locales: ['pt-br', 'en'],
      routing: {
        prefixDefaultLocale: true,
      },
    },
  }
);

# Cogito Lab — Site Oficial

Site institucional do **Cogito Lab**, grupo de pesquisa em Engenharia de Software,
Inteligência Artificial, Qualidade, Testes, Sistemas Móveis/IoT e Inovação.

## Stack

- **Astro 5** — framework (estático, 0 JS por padrão)
- **Tailwind CSS 4** — estilização (`@tailwindcss/vite`)
- **i18n** — `@astrojs/i18n` nativo, URLs prefixadas (`/pt-br/`, `/en/`)
- **Vitest** — testes (Fase 2)
- **GitHub Pages** — deploy via GitHub Actions

## Pré-requisitos

- **Node 20+** (use o `.nvmrc`: `nvm use`).

## Comandos

```bash
npm install        # instalar dependências
npm run dev        # servidor local (http://localhost:4321)
npm run build      # build estático em dist/
npm run preview    # pré-visualizar o build
npm run lint       # astro check (tipos)
npm run test       # testes (Vitest)
npm run format     # formatação (Prettier)
```

## Estrutura de i18n

- Dicionários de UI: `src/i18n/ui.ts` (chaves por locale).
- Helpers: `src/utils/i18n.ts` — `useTranslations(locale)`, `localeUrl(locale, path)`,
  `getAlternateLocaleUrl(...)`.
- Páginas por locale: `src/pages/pt-br/` e `src/pages/en/`.
- O root `/` redireciona para o locale padrão (`/pt-br/`).

## Deploy

O workflow `.github/workflows/deploy.yml` faz build e publica em GitHub Pages.
O `base` do site é calculado automaticamente (pages de usuário vs. projeto).

## Documentação

- `docs/specs/` — especificações (Spec-Driven Development)
- `docs/decisions/` — ADRs
- `docs/ai-interactions/` — log de interações com IA
- `DEVELOPMENT_LOG.md` — log de desenvolvimento

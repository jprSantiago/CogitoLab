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
npm run test:coverage # testes + relatório de cobertura (v8)
npm run format     # formatação (Prettier)
```

## Testes

A suíte automatizada (Vitest) cobre três níveis — veja `docs/decisions/ADR-004-testing-strategy.md`:

1. **Unitários:** helpers de i18n e dados bilíngues (`src/utils/i18n.ts`, `src/data/*`),
   integridade referencial dos datasets e lógica pura de filtragem (`src/utils/filter.ts`).
2. **Integração (componentes):** renderização via `experimental_AstroContainer`
   (Navbar/Footer em PT-BR e EN; seções para conteúdo/estrutura/responsividade).
3. **Build de ponta a ponta:** `tests/integration/build-output.test.ts` roda o `astro build`
   e valida o HTML EN/PT-BR em `dist/` (incluindo a consolidação das seções na home).

Comandos:

```bash
npm run test            # roda a suíte (vitest run)
npm run test:coverage   # gera relatório de cobertura reproduzível
```

O CI (`.github/workflows/deploy.yml`) executa `lint` e `test` antes do `build`,
garantindo que o deploy só ocorre com a qualidade verde.

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

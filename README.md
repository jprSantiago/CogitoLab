# Cogito Lab — Site Oficial

Site institucional do **Cogito Lab**, grupo de pesquisa em Engenharia de Software,
Inteligência Artificial, Qualidade, Testes, Sistemas Móveis/IoT e Inovação.

> Idiomas: Português (PT-BR) e Inglês (EN). O seletor de idioma e o tema
> (claro/escuro) estão acessíveis na barra de navegação.

## Stack

- **Astro 5** — framework (estático, 0 JS por padrão)
- **Tailwind CSS 4** — estilização (`@tailwindcss/vite`)
- **i18n** — `@astrojs/i18n` nativo, URLs prefixadas (`/pt-br/`, `/en/`)
- **@astrojs/sitemap** — sitemap i18n + `robots.txt`
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
npm run lint      # astro check (tipos)
npm run test       # testes (Vitest)
npm run test:coverage # testes + relatório de cobertura (v8)
npm run format     # formatação (Prettier)
```

## Arquitetura de Conteúdo

O `Instructions.md` **não exige** estrutura de páginas fixa. Decisão adotada:

- **Home (`/pt-br/`, `/en/`)** consolida as seções **Áreas**, **Projetos** e
  **Publicações** (com âncoras `#areas`, `#projects`, `#publications`), além do
  hero, estatísticas, tecnologias e CTA.
- **Páginas dedicadas** para o restante: `members`, `artifacts`, `news`
  (paginada), `join`, `partners`, `about`, `contact`.
- **Dados bilíngues tipados** em `src/data/*` com `Localized<T>` + `pick()`
  (`src/data/types.ts`), separados da apresentação.
- **UI strings** em dicionário tipado `src/i18n/ui.ts`, resolvidas via `t()`.
- **0 JS por padrão**: filtros/busca e revelação no scroll usam progressive
  enhancement (sem JS, todo o conteúdo permanece visível/acessível).

## Estrutura do Projeto

```
src/
├── components/
│   ├── common/      # BrainLogo, FilterBar, etc.
│   ├── layout/      # Navbar, Footer, IntroSplash
│   └── sections/    # Home, Areas, Members, Projects, ...
├── config/site.ts   # SITE_CONFIG
├── data/            # datasets bilíngues tipados
├── i18n/            # config.ts, ui.ts (dicionário)
├── layouts/         # BaseLayout, PageLayout, ArticleLayout
├── pages/           # index.astro (redirect) + pt-br/ + en/
├── scripts/         # list-filter.ts (progressive enhancement)
├── styles/global.css
└── utils/           # i18n.ts, filter.ts
tests/               # unit/ + integration/ (Vitest)
docs/                # specs/, decisions/ (ADRs), ai-interactions/
.github/workflows/   # deploy.yml (lint + test + build + Pages)
```

## Testes

A suíte automatizada (Vitest) cobre três níveis — veja `docs/decisions/ADR-004-testing-strategy.md`:

1. **Unitários:** helpers de i18n e dados bilíngues (`src/utils/i18n.ts`, `src/data/*`),
   integridade referencial dos datasets e lógica pura de filtragem (`src/utils/filter.ts`).
2. **Integração (componentes):** renderização via `experimental_AstroContainer`
   (Navbar/Footer em PT-BR e EN; seções para conteúdo/estrutura/responsividade).
3. **Build de ponta a ponta:** `tests/integration/build-output.test.ts` roda o `astro build`
   e valida o HTML EN/PT-BR em `dist/` (incluindo a consolidação das seções na home),
   além de checar que cada `navItems` resolve para uma página existente.

Comandos:

```bash
npm run test            # roda a suíte (vitest run)
npm run test:coverage   # gera relatório de cobertura reproduzível
```

O CI (`.github/workflows/deploy.yml`) executa `lint` e `test` antes do `build`,
garantindo que o deploy só ocorre com a qualidade verde.

## SEO

- Meta tags por página (`title`/`description` via dicionário `meta.*`),
  **Open Graph**, **Twitter Card**, **hreflang** (i18n) e **canonical** em
  `BaseLayout.astro`.
- **JSON-LD** (`ResearchOrganization` + `WebSite`) injetado em todas as páginas.
- **Sitemap i18n** (`@astrojs/sitemap`) e **`robots.txt`** gerados no build.
- Imagem de OG: `public/og-image.svg` (vetorial; ver nota em `DEVELOPMENT_LOG.md`).

## Deploy

O workflow `.github/workflows/deploy.yml` faz build e publica em GitHub Pages
em cada push para `main`. O `base`/`site` são calculados automaticamente
(pages de usuário vs. projeto) via variáveis de ambiente no CI.

## Documentação

- `docs/specs/` — especificações (Spec-Driven Development)
- `docs/decisions/` — ADRs (001 Astro, 002 Tailwind, 003 i18n, 004 Testing)
- `docs/ai-interactions/` — log de interações com IA
- `DEVELOPMENT_LOG.md` — log de desenvolvimento e reflexão final

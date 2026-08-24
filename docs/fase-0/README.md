# Fase 0 — Fundação

> Índice organizacional da Fase 0 (Semana 1). Este arquivo **não move** nenhum
> arquivo; apenas referencia os artefatos originais do projeto.
> Objetivo: setup do projeto e infraestrutura básica.

## Roadmap e Logs

- `ORGANIZATION.md` — Roadmap completo (seção "Fase 0: Fundação", linha 95)
- `DEVELOPMENT_LOG.md` — Registro da Fase 0 (seção "2026-08-24 — Fase 0: Fundação", linha 8)
- `docs/ai-interactions/prompts-log.md` — Inicialização da Fase 0 (linha 8)

## Tarefas e Status

| Tarefa | Spec | Arquivo(s) de referência | Status |
|--------|------|--------------------------|--------|
| Inicializar projeto Astro | `docs/specs/00-home-page.md` | `astro.config.mjs`, `package.json`, `.nvmrc`, `tsconfig.json` | ✅ |
| Configurar Tailwind CSS | — | `src/styles/global.css`, `package.json` (`@tailwindcss/vite`) | ✅ |
| Configurar i18n (PT-BR/EN) | `docs/specs/10-i18n-system.md` | `src/i18n/config.ts`, `src/i18n/ui.ts`, `src/utils/i18n.ts` | ✅ |
| Criar layout base (BaseLayout) | — | `src/layouts/BaseLayout.astro`, `PageLayout.astro`, `ArticleLayout.astro` | ✅ |
| Criar Navbar e Footer | — | `src/components/layout/Navbar.astro`, `src/components/layout/Footer.astro` | ✅ |
| Configurar GitHub Actions para deploy | — | `.github/workflows/deploy.yml` | ✅ |
| Criar ADR-001 (Astro) e ADR-002 (Tailwind) | — | `docs/decisions/ADR-001-astro-framework.md`, `docs/decisions/ADR-002-tailwind-css.md` | ✅ |

**Entregável:** Projeto rodando localmente com i18n funcional e deploy automático.

## Decisões Arquiteturais (ADRs)

- `docs/decisions/ADR-001-astro-framework.md`
- `docs/decisions/ADR-002-tailwind-css.md`

## Specs contempladas pela Fase 0

- `docs/specs/00-home-page.md` — Home page / inicialização do projeto
- `docs/specs/10-i18n-system.md` — Sistema de i18n

## Arquivos de código criados na Fase 0

### Configuração e infraestrutura
- `astro.config.mjs`
- `package.json` / `package-lock.json`
- `tsconfig.json`
- `.nvmrc`
- `src/styles/global.css`
- `src/config/site.ts`
- `.github/workflows/deploy.yml`
- `public/favicon.svg`

### i18n
- `src/i18n/config.ts`
- `src/i18n/ui.ts`
- `src/utils/i18n.ts`

### Layouts
- `src/layouts/BaseLayout.astro`
- `src/layouts/PageLayout.astro`
- `src/layouts/ArticleLayout.astro`

### Componentes de layout
- `src/components/layout/Navbar.astro`
- `src/components/layout/Footer.astro`

### Seções e páginas
- `src/components/sections/Home.astro`
- `src/pages/index.astro` (redireciona para `/pt-br/`)
- `src/pages/pt-br/index.astro`
- `src/pages/en/index.astro`

## Verificação (Fase 0)

Conforme `DEVELOPMENT_LOG.md`:
- `npm run build` → sucesso (3 HTML: `/`, `/pt-br/`, `/en/`)
- `npm run lint` (astro check) → 0 erros
- Preview: `/` redireciona; `/pt-br/` e `/en/` retornam 200; hreflang e seletor de idioma presentes

## Próximas fases

- **Fase 1:** Conteúdo estático — `ORGANIZATION.md` (linha 112)
- **Fase 2:** Qualidade e testes — `ORGANIZATION.md` (linha 133)
- **Fase 3:** Refinamento e deploy — `ORGANIZATION.md` (linha 150)

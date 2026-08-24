# Fase 1 — Conteúdo Estático

> Índice organizacional da Fase 1 (Semanas 2-3). Referencia os artefatos do projeto.

## Roadmap e Logs

- `ORGANIZATION.md` — Roadmap (seção "Fase 1: Conteúdo Estático", linha 112)
- `DEVELOPMENT_LOG.md` — Registro da Fase 1 (seção "2026-08-24 — Fase 1: Conteúdo Estático")
- `docs/ai-interactions/prompts-log.md` — Interação da Fase 1

## Tarefas e Status

| Tarefa | Spec | Arquivo(s) | Status |
|--------|------|------------|--------|
| Home page (identidade) | `00-home-page.md` | `src/components/sections/Home.astro` (Fase 0) | ✅ |
| Seção de Áreas | `04-areas-section.md` | `src/components/sections/Areas.astro`, `src/data/areas.ts` | ✅ |
| Página Sobre | — | `src/components/sections/About.astro` | ✅ |
| Seção de Membros | `01-members-section.md` | `src/components/sections/Members.astro`, `src/data/members.ts` | ✅ |
| Seção de Projetos | `02-projects-section.md` | `src/components/sections/Projects.astro`, `src/data/projects.ts` | ✅ |
| Seção de Publicações | `03-publications-section.md` | `src/components/sections/Publications.astro`, `src/data/publications.ts` | ✅ |
| Seção de Notícias | `05-news-section.md` | `src/components/sections/News.astro`, `src/data/news.ts`, `src/pages/*/news/[...page].astro` | ✅ |
| Seção de Artefatos | `06-artifacts-section.md` | `src/components/sections/Artifacts.astro`, `src/data/artifacts.ts` | ✅ |
| Página Junte-se | `07-join-section.md` | `src/components/sections/Join.astro` | ✅ |
| Página Parceiros | `08-partners-section.md` | `src/components/sections/Partners.astro`, `src/data/partners.ts` | ✅ |
| Página Contato | `09-contact-section.md` | `src/components/sections/Contact.astro` | ✅ |

**Entregável:** Site com todas as seções implementadas e conteúdo em PT-BR e EN.

## Decisões Arquiteturais

- **Dados bilíngues tipados** (`src/data/*` + `Localized`/`pick`) em vez de
  Content Collections — i18n mais simples e manutenção facilitada (ver DEVELOPMENT_LOG).
- **Filtros com progressive enhancement** (`src/scripts/list-filter.ts`): 0 JS por
  padrão; com JS, filtragem por grupo e busca textual.
- **Paginação build-time** de notícias via `paginate()`.
- **Detalhes expandíveis** com `<details>` nativo (acessível, 0 JS).

## Verificação

- `npm run build` → 24 páginas (`/`, 12 `pt-br/...`, 12 `en/...`, incluindo `/pt-br/news/2/`).
- `npm run lint` (astro check) → 0 erros / 0 warnings / 0 hints.
- HTML estático com `lang` correto, hreflang e seletor de idioma funcionais.

## Próximas fases

- **Fase 2:** Testes automatizados (Vitest) + a11y/performance — `ORGANIZATION.md` (linha 133)
- **Fase 3:** SEO/meta, README, deploy final, reflexão — `ORGANIZATION.md` (linha 150)

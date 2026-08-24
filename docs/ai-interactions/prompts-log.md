# Log de Interações com IA — Cogito Lab

Registro de interações relevantes com agentes de IA, conforme
`ORGANIZATION.md` (seção 5.4).

---

## 2026-08-24 — Inicialização da Fase 0 (Scaffold completo)

**Objetivo:** Criar do zero a fundação do projeto Astro + Tailwind + i18n,
layouts, Navbar/Footer, deploy e ADRs.

**Prompt:** "inicie a fase 0 do projeto @ORGANIZATION.md" — executar todas as
tarefas da Fase 0 definidas no roadmap.

**Ferramenta/Modelo:** opencode (agente de IA em CLI, modelo hy3-free).

**Output Resumido:**
- Provisionou Node 20 LTS local (ambiente tinha apenas Node 12).
- Criou `package.json`, `astro.config.mjs` (i18n + Tailwind v4 via Vite), `tsconfig.json`.
- Implementou dicionário i18n tipado (`src/i18n/ui.ts`) + helpers (`src/utils/i18n.ts`).
- Criou `BaseLayout` (com hreflang/SEO), `PageLayout`, `ArticleLayout`, `Navbar`
  (seletor de idioma), `Footer`.
- Criou home em `pt-br/` e `en/` + redirect no root.
- Criou `.github/workflows/deploy.yml` (GitHub Pages) com `ASTRO_BASE` dinâmico.
- Escreveu ADR-001 (Astro) e ADR-002 (Tailwind).
- Resolveu conflito de versões de Vite via `overrides` no `package.json`.

**Decisão:** Aceito (com revisão humana recomendada).

**Justificativa:** Entrega cobre todos os itens da Fase 0; build e lint passam.

**Modificações:** Ajustes durante a execução: mudança de estrutura de páginas
de `src/pages/index.astro` único para pastas `pt-br/` e `en/` (modelo i18n do
Astro com `prefixDefaultLocale: true`); adição de helper `localeUrl()` para
garantir barras finais nos links.

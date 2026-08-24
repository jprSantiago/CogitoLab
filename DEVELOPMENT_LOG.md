# Development Log — Cogito Lab Website

Este arquivo registra decisões, implementações e interações com agentes de IA
ao longo do desenvolvimento do site.

---

## 2026-08-24 — Fase 0: Fundação

**Objetivo:** Setup do projeto e infraestrutura básica.

### Decisões
- **Ambiente Node:** O ambiente original tinha Node 12 (incompatível com Astro).
  É necessário **Node 20 LTS** (definido em `.nvmrc`); instale/ative com
  `nvm install` / `nvm use`. Documentar para novos colaboradores.
- **Astro 5 + Tailwind 4:** Astro 5.18 com `@tailwindcss/vite` (Tailwind v4,
  configuração via CSS `@theme`). Veja ADR-001 e ADR-002.
- **Conflito de Vite:** `@tailwindcss/vite` traz Vite 7 como dependência, enquanto
  o Astro bundleia Vite 6. Resolvido com `overrides` no `package.json`
  (`"vite": "6.4.3"`), unificando para uma única versão e eliminando erros de tipo.
- **i18n:** `prefixDefaultLocale: true` → URLs `/pt-br/...` e `/en/...`.
  Páginas por locale em `src/pages/pt-br/` e `src/pages/en/`. Traduções de UI em
  `src/i18n/ui.ts` (dicionário tipado) com helper `t()` em `src/utils/i18n.ts`.
  O root `/` redireciona para `/pt-br/`.
- **Deploy:** GitHub Actions (`deploy.yml`) com Pages + upload do `dist`,
  calculando `ASTRO_BASE` automaticamente para pages de projeto.

### Arquivos criados
- `astro.config.mjs`, `tsconfig.json`, `package.json`, `.nvmrc`
- `src/i18n/{config,ui}.ts`, `src/utils/i18n.ts`, `src/config/site.ts`
- `src/styles/global.css`
- `src/layouts/{BaseLayout,PageLayout,ArticleLayout}.astro`
- `src/components/layout/{Navbar,Footer}.astro`
- `src/components/sections/Home.astro`
- `src/pages/index.astro`, `src/pages/pt-br/index.astro`, `src/pages/en/index.astro`
- `public/favicon.svg`
- `.github/workflows/deploy.yml`
- `docs/decisions/ADR-001-astro-framework.md`, `docs/decisions/ADR-002-tailwind-css.md`

### Verificação
- `npm run build` → sucesso (3 HTML: `/`, `/pt-br/`, `/en/`).
- `npm run lint` (astro check) → 0 erros.
- Preview: `/` redireciona, `/pt-br/` e `/en/` retornam 200 com conteúdo correto;
  hreflang e seletor de idioma presentes.

### Próximos passos
- Fase 1: páginas de conteúdo (Áreas, Membros, Projetos, Publicações, Notícias,
  Artefatos, Junte-se, Parceiros, Contato) + content collections.

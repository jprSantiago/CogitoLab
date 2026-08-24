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

---

## 2026-08-24 — Revisão visual da Fase 0 (estilo Discord + azul Cruzeiro)

**Objetivo:** Reestilizar a interface da Fase 0 com estética tipo Discord, animações,
vibe 3D e transição de cor: o primeiro frame é **branco** e, ao rolar a página, o
fundo vira **azul** (tom do Cruzeiro Esporte Clube). Sem iniciar a Fase 1; requisitos
da Fase 0 mantidos intactos.

### Decisões
- **Transição branco→azul no scroll:** implementada com um pequeno `<script>` inline
  que atualiza a variável CSS `--scroll` (1 no topo → 0 no fim). Decisão: manter JS
  (e não CSS `animation-timeline: scroll()`) para funcionar em 100% dos navegadores,
  inclusive Safari — conforme escolha do usuário. `--scroll:1` é o padrão em `:root`,
  garantindo o "primeiro frame branco" mesmo antes do JS rodar.
- **Paleta azul Cruzeiro:** adicionada em `global.css` (`--color-cruzeiro-*`).
- **0 JS por padrão:** apenas o script de scroll foi adicionado; restante é CSS puro.

### Arquivos alterados
- `src/styles/global.css` — paleta Cruzeiro; `.page-bg` (azul revelado por overlay
  branco); `.glass`/`.glass-dark` (vidro Discord); `.card-3d` (profundidade 3D);
  `.btn-primary`/`.btn-ghost`; `.logo-badge`; keyframes `fadeUp`/`floaty`; revelação
  no scroll; `:focus-visible` azul; `prefers-reduced-motion`.
- `src/layouts/BaseLayout.astro` — `<div class="page-bg">` + script de scroll.
- `src/components/layout/Navbar.astro` — glass, badge azul, hover azul.
- `src/components/layout/Footer.astro` — glass, badge azul, hover azul.
- `src/components/sections/Home.astro` — hero animado (fade-up escalonado + logo
  flutuante), cards 3D, CTA em painel azul escuro estilo Discord.

### Verificação
- `npm install` (node_modules ausente) → ok.
- `npm run build` → 3 HTML (`/`, `/pt-br/`, `/en/`) sem erro.
- `npm run lint` (astro check) → 0 erros / 0 warnings.
- Conteúdo PT-BR/EN e estrutura i18n preservados; contraste mantido (cards claros
  com texto escuro sobre o fundo dinâmico; CTA escuro com texto branco).

---

## 2026-08-24 — Fase 1: Conteúdo Estático

**Objetivo:** Implementar as páginas principais com conteúdo real em PT-BR e EN,
seguindo as specs `docs/specs/00`–`09` e o fluxo Spec-Driven (SPEC → PLAN → BUILD → TEST).

### Decisões
- **Camada de dados bilíngue:** em vez de Content Collections do Astro (complexas
  para i18n multi-arquivo), adotou-se módulos tipados em `src/data/*` com o tipo
  `Localized<T> = { 'pt-br'; 'en' }` e helper `pick(locale, value)` (`src/data/types.ts`).
  Espelha o modelo das specs (ex.: `title` + `titlePt` no mesmo registro) e mantém
  i18n limpo, com fallback para PT-BR.
- **Filtros (0 JS por padrão, com progressive enhancement):** lista filtrável via
  `data-filter-*` + script Vanilla mínimo (`src/scripts/list-filter.ts`). Sem JS,
  todos os itens permanecem visíveis. Botões usam `aria-pressed` e variante
  `aria-pressed:` do Tailwind. Busca de publicações também via esse script.
- **Paginação de notícias:** build-time com `paginate()` em
  `src/pages/{pt-br,en}/news/[...page].astro` (4 itens/página) + controles de
  navegação. Filtro de categoria por JS coexiste na mesma página.
- **Detalhes expandíveis (Projetos/Áreas):** elemento nativo `<details>`/`<summary>`
  (acessível, 0 JS).
- **Sobre:** página adicional (`/about`) criada (não havia spec dedicada; alinhada
  ao ADR-003 e ao item "Página Sobre" do roadmap). Adicionada à navegação.
- **Estrutura de arquivos:** um componente `src/components/sections/<Secao>.astro`
  por seção + wrappers finos `src/pages/{pt-br,en}/<secao>/index.astro` (padrão
  já usado na Home da Fase 0).

### Arquivos criados
- `src/data/types.ts`, `src/data/{areas,members,projects,publications,news,artifacts,partners}.ts`
- `src/scripts/list-filter.ts` (filtro/busca client-side)
- `src/components/sections/{Areas,Members,Projects,Publications,News,Artifacts,Partners,Join,Contact,About}.astro`
- `src/pages/pt-br/{areas,members,projects,publications,artifacts,partners,join,contact,about}/index.astro`
- `src/pages/en/{areas,members,projects,publications,artifacts,partners,join,contact,about}/index.astro`
- `src/pages/pt-br/news/[...page].astro`, `src/pages/en/news/[...page].astro`
- Extensão do dicionário i18n em `src/i18n/ui.ts` (todas as chaves de seção)

### Verificação
- `npm run build` → 24 páginas (`/`, `/pt-br/*` (12), `/en/*` (12), incl. `/pt-br/news/2/`).
- `npm run lint` (astro check) → 0 erros, 0 warnings, 0 hints.
- `lang` alterna corretamente (pt-br/en) e hreflang presente; filtros/paginação
  gerados no HTML estático.

### Próximos passos
- Fase 2: testes (Vitest), a11y, performance (ADR-004).
- Fase 3: SEO/meta, README, deploy final, reflexão.

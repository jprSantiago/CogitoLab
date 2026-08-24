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

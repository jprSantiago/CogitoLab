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

---

## 2026-08-25 — Mudança de tema: azul desde o primeiro frame + consolidação na home

**Objetivo:** Alterar o tema para que o site seja **azul com texto branco/claro desde o
primeiro frame** (e permaneça azul ao rolar), conforme pedido do usuário; e transferir
as seções **Áreas de Pesquisa, Projetos e Publicações** para a página principal, já que
o `Instructions.md` (seção 5) **não exige** estrutura de páginas fixa ("There is no
mandatory page structure").

### Decisões
- **Fundo sempre azul:** removido o overlay branco (`.page-bg::after`) e o JS que variava
  `--scroll` no scroll. O `--scroll` deixou de existir; o `BaseLayout` mantém apenas o
  script de `data-scrolled` (sombra da navbar ao rolar). `color-scheme` mudou para `dark`.
- **Legibilidade no azul:** texto direto sobre o fundo azul passou a ser claro
  (`text-white` / `text-cruzeiro-100/200`); os cartões (`card-3d`, `glass`) continuam
  claros com texto escuro (`text-cogito-800`), formando o contraste "azul + branco".
  Pílulas de filtro (`.filter-pill`) e inputs de busca reestilizados para o tema azul.
- **Navbar e Footer** passaram a ser translúcidos azuis (`bg-cruzeiro-900/40`) com texto
  branco; menu mobile e links ajustados.
- **Consolidação na home:** `pt-br/index.astro` e `en/index.astro` agora renderizam
  `<Home/>`, `<Areas/>`, `<Projects/>`, `<Publications/>`. As seções receberam `id`
  (`#areas`, `#projects`, `#publications`) com `scroll-mt-24` para o navbar fixo.
- **Remoção de páginas dedicadas:** excluídos `src/pages/{pt-br,en}/{areas,projects,publications}/`.
  Itens correspondentes removidos de `navItems` (`src/utils/i18n.ts`) e do rodapé.
- **Links internos:** referências cruzadas dentro das seções transferidas agora usam
  âncoras (`#projects`, `#publications`); links para páginas ainda existentes
  (`/artifacts`) foram mantidos.

### Arquivos alterados
- `src/styles/global.css` — fundo azul fixo; `body` claro; `card-3d`/`glass` com texto
  escuro; `.filter-pill` azul.
- `src/layouts/BaseLayout.astro` — script de scroll simplificado.
- `src/components/layout/{Navbar,Footer}.astro` — tema azul translúcido.
- `src/components/sections/Home.astro` — hero claro; atalhos de seção com âncoras.
- `src/components/sections/{Areas,Projects,Publications,Members,News,Artifacts,Partners,Join,About,Contact}.astro`
  — cabeçalhos/filtros claros; `id` nas seções transferidas; cross-links por âncora.
- `src/utils/i18n.ts`, `src/pages/{pt-br,en}/index.astro` — remoção de páginas e consolidação.

### Verificação
- `npm run build` → 18 páginas, sem erro.
- `npm run lint` (astro check) → 0 erros / 0 warnings / 0 hints.
- i18n PT-BR/EN preservado; contraste mantido (cartões claros + texto claro sobre azul).

---

## 2026-08-25 — Filtros colapsáveis, cards minimalistas, publicações expansíveis e nav ativa

**Objetivo:** (1) adicionar UFLA e DCC como parceiros; (2) esconder os filtros atrás de um
botão "Filtros" em todas as seções com filtragem; (3) tornar os cards de publicações
minimalistas com expansão ao clicar; (4) deixar todos os cartões mais limpos/minimalistas;
(5) destacar a página ativa no menu.

### Decisões
- **Filtros colapsáveis (0 JS):** criado `src/components/common/FilterBar.astro` que envolve
  os controles de filtro em um `<details>` nativo com `<summary>` estilizada como botão
  "Filtros" (chave `common.filter`, já existente). Aplicado em Members, News, Artifacts,
  Partners, Projects e Publications. Mantém progressive enhancement: sem JS os filtros
  aparecem recolhidos e a filtragem continua funcionando ao abrir.
- **Publicações expansíveis:** cada publicação virou um `<li class="card-3d">` contendo um
  `<details>`; o `<summary>` mostra apenas título + veículo·ano + tipo (card minimalista),
  e o corpo (autores, DOI/links, artefatos, projetos relacionados) aparece ao clicar.
  Chevron `▾` indica expansão (CSS `.details-chevron`).
- **Cards minimalistas:** `.card-3d` reestilizado em `global.css` — bordas mais suaves,
  sombra leve e hover sutil (`translateY(-3px)`), removendo o efeito 3D pesado. Aplica-se
  uniformemente a todos os cartões do site.
- **Nav ativa:** `Navbar.astro` calcula a rota atual (`pathname`) e marca o item ativo com
  `aria-current="page"` + destaque (`bg-white/15` + texto branco e semibold), no menu
  desktop e no menu mobile.
- **Parceiros:** adicionados `ufla` (Universidade Federal de Lavras) e `dcc-ufla`
  (DCC — Departamento de Ciência da Computação da UFLA) em `src/data/partners.ts`.

### Arquivos alterados
- `src/data/partners.ts` — UFLA e DCC.
- `src/components/common/FilterBar.astro` — novo componente.
- `src/components/sections/{Members,News,Artifacts,Partners,Projects,Publications}.astro`
  — filtros envolvidos em `FilterBar`; Publications com cards expansíveis.
- `src/components/layout/Navbar.astro` — estado ativo.
- `src/styles/global.css` — `.card-3d` minimalista; `.filter-summary`/`.filter-chevron`
  e `.details-chevron`.

### Verificação
- `npm run build` → 18 páginas, sem erro.
- `npm run lint` (astro check) → 0 erros / 0 warnings / 0 hints.
- HTML gerado confirma: UFLA/DCC em parceiros; botão "Filtros" e `<details>` nas
  publicações; `aria-current="page"` nas páginas de menu correspondentes.

---

## 2026-08-25 — Fase 2: Qualidade e Testes

**Objetivo:** Garantir qualidade, testes automatizados e acessibilidade (Fase 2 do
`ORGANIZATION.md`), conforme `Instructions.md` §7–§8.

### Decisões
- **Vitest + getViteConfig do Astro** (`vitest.config.ts`): herda o processamento
  de `.astro` e a config de i18n, permitindo testar componentes e helpers lado a
  lado com o código de produção. Veja **ADR-004**.
- **Extração de lógica pura:** a decisão de filtragem (`src/scripts/list-filter.ts`)
  foi delegada a `src/utils/filter.ts` (`itemMatches`), função pura e testável sem
  DOM. O script client-side apenas adapta atributos `data-filter-*` para esse
  formato — comportamento preservado.
- **Estratégia de testes em 3 níveis:** (1) unitários (i18n, dados, filtro);
  (2) integração de componentes via `experimental_AstroContainer` (Navbar/Footer
  nos dois locales; seções para conteúdo/estrutura/responsividade); (3) auditoria
  a11y estrutural (lang, landmarks, skip link, aria-current, aria-pressed, imgs/anchors).
- **Cobertura EN de seções:** o Container não resolve `Astro.currentLocale` pela
  URL, então seções internas renderizam em PT-BR no teste. O EN é coberto por
  (a) Navbar/Footer testados em PT e EN (props) e (b) testes unitários completos
  de `t()`/`pick()` (fonte única de verdade da tradução). Justificativa detalhada
  em ADR-004.

### Arquivos criados
- `vitest.config.ts` — configuração Vitest + coverage (v8).
- `tests/unit/i18n.test.ts`, `tests/unit/data.test.ts`, `tests/unit/filter.test.ts`
- `tests/integration/navigation.test.ts`, `tests/integration/sections.test.ts`,
  `tests/integration/a11y.test.ts`, `tests/integration/render-helper.ts`
- `src/utils/filter.ts` (lógica pura extraída de `list-filter.ts`)
- `docs/decisions/ADR-004-testing-strategy.md`

### Arquivos alterados
- `src/scripts/list-filter.ts` — usa `itemMatches` de `src/utils/filter.ts`.

### Verificação
- `npm run test` → **78 testes passando** em 6 arquivos (unit + integration).
- `npm run test:coverage` → **~97%** de cobertura em `src/**`.
- `npm run build` → 18 páginas, sem erro (refactor do filtro não quebrou nada).
- `npm run lint` (astro check) → 0 erros / 0 warnings (alguns *hints* em testes).

### Cenários deliberadamente não testados (e por quê)
- **Responsividade visual / cross-browser / E2E:** exigem navegador real; cobertos
  por verificação manual (`npm run dev`) e por asserts estruturais de breakpoints.
- **Performance de runtime:** validada por inspeção do build (0 JS por padrão) e CI.

### Próximos passos
- Fase 3: SEO/meta tags, README completo, deploy final, reflexão final (§11).

---

## 2026-08-25 — Revisão da Fase 2 (integração e qualidade)

**Objetivo:** Revisar as entregas da Fase 2 contra `ORGANIZATION.md`, `Instructions.md`
(§7–§8) e `CLAUDE.md`; garantir boa integração com as Fases 0/1 e corrigir lacunas.

### Problemas identificados na revisão
- **CI não exercitava a qualidade:** `deploy.yml` só rodava `build`/`deploy`, sem
  `lint` nem `test` — a suíte da Fase 2 não protegia o deploy.
- **Lacuna de cobertura EN das seções:** o `experimental_AstroContainer` não resolve
  `Astro.currentLocale`, então `sections.test.ts` validava apenas PT-BR nas seções
  internas (gap já assumido no ADR-004).
- **Teste de fallback de `t()` confuso** (`tests/unit/i18n.test.ts`): não exercitava
  o caminho real; a paridade estrita do dicionário torna o fallback para o locale
  padrão inatingível para chaves reais.
- **README** não citava `test:coverage` nem a estratégia de testes (reprodutibilidade
  de cobertura exigida pelo `Instructions.md` §8).
- **Sem teste de `navItems` ↔ páginas construídas**, risco de link quebrado após a
  consolidação da home.

### Decisões e alterações
- **Quality gates no CI:** `deploy.yml` agora executa `npm run lint` e `npm run test`
  (após `npm ci`, antes do `build`). Deploy só ocorre com qualidade verde.
- **Teste de build de ponta a ponta:** novo `tests/integration/build-output.test.ts`
  roda `astro build` e inspeciona `dist/`, validando EN (`lang="en"`, "Research Areas",
  "Members") e PT-BR (`lang="pt-br"`, "Áreas de Pesquisa", "Membros"), além das âncoras
  de consolidação (`#areas`, `#projects`, `#publications`) e da página Members nos dois
  locales. Fecha a lacuna EN de forma definitiva e exercita Fases 0/1/2 juntas.
- **navItems ↔ páginas:** `navigation.test.ts` agora testa que cada `navItems` resolve
  para um `index.html` existente em `dist/{pt-br,en}/...`, prevenindo links quebrados.
- **Teste de fallback saneado:** substituído o bloco confuso por um assert claro de que
  chaves reais resolvem para o valor do próprio locale (PT≠EN), documentando a paridade.
- **README** atualizado com `test:coverage` e subseção "Testes" apontando ADR-004.

### Verificação
- `npm run test` → suíte estendida passando (inclui `build-output` + `navItems`).
- `npm run test:coverage` → relatório reproduzível.
- `npm run lint` → 0 erros.
- `npm run build` → 18 páginas; CI executa lint+test antes do deploy.

### Decisão de IA (opencode)
- Uso do opencode para auditar a Fase 2 e propor as 6 melhorias; revisão crítica
  aplicada (gap EN resolvido por build real, não por refactor de componentes).





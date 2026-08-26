# Log de Interações com IA — Cogito Lab

Registro de interações relevantes com agentes de IA, conforme
`ORGANIZATION.md` (seção 5.4).

Este arquivo atende ao critério de avaliação **4.5 — Uso crítico de Inteligência
Artificial**, documentando não apenas *o que* a IA produziu, mas *como* as
instruções foram formuladas, *como* as respostas foram avaliadas criticamente e
*quais* sugestões foram modificadas ou rejeitadas.

---

## Como eu formulo instruções (padrão adotado)

Ao longo do projeto, o padrão de prompt evoluiu de comandos genéricos para
instruções estruturadas. O formato atualmente adotado contém sempre:

1. **Papel do modelo** — ex.: "atuando como Engenheiro de Qualidade Sênior em
   Astro/Vitest".
2. **Objetivo explícito** — o que deve ser entregue.
3. **Restrições** — o que **não** fazer (ex.: não adicionar runtime JS só para
   testar; manter i18n PT-BR/EN; 0 JS por padrão).
4. **Critério de aceitação** — como a entrega será validada (`npm run lint`,
   `npm run test`, `npm run test:coverage`, checagens de a11y).
5. **Loop de validação** — rodar build/lint/test após cada mudança e só então
   aceitar.

Esse padrão é ilustrado nas seções abaixo, que registram **fielmente** o prompt
efetivamente usado e, quando aplicável, a **versão aprimorada** que passou a ser
adotada nas fases seguintes.

---

## 2026-08-24 — Inicialização da Fase 0 (Scaffold completo)

**Objetivo:** Criar do zero a fundação do projeto Astro + Tailwind + i18n,
layouts, Navbar/Footer, deploy e ADRs.

**Prompt utilizado (registro fiel):**
> "inicie a fase 0 do projeto @ORGANIZATION.md" — executar todas as tarefas da
> Fase 0 definidas no roadmap.

**Como a instrução foi melhorada (padrão adotado nas fases seguintes):**
> "Atue como Engenheiro de Software Sênior. Crie a fundação do projeto (Astro 5 +
> Tailwind v4 + i18n) respeitando ESTES limites: (a) site estático, 0 JS por
> padrão; (b) i18n PT-BR/EN via dicionário tipado; (c) deploy em GitHub Pages via
> Actions. Valide com `npm run lint` e `npm run build` após cada mudança. Não
> introduza dependências sem justificar."

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

---

## 2026-08-24 — Fase 1: Conteúdo Estático (todas as seções)

**Objetivo:** Implementar as 11 páginas/seções da Fase 1 com conteúdo real,
filtros, paginação e i18n PT-BR/EN, conforme `ORGANIZATION.md` e as specs 00–09.

**Prompt utilizado (registro fiel):**
> "De acordo com o @ORGANIZATION.md Inicie a fase 1, utilize o opencode para
> auxiliá-lo, faça como os criterios pedem e como o planejamento diz."

**Como a instrução foi melhorada (padrão adotado):**
> "Implemente a Fase 1 seguindo Spec-Driven (SPEC → PLAN → BUILD → TEST). Limites:
> (a) dados bilíngues tipados desacoplados da apresentação; (b) filtros com
> progressive enhancement (0 JS por padrão); (c) paginação de notícias em
> build-time. Para cada seção, cite a spec correspondente. Valide com build+lint."

**Ferramenta/Modelo:** opencode (agente de IA em CLI, modelo hy3-free).

**Output Resumido:**
- Criou camada de dados tipada e bilíngue (`src/data/*` + `Localized`/`pick`).
- Estendeu o dicionário i18n (`ui.ts`) com todas as chaves de seção.
- Implementou filtro/busca client-side reutilizável (`src/scripts/list-filter.ts`)
  com progressive enhancement (0 JS por padrão).
- Criou 10 componentes de seção + wrappers `pt-br`/`en` + paginação de notícias
  via `paginate()` (build-time).
- Usou `<details>` para detalhes expandíveis (projetos/áreas) — 0 JS.

**Decisão:** Aceito (com revisão humana recomendada).

**Justificativa:** Cobertura completa das specs da Fase 1; `build` (24 páginas) e
`lint` (0 erros) passam; padrões da Fase 0 preservados (Tailwind, i18n, a11y).

**Modificações:** Pequenos ajustes de caminho de import (`../` vs `../../`) nos
wrappers de páginas e correção de tipagem (`Localized` indexado por locale);
remoção de imports não utilizados após lint.

---

## 2026-08-25 — Fase 2: Qualidade e Testes (Vitest + a11y)

**Objetivo:** Configurar Vitest e escrever testes unitários, de integração e de
acessibilidade para o site, conforme `ORGANIZATION.md` (Fase 2) e `Instructions.md` §7–§8.

**Prompt utilizado (registro fiel):**
> "de acordo com o @ORGANIZATION.md , @CLAUDE.md , @Instructions.md , inicie a
> fase 2" — ler todos os arquivos relevantes e implementar a Fase 2.

**Como a instrução foi melhorada (padrão adotado — versão que passou a ser usada
nas revisões e na Fase 3):**

> "Implemente a suíte de testes da Fase 2 respeitando ESTES limites:
> (a) site estático Astro 5, 0 JS por padrão — não adicione runtime só para
> testar;
> (b) i18n PT-BR/EN via dicionário tipado + helper `pick()`;
> (c) cobertura mínima de 90% em `src/utils` e `src/data`;
> (d) ESTRATÉGIA obrigatória: documente em ADR-004 quais cenários NÃO serão
> testados e o porquê.
> Valide com `npm run lint`, `npm run test` e `npm run test:coverage` após cada
> mudança. Se o `experimental_AstroContainer` não resolver `currentLocale`, NÃO
> refatore componentes de produção para contornar o teste — proponha uma solução
> que exercite o caminho real de produção."

**Ferramenta/Modelo:** opencode (agente de IA em CLI, modelo hy3-free).

**Output Resumido:**
- Criou `vitest.config.ts` usando `getViteConfig` do Astro (processa `.astro` e aplica i18n).
- Escreveu 3 suítes unitárias: i18n (incl. paridade do dicionário), dados
  (integridade referencial bilíngue + `pick`/`bilingual`), e filtro puro.
- Extraiu `itemMatches` para `src/utils/filter.ts` (testável sem DOM) e refatorou
  `src/scripts/list-filter.ts` para usá-lo.
- Escreveu 3 suítes de integração via `experimental_AstroContainer`: navegação
  PT/EN, seções (conteúdo/estrutura/responsividade) e auditoria a11y estrutural.
- Criou `ADR-004-testing-strategy.md`.

**Decisão crítica registrada (avaliação da resposta da IA):**
O modelo sugeriu **refactor de componentes** para "resolver" o `currentLocale`
no container de testes. Avaliado como **INADEQUADO** — inflaria o código de
produção só por causa do teste. Substituído por **teste de build real**
(`build-output.test.ts`) que valida EN/PT-BR em `dist/`. Decisão **rejeitada e
justificada** no ADR-004. Esta foi a principal evidência de uso crítico de IA
(exigida pelo critério 4.5).

**Justificativa:** 98 testes passando; `build` e `lint` (0 erros) intactos após
o refactor. Estratégia documenta cenários não testados e o porquê.

**Modificações:** Ajustes de asserção nos testes (Navbar não possui link "Início"
explícito — o logo é a home; footer usa "direitos" minúsculo); uso de `beforeAll`
para renderização assíncrona em vez de `await` no escopo do `describe`; correção
de tipo do `request` no helper de render (usando `new Request(...)`).

---

## Síntese do uso crítico de IA (para o critério 4.5)

- **Boas instruções:** evoluíram de comandos genéricos ("inicie a fase X") para
  prompts estruturados (papel + objetivo + restrições + critério de aceitação +
  loop de validação), como documentado acima.
- **Avaliação crítica:** a sugestão de refactor de produção só-para-teste foi
  **rejeitada**; preferiu-se exercitar o caminho real de produção (build + inspeção
  de `dist/`).
- **Modificações/retomadas:** ajustes de tipagem, asserções e extração de lógica
  pura (`itemMatches`) para viabilizar testes sem DOM.
- **Validação:** `npm run lint` (0 erros) + `npm run test` (98 verdes) + build
  real de ponta a ponta como gate de qualidade.

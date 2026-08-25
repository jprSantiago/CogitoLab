# Organização do Projeto — Cogito Lab Website

## 1. Visão Geral

Este documento define a organização, o roadmap e as práticas de desenvolvimento do site oficial do Cogito Lab, seguindo padrões de **Spec-Driven Development** e utilizando **agentes de IA** como parte do workflow.

---

## 2. Estrutura do Repositório

```
Cogito/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD para GitHub Pages
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/                 # Navbar, Footer
│   │   └── sections/               # Seções das páginas (Home, About, Areas, ...)
│   ├── config/
│   │   └── site.ts                 # Configuração do site (SITE_CONFIG)
│   ├── data/                       # Dados bilíngues tipados (Localized + pick)
│   │   ├── types.ts                # Localized<T>, pick(), bilingual()
│   │   ├── areas.ts
│   │   ├── members.ts
│   │   ├── projects.ts
│   │   ├── publications.ts
│   │   ├── news.ts
│   │   ├── artifacts.ts
│   │   └── partners.ts
│   ├── i18n/
│   │   ├── config.ts               # locales, defaultLocale
│   │   └── ui.ts                   # Dicionário tipado t()
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro             # Redirect → /pt-br/
│   │   ├── pt-br/                  # Home (index.astro, com seções Areas/Projects/Publications) + about, members, artifacts, partners, join, contact, news/[...page]
│   │   └── en/                     # Mesmo conjunto (EN)
│   ├── scripts/
│   │   └── list-filter.ts          # Filtro/busca client-side (progressive enhancement)
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── i18n.ts                 # Helpers: getLocale, useTranslations, localeUrl, stripLocale, t()
├── docs/
│   ├── specs/                      # Especificações (Spec-Driven)
│   │   ├── 00-home-page.md
│   │   ├── 01-members-section.md
│   │   ├── 02-projects-section.md
│   │   ├── 03-publications-section.md
│   │   ├── 04-areas-section.md
│   │   ├── 05-news-section.md
│   │   ├── 06-artifacts-section.md
│   │   ├── 07-join-section.md
│   │   ├── 08-partners-section.md
│   │   ├── 09-contact-section.md
│   │   └── 10-i18n-system.md
│   ├── decisions/                  # Architectural Decision Records (ADR)
│   │   ├── ADR-001-astro-framework.md
│   │   ├── ADR-002-tailwind-css.md
│   │   ├── ADR-003-i18n-strategy.md
│   │   └── ADR-004-testing-strategy.md
│   ├── ai-interactions/            # Log de interações com IA
│   │   └── prompts-log.md
│   ├── fase-0/
│   │   └── README.md
│   └── fase-1/
│       └── README.md
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── DEVELOPMENT_LOG.md
├── README.md
├── PLANEJAMENTO.md
├── ORGANIZATION.md                 # Este arquivo
└── package.json
```

---

## 3. Roadmap de Desenvolvimento

### Fase 0: Fundação (Semana 1)
**Objetivo:** Setup do projeto e infraestrutura básica

| Tarefa | Spec | Status |
|--------|------|--------|
| Inicializar projeto Astro | `docs/specs/00-home-page.md` | ✅ |
| Configurar Tailwind CSS | — | ✅ |
| Configurar i18n (PT-BR/EN) | `docs/specs/10-i18n-system.md` | ✅ |
| Criar layout base (BaseLayout) | — | ✅ |
| Criar Navbar e Footer | — | ✅ |
| Configurar GitHub Actions para deploy | — | ✅ |
| Criar ADR-001 (Astro) e ADR-002 (Tailwind) | — | ✅ |

**Entregável:** Projeto rodando localmente com i18n funcional e deploy automático.

---

### Fase 1: Conteúdo Estático (Semanas 2-3)
**Objetivo:** Implementar as páginas principais com conteúdo real

| Tarefa | Spec | Arquivos | Status |
|--------|------|----------|--------|
| Home page (identidade do lab) | `docs/specs/00-home-page.md` | `src/components/sections/Home.astro` (Fase 0) | ✅ |
| Seção de Áreas de Pesquisa | `docs/specs/04-areas-section.md` | `src/components/sections/Areas.astro` (renderizada na Home `index.astro`), `src/data/areas.ts` | ✅ |
| Página Sobre | — (sem spec dedicada; ver DEVELOPMENT_LOG) | `src/components/sections/About.astro` | ✅ |
| Seção de Membros | `docs/specs/01-members-section.md` | `src/components/sections/Members.astro`, `src/data/members.ts` | ✅ |
| Seção de Projetos | `docs/specs/02-projects-section.md` | `src/components/sections/Projects.astro` (renderizada na Home `index.astro`), `src/data/projects.ts` | ✅ |
| Seção de Publicações | `docs/specs/03-publications-section.md` | `src/components/sections/Publications.astro` (renderizada na Home `index.astro`), `src/data/publications.ts` | ✅ |
| Seção de Notícias | `docs/specs/05-news-section.md` | `src/components/sections/News.astro`, `src/data/news.ts`, `src/pages/*/news/[...page].astro` | ✅ |
| Seção de Artefatos | `docs/specs/06-artifacts-section.md` | `src/components/sections/Artifacts.astro`, `src/data/artifacts.ts` | ✅ |
| Página Junte-se ao Lab | `docs/specs/07-join-section.md` | `src/components/sections/Join.astro` | ✅ |
| Página de Parceiros | `docs/specs/08-partners-section.md` | `src/components/sections/Partners.astro`, `src/data/partners.ts` | ✅ |
| Página de Contato | `docs/specs/09-contact-section.md` | `src/components/sections/Contact.astro` | ✅ |

**Entregável:** Site com todas as seções implementadas e conteúdo em ambos os idiomas.

> **Decisão de dados:** em vez de Content Collections (previsto no planejamento inicial), a Fase 1 usa módulos tipados em `src/data/*` com `Localized<T>` + `pick()` (`src/data/types.ts`), integrados ao i18n da Fase 0. Justificativa detalhada em `DEVELOPMENT_LOG.md` (seção "Fase 1: Conteúdo Estático").

> **Consolidação na Home (2026-08-25):** as seções **Areas**, **Projects** e **Publications** deixaram de ser páginas dedicadas (`src/pages/{pt-br,en}/{areas,projects,publications}/` foram removidas) e passaram a ser renderizadas na página inicial (`src/pages/{pt-br,en}/index.astro`), conforme permitido pelo `Instructions.md` §5 ("no mandatory page structure"). Itens retirados de `navItems`/footer; cross-links internos usam âncoras (`#areas`, `#projects`, `#publications`). Detalhes no `DEVELOPMENT_LOG.md` (entrada "2026-08-25 — Mudança de tema...").

---

### Fase 2: Qualidade e Testes (Semana 4)
**Objetivo:** Garantir qualidade, testes e acessibilidade

| Tarefa | Status |
|--------|--------|
| Configurar Vitest | ⬜ |
| Escrever testes unitários (componentes) | ⬜ |
| Escrever testes de integração (i18n, navegação) | ⬜ |
| Testes de responsividade | ⬜ |
| Auditoria de acessibilidade (a11y) | ⬜ |
| Otimização de performance | ⬜ |
| Criação de ADR-004 (Testing Strategy) | ⬜ |

**Entregável:** Suite de testes completa e relatório de cobertura.

---

### Fase 3: Refinamento e Deploy (Semana 5)
**Objetivo:** Polish final e preparação para produção

| Tarefa | Status |
|--------|--------|
| Revisão de design e UX | ⬜ |
| Testes cross-browser | ⬜ |
| SEO e meta tags | ⬜ |
| README completo | ⬜ |
| DEVELOPMENT_LOG atualizado | ⬜ |
| Deploy final no GitHub Pages | ⬜ |
| Reflexão final (seção 11 do Instructions) | ⬜ |

**Entregável:** Site em produção, documentação completa.

---

## 4. Spec-Driven Development

Cada funcionalidade segue o ciclo:

```
1. SPEC → Escrever especificação antes do código
2. PLAN → Planejar implementação com IA
3. BUILD → Implementar com assistência de IA
4. TEST → Verificar contra a spec
5. REVIEW → Revisar output da IA
6. MERGE → Integrar ao código principal
```

### Template de Spec

```markdown
# Spec: [Nome da Funcionalidade]

## Objetivo
[O que esta funcionalidade deve fazer]

## Requisitos
- [ ] Requisito 1
- [ ] Requisito 2

## Comportamento Esperado
[Descrição do comportamento]

## Dados de Exemplo
[Mockups ou dados de teste]

## Critérios de Aceite
- [ ] Critério 1
- [ ] Critério 2

## Fora do Escopo
- [O que NÃO será implementado nesta iteração]
```

---

## 5. Uso de Agentes de IA

### 5.1 Papel dos Agentes

Os agentes de IA são utilizados como **auxiliares** no desenvolvimento, não como substitutos do desenvolvedor.

### 5.2 Workflow com IA

```
┌─────────────────────────────────────────────────────────┐
│                    DESENVOLVEDOR                        │
│                                                         │
│  1. Definir Spec (docs/specs/)                          │
│  2. Descrever tarefa para o agente                      │
│  3. Receber output do agente                            │
│  4. Revisar e validar                                   │
│  5. Adaptar ao contexto do projeto                      │
│  6. Documentar no DEVELOPMENT_LOG                       │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   AGENTE DE IA                          │
│                                                         │
│  - Gerar código baseado na spec                         │
│  - Sugerir arquitetura                                  │
│  - Criar testes                                         │
│  - Revisar código                                       │
│  - Documentar                                           │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Tipos de Interação com IA

| Tipo | Uso | Exemplo |
|------|-----|---------|
| **Geração de código** | Criar componentes, páginas, testes | "Gere um componente Card para membros do lab seguindo esta spec..." |
| **Revisão de código** | Validar qualidade e boas práticas | "Revise este componente Astro para acessibilidade e performance..." |
| **Debug** | Identificar e corrigir erros | "Este componente não está renderizando no build. Veja o erro: ..." |
| **Arquitetura** | Sugerir estrutura e padrões | "Qual a melhor forma de organizar as collections do Astro para i18n?" |
| **Documentação** | Gerar docs e ADRs | "Crie um ADR para a escolha de Vitest como framework de testes..." |

### 5.4 Registro de Interações

Toda interação relevante com IA deve ser documentada em `docs/ai-interactions/prompts-log.md`:

```markdown
## [Data] - [Título]

**Objetivo:** [O que se queria fazer]
**Prompt:** [Prompt utilizado]
**Ferramenta/Modelo:** [Ex: Claude 3.5 Sonnet]
**Output Resumido:** [Resumo do que foi gerado]
**Decisão:** [Aceito / Parcialmente aceito / Rejeitado]
**Justificativa:** [Por que essa decisão]
**Modificações:** [O que foi alterado após o output da IA]
```

---

## 6. Padrões de Qualidade

### 6.1 Código
- Componentes Astro reutilizáveis
- Tailwind CSS para estilização (utilidade-first)
- Separação de concerns (conteúdo vs. apresentação)
- TypeScript quando beneficial

### 6.2 Conteúdo
- Componentes Astro para páginas e seções
- Dados estruturados bilíngues em `src/data/*` (tipo `Localized<T>` + helper `pick()`), em vez de Content Collections
- Strings de UI em dicionário tipado `src/i18n/ui.ts` (helper `t()`)
- i18n via `@astrojs/i18n` (URL-based: `/pt-br/...`, `/en/...`)

### 6.3 Testes
- **Unitários:** Componentes isolados, helpers de i18n
- **Integração:** Navegação, tradução de páginas
- **E2E:** Fluxos críticos (mudança de idioma, navegação principal)

### 6.4 Documentação
- `README.md` — Instruções de setup e uso
- `DEVELOPMENT_LOG.md` — Log de desenvolvimento
- `docs/specs/` — Especificações
- `docs/decisions/` — ADRs

---

## 7. Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor local

# Build
npm run build            # Build estático

# Testes
npm run test             # Rodar todos os testes
npm run test:coverage    # Testes com cobertura

# Lint
npm run lint             # Verificar código
npm run format           # Formatar código
```

---

## 8. Critérios de Sucesso

O projeto será considerado completo quando:

- [x] Site implementado com Astro + Tailwind
- [x] i18n funcional (PT-BR e EN)
- [x] Todas as seções do Instructions.md implementadas
- [ ] Testes automatizados com cobertura adequada (Fase 2 — pendente)
- [x] Deploy automatizado via GitHub Actions (`.github/workflows/deploy.yml`)
- [x] Responsivo (desktop e mobile)
- [ ] Acessível (WCAG 2.1 AA) — auditoria pendente (Fase 2)
- [x] Documentação completa (specs, ADRs, DEVELOPMENT_LOG)
- [x] DEVELOPMENT_LOG com registro de decisões e interações com IA
- [ ] Reflexão final documentada (Fase 3 — pendente)

---

## 9. Referências

- [Instructions.md](./Instructions.md) — Especificação do desafio
- [PLANEJAMENTO.md](./PLANEJAMENTO.md) — Planejamento inicial
- [Astro Docs](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

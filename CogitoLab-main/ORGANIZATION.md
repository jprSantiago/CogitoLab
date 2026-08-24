# Organização do Projeto — Cogito Lab Website

## 1. Visão Gesta

Este documento define a organização, o roadmap e as práticas de desenvolvimento do site oficial do Cogito Lab, seguindo padrões de **Spec-Driven Development** e utilizing **agentes de IA** como parte do workflow.

---

## 2. Estrutura do Repositório

```
CogitoLab-main/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD para GitHub Pages
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── logo.png
│       └── members/                # Fotos dos membros
├── src/
│   ├── components/
│   │   ├── common/                 # Botões, Cards, Headers, etc.
│   │   ├── layout/                 # Navbar, Footer, Sidebar
│   │   ├── sections/               # Seções das páginas
│   │   └── i18n/                   # Componentes de tradução
│   ├── content/
│   │   ├── config.ts               # Configuração do i18n
│   │   ├── collections/
│   │   │   ├── members/            # Membros do lab (PT/EN)
│   │   │   ├── projects/           # Projetos de pesquisa
│   │   │   ├── publications/       # Publicações científicas
│   │   │   ├── news/               # Notícias e atividades
│   │   │   ├── areas/              # Áreas de pesquisa
│   │   │   └── artifacts/          # Software, datasets, etc.
│   │   └── i18n/
│   │       ├── pt-br/              # Traduções PT-BR
│   │       └── en/                 # Traduções EN
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── about.astro             # Sobre o lab
│   │   ├── areas/                  # Áreas de pesquisa
│   │   ├── members/                # Membros
│   │   ├── projects/               # Projetos
│   │   ├── publications/           # Publicações
│   │   ├── artifacts/              # Software e dados
│   │   ├── news/                   # Notícias
│   │   ├── join.astro              # Junte-se ao lab
│   │   ├── partners.astro          # Parceiros
│   │   └── contact.astro           # Contato
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── i18n.ts                 # Helpers de internacionalização
│       └── helpers.ts              # Utilitários gerais
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
│   └── ai-interactions/            # Log de interações com IA
│       └── prompts-log.md
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
| Inicializar projeto Astro | `docs/specs/00-home-page.md` | ⬜ |
| Configurar Tailwind CSS | — | ⬜ |
| Configurar i18n (PT-BR/EN) | `docs/specs/10-i18n-system.md` | ⬜ |
| Criar layout base (BaseLayout) | — | ⬜ |
| Criar Navbar e Footer | — | ⬜ |
| Configurar GitHub Actions para deploy | — | ⬜ |
| Criar ADR-001 (Astro) e ADR-002 (Tailwind) | — | ⬜ |

**Entregável:** Projeto rodando localmente com i18n funcional e deploy automático.

---

### Fase 1: Conteúdo Estático (Semanas 2-3)
**Objetivo:** Implementar as páginas principais com conteúdo real

| Tarefa | Spec | Status |
|--------|------|--------|
| Home page (identidade do lab) | `docs/specs/00-home-page.md` | ⬜ |
| Seção de Áreas de Pesquisa | `docs/specs/04-areas-section.md` | ⬜ |
| Página Sobre | — | ⬜ |
| Seção de Membros | `docs/specs/01-members-section.md` | ⬜ |
| Seção de Projetos | `docs/specs/02-projects-section.md` | ⬜ |
| Seção de Publicações | `docs/specs/03-publications-section.md` | ⬜ |
| Seção de Notícias | `docs/specs/05-news-section.md` | ⬜ |
| Seção de Artefatos | `docs/specs/06-artifacts-section.md` | ⬜ |
| Página Junte-se ao Lab | `docs/specs/07-join-section.md` | ⬜ |
| Página de Parceiros | `docs/specs/08-partners-section.md` | ⬜ |
| Página de Contato | `docs/specs/09-contact-section.md` | ⬜ |

**Entregável:** Site com todas as seções implementadas e conteúdo em ambos os idiomas.

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
- Markdown para conteúdo estático
- Collections do Astro para dados estruturados
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
- [x] Testes automatizados com cobertura adequada
- [x] Deploy automatizado via GitHub Actions
- [x] Responsivo (desktop e mobile)
- [x] Acessível (WCAG 2.1 AA)
- [x] Documentação completa
- [x] DEVELOPMENT_LOG com registro de decisões e interações com IA
- [x] Reflexão final documentada

---

## 9. Referências

- [Instructions.md](./Instructions.md) — Especificação do desafio
- [PLANEJAMENTO.md](./PLANEJAMENTO.md) — Planejamento inicial
- [Astro Docs](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)

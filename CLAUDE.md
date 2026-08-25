# CogitoLab — Contexto do Projeto

## Visão Geral

Site oficial do Cogito Lab, grupo de pesquisa em Engenharia de Software,
Inteligência Artificial, Qualidade de Software, Testes, Sistemas Móveis/IoT
e Inovação.

## Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Framework | Astro |
| Estilização | Tailwind CSS |
| i18n | @astrojs/i18n |
| Testes | Vitest |
| Deploy | GitHub Pages via GitHub Actions |
| Idiomas | PT-BR / EN |

## Comandos Úteis

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

## Estrutura do Projeto

```
src/
├── components/          # Componentes Astro
│   ├── common/          # Botões, Cards, Headers
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Seções das páginas
│   └── i18n/            # Componentes de tradução
├── content/
│   ├── collections/     # Dados em Markdown
│   └── i18n/            # Traduções
├── layouts/             # Layouts de página
├── pages/               # Páginas
├── styles/              # Estilos globais
└── utils/               # Utilitários
```

## Padrões de Código

### Componentes Astro
- Usar TypeScript para props
- Tailwind CSS para estilo
- 0 JavaScript por padrão
- i18n para todo conteúdo visível

### Nomenclatura
| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Arquivos | kebab-case | `member-card.astro` |
| Componentes | PascalCase | `MemberCard.astro` |
| Funções | camelCase | `getMembers()` |
| Constantes | UPPER_CASE | `SITE_CONFIG` |

### i18n
- Sempre usar `t()` para textos visíveis
- Suporte PT-BR e EN
- Traduções em `src/content/i18n/`

## Especificações

As specs estão em `docs/specs/`:
- `00-home-page.md` - Página inicial
- `01-members-section.md` - Membros
- `02-projects-section.md` - Projetos
- `03-publications-section.md` - Publicações
- `04-areas-section.md` - Áreas de pesquisa
- `05-news-section.md` - Notícias
- `06-artifacts-section.md` - Artefatos
- `07-join-section.md` - Junte-se
- `08-partners-section.md` - Parceiros
- `09-contact-section.md` - Contato
- `10-i18n-system.md` - Sistema de i18n

## Decisões Arquiteturais

ADRs estão em `docs/decisions/`:
- `ADR-001-astro-framework.md`
- `ADR-002-tailwind-css.md`
- `ADR-003-i18n-strategy.md`
- `ADR-004-testing-strategy.md`

## Regras Importantes

0. **Antes de iniciar qualquer fase**, ler todos os arquivos relevantes do projeto
   (specs, ADRs, componentes, layouts, páginas, traduções, etc.) para saber o que
   já foi feito, como foi feito e o que ainda deve ser feito.
1. **Antes de criar** um componente, verificar se já existe
2. **Seguir as specs** em `docs/specs/` para implementação
3. **Testar** localmente com `npm run dev`
4. **i18n** é obrigatório para todo conteúdo visível
5. **Acessibilidade** WCAG 2.1 AA
6. **Performance** - 0 JS por padrão
7. **Documentar** mudanças no DEVELOPMENT_LOG.md

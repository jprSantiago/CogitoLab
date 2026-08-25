# ADR-004: Estratégia de Testes (Testing Strategy)

## Status
Aceito

## Data
2026-08-25

## Contexto
O desafio (`Instructions.md` §7–§8) exige automação de testes com uma explicação
de **estratégia**, **cenários testados** e **cenários deliberadamente não testados
e por quê**. O site é um Astro estático (0 JS por padrão) com i18n PT-BR/EN, dados
tipados em `src/data/*` e filtragem client-side por progressive enhancement.

Objetivo da Fase 2: garantir qualidade, testes e acessibilidade sem comprometer os
princípios de performance (0 JS) e separação de preocupações já estabelecidos.

## Decisão
Adotar **Vitest** (já presente no `package.json` da Fase 0) como única ferramenta de
teste automatizado, com três níveis:

1. **Testes unitários (lógica pura):**
   - Helpers de i18n (`src/utils/i18n.ts`): `t()`, `getLocale`, `stripLocale`,
     `localeUrl`, `getAlternateLocaleUrl`, e paridade do dicionário `ui.ts`.
   - Helpers de dados (`src/data/types.ts`) e integridade referencial dos datasets
     (`src/data/*.ts`): `pick`, `bilingual`, `getArea`, `getProject`,
     `getMembersByCategory`, e consistência de chaves-estrangeiras entre áreas,
     membros, projetos, publicações, notícias, artefatos e parceiros.
   - Lógica de filtragem (`src/utils/filter.ts`): a função pura `itemMatches`
     (extraída de `src/scripts/list-filter.ts`) cobrindo filtros combinados (AND),
     busca insensível a maiúsculas/minúsculas e estado vazio.

2. **Testes de integração (componentes Astro via Container API):**
   - Renderização de componentes com `experimental_AstroContainer`
     (`astro/container`), usando `getViteConfig` do Astro no `vitest.config.ts`
     para herdar o processamento de `.astro` e a config de i18n.
   - Cobertura: Navbar e Footer (ambos os locales, pois recebem `locale` via prop),
     e todas as seções (`Areas`, `Members`, `Projects`, `Publications`, `News`,
     `Artifacts`, `About`, `Join`, `Contact`, `Partners`) para conteúdo, estrutura
     e layout responsivo (presença de classes `sm:`/`md:`/`lg:`).

3. **Auditoria de acessibilidade (a11y) estrutural:**
   - Testes que validam, no HTML renderizado, atributos essenciais: `lang` no
     `<html>`, `aria-label` em landmarks (`<nav>`), skip link (`#main`),
     `aria-current` no item ativo, `aria-pressed` em botões de filtro, e ausência
     de `<img>` sem `alt`/`<a>` sem `href`.

### Não cobertos por testes automatizados (e por quê)
- **Renderização de seções em EN via Container:** o `experimental_AstroContainer`
  não resolve `Astro.currentLocale` a partir da URL (limitacao conhecida),
  renderizando seções internamente em PT-BR. A correção EN é coberta de forma
  indireta e robusta: (a) Navbar/Footer são testados em PT-BR **e** EN (recebem
  `locale` como prop) e (b) os helpers `t()` e `pick()` — única fonte de verdade
  para a resolução de tradução — possuem testes unitários completos para ambos os
  locales. Como os componentes são wrappers finos sobre esses helpers, a saída EN
  está garantida pelo teste da lógica compartilhada.
- **Responsividade visual / cross-browser / E2E:** dependem de layout real em
  navegador; cobertos por verificação manual (`npm run dev`) e pelo uso consistente
  de grids Tailwind com breakpoints (assertados estruturalmente nos testes).
- **Performance:** validada por inspeção do build (0 JS por padrão, exceto scripts
  mínimos de progressive enhancement) e pelo CI; não há métrica de runtime automatizada.

## Consequências
### Positivas
- Vitest nativo do ecossistema Vite (sem configuração paralela).
- Testes rápidos e sem navegador para a maior parte da suíte.
- Cobertura de regras de negócio críticas (integridade de dados bilíngues + i18n).
- Acessibilidade verificada por meio de invariantes de markup, não apenas "passa no build".

### Negativas / Mitigações
- Dependência da Container API experimental do Astro para componentes — mitigada
  porque testamos via props onde possível e via helpers para o resto.
- `astro check` emite *hints* em arquivos de teste (variáveis não utilizadas) — sem
  impacto em erros; mantido limpo via revisão.

## Alternativas Consideradas
- **Playwright/Puppeteer (E2E):** rejeitado para a Fase 2 por ser pesado e frágil
  para um site estático com 0 JS; reservado para Fase 3 se necessário.
- **Jest:** rejeitado — Vitest reaproveita o pipeline Vite do Astro (mesmo
  transform de `.astro`), evitando dupla configuração.
- **@testing-library/astro:** desnecessário, pois testamos a saída HTML (string),
  não interações de framework.

## Implementação
```ts
// vitest.config.ts
/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig(
  {
    test: {
      environment: 'node',
      include: ['tests/**/*.test.ts'],
      coverage: { provider: 'v8', include: ['src/**/*.{ts,astro}'] },
    },
  },
  { site: 'https://cogitolab.github.io', trailingSlash: 'always', i18n: { /* ... */ } }
);
```

Estrutura:
```
tests/
├── unit/        # i18n.test.ts, data.test.ts, filter.test.ts
└── integration/ # navigation.test.ts, sections.test.ts, a11y.test.ts, render-helper.ts
```

Comandos:
```bash
npm run test            # roda a suíte (vitest run)
npm run test:coverage   # com relatório de cobertura (v8)
```

## Referências
- [Astro — Testing](https://docs.astro.build/en/guides/testing/)
- [Astro — Container API](https://docs.astro.build/en/reference/container-reference/)
- [Vitest](https://vitest.dev/)
- `Instructions.md` §7–§8, `ORGANIZATION.md` (Fase 2)

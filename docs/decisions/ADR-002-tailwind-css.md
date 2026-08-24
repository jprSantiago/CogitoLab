# ADR-002: Uso do Tailwind CSS para Estilização

**Status:** Aceito
**Data:** 2026-08-24

## Contexto

O site precisa de estilização consistente, responsiva e de baixa manutenção,
seguindo boas práticas de acessibilidade (WCAG 2.1 AA) e performance.

## Decisão

Adotar **Tailwind CSS** (utilitário *utility-first*), integrado ao Astro via
plugin Vite oficial (`@tailwindcss/vite`), usando a versão 4 com configuração
baseada em CSS (`@theme` / `@import "tailwindcss"`).

## Alternativas Consideradas

- **CSS modules / CSS puro**: funciona, porém exige mais boilerplate para
  manter consistência de espaçamentos, cores e breakpoints entre componentes.
- **Tailwind v3 + `@astrojs/tailwind`**: estável, mas a v4 simplifica a
  configuração (sem `tailwind.config.js` obrigatório) e tem melhor performance
  no build via engine Oxide.

## Consequências

**Positivas**
- Design system consistente via tokens (`--color-cogito-*`, `--color-brand-*`).
- Responsividade e estados de foco acessíveis diretos na marcação.
- Build rápido e sem JS extra no cliente.

**Negativas / Mitigações**
- HTML mais verboso com classes utilitárias — mitigado com componentes Astro
  reutilizáveis (ex.: `Navbar`, `Footer`, `BaseLayout`).
- Tailwind v4 é recente — versão fixada via `package.json` para reprodutibilidade.

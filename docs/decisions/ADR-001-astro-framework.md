# ADR-001: Uso do Astro como Framework

**Status:** Aceito
**Data:** 2026-08-24

## Contexto

O Cogito Lab precisa de um site institucional estático para apresentar identidade,
membros, projetos, publicações e notícias. Requisitos do desafio (`Instructions.md`):

- Site estático (conteúdo pouco mutável)
- Hospedagem via GitHub Pages
- i18n PT-BR/EN
- Conteúdo em Markdown / content collections
- Manutenção por estudantes (baixa curva de aprendizado)
- Performance (0 JS por padrão)
- Deploy via GitHub Actions

## Decisão

Adotar **Astro** como framework principal.

## Alternativas Consideradas

- **Next.js**: SSR, API routes e autenticação são desnecessários para um site
  institucional — seria *overkill* e aumentaria a complexidade de deploy.
- **Hugo / Jekyll**: maduros para estático, mas a experiência de componentes e
  i18n do Astro é mais ergonômica para a equipe (familiaridade com componentes
  baseados em HTML/JSX e TypeScript).

## Consequências

**Positivas**
- Geração estática com 0 JS por padrão → performance e acessibilidade melhores.
- i18n built-in via `astro:i18n` (roteamento por prefixo de locale).
- Content collections tipadas para dados estruturados (membros, publicações…).
- Integração nativa com GitHub Pages.

**Negativas / Mitigações**
- Curva inicial para quem nunca usou Astro — mitigada por docs e specs claras.
- Requer Node 18.17+ (ambiente provisionado com Node 20 LTS).

# Planejamento Inicial — Cogito Lab Website

## Framework Escolhida

**Astro**

## Justificativa

A escolha do Astro foi baseada nos requisitos do `Instructions.md`:

- Site estático com conteúdo que não muda em tempo real
- Hospedagem via GitHub Pages (nativo no Astro)
- i18n PT-BR/EN (suporte built-in via `@astrojs/i18n`)
- Conteúdo em Markdown (collections nativas)
- Facilidade de manutenção por estudantes
- Performance (0 JS por padrão)
- Deploy simplificado via GitHub Actions

## Por que não Next.js

O projeto não requer:
- API endpoints
- Server-side rendering
- Autenticação
- Formulários com backend
- Banco de dados

Next.js seria overkill para um site institucional estático.

## Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Framework | Astro |
| Estilização | Tailwind CSS |
| i18n | `@astrojs/i18n` |
| Testes | Vitest |
| Deploy | GitHub Pages via GitHub Actions |

## Próximos Passos

1. Inicializar projeto Astro
2. Configurar i18n (PT-BR/EN)
3. Definir estrutura de pastas e content collections
4. Criar layout base e componentes
5. Implementar páginas principais

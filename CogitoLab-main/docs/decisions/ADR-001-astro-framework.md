# ADR-001: Uso do Astro como Framework

## Status
Aceito

## Data
2026-08-23

## Contexto
O projeto Cogito Lab Website precisa de um framework web que suporte:
- Site estático com conteúdo que não muda em tempo real
- Hospedagem via GitHub Pages
- i18n PT-BR/EN
- Conteúdo em Markdown
- Facilidade de manutenção por estudantes
- Performance
- Deploy simplificado via GitHub Actions

## Decisão
Utilizar **Astro** como framework principal do projeto.

## Consequências
### Positivas
- Build estático otimizado (0 JS por padrão)
- Suporte nativo a i18n via `@astrojs/i18n`
- Content Collections para dados estruturados
- Deploy nativo no GitHub Pages
- Framework leve e rápido
- Comunidade ativa e boa documentação
- Facilidade de integrar com Tailwind CSS

### Negativas
- Curva de aprendizado para devs familiarizados com React/Vue
- Menos opções de plugins comparado a frameworks mais maduros
- Funcionalidades avançadas podem requerer customização

## Alternativas Consideradas
### Next.js
- **Rejeitado** porque: overkill para site estático, requer server-side rendering, autenticação, etc.

### Hugo
- **Rejeitado** porque: menos flexível para componentes, Go template syntax menos intuitiva

### Jekyll
- **Rejeitado** porque: Ruby dependency, performance inferior, menos moderno

## Referências
- [Astro Docs](https://docs.astro.build/)
- [PLANEJAMENTO.md](../PLANEJAMENTO.md)

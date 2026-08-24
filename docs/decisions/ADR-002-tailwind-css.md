# ADR-002: Uso do Tailwind CSS para Estilização

## Status
Aceito

## Data
2026-08-23

## Contexto
O projeto precisa de uma solução de estilização que:
- Permita desenvolvimento rápido
- Suporte design responsivo
- Tenha boa integração com Astro
- Seja fácil de manuter
- Tenha comunidade ativa

## Decisão
Utilizar **Tailwind CSS** como framework de estilização.

## Consequências
### Positivas
- Utility-first: desenvolvimento rápido e consistente
- Design responsivo facilitado (breakpoints built-in)
- Integração nativa com Astro (`@astrojs/tailwind`)
- Purge automático de CSS não utilizado
- Comunidade enorme e muitos recursos
- Customização via `tailwind.config.js`

### Negativas
- HTML pode ficar "poluído" com classes
- Curva de aprendizado para quem não conhece
- Pode ser verboso para estilos complexos

## Alternativas Consideradas
### CSS Modules
- **Rejeitado** porque: menos produtivo, sem utilitários built-in

### Styled Components
- **Rejeitado** porque: requer JS runtime, não ideal para estático

### SCSS
- **Rejeitado** porque: menos produtivo, sem utilitários de design

## Referências
- [Tailwind CSS](https://tailwindcss.com/)
- [Astro + Tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

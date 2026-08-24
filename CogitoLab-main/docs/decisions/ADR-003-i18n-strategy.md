# ADR-003: Estratégia de Internacionalização (i18n)

## Status
Aceito

## Data
2026-08-23

## Contexto
O site deve suportar PT-BR e EN com:
- Troca de idioma acessível
- Preservação de contexto
- URLs amigáveis
- SEO adequado
- Facilidade de manutenção

## Decisão
Utilizar **URL-based i18n** com `@astrojs/i18n`:
- URLs prefixadas: `/pt-br/...` e `/en/...`
- Content collections com variantes por idioma
- Arquivos de tradução para textos da UI

## Estrutura de URLs
```
/pt-br/              → Home PT
/en/                 → Home EN
/pt-br/sobre/        → Sobre PT
/en/about/           → About EN
/pt-br/membros/      → Membros PT
/en/members/         → Membros EN
```

## Consequências
### Positivas
- URLs limpas e amigáveis
- SEO otimizado (hreflang tags)
- Preservação de contexto ao trocar idioma
- Suporte nativo no Astro
- Fácil de manuter com Content Collections

### Negativas
- Duplicação de conteúdo em Content Collections
- Necessidade de manter traduções sincronizadas
- URLs mais longas

## Alternativas Consideradas
### Query Parameter (?lang=pt)
- **Rejeitado** porque: menos amigável para SEO, URLs feias

### Cookie-based
- **Rejeitado** porque: menos acessível, SEO ruim

### Subdomain (pt.cogito.lab / en.cogito.lab)
- **Rejeitado** porque: complexidade de configuração DNS, overkill

## Implementação
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [tailwind()]
});
```

## Referências
- [Astro i18n](https://docs.astro.build/en/guides/internationalization/)
- [Spec i18n](../specs/10-i18n-system.md)

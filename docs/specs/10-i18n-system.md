# Spec: Internationalization (i18n) System

## Objetivo
Suportar PT-BR e EN com troca de idioma preservando contexto.

## Requisitos
- [ ] Suporte a dois idiomas: PT-BR e EN
- [ ] Troca de idioma acessível (botão no header)
- [ ] URLs prefixadas: `/pt-br/...` e `/en/...`
- [ ] Preservação de contexto ao trocar idioma
- [ ] Conteúdo traduzido:
  - [ ] Navegação
  - [ ] Textos da UI
  - [ ] Conteúdo das páginas
  - [ ] Metadados
- [ ] SEO com hreflang tags
- [ ] Detecção de idioma do navegador
- [ ] Fallback para PT-BR

## Estratégia de URLs
```
/pt-br/          → Home PT
/en/             → Home EN
/pt-br/membros/  → Membros PT
/en/members/     → Membros EN
```

## Implementação
- `@astrojs/i18n` para roteamento
- `src/content/i18n/pt-br/` e `src/content/i18n/en/` para textos da UI
- Content collections com variantes por idioma

## Layout do Botão de Idioma
```
┌─────────────────────┐
│  [🌐 PT-BR | EN]   │
└─────────────────────┘
```

## Critérios de Aceite
- [ ] Troca de idioma funciona
- [ ] URLs corretas para cada idioma
- [ ] Conteúdo traduzido em todas as páginas
- [ ] Preservação de contexto ao trocar
- [ ] SEO com hreflang
- [ ] Fallback para PT-BR quando tradução ausente

## Fora do Escopo
- Mais de 2 idiomas
- Tradução automática
- CMS para traduções

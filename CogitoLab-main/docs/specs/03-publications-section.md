# Spec: Publications Section

## Objetivo
Apresentar as publicações científicas associadas ao Cogito Lab.

## Requisitos
- [ ] Lista/cards de publicações com:
  - [ ] Título
  - [ ] Autores
  - [ ] Venue (conferência/periódico)
  - [ ] Ano
  - [ ] Tipo de publicação
  - [ ] DOI ou link externo
  - [ ] Áreas de pesquisa associadas
  - [ ] Projeto(s) associado(s)
  - [ ] Links para artefatos, datasets, código
- [ ] Filtragem por ano
- [ ] Filtragem por tipo
- [ ] Filtragem por área
- [ ] Busca por título/autores
- [ ] Ordenação por ano (recente primeiro)
- [ ] Dados mock para MVP
- [ ] Suporte a PT-BR e EN

## Layout Proposto
```
┌─────────────────────────────────────────┐
│           PUBLICAÇÕES                   │
├─────────────────────────────────────────┤
│  Busca: [________________]              │
│  Filtros: [Ano▼] [Tipo▼] [Área▼]      │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ Título da Publicação                ││
│  │ Autor A, Autor B, Autor C           ││
│  │ Conferência 2024                    ││
│  │ [DOI] [Código] [Slides]             ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ ...                                ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/publications/paper-2024-01.md
---
title: "AI-Assisted Code Review: A Survey"
authors: ["Autor A", "Autor B", "Autor C"]
venue: "ICSE 2024"
year: 2024
type: "conference"  # conference|journal|workshop|thesis|preprint
doi: "10.1145/xxxxx"
url: "https://..."
areas: ["ai-se"]
projects: ["cnpq-446729-2024"]
artifacts:
  - type: "code"
    url: "https://github.com/..."
  - type: "dataset"
    url: "https://..."
---
Resumo da publicação...
```

## Critérios de Aceite
- [ ] Publicações mock exibidas corretamente
- [ ] Filtragem funciona
- [ ] Busca funciona
- [ ] Links externos abrem corretamente
- [ ] Layout responsivo
- [ ] i18n funcional

## Fora do Escopo
- Integração com APIs de bibliotecas (DBLP, Google Scholar)
- Sistema de gerenciamento de publicações
- Importação automática de Lattes

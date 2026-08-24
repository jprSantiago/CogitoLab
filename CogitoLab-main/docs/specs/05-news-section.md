# Spec: News Section

## Objetivo
Publicar notícias e atividades do Cogito Lab.

## Requisitos
- [ ] Lista de notícias com:
  - [ ] Título
  - [ ] Data
  - [ ] Resumo/conteúdo
  - [ ] Categoria
  - [ ] Imagem (opcional)
- [ ] Categorias:
  - [ ] Aceite de papers
  - [ ] Participação em conferências
  - [ ] Prêmios
  - [ ] Defesas de teses/dissertações
  - [ ] Novos projetos financiados
  - [ ] Novos membros
  - [ ] Palestras
  - [ ] Workshops
  - [ ] Hackathons
  - [ ] Visitas de pesquisa
  - [ ] Anúncios de colaboração
- [ ] Paginação
- [ ] Filtragem por categoria
- [ ] Dados mock para MVP
- [ ] Suporte a PT-BR e EN

## Layout Proposto
```
┌─────────────────────────────────────────┐
│           NOTÍCIAS E ATIVIDADES         │
├─────────────────────────────────────────┤
│  Categorias: [Todas] [Papers] [...]     │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ 📰 Título da Notícia               ││
│  │ 15/03/2024                         ││
│  │ Resumo da notícia...               ││
│  │ [Leia mais]                        ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ ...                                ││
│  └─────────────────────────────────────┘│
│                                         │
│  [← Anterior]  Página 1 de 3  [Próxima →]│
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/news/paper-accepted-2024-03.md
---
title: "Paper accepted at ICSE 2024"
date: 2024-03-15
category: "paper-acceptance"  # paper-acceptance|conference|award|defense|project|member|talk|workshop|hackathon|visit|collaboration
image: "/images/news/..."
members: ["prof-x"]
projects: ["cnpq-446729-2024"]
---
Conteúdo da notícia em Markdown...
```

## Critérios de Aceite
- [ ] Notícias mock exibidas
- [ ] Filtragem por categoria funciona
- [ ] Paginação funciona
- [ ] Layout responsivo
- [ ] i18n funcional

## Fora do Escopo
- CMS para gerenciamento de notícias
- Sistema de comentários
- RSS feed

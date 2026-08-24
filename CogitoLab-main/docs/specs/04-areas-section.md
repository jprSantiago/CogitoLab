# Spec: Research Areas Section

## Objetivo
Apresentar as 6 áreas de pesquisa do Cogito Lab com detalhes.

## Requisitos
- [ ] Página dedicada com as 6 áreas:
  1. AI for Software Engineering
  2. Software Quality, Technical Debt & Refactoring
  3. Software Testing & Reliability
  4. Configurable Systems, Mobile & IoT
  5. Collaborative Software Development & Empirical SE
  6. Innovation, Entrepreneurship & Technology Transfer
- [ ] Para cada área:
  - [ ] Título
  - [ ] Descrição curta
  - [ ] Tópicos de pesquisa representativos
  - [ ] Projetos relacionados
  - [ ] Possibilidade de associar publicações, software, datasets
- [ ] Cards clicáveis para detalhes
- [ ] Navegação entre áreas
- [ ] Suporte a PT-BR e EN

## Layout Proposto
```
┌─────────────────────────────────────────┐
│         ÁREAS DE PESQUISA               │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │   🤖    │  │   📊    │  │   🧪    │ │
│  │   IA    │  │Qualidade│  │ Testes  │ │
│  │  para   │  │  Técn.  │  │  e      │ │
│  │   SE    │  │  Debt   │  │Confiab. │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │   📱    │  │   👥    │  │   💡    │ │
│  │Mobile/  │  │ Colab.  │  │Inovação │ │
│  │  IoT    │  │   e     │  │   e     │ │
│  │         │  │ Empír.  │  │Empree.  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
├─────────────────────────────────────────┤
│  [Detalhes da área selecionada]         │
│  Tópicos: ...                           │
│  Projetos: ...                          │
│  Publicações: ...                       │
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/areas/ai-se.md
---
id: "ai-se"
title: "Artificial Intelligence for Software Engineering"
titlePt: "Inteligência Artificial para Engenharia de Software"
description: "Investigates the use of AI..."
descriptionPt: "Investiga o uso de IA..."
topics:
  - "Code generation"
  - "Bug fixing"
  - "Prompt engineering"
  - "AI agents for SE"
projects: ["cnpq-446729-2024"]
icon: "🤖"
---
Conteúdo detalhado da área...
```

## Critérios de Aceite
- [ ] Todas as 6 áreas exibidas
- [ ] Detalhes de cada área acessíveis
- [ ] Links para projetos e publicações funcionam
- [ ] Layout responsivo
- [ ] i18n funcional

## Fora do Escopo
- Sistema de gerenciamento de áreas
- Subáreas ou taxonomias detalhadas

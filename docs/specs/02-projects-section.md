# Spec: Projects Section

## Objetivo
Apresentar os projetos de pesquisa financiados do Cogito Lab.

## Requisitos
- [ ] Cards/lista para cada projeto com:
  - [ ] Agência de fomento
  - [ ] Número do processo/bolsa
  - [ ] Título do projeto
  - [ ] Descrição curta
  - [ ] Período
  - [ ] Coordenador/subcoordenador/collaboradores
  - [ ] Instituições participantes
  - [ ] Áreas de pesquisa vinculadas
  - [ ] Pesquisadores e alunos envolvidos
  - [ ] Publicações resultantes
  - [ ] Software, datasets ou outros produtos
  - [ ] Status do projeto
- [ ] Filtragem por agência de fomento
- [ ] Filtragem por área de pesquisa
- [ ] Filtragem por status
- [ ] Detalhes expandíveis
- [ ] Suporte a PT-BR e EN

## Projetos Iniciais
1. CNPq 446729/2024-8 — Coordenador
2. CNPq 406089/2025-6 — Subcoordenador
3. FAPEMIG APQ-01488-24 — Subcoordenador
4. FAPEMIG APQ-04113-25 — Subcoordenador
5. FAPEMIG APQ-03990-26 — Colaborador

## Layout Proposto
```
┌─────────────────────────────────────────┐
│           PROJETOS DE PESQUISA          │
├─────────────────────────────────────────┤
│  Filtros: [Todas] [CNPq] [FAPEMIG]     │
│  Status: [Todos] [Em andamento] [...]   │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ 📋 CNPq 446729/2024-8              ││
│  │ Título do Projeto                   ││
│  │ Coordenador: Prof. X               ││
│  │ Status: Em andamento               ││
│  │ [Ver detalhes]                     ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ 📋 FAPEMIG APQ-01488-24            ││
│  │ ...                                ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/projects/cnpq-446729-2024.md
---
agency: "CNPq"
processNumber: "446729/2024-8"
title: "Evaluating the Quality of AI-Generated Code..."
titlePt: "Avaliação da Qualidade de Código Gerado por IA..."
role: "coordinator"  # coordinator|subcoordinator|collaborator
period: "2024-2026"
status: "active"  # active|completed|paused
institution: "Universidade X"
areas: ["ai-se", "quality"]
members:
  - name: "Prof. X"
    role: "Coordenador"
    memberRef: "prof-x"
relatedInitiatives: []
---
Descrição detalhada do projeto em Markdown...
```

## Critérios de Aceite
- [ ] Todos os 5 projetos iniciais cadastrados
- [ ] Filtragem por agência funciona
- [ ] Filtragem por status funciona
- [ ] Detalhes expandíveis funcionam
- [ ] Links para áreas e membros vinculados
- [ ] Layout responsivo
- [ ] i18n funcional (títulos em PT e EN)

## Fora do Escopo
- Sistema de gerenciamento de projetos
- Integração com APIs de fomento

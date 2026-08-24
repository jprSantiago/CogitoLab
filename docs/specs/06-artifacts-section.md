# Spec: Artifacts Section (Software, Tools, Research Data)

## Objetivo
Apresentar artefatos de pesquisa: software, ferramentas, datasets, etc.

## Requisitos
- [ ] Lista de artefatos com:
  - [ ] Nome
  - [ ] Descrição
  - [ ] Tipo (software/tool/dataset/prototype/api/replication-package)
  - [ ] Links (GitHub, documentação, etc.)
  - [ ] Pesquisadores associados
  - [ ] Áreas de pesquisa
  - [ ] Projetos
  - [ ] Publicações
- [ ] Filtragem por tipo
- [ ] Filtragem por área
- [ ] Dados mock para MVP
- [ ] Suporte a PT-BR e EN

## Layout Proposto
```
┌─────────────────────────────────────────┐
│     SOFTWARE, FERRAMENTAS E DADOS       │
├─────────────────────────────────────────┤
│  Filtros: [Todos] [Software] [Dados]   │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐│
│  │ 🔧 Nome do Artefato                ││
│  │ Tipo: Software                      ││
│  │ Descrição curta...                  ││
│  │ [GitHub] [Docs] [Artigo]            ││
│  └─────────────────────────────────────┘│
│  ┌─────────────────────────────────────┐│
│  │ ...                                ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/artifacts/tool-x.md
---
name: "Tool X"
type: "software"  # software|tool|dataset|prototype|api|replication-package
description: "Ferramenta para..."
url: "https://github.com/..."
members: ["prof-x"]
areas: ["ai-se"]
projects: ["cnpq-446729-2024"]
publications: ["paper-2024-01"]
---
Documentação detalhada do artefato...
```

## Critérios de Aceite
- [ ] Artefatos mock exibidos
- [ ] Filtragem funciona
- [ ] Links externos funcionam
- [ ] Layout responsivo
- [ ] i18n funcional

## Fora do Escopo
- Sistema de gerenciamento de artefatos
- Integração com GitHub API
- Download de arquivos

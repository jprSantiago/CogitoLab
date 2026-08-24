# Spec: Partners Section

## Objetivo
Apresentar organizações associadas ao Cogito Lab.

## Requisitos
- [ ] Lista de parceiros com:
  - [ ] Nome
  - [ ] Logo
  - [ ] Tipo (universidade/agência-fomento/ambiente-inovação/colaborador/indústria)
  - [ ] Link externo
  - [ ] Descrição (opcional)
- [ ] Grid de logos
- [ ] Filtragem por tipo
- [ ] Suporte a PT-BR e EN

## Layout Proposto
```
┌─────────────────────────────────────────┐
│           PARCEIROS E FINANCIAMENTO     │
├─────────────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │Logo1│  │Logo2│  │Logo3│  │Logo4│   │
│  │Name1│  │Name2│  │Name3│  │Name4│   │
│  └─────┘  └─────┘  └─────┘  └─────┘   │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐   │
│  │Logo5│  │Logo6│  │Logo7│  │Logo8│   │
│  │Name5│  │Name6│  │Name7│  │Name8│   │
│  └─────┘  └─────┘  └─────┘  └─────┘   │
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/partners/university-x.md
---
name: "Universidade X"
type: "university"  # university|funding-agency|innovation-environment|collaborator|industry
logo: "/images/partners/university-x.png"
url: "https://..."
description: "Parceira desde 2020..."
---
```

## Critérios de Aceite
- [ ] Parceiros exibidos com logos
- [ ] Links externos funcionam
- [ ] Layout responsivo
- [ ] i18n funcional

## Fora do Escopo
- Sistema de gerenciamento de parceiros
- Integração com APIs

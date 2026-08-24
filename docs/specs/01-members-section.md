# Spec: Members Section

## Objetivo
Apresentar os membros do Cogito Lab com suas informações acadêmicas e links relevantes.

## Requisitos
- [ ] Cards para cada membro com:
  - [ ] Nome
  - [ ] Foto
  - [ ] Cargo/função no lab
  - [ ] Afiliação institucional
  - [ ] Breve biografia
  - [ ] Interesses de pesquisa
  - [ ] Áreas de pesquisa vinculadas
  - [ ] Informações de contato
- [ ] Links externos:
  - [ ] Lattes
  - [ ] ORCID
  - [ ] Google Scholar
  - [ ] GitHub
  - [ ] LinkedIn
  - [ ] Homepage pessoal/institucional
- [ ] Categorias de membros:
  - [ ] Professores/pesquisadores
  - [ ] Colaboradores
  - [ ] Doutorandos
  - [ ] Mestrandos
  - [ ] Iniciação científica
  - [ ] Ex-membros (alumni)
- [ ] Filtragem por categoria
- [ ] Filtragem por área de pesquisa
- [ ] Suporte a PT-BR e EN

## Layout Proposto
```
┌─────────────────────────────────────────┐
│           MEMBROS DO COGITO LAB         │
├─────────────────────────────────────────┤
│  Filtros: [Todos] [Prof] [Alunos] [...] │
│  Áreas: [IA] [Qualidade] [Testes] [...] │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │  [Foto] │  │  [Foto] │  │  [Foto] │ │
│  │  Nome   │  │  Nome   │  │  Nome   │ │
│  │  Cargo  │  │  Cargo  │  │  Cargo  │ │
│  │ Links→  │  │ Links→  │  │ Links→  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
└─────────────────────────────────────────┘
```

## Modelo de Dados (Content Collection)
```yaml
# src/content/members/username.md
---
name: "Nome Completo"
role: "Professor/Pesquisador"
institution: "Universidade"
category: "faculty"  # faculty|collaborator|phd|msc|undergraduate|alumni
photo: "/images/members/photo.jpg"
bio: "Breve biografia..."
interests: ["IA", "Engenharia de Software"]
areas: ["ai-se", "quality"]
contact:
  email: "email@univ.br"
links:
  lattes: "http://lattes.cnpq.br/..."
  orcid: "0000-0000-0000-0000"
  scholar: "..."
  github: "..."
  linkedin: "..."
  homepage: "..."
---
Conteúdo adicional em Markdown...
```

## Dados de Exemplo
- Prof. [Nome] — Professor, Universidade X
- [Nome] — Doutorando, Universidade Y
- [Nome] — IC, Universidade Z

## Critérios de Aceite
- [ ] Cards renderizam corretamente com todos os campos
- [ ] Filtragem por categoria funciona
- [ ] Filtragem por área funciona
- [ ] Links externos abrem em nova aba
- [ ] Fotos com fallback para placeholder
- [ ] Layout responsivo
- [ ] i18n funcional

## Fora do Escopo
- Sistema de gerenciamento de membros
- Autenticação
- Upload de fotos

# Spec: Home Page

## Objetivo
Apresentar a identidade do Cogito Lab com informações sobre o nome, missão e área visual.

## Requisitos
- [ ] Nome do laboratório em destaque
- [ ] Explicação do nome "Cogito" (referência a Descartes)
- [ ] Descrição curta do laboratório
- [ ] Missão/propósito de pesquisa
- [ ] Instituições associadas
- [ ] Área para logo/identidade visual
- [ ] Links para seções principais
- [ ] Suporte a PT-BR e EN

## Comportamento Esperado
A home page deve ser a porta de entrada do site, comunicando claramente quem é o Cogito Lab e o que faz. Deve guiar o visitante para as seções de interesse.

## Layout Proposto
```
┌─────────────────────────────────────────┐
│              HEADER/NAVBAR              │
├─────────────────────────────────────────┤
│                                         │
│           [LOGO + NOME]                 │
│                                         │
│     "Cogito, ergo sum" — Descartes     │
│                                         │
│     Descrição curta do laboratório      │
│                                         │
│     [Missão]  [Instituições]            │
│                                         │
├─────────────────────────────────────────┤
│         Links para seções:              │
│   Áreas | Membros | Projetos | Notícias │
├─────────────────────────────────────────┤
│              FOOTER                     │
└─────────────────────────────────────────┘
```

## Dados de Exemplo
- Nome: Cogito Lab
- Inspiração: "Cogito, ergo sum" — René Descartes
- Missão: Pesquisa em Engenharia de Software, IA, Qualidade, Testes, Mobile/IoT e Inovação
- Instituições: [A definir]

## Critérios de Aceite
- [ ] Home page renderiza em PT-BR e EN
- [ ] Troca de idioma preserva contexto
- [ ] Layout responsivo (mobile e desktop)
- [ ] Contraste adequado para acessibilidade
- [ ] Tempo de carregamento < 2s

## Fora do Escopo
- Conteúdo detalhado de áreas (será em página dedicada)
- Lista completa de membros (será em página dedicada)

# ADR-004: Estratégia de Testes

## Status
Aceito

## Data
2026-08-23

## Contexto
O projeto requer testes automatizados que:
- Valide funcionalidades críticas
- Sejam rápidos para execução local
- Suportem CI/CD via GitHub Actions
- Tenham boa cobertura sem ser excessivos

## Decisão
Utilizar **Vitest** como framework de testes com foco em:
- Testes unitários para componentes
- Testes de integração para i18n e navegação
- Testes E2E para fluxos críticos (opcional)

## Níveis de Teste

### Unitários (Vitest)
- Componentes Astro isolados
- Helpers de i18n
- Utilitários
- Funções de formatação

### Integração (Vitest + Testing Library)
- Renderização de páginas
- Navegação entre idiomas
- Content Collections

### E2E (Playwright - opcional)
- Fluxo de troca de idioma
- Navegação principal
- Acessibilidade

## Consequências
### Positivas
- Vitest é rápido e nativo para projetos Vite
- Integração nativa com Astro
- CI/CD simplificado
- Cobertura built-in

### Negativas
- Testes E2E requerem configuração adicional
- Testing Library pode não funcionar 100% com Astro
- Cobertura total pode ser difícil para componentes estáticos

## Estrutura de Testes
```
tests/
├── unit/
│   ├── components/
│   │   ├── Card.test.ts
│   │   └── Navbar.test.ts
│   └── utils/
│       ├── i18n.test.ts
│       └── helpers.test.ts
├── integration/
│   ├── i18n-routing.test.ts
│   └── page-rendering.test.ts
└── e2e/
    └── navigation.test.ts
```

## Comandos
```bash
npm run test              # Todos os testes
npm run test:unit         # Apenas unitários
npm run test:integration  # Apenas integração
npm run test:e2e          # Apenas E2E
npm run test:coverage     # Com cobertura
```

## Referências
- [Vitest](https://vitest.dev/)
- [Astro Testing](https://docs.astro.build/en/guides/testing/)

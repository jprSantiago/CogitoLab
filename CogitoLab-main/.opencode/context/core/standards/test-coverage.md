# Test Coverage Standards

## Estratégia de Testes

### Níveis de Teste

| Nível | O que testar | Ferramenta |
|-------|--------------|------------|
| **Unitário** | Componentes isolados, helpers, utilitários | Vitest |
| **Integração** | i18n, navegação, collections | Vitest |
| **E2E** | Fluxos críticos | Playwright (futuro) |

## Cobertura Mínima

```
Components: 80%+
Utils: 90%+
Pages: 50%+ (integração)
```

## O que Testar

### Sempre Testar
- ✅ Componentes com props variadas
- ✅ Helpers de i18n (traduções)
- ✅ Formatação de dados
- ✅ Filtragem e ordenação
- ✅ Links de navegação

### Não Testar (ou testar minimamente)
- ❌ Estilos visuais (testar composição)
- ❌ Conteúdo estático (é dado, não lógica)
- ❌ Configurações de build

## Padrões de Teste

### Teste de Componente

```typescript
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/dom';
import Card from '../../../src/components/common/Card.astro';

describe('Card', () => {
  const defaultProps = {
    title: 'Título Teste',
    description: 'Descrição teste'
  };

  it('renderiza título e descrição', () => {
    const { getByText } = render(Card, { props: defaultProps });
    
    expect(getByText('Título Teste')).toBeTruthy();
    expect(getByText('Descrição teste')).toBeTruthy();
  });

  it('renderiza link quando href é fornecido', () => {
    const { getByRole } = render(Card, { 
      props: { ...defaultProps, href: '/projetos' } 
    });
    
    const link = getByRole('link');
    expect(link.getAttribute('href')).toBe('/projetos');
  });

  it('não renderiza link quando href não é fornecido', () => {
    const { queryByRole } = render(Card, { props: defaultProps });
    
    expect(queryByRole('link')).toBeNull();
  });
});
```

### Teste de i18n

```typescript
import { describe, it, expect } from 'vitest';
import { t, formatDate } from '../../../src/utils/i18n';

describe('i18n', () => {
  describe('t()', () => {
    it('retorna tradução correta para pt-br', () => {
      expect(t('nav.home', 'pt-br')).toBe('Início');
    });

    it('retorna tradução correta para en', () => {
      expect(t('nav.home', 'en')).toBe('Home');
    });

    it('retorna chave quando tradução não existe', () => {
      expect(t('chave.inexistente', 'pt-br')).toBe('chave.inexistente');
    });
  });

  describe('formatDate()', () => {
    it('formata data para pt-br', () => {
      const date = new Date('2024-03-15');
      expect(formatDate(date, 'pt-br')).toContain('março');
    });

    it('formata data para en', () => {
      const date = new Date('2024-03-15');
      expect(formatDate(date, 'en')).toContain('March');
    });
  });
});
```

### Teste de Utilitário

```typescript
import { describe, it, expect } from 'vitest';
import { filterByArea, sortByDate } from '../../../src/utils/helpers';

describe('helpers', () => {
  describe('filterByArea()', () => {
    const items = [
      { id: 1, research_areas: ['ai-se', 'testing'] },
      { id: 2, research_areas: ['software-quality'] },
      { id: 3, research_areas: ['ai-se', 'iot'] },
    ];

    it('filtra itens por área', () => {
      const result = filterByArea(items, 'ai-se');
      expect(result).toHaveLength(2);
      expect(result.map(i => i.id)).toEqual([1, 3]);
    });

    it('retorna array vazio quando não há correspondência', () => {
      const result = filterByArea(items, 'inexistente');
      expect(result).toHaveLength(0);
    });
  });

  describe('sortByDate()', () => {
    it('ordena por data decrescente (mais recente primeiro)', () => {
      const items = [
        { date: '2024-01-01' },
        { date: '2024-06-01' },
        { date: '2024-03-01' },
      ];
      
      const result = sortByDate(items, 'date');
      expect(result[0].date).toBe('2024-06-01');
      expect(result[2].date).toBe('2024-01-01');
    });
  });
});
```

## Executando Testes

```bash
# Todos os testes
npm run test

# Com cobertura
npm run test:coverage

# Watch mode
npm run test:watch

# Teste específico
npm run test -- Card.test.ts
```

## Relatório de Cobertura

Após `npm run test:coverage`, o relatório é gerado em:
```
coverage/
├── index.html        # Relatório visual
├── lcov.info         # Para CI/CD
└── clover.xml        # Para ferramentas
```

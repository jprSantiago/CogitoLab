# Code Quality Standards

## Princípios Gerais

### Separação de Responsabilidades
- Componentes devem ter uma única responsabilidade
- Lógica de negócio separada de apresentação
- Utilitários em `src/utils/`

### Funcional e Modular
- Preferir funções puras
- Evitar estado global desnecessário
- Componentes reutilizáveis e composáveis

### Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Arquivos | kebab-case | `member-card.astro` |
| Componentes | PascalCase | `MemberCard.astro` |
| Funções | camelCase | `getMembers()` |
| Constantes | UPPER_CASE | `SITE_CONFIG` |
| Types/Interfaces | PascalCase | `MemberProps` |
| Variáveis | camelCase | `memberName` |

## Padrões de Código

### Componentes Astro

```astro
---
// 1. Interface/Types
interface Props {
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
}

// 2. Props com defaults
const { 
  title, 
  description, 
  variant = 'primary' 
} = Astro.props;

// 3. Lógica (se necessário)
const isPrimary = variant === 'primary';
---

<!-- 4. Template limpo e semanticamente correto -->
<div class:list={['card', { 'card-primary': isPrimary }]}>
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  /* 5. Estilos scoped (opcional com Tailwind) */
</style>
```

### Funções Utilitárias

```typescript
// src/utils/helpers.ts

/**
 * Formata data para exibição
 * @param date - Data a ser formatada
 * @param lang - Idioma (pt-br ou en)
 * @returns Data formatada
 */
export function formatDate(date: Date, lang: string): string {
  return new Intl.DateTimeFormat(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Filtra itens por área de pesquisa
 * @param items - Lista de itens
 * @param areaId - ID da área
 * @returns Itens filtrados
 */
export function filterByArea<T extends { research_areas: string[] }>(
  items: T[], 
  areaId: string
): T[] {
  return items.filter(item => item.research_areas.includes(areaId));
}
```

## Boas Práticas

### Sempre Fazer
- ✅ Usar TypeScript para type safety
- ✅ Documentar funções públicas com JSDoc
- ✅ Validar props de componentes
- ✅ Usar placeholders para imagens (width/height)
- ✅ Lazy loading para imagens
- ✅ Textos alternativos (alt) em imagens

### Nunca Fazer
- ❌ Usar `any` em TypeScript
- ❌ Lógica complexa no template
- ❌ Hardcoded strings (usar i18n)
- ❌ CSS inline (usar Tailwind)
- ❌ JavaScript desnecessário em componentes Astro

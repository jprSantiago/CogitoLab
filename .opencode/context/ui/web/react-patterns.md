# React Patterns (Astro Islands)

## Quando Usar React no Astro

Astro permite usar React (ou outros frameworks) como "ilhas" interativas.

### Usar React quando:
- ✅ Formulários com validação em tempo real
- ✅ Modais/Dropdowns interativos
- ✅ State management complexo
- ✅ Animações baseadas em estado
- ✅ Componentes que precisam de JavaScript no cliente

### NÃO usar React quando:
- ❌ Conteúdo estático
- ❌ Navegação simples
- ❌ Cards informativos
- ❌ Layouts

## Padrões de Componentes React

### Componente Básico

```tsx
// src/components/interactive/SearchFilter.tsx
import { useState } from 'react';

interface SearchFilterProps {
  items: Item[];
  onFilter: (filtered: Item[]) => void;
}

interface Item {
  id: string;
  title: string;
  area: string;
}

export function SearchFilter({ items, onFilter }: SearchFilterProps) {
  const [query, setQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleFilter = () => {
    const filtered = items.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesArea = !selectedArea || item.area === selectedArea;
      return matchesQuery && matchesArea;
    });
    onFilter(filtered);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleFilter();
        }}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-cogito-blue"
      />
      <select
        value={selectedArea}
        onChange={(e) => {
          setSelectedArea(e.target.value);
          handleFilter();
        }}
        className="px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-cogito-blue"
      >
        <option value="">Todas as áreas</option>
        <option value="ai-se">IA para SE</option>
        <option value="quality">Qualidade</option>
        <option value="testing">Testes</option>
      </select>
    </div>
  );
}
```

### Usando no Astro

```astro
---
// src/pages/projects.astro
import { SearchFilter } from '../components/interactive/SearchFilter';
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
---

<Layout title="Projetos">
  <SearchFilter client:load items={projects} />
  
  <div id="projects-list">
    <!-- Lista renderizada pelo React -->
  </div>
</Layout>
```

## Diretivas do Astro

| Diretiva | Quando usar |
|----------|-------------|
| `client:load` | Componente carrega imediatamente |
| `client:idle` | Componente carrega quando browser ocioso |
| `client:visible` | Componente carrega quando visível |
| `client:media` | Componente carrega quando media query matches |
| `client:only` | Componente só renderiza no cliente |

### Exemplos

```astro
<!-- Crítico: carrega imediatamente -->
<SearchFilter client:load items={items} />

<!-- Não crítico: carrega quando ocioso
<Analytics client:idle />

<!-- Só em desktop -->
<SidebarFilter client:media="(min-width: 768px)" />

<!-- Só no cliente (SSR disable) -->
<InteractiveChart client:only="react" />
```

## State Management

### Local State (useState)

Para componentes simples com estado local.

### Context API

Para compartilhar estado entre componentes.

```tsx
// src/contexts/LanguageContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState('pt-br');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

## Estilização com Tailwind

### Padrões

```tsx
// Classnames dinâmicos
const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
const variantStyles = isActive 
  ? 'bg-cogito-blue text-white' 
  : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

return (
  <button className={`${baseStyles} ${variantStyles}`}>
    {label}
  </button>
);

// Ou usando lib clsx/tailwind-merge
import clsx from 'clsx';

return (
  <button className={clsx(baseStyles, variantStyles)}>
    {label}
  </button>
);
```

## Performance

### Otimizações

1. **Lazy loading** de componentes não críticos
2. **Memoização** de cálculos pesados
3. **Debounce** em inputs de busca
4. **Virtualização** para listas grandes

### Exemplo de Memo

```tsx
import { useMemo } from 'react';

const filteredItems = useMemo(() => {
  return items.filter(item => item.area === selectedArea);
}, [items, selectedArea]);
```

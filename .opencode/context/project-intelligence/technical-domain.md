# CogitoLab — Padrões do Projeto

## Visão Geral

Site oficial do Cogito Lab, grupo de pesquisa em Engenharia de Software,
Inteligência Artificial, Qualidade de Software, Testes, Sistemas Móveis/IoT
e Inovação.

## Stack Técnica

| Componente | Tecnologia |
|------------|------------|
| Framework | Astro |
| Estilização | Tailwind CSS |
| i18n | @astrojs/i18n |
| Testes | Vitest |
| Deploy | GitHub Pages via GitHub Actions |
| Idiomas | PT-BR / EN |

## Estrutura de Pastas

```
src/
├── components/
│   ├── common/          # Botões, Cards, Headers, etc.
│   ├── layout/          # Navbar, Footer, Sidebar
│   ├── sections/        # Seções das páginas
│   └── i18n/            # Componentes de tradução
├── content/
│   ├── collections/     # Dados estruturados (MD/MDX)
│   │   ├── members/
│   │   ├── projects/
│   │   ├── publications/
│   │   ├── news/
│   │   ├── areas/
│   │   └── artifacts/
│   └── i18n/            # Traduções
│       ├── pt-br/
│       └── en/
├── layouts/
│   ├── BaseLayout.astro
│   ├── PageLayout.astro
│   └── ArticleLayout.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── areas/
│   ├── members/
│   ├── projects/
│   ├── publications/
│   ├── artifacts/
│   ├── news/
│   ├── join.astro
│   ├── partners.astro
│   └── contact.astro
├── styles/
│   └── global.css
└── utils/
    ├── i18n.ts
    └── helpers.ts
```

## Padrões de Componentes Astro

### Componente Básico

```astro
---
// src/components/common/Card.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  href?: string;
}

const { title, description, image, href } = Astro.props;
---

<article class="bg-white rounded-lg shadow-md overflow-hidden">
  {image && (
    <img src={image} alt={title} class="w-full h-48 object-cover" />
  )}
  <div class="p-6">
    <h3 class="text-xl font-semibold mb-2">{title}</h3>
    <p class="text-gray-600">{description}</p>
    {href && (
      <a href={href} class="mt-4 inline-block text-blue-600 hover:underline">
        Saiba mais
      </a>
    )}
  </div>
</article>
```

### Componente com i18n

```astro
---
// src/components/sections/Hero.astro
import { t } from '../../utils/i18n';

const lang = Astro.currentLocale || 'pt-br';
---

<section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      {t('hero.title', lang)}
    </h1>
    <p class="text-xl md:text-2xl mb-8">
      {t('hero.subtitle', lang)}
    </p>
  </div>
</section>
```

## Padrões de Conteúdo (Collections)

### Membro

```markdown
---
name: "Nome do Membro"
role: "Professor/Pesquisador"
affiliation: "Instituição"
photo: "/images/members/photo.jpg"
bio: "Breve biografia"
research_interests: ["IA", "Engenharia de Software"]
research_areas: ["ai-se", "software-quality"]
links:
  lattes: "http://lattes.cnpq.br/..."
  orcid: "https://orcid.org/..."
  github: "https://github.com/..."
  linkedin: "https://linkedin.com/..."
---

Conteúdo adicional do membro (opcional).
```

### Projeto

```markdown
---
title: "Título do Projeto"
agency: "CNPq"
process: "446729/2024-8"
role: "Coordenador"
period: "2024-2026"
status: "active"
research_areas: ["ai-se", "software-quality"]
members: ["member-1", "member-2"]
---

Descrição detalhada do projeto.
```

### Publicação

```markdown
---
title: "Título da Publicação"
authors: ["Autor 1", "Autor 2"]
venue: "Nome da Conferência/Revista"
year: 2024
type: "conference" # conference | journal | book | chapter
doi: "10.1234/..."
research_areas: ["ai-se"]
projects: ["project-1"]
links:
  paper: "https://..."
  code: "https://github.com/..."
  slides: "https://..."
---
```

## Padrões de i18n

### Configuração

```typescript
// src/utils/i18n.ts
export const locales = ['pt-br', 'en'];
export const defaultLocale = 'pt-br';

export function t(key: string, lang: string): string {
  // Implementação de tradução
}
```

### Estrutura de Traduções

```
src/content/i18n/
├── pt-br/
│   ├── nav.json        # Navegação
│   ├── home.json       # Home page
│   ├── areas.json      # Áreas de pesquisa
│   └── common.json     # Textos comuns
└── en/
    ├── nav.json
    ├── home.json
    ├── areas.json
    └── common.json
```

### Uso em Componentes

```astro
---
import { t } from '../../utils/i18n';
const lang = Astro.currentLocale || 'pt-br';
---

<nav>
  <a href={lang === 'pt-br' ? '/' : '/en/'}>
    {t('nav.home', lang)}
  </a>
</nav>
```

## Padrões de Estilo (Tailwind)

### Cores do Projeto

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        cogito: {
          blue: '#1e40af',
          purple: '#7c3aed',
        }
      }
    }
  }
}
```

### Padrões de Responsividade

```astro
<!-- Mobile First -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>

<!-- Padding responsivo -->
<section class="py-8 md:py-12 lg:py-16">
  <div class="container mx-auto px-4">
    <!-- Conteúdo -->
  </div>
</section>
```

## Padrões de Testes

### Teste de Componente

```typescript
// tests/unit/Card.test.ts
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/dom';
import Card from '../../src/components/common/Card.astro';

describe('Card', () => {
  it('renders title and description', () => {
    const { getByText } = render(Card, {
      props: {
        title: 'Test Title',
        description: 'Test Description'
      }
    });
    
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });
});
```

### Teste de i18n

```typescript
// tests/unit/i18n.test.ts
import { describe, it, expect } from 'vitest';
import { t } from '../../src/utils/i18n';

describe('i18n', () => {
  it('returns correct translation for pt-br', () => {
    expect(t('nav.home', 'pt-br')).toBe('Início');
  });
  
  it('returns correct translation for en', () => {
    expect(t('nav.home', 'en')).toBe('Home');
  });
});
```

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor local

# Build
npm run build            # Build estático

# Testes
npm run test             # Rodar todos os testes
npm run test:coverage    # Testes com cobertura

# Lint
npm run lint             # Verificar código
npm run format           # Formatar código
```

## Regras Importantes

1. **Componentes Astro** devem ser leves (0 JS por padrão)
2. **i18n** é obrigatório para todo conteúdo visível
3. **Tailwind** para estilização (utility-first)
4. **Markdown** para conteúdo estático via collections
5. **Testes** para componentes e helpers de i18n
6. **Acessibilidade** WCAG 2.1 AA
7. **Performance** - otimizar imagens, lazy loading
8. **SEO** - meta tags, Open Graph, sitemap

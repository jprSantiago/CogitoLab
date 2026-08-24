# Design Iteration Workflow

## Fluxo de Design em 4 Estágios

```
┌─────────────────────────────────────────────────────────────┐
│  1. LAYOUT          →  2. THEME           →  3. ANIMATION   │
│  Estrutura básica      Cores e tipografia    Micro-interações │
│  Sem estilo            Visually complete     Polimento final  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  4. IMPLEMENT   │
                    │  Código final   │
                    │  Com i18n       │
                    └─────────────────┘
```

## Estágio 1: Layout

### Objetivo
Definir estrutura e hierarquia do conteúdo.

### Checklist
- [ ] Hierarquia de títulos (h1 > h2 > h3)
- [ ] Grid responsivo definido
- [ ] Espaçamento consistente (multiplos de 4/8)
- [ ] Componentes posicionados
- [ ] Fluxo de leitura lógico

### Exemplo

```astro
<section class="py-12 md:py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">Título da Seção</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Cards aqui -->
    </div>
  </div>
</section>
```

## Estágio 2: Theme

### Objetivo
Aplicar identidade visual do Cogito Lab.

### Cores do Projeto

| Uso | Cor | Tailwind |
|-----|-----|----------|
| Primária | Azul Cogito | `cogito-blue` |
| Secundária | Roxo | `cogito-purple` |
| Fundo | Branco/Cinza claro | `white`, `gray-50` |
| Texto | Cinza escuro | `gray-800`, `gray-900` |

### Tipografia

| Elemento | Tamanho | Peso |
|----------|---------|------|
| H1 | text-4xl md:text-6xl | font-bold |
| H2 | text-3xl md:text-4xl | font-bold |
| H3 | text-xl md:text-2xl | font-semibold |
| Body | text-base md:text-lg | font-normal |

### Exemplo

```astro
<section class="py-20 bg-gradient-to-r from-cogito-blue to-cogito-purple text-white">
  <div class="container mx-auto px-4 text-center">
    <h1 class="text-4xl md:text-6xl font-bold mb-6">
      Cogito Lab
    </h1>
    <p class="text-xl md:text-2xl opacity-90">
      Pesquisa em Engenharia de Software e IA
    </p>
  </div>
</section>
```

## Estágio 3: Animation

### Objetivo
Adicionar micro-interações que melhorem a UX.

### Animações Aprovadas

| Elemento | Animação | Propriedade |
|----------|----------|-------------|
| Cards | Hover scale | `hover:scale-105 transition-transform` |
| Botões | Hover bg | `hover:bg-blue-700 transition-colors` |
| Links | Underline | `hover:underline` |
| Fade in | On scroll | Intersection Observer (futuro) |

### Exemplo

```astro
<article class="bg-white rounded-lg shadow-md overflow-hidden 
                hover:shadow-lg hover:scale-105 transition-all duration-300">
  <img src={image} alt={title} class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-xl font-semibold mb-2">{title}</h3>
    <p class="text-gray-600">{description}</p>
  </div>
</article>
```

## Estágio 4: Implement

### Objetivo
Transformar design em código final com i18n.

### Checklist
- [ ] Componente criado em `src/components/`
- [ ] Props tipadas com TypeScript
- [ ] i18n aplicado (sem strings hardcoded)
- [ ] Testes escritos
- [ ] Responsivo verificado
- [ ] Acessibilidade verificada
- [ ] Performance verificada (0 JS desnecessário)

### Padrão de Implementação

```astro
---
// 1. Imports
import { t } from '../../utils/i18n';

// 2. Props
interface Props {
  title: string;
  items: Item[];
}

const { title, items } = Astro.props;
const lang = Astro.currentLocale || 'pt-br';
---

<!-- 3. Template -->
<section class="py-12">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">{title}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <article class="bg-white rounded-lg shadow-md p-6 
                        hover:shadow-lg transition-shadow">
          <h3 class="text-xl font-semibold mb-2">{item.title}</h3>
          <p class="text-gray-600">{item.description}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

## Gates de Aprovação

Antes de avançar para o próximo estágio:

| Estágio | Critério |
|---------|----------|
| Layout → Theme | Estrutura aprovada, hierarquia ok |
| Theme → Animações | Visual aprovado, cores e tipografia ok |
| Animações → Implement | Micro-interações aprovadas |
| Implement → Deploy | Testes passando, i18n ok, build ok |

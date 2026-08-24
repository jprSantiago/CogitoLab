# UI Styling Standards

## Tailwind CSS

### Configuração

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cogito: {
          blue: '#1e40af',
          'blue-light': '#3b82f6',
          purple: '#7c3aed',
          'purple-light': '#a78bfa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Uso de Cores

```astro
<!-- Primária -->
<button class="bg-cogito-blue text-white hover:bg-cogito-blue-light">
  Ação
</button>

<!-- Gradiente -->
<section class="bg-gradient-to-r from-cogito-blue to-cogito-purple">
  Hero
</section>

<!-- Texto -->
<h1 class="text-cogito-blue">Título</h1>
<p class="text-gray-600">Parágrafo</p>
```

## Componentes Comuns

### Botão

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit';
}

const { 
  variant = 'primary', 
  size = 'md', 
  href, 
  type = 'button',
  ...rest 
} = Astro.props;

const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors';

const variants = {
  primary: 'bg-cogito-blue text-white hover:bg-cogito-blue-light',
  secondary: 'bg-white text-cogito-blue border border-cogito-blue hover:bg-gray-50',
  ghost: 'text-cogito-blue hover:bg-blue-50',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const classes = `${baseStyles} ${variants[variant]} ${sizes[size]}`;
---

{href ? (
  <a href={href} class={classes} {...rest}>
    <slot />
  </a>
) : (
  <button type={type} class={classes} {...rest}>
    <slot />
  </button>
)}
```

### Card

```astro
---
interface Props {
  title: string;
  description: string;
  image?: string;
  href?: string;
  tags?: string[];
}

const { title, description, image, href, tags } = Astro.props;
---

<article class="bg-white rounded-lg shadow-md overflow-hidden 
                hover:shadow-lg transition-shadow duration-300">
  {image && (
    <img 
      src={image} 
      alt={title} 
      class="w-full h-48 object-cover"
      loading="lazy"
    />
  )}
  <div class="p-6">
    {tags && tags.length > 0 && (
      <div class="flex flex-wrap gap-2 mb-3">
        {tags.map(tag => (
          <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
            {tag}
          </span>
        ))}
      </div>
    )}
    <h3 class="text-xl font-semibold mb-2">{title}</h3>
    <p class="text-gray-600 mb-4">{description}</p>
    {href && (
      <a 
        href={href} 
        class="text-cogito-blue hover:underline font-medium"
      >
        Saiba mais →
      </a>
    )}
  </div>
</article>
```

### Section Header

```astro
---
interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const { title, subtitle, centered = false } = Astro.props;
---

<div class:list={['mb-8', { 'text-center': centered }]}>
  <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
    {title}
  </h2>
  {subtitle && (
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
      {subtitle}
    </p>
  )}
</div>
```

## Layout Responsivo

### Container

```astro
<!-- Padrão -->
<div class="container mx-auto px-4">
  <!-- Conteúdo -->
</div>

<!-- Com max-width -->
<div class="container mx-auto px-4 max-w-7xl">
  <!-- Conteúdo -->
</div>
```

### Grid

```astro
<!-- 1 coluna mobile, 2 tablet, 3 desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>

<!-- 2 colunas mobile, 4 desktop -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Stats -->
</div>
```

### Spacing

```astro
<!-- Seções -->
<section class="py-12 md:py-16 lg:py-20">
  <!-- Conteúdo -->
</section>

<!-- Entre elementos -->
<div class="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Ícones

### Usando SVG inline

```astro
<!-- Heroicons (open source) -->
<svg 
  class="w-6 h-6" 
  fill="none" 
  stroke="currentColor" 
  viewBox="0 0 24 24"
>
  <path 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    stroke-width="2" 
    d="M13 10V3L4 14h7v7l9-11h-7z"
  />
</svg>
```

### Ícones com texto

```astro
<div class="flex items-center gap-2">
  <svg class="w-5 h-5 text-cogito-blue" ...>
    <!-- path -->
  </svg>
  <span>Texto com ícone</span>
</div>
```

## Acessibilidade

### Foco

```astro
<button class="focus:outline-none focus:ring-2 focus:ring-cogito-blue focus:ring-offset-2">
  Botão acessível
</button>
```

### Cores com contraste

| Fundo | Texto | Contraste |
|-------|-------|-----------|
| white | gray-900 | 15.4:1 ✅ |
| cogito-blue | white | 8.6:1 ✅ |
| gray-100 | gray-800 | 10.5:1 ✅ |

### Skip Link

```astro
<a 
  href="#main-content" 
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
         bg-cogito-blue text-white px-4 py-2 rounded z-50"
>
  Pular para o conteúdo principal
</a>
```

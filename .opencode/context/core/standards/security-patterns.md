# Security Patterns

## O que Proteger

### Dados Sensíveis
- ❌ NUNCA expor chaves de API no código
- ❌ NUNCA commitar arquivos `.env`
- ❌ NUNCA colocar dados pessoais no repositório público

### Variáveis de Ambiente

```bash
# .env (NÃO commitar)
PUBLIC_API_URL=https://api.example.com
CONTACT_EMAIL=cogito@lab.com
```

```typescript
// Uso correto
const apiUrl = import.meta.env.PUBLIC_API_URL;
```

## Validação de Input

### Em Componentes

```astro
---
// Validar props
interface Props {
  email: string;
  url?: string;
}

const { email, url } = Astro.props;

// Validação básica
if (!email || !email.includes('@')) {
  throw new Error('Email inválido');
}

if (url && !URL.canParse(url)) {
  throw new Error('URL inválida');
}
---
```

### Em Formulários

```astro
<form action="/api/contact" method="POST">
  <input 
    type="email" 
    name="email" 
    required 
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  />
  <input 
    type="url" 
    name="website"
    pattern="https?://.+"
  />
</form>
```

## Headers de Segurança

### Content Security Policy (CSP)

```yaml
# _headers (Netlify) ou configuração do servidor
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
```

## Links Externos

### sempre com rel="noopener"

```astro
<a 
  href="https://externo.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Link Externo
</a>
```

## Checklist de Segurança

- [ ] Variáveis de ambiente em `.env` (não commitar)
- [ ] `.env` no `.gitignore`
- [ ] Validação de input em formulários
- [ ] `rel="noopener noreferrer"` em links externos
- [ ] Sem dados pessoais no repositório público
- [ ] Imagens servidas via HTTPS
- [ ] CSP configurado (se aplicável)

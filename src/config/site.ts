/** Configuração global do site (constantes UPPER_CASE). */
export const SITE_CONFIG = {
  name: 'Cogito Lab',
  shortName: 'Cogito',
  description:
    'Grupo de pesquisa em Engenharia de Software, Inteligência Artificial, Qualidade, Testes, Sistemas Móveis/IoT e Inovação.',
  // Unificado com `site` do astro.config.mjs (respeita project page via ASTRO_SITE).
  url: import.meta.env.SITE || 'https://jprsantiago.github.io/CogitoLab',
  locale: 'pt-br',
  social: {
    github: 'https://github.com/cogitolab',
    email: 'contato@cogitolab.org',
  },
} as const;

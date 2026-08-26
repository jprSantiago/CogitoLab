import { beforeAll, describe, expect, it } from 'vitest';
import Areas from '../../src/components/sections/Areas.astro';
import Members from '../../src/components/sections/Members.astro';
import Projects from '../../src/components/sections/Projects.astro';
import Publications from '../../src/components/sections/Publications.astro';
import News from '../../src/components/sections/News.astro';
import Artifacts from '../../src/components/sections/Artifacts.astro';
import About from '../../src/components/sections/About.astro';
import Join from '../../src/components/sections/Join.astro';
import Contact from '../../src/components/sections/Contact.astro';
import Partners from '../../src/components/sections/Partners.astro';
import { news } from '../../src/data/news';
import { renderComponent } from './render-helper';

const responsive = /(sm:|md:|lg:)/;

describe('Areas section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Areas);
  });

  it('renders the localized title', () => {
    expect(html).toContain('Áreas de Pesquisa');
  });

  it('renders all six research areas', () => {
    const ids = (html.match(/id="area-[\w-]+"/g) ?? []).length;
    expect(ids).toBe(6);
  });

  it('renders a carousel/roulette for the areas', () => {
    expect(html).toContain('data-carousel');
    expect(html).toContain('carousel__track');
    expect(html).toContain('data-carousel-prev');
    expect(html).toContain('data-carousel-next');
    expect(html).toContain('carousel__slide');
  });
});

describe('Members section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Members);
  });

  it('renders the section title and member names', () => {
    expect(html).toContain('Membros');
    expect(html).toContain('Profa. Ana Silva');
    expect(html).toContain('Carla Souza');
  });

  it('provides filter controls with accessible state', () => {
    expect(html).toContain('data-filter-group="category"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('aria-pressed="false"');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

describe('Projects section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Projects);
  });

  it('renders the title and project data', () => {
    expect(html).toContain('Projetos');
    expect(html).toContain('CNPq');
    expect(html).toContain('Avaliação da Qualidade de Código Gerado por IA');
    expect(html).toContain('Em andamento');
  });

  it('renders a carousel/roulette for the cards', () => {
    expect(html).toContain('data-carousel');
    expect(html).toContain('carousel__track');
    expect(html).toContain('data-carousel-prev');
    expect(html).toContain('data-carousel-next');
    expect(html).toContain('carousel__slide');
  });
});

describe('Publications section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Publications);
  });

  it('renders the title and publication entries', () => {
    expect(html).toContain('Publicações');
    expect(html).toContain('AI-Assisted Code Review: A Survey');
  });

  it('exposes an accessible search input', () => {
    expect(html).toContain('data-search-input');
    expect(html).toContain('aria-label=');
    expect(html).toContain('type="search"');
  });
});

describe('News section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(News, {
      props: {
        page: {
          data: news,
          currentPage: 1,
          lastPage: 1,
          url: { current: '/pt-br/news/' },
        },
      },
    });
  });

  it('renders the title and news items', () => {
    expect(html).toContain('Notícias e Atividades');
    expect(html).toContain('Paper aceito no ICSE 2024');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

describe('Artifacts section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Artifacts);
  });

  it('renders the title and artifact names', () => {
    expect(html).toContain('Software, Ferramentas e Dados');
    expect(html).toContain('AI Code Evaluator');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

describe('About section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(About);
  });

  it('renders the title and mission/vision/values blocks', () => {
    expect(html).toContain('Sobre o Cogito Lab');
    expect(html).toContain('Missão');
    expect(html).toContain('Visão');
    expect(html).toContain('Valores');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

describe('Join section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Join);
  });

  it('renders the title and the application email', () => {
    expect(html).toContain('Junte-se ao Cogito Lab');
    expect(html).toContain('contato@cogitolab.org');
    expect(html).toContain('mailto:contato@cogitolab.org');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

describe('Contact section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Contact);
  });

  it('renders the title and contact email', () => {
    expect(html).toContain('Contato');
    expect(html).toContain('contato@cogitolab.org');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

describe('Partners section', () => {
  let html = '';
  beforeAll(async () => {
    html = await renderComponent(Partners);
  });

  it('renders the title and partner names', () => {
    expect(html).toContain('Parceiros e Fomento');
    expect(html).toContain('CNPq');
    expect(html).toContain('FAPEMIG');
  });

  it('uses a responsive grid layout', () => {
    expect(html).toMatch(responsive);
  });
});

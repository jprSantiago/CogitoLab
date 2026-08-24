import { bilingual, type Localized } from './types';

export type AreaId =
  | 'ai-se'
  | 'quality'
  | 'testing'
  | 'mobile-iot'
  | 'collaborative'
  | 'innovation';

export interface Area {
  id: AreaId;
  icon: string;
  title: Localized;
  description: Localized;
  topics: Localized[];
  /** IDs de projetos relacionados (ver `projects.ts`). */
  projects: string[];
  /** IDs de publicações relacionadas (ver `publications.ts`). */
  publications: string[];
}

export const areas: Area[] = [
  {
    id: 'ai-se',
    icon: '🤖',
    title: bilingual(
      'Inteligência Artificial para Engenharia de Software',
      'Artificial Intelligence for Software Engineering'
    ),
    description: bilingual(
      'Investiga o uso de IA para apoio à escrita, revisão e manutenção de código, incluindo geração, correção de bugs e agentes para SE.',
      'Investigates the use of AI to support code writing, review and maintenance, including generation, bug fixing and agents for SE.'
    ),
    topics: [
      bilingual('Geração de código', 'Code generation'),
      bilingual('Correção de bugs', 'Bug fixing'),
      bilingual('Engenharia de prompts', 'Prompt engineering'),
      bilingual('Agentes de IA para SE', 'AI agents for SE'),
    ],
    projects: ['cnpq-446729-2024', 'cnpq-406089-2025'],
    publications: ['paper-2024-01', 'paper-2024-03'],
  },
  {
    id: 'quality',
    icon: '📊',
    title: bilingual(
      'Qualidade de Software, Débito Técnico e Refatoração',
      'Software Quality, Technical Debt & Refactoring'
    ),
    description: bilingual(
      'Estuda métricas de qualidade, detecção e gestão de débito técnico e estratégias de refatoração segura.',
      'Studies quality metrics, technical debt detection and management, and safe refactoring strategies.'
    ),
    topics: [
      bilingual('Métricas de qualidade', 'Quality metrics'),
      bilingual('Débito técnico', 'Technical debt'),
      bilingual('Refatoração', 'Refactoring'),
      bilingual('Smells de código', 'Code smells'),
    ],
    projects: ['fapemig-APQ-01488-24'],
    publications: ['paper-2024-02'],
  },
  {
    id: 'testing',
    icon: '🧪',
    title: bilingual(
      'Testes de Software e Confiabilidade',
      'Software Testing & Reliability'
    ),
    description: bilingual(
      'Pesquisa técnicas de teste automatizado, geração de casos de teste e avaliação de confiabilidade de sistemas.',
      'Researches automated testing techniques, test case generation, and systems reliability assessment.'
    ),
    topics: [
      bilingual('Testes automatizados', 'Automated testing'),
      bilingual('Geração de testes', 'Test generation'),
      bilingual('Cobertura', 'Coverage'),
      bilingual('Confiabilidade', 'Reliability'),
    ],
    projects: ['fapemig-APQ-04113-25'],
    publications: ['paper-2024-03'],
  },
  {
    id: 'mobile-iot',
    icon: '📱',
    title: bilingual(
      'Sistemas Configuráveis, Mobile e IoT',
      'Configurable Systems, Mobile & IoT'
    ),
    description: bilingual(
      'Explora sistemas orientados a características, aplicações móveis e infraestrutura de Internet das Coisas.',
      'Explores feature-oriented systems, mobile applications and Internet of Things infrastructure.'
    ),
    topics: [
      bilingual('Linhas de produto de software', 'Software product lines'),
      bilingual('Aplicações móveis', 'Mobile apps'),
      bilingual('IoT', 'IoT'),
      bilingual('Sistemas configuráveis', 'Configurable systems'),
    ],
    projects: ['fapemig-APQ-03990-26'],
    publications: [],
  },
  {
    id: 'collaborative',
    icon: '👥',
    title: bilingual(
      'Desenvolvimento Colaborativo e SE Empírica',
      'Collaborative Software Development & Empirical SE'
    ),
    description: bilingual(
      'Analisa práticas de revisão de código, trabalho distribuído em equipe e métodos de pesquisa empírica em SE.',
      'Analyzes code review practices, distributed team work, and empirical research methods in SE.'
    ),
    topics: [
      bilingual('Revisão de código', 'Code review'),
      bilingual('SE empírica', 'Empirical SE'),
      bilingual('Trabalho distribuído', 'Distributed work'),
      bilingual('Mineração de repositórios', 'Mining software repositories'),
    ],
    projects: ['cnpq-446729-2024'],
    publications: ['paper-2024-01'],
  },
  {
    id: 'innovation',
    icon: '💡',
    title: bilingual(
      'Inovação, Empreendedorismo e Transferência de Tecnologia',
      'Innovation, Entrepreneurship & Technology Transfer'
    ),
    description: bilingual(
      'Conecta a pesquisa acadêmica a aplicações de mercado, fomentando empreendedorismo e transferência de tecnologia.',
      'Connects academic research to market applications, fostering entrepreneurship and technology transfer.'
    ),
    topics: [
      bilingual('Transferência de tecnologia', 'Technology transfer'),
      bilingual('Empreendedorismo', 'Entrepreneurship'),
      bilingual('Inovação aberta', 'Open innovation'),
      bilingual('Propriedade intelectual', 'Intellectual property'),
    ],
    projects: ['fapemig-APQ-01488-24', 'fapemig-APQ-04113-25'],
    publications: [],
  },
];

export function getArea(id: string): Area | undefined {
  return areas.find((a) => a.id === id);
}

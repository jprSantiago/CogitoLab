import { bilingual, type Localized } from './types';

export type NewsCategory =
  | 'paper-acceptance'
  | 'conference'
  | 'award'
  | 'defense'
  | 'project'
  | 'member'
  | 'talk'
  | 'workshop'
  | 'hackathon'
  | 'visit'
  | 'collaboration';

export interface NewsItem {
  id: string;
  title: Localized;
  date: string;
  category: NewsCategory;
  image?: string;
  summary: Localized;
  members: string[];
  projects: string[];
}

export const news: NewsItem[] = [
  {
    id: 'paper-icse-2024',
    title: bilingual('Paper aceito no ICSE 2024', 'Paper accepted at ICSE 2024'),
    date: '2024-03-15',
    category: 'paper-acceptance',
    summary: bilingual(
      'Nosso trabalho sobre revisão de código assistida por IA foi aceito no ICSE.',
      'Our work on AI-assisted code review was accepted at ICSE.'
    ),
    members: ['ana-silva', 'carla-souza'],
    projects: ['cnpq-446729-2024'],
  },
  {
    id: 'new-project-fapemig',
    title: bilingual('Novo projeto FAPEMIG aprovado', 'New FAPEMIG project approved'),
    date: '2025-01-20',
    category: 'project',
    summary: bilingual(
      'Projeto sobre testes automatizados recebeu fomento da FAPEMIG.',
      'Project on automated testing received FAPEMIG funding.'
    ),
    members: ['bruno-costa'],
    projects: ['fapemig-APQ-04113-25'],
  },
  {
    id: 'carla-defense',
    title: bilingual('Defesa de tese de Carla Souza', "Carla Souza's defense"),
    date: '2025-06-10',
    category: 'defense',
    summary: bilingual(
      'Carla defendeu sua tese sobre geração de código por IA.',
      'Carla defended her thesis on AI code generation.'
    ),
    members: ['carla-souza'],
    projects: ['cnpq-446729-2024'],
  },
  {
    id: 'new-member-elena',
    title: bilingual('Bem-vinda, Elena Ramos', 'Welcome, Elena Ramos'),
    date: '2025-08-01',
    category: 'member',
    summary: bilingual(
      'Elena ingressa como estudante de iniciação científica.',
      'Elena joins as an undergraduate research student.'
    ),
    members: ['elena-ramos'],
    projects: [],
  },
  {
    id: 'talk-ai-se',
    title: bilingual('Palestra: IA para SE', 'Talk: AI for SE'),
    date: '2025-09-12',
    category: 'talk',
    summary: bilingual(
      'Profa. Ana Silva apresentou palestra sobre agentes de IA.',
      'Prof. Ana Silva gave a talk on AI agents.'
    ),
    members: ['ana-silva'],
    projects: ['cnpq-406089-2025'],
  },
];

export const newsCategories: NewsCategory[] = [
  'paper-acceptance',
  'conference',
  'award',
  'defense',
  'project',
  'member',
  'talk',
  'workshop',
  'hackathon',
  'visit',
  'collaboration',
];

import { bilingual, type Localized } from './types';
import type { AreaId } from './areas';

export type MemberCategory =
  | 'faculty'
  | 'collaborator'
  | 'phd'
  | 'msc'
  | 'undergraduate'
  | 'alumni';

export interface MemberLink {
  labelKey: string;
  url: string;
}

export interface Member {
  id: string;
  name: string;
  role: Localized;
  institution: Localized;
  category: MemberCategory;
  photo?: string;
  bio: Localized;
  interests: Localized[];
  areas: AreaId[];
  contact?: { email?: string };
  links: MemberLink[];
}

export const members: Member[] = [
  {
    id: 'ana-silva',
    name: 'Profa. Ana Silva',
    role: bilingual('Professora/Pesquisadora', 'Professor/Researcher'),
    institution: bilingual('Universidade Federal', 'Federal University'),
    category: 'faculty',
    bio: bilingual(
      'Lidera o Cogito Lab com foco em IA para Engenharia de Software e qualidade de código.',
      'Leads the Cogito Lab focusing on AI for Software Engineering and code quality.'
    ),
    interests: [bilingual('IA para SE', 'AI for SE'), bilingual('Qualidade', 'Quality')],
    areas: ['ai-se', 'quality'],
    contact: { email: 'ana.silva@cogitolab.org' },
    links: [
      { labelKey: 'members.link.lattes', url: 'http://lattes.cnpq.br/0000000000000001' },
      { labelKey: 'members.link.orcid', url: 'https://orcid.org/0000-0000-0000-0001' },
      { labelKey: 'members.link.scholar', url: 'https://scholar.google.com/citations?user=ana' },
      { labelKey: 'members.link.github', url: 'https://github.com/ana-silva' },
    ],
  },
  {
    id: 'bruno-costa',
    name: 'Prof. Bruno Costa',
    role: bilingual('Pesquisador Colaborador', 'Collaborating Researcher'),
    institution: bilingual('Instituto de Ciência', 'Science Institute'),
    category: 'collaborator',
    bio: bilingual(
      'Atua em testes de software e confiabilidade de sistemas.',
      'Works on software testing and systems reliability.'
    ),
    interests: [bilingual('Testes', 'Testing'), bilingual('Confiabilidade', 'Reliability')],
    areas: ['testing'],
    links: [
      { labelKey: 'members.link.orcid', url: 'https://orcid.org/0000-0000-0000-0002' },
      { labelKey: 'members.link.linkedin', url: 'https://linkedin.com/in/bruno-costa' },
    ],
  },
  {
    id: 'carla-souza',
    name: 'Carla Souza',
    role: bilingual('Doutoranda', 'PhD Student'),
    institution: bilingual('Universidade Federal', 'Federal University'),
    category: 'phd',
    bio: bilingual(
      'Pesquisa geração de código por IA e agentes de software.',
      'Researches AI code generation and software agents.'
    ),
    interests: [bilingual('Geração de código', 'Code generation'), bilingual('Agentes', 'Agents')],
    areas: ['ai-se'],
    contact: { email: 'carla.souza@cogitolab.org' },
    links: [
      { labelKey: 'members.link.github', url: 'https://github.com/carla-souza' },
      { labelKey: 'members.link.scholar', url: 'https://scholar.google.com/citations?user=carla' },
    ],
  },
  {
    id: 'diego-lima',
    name: 'Diego Lima',
    role: bilingual('Mestrando', 'Master Student'),
    institution: bilingual('Universidade Federal', 'Federal University'),
    category: 'msc',
    bio: bilingual(
      'Estuda débito técnico e refatoração em sistemas legados.',
      'Studies technical debt and refactoring in legacy systems.'
    ),
    interests: [bilingual('Débito técnico', 'Technical debt'), bilingual('Refatoração', 'Refactoring')],
    areas: ['quality'],
    links: [{ labelKey: 'members.link.github', url: 'https://github.com/diego-lima' }],
  },
  {
    id: 'elena-ramos',
    name: 'Elena Ramos',
    role: bilingual('Iniciação Científica', 'Undergraduate Research'),
    institution: bilingual('Universidade Federal', 'Federal University'),
    category: 'undergraduate',
    bio: bilingual(
      'Investiga revisão de código colaborativa e SE empírica.',
      'Investigates collaborative code review and empirical SE.'
    ),
    interests: [bilingual('Revisão de código', 'Code review')],
    areas: ['collaborative'],
    links: [],
  },
  {
    id: 'felipe-martins',
    name: 'Dr. Felipe Martins',
    role: bilingual('Ex-membro (Alumni)', 'Alumni'),
    institution: bilingual('Empresa de Tecnologia', 'Tech Company'),
    category: 'alumni',
    bio: bilingual(
      'Doutor pelo lab, hoje atua com transferência de tecnologia na indústria.',
      'Lab PhD, now working on technology transfer in industry.'
    ),
    interests: [bilingual('Inovação', 'Innovation')],
    areas: ['innovation'],
    links: [{ labelKey: 'members.link.linkedin', url: 'https://linkedin.com/in/felipe-martins' }],
  },
];

export const memberCategories: MemberCategory[] = [
  'faculty',
  'collaborator',
  'phd',
  'msc',
  'undergraduate',
  'alumni',
];

export function getMembersByCategory(category: MemberCategory): Member[] {
  return members.filter((m) => m.category === category);
}

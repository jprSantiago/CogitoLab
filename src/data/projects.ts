import { bilingual, type Localized } from './types';
import type { AreaId } from './areas';

export type ProjectAgency = 'CNPq' | 'FAPEMIG';
export type ProjectRole = 'coordinator' | 'subcoordinator' | 'collaborator';
export type ProjectStatus = 'active' | 'completed' | 'paused';

export interface ProjectMember {
  name: string;
  roleKey: string;
  memberRef?: string;
}

export interface Project {
  id: string;
  agency: ProjectAgency;
  processNumber: string;
  title: Localized;
  role: ProjectRole;
  period: string;
  status: ProjectStatus;
  institution: Localized;
  areas: AreaId[];
  members: ProjectMember[];
  publications: string[];
  artifacts: string[];
  description: Localized;
  /** Iniciativas relacionadas (ex.: VUEI, Novo SEED). */
  initiatives?: string[];
}

export const projects: Project[] = [
  {
    id: 'cnpq-446729-2024',
    agency: 'CNPq',
    processNumber: '446729/2024-8',
    title: bilingual(
      'Avaliação da Qualidade de Código Gerado por Inteligência Artificial na Resolução de Dívidas Técnicas e Conflitos de Integração em Projetos Reais.',
      'Evaluating the Quality of Artificial-Intelligence-Generated Code in Fixing Technical Debt and Merge Conflicts in Real-World Projects'
    ),
    role: 'coordinator',
    period: '2024–2026',
    status: 'active',
    institution: bilingual('Universidade Federal', 'Federal University'),
    areas: ['ai-se', 'collaborative'],
    members: [
      { name: 'Profa. Ana Silva', roleKey: 'projects.role.coordinator', memberRef: 'ana-silva' },
      { name: 'Carla Souza', roleKey: 'projects.role.collaborator', memberRef: 'carla-souza' },
    ],
    publications: ['paper-2024-01', 'paper-2024-03'],
    artifacts: ['ai-code-evaluator'],
    description: bilingual(
      'Investiga a qualidade de código produzido por IA generativa na correção de débitos técnicos e conflitos de integração em projetos reais de software.',
      'Investigates the quality of code produced by generative AI in fixing technical debt and merge conflicts in real-world software projects.'
    ),
  },
  {
    id: 'cnpq-406089-2025',
    agency: 'CNPq',
    processNumber: '406089/2025-6',
    title: bilingual(
      'LLM4IoT: Detecção e Correção de Falhas de Interação de Dispositivos com Grandes Modelos de Linguagem em Sistemas de Software IoT.',
      'LLM4IoT: Detection and Correction of Device Interaction Failures using Large Language Models in IoT Software Systems'
    ),
    role: 'subcoordinator',
    period: '2025–2027',
    status: 'active',
    institution: bilingual('Universidade Federal', 'Federal University'),
    areas: ['ai-se', 'collaborative'],
    members: [
      { name: 'Profa. Ana Silva', roleKey: 'projects.role.coordinator', memberRef: 'ana-silva' },
      { name: 'Carla Souza', roleKey: 'projects.role.collaborator', memberRef: 'carla-souza' },
    ],
    publications: ['paper-2024-01'],
    artifacts: ['review-agent'],
    description: bilingual(
      'Aplica grandes modelos de linguagem para detectar e corrigir falhas de interação entre dispositivos em sistemas de software IoT.',
      'Applies large language models to detect and correct device interaction failures in IoT software systems.'
    ),
  },
  {
    id: 'fapemig-APQ-01488-24',
    agency: 'FAPEMIG',
    processNumber: 'APQ-01488-24',
    title: bilingual(
      'Avaliação da Qualidade de Código de Teste Gerado por Inteligência Artificial em Aplicações para Dispositivos Móveis.',
      'Evaluation of the Quality of AI-Generated Test Code in Applications for Mobile Devices'
    ),
    role: 'subcoordinator',
    period: '2024–2026',
    status: 'active',
    institution: bilingual('Universidade Federal', 'Federal University'),
    areas: ['quality', 'innovation'],
    members: [
      { name: 'Diego Lima', roleKey: 'projects.role.collaborator', memberRef: 'diego-lima' },
    ],
    publications: ['paper-2024-02'],
    artifacts: ['debt-dashboard'],
    description: bilingual(
      'Avalia a qualidade de código de teste gerado por IA em aplicações para dispositivos móveis.',
      'Evaluates the quality of AI-generated test code in mobile device applications.'
    ),
  },
  {
    id: 'fapemig-APQ-04113-25',
    agency: 'FAPEMIG',
    processNumber: 'APQ-04113-25',
    title: bilingual(
      'Transformação Empreendedora: Consolidando o Ecossistema de Inovação no Unilavras.',
      'Entrepreneurial Transformation: Consolidating the Innovation Ecosystem at Unilavras'
    ),
    role: 'subcoordinator',
    period: '2025–2027',
    status: 'active',
    institution: bilingual('Universidade Federal', 'Federal University'),
    areas: ['testing', 'innovation'],
    members: [
      { name: 'Prof. Bruno Costa', roleKey: 'projects.role.coordinator', memberRef: 'bruno-costa' },
    ],
    publications: ['paper-2024-03'],
    artifacts: ['test-gen-tool'],
    description: bilingual(
      'Consolida o ecossistema de inovação no Unilavras por meio de transformação empreendedora. Iniciativa: VUEI.',
      'Consolidates the innovation ecosystem at Unilavras through entrepreneurial transformation. Initiative: VUEI.'
    ),
    initiatives: ['VUEI'],
  },
  {
    id: 'fapemig-APQ-03990-26',
    agency: 'FAPEMIG',
    processNumber: 'APQ-03990-26',
    title: bilingual(
      'Programa Vertentes ScaleUp.',
      'Vertentes ScaleUp Program'
    ),
    role: 'collaborator',
    period: '2026–2028',
    status: 'paused',
    institution: bilingual('Universidade Federal', 'Federal University'),
    areas: ['mobile-iot'],
    members: [
      { name: 'Elena Ramos', roleKey: 'projects.role.collaborator', memberRef: 'elena-ramos' },
    ],
    publications: [],
    artifacts: [],
    description: bilingual(
      'Programa de fomento Vertentes ScaleUp. Iniciativa: Novo SEED.',
      'Vertentes ScaleUp fostering program. Initiative: Novo SEED.'
    ),
    initiatives: ['Novo SEED'],
  },
];

export const projectAgencies: ProjectAgency[] = ['CNPq', 'FAPEMIG'];
export const projectStatuses: ProjectStatus[] = ['active', 'completed', 'paused'];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

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
}

export const projects: Project[] = [
  {
    id: 'cnpq-446729-2024',
    agency: 'CNPq',
    processNumber: '446729/2024-8',
    title: bilingual(
      'Avaliação da Qualidade de Código Gerado por IA em Engenharia de Software',
      'Evaluating the Quality of AI-Generated Code in Software Engineering'
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
      'Projeto que investiga métricas e práticas para avaliar a qualidade de código produzido por modelos de IA generativa.',
      'Project investigating metrics and practices to evaluate the quality of code produced by generative AI models.'
    ),
  },
  {
    id: 'cnpq-406089-2025',
    agency: 'CNPq',
    processNumber: '406089/2025-6',
    title: bilingual(
      'Agentes de IA para Revisão de Código Colaborativa',
      'AI Agents for Collaborative Code Review'
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
      'Desenvolvimento de agentes de IA que auxiliam revisores humanos em revisões de código distribuídas.',
      'Development of AI agents that assist human reviewers in distributed code reviews.'
    ),
  },
  {
    id: 'fapemig-APQ-01488-24',
    agency: 'FAPEMIG',
    processNumber: 'APQ-01488-24',
    title: bilingual(
      'Débito Técnico e Refatoração em Sistemas Legados',
      'Technical Debt and Refactoring in Legacy Systems'
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
      'Mapeamento e gestão de débito técnico com apoio a decisões de refatoração segura.',
      'Mapping and management of technical debt with support for safe refactoring decisions.'
    ),
  },
  {
    id: 'fapemig-APQ-04113-25',
    agency: 'FAPEMIG',
    processNumber: 'APQ-04113-25',
    title: bilingual(
      'Testes Automatizados para Confiabilidade de Sistemas',
      'Automated Testing for Systems Reliability'
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
      'Técnicas de geração automática de casos de teste voltadas à confiabilidade.',
      'Automatic test case generation techniques aimed at reliability.'
    ),
  },
  {
    id: 'fapemig-APQ-03990-26',
    agency: 'FAPEMIG',
    processNumber: 'APQ-03990-26',
    title: bilingual(
      'Sistemas Configuráveis e Aplicações Mobile/IoT',
      'Configurable Systems and Mobile/IoT Applications'
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
      'Linhas de produto de software e infraestrutura IoT para aplicações móveis.',
      'Software product lines and IoT infrastructure for mobile applications.'
    ),
  },
];

export const projectAgencies: ProjectAgency[] = ['CNPq', 'FAPEMIG'];
export const projectStatuses: ProjectStatus[] = ['active', 'completed', 'paused'];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

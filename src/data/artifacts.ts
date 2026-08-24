import { bilingual, type Localized } from './types';
import type { AreaId } from './areas';

export type ArtifactType =
  | 'software'
  | 'tool'
  | 'dataset'
  | 'prototype'
  | 'api'
  | 'replication-package';

export interface Artifact {
  id: string;
  name: string;
  type: ArtifactType;
  description: Localized;
  url: string;
  members: string[];
  areas: AreaId[];
  projects: string[];
  publications: string[];
}

export const artifacts: Artifact[] = [
  {
    id: 'ai-code-evaluator',
    name: 'AI Code Evaluator',
    type: 'tool',
    description: bilingual(
      'Ferramenta que avalia a qualidade de código gerado por IA.',
      'Tool that evaluates the quality of AI-generated code.'
    ),
    url: 'https://github.com/cogitolab/ai-code-evaluator',
    members: ['ana-silva', 'carla-souza'],
    areas: ['ai-se'],
    projects: ['cnpq-446729-2024'],
    publications: ['paper-2024-03'],
  },
  {
    id: 'review-agent',
    name: 'Review Agent',
    type: 'software',
    description: bilingual(
      'Agente de IA para apoio a revisão de código colaborativa.',
      'AI agent to support collaborative code review.'
    ),
    url: 'https://github.com/cogitolab/review-agent',
    members: ['ana-silva'],
    areas: ['ai-se', 'collaborative'],
    projects: ['cnpq-406089-2025'],
    publications: ['paper-2024-01'],
  },
  {
    id: 'debt-dashboard',
    name: 'Debt Dashboard',
    type: 'software',
    description: bilingual(
      'Painel para visualização e gestão de débito técnico.',
      'Dashboard for technical debt visualization and management.'
    ),
    url: 'https://github.com/cogitolab/debt-dashboard',
    members: ['diego-lima'],
    areas: ['quality'],
    projects: ['fapemig-APQ-01488-24'],
    publications: ['paper-2024-02'],
  },
  {
    id: 'test-gen-tool',
    name: 'TestGen',
    type: 'tool',
    description: bilingual(
      'Gerador automático de casos de teste para confiabilidade.',
      'Automatic test case generator for reliability.'
    ),
    url: 'https://github.com/cogitolab/test-gen',
    members: ['bruno-costa'],
    areas: ['testing'],
    projects: ['fapemig-APQ-04113-25'],
    publications: ['paper-2024-03'],
  },
];

export const artifactTypes: ArtifactType[] = [
  'software',
  'tool',
  'dataset',
  'prototype',
  'api',
  'replication-package',
];

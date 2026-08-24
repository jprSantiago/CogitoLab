import { bilingual, type Localized } from './types';
import type { AreaId } from './areas';

export type PublicationType = 'conference' | 'journal' | 'workshop' | 'thesis' | 'preprint';

export interface PublicationArtifact {
  type: 'code' | 'dataset' | 'slides';
  url: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  doi?: string;
  url?: string;
  areas: AreaId[];
  projects: string[];
  artifacts: PublicationArtifact[];
  abstract: Localized;
}

export const publications: Publication[] = [
  {
    id: 'paper-2024-01',
    title: 'AI-Assisted Code Review: A Survey',
    authors: ['Ana Silva', 'Carla Souza', 'Bruno Costa'],
    venue: 'ICSE 2024',
    year: 2024,
    type: 'conference',
    doi: '10.1145/0000000.0000001',
    url: 'https://doi.org/10.1145/0000000.0000001',
    areas: ['ai-se', 'collaborative'],
    projects: ['cnpq-446729-2024', 'cnpq-406089-2025'],
    artifacts: [{ type: 'code', url: 'https://github.com/cogitolab/ai-review' }],
    abstract: bilingual(
      'Uma revisão sistemática das abordagens de IA para revisão de código.',
      'A systematic review of AI approaches for code review.'
    ),
  },
  {
    id: 'paper-2024-02',
    title: 'Measuring Technical Debt in Refactoring Decisions',
    authors: ['Diego Lima', 'Ana Silva'],
    venue: 'Journal of Software: Evolution and Process',
    year: 2024,
    type: 'journal',
    doi: '10.1002/smr.0002',
    url: 'https://doi.org/10.1002/smr.0002',
    areas: ['quality'],
    projects: ['cnpq-446729-2024'],
    artifacts: [],
    abstract: bilingual(
      'Proposta de métrica para apoiar decisões de refatoração com base em débito técnico.',
      'A metric proposal to support refactoring decisions based on technical debt.'
    ),
  },
  {
    id: 'paper-2024-03',
    title: 'Reliability of AI-Generated Test Cases',
    authors: ['Bruno Costa', 'Carla Souza'],
    venue: 'ASE 2024',
    year: 2024,
    type: 'conference',
    doi: '10.1145/0000000.0000003',
    url: 'https://doi.org/10.1145/0000000.0000003',
    areas: ['testing', 'ai-se'],
    projects: ['fapemig-APQ-04113-25', 'cnpq-446729-2024'],
    artifacts: [{ type: 'dataset', url: 'https://github.com/cogitolab/test-dataset' }],
    abstract: bilingual(
      'Avaliação da confiabilidade de casos de teste gerados por IA.',
      'Assessment of the reliability of AI-generated test cases.'
    ),
  },
];

export const publicationTypes: PublicationType[] = [
  'conference',
  'journal',
  'workshop',
  'thesis',
  'preprint',
];

export function getPublication(id: string): Publication | undefined {
  return publications.find((p) => p.id === id);
}

export const publicationYears = [...new Set(publications.map((p) => p.year))].sort(
  (a, b) => b - a
);

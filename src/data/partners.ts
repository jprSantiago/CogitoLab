import { bilingual, type Localized } from './types';

export type PartnerType =
  | 'university'
  | 'funding-agency'
  | 'innovation-environment'
  | 'collaborator'
  | 'industry';

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  logo?: string;
  url: string;
  description?: Localized;
}

export const partners: Partner[] = [
  {
    id: 'ufla', name: 'Universidade Federal de Lavras', type: 'university', url: 'https://www.ufla.br',
    description: bilingual('Instituição de origem do lab.', 'Lab’s home institution.'),
  },
  {
    id: 'dcc-ufla', name: 'DCC — Departamento de Ciência da Computação da UFLA', type: 'university', url: 'https://www.dcc.ufla.br',
    description: bilingual('Unidade acadêmica de origem do lab.', 'Lab’s home academic unit.'),
  },
  {
    id: 'unilavras', name: 'Universidade de Lavras (Unilavras)', type: 'university', url: 'https://www.unilavras.edu.br',
    description: bilingual('Instituição parceira no ecossistema de inovação (iniciativa VUEI).', 'Partner institution in the innovation ecosystem (VUEI initiative).'),
  },
  {
    id: 'uf', name: 'Universidade Federal', type: 'university', url: 'https://example.org/uf',
    description: bilingual('Instituição de origem do lab.', 'Lab’s home institution.'),
  },
  {
    id: 'cnpq', name: 'CNPq', type: 'funding-agency', url: 'https://www.cnpq.br',
    description: bilingual('Agência de fomento federal.', 'Federal funding agency.'),
  },
  {
    id: 'fapemig', name: 'FAPEMIG', type: 'funding-agency', url: 'https://www.fapemig.br',
    description: bilingual('Agência de fomento estadual.', 'State funding agency.'),
  },
  {
    id: 'incubator', name: 'Incubadora de Inovação', type: 'innovation-environment',
    url: 'https://example.org/incubator',
    description: bilingual('Ambiente de inovação parceiro.', 'Partner innovation environment.'),
  },
  {
    id: 'techco', name: 'TechCo', type: 'industry', url: 'https://example.org/techco',
    description: bilingual('Parceria com a indústria.', 'Industry partnership.'),
  },
  {
    id: 'collab-lab', name: 'Lab Colaborador', type: 'collaborator', url: 'https://example.org/collab',
    description: bilingual('Grupo de pesquisa colaborador.', 'Collaborating research group.'),
  },
];

export const partnerTypes: PartnerType[] = [
  'university',
  'funding-agency',
  'innovation-environment',
  'collaborator',
  'industry',
];

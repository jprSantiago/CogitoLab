import { describe, expect, it } from 'vitest';
import { bilingual, pick, type Localized } from '../../src/data/types';
import { areas, getArea } from '../../src/data/areas';
import { members, getMembersByCategory } from '../../src/data/members';
import { projects, getProject } from '../../src/data/projects';
import { publications } from '../../src/data/publications';
import { news } from '../../src/data/news';
import { artifacts } from '../../src/data/artifacts';
import { partners } from '../../src/data/partners';

const areaIds = new Set(areas.map((a) => a.id));
const projectIds = new Set(projects.map((p) => p.id));
const publicationIds = new Set(publications.map((p) => p.id));
const memberIds = new Set(members.map((m) => m.id));
const artifactIds = new Set(artifacts.map((a) => a.id));

describe('Localized helpers', () => {
  it('bilingual builds a record with both locales', () => {
    const value = bilingual('Olá', 'Hello');
    expect(value['pt-br']).toBe('Olá');
    expect(value.en).toBe('Hello');
  });

  it('pick returns the value for the requested locale', () => {
    const value = bilingual('Olá', 'Hello');
    expect(pick('pt-br', value)).toBe('Olá');
    expect(pick('en', value)).toBe('Hello');
  });

  it('pick falls back to pt-br when the locale is missing', () => {
    const value = { 'pt-br': 'Só PT' } as unknown as Localized;
    expect(pick('en', value)).toBe('Só PT');
  });
});

describe('Data lookup helpers', () => {
  it('getArea finds an area by id', () => {
    expect(getArea('ai-se')?.title['pt-br']).toContain('Inteligência');
  });

  it('getProject finds a project by id', () => {
    expect(getProject('cnpq-446729-2024')?.agency).toBe('CNPq');
  });

  it('getMembersByCategory filters correctly', () => {
    expect(getMembersByCategory('faculty').every((m) => m.category === 'faculty')).toBe(true);
    expect(getMembersByCategory('faculty').length).toBeGreaterThan(0);
  });
});

describe('Data integrity — referential consistency', () => {
  it('every project references existing research areas', () => {
    for (const p of projects) {
      for (const a of p.areas) {
        expect(areaIds.has(a)).toBe(true);
      }
    }
  });

  it('every member references existing research areas', () => {
    for (const m of members) {
      for (const a of m.areas) {
        expect(areaIds.has(a)).toBe(true);
      }
    }
  });

  it('every area references existing projects and publications', () => {
    for (const a of areas) {
      for (const p of a.projects) expect(projectIds.has(p)).toBe(true);
      for (const pub of a.publications) expect(publicationIds.has(pub)).toBe(true);
    }
  });

  it('every project references existing publications and artifacts', () => {
    for (const p of projects) {
      for (const pub of p.publications) expect(publicationIds.has(pub)).toBe(true);
      for (const art of p.artifacts) expect(artifactIds.has(art)).toBe(true);
      for (const member of p.members) {
        if (member.memberRef) expect(memberIds.has(member.memberRef)).toBe(true);
      }
    }
  });

  it('every publication references existing areas and projects', () => {
    for (const pub of publications) {
      for (const a of pub.areas) expect(areaIds.has(a)).toBe(true);
      for (const p of pub.projects) expect(projectIds.has(p)).toBe(true);
    }
  });

  it('every news item references existing members and projects', () => {
    for (const n of news) {
      for (const m of n.members) expect(memberIds.has(m)).toBe(true);
      for (const p of n.projects) expect(projectIds.has(p)).toBe(true);
    }
  });

  it('every artifact references existing areas, projects and publications', () => {
    for (const art of artifacts) {
      for (const a of art.areas) expect(areaIds.has(a)).toBe(true);
      for (const p of art.projects) expect(projectIds.has(p)).toBe(true);
      for (const pub of art.publications) expect(publicationIds.has(pub)).toBe(true);
    }
  });

  it('every partner has a non-empty url', () => {
    for (const p of partners) {
      expect(p.url.startsWith('http')).toBe(true);
    }
  });
});

describe('Publications as sample data (Instructions §3.5)', () => {
  it('every publication is explicitly flagged as sample data', () => {
    expect(publications.length).toBeGreaterThan(0);
    for (const pub of publications) {
      expect(pub.isSample).toBe(true);
    }
  });
});

describe('Projects conform to Instructions.md §3.4 (mandated initial set)', () => {
  const mandated = [
    {
      id: 'cnpq-446729-2024',
      processNumber: '446729/2024-8',
      agency: 'CNPq',
      role: 'coordinator' as const,
      pt: 'Avaliação da Qualidade de Código Gerado por Inteligência Artificial na Resolução de Dívidas Técnicas e Conflitos de Integração em Projetos Reais.',
      en: 'Evaluating the Quality of Artificial-Intelligence-Generated Code in Fixing Technical Debt and Merge Conflicts in Real-World Projects',
      initiatives: [] as string[],
    },
    {
      id: 'cnpq-406089-2025',
      processNumber: '406089/2025-6',
      agency: 'CNPq',
      role: 'subcoordinator' as const,
      pt: 'LLM4IoT: Detecção e Correção de Falhas de Interação de Dispositivos com Grandes Modelos de Linguagem em Sistemas de Software IoT.',
      en: 'LLM4IoT: Detection and Correction of Device Interaction Failures using Large Language Models in IoT Software Systems',
      initiatives: [] as string[],
    },
    {
      id: 'fapemig-APQ-01488-24',
      processNumber: 'APQ-01488-24',
      agency: 'FAPEMIG',
      role: 'subcoordinator' as const,
      pt: 'Avaliação da Qualidade de Código de Teste Gerado por Inteligência Artificial em Aplicações para Dispositivos Móveis.',
      en: 'Evaluation of the Quality of AI-Generated Test Code in Applications for Mobile Devices',
      initiatives: [] as string[],
    },
    {
      id: 'fapemig-APQ-04113-25',
      processNumber: 'APQ-04113-25',
      agency: 'FAPEMIG',
      role: 'subcoordinator' as const,
      pt: 'Transformação Empreendedora: Consolidando o Ecossistema de Inovação no Unilavras.',
      en: 'Entrepreneurial Transformation: Consolidating the Innovation Ecosystem at Unilavras',
      initiatives: ['VUEI'],
    },
    {
      id: 'fapemig-APQ-03990-26',
      processNumber: 'APQ-03990-26',
      agency: 'FAPEMIG',
      role: 'collaborator' as const,
      pt: 'Programa Vertentes ScaleUp.',
      en: 'Vertentes ScaleUp Program',
      initiatives: ['Novo SEED'],
    },
  ];

  it('exactly the 5 mandated initial projects are present', () => {
    expect(projects).toHaveLength(5);
  });

  for (const exp of mandated) {
    it(`project ${exp.id} matches the mandated title and metadata`, () => {
      const p = getProject(exp.id);
      expect(p).toBeDefined();
      expect(p!.processNumber).toBe(exp.processNumber);
      expect(p!.agency).toBe(exp.agency);
      expect(p!.role).toBe(exp.role);
      expect(pick('pt-br', p!.title)).toBe(exp.pt);
      expect(pick('en', p!.title)).toBe(exp.en);
      expect(p!.initiatives ?? []).toEqual(exp.initiatives);
    });
  }
});

describe('Bilingual data coverage (EN parity)', () => {
  it('every area has both locales defined and non-empty', () => {
    for (const a of areas) {
      expect(pick('pt-br', a.title).length).toBeGreaterThan(0);
      expect(pick('en', a.title).length).toBeGreaterThan(0);
      expect(pick('pt-br', a.description)).not.toBe(pick('en', a.description));
    }
  });

  it('every member bio is translated to both locales', () => {
    for (const m of members) {
      expect(pick('pt-br', m.bio).length).toBeGreaterThan(0);
      expect(pick('en', m.bio).length).toBeGreaterThan(0);
    }
  });

  it('every project title is translated to both locales', () => {
    for (const p of projects) {
      expect(pick('pt-br', p.title).length).toBeGreaterThan(0);
      expect(pick('en', p.title).length).toBeGreaterThan(0);
    }
  });

  it('every publication abstract is translated to both locales', () => {
    for (const pub of publications) {
      expect(pick('pt-br', pub.abstract).length).toBeGreaterThan(0);
      expect(pick('en', pub.abstract).length).toBeGreaterThan(0);
    }
  });
});

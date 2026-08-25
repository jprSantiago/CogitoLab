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

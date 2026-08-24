/**
 * Dicionários de UI (textos da interface) por locale.
 * Chaves planas e aninhadas são suportadas via notação de ponto no helper `t`.
 *
 * Convenção: manter a mesma lista de chaves em todos os locales.
 */
import type { Locale } from './config';

type Dict = Record<string, string>;

const ptBR: Dict = {
  'site.title': 'Cogito Lab',
  'site.tagline': 'Pensar, logo pesquisar.',
  'nav.home': 'Início',
  'nav.areas': 'Áreas',
  'nav.members': 'Membros',
  'nav.projects': 'Projetos',
  'nav.publications': 'Publicações',
  'nav.artifacts': 'Artefatos',
  'nav.news': 'Notícias',
  'nav.join': 'Junte-se',
  'nav.partners': 'Parceiros',
  'nav.contact': 'Contato',
  'nav.skip': 'Pular para o conteúdo',
  'nav.ariaLabel': 'Navegação principal',
  'lang.label': 'Idioma',
  'lang.pt-br': 'PT-BR',
  'lang.en': 'EN',
  'footer.rights': 'Todos os direitos reservados.',
  'footer.description': 'Grupo de pesquisa em Engenharia de Software, IA, Qualidade, Testes, Mobile/IoT e Inovação.',
  'home.hero.eyebrow': 'Grupo de Pesquisa',
  'home.hero.title': 'Cogito Lab',
  'home.hero.quote': '“Cogito, ergo sum” — René Descartes',
  'home.hero.quoteContext': 'Penso, logo existo. O nome do lab reflete o compromisso com o pensamento crítico e a investigação.',
  'home.hero.description': 'Pesquisamos Engenharia de Software, Inteligência Artificial, Qualidade, Testes, Sistemas Móveis/IoT e Inovação.',
  'home.hero.mission': 'Missão',
  'home.hero.missionText': 'Avançar o conhecimento e formar pesquisadores através de investigação rigorosa e colaborativa.',
  'home.hero.institutions': 'Instituições',
  'home.hero.institutionsText': 'Vinculado a instituições de ensino e pesquisa (a definir).',
  'home.sections.title': 'Explore',
  'home.sections.subtitle': 'Conheça as frentes de atuação do Cogito Lab.',
  'home.cta.title': 'Quer saber mais?',
  'home.cta.text': 'Veja como contribuir, nossos parceiros ou entre em contato.',
};

const en: Dict = {
  'site.title': 'Cogito Lab',
  'site.tagline': 'To think, therefore to research.',
  'nav.home': 'Home',
  'nav.areas': 'Areas',
  'nav.members': 'Members',
  'nav.projects': 'Projects',
  'nav.publications': 'Publications',
  'nav.artifacts': 'Artifacts',
  'nav.news': 'News',
  'nav.join': 'Join',
  'nav.partners': 'Partners',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to content',
  'nav.ariaLabel': 'Main navigation',
  'lang.label': 'Language',
  'lang.pt-br': 'PT-BR',
  'lang.en': 'EN',
  'footer.rights': 'All rights reserved.',
  'footer.description': 'Research group on Software Engineering, AI, Quality, Testing, Mobile/IoT and Innovation.',
  'home.hero.eyebrow': 'Research Group',
  'home.hero.title': 'Cogito Lab',
  'home.hero.quote': '“Cogito, ergo sum” — René Descartes',
  'home.hero.quoteContext': 'I think, therefore I am. The lab’s name reflects its commitment to critical thinking and inquiry.',
  'home.hero.description': 'We research Software Engineering, Artificial Intelligence, Quality, Testing, Mobile/IoT and Innovation.',
  'home.hero.mission': 'Mission',
  'home.hero.missionText': 'Advance knowledge and train researchers through rigorous and collaborative inquiry.',
  'home.hero.institutions': 'Institutions',
  'home.hero.institutionsText': 'Affiliated with teaching and research institutions (TBD).',
  'home.sections.title': 'Explore',
  'home.sections.subtitle': 'Discover the Cogito Lab’s areas of work.',
  'home.cta.title': 'Want to know more?',
  'home.cta.text': 'See how to contribute, our partners, or get in touch.',
};

export const ui: Record<Locale, Dict> = {
  'pt-br': ptBR,
  'en': en,
};

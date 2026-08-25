import { bilingual, type Localized } from './types';

export interface Testimonial {
  name: string;
  role: Localized;
  quote: Localized;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ana Souza',
    role: bilingual('MSc Alumni', 'MSc Alumni'),
    quote: bilingual(
      'O Cogito me deu base para pesquisa em qualidade de software e hoje lidero QA em uma startup.',
      'Cogito gave me a foundation in software quality research; today I lead QA at a startup.'
    ),
  },
  {
    name: 'Bruno Lima',
    role: bilingual('PhD Alumni', 'PhD Alumni'),
    quote: bilingual(
      'As discussões sobre testes automatizados mudaram minha forma de enxergar engenharia de software.',
      'The discussions on automated testing changed how I see software engineering.'
    ),
  },
];

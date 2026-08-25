import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

/**
 * Render an Astro component to an HTML string using the experimental
 * Astro Container API. Components that expose `currentLocale`/`locale` as a
 * prop can be rendered in either language; components that read
 * `Astro.currentLocale` internally are rendered in the default locale
 * (pt-br) — their bilingual output is covered by the i18n/data unit tests,
 * which are the single source of truth for translation resolution.
 */
export async function renderComponent(
  component: AstroComponentFactory,
  options: { props?: Record<string, unknown>; url?: string } = {}
): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(component, {
    props: options.props ?? {},
    request: new Request(options.url ?? 'https://example.com/pt-br/'),
  });
}

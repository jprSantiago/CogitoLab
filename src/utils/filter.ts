/**
 * Lógica pura de filtragem de listas (progressive enhancement).
 *
 * Extraída de `src/scripts/list-filter.ts` para permitir testes unitários
 * sem dependência do DOM. O script client-side apenas adapta os atributos
 * `data-filter-*` do elemento para este formato e delega a decisão aqui.
 */

export type FilterState = Record<string, string>;

/**
 * Decide se um item deve ser exibido dado o estado dos filtros e a busca.
 *
 * - Filtros combinam com E (AND): o item precisa conter cada valor selecionado
 *   no atributo `data-filter-${key}` correspondente.
 * - Estado vazio (`''`) para uma chave é ignorado (sem restrição).
 * - A busca (`query`) é comparada de forma insensível a maiúsculas/minúsculas
 *   contra `searchText`.
 */
export function itemMatches(
  attrs: Record<string, string | undefined>,
  searchText: string,
  state: FilterState,
  query: string
): boolean {
  for (const [key, value] of Object.entries(state)) {
    if (!value) continue;
    const attr = (attrs[`data-filter-${key}`] ?? '')
      .split(/\s+/)
      .filter(Boolean);
    if (!attr.includes(value)) return false;
  }

  if (query) {
    if (!searchText.toLowerCase().includes(query)) return false;
  }

  return true;
}

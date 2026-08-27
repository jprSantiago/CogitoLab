/**
 * Filtro de listas no lado do cliente (progressive enhancement).
 * Sem JS, todos os itens permanecem visíveis; com JS, os botões de filtro
 * mostram/ocultam itens por grupo (category, area, status, type, etc.) e um
 * campo de busca filtra por texto. Múltiplos grupos combinam com E (AND).
 *
 * A decisão de exibição é delegada à função pura `itemMatches`
 * (ver `src/utils/filter.ts`), que é coberta por testes unitários.
 *
 * Nota de implementação (correção de bug): os botões de filtro carregam
 * `data-filter-group` e `data-filter-value` NO PRÓPRIO elemento (ver seções
 * Members/Projects/Publications/...). Por isso agrupamos os botões pela
 * chave `data-filter-group` lida em cada botão (ou em seu ancestral), em vez
 * de assumir que `data-filter-group` fica num container e os valores são
 * filhos — caso contrário `group.querySelectorAll('[data-filter-value]')`
 * retornava vazio e nenhum listener de clique era anexado, deixando o filtro
 * inerte.
 */

import { itemMatches, type FilterState } from '../utils/filter';

function groupKeyOf(btn: HTMLElement): string {
  return (
    btn.getAttribute('data-filter-group') ||
    btn.closest('[data-filter-group]')?.getAttribute('data-filter-group') ||
    ''
  );
}

function apply(root: HTMLElement, state: FilterState, query: string) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-filter-item]'));
  let visible = 0;
  for (const item of items) {
    const attrs: Record<string, string | undefined> = {};
    for (const key of Object.keys(state)) {
      attrs[`data-filter-${key}`] = item.getAttribute(`data-filter-${key}`) ?? undefined;
    }
    const searchText = item.getAttribute('data-search-text') ?? '';
    const show = itemMatches(attrs, searchText, state, query);
    item.hidden = !show;
    if (show) visible++;
  }
  const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
  if (empty) empty.hidden = visible > 0;
}

function init(root: HTMLElement) {
  const state: FilterState = {};
  const valueButtons = Array.from(root.querySelectorAll<HTMLElement>('[data-filter-value]'));
  const buttonsByGroup: Record<string, HTMLElement[]> = {};
  for (const btn of valueButtons) {
    const key = groupKeyOf(btn);
    (buttonsByGroup[key] ||= []).push(btn);
  }

  const searchInput = () => root.querySelector<HTMLInputElement>('[data-search-input]');

  for (const btn of valueButtons) {
    const key = groupKeyOf(btn);
    const value = btn.getAttribute('data-filter-value') || '';
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      if (state[key] === value) {
        state[key] = '';
        btn.setAttribute('aria-pressed', 'false');
      } else {
        state[key] = value;
        for (const b of buttonsByGroup[key]) {
          b.setAttribute('aria-pressed', String(b === btn));
        }
      }
      apply(root, state, searchInput()?.value.toLowerCase() || '');
    });
  }

  const search = searchInput();
  search?.addEventListener('input', () => {
    apply(root, state, search.value.toLowerCase());
  });
  apply(root, state, search?.value.toLowerCase() || '');
}

document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach(init);

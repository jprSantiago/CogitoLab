/**
 * Filtro de listas no lado do cliente (progressive enhancement).
 * Sem JS, todos os itens permanecem visíveis; com JS, os botões de filtro
 * mostram/ocultam itens por grupo (category, area, status, type, etc.) e um
 * campo de busca filtra por texto. Múltiplos grupos combinam com E (AND).
 */

type FilterState = Record<string, string>;

function matches(item: HTMLElement, state: FilterState, query: string): boolean {
  for (const [key, value] of Object.entries(state)) {
    if (!value) continue;
    const attr = (item.getAttribute(`data-filter-${key}`) || '').split(/\s+/).filter(Boolean);
    if (!attr.includes(value)) return false;
  }
  if (query) {
    const text = (item.getAttribute('data-search-text') || '').toLowerCase();
    if (!text.includes(query)) return false;
  }
  return true;
}

function apply(root: HTMLElement, state: FilterState, query: string) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-filter-item]'));
  let visible = 0;
  for (const item of items) {
    const show = matches(item, state, query);
    item.hidden = !show;
    if (show) visible++;
  }
  const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
  if (empty) empty.hidden = visible > 0;
}

function init(root: HTMLElement) {
  const state: FilterState = {};
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-filter-group]'));

  for (const group of groups) {
    const key = group.getAttribute('data-filter-group') || '';
    const buttons = Array.from(group.querySelectorAll<HTMLElement>('[data-filter-value]'));
    for (const btn of buttons) {
      const value = btn.getAttribute('data-filter-value') || '';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        if (state[key] === value) {
          state[key] = '';
          btn.setAttribute('aria-pressed', 'false');
        } else {
          state[key] = value;
          for (const b of buttons) {
            b.setAttribute('aria-pressed', String(b === btn));
          }
        }
        apply(root, state, searchInput()?.value.toLowerCase() || '');
      });
    }
  }

  const search = root.querySelector<HTMLInputElement>('[data-search-input]');
  const searchInput = () => root.querySelector<HTMLInputElement>('[data-search-input]');
  search?.addEventListener('input', () => {
    apply(root, state, search.value.toLowerCase());
  });

  apply(root, state, search?.value.toLowerCase() || '');
}

document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach(init);

import { describe, expect, it } from 'vitest';
import { itemMatches, type FilterState } from '../../src/utils/filter';

const attrs = (over: Record<string, string>) => over;

describe('itemMatches', () => {
  it('shows the item when no filter is active', () => {
    const state: FilterState = { category: '', area: '' };
    expect(itemMatches(attrs({ 'data-filter-category': 'faculty' }), 'bio', state, '')).toBe(true);
  });

  it('matches when the selected filter value is among the item attributes', () => {
    const state: FilterState = { category: 'faculty' };
    expect(
      itemMatches(attrs({ 'data-filter-category': 'faculty phd' }), 'bio', state, '')
    ).toBe(true);
  });

  it('hides the item when the selected filter value is not present', () => {
    const state: FilterState = { category: 'faculty' };
    expect(itemMatches(attrs({ 'data-filter-category': 'phd' }), 'bio', state, '')).toBe(false);
  });

  it('combines multiple filter groups with AND', () => {
    const state: FilterState = { category: 'faculty', area: 'ai-se' };
    expect(
      itemMatches(
        attrs({ 'data-filter-category': 'faculty', 'data-filter-area': 'ai-se quality' }),
        'bio',
        state,
        ''
      )
    ).toBe(true);
    expect(
      itemMatches(
        attrs({ 'data-filter-category': 'faculty', 'data-filter-area': 'testing' }),
        'bio',
        state,
        ''
      )
    ).toBe(false);
  });

  it('matches case-insensitively on the search text', () => {
    const state: FilterState = {};
    expect(
      itemMatches(attrs({}), 'Ana Silva — AI for SE', state, 'ana silva')
    ).toBe(true);
    expect(itemMatches(attrs({}), 'Ana Silva', state, 'zzz')).toBe(false);
  });

  it('combines filter and search together', () => {
    const state: FilterState = { category: 'faculty' };
    expect(
      itemMatches(
        attrs({ 'data-filter-category': 'faculty' }),
        'Carla Souza code generation',
        state,
        'carla'
      )
    ).toBe(true);
    expect(
      itemMatches(
        attrs({ 'data-filter-category': 'faculty' }),
        'Carla Souza code generation',
        state,
        'nonexistent'
      )
    ).toBe(false);
  });
});

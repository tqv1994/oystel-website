import { writable } from 'svelte/store';
import type { Kind } from './category';
import type { CollectionStore } from './types';

export const languageStore = writable<CollectionStore<Kind>>({
  items: {},
});

export const languageFieldsFragment = `
fragment languageFields on Language {
  id
  name
}
`;

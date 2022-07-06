import { writable } from 'svelte/store';
import type { Kind } from './category';
import type { CollectionStore } from './types';

export const advisorTypeStore = writable<CollectionStore<Kind>>({
  items: {},
});

export const advisorTypeFieldsFragment = `
fragment advisorTypeFields on AdvisorType {
  id
  name
}
`;

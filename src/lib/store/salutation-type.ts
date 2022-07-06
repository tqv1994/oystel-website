import { writable } from 'svelte/store';
import type { Kind } from './category';
import type { CollectionStore } from './types';

export const salutationTypeStore = writable<CollectionStore<Kind>>({
  items: {},
});

export const salutationTypeFieldsFragment = `
fragment salutationTypeFields on SalutationType {
  id
  name
}
`;

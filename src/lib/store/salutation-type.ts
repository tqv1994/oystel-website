import { writable } from 'svelte/store';
import { Category } from './category';
import {  CollectionStore } from './types';

export const salutationTypeStore = writable<CollectionStore<Category>>({
  items: {},
});

export const salutationTypeFieldsFragment = `
fragment salutationTypeFields on SalutationType {
  id
  name
}
`;

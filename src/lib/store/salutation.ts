import { writable } from 'svelte/store';
import { Category } from './category';
import {  CollectionStore } from './types';

export const salutationStore = writable<CollectionStore<Category>>({
  items: {},
});

export const salutationFieldsFragment = `
fragment salutationFields on Salutation {
  id
  name
}
`;

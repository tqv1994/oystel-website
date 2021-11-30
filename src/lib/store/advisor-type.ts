import { writable } from 'svelte/store';
import { Category } from './category';
import {  CollectionStore } from './types';

export const advisorTypeStore = writable<CollectionStore<Category>>({
  items: {},
});

export const advisorTypeFieldsFragment = `
fragment advisorTypeFields on AdvisorType {
  id
  name
}
`;

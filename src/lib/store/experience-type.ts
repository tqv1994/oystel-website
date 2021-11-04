import { writable } from 'svelte/store';
import { Category } from './category';
import { CollectionStore } from './types';

export const experienceTypeStore = writable<CollectionStore<Category>>({
  items: {},
});

export const experienceTypeFieldsFragment = `
fragment experienceTypeFields on ExperienceType {
  id
  name
}
`;

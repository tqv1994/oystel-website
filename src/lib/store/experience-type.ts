import { writable } from 'svelte/store';
import type { Kind } from './category';

export const experienceTypeStore = writable<Kind[]>([]);

export const experienceTypeFieldsFragment = `
fragment experienceTypeFields on ExperienceType {
  id
  name
}
`;

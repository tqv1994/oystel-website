import { writable } from 'svelte/store';
import { Base, CollectionStore, Nameable } from './types';

export const specialityStore = writable<CollectionStore<Speciality>>({
  items: {},
});

export type Speciality = Base & Nameable;

export const specialityFieldsFragment = `
fragment specialityFields on Speciality {
  id
  name
}
`;

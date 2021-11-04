import { writable } from 'svelte/store';
import { Category } from './category';
import { CollectionStore, Identifiable, Nameable } from './types';

export const destinationTypeStore = writable<CollectionStore<Category>>({
  items: {},
});

export const destinationTypeFieldsFragment = `
fragment destinationTypeFields on DestinationType {
  id
  name
}
`;

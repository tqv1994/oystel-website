import { writable } from 'svelte/store';
import { Base, CollectionStore, Nameable } from './types';

export type Country = Base &
  Nameable & {
    code?: string;
    phone?: number;
  };

export const countryStore = writable<CollectionStore<Country>>({
  items: {},
});

export const countryFieldsFragment = `
fragment countryFields on Country {
  id
  name
  code
  phone
}
`;

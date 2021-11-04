import { writable } from 'svelte/store';
import { Product } from './product';
import { CollectionStore, Exhibitable } from './types';

export const dropStore = writable<CollectionStore<Drop>>({
  items: {},
});

export type Drop = Exhibitable & {
  products: Product[];
};

export const dropFieldsFragment = `
fragment dropFields on Drop {
  id
  name
  description
  products {
    ...productFields
  }
  gallery {
    ...uploadFileFields
  }
}
`;

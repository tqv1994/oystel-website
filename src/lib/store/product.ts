import { writable } from 'svelte/store';
import { CollectionStore, Exhibitable } from './types';

export const productStore = writable<CollectionStore<Product>>({
  items: {},
});

export type Product = Exhibitable & {
  brand: string;
  price: string;
  intro: string;
}

export const productFieldsFragment = `
fragment productFields on Product {
  id,
  name,
  intro
  description,
  brand,
  price
  gallery {
    ...uploadFileFields
  }
  tags
}
`;

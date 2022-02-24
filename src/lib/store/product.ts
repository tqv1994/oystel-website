import { writable } from 'svelte/store';
import { Category } from './category';
import { GalleryComponentBase } from './component';
import { CollectionStore, Exhibitable, Identifiable } from './types';

export const productStore = writable<CollectionStore<Product>>({
  items: {},
});

export type Product = Identifiable & Exhibitable & {
  brand: string;
  price: string;
  intro: string;
  available: boolean;
}

export type ProductGallery = GalleryComponentBase & {
  products: Product[];
};

export const productDesignerStore = writable<CollectionStore<Category>>({
  items: {},
});

export const productTypeStore = writable<CollectionStore<Category>>({
  items: {},
});

export const productColourStore = writable<CollectionStore<Category>>({
  items: {},
});

export const productPattnerStore = writable<CollectionStore<Category>>({
  items: {},
});

export const vacationStyleStore = writable<CollectionStore<Category>>({
  items: {},
});

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
  available
}
`;

export const productColourFieldsFragment = `
fragment productColourFields on ProductColours {
  id
  name
}
`;

export const productDesignerFieldsFragment = `
fragment productDesignerFields on ProductDesigner {
  id
  name
}
`;

export const productTypeFieldsFragment = `
fragment productTypeFields on ProductType {
  id
  name
}
`;

export const vacationStyleFieldsFragment = `
fragment vacationStyleFields on VacationStyle {
  id
  name
}
`;

export const productGalleryFieldsFragment = `
fragment productGalleryFields on ComponentGalleriesProductGallery {
  id
  name
  headline
  prominent
  vertical
  products {
    ...productFields
  }
}`;
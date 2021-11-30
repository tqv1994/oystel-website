import { writable } from 'svelte/store';
import { GalleryComponentBase } from './component';
import { Product } from './product';
import { CollectionStore, Exhibitable } from './types';

export const dropStore = writable<CollectionStore<Drop>>({
  items: {},
});

export type Drop = Exhibitable & {
  products: Product[];
};

export type DropGallery = GalleryComponentBase & {
  drops: Drop[];
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

export const dropGalleryFieldsFragment = `
fragment dropGalleryFields on ComponentGalleriesDropGallery {
  id
  name
  headline
  prominent
  vertical
  drops {
    ...dropFields
  }
}
`;

import type { Exhibitable } from '$lib/store/types';
import type { Kind } from './category';
import type { Product } from './product';

export type Look = Exhibitable & {
  products: Product[];
  intro: string;
  description2: string;
  curatedBy: string;
  type1: Kind;
};

export const lookFieldsFragment = `
fragment lookFields on Look {
  id
  name
  description
  description2
  intro
  gallery {
    ...uploadFileFields
  }
  curatedBy
  type1 {
    id
    name
  }
}
`;

export const lookGalleryFieldsFragment = `
fragment lookGalleryFields on ComponentGalleriesLookGallery {
  id
  name
  headline
  looks {
    ...lookFields
  }
}
`;

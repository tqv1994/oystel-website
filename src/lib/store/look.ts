import { Exhibitable } from '$lib/store/types';
import { Product } from './product';

export type Look = Exhibitable & {
  products: Product[];
  intro: string;
  description2: string;
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
}
`;

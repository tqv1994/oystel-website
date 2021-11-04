import { Exhibitable } from '$lib/store/types';
import { Product } from './product';

export type Look = Exhibitable & {
  products: Product[];
};

export const lookFieldsFragment = `
fragment lookFields on Look {
  id
  name
  description
  gallery {
    ...uploadFileFields
  }
}
`;

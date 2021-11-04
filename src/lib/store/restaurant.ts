import { Exhibitable } from '$lib/store/types';

export type Restaurant = Exhibitable;

export const restaurantFieldsFragment = `
fragment restaurantFields on Restaurant {
  id
  name
  description
  gallery {
    ...uploadFileFields
  }
}
`;

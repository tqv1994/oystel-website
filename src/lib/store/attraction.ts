import { Exhibitable } from '$lib/store/types';

export type Attraction = Exhibitable;

export const attractionFieldsFragment = `
fragment attractionFields on Attraction {
  id
  name
  description
  gallery {
    ...uploadFileFields
  }
}
`;

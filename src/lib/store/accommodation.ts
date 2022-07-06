import type { Exhibitable } from '$lib/store/types';

export type Accommodation = Exhibitable;

export const accommodationFieldsFragment = `
fragment accommodationFields on Accommodation {
  id
  name
  description
  gallery {
    ...uploadFileFields
  }
}
`;

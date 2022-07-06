import { writable } from 'svelte/store';
import type { Kind } from './category';

export type InterestType = Kind & {
  interests: Interest[];
};
export type Interest = Kind & {
  type: Interest;
};

export const interestTypeStore = writable<Kind[]>([]);

export const interestFieldsFragment = `
fragment interestFields on Interest {
  id
  name
}
`;

export const interestTypeFieldsFragment = `
fragment interestTypeFields on InterestType {
  id
  name
  interests{
    ...interestFields
  }
}
`;

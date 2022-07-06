import { writable } from 'svelte/store';
import type { Kind } from './category';
import type { Base, CollectionStore, Nameable } from './types';

export type Preference = Base &
  Nameable & {
    type: Kind;
  };

export type TravelPreference = Base &
  Nameable & {
    other: string;
    type: Kind;
  };
export const travelPreferenceTypeStore = writable<CollectionStore<Kind>>({
  items: {},
});

export const travelPreferenceFieldsFragment = `
fragment travelPreferenceFields on TravelPreference {
    id
    name
    other
}
`;

export const travelPreferenceTypeFieldsFragment = `
fragment travelPreferenceTypeFields on TravelPreferenceType {
    id
    name
}
`;

export type PersonalPreferenceType = Base &
  Nameable & {
    preferences: PersonalPreference[];
  };
export type PersonalPreference = Base &
  Nameable & {
    type: string;
  };
export const personalPreferenceTypeStore = writable<
  CollectionStore<PersonalPreferenceType>
>({
  items: {},
});

export const personalPreferenceFieldsFragment = `
fragment personalPreferenceFields on PersonalPreference {
    id
    name
}
`;

export const personalPreferenceTypeFieldsFragment = `
fragment personalPreferenceTypeFields on PersonalPreferenceType {
    id
    name
    preferences{
        ...personalPreferenceFields
    }
}
`;

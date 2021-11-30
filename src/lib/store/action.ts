import { writable } from 'svelte/store';
import { CollectionStore, Identifiable, Nameable } from './types';

export const actionStore = writable<CollectionStore<Action>>({
  items: {},
});

export type Action = Identifiable & Nameable & {
  url?: string;
};

export const actionFieldsFragment = `
fragment actionFields on ComponentControlsAction {
  id
  name
  url
}
`;

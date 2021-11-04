import { writable } from "svelte/store";
import { Base, CollectionStore, Nameable } from "./types"

export type Language = Base & Nameable;

export const languageStore = writable<CollectionStore<Language>>({
  items: {},
});

export const languageFieldsFragment = `
fragment languageFields on Language {
  id
  name
}
`;

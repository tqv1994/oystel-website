import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import { Drop, DropData } from './type';

export const dropStore = writable<CollectionStore<Drop>>({
  items: {},
});

export const updateDropStore = (items: DropData[]): void =>
  updateStore(dropStore, items, (item) => new Drop(item));

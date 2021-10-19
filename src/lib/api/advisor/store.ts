import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import { Advisor, AdvisorData } from './type';

export const advisorStore = writable<CollectionStore<Advisor>>({
  items: {},
});

export const updateAdvisorStore = (items: AdvisorData[]): void =>
  updateStore(advisorStore, items, (item) => new Advisor(item));

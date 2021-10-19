import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import { Speciality, SpecialityData } from './type';

export const specialityStore = writable<CollectionStore<Speciality>>({
  items: {},
});

export const updateSpecialityStore = (items: SpecialityData[]): void =>
  updateStore(specialityStore, items, (item) => new Speciality(item));

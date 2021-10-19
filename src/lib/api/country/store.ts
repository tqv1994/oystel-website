import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import { Country, CountryData } from './type';

export const countryStore = writable<CollectionStore<Country>>({
  items: {},
});

export const updateCountryStore = (items: CountryData[]): void =>
  updateStore(countryStore, items, (item) => new Country(item));

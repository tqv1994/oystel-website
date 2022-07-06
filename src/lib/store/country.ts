import { get, writable } from 'svelte/store';
import type { Kind } from './category';

export type Country = Kind & {
  code?: string;
  phone?: number;
};

export const countryStore = writable<Country[]>([]);

let countryMap: Record<string, Country>;
export function getCountryById(id: string): Country | undefined {
  if (!id) {
    return;
  }
  if (!countryMap) {
    countryMap = {};
    const countries = get(countryStore);
    console.log(countries);
    for (const country of get(countryStore)) {
      countryMap[country.id] = country;
    }
  }
  console.log('counties', id, countryMap);
  return countryMap[`country-${id}`];
}

export const countryFieldsFragment = `
fragment countryFields on Country {
  id
  name
  code
  phone
}
`;

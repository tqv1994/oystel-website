import type { SvelteFetch } from '$lib/utils/fetch';
import { get, writable, type Writable } from 'svelte/store';
import type { Kind } from './category';
import { NAME_ASC } from './order';
import { trySearch } from './search';

const stores: Record<string, Writable<Array<unknown>>> = {};
const maps: Record<string, Record<string, Kind>> = {};

export async function getCollection<T extends Kind = Kind>(
  fetch: SvelteFetch,
  index: string,
): Promise<T[]> {
  let store = stores[index] as Writable<T[]>;
  if (!store) {
    store = writable<T[]>([]);
    stores[index] = store;
  }
  let items = get(store) || [];
  if (!items.length) {
    const sort: string[] = [NAME_ASC];
    if (index === 'country') {
      sort.unshift('order:desc');
    }
    const data = await trySearch<T>(fetch, index, {
      limit: 999,
      sort,
    });
    items = data.hits;
    if (index === 'experience-type' || index === 'destination-type') {
      let itemOther: T;
      items = items.reduce((acc: T[], item, index) => {
        if (item.name.toLowerCase() === 'other' && index + 1 < items.length) {
          itemOther = item;
        } else {
          acc.push(item);
        }
        if (index + 1 === items.length && itemOther) {
          acc.push(itemOther);
        }
        return acc;
      }, []);
    }
    store.set(items);
  }
  return items;
}

export async function getCollectionAsMap<T extends Kind = Kind>(
  fetch: SvelteFetch,
  index: string,
): Promise<Record<string, T>> {
  let map = maps[index] as Record<string, T>;
  if (!map) {
    const items = await getCollection<T>(fetch, index);
    map = {};
    for (const item of items) {
      map[item.id] = item;
    }
    maps[index] = map;
  }
  return map;
}

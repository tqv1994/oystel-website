import { sortByPublishedAt } from '$lib/utils/sort';

import { Writable } from 'svelte/store';
import { Category } from './category';
import { Country } from './country';
import { UploadFile } from './upload-file';

export interface FetchError {
  code?: number;
  status?: string;
  message?: string;
  fields?: Rec<string>;
}

export type AsyncStore = {
  hasData?: boolean;
  hasError?: boolean;
  updatedAt?: number;
  error?: FetchError;
};

export type CollectionStore<T> = AsyncStore & {
  hasMore?: boolean;
  last?: T;
  items: Rec<T>;
};

export type Identifiable = {
  id: string;
};

export type Nameable = {
  name: string;
};

export type Nationalizable = {
  country: Country;
};

export type Categorizable = {
  type: Category;
};

export type Recordable = {
  created_at: string;
  updated_at?: string;
};

export type Base = Identifiable & Recordable;

export type Publishable = Base & {
  published_at: string;
};

export type Exhibitable = Publishable &
  Nameable & {
    description: string;
    gallery: UploadFile[];
    liked?: boolean;
  };

export type Searchable = Exhibitable & Nationalizable & Categorizable;

export const insertToStore = <T extends Base>(
  store: Writable<CollectionStore<T>>,
  items?: T[],
  replaceExisting = true,
) => {
  if (!items || !items.length) {
    return;
  }
  store.update((s) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (replaceExisting || !s.items[item.id]) {
        s.items[item.id] = item;
      }
    }
    return s;
  });
};

export const getItems = <T extends Publishable>(
  store: CollectionStore<T>,
  limit = 5,
): T[] => sortByPublishedAt(Object.values(store.items)).slice(0, limit);

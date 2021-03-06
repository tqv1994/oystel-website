import { sortByPublishedAt } from '$lib/utils/sort';

import type { Writable } from 'svelte/store';
import type { Kind } from './category';
import type { Country } from './country';
import type { UploadFile } from './upload-file';

export interface FetchError {
  code?: number;
  status?: string;
  message?: string;
  fields?: Record<string, string>;
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
  items: Record<string, T>;
};

export type Identifiable = {
  id: string;
};

export type Nameable = {
  name: string;
};

export type Linkable = Identifiable & Nameable;

export type Nationalizable = {
  country?: string;
};

export type Categorizable = {
  type1: Kind;
  type2: Kind;
  type3: Kind;
};

export type Recordable = {
  created_at?: string;
  updated_at?: string;
};

export type Base = Identifiable & Recordable;

export type Publishable = Base & {
  published_at?: string;
};

export type Likeable = {
  liked?: boolean;
};

export type Listable = Identifiable & Nameable & Categorizable;

export type Exhibitable = Publishable &
  Nameable &
  Categorizable &
  Likeable & {
    description: string;
    gallery?: UploadFile[];
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

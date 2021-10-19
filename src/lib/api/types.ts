import { Writable } from 'svelte/store';

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

export type IdData = {
  id: string | number;
};

export type CreateData = {
  created_at: string;
};

export type UpdateData = {
  updated_at: string;
};

export type PublishData = {
  published_at: string;
};

export type BaseData = IdData & CreateData & UpdateData;

export type PublishBaseData = BaseData & PublishData;

export interface Identifiable {
  id: string;
}
export interface Publishable {
  publishedAt: Date;
}

export const updateStore = <C extends Identifiable, T extends BaseData>(
  store: Writable<CollectionStore<C>>,
  items: T[],
  factory: (t: T) => C,
) => {
  store.update((s) => {
    for (let i = 0; i < items.length; i++) {
      const item = factory(items[i]);
      s.items[item.id] = item;
    }
    return s;
  });
};

export class Base {
  id: string;
  created_at: string;
  updated_at: string;

  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(data: BaseData) {
    Object.assign(this, data);
  }

  get createdAt() {
    if (!this._createdAt) {
      this._createdAt = new Date(this.created_at);
    }
    return this._createdAt;
  }

  get updatedAt() {
    if (!this._updatedAt) {
      this._updatedAt = new Date(this.updated_at);
    }
    return this._updatedAt;
  }
}

export class PublishableBase extends Base {
  published_at: string;

  private _publishedAt: Date;

  constructor(data: PublishBaseData) {
    super(data);
    Object.assign(this, data);
  }

  get publishedAt() {
    if (!this._publishedAt) {
      this._publishedAt = new Date(this.published_at);
    }
    return this._publishedAt;
  }
}
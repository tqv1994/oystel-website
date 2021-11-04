import { Nameable } from './types';

export const NAME_ASC_KEY = 'n';
export const NAME_DESC_KEY = 'nd';
export const PUBLISH_DATE_ASC_KEY = 'p';
export const PUBLISH_DATE_DESC_KEY = 'pd';

export type OrderingKey =
  | typeof NAME_ASC_KEY
  | typeof NAME_DESC_KEY
  | typeof PUBLISH_DATE_ASC_KEY
  | typeof PUBLISH_DATE_DESC_KEY;

export type Ordering = Nameable & {
  key: OrderingKey;
  value: string;
};

export const ORDER_BY_NAME_ASC: Ordering = {
  key: NAME_ASC_KEY,
  name: 'Name',
  value: 'name:asc',
};
export const ORDER_BY_NAME_DESC: Ordering = {
  key: NAME_DESC_KEY,
  name: 'Name descending',
  value: 'name:desc',
};

export const ORDER_BY_PUBLISH_DATE_ASC: Ordering = {
  key: PUBLISH_DATE_ASC_KEY,
  name: 'Newest first',
  value: 'published_at:asc',
};

export const ORDER_BY_PUBLISH_DATE_DESC: Ordering = {
  key: PUBLISH_DATE_DESC_KEY,
  name: 'Oldest first',
  value: 'published_at:desc',
};

export const orderings:Record<string, Ordering> = {
  [NAME_ASC_KEY]: ORDER_BY_NAME_ASC,
  [NAME_DESC_KEY]: ORDER_BY_NAME_DESC,
  [PUBLISH_DATE_ASC_KEY]: ORDER_BY_PUBLISH_DATE_ASC,
  [PUBLISH_DATE_DESC_KEY]: ORDER_BY_PUBLISH_DATE_DESC,
};

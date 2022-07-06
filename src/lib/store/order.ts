import type { Kind } from './category';

export const NAME_ASC = 'name:asc';
export const NAME_DESC = 'name:desc';
export const PUBLISH_DATE_ASC = 'published_at:asc';
export const PUBLISH_DATE_DESC = 'published_at:desc';

export type OrderingKey =
  | typeof NAME_ASC
  | typeof NAME_DESC
  | typeof PUBLISH_DATE_ASC
  | typeof PUBLISH_DATE_DESC;

export const ORDER_BY_NAME_ASC: Kind = {
  id: NAME_ASC,
  name: 'Name',
};
export const ORDER_BY_NAME_DESC: Kind = {
  id: NAME_DESC,
  name: 'Name descending',
};

export const ORDER_BY_PUBLISH_DATE_ASC: Kind = {
  id: PUBLISH_DATE_ASC,
  name: 'Newest first',
};

export const ORDER_BY_PUBLISH_DATE_DESC: Kind = {
  id: PUBLISH_DATE_DESC,
  name: 'Oldest first',
};

export const orderingTypes: Kind[] = [
  ORDER_BY_NAME_ASC,
  ORDER_BY_NAME_DESC,
  ORDER_BY_PUBLISH_DATE_ASC,
  ORDER_BY_PUBLISH_DATE_DESC,
];

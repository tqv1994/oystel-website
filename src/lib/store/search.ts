import { goto } from '$app/navigation';
import { meilisearchApiKey, meilisearchUrl } from '$lib/env';
import MeiliSearch from 'meilisearch';
import { NAME_ASC_KEY, OrderingKey } from './order';
import { Identifiable } from './types';

export const QUERY = 'q';
export const TYPE = 't';
export const COUNTRY = 'c';
export const SPECIALITY = 's';
export const EXPERIENCE_TYPE = 'x';
export const DESTINATION_TYPE = 'd';
export const LANGUAGE = 'lo';
export const ORDERING = 'o';
export const LIMIT = 'l';

export type SearchParamKey =
  | typeof QUERY
  | typeof TYPE
  | typeof COUNTRY
  | typeof SPECIALITY
  | typeof EXPERIENCE_TYPE
  | typeof DESTINATION_TYPE
  | typeof LANGUAGE
  | typeof ORDERING
  | typeof LIMIT;

export type SearchParams = {
  [QUERY]?: string;
  [TYPE]?: string;
  [COUNTRY]?: string;
  [SPECIALITY]?: string;
  [EXPERIENCE_TYPE]?: string;
  [DESTINATION_TYPE]?: string;
  [LANGUAGE]?: string;
  [ORDERING]?: OrderingKey;
  [LIMIT]?: number;
};

export type SearchResultGroup<T extends Identifiable> = {
  hasMore: boolean;
  items: T[];
};

export const searchClient = new MeiliSearch({
  host: meilisearchUrl,
  apiKey: meilisearchApiKey,
});

export function makeQueryString(params: SearchParams): string {
  const s = new URLSearchParams();
  let k: keyof SearchParams;
  for (k in params) {
    if (Object.prototype.hasOwnProperty.call(params, k)) {
      const v = params[k];
      if (v) {
        s.append(k, v as string);
      }
    }
  }
  return `?${s.toString()}`;
}

export function parseSearchParams(query: URLSearchParams): SearchParams {
  return {
    [QUERY]: query.get(QUERY) || undefined,
    [TYPE]: query.get(TYPE) || undefined,
    [COUNTRY]: query.get(COUNTRY) || undefined,
    [SPECIALITY]: query.get(SPECIALITY) || undefined,
    [EXPERIENCE_TYPE]: query.get(EXPERIENCE_TYPE) || undefined,
    [DESTINATION_TYPE]: query.get(DESTINATION_TYPE) || undefined,
    [LANGUAGE]: query.get(LANGUAGE) || undefined,
    [ORDERING]: (query.get(ORDERING) as OrderingKey) || NAME_ASC_KEY,
    [LIMIT]: parseInt(query.get(LIMIT) || '20', 10),
  };
}

export const search = (p: SearchParams) => goto(makeQueryString(p));

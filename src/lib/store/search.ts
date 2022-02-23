import { goto } from '$app/navigation';
import { meilisearchApiKey, meilisearchUrl } from '$lib/env';
import { makeErrorResponse } from '$lib/utils/fetch';
import { removeMeilisearchPrefixId } from '$lib/utils/string';
import { RequestHandler } from '@sveltejs/kit';
import { MeiliSearch } from 'meilisearch';
import { Category } from './category';
import {
  NAME_ASC_KEY,
  OrderingKey,
  orderings,
  ORDER_BY_NAME_ASC,
} from './order';
import { Identifiable } from './types';

export const QUERY = 'q';
export const TYPE = 't';
export const COUNTRY = 'c';
export const EXPERIENCE_TYPE = 'x';
export const DESTINATION_TYPE = 'd';
export const LANGUAGE = 'lo';
export const ORDERING = 'o';
export const LIMIT = 'l';
export const PRODUCT_DESIGNER = 'pd';
export const PRODUCT_COLOUR = 'pc';
export const PRODUCT_PATTERN = 'pt';

export type SearchParamKey =
  | typeof QUERY
  | typeof TYPE
  | typeof COUNTRY
  | typeof EXPERIENCE_TYPE
  | typeof DESTINATION_TYPE
  | typeof LANGUAGE
  | typeof ORDERING
  | typeof LIMIT
  | typeof PRODUCT_DESIGNER
  | typeof PRODUCT_COLOUR
  | typeof PRODUCT_PATTERN;

export type SearchParams = {
  [QUERY]?: string;
  [TYPE]?: string;
  [COUNTRY]?: string;
  [EXPERIENCE_TYPE]?: string;
  [DESTINATION_TYPE]?: string;
  [LANGUAGE]?: string;
  [ORDERING]?: OrderingKey;
  [LIMIT]?: number;
  [PRODUCT_DESIGNER]?: string;
  [PRODUCT_COLOUR]?: string;
  [PRODUCT_PATTERN]?: string;
};

export type SearchResultGroup<T extends Identifiable> = {
  hasMore: boolean;
  items: T[];
};

export type SearchResultItemWithCountryId = {
  country: string;
};

export type SearchResultItemWithTypeIDs = {
  type1: string;
  type2: string;
  type3: string;
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
    [EXPERIENCE_TYPE]: query.get(EXPERIENCE_TYPE) || undefined,
    [DESTINATION_TYPE]: query.get(DESTINATION_TYPE) || undefined,
    [LANGUAGE]: query.get(LANGUAGE) || undefined,
    [ORDERING]: (query.get(ORDERING) as OrderingKey) || NAME_ASC_KEY,
    [LIMIT]: parseInt(query.get(LIMIT) || '20', 10),
    [PRODUCT_DESIGNER]: query.get(PRODUCT_DESIGNER) || undefined,
    [PRODUCT_COLOUR]: query.get(PRODUCT_COLOUR) || undefined,
    [PRODUCT_PATTERN]: query.get(PRODUCT_PATTERN) || undefined
  };
}

export const search = (p: SearchParams) => goto(makeQueryString(p));

export function createSearchHandler<T extends Identifiable>(
  index: string,
): RequestHandler {
  const typeIndex = searchClient.index(`${index}-type`);
  const contentIndex = searchClient.index(index);

  return async (event) => {
    try {
      const params = parseSearchParams(event.url.searchParams);
      const result: Record<string, SearchResultGroup<T>> = {};
      if (params[TYPE]) {
        result[params[TYPE] as string] = await searchContent<T>(params);
      } else {
        const tRes = await typeIndex.search<Category>();
        if (tRes.nbHits) {
          for (const t of tRes.hits) {
            const id = removeMeilisearchPrefixId(`${index}-type-`,t.id);
            params[TYPE] = id;
            result[id] = await searchContent<T>(params);
          }
        } else {
          console.error('Error: "type" has no result');
          return makeErrorResponse(
            500,
            'INTERNAL_SERVER_ERROR',
            'Error searching for destinations',
          );
        }
      }
      return new Response(JSON.stringify(result));
    } catch (error) {
      console.error('Error searching for destinations', error);
    }
    return makeErrorResponse(
      500,
      'INTERNAL_SERVER_ERROR',
      'Error searching for destinations',
    );
  };

  async function searchContent<T extends Identifiable>(
    params: SearchParams,
  ): Promise<SearchResultGroup<T>> {
    const filter: Array<string | Array<string>> = [];
    if (params[TYPE]) {
      filter.push([
        `type1 = ${params[TYPE]}`,
        `type2 = ${params[TYPE]}`,
        `type3 = ${params[TYPE]}`,
      ]);
    }
    if (params[COUNTRY]) {
      filter.push(`country = ${params[COUNTRY]}`);
    }
    const limit = params[LIMIT] || 20;
    const o = params[ORDERING];
    const ordering = (o && orderings[o]) || ORDER_BY_NAME_ASC;
    const res = await contentIndex.search<T>(params[QUERY], {
      filter,
      limit,
      sort: [ordering.value],
    });
    return {
      hasMore: res.nbHits > limit,
      items: res.nbHits ? res.hits : [],
    };
  }
}

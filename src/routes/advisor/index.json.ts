import type { RequestHandler } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { searchClient, SearchResultGroup } from '$lib/store/search';
import { Identifiable } from '$lib/store/types';
import {
  COUNTRY,
  LIMIT,
  ORDERING,
  parseSearchParams,
  QUERY,
  SearchParams,
  TYPE,
} from '$lib/store/search';
import { orderings, ORDER_BY_NAME_ASC } from '$lib/store/order';
import { Advisor } from '$lib/store/advisor';

const index = searchClient.index('advisor');

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const params = parseSearchParams(event.url.searchParams);
    const res = await search<Advisor>(params);
    return {
      body: JSON.stringify(res),
    };
  } catch (error) {
    console.error('Error searching for destinations', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error searching for destinations',
  );
};

async function search<T extends Identifiable>(
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
  const res = await index.search<T>(params[QUERY], {
    filter,
    limit,
    sort: [ordering.value],
  });
  return {
    hasMore: res.nbHits > limit,
    items: res.nbHits ? res.hits : [],
  };
}

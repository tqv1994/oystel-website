import type { RequestHandler, Request } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Destination } from '$lib/store/destination';
import { Category } from '$lib/store/category';
import { Identifiable } from '$lib/store/types';
import {
  COUNTRY,
  LIMIT,
  ORDERING,
  parseSearchParams,
  QUERY,
  SearchParams,
  TYPE,
  searchClient,
  SearchResultGroup,
} from '$lib/store/search';
import { orderings, ORDER_BY_NAME_ASC } from '$lib/store/order';

const tIndex = searchClient.index('destination-type');
const dIndex = searchClient.index('destination');

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const params = parseSearchParams(request.query);
    const destinations: Record<string, SearchResultGroup<Destination>> = {};
    if (params[TYPE]) {
      destinations[params[TYPE] as string] = await search<Destination>(params);
    } else {
      const tRes = await tIndex.search<Category>();
      if (tRes.nbHits) {
        for (const t of tRes.hits) {
          params[TYPE] = t.id;
          destinations[t.id] = await search<Destination>(params);
        }
      }
    }
    return {
      body: JSON.stringify(destinations),
    };
  } catch (error) {
    console.error('Error searching for destinations', error);
  }
  return makeErrorResponse(500, 'Error searching for destinations');
};

async function search<T extends Identifiable>(
  params: SearchParams,
): Promise<SearchResultGroup<T>> {
  const filter: string[] = [`type = '${params[TYPE]}'`];
  if (params[COUNTRY]) {
    filter.push(`country = ${params[COUNTRY]}`);
  }
  const limit = params[LIMIT] || 20;
  const o = params[ORDERING];
  const ordering = (o && orderings[o]) || ORDER_BY_NAME_ASC;
  const res = await dIndex.search<T>(params[QUERY], {
    filter,
    limit,
    sort: [ordering.value],
  });
  return {
    hasMore: res.nbHits > limit,
    items: res.nbHits ? res.hits : [],
  };
}

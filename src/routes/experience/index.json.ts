import type { RequestHandler, Request } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience } from '$lib/store/experience';
import { Category } from '$lib/store/category';
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

const tIndex = searchClient.index('experience-type');
const dIndex = searchClient.index('experience');

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const params = parseSearchParams(request.query);
    const experiences: Record<string, SearchResultGroup<Experience>> = {};
    if (params[TYPE]) {
      experiences[params[TYPE] as string] = await search<Experience>(params);
    } else {
      const tRes = await tIndex.search<Category>();
      if (tRes.nbHits) {
        for (const t of tRes.hits) {
          params[TYPE] = t.id;
          experiences[t.id] = await search<Experience>(params);
        }
      }
    }
    return {
      body: JSON.stringify(experiences),
    };
  } catch (error) {
    console.error('Error searching for experiences', error);
  }
  return makeErrorResponse(500, 'Error searching for experiences');
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

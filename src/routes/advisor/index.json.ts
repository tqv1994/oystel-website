import type { RequestHandler } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { EXPERIENCE_TYPE, searchClient, SearchResultGroup } from '$lib/store/search';
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
    console.error('Error searching for advisors', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error searching for advisors',
  );
};

async function search<T extends Identifiable>(
  params: SearchParams,
): Promise<SearchResultGroup<T>> {
  const filter: Array<string | Array<string>> = [];
  if (params[EXPERIENCE_TYPE]) {
    filter.push([
      `experienceType1 = ${params[EXPERIENCE_TYPE]}`,
      `experienceType2 = ${params[EXPERIENCE_TYPE]}`,
      `experienceType3 = ${params[EXPERIENCE_TYPE]}`,
      `experienceType4 = ${params[EXPERIENCE_TYPE]}`,
      `experienceType5 = ${params[EXPERIENCE_TYPE]}`,
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

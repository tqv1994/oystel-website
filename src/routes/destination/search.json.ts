import type { RequestHandler, Request } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { ExperienceSearchResultItem } from '$lib/store/experience';
import {
  DESTINATION_TYPE,
  EXPERIENCE_TYPE,
  searchClient,
  SearchResultGroup,
} from '$lib/store/search';
import { Identifiable } from '$lib/store/types';
import {
  COUNTRY,
  LIMIT,
  ORDERING,
  parseSearchParams,
  QUERY,
  SearchParams,
} from '$lib/store/search';
import { orderings, ORDER_BY_NAME_ASC } from '$lib/store/order';
import { DestinationSearchResultItem } from '$lib/store/destination';

const dIndex = searchClient.index('destination');
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const params = parseSearchParams(request.query);
    const result: SearchResultGroup<
      ExperienceSearchResultItem | DestinationSearchResultItem
    > = await search<ExperienceSearchResultItem | DestinationSearchResultItem>(
      params,
    );
    return {
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error searching for search page', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error searching for search page',
  );
};

async function search<T extends Identifiable>(
  params: SearchParams,
): Promise<SearchResultGroup<T>> {
  const filter: string[] = [];
  if (params[DESTINATION_TYPE]) {
    filter.push(`type1 = ${params[DESTINATION_TYPE]}`);
    filter.push(`type2 = ${params[DESTINATION_TYPE]}`);
    filter.push(`type3 = ${params[DESTINATION_TYPE]}`);
  }
  if (params[COUNTRY]) {
    filter.push(`country = ${params[COUNTRY]}`);
  }
  const limit = params[LIMIT] || 10;
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

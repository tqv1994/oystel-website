import type { RequestHandler } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { ExperienceSearchResultItem } from '$lib/store/experience';
import {
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

const dIndex = searchClient.index('experience');
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const params = parseSearchParams(event.url.searchParams);
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
  if (params[EXPERIENCE_TYPE]) {
    filter.push(`type1 = ${params[EXPERIENCE_TYPE]}`);
    filter.push(`type2 = ${params[EXPERIENCE_TYPE]}`);
    filter.push(`type3 = ${params[EXPERIENCE_TYPE]}`);
  }
  if (params[COUNTRY]) {
    const filterCountries = (params[COUNTRY] || '').split(',').reduce((acc: string, item: string)=>{
      if(item !== ''){
        if(acc == ''){
          acc += `country = ${item}`;
        }else{
          acc += ` OR country = ${item}`;
        }
      }
      return acc;
    },'');
    filter.push(`(${filterCountries})`);
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

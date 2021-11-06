import type { RequestHandler, Request } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience, ExperienceSearchResultItem } from '$lib/store/experience';
import { DESTINATION_TYPE, EXPERIENCE_TYPE, searchClient, SearchResultGroup } from '$lib/store/search';
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
import { Rec } from '@sveltejs/kit/types/helper';
import { Destination, DestinationSearchResultItem } from '$lib/store/destination';

const dIndexExperience = searchClient.index('experience');
const dIndexDestination = searchClient.index('destination');
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const params = parseSearchParams(request.query);
    const result: SearchResultGroup<ExperienceSearchResultItem | DestinationSearchResultItem>
        = await search<ExperienceSearchResultItem | DestinationSearchResultItem>(params);
    return {
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error searching for search page', error);
  }
  return makeErrorResponse(500, 'Error searching for search page');
};

async function search<T extends Identifiable>(
  params: SearchParams,
): Promise<SearchResultGroup<T>> {
  const filterExperience: string[] = [];
  const filterDestination: string[] = [];
  if (params[DESTINATION_TYPE]) {
    filterDestination.push(` type = ${params[DESTINATION_TYPE]}`);
  }
  if (params[EXPERIENCE_TYPE]) {
    filterExperience.push(` type = ${params[EXPERIENCE_TYPE]}`);
  }
  if (params[COUNTRY]) {
    filterDestination.push(` country = ${params[COUNTRY]}`);
    filterExperience.push(` country = ${params[COUNTRY]}`);
  }
  const limit = params[LIMIT] || 10;
  const o = params[ORDERING];
  const ordering = (o && orderings[o]) || ORDER_BY_NAME_ASC;
  const resExperience = await dIndexExperience.search<T>(params[QUERY], {
    filter:filterExperience,
    limit,
    sort: [ordering.value],
  });
  const resDestination = await dIndexDestination.search<T>(params[QUERY], {
    filter:filterDestination,
    limit,
    sort: [ordering.value],
  });
  let res: {nbHits: number, hits: T[] } = {
      nbHits: resDestination.nbHits > 0 ? resDestination.nbHits : resExperience.nbHits,
      hits: (resDestination.hits.map(
          (item: any)=>{ 
              item.__typename = 'Destination'; 
              return item; 
            }) || []).concat(resExperience.hits.map((item: any)=>{
                item.__typename = 'Experience';
                return item;}) || [])
  };
  return {
    hasMore: res.nbHits > limit,
    items: res.nbHits ? res.hits : [],
  };
}

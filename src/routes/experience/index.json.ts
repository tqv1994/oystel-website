import type { RequestHandler, Request } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience, ExperienceSearchResultItem } from '$lib/store/experience';
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
import type { Rec } from '@sveltejs/kit/types/helper';

const dIndex = searchClient.index('experience');

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const params = parseSearchParams(request.query);
    const experiences: Rec<SearchResultGroup<ExperienceSearchResultItem>> = {};
    if (params[TYPE]) {
      experiences[params[TYPE] as string] =
        await search<ExperienceSearchResultItem>(params);
    } else {
      const limit = params[LIMIT] || 3;
      const res = await search<ExperienceSearchResultItem>({
        ...params,
        [LIMIT]: 1000,
      });
      for (const item of res.items) {
        const catId = item.type;
        if (!experiences[catId]) {
          experiences[catId] = { hasMore: false, items: [item] };
        } else if (experiences[catId].items.length < limit) {
          experiences[catId].items.push(item);
        } else if (experiences[catId].items.length === limit) {
          experiences[catId].hasMore = true;
        }
      }
    }
    return {
      body: JSON.stringify(experiences),
    };
  } catch (error) {
    console.error('Error searching for experiences', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error searching for experiences',
  );
};

async function search<T extends Identifiable>(
  params: SearchParams,
): Promise<SearchResultGroup<T>> {
  const filter: string[] = [];
  if (params[TYPE]) {
    filter.push(`type = ${params[TYPE]}`);
  }
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

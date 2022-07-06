import {
  meilisearchAdminApiKey,
  meilisearchPublicApiKey,
  meilisearchUrl,
} from '$lib/env';
import type { SvelteFetch } from '$lib/utils/fetch';
import type { SearchRequest, SearchResponse } from 'meilisearch';
import type { Identifiable, Searchable } from './types';
import type { Kind } from './category';
import type { Product } from './product';
import type { Destination } from './destination';
import type { Experience } from './experience';

export const QUERY = 'q';
export const TYPE = 't';
export const COUNTRY = 'c';
export const EXPERIENCE_TYPE = 'te';
export const DESTINATION_TYPE = 'td';
export const LANGUAGE = 'la';
export const ORDERING = 'o';
export const LIMIT = 'l';
export const PRODUCT_DESIGNER = 'pd';
export const PRODUCT_COLOUR = 'pc';
export const PRODUCT_PATTERN = 'pt';
export const VACATION_STYLE = 'vs';

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
  | typeof PRODUCT_PATTERN
  | typeof VACATION_STYLE;

export type SearchResultGroup<T extends Searchable = Searchable> = {
  kind?: Kind;
  result: SearchResponse<T>;
};

export type SearchResultCollections = {
  destinations: SearchResultGroup<Destination>[];
  experiences: SearchResultGroup<Experience>[];
};

export async function trySearchGetOne<T>(
  fetch: SvelteFetch,
  index: string,
  id: string,
): Promise<T | undefined> {
  try {
    const res = await searchGetOne(fetch, index, id);
    if (res.ok) {
      return await res.json();
    } else {
      console.error('Failed to load', index, id, res.status, await res.text());
    }
  } catch (err) {
    console.error('Error load', index, id, err);
  }
}

export function searchGetOne(
  fetch: SvelteFetch,
  index: string,
  id: string,
): Promise<Response> {
  return searchGet(
    fetch,
    `${meilisearchUrl}/indexes/${index}/documents/${index}-${id}`,
  );
}

function searchGet(fetch: SvelteFetch, url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${meilisearchAdminApiKey}`,
    },
  });
}

function searchFetch(
  fetch: SvelteFetch,
  index: string,
  options: SearchRequest,
): Promise<Response> {
  return fetch(`${meilisearchUrl}/indexes/${index}/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${meilisearchPublicApiKey}`,
    },
    body: JSON.stringify(options),
  });
}

export async function trySearch<T extends Identifiable>(
  fetch: SvelteFetch,
  index: string,
  options: SearchRequest,
): Promise<SearchResponse<T>> {
  try {
    const res = await searchFetch(fetch, index, options);
    if (res.ok) {
      const data: SearchResponse<T> = await res.json();
      for (const item of data.hits) {
        item.id = item.id.substring(index.length + 1);
      }
      return data;
    } else {
      console.error('Failed search', index, res.status, await res.text());
    }
  } catch (err) {
    console.error('Error search', index, err);
  }
  return {
    hits: [],
    offset: options.offset || 0,
    limit: options.limit || 0,
    processingTimeMs: 0,
    exhaustiveNbHits: true,
    nbHits: 0,
    query: options.q || '',
  };
}

// type DoSearchParams = {
//   q?: string | null;
//   kind: Kind;
//   limit: number;
//   kindFilter: string[];
//   countryFilter: string[];
//   orderingTypeIds: string[];
//   filter?: (string | string[])[];
// };
// export async function doSearch<T extends Searchable>(
//   fetch: SvelteFetch,
//   index: string,
//   { q, kind, orderingTypeIds, limit, filter = [] }: DoSearchParams,
// ): Promise<SearchResultGroup<T>> {
//   const data = await trySearch<T>(fetch, index, {
//     q,
//     filter,
//     limit,
//     sort: orderingTypeIds,
//   });
//   return {
//     ...kind,
//     items: data.hits,
//   };
// }

type BuildKindParams = {
  prefix?: string;
  id: string;
  n: number;
  acc?: string[];
};
export function buildKindFilter({
  prefix = 'type',
  id,
  n = 5,
  acc = [],
}: BuildKindParams): string[] {
  for (let i = 1; i <= n; i++) {
    acc.push(`${prefix}${i} = ${id}`);
  }
  return acc;
}

export type ProductSearchParams = {
  q?: string | null;
  typeId?: string | null;
  designerId?: string | null;
  patternIds?: string[];
  colourIds?: string[];
  vacationStyleId?: string | null;
};
export async function searchProducts({
  q,
  designerId,
  typeId,
  patternIds,
  colourIds,
  vacationStyleId,
}: ProductSearchParams): Promise<Product[]> {
  const filter: (string | string[])[] = [];
  if (patternIds?.length) {
    const patternFilter: string[] = [];
    for (let i = 1; i <= patternIds.length; i++) {
      patternFilter.push(`product_pattern= ${patternIds}`);
    }
    filter.push(patternFilter);
  }

  if (colourIds?.length) {
    const colourFilter: string[] = [];
    for (let i = 1; i <= colourIds.length; i++) {
      colourFilter.push(`product_colour= ${colourIds}`);
    }
    filter.push(colourFilter);
  }

  if (designerId) {
    filter.push(`product_designer = ${designerId}`);
  }
  if (vacationStyleId) {
    filter.push(`vacation_style = ${vacationStyleId}`);
  }
  if (typeId) {
    filter.push(buildKindFilter({ id: typeId, n: 3 }));
  }
  const res = await trySearch<Product>(fetch, 'product', {
    q,
    filter,
    limit: 999,
  });
  return res.hits;
}

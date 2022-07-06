import { trySearch } from '$lib/store/search';
import type { SvelteFetch } from './fetch';

export async function loadFeature(
  fetch: SvelteFetch,
  uid: string,
): Promise<Record<string, unknown>> {
  const res = await trySearch(fetch, 'page', {
    filter: [`uid = ${uid}`],
  });
  return res.hits[0];
}

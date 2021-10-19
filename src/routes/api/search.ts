import { graphApiUrl } from '$lib/env';import { RequestHandler, Request } from '@sveltejs/kit';
import {
  getSessionCookieFromRequest,
  filterResponseHeaders,
} from '$lib/session';
import { meilisearchUrl } from '$lib/env';
import { MeiliSearch } from 'meilisearch';
import { stringHelper } from '$lib/helpers';
import { SearchResultsPageData } from '$lib/api/pages/type';

const client = new MeiliSearch({
  host: meilisearchUrl,
  apiKey: '9oDwRbhqujixwfepoOReyxbg'
});

const indexExperience = client.index('experience');
const indexDestination = client.index('destination');
let results: SearchResultsPageData = {
  destinations: [],
  experiences: []
}; 

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
      const searchExperience = await indexExperience.search(
        request.query.get('q'),
        // stringHelper.queryURLParamToJSON(request.query.get('params'))
      );
      results.experiences = searchExperience.hits;
      const searchDestination = await indexDestination.search(
        request.query.get('q'),
        // stringHelper.queryURLParamToJSON(request.query.get('params'))
      );
      results.destinations = searchDestination.hits
      return {
        status: 202,
        body: JSON.stringify(results)
      };
  } catch (err) {
    console.error('Error fetching profile', err);
    return {
      status: 500,
      body: 'Error',
    };
  }
};

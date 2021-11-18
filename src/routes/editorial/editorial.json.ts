import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience, experienceFieldsFragment } from '$lib/store/experience';
import { countryFieldsFragment } from '$lib/store/country';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';

export type EditorialPageData = {
  experiences: Experience[];
};

const query = `query {
  experiences(limit: 7, sort: "published_at:desc") {
    ...experienceFields
  }
}
${experienceFieldsFragment}
${countryFieldsFragment}
${uploadFileFieldsFragment}
`;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const res = await client.query<EditorialPageData>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting editorial page', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the editorial page');
};

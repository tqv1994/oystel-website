import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Drop, dropFieldsFragment } from '$lib/store/drop';
import { Experience, experienceFieldsFragment } from '$lib/store/experience';
import { Destination, destinationFieldsFragment } from '$lib/store/destination';
import { countryFieldsFragment } from '$lib/store/country';
import { productFieldsFragment } from '$lib/store/product';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';

export type HomePageData = {
  drops: Drop[];
  experiences: Experience[];
  destinations: Destination[];
};

const query = `query {
  drops( limit:7, sort: "published_at:desc" ) {
    ...dropFields
  }
  experiences(limit: 7, sort: "published_at:desc") {
    ...experienceFields
  }
  destinations(limit: 7, sort: "published_at:desc") {
    ...destinationFields
  }
}
${dropFieldsFragment}
${experienceFieldsFragment}
${destinationFieldsFragment}
${countryFieldsFragment}
${productFieldsFragment}
${uploadFileFieldsFragment}
`;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const res = await client.query<HomePageData>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting home page', error);
  }
  return makeErrorResponse(500, 'Error retrieving data for the home page');
};

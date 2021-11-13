import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience, experienceFieldsFragment } from '$lib/store/experience';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { productFieldsFragment } from '$lib/store/product';
import { countryFieldsFragment } from '$lib/store/country';
import { lookFieldsFragment } from '$lib/store/look';
import { destinationFieldsFragment } from '$lib/store/destination';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';

const query = `
query($id: ID!) {
  experience(id: $id) {
    ...experienceFields
    type {
      ...experienceTypeFields
    }
    destinations {
      ...destinationFields
    }
    looks {
      ...lookFields
    }
    pack {
      ...productFields
    }
  }
}
${experienceTypeFieldsFragment}
${experienceFieldsFragment}
${destinationFieldsFragment}
${lookFieldsFragment}
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
    const res = await client.query<{experience: Experience}>(query, request.params).toPromise();
    if (res.data?.experience) {
      return {
        body: JSON.stringify(res.data.experience),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting destinations', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the destinations');
};
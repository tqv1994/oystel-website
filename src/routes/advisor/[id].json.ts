import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { countryFieldsFragment } from '$lib/store/country';
import { specialityFieldsFragment } from '$lib/store/speciality';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { languageFieldsFragment } from '$lib/store/language';
import { Advisor, advisorFieldsFragment } from '$lib/store/advisor';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { experienceFieldsFragment } from '$lib/store/experience';
import { destinationFieldsFragment } from '$lib/store/destination';

const query = `
query($id: ID!) {
  advisor(id: $id) {
    ...advisorFields
    experiences {
      ...experienceFields
    }
    destinations {
      ...destinationFields
      type{
        ...destinationTypeFields
      }
    }
  }
}
${advisorFieldsFragment}
${destinationTypeFieldsFragment}
${experienceTypeFieldsFragment}
${languageFieldsFragment}
${countryFieldsFragment}
${specialityFieldsFragment}
${uploadFileFieldsFragment}
${experienceFieldsFragment}
${destinationFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const res = await client.query<{advisor: Advisor}>(query, request.params).toPromise();
    if (res.data?.advisor) {
      return {
        body: JSON.stringify(res.data.advisor),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting advisor detail', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the advisor detail');
};

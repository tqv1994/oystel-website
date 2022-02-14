import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { countryFieldsFragment } from '$lib/store/country';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { advisorTypeFieldsFragment } from '$lib/store/advisor-type';
import { languageFieldsFragment } from '$lib/store/language';
import { Metadata } from '$lib/store/metadata';

const query = `query {
  advisorTypes {
    ...advisorTypeFields
  }
  destinationTypes {
    ...destinationTypeFields
  }
  experienceTypes {
    ...experienceTypeFields
  }
  countries {
    ...countryFields
  }
  languages {
    ...languageFields
  }
}
${advisorTypeFieldsFragment}
${destinationTypeFieldsFragment}
${experienceTypeFieldsFragment}
${countryFieldsFragment}
${languageFieldsFragment}
`;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<Metadata>(query).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting destinations', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the destinations');
};

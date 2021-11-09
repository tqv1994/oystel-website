import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Country, countryFieldsFragment } from '$lib/store/country';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { Speciality, specialityFieldsFragment } from '$lib/store/speciality';
import { Category } from '$lib/store/category';
import { Language, languageFieldsFragment } from '$lib/store/language';

export type Metadata = {
  specialities: Speciality[];
  destinationTypes: Category[];
  experienceTypes: Category[];
  countries: Country[];
  languages: Language[];
};

const query = `query {
  specialities {
    ...specialityFields
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
${specialityFieldsFragment}
${destinationTypeFieldsFragment}
${experienceTypeFieldsFragment}
${countryFieldsFragment}
${languageFieldsFragment}
`;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const res = await client.query<Metadata>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
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

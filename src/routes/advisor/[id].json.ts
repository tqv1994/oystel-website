import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { countryFieldsFragment } from '$lib/store/country';
import { advisorTypeFieldsFragment } from '$lib/store/advisor-type';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { languageFieldsFragment } from '$lib/store/language';
import { Advisor, advisorFieldsFragment } from '$lib/store/advisor';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { experienceFieldsFragment } from '$lib/store/experience';
import { destinationFieldsFragment } from '$lib/store/destination';
import { User, userFieldsFragment } from '$lib/store/auth';

const query = `
query($id: ID!) {
  advisor(id: $id) {
    ...advisorFields
    experiences {
      ...experienceFields
    }
    destinations {
      ...destinationFields
    }
  }
  users(where:{advisorMe:{id: $id}}, limit: 1){
    id
    agencyMe{
      id
      affiliate_agencies{
        id
        name
      }
      affiliate_networks{
        id
        name
      }
      affiliate_benefit_programs{
        id
        name
      }
    }
  }
}
${advisorFieldsFragment}
${destinationTypeFieldsFragment}
${experienceTypeFieldsFragment}
${languageFieldsFragment}
${countryFieldsFragment}
${advisorTypeFieldsFragment}
${uploadFileFieldsFragment}
${experienceFieldsFragment}
${destinationFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<{advisor: Advisor, users: User[]}>(query, event.params).toPromise();
    if (res.data?.advisor) {
      if(res.data?.users && res.data?.users.length > 0){
        res.data.advisor.agency = res.data?.users[0].agencyMe;
      }
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

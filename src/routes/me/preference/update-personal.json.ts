import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { PersonalPreference, personalPreferenceFieldsFragment } from '$lib/store/preference';
import { updateTravellerData } from '../../traveller/update-[id].json';

/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
  event) => {
  if (!event.locals.user?.travellerMe) {
    return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
  }
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `
        mutation ($id: ID!, $personalPreferences: [ID]){
            updateTraveller(input:{
              where:{id:$id}
              data:{personalPreferences:$personalPreferences}
            }){
              traveller{
                personalPreferences{
                  ...personalPreferenceFields
                }
              }
            }
          }
          ${personalPreferenceFieldsFragment}
        `;
    const reqBody = await event.request.json();
    const res = await client.mutation<updateTravellerData>(query, { id: event.locals.user?.travellerMe?.id, personalPreferences: reqBody }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting personal preference', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the personal preference');
};
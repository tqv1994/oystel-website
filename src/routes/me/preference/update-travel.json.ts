import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { TravelPreference, travelPreferenceFieldsFragment } from '$lib/store/preference';
import { updateTravellerData } from '../../traveller/update-me.json';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
  event) => {
  if (!event.locals.user?.travellerMe) {
    return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
  }
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `
        mutation ($id: ID!, $travelPreferences: [ID]){
            updateTraveller(input:{
              where:{id:$id}
              data:{travelPreferences: $travelPreferences}
            }){
              traveller{
                travelPreferences{
                  ...travelPreferenceFields
                }
              }
            }
          }
          ${travelPreferenceFieldsFragment}
        `;
    const reqBody = await event.request.json();
    const res = await client.mutation<updateTravellerData>(query, { id: event.locals.user?.travellerMe.id, travelPreferences: reqBody }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting travel preference', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the travel preference');
};
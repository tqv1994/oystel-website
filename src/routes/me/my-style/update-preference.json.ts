import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { updateTravellerData } from '../../traveller/update-me.json';

/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
  event) => {
  if (!event.locals.user?.travellerMe?.id) {
    return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
  }
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `
        mutation ($id: ID!, $stylePreferences: String){
            updateTraveller(input:{
              where:{id: $id}
              data:{stylePreferences: $stylePreferences}
            }){
              traveller{
                stylePreferences
              }
            }
          }
        `;
    const reqBody = await event.request.json();
    const res = await client.mutation<updateTravellerData>(query, { id: event.locals.user?.travellerMe?.id, stylePreferences: reqBody }).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data.updateTraveller.traveller),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting style preference', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the style preference');
};
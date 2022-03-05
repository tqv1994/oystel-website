import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Trip } from '$lib/store/trip';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type UpdateUserData = {
  updateTrip: {
    trip: Trip
  };
};

export const put: RequestHandler = async (
  event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation updateTrip ($id: ID!, $trip: editTripInput){
        updateTrip(input:{
          where: {id: $id},
          data: $trip
        }) {
            trip{
                id
            }
          }
      }

    `;
    const reqBody = await event.request.json();
    const res = await client.mutation<UpdateUserData>(query, { id: event.params['id'], trip: reqBody }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error updating trip', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the trip');
};
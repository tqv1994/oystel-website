import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Destination } from '$lib/store/destination';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type UpdateDestinationData = {
  updateDestination: {
    destination: Destination
  };
};

export const put: RequestHandler = async (
  event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation updateDestination ($id: ID!, $destination: editDestinationInput){
        updateDestination(input:{
          where: {id: $id},
          data: $destination
        }) {
            destination{
                id
                num_views
            }
          }
      }
    `;
    const reqBody = await event.request.json();
    let params = reqBody.num_views ? {num_views: reqBody.num_views} : {};
    const res = await client.mutation<UpdateDestinationData>(query, { id: event.params['id'], destination: params }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data.updateDestination?.destination));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error updating destination', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the destination');
};
import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Destination, destinationFieldsFragment } from '$lib/store/destination';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { countryFieldsFragment } from '$lib/store/country';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type DestinationLikeData = {
  updateUser: {
    user: {
      destinationLikes: Destination[]
    }
  };
};

export const put: RequestHandler = async (
  event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation me ($id: ID!, $destinationLikes: [ID]){
        updateUser(input:{
          where:{id: $id},
          data:{ destinationLikes:$destinationLikes}
        }) {
            user{
                destinationLikes{
                  id
              }
            }
          }
      }
    `;
    const reqBody = await event.request.json();
    const res = await client.mutation<DestinationLikeData>(query, { id: event.locals.user?.id, destinationLikes: reqBody }).toPromise();
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
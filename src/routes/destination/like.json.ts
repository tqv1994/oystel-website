import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Destination } from '$lib/store/destination';
/**
 * @type {import('@sveltejs/kit').Post}
 */
 export type DestinationLikeData = {
  updateUser:{
    user:{
      destinationLikes: Destination[]
    }
  };
};

export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `mutation me ($id: ID!, $destinationLikes: [ID]){
        updateUser(input:{
          where:{id: $id},
          data:{ destinationLikes:$destinationLikes}
        }) {
            user{
                destinationLikes{
                  id,
                  name
                
              }
            }
          }
      }
    `;
    const res = await client.mutation<DestinationLikeData>(query,{id:request.locals.user?.id,destinationLikes: request.body}).toPromise();
    if(res.data){
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
  return makeErrorResponse(500,'INTERNAL_SERVER_ERROR', 'Error retrieving data for the destinations');
};
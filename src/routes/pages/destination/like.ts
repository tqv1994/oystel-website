import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { UpdateDestination } from '$lib/store/pages';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
    console.log(request.body);
    const query = `mutation updateDestination ($id: ID!, $users: [ID]){
        updateDestination(input:{
          where:{id: $id},
          data:{ users:$users}
        }) {
            destination{
              users{
                id
              }
            }
          }
      }    
    `;
    const res = await client.mutation<UpdateDestination>(query,{id:request.query.get('id'),users: request.body}).toPromise();
    if(res.data){
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting experiences', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the experiences');
};

import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { stringHelper } from '$lib/helpers';
import { UpdateDestinationData } from '$lib/api/pages/type';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Record<string, any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
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
    const res = await client.mutation<UpdateDestinationData>(query,{id:request.query.get('id'),users: JSON.parse(request.body)}).toPromise();
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
  return makeErrorResponse(500, 'Error retrieving data for the experiences');
};

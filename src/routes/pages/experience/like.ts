import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `mutation updateExprience ($id: ID!, $users: [ID]){
        updateExperience(input:{
          where:{id: $id},
          data:{ users:$users}
        }) {
            experience{
              users{
                id
              }
            }
          }
      }    
    `;
    const res = await client.mutation<UpdateExperience>(query,{id:request.query.get('id'),users: request.body}).toPromise();
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

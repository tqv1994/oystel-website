import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Record<string, any>, AuthForm) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `mutation me ($id: ID!, $experienceLikes: [ID]){
        updateUser(input:{
          where:{id: $id},
          data:{ experience_likes:$experienceLikes}
        }) {
            me{
                experience_likes{
                id,
                name
              }
            }
          }
      }    
    `;
    const res = await client.mutation<any>(query,{id:request.params['id'],users: JSON.parse(request.body)}).toPromise();
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
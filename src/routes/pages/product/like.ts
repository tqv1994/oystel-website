import { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation updateProduct ($id: ID!, $users: [ID]){
        updateProduct(input:{
          where:{id: $id},
          data:{ users:$users}
        }) {
            product{
              users{
                id
              }
            }
          }
      }    
    `;
    const reqBody = await event.request.json();
    const res = await client.mutation(query,{id:event.url.searchParams.get('id'),users: reqBody}).toPromise();
    if(res.data){
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error updating product', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error updating data for the product');
};

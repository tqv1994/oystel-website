import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { stringHelper } from '$lib/helpers';
import { UpdateProduct } from '$lib/store/pages';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Record<string, any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
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
    const res = await client.mutation<UpdateProduct>(query,{id:request.query.get('id'),users: request.body}).toPromise();
    if(res.data){
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error updating product', error);
  }
  return makeErrorResponse(500, 'Error updating data for the product');
};

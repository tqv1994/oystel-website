import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { stringHelper } from '$lib/helpers';
import { UpdateProductData } from '$lib/api/pages/type';
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
    const res = await client.mutation<UpdateProductData>(query,{id:request.query.get('id'),users: request.body}).toPromise();
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

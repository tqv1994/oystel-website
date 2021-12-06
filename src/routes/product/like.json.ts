import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import type { Rec } from '@sveltejs/kit/types/helper';
import { Product, productFieldsFragment } from '$lib/store/product';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type ProductLikeData = {
  updateUser: {
    user: {
      productLikes: Product[]
    }
  };
};

export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `mutation me ($id: ID!, $productLikes: [ID]){
        updateUser(input:{
          where:{id: $id},
          data:{ productLikes:$productLikes}
        }) {
            user{
                productLikes{
                  ...productFields
                
              }
            }
          }
      }
      ${productFieldsFragment}
      ${uploadFileFieldsFragment}
    `;
    const res = await client.mutation<ProductLikeData>(query, { id: request.locals.user?.id, productLikes: request.body }).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting products', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the products');
};
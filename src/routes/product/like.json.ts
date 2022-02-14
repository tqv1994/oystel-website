import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
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
  event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation me ($id: ID!, $productLikes: [ID]){
        updateUser(input:{
          where:{id: $id},
          data:{ productLikes:$productLikes}
        }) {
            user{
                productLikes{
                  id
              }
            }
          }
      }
    `;
    const reqBody = await event.request.json();
    const res = await client.mutation<ProductLikeData>(query, { id: event.locals.user?.id, productLikes: reqBody }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting products', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the products');
};
import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Traveller } from '$lib/store/traveller';

/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
    const data = request.body;

    const query = `
      mutation{
          updateTraveller(input:{
            where:{id:${data.id}}
            data:{
              topSize: "${data.mySize.topSize}"
              dressSize: "${data.mySize.dressSize}"
              jeanPantSize: "${data.mySize.jeanPantSize}"
              braSize: "${data.mySize.braSize}"
              shoeSize: "${data.mySize.shoeSize}"
              bodyStyle: "${data.mySize.bodyStyle}"
              weightUnit: "${data.mySize.weightUnit}"
              heightUnit: "${data.mySize.heightUnit}"
              ${data.mySize.gender != '' ? 'gender : ' + data.mySize.gender : ''}
              ${data.mySize.height != '' ? 'height : ' + data.mySize.height : ''}
              ${data.mySize.weight != '' ? 'weight : ' + data.mySize.weight : ''}
            }
          }){
            traveller{
              topSize
              dressSize
              jeanPantSize
              braSize
              shoeSize
              bodyStyle
              gender
              weightUnit
              heightUnit
              height
              weight
            }
          }
        }
      `;
    const res = await client.mutation<{ traveller: Traveller }>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting my size', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the my size');
};
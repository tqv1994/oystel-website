import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { updateTravellerData } from '../../traveller/update-me.json';

/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>) => {
  if (!request.locals.user?.travellerMe?.id) {
    return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
  }
  try {
    const client = createGraphClientFromRequest(request);
    const query = `
      mutation ($id: ID!, $traveller: editTravellerInput){
          updateTraveller(input:{
            where:{id:$id}
            data: $traveller
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
    const res = await client.mutation<updateTravellerData>(query, { id: request.locals.user?.travellerMe?.id, traveller: request.body }).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data.updateTraveller.traveller),
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
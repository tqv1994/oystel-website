import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Interest, interestFieldsFragment } from '$lib/store/interest';
import { Traveller } from '$lib/store/traveller';
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
        mutation ($id: ID!, $interests: [ID]){
            updateTraveller(input:{
              where:{id:$id}
              data: {interests: $interests}
            }){
              traveller{
                interests{
                  ...interestFields
                }
              }
            }
          }
          ${interestFieldsFragment}
        `;
    const res = await client.mutation<updateTravellerData>(query, {id: request.locals.user?.travellerMe?.id, interests: request.body}).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data.updateTraveller?.traveller),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting interests', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the interests');
};
import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { PersonalPreference, personalPreferenceFieldsFragment } from '$lib/store/preference';
import { Rec } from '@sveltejs/kit/types/helper';
import { updateTravellerData } from '../../traveller/update-[id].json';

/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>) => {
  if (!request.locals.user?.travellerMe) {
    return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
  }
  try {
    const client = createGraphClientFromRequest(request);
    const query = `
        mutation ($id: ID!, $personalPreferences: [ID]){
            updateTraveller(input:{
              where:{id:$id}
              data:{personalPreferences:$personalPreferences}
            }){
              traveller{
                personalPreferences{
                  ...personalPreferenceFields
                }
              }
            }
          }
          ${personalPreferenceFieldsFragment}
        `;
    const res = await client.mutation<updateTravellerData>(query, { id: request.locals.user?.travellerMe?.id, personalPreferences: request.body }).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting personal preference', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the personal preference');
};
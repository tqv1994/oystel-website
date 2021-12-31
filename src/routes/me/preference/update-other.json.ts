import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { TravelPreference, travelPreferenceFieldsFragment } from '$lib/store/preference';
import { Rec } from '@sveltejs/kit/types/helper';
import { updateTravellerData } from '../../traveller/update-me.json';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    if (!request.locals.user?.travellerMe) {
        return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
    }
    try {
        const client = createGraphClientFromRequest(request);
        const query = `
        mutation ($id: ID!, $other: String){
            updateTravelPreference(input:{
                where:{id:$id}
                data:{other:$other}
            }){
                travelPreference{
                ...travelPreferenceFields
                }
            }
          }
          ${travelPreferenceFieldsFragment}
        `;
        const res = await client.mutation<updateTravellerData>(query, { id: request.locals.user?.travellerMe.id, other: request.body }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error getting travel preference', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the travel preference');
};
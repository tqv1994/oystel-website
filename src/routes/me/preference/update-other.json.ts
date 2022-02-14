import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { TravelPreference, travelPreferenceFieldsFragment } from '$lib/store/preference';
import { updateTravellerData } from '../../traveller/update-me.json';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    event) => {
    if (!event.locals.user?.travellerMe) {
        return makeErrorResponse(404, 'NOT_FOUND', 'Error not found traveller');
    }
    try {
        const client = createGraphClientFromRequest(event.request);
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
        const reqBody = await event.request.json();
        const res = await client.mutation<updateTravellerData>(query, { id: event.locals.user?.travellerMe.id, other: reqBody }).toPromise();
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
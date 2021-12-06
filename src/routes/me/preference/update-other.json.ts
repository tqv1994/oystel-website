import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { TravelPreference, travelPreferenceFieldsFragment } from '$lib/store/preference';
import { Rec } from '@sveltejs/kit/types/helper';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
        const data = request.body;
        const query = `
        mutation{
            updateTravelPreference(input:{
                where:{id:${data.id}}
                data:{other:"${data.other}"}
            }){
                travelPreference{
                ...travelPreferenceFields
                }
            }
          }
          ${travelPreferenceFieldsFragment}
        `;
        const res = await client.mutation<{ travelPreferences: TravelPreference }>(query).toPromise();
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
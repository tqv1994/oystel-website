import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Experience } from '$lib/store/experience';
import { Traveller, travellerFieldsFragment } from '$lib/store/traveller';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type createTravellerData = {
    createTraveller: {
        traveller: Traveller
    };
};

export const post: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
        const query = `mutation createTraveller ($traveller: TravellerInput){
        createTraveller(input:{
          data: $traveller
        }) {
            traveller{
                id
            }
          }
      }
    `;
        const res = await client.mutation<createTravellerData>(query, { traveller: request.body }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error create data for the traveller', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error creating data for the traveller');
};
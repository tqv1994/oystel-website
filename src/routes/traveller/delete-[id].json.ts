import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Experience } from '$lib/store/experience';
import { subTravellerFieldsFragment, Traveller, travellerFieldsFragment } from '$lib/store/traveller';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { visaFieldsFragment } from '$lib/store/visa';
import { salutationTypeFieldsFragment } from '$lib/store/salutation-type';
import { identificationFieldsFragment } from '$lib/store/identification';
import { countryFieldsFragment } from '$lib/store/country';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type deleteTravellerData = {
    deleteTraveller: {
        traveller: Traveller
    };
};

export const del: RequestHandler = async (request: Request) => {
    try {
        const client = createGraphClientFromRequest(request);
        const query = `mutation deleteTraveller ($id: ID!){
        deleteTraveller(input:{
            where: {id: $id},
            }) {
                traveller{
                    id
                }
            }
        }
    `;
        const res = await client.mutation<deleteTravellerData>(query, {id:request.params.id || '' }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error delete data for the traveller', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error deleting data for the traveller');
};
import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { Identification, identificationFieldsFragment } from '$lib/store/identification';
import { countryFieldsFragment } from '$lib/store/country';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type updateIdentificationData = {
    updateIdentification: {
        identification: Identification
    };
};

export const put: RequestHandler = async (
    event) => {
    try {
        const client = createGraphClientFromRequest(event.request);
        const query = `mutation updateIdentification ($id: ID!,$identification: editIdentificationInput){
        updateIdentification(input:{
            where: {id: $id},
            data: $identification
            }) {
                identification{
                    ...identificationFields
                }
            }
        }
        ${uploadFileFieldsFragment}
        ${identificationFieldsFragment}
        ${countryFieldsFragment}
    `;
        const reqBody = await event.request.json();
        const res = await client.mutation<updateIdentificationData>(query, {id: event.params.id || "", identification: reqBody }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error update data for the identification', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error updating data for the identification');
};
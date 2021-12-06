import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
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
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
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
        const res = await client.mutation<updateIdentificationData>(query, {id: request.params.id || "", identification: request.body }).toPromise();
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
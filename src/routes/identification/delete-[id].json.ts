import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Identification } from '$lib/store/identification';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type deleteIdentificationData = {
    deleteIdentification: {
        identification: Identification
    };
};

export const del: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
        const query = `mutation deleteIdentification ($id: ID!){
        deleteIdentification(input:{
            where: {id: $id},
            }) {
                identification{
                    id
                }
            }
        }
    `;
        const res = await client.mutation<deleteIdentificationData>(query, {id: request.params.id || "" }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error delete identification', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error delete identification');
};
import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { countryFieldsFragment } from '$lib/store/country';
import { Address, addressFieldsFragment } from '$lib/store/address';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type updateAddressData = {
    updateAddress: {
        address: Address
    };
};

export const put: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
        const query = `mutation updateAddress ($id: ID!,$address: editAddressInput){
        updateAddress(input:{
            where: {id: $id},
            data: $address
            }) {
                address{
                    ...addressFields
                }
            }
        }
        ${addressFieldsFragment}
        ${countryFieldsFragment}
    `;
    console.log(query);
        const res = await client.mutation<updateAddressData>(query, {id: request.params.id || '', address: request.body }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error update data for the address', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error updating data for the address');
};
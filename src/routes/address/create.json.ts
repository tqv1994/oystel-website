import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Address } from '$lib/store/address';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type createAddressData = {
  createAddress: {
    address: Address;
  };
};

export const post: RequestHandler = async (event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation createAddress ($address: AddressInput){
        createAddress(input:{
          data: $address
        }) {
            address{
                id
            }
        }
      }
    `;
    const res = await client
      .mutation<createAddressData>(query, { address: await event.request.json() })
      .toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error create data for the address', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error creating data for the address',
  );
};

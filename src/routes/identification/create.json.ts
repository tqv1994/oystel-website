import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import {
  Identification,
  identificationFieldsFragment,
} from '$lib/store/identification';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { countryFieldsFragment } from '$lib/store/country';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type createIdentificationData = {
  createIdentification: {
    identification: Identification;
  };
};

export const post: RequestHandler = async (event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation createIdentification ($identification: IdentificationInput){
        createIdentification(input:{
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
    const res = await client
      .mutation<createIdentificationData>(query, { identification: reqBody })
      .toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error create data for the identification', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error creating data for the identification',
  );
};

import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { Experience, experienceFieldsFragment } from '$lib/store/experience';
import { Destination, destinationFieldsFragment } from '$lib/store/destination';
import { Product, productFieldsFragment } from '$lib/store/product';
import { countryFieldsFragment } from '$lib/store/country';

export type QueryLikeResult = {
    products: Product[];
    destinations: Destination[];
    experiences: Experience[];
}
const query = `
query {
  products {
    ...productFields
  }
  destinations{
      ...destinationFields
  }
  experiences{
      ...experienceFields
  }
}
${uploadFileFieldsFragment}
${destinationFieldsFragment}
${destinationTypeFieldsFragment}
${experienceFieldsFragment}
${experienceTypeFieldsFragment}
${productFieldsFragment}
${countryFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
    try {
        const client = createGraphClientFromRequest(request);
        const res = await client.query<QueryLikeResult>(query, request).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        console.log(res);
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error getting wishlist listing', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error getting wishlist listing');
};

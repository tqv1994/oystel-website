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
import { User } from '$lib/store/auth';

export type QueryLikeResult = {
    products: Product[];
    destinations: Destination[];
    experiences: Experience[];
}
const query = `
query ($productLikeIds: [ID], $experienceLikeIds: [ID], $destinationLikeIds: [ID]){
  products (where: {id: $productLikeIds}) {
    ...productFields
  }
  destinations (where: {id: $destinationLikeIds}){
      ...destinationFields
  }
  experiences (where: {id: $experienceLikeIds}){
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
        let me: User = request.locals.user;
        const res = await client.query<QueryLikeResult>(query,
            {
                productLikeIds: me?.productLikes.length > 0 ? me?.productLikes.map((item) => item.id) : null,
                experienceLikeIds: me?.experienceLikes.length > 0 ? me?.experienceLikes.map(item => item.id) : null,
                destinationLikeIds: me?.destinationLikes.length > 0 ? me?.destinationLikes.map(item => item.id) : null
            }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error getting wishlist listing', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error getting wishlist listing');
};

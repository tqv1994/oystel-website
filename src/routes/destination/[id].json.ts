import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Destination, destinationFieldsFragment } from '$lib/store/destination';
import { attractionFieldsFragment } from '$lib/store/attraction';
import { restaurantFieldsFragment } from '$lib/store/restaurant';
import { accommodationFieldsFragment } from '$lib/store/accommodation';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { productFieldsFragment } from '$lib/store/product';
import { countryFieldsFragment } from '$lib/store/country';
import { lookFieldsFragment } from '$lib/store/look';
import { experienceFieldsFragment } from '$lib/store/experience';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';

const query = `
query($id: ID!) {
  destination(id: $id) {
    ...destinationFields
    type1 {
      ...destinationTypeFields
    }
    type2 {
      ...destinationTypeFields
    }
    type3 {
      ...destinationTypeFields
    }
    experiences {
      ...experienceFields
    }
    looks {
      ...lookFields
    }
    pack {
      ...productFields
    }
    accommodations {
      ...accommodationFields
    }
    restaurants {
      ...restaurantFields
    }
    attractions {
      ...attractionFields
    }
  }
}
${destinationTypeFieldsFragment}
${destinationFieldsFragment}
${experienceFieldsFragment}
${experienceTypeFieldsFragment}
${lookFieldsFragment}
${countryFieldsFragment}
${productFieldsFragment}
${uploadFileFieldsFragment}
${attractionFieldsFragment}
${restaurantFieldsFragment}
${accommodationFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<{destination: Destination}>(query, event.params).toPromise();
    if (res.data?.destination) {
      return {
        body: JSON.stringify(res.data.destination),
      };
    }
    if (res.error) {
      console.error('Query rejected by server', event.params, query, JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting destination', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the destination');
};

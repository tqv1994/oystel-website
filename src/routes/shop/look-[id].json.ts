import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { Look, lookFieldsFragment } from '$lib/store/look';
import { productFieldsFragment } from '$lib/store/product';

const query = `
query($id: ID!) {
  look(id: $id) {
    ...lookFields
    products {
      ...productFields
    }
  }
}
${lookFieldsFragment}
${productFieldsFragment}
${uploadFileFieldsFragment}
`;
console.log(query);
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<{look: Look}>(query, event.params).toPromise();
    if (res.data?.look) {
      return {
        body: JSON.stringify(res.data.look),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting look detail', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the look detail');
};

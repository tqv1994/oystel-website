import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { Look, lookFieldsFragment } from '$lib/store/look';

type LookQueryResult = {
  looks: Look[];
}


/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query ($limit: Int){
      looks(limit: $limit,sort: "id:desc"){
        ...lookFields
      }
    }
    ${lookFieldsFragment}
    ${uploadFileFieldsFragment}
    `;
    const res = await client.query<LookQueryResult>(query, {limit: request.params['limit'] || 5 }).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data.looks),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting looks', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the look');
};

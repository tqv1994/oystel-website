import { RequestHandler } from '@sveltejs/kit';
import { createGraphClient } from '$lib/api/graph';
import { MetadataData } from '$lib/api/pages/type';
import { makeErrorResponse } from '$lib/api/utils';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async () => {
  try {
    const client = createGraphClient();
    const query = `query {
      countries (sort: "name:asc") {
        id
        name
        code
        phone
      }
      destinationTypes {
        id
        name
      }
      experienceTypes {
        id
        name
      }
      specialties {
        id
        name
      }
    } 
  `;
    const res = await client.query<MetadataData>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    } else if (res.error) {
      return makeErrorResponse(500, res.error.message);
    }
  } catch (error) {
    return makeErrorResponse(500, error);
  }
  return makeErrorResponse(500, 'Error retrieving metadata');
};

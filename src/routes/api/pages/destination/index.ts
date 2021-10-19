import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { DestinationData } from '$lib/api/pages/type';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query {
      destinationTypes(where: { destinations_null: false }) {
        id
        name
        destinations(limit: 3, sort: "published_at:desc") {
          id
          name
          description
          intro
          gallery {
            ...uploadFileFields
          }
          country {
            ...countryFields
          }
          users{
            id
          }
        }
      }
      countries {
        ...countryFields
      }
    }
    fragment countryFields on Country {
      id
      name
      code
      phone
    }
    fragment uploadFileFields on UploadFile {
      id
      name
      alternativeText
      caption
      blurHash
      width
      height
      formats
      hash
      size
      url
      previewUrl
    }
    
    `;
    const res = await client.query<DestinationData>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting destinations', error);
  }
  return makeErrorResponse(500, 'Error retrieving data for the destinations');
};

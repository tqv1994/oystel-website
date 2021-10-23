import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { DestinationData } from '$lib/api/pages/type';
import { DestinationType } from '$lib/api/destination-type/type';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const post: RequestHandler = async (request: Request<Record<string, any>, AuthForm>) => {
  let destinationTypes: DestinationType[] = request.body || [];
  let queryString = '';
  for(let destinationType of destinationTypes){
    queryString += ` destinationType_${destinationType.id}: destinations (limit: 3, sort: "published_at:desc", where: {destination_type: {id: ${destinationType.id}}})
      {
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
      }`;
  }
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query {
        ${queryString}
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

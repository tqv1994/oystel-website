import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { stringHelper } from '$lib/helpers';
import { ExperiencesSearchData } from '$lib/store/pages';
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query ($where: JSON){
      experiences(
        sort: "published_at:desc",
        where: $where
      ) {
        id
        name
        description
        gallery {
          ...uploadFileFields
        }
        country {
          ...countryFields
        }
      },
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
    const res = await client.query<ExperiencesSearchData>(query,{where:stringHelper.queryURLParamToJSON(request.query.toString())}).toPromise();
    if(res.data){
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting experiences', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the experiences');
};
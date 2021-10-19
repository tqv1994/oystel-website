import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { stringHelper } from '$lib/helpers';
import { ExperiencesSearchData } from '$lib/api/pages/type';
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
        users{
          id
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
    const res = await client.query<ExperiencesSearchData>(query,{where:stringHelper.queryURLParamToJSON(request.query)}).toPromise();
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
  return makeErrorResponse(500, 'Error retrieving data for the experiences');
};
import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { ExperiencePageData } from '$lib/api/pages/type';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query($id: ID!, $user_id: ID) {
      experience(id: $id) {
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
        users {
          id
        }
      },
      products(sort: "published_at:desc", limit: 10) {
        id
        brand
        name
        description
        price
        intro
        gallery {
          ...uploadFileFields
        }
        users {
          id
        }
      }
      experiences(sort: "published_at:desc",limit: 3, where: {id_ne: $id, users: {id: $user_id}}) {
        id
        name
        intro
        gallery {
          ...uploadFileFields
        }
        country {
          ...countryFields
        }
        users {
          id
        }
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
    const res = await client.query<ExperiencePageData>(query,{id:request.query.get('id'),user_id: request.query.get('user_id')}).toPromise();
    if(res.data){
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting details experiences', error);
  }
  return makeErrorResponse(500, 'Error retrieving data for the details experiences');
};

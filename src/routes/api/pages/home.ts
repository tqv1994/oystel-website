import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { HomePageData } from '$lib/api/pages/type';
import { makeErrorResponse } from '$lib/api/utils';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query{
      drops( limit:7, sort: "published_at:desc" ){
        id
        name
        description
        products {
          ...productFields
        }
        gallery {
          ...uploadFileFields
        }
      }
      experiences(limit: 7, sort: "published_at:desc"){
        id
        name
        description
        intro
        gallery {
          ...uploadFileFields
        }
        country {
          ...countryFields
        },
        users{
          id
        }
      }
      destinations(limit: 4, sort: "published_at:desc"){
        id
        name
        description
        intro
        location
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
    fragment countryFields on Country {
      id
      name
      code
      phone
    }
    fragment productFields on Product {
      id,
      name,
      description,

      brand,
      price
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
    const res = await client.query<HomePageData>(query).toPromise();
    if (res.data) {
      // console.log(JSON.stringify(res.data, null, 2));
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting home page', error);
  }
  return makeErrorResponse(500, 'Error retrieving data for the home page');
};

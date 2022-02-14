import { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';

import { Category } from '$lib/store/category';
import { Experience } from '$lib/store/experience';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const post: RequestHandler = async (event) => {
  const reqBody = await event.request.json();
  const experienceTypes: Category[] = reqBody || [];
  let queryString = '';
  for (const experienceType of experienceTypes) {
    queryString += ` experienceType_${experienceType.id}: experiences (limit: 3, sort: "published_at:desc", where: {type: {id: ${experienceType.id}}})
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
      }`;
  }
  try {
    const client = createGraphClientFromRequest(event.request);
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
    console.log(query);
    const res = await client.query<Experience>(query).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting experiences', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error retrieving data for the experiences',
  );
};

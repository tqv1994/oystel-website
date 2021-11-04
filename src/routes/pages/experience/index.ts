import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { ExperiencesData } from '$lib/store/pages';
import { ExperienceType } from '$lib/store/experience-type';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const post: RequestHandler = async (request: Request<Record<string, any>, AuthForm>) => {
  let experienceTypes: ExperienceType[] = request.body || [];
  let queryString = '';
  for(let experienceType of experienceTypes){
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
    console.log(query);
    const res = await client.query<ExperiencesData>(query).toPromise();
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

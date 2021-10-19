import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { makeErrorResponse } from '$lib/api/utils';
import { ExperienceData } from '$lib/api/experience/type';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query {
      experiences(
        limit: 3
        sort: "published_at:desc"
        where: { experience_type_null: false }
      ) {
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
        experience_type {
          ...experienceTypeFields
        }
      }
      destinations(limit: 4, sort: "published_at:desc") {
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
      }
      destinationTypes(sort: "published_at:desc") {
        ...destinationsTypeFields
      }
    }
    fragment destinationsTypeFields on DestinationType {
      id
      name
    }
    fragment experienceTypeFields on ExperienceType {
      id
      name
      created_at
      updated_at
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
    const res = await client.query<ExperienceData>(query).toPromise();
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
    console.error('Error getting experiences', error);
  }
  return makeErrorResponse(500, 'Error retrieving data for the experiences');
};

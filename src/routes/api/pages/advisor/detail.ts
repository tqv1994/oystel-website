import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { AdvisorPageData, AdvisorsPageData, HomePageData } from '$lib/api/pages/type';
import { makeErrorResponse } from '$lib/api/utils';
import { stringHelper } from '$lib/helpers';
import { Advisor } from '$lib/api/advisor/type';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query($id: ID!) {
      advisor(id: $id) {
        id
        bio
        userMe {
          ...userFields
        }
        specialities {
          ...specialtyFields
        }
        countries {
          ...countryFields
        }
        destinations {
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
        experiences {
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
        }
        address {
          id
          line1
          line2
          locality
          city
          country {
            ...countryFields
          }
          province
        }
        languages {
          id
          name
        }
      }
    }
    fragment specialtyFields on Specialty {
      id
      name
    }
    fragment countryFields on Country {
      id
      name
    }
    fragment userFields on UsersPermissionsUser {
      id
      displayName
      location
      avatar {
        ...uploadFileFields
      }
      email
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
    const res = await client.query<AdvisorPageData>(query,{id:request.query.get('id')}).toPromise();
    if (res.data) {
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

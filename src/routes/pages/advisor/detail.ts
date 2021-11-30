import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query($id: ID!) {
      advisor(id: $id) {
        id
        description
        userMe {
          ...userFields
        }
        advisorTypes {
          ....advisorTypeFields
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
    fragment .advisorTypeFields on AdvisorType {
      id
      name
    }
    fragment countryFields on Country {
      id
      name
    }
    fragment userFields on UsersPermissionsUser {
      id
      name
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
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the home page');
};

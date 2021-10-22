import { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/api/graph';
import { AdvisorsPageData, HomePageData } from '$lib/api/pages/type';
import { makeErrorResponse } from '$lib/api/utils';
import { stringHelper } from '$lib/helpers';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `query($where: JSON){
      advisors( sort: "id:desc", where: $where ){
        id
    		userMe {
          ...userFields
        }
        specialities {
          ...specialtyFields
        }
        countries {
          ...countryFields
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
    const res = await client.query<AdvisorsPageData>(query,{where:stringHelper.queryURLParamToJSON(request.query.toString())}).toPromise();
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

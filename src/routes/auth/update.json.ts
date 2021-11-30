import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { Destination } from '$lib/store/destination';
import { User, userFieldsFragment } from '$lib/store/auth';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { subTravellerFieldsFragment, travellerFieldsFragment } from '$lib/store/traveller';
import { visaFieldsFragment } from '$lib/store/visa';
import { salutationFieldsFragment } from '$lib/store/salutation';
import { identificationFieldsFragment } from '$lib/store/identification';
import { countryFieldsFragment } from '$lib/store/country';
import { advisorFieldsFragment } from '$lib/store/advisor';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type UpdateUserData = {
  updateUser: {
    user: User
  };
};

export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>) => {
  try {
    const client = createGraphClientFromRequest(request);
    const query = `mutation updateMe ($id: ID!, $me: editUserInput){
        updateUser(input:{
          where: {id: $id},
          data: $me
        }) {
            user{
                ...userFields
            }
          }
      }
      ${userFieldsFragment}
      ${uploadFileFieldsFragment}
      ${travellerFieldsFragment}
      ${visaFieldsFragment}
      ${salutationFieldsFragment}
      ${identificationFieldsFragment}
      ${countryFieldsFragment}
      ${subTravellerFieldsFragment}
    `;
    const res = await client.mutation<UpdateUserData>(query, { id: request.locals.user?.id, me: request.body }).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting destinations', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the destinations');
};
import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience, experienceFieldsFragment } from '$lib/store/experience';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { countryFieldsFragment } from '$lib/store/country';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type ExperienceLikeData = {
  updateUser: {
    user: {
      experienceLikes: Experience[]
    }
  };
};

export const put: RequestHandler = async (
  event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation me ($id: ID!, $experienceLikes: [ID]){
        updateUser(input:{
          where:{id: $id},
          data:{ experienceLikes:$experienceLikes}
        }) {
            user{
                experienceLikes{
                  id
              }
            }
          }
      }
    `;
    const reqBody = await event.request.json();
    const res = await client.mutation<ExperienceLikeData>(query, { id: event.locals.user?.id, experienceLikes: reqBody }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting experiences', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the experiences');
};
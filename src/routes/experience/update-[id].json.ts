import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Experience } from '$lib/store/experience';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type UpdateExperienceData = {
  updateExperience: {
    experience: Experience
  };
};

export const put: RequestHandler = async (
  event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation updateExperience ($id: ID!, $experience: editExperienceInput){
        updateExperience(input:{
          where: {id: $id},
          data: $experience
        }) {
            experience{
                id
                num_views
            }
          }
      }
    `;
    const reqBody = await event.request.json();
    let params = reqBody.num_views ? {num_views: reqBody.num_views} : {};
    const res = await client.mutation<UpdateExperienceData>(query, { id: event.params['id'], experience: params }).toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data.updateExperience?.experience));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error updating experience', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the experience');
};
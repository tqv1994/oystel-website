import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { PersonalPreference, personalPreferenceFieldsFragment } from '$lib/store/preference';
import { Rec } from '@sveltejs/kit/types/helper';

/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
        const data = request.body;
        const query = `
        mutation{
            updateTraveller(input:{
              where:{id:${data.id}}
              data:{personalPreferences:[${data.personalPreferences}]}
            }){
              traveller{
                personalPreferences{
                  ...personalPreferenceFields
                }
              }
            }
          }
          ${personalPreferenceFieldsFragment}
        `;
        const res = await client.mutation<{ traveller: { personalPreferences: PersonalPreference } }>(query).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error getting personal preference', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the personal preference');
};
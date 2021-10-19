import { RequestHandler, Request } from '@sveltejs/kit';
import {
  destinationQuery,
  destinationTypeQuery,
  experienceQuery,
  experienceTypeQuery,
  menuQuery,
  uploadFileQuery,
} from '$lib/api/queries';
import { createGraphClient } from '$lib/api/graph';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClient(request);
    const query = `query{
          menus(sort: "order:asc" ){
            ${menuQuery},
            destination_types(sort: "id:asc") {
              ${destinationTypeQuery}
              destinations(limit: 1, sort: "published_at:desc"){
                ${destinationQuery}
                gallery{${uploadFileQuery}}
              }
            }
            experience_types(sort: "id:asc") {
              ${experienceTypeQuery}
              experiences(limit: 1, sort: "published_at:desc"){
                ${experienceQuery}
               gallery{ ${uploadFileQuery}}
              }
            }
          },
        }
      `;
    const res = await client.query<any>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
  } catch (error) {
    console.error('Error getting home page', error);
  }
  return {
    status: 500,
    body: 'Error retrieving data for the menu',
  };
};

import { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { experienceFieldsFragment, experienceGalleryFieldsFragment } from '$lib/store/experience';
import { countryFieldsFragment } from '$lib/store/country';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { dropFieldsFragment, dropGalleryFieldsFragment } from '$lib/store/drop';
import { destinationFieldsFragment, destinationGalleryFieldsFragment } from '$lib/store/destination';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { productFieldsFragment } from '$lib/store/product';
import { bannerFieldsFragment } from '$lib/store/banner';
import { actionFieldsFragment } from '$lib/store/action';
import { featuredDropFieldsFragment, pageFieldsFragment, PageQueryResult } from '$lib/store/page';


type QueryResult = {
  editorialPage: PageQueryResult;
};

const query = `query {
  editorialPage {
    page {
      ...pageFields
    }
  }
}
${dropFieldsFragment}
${experienceFieldsFragment}
${destinationFieldsFragment}
${experienceTypeFieldsFragment}
${destinationTypeFieldsFragment}
${countryFieldsFragment}
${productFieldsFragment}
${uploadFileFieldsFragment}
${dropGalleryFieldsFragment}
${experienceGalleryFieldsFragment}
${destinationGalleryFieldsFragment}
${featuredDropFieldsFragment}
${bannerFieldsFragment}
${actionFieldsFragment}
${pageFieldsFragment}
`;

export type EditorialPageData = PageQueryResult;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  // console.log(query)
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<QueryResult>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data.editorialPage),
      };
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting editorial page', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving data for the editorial page');
};

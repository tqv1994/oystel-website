import { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { dropFieldsFragment, dropGalleryFieldsFragment } from '$lib/store/drop';
import {
  experienceFieldsFragment,
  experienceGalleryFieldsFragment,
} from '$lib/store/experience';
import {
  destinationFieldsFragment,
  destinationGalleryFieldsFragment,
} from '$lib/store/destination';
import { countryFieldsFragment } from '$lib/store/country';
import { productFieldsFragment, productGalleryFieldsFragment } from '$lib/store/product';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { bannerFieldsFragment } from '$lib/store/banner';
import { actionFieldsFragment } from '$lib/store/action';
import { featuredDropFieldsFragment, Page, pageFieldsFragment, PageQueryResult } from '$lib/store/page';
import { lookFieldsFragment, lookGalleryFieldsFragment } from '$lib/store/look';

export type CuratedLooksPageData = PageQueryResult;

type QueryResult = {
  pages: Page[];
};

const query = `query($slug: String) {
  pages (where:{name: $slug}){
      ...pageFields
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
${lookGalleryFieldsFragment}
${lookFieldsFragment}
${featuredDropFieldsFragment}
${bannerFieldsFragment}
${actionFieldsFragment}
${pageFieldsFragment}
${productGalleryFieldsFragment}
`;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<QueryResult>(query,{slug: 'Shop'}).toPromise();
    if (res.data) {
      if (res.data.pages) {
        return {
          body: JSON.stringify(res.data.pages.length > 0 ? res.data.pages[0] : null),
        };
      }
      console.log('Home page could not be read - perhaps a permission issue?')
    }
    if (res.error) {
      console.log('Res error:', JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting page', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error retrieving data for the page',
  );
};

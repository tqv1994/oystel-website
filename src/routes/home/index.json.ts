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
import { productFieldsFragment } from '$lib/store/product';
import { UploadFile, uploadFileFieldsFragment } from '$lib/store/upload-file';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { bannerFieldsFragment } from '$lib/store/banner';
import { actionFieldsFragment } from '$lib/store/action';
import { featuredDropFieldsFragment, pageFieldsFragment, PageQueryResult } from '$lib/store/page';

export type HomePageData = PageQueryResult & {
  gallery: UploadFile[];
};

type QueryResult = {
  homePage: HomePageData;
};

const query = `query {
  homePage {
    gallery {
      ...uploadFileFields
    }
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
${bannerFieldsFragment}
${actionFieldsFragment}
${pageFieldsFragment}
${featuredDropFieldsFragment}
`;

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const res = await client.query<QueryResult>(query).toPromise();
    if (res.data) {
      if (res.data.homePage) {
        return {
          body: JSON.stringify(res.data.homePage),
        };
      }
      console.log('Home page could not be read - perhaps a permission issue?')
    }
    if (res.error) {
      console.log('Res error:', JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting home page', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error retrieving data for the home page',
  );
};

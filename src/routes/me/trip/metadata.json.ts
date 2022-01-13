import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { RoomStyle, roomStyleFieldsFragment, roomStyleTypeFieldsFragment } from '$lib/store/roomStyle';
import { LodgingType, lodgingTypeFieldsFragment } from '$lib/store/lodgingType';
import { RoomPreference, roomPreferenceFieldsFragment } from '$lib/store/roomPreference';
import { Currency, currencyFieldsFragment } from '$lib/store/currency';
import { TravelingWithYou, travelingWithYouFieldsFragment } from '$lib/store/travelingWithYous';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { Experience } from '$lib/store/experience';
import { Category } from '$lib/store/category';

export type MetaDataTripQuery = {
    roomStyles: RoomStyle[]
    roomPreferences: RoomPreference[]
    lodgingTypes: LodgingType[]
    currencies: Currency[]
    travelingWithYous: TravelingWithYou[];
    experiences: Experience[];
};

const query = `
    query {
        roomStyles {
            ...roomStyleFields
        }
        lodgingTypes {
            ...lodgingTypeFields
        }
        roomPreferences {
            ...roomPreferenceFields
        }
        currencies {
            ...currencyFields
        }
        travelingWithYous {
            ...travelingWithYouFields
        }
        experiences{
          id
          name
          type1{
            id
            name
          }
        }
    }
    ${roomStyleFieldsFragment}
    ${roomStyleTypeFieldsFragment}
    ${uploadFileFieldsFragment}
    ${lodgingTypeFieldsFragment}
    ${roomPreferenceFieldsFragment}
    ${currencyFieldsFragment}
    ${travelingWithYouFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const client = createGraphClientFromRequest(request);
    const res = await client.query<MetaDataTripQuery>(query).toPromise();
    if (res.data) {
      return {
        body: JSON.stringify(res.data),
      };
    }
    if (res.error) {
      console.error('Query rejected by server', query, JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error getting meta data for the plan', error);
  }
  return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error retrieving meta data for the plan');
};

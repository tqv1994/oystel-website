import type { RequestHandler } from '@sveltejs/kit';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import {
  subTravellerFieldsFragment,
  travellerFieldsFragment,
} from '$lib/store/traveller';
import { visaFieldsFragment } from '$lib/store/visa';
import { salutationTypeFieldsFragment } from '$lib/store/salutation-type';
import { identificationFieldsFragment } from '$lib/store/identification';
import { countryFieldsFragment } from '$lib/store/country';
import type { Trip } from '$lib/store/trip';
import { tripFieldsFragment } from '$lib/store/trip';
import { destinationFieldsFragment } from '$lib/store/destination';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { docmentFieldsFragment } from '$lib/store/document';
import { insuranceFieldsFragment } from '$lib/store/insurance';
import { interestFieldsFragment } from '$lib/store/interest';
import {
  personalPreferenceFieldsFragment,
  travelPreferenceFieldsFragment,
} from '$lib/store/preference';
import { languageFieldsFragment } from '$lib/store/language';
import { experienceFieldsFragment } from '$lib/store/experience';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { lodgingTypeFieldsFragment } from '$lib/store/lodgingType';
import {
  roomStyleFieldsFragment,
  roomStyleTypeFieldsFragment,
} from '$lib/store/roomStyle';
import { roomPreferenceFieldsFragment } from '$lib/store/roomPreference';
import { currencyFieldsFragment } from '$lib/store/currency';

export type createTripData = {
  createTrip: {
    trip: Trip;
  };
};

export const post: RequestHandler = async (event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation ($trip: TripInput){
        createTrip(input:{
            data: $trip
            }) {
                trip{
                    ...tripFields
                }
            }
        }
        ${tripFieldsFragment}
        ${destinationFieldsFragment}
        ${destinationTypeFieldsFragment}
        ${uploadFileFieldsFragment}
        ${travellerFieldsFragment}
        ${docmentFieldsFragment}
        ${insuranceFieldsFragment}
        ${visaFieldsFragment}
        ${salutationTypeFieldsFragment}
        ${identificationFieldsFragment}
        ${countryFieldsFragment}
        ${subTravellerFieldsFragment}
        ${interestFieldsFragment}
        ${travelPreferenceFieldsFragment}
        ${personalPreferenceFieldsFragment}
        ${addressFieldsFragment}
        ${languageFieldsFragment}
        ${experienceFieldsFragment}
        ${experienceTypeFieldsFragment}
        ${lodgingTypeFieldsFragment}
        ${roomStyleFieldsFragment}
        ${roomStyleTypeFieldsFragment}
        ${roomPreferenceFieldsFragment}
        ${currencyFieldsFragment}
        ${travelingWithYouFieldsFragment}
    `;
    // console.log(query);
    const reqBody = await event.request.json();
    const res = await client
      .mutation<createTripData>(query, { trip: reqBody })
      .toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data.createTrip.trip));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error create data for the trip', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error creating data for the trip',
  );
};

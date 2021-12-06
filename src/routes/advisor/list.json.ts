import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { countryFieldsFragment } from '$lib/store/country';
import { advisorTypeFieldsFragment } from '$lib/store/advisor-type';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { languageFieldsFragment } from '$lib/store/language';
import { Advisor, advisorPrivateFieldsFragment } from '$lib/store/advisor';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { experienceFieldsFragment } from '$lib/store/experience';
import { destinationFieldsFragment } from '$lib/store/destination';
import { tripFieldsFragment } from '$lib/store/trip';
import { subTravellerFieldsFragment, travellerFieldsFragment } from '$lib/store/traveller';
import { docmentFieldsFragment } from '$lib/store/document';
import { insuranceFieldsFragment } from '$lib/store/insurance';
import { visaFieldsFragment } from '$lib/store/visa';
import { salutationFieldsFragment } from '$lib/store/salutation';
import { identificationFieldsFragment } from '$lib/store/identification';
import { addressFieldsFragment } from '$lib/store/address';
import { affiliateAgencyFieldsFragment, affiliateBenefitProgramFieldsFragment, affiliateNetworkFieldsFragment } from '$lib/store/affiliate';
import { subUserFieldsFragment, userFieldsFragment } from '$lib/store/auth';
import { stringHelper } from '$lib/helpers';

const query = `
query($params: JSON) {
  advisors(where: $params) {
    ...advisorFields
  }
}
fragment advisorFields on Advisor {
    id
    name,
    avatar {
      ...uploadFileFields
    }
    description
    accept
    planningFee
    instagram
    twitter
    facebook
    linkedIn
    pinterest
    agency {
      ...agencyFields
    }
    active
    reference
    website
    timezone
    joined_at
    email2
    address {
      ...addressFields
    }
    language1 {
      ...languageFields
    }
    language2 {
      ...languageFields
    }
    language3 {
      ...languageFields
    }
    affiliate_agencies {
      ...affiliateAgencyFields
    }
    affiliate_networks {
      ...affiliateNetworkFields
    }
    affiliate_benefit_programs {
      ...affiliateBenefitProgramFields
    }
    trips {
      id
      depart_at
      return_at
      state
    }
    type1 {
      ...advisorTypeFields
    }
    type2 {
      ...advisorTypeFields
    }
    type3 {
      ...advisorTypeFields
    }
    country {
      ...countryFields
    }
    phone_number
  }
${languageFieldsFragment}
${countryFieldsFragment}
${advisorTypeFieldsFragment}
${affiliateAgencyFieldsFragment}
${affiliateBenefitProgramFieldsFragment}
${affiliateNetworkFieldsFragment}
${addressFieldsFragment}
${uploadFileFieldsFragment}

fragment agencyFields on Agency {
    id
}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
    try {
        const client = createGraphClientFromRequest(request);
        const res = await client.query<{ advisors: Advisor[] }>(query, {params: stringHelper.queryURLParamToJSON(request.query.toString())}).toPromise();
        if (res.data?.advisors) {
            return {
                body: JSON.stringify(res.data.advisors),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error getting advisors listing', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error getting advisors listing');
};

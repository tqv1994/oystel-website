import type { ResponseHeaders } from '@sveltejs/kit/types/helper';
import { createGraphClient } from '$lib/utils/graph';
import { GetSession, Handle } from '@sveltejs/kit';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { getSessionCookie } from '$lib/utils/session';
import { advisorTypeFieldsFragment } from '$lib/store/advisor-type';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { languageFieldsFragment } from '$lib/store/language';
import { countryFieldsFragment } from '$lib/store/country';
import { Locals } from '$lib/store/locals';
import { User } from '$lib/store/auth';
import { makeErrorResponse } from '$lib/utils/fetch';
import { destinationFieldsFragment } from '$lib/store/destination';
import { advisorFieldsFragment } from '$lib/store/advisor';
import { experienceFieldsFragment } from '$lib/store/experience';
import { Metadata } from '$lib/store/metadata';
import { subTravellerFieldsFragment, travellerFieldsFragment } from '$lib/store/traveller';
import { visaFieldsFragment } from '$lib/store/visa';
import { salutationTypeFieldsFragment } from '$lib/store/salutation-type';
import { identificationFieldsFragment } from '$lib/store/identification';
import { interestFieldsFragment, interestTypeFieldsFragment } from '$lib/store/interest';
import { productFieldsFragment } from '$lib/store/product';
import { addressFieldsFragment } from '$lib/store/address';
import { personalPreferenceFieldsFragment, personalPreferenceTypeFieldsFragment, travelPreferenceFieldsFragment, travelPreferenceTypeFieldsFragment } from '$lib/store/preference';

type QueryData = {
  me?: User;
};

const meQuery = `query {
  me {
    id
    name
    username
    email
    confirmed
    blocked
    role {
      name
      description
    }
    avatar {
      ...uploadFileFields
    }
    destinationLikes {
      id
      name
    }
    experienceLikes {
      id
      name
    }
    productLikes {
      ...productFields
    }
    myAdvisors {
      id
      name
      avatar {
        ...uploadFileFields
      }
    }
    travellerMe {
      ...travellerFields
    }
    advisorMe {
      id
    },
    neverMissADrop
    curatedForYou
  }
}
${uploadFileFieldsFragment}
${travellerFieldsFragment}
${visaFieldsFragment}
${salutationTypeFieldsFragment}
${identificationFieldsFragment}
${countryFieldsFragment}
${subTravellerFieldsFragment}
${interestFieldsFragment}
${productFieldsFragment}
${addressFieldsFragment}
${travelPreferenceFieldsFragment}
${personalPreferenceFieldsFragment}
`;

const metadataQuery = `query {
  advisorTypes {
    ...advisorTypeFields
  }
  destinationTypes {
    ...destinationTypeFields
  }
  experienceTypes {
    ...experienceTypeFields
  }
  countries {
    ...countryFields
  }
  languages {
    ...languageFields
  }
  feature {
    advisors {
      ...advisorFields
    }
    experiences {
      ...experienceFields
    }
    destinations {
      ...destinationFields
    }
  }
  salutationTypes {
    ...salutationTypeFields
  }
  interestTypes{
    ...interestTypeFields
  }
  travelPreferenceTypes{
    ...travelPreferenceTypeFields
  }
  personalPreferenceTypes{
    ...personalPreferenceTypeFields
  }
}
${destinationTypeFieldsFragment}
${experienceTypeFieldsFragment}
${advisorTypeFieldsFragment}
${languageFieldsFragment}
${countryFieldsFragment}
${advisorFieldsFragment}
${experienceFieldsFragment}
${destinationFieldsFragment}
${uploadFileFieldsFragment}
${salutationTypeFieldsFragment}
${interestTypeFieldsFragment}
${interestFieldsFragment}
${travelPreferenceTypeFieldsFragment}
${travelPreferenceFieldsFragment}
${personalPreferenceFieldsFragment}
${personalPreferenceTypeFieldsFragment}
`;

let counter = 0;
let metadata: Metadata;

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle<Locals> = async ({ request, resolve }) => {
  console.log('Handling', request.path, request.query.toString(), ++counter);

  if (metadata) {
    request.locals.metadata = metadata;
  } else {
    console.log('Loading metadata...');
    const client = createGraphClient();
    try {
      const res = await client.query<Metadata>(metadataQuery).toPromise();
      if (res.data) {
        metadata = res.data;
        request.locals.metadata = res.data;
      } else if (res.error) {
        console.error(res.error.message);
      }
    } catch (err) {
      console.error('Error fetching metadata', err);
    }
  }

  const headers: ResponseHeaders = {};
  if (!request.locals.user) {
    if (request.headers.cookie) {
      const cookie = getSessionCookie(request.headers.cookie);
      if (cookie) {
        console.log('Authenticating user from cookie...');
        try {
          const client = createGraphClient(cookie);
          const res = await client.query<QueryData>(meQuery).toPromise();
          if (res.error) {
            console.error('Failed to get session:', res.error.message);
            const setCookie = res.error.response.headers.getAll('set-cookie');
            if (setCookie) {
              headers['set-cookie'] = setCookie;
            }
          }
          request.locals.user = res.data?.me;
        } catch (err) {
          console.error('Error fetching profile', err);
        }
      }
    }
  }

  try {
    console.log('Resuming request...', request.path, counter);
    const response = await resolve(request);

    return {
      ...response,
      headers: {
        ...response.headers,
        ...headers,
      },
    };
  } catch (err) {
    return makeErrorResponse(
      500,
      'INTERNAL_SERVER_ERROR',
      `There was an error loading ${request.path}: ${err.message}`,
    );
  }
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession<Locals, unknown, Locals> = async (
  request,
) => {
  return request.locals;
};

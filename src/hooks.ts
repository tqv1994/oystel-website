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
import {
  subTravellerFieldsFragment,
  travellerFieldsFragment,
} from '$lib/store/traveller';
import { visaFieldsFragment } from '$lib/store/visa';
import { salutationTypeFieldsFragment } from '$lib/store/salutation-type';
import { identificationFieldsFragment } from '$lib/store/identification';
import {
  interestFieldsFragment,
  interestTypeFieldsFragment,
} from '$lib/store/interest';
import { productColourFieldsFragment, productDesignerFieldsFragment, productFieldsFragment, productTypeFieldsFragment, vacationStyleFieldsFragment } from '$lib/store/product';
import { addressFieldsFragment } from '$lib/store/address';
import {
  personalPreferenceFieldsFragment,
  personalPreferenceTypeFieldsFragment,
  travelPreferenceFieldsFragment,
  travelPreferenceTypeFieldsFragment,
} from '$lib/store/preference';

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
    }
    experienceLikes {
      id
    }
    productLikes {
      id
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
${addressFieldsFragment}
${travelPreferenceFieldsFragment}
${personalPreferenceFieldsFragment}
${languageFieldsFragment}
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
  productColours{
    ...productColourFields
  }
  productDesigners{
    ...productDesignerFields
  }
  productTypes{
    ...productTypeFields
  }
  vacationStyles{
    ...vacationStyleFields
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
${productColourFieldsFragment}
${productDesignerFieldsFragment}
${productTypeFieldsFragment}
${vacationStyleFieldsFragment}
`;

let counter = 0;
let metadata: Metadata;

/** @type {import('@sveltejs/kit').Handle} */

export const handle: Handle = async ({ event, resolve }) => {
  const request = event.request;
  console.log(
    'Handling',
    event.url.pathname,
    event.url.searchParams.toString(),
    ++counter,
  );

  if (metadata) {
    event.locals.metadata = metadata;
  } else {
    console.log('Loading metadata...');
    const client = createGraphClient();
    try {
      const res = await client.query<Metadata>(metadataQuery).toPromise();
      if (res.data) {
        metadata = res.data;
        event.locals.metadata = res.data;
      } else if (res.error) {
        console.error(res.error.message);
      }
    } catch (err) {
      console.error('Error fetching metadata', err);
    }
  }

  const headers: Record<string, string> = {};
  if (!event.locals.user) {
    const cookie = request.headers.get('cookie');
    if (cookie) {
      const sessionCookie = getSessionCookie(cookie);
      if (sessionCookie) {
        console.log('Authenticating user from cookie...');
        try {
          const client = createGraphClient(sessionCookie);
          const res = await client.query<QueryData>(meQuery).toPromise();
          if (res.error) {
            console.error('Failed to get session:', res.error.message);
            const setCookie = res.error.response.headers.getAll('set-cookie');
            console.log(setCookie);
            if (setCookie) {
              headers['set-cookie'] = setCookie;
            }
          }
          event.locals.user = res.data?.me;
        } catch (err) {
          console.error('Error fetching profile', err);
        }
      }
    }
  }

  try {
    console.log('Resuming request...', event.url.pathname, counter);
    const response = await resolve(event);
    const body = await response.text();

    for (const key in headers) {
      response.headers.set(key, headers[key]);
    }

    return new Response(body, response);
  } catch (err) {
    console.error('Error occurreeeedeed')
    return makeErrorResponse(
      500,
      'INTERNAL_SERVER_ERROR',
      `There was an error loading ${event.url.pathname}: ${err.message}`,
    );
  }
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession = async (event) => {
  return event.locals;
};

import { createGraphClient } from '$lib/utils/graph';
import { GetSession, Handle } from '@sveltejs/kit';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { getSessionCookie } from '$lib/utils/session';
import { specialityFieldsFragment } from '$lib/store/speciality';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { languageFieldsFragment } from '$lib/store/language';
import { countryFieldsFragment } from '$lib/store/country';
import { Metadata } from './routes/metadata.json';
import { Locals } from '$lib/store/locals';
import { User } from '$lib/store/auth';
import type { ResponseHeaders } from '@sveltejs/kit/types/helper';

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
    destination_likes {
      id
      name
    }
    experience_likes {
      id
      name
    }
    product_likes {
      id
      name
    }
    myAdvisors {
      id
      name
      avatar {
        ...uploadFileFields
      }
    }

    advisorMe {
      id
    }
  }
}
${uploadFileFieldsFragment}
`;

const metadataQuery = `query {
  specialities {
    ...specialityFields
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
}
${destinationTypeFieldsFragment}
${experienceTypeFieldsFragment}
${specialityFieldsFragment}
${languageFieldsFragment}
${countryFieldsFragment}
`;

let counter = 0;
let metadata: Metadata;

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle<Locals> = async ({ request, resolve }) => {
  console.log('Handling', request.path, request.query, ++counter);

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

  console.log('Resuming request...', request.path, counter);
  const response = await resolve(request);

  return {
    ...response,
    headers: {
      ...response.headers,
      ...headers,
    },
  };
};

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession<Locals, unknown, Locals> = async (
  request,
) => {
  return request.locals;
};

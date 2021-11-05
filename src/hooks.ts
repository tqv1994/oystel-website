import { createGraphClient } from '$lib/utils/graph';
import { GetSession, Handle } from '@sveltejs/kit';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { getSessionCookie } from '$lib/utils/session';
import { specialityFieldsFragment } from '$lib/store/speciality';
import { destinationTypeFieldsFragment } from '$lib/store/destination-type';
import { experienceTypeFieldsFragment } from '$lib/store/experience-type';
import { languageFieldsFragment } from '$lib/store/language';
import { countryFieldsFragment } from '$lib/store/country';
import { ResponseHeaders } from '@sveltejs/kit/types/helper';
import { Metadata } from './routes/metadata.json';
import { Locals } from '$lib/store/locals';

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
/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle<Locals> = async ({ request, resolve }) => {
  console.log('Handling', request.path, ++counter);

  if (!request.locals.metadata) {
    const client = createGraphClient();
    try {
      const res = await client.query<Metadata>(metadataQuery).toPromise();
      if (res.data) {
        request.locals.metadata = res.data;
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
        // console.log('we have session cookie...');
        try {
          const client = createGraphClient(cookie);
          const res = await client.query(meQuery).toPromise();
          if (res.error) {
            console.error('Failed to get session:', res.error.message);
            headers['set-cookie'] = res.error.response.headers['set-cookie'];
          }
          request.locals.user = res.data.me;
        } catch (err) {
          console.error('Error fetching profile', err);
        }
      }
    }
  }

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

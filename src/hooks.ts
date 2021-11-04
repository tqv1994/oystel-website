import { createGraphClient } from '$lib/utils/graph';
import { getSessionCookieFromRequest } from '$lib/session';
import { GetSession } from '@sveltejs/kit';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';

const query = `
query {
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

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession: GetSession = async (request) => {
  // console.log('session', request.locals.user?.email);
  if (!request.locals.user) {
    // console.log('user not in session...');
    const cookie = getSessionCookieFromRequest(request);
    if (cookie) {
      // console.log('we have session cookie...');
      try {
        const client = createGraphClient(cookie);
        const res = await client.query(query).toPromise();
        if (res.error) {
          // console.log(res);
          console.error(res.error);
          request.locals.user = undefined;
          return request.locals;
        }
        request.locals.user = res.data.me;
      } catch (err) {
        console.error('Error fetching profile', err);
        request.locals.user = undefined;
      }
    }
  }
  return request.locals;
};

import { createGraphClient } from '$lib/api/graph';
import { getSessionCookieFromRequest } from '$lib/session';
import { GetSession } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
// export const handle: Handle = async ({ request, resolve }) => {
//   const response = await resolve(request);
//   return {
//     ...response,
//     headers: {
//       ...response.headers,
//       'x-custom-header': 'potato',
//     },
//   };
// };

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
        const res = await client
          .query(
            `
            query {
              me {
                id
                username
                email
                confirmed
                blocked
                role {
                  name
                  description
                }
                displayName
                location
                phoneNumber
                forename
                birthday
                notes
                surname
                height
                weight
                destinationLikes {
                  id
                  name
                }
                experienceLikes {
                  id
                  name
                  intro
                }
                productLikes {
                  name
                  description
                  brand
                }
                myAdvisors {
                  bio
                  userMe {
                    displayName
                  }
                  agency {
                    displayName
                  }
                  countries {
                    name
                    code
                    phone
                  }
                  destinations{
                    name
                  }
                  experiences{
                    name
                  }
                }
    
                advisorMe {
                  bio
                  accept
                  agency {
                    displayName
                    legalName
                    description
                    state
                    type
                  }
                  countries {
                    name
                    code
                    phone
                  }
                  destinations{
                    name
                  }
                  experiences{
                    name
                  }
                }
              }
            }
          `,
          )
          .toPromise();
        request.locals.user = res.data.me;
        // console.log(request.locals.user);
      } catch (err) {
        console.error('Error fetching profile', err);
        request.locals.user = undefined
      }
    }
  }
  return request.locals;
};

/** @type {import('@sveltejs/kit').ExternalFetch} */
// export const serverFetch: ExternalFetch = async (request) => {
//   console.log(`External fetch`, request.url);
//   const cookie = getSessionCookieFromRequest(request);
//   if (cookie) {
//     request = new Request(request);
//     request.headers.set('cookie', cookie);
//   }
//   console.log('headers', request.headers);
//   return fetch(request);
// };

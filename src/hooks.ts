import { sessionCookieFromRequest } from '$lib/session';
import type { GetSession, ServerFetch } from '@sveltejs/kit';
import { createClient } from '@urql/core';

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
  console.log('session', request.locals.user?.email);
  if (!request.locals.user) {
    // console.log('user not in session...');
    const cookie = sessionCookieFromRequest(request);
    if (cookie) {
      // console.log('we have session cookie...');
      try {
        const client = createClient({
          url: 'http://localhost:1337/graphql',
          fetchOptions: () => {
            return {
              headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
              },
            };
          },
        });
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
                  name
                }
                experienceLikes {
                  title
                  intro
                }
                productLikes {
                  title
                  body
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
                    title
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
                    title
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
      }
    }
  }
  return request.locals;
};

/** @type {import('@sveltejs/kit').ServerFetch} */
export const serverFetch: ServerFetch = async (request) => {
  console.log(`Server fetch`, request.url);
  const cookie = sessionCookieFromRequest(request);
  if (cookie) {
    request = new Request(request);
    request.headers.set('cookie', cookie);
  }
  console.log('headers', request.headers);
  return fetch(request);
};

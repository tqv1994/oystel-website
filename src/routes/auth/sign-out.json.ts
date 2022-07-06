import type { RequestHandler } from '@sveltejs/kit';
import { getSessionCookie } from '$lib/utils/session';
import { cmsUrlPrefix } from '$lib/env';
import { makeErrorResponse } from '$lib/utils/fetch';

const headers = new Headers();
headers.append(
  'set-cookie',
  'session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT',
);
headers.append(
  'set-cookie',
  'session.sig= ; expires = Thu, 01 Jan 1970 00:00:00 GMT',
);

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  try {
    const cookie = getSessionCookie(request.headers.get('cookie'));
    if (cookie) {
      // console.log('we have session cookie...');
      const res = await fetch(`${cmsUrlPrefix}/auth/sign-out`, {
        method: 'POST',
        headers: {
          Cookie: cookie,
        },
      });
      if (!res.ok) {
        console.error('Error signing out', res);
        return new Response('', {
          status: 500,
          headers: headers,
        });
      }
      return new Response('', {
        status: 202,
        headers: headers,
      });
    }
  } catch (err) {
    console.error('Error fetching profile', err);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Failed to sign out',
    headers,
  );
};

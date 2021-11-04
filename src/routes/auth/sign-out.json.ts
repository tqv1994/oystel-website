import { RequestHandler, Request } from '@sveltejs/kit';
import {
  getSessionCookieFromRequest,
  filterResponseHeaders,
} from '$lib/session';
import { cmsUrlPrefix } from '$lib/env';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (request: Request) => {
  try {
    const cookie = getSessionCookieFromRequest(request);
    if (cookie) {
      // console.log('we have session cookie...');
      const res = await fetch(`${cmsUrlPrefix}/auth/me`, {
        method: 'DELETE',
        headers: {
          Cookie: cookie,
        },
      });
      if (!res.ok) {
        console.error('Error signing out', res);
        return { status: 500 };
      }
      const headers = filterResponseHeaders(res.headers);
      return {
        status: 202,
        headers,
      };
    }
  } catch (err) {
    console.error('Error fetching profile', err);
    return {
      status: 500,
      body: 'Error',
    };
  }
};

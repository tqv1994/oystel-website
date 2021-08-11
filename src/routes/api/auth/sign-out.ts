import type { RequestHandler, Request } from '@sveltejs/kit';
import { sessionCookieFromRequest, sessionCookieFromResponse } from '$lib/session';

/**
 * @type {import('@sveltejs/kit').Get}
 */
export const post: RequestHandler = async (request: Request<Record<string, any>,AuthForm>) => {
  if (!request.body.token) {
    return {
      status: 400,
      body: JSON.stringify({
        message: 'ID token is required',
      }),
    };
  }
  try {
    const cookie = sessionCookieFromRequest(request);
    if (cookie) {
      // console.log('we have session cookie...');
      const res = await fetch('http://localhost:1337/auth/me', {
        method: 'DELETE',
        headers: {
          Cookie: cookie,
          Authorization: 'Bearer ' + request.body.token,
        },
      });
      if (!res.ok) {
        console.error('Error signing out', res);
        return { status: 500 };
      }
      const headers = sessionCookieFromResponse(res);
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

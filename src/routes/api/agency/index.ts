import {
  sessionCookieFromRequest,
  sessionCookieFromResponse,
} from '$lib/session';
import type { AgencyApplicationForm3 } from '$lib/types';
import type { RequestHandler, Request } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (
  request: Request<Record<string, any>, AgencyApplicationForm3>,
) => {
  if (!request.body.description) {
    return {
      status: 400,
      body: JSON.stringify({
        message: 'name and type are required',
      }),
    };
  }

  const cookie = sessionCookieFromRequest(request);
  if (cookie) {
    try {
      const res = await fetch('http://localhost:1337/agencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
        body: JSON.stringify({
          description: request.body.description,
        }),
      });
      const headers = sessionCookieFromResponse(res);
      const body = await res.json();
      return {
        status: res.status,
        body,
        headers,
      };
    } catch (error) {
      console.error('Error signing in', error);
    }
  }
};

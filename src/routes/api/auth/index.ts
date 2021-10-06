import { apiPrefix } from '$lib/env';
import { filterResponseHeaders } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Post}
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
    const res = await fetch(`${apiPrefix}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + request.body.token,
      },
    });
    const headers = filterResponseHeaders(res.headers);
    const body = await res.json();
    console.log('Sign in success', `${apiPrefix}/auth/me`, body)
    return {
      status: res.status,
      body,
      headers,
    };
  } catch (error) {
    console.error('Error signing in in auth', error);
  }
};

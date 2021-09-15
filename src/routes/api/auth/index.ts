import { apiPrefix } from '$lib/env';
import { sessionCookieFromResponse } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';
import { ApiConfig } from '../config';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (request: Request<Record<string, any>,AuthForm>) => {
  const apiConfig = new ApiConfig();
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
};

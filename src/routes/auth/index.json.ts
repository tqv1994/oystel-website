import { cmsUrlPrefix } from '$lib/env';
import type { User } from '$lib/store/auth';
import { makeErrorResponse } from '$lib/utils/fetch';
import { extractSetCookieHeader } from '$lib/utils/session';
import type { RequestHandler } from '@sveltejs/kit';

type AuthForm = {
  token: string;
};

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (event) => {
  const reqBody = await event.request.json();
  if (event.locals.user) {
    return makeErrorResponse(
      401,
      'ALREADY_AUTHENTICATED',
      'Already authenticated',
    );
  } else if (!reqBody.token) {
    return makeErrorResponse(400, 'INVALID_ID_TOKEN', 'ID token is invalid');
  }

  try {
    const res = await fetch(`${cmsUrlPrefix}/auth`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + reqBody.token,
      },
    });
    const body: User = await res.json();
    // console.log('Sign in success', `${cmsUrlPrefix}/auth`, body);
    event.locals.user = body;
    return new Response(JSON.stringify(body), {
      status: res.status,
      headers: extractSetCookieHeader(res.headers),
    });
  } catch (error) {
    console.error('Error signing in in auth', error);
  }
  return makeErrorResponse(
    400,
    'BAD_REQUEST',
    'Request could not be understood',
  );
};

import { cmsUrlPrefix } from '$lib/env';
import { User } from '$lib/store/auth';
import { Locals } from '$lib/store/locals';
import { makeErrorResponse } from '$lib/utils/fetch';
import { extractSetCookieHeader } from '$lib/utils/session';
import { RequestHandler, Request } from '@sveltejs/kit';

type AuthForm = {
  token: string;
};

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (
  request: Request<Locals, AuthForm>,
) => {
  if (request.locals.user) {
    return makeErrorResponse(401, 'ALREADY_AUTHENTICATED', 'Already authenticated')
  } else if (!request.body.token) {
    return makeErrorResponse(400, 'INVALID_ID_TOKEN', 'ID token is invalid')
  }

  try {
    const res = await fetch(`${cmsUrlPrefix}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + request.body.token,
      },
    });
    const body:User = await res.json();
    // console.log('Sign in success', `${cmsUrlPrefix}/auth/me`, body);
    request.locals.user = body;
    return {
      status: res.status,
      body,
      headers: extractSetCookieHeader(res.headers),
    };
  } catch (error) {
    console.error('Error signing in in auth', error);
  }
};

import { RequestHandler } from '@sveltejs/kit';
import { extractSetCookieHeader } from '$lib/utils/session';
import { cmsUrlPrefix } from '$lib/env';
import { makeErrorResponse } from '$lib/utils/fetch';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (event) => {
  try {
    const reqBody = await event.request.json();
    const res = await fetch(`${cmsUrlPrefix}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + reqBody.token,
      },
    });
    const body = await res.json();
    return new Response(JSON.stringify(body), {
      status: res.status,
      headers: extractSetCookieHeader(res.headers),
    });
  } catch (error) {
    return makeErrorResponse(
      500,
      'INTERNAL_SERVER_ERROR',
      'Error updating me data',
    );
  }
};

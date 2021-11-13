import { RequestHandler, Request } from '@sveltejs/kit';
import { extractSetCookieHeader } from '$lib/utils/session';
import { cmsUrlPrefix } from '$lib/env';
import type { Rec } from '@sveltejs/kit/types/helper';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>,
) => {
  try {
    const res = await fetch(`${cmsUrlPrefix}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + request.body.token,
      },
    });
    const body = await res.json();
    return {
      status: res.status,
      body,
      headers: extractSetCookieHeader(res.headers),
    };
  } catch (error) {
    console.error('Error service', error);
  }
};

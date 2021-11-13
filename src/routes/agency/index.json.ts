import { cmsUrlPrefix } from '$lib/env';
import { getSessionCookie } from '$lib/utils/session';
import { extractSetCookieHeader } from '$lib/utils/session';
import { RequestHandler, Request } from '@sveltejs/kit';
import type { Rec } from '@sveltejs/kit/types/helper';


/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (
  request: Request<Rec<any>, AgencyApplicationForm3>,
) => {
  if (!request.body.description) {
    return {
      status: 400,
      body: JSON.stringify({
        message: 'name and type are required',
      }),
    };
  }
  const cookie = getSessionCookie(request.headers.cookie);
  if (cookie) {
    try {
      const res = await fetch(`${cmsUrlPrefix}/agencies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
        body: JSON.stringify({
          description: request.body.description,
        }),
      });
      const body = await res.json();
      return {
        status: res.status,
        body,
        headers: extractSetCookieHeader(res.headers),
      };
    } catch (error) {
      console.error('Error POST agency info', error);
    }
  }
};

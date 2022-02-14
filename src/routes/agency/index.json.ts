import { cmsUrlPrefix } from '$lib/env';
import { getSessionCookie } from '$lib/utils/session';
import { extractSetCookieHeader } from '$lib/utils/session';
import { RequestHandler } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (event) => {
  const reqBody = await event.request.json();
  if (!reqBody.description) {
    return new Response(
      JSON.stringify({
        message: 'name and type are required',
      }),
      {
        status: 400,
      },
    );
  }
  const cookie = getSessionCookie(event.request.headers.get('cookie') || '');
  if (cookie) {
    try {
      const res = await fetch(`${cmsUrlPrefix}/agencies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
        body: JSON.stringify({
          description: reqBody.description,
        }),
      });
      const body = await res.json();
      return new Response(body, {
        status: res.status,
        headers: extractSetCookieHeader(res.headers),
      });
    } catch (error) {
      console.error('Error POST agency info', error);
    }
  }
  return new Response(
    JSON.stringify({
      message: 'bad request',
    }),
    {
      status: 400,
    },
  );
};

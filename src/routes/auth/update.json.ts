import { cmsUrlPrefix } from '$lib/env';
import { filterResponseHeaders } from '$lib/session';
import { RequestHandler, Request } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const put: RequestHandler = async (
  request: Request<Record<string, any>, AuthForm>,
) => {
  if (!request.body.token) {
    return {
      status: 400,
      body: JSON.stringify({
        message: 'ID token is required',
      }),
    };
  }

  try {
    const res = await fetch(`${cmsUrlPrefix}'/users/'${request.body.data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + request.body.token,
      },
      body: JSON.stringify(request.body.data),
    });
    const headers = filterResponseHeaders(res.headers);
    const body = await res.json();
    return {
      status: res.status,
      body,
      headers,
    };
  } catch (error) {
    console.error('Error updating user info', error);
  }
};

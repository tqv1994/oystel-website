import { cmsUrlPrefix } from '$lib/env';
import { extractSetCookieHeader } from '$lib/utils/session';
import { RequestHandler, Request } from '@sveltejs/kit';


/**
 * @type {import('@sveltejs/kit').Put}
 */
export const put: RequestHandler = async (
  request: Request<Rec<any>, AuthForm>,
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
    const body = await res.json();
    return {
      status: res.status,
      body,
      headers: extractSetCookieHeader(res.headers),    };
  } catch (error) {
    console.error('Error updating user info', error);
  }
};

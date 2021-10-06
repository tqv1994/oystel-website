import { apiPrefix } from '$lib/env';
import {
  getSessionCookieFromRequest,
  filterResponseHeaders,
} from '$lib/session';
import type { AgencyApplicationForm3 } from '$lib/types';
import type { RequestHandler, Request } from '@sveltejs/kit';
import { ApiConfig } from '../config';

/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (
  request: Request<Record<string, any>, AgencyApplicationForm3>,
) => {
  if (!request.body.description) {
    return {
      status: 400,
      body: JSON.stringify({
        message: 'name and type are required',
      }),
    };
  }
  const apiConfig = new ApiConfig();
  const cookie = getSessionCookieFromRequest(request);
  if (cookie) {
    try {
      const res = await fetch(`${apiPrefix}/agencies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie,
        },
        body: JSON.stringify({
          description: request.body.description,
        }),
      });
      const headers = filterResponseHeaders(res.headers);
      const body = await res.json();
      return {
        status: res.status,
        body,
        headers,
      };
    } catch (error) {
      console.error('Error POST agency info', error);
    }
  }
};

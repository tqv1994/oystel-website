import { sessionCookieFromResponse } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';
import { ApiConfig } from '../../config';
import { apiPrefix } from '$lib/env';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const get: RequestHandler = async (request: Request<Record<string, any>,AuthForm>) => {
    const apiConfig = new ApiConfig();
    try {
        const res = await fetch(`${apiPrefix}/page/destination`, {
            headers: {
                'Content-Type': 'application/json',
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
        console.error('Error service', error);
    }
};

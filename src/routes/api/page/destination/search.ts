import { filterResponseHeaders } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';
import { ApiConfig } from '../../config';
import { apiPrefix } from '$lib/env';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (request: Request<Record<string, any>,AuthForm>) => {
    const apiConfig = new ApiConfig();
    try {
        const res = await fetch(`${apiPrefix}/page/destination/search?${request.query}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: request.body.token != '' ? 'Bearer ' + request.body.token : "",
            },
        });
        const headers = filterResponseHeaders(res.headers);
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

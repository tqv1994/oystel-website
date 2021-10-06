import { filterResponseHeaders } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';
import {ExperienceModel} from '$lib/models/experience';
import { apiPrefix } from '$lib/env';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const post: RequestHandler = async (request: Request<Record<string, any>,AuthForm>) => {
    try {
        const res = await fetch(`${apiPrefix}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +request.body.token,
            },
        });
        const headers = filterResponseHeaders(res.headers);
        const body = await res.json();
        // if(body.itemsCuratedForYou) {
        //     let itemsCuratedForYou = body.itemsCuratedForYou;
        //     itemsCuratedForYou = await itemsCuratedForYou.map(item => {
        //         item = new ExperienceModel(item);
        //     });
        // }
        return {
            status: res.status,
            body,
            headers,
        };
    } catch (error) {
        console.error('Error service', error);
    }
};

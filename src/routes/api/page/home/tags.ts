import { sessionCookieFromResponse } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';
import {ExperienceModel} from '$lib/models/experience';
import { apiPrefix } from '$lib/env';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const get: RequestHandler = async (request: Request<Record<string, any>,AuthForm>) => {
    try {
        const res = await fetch(`${apiPrefix}/page/home/tags`, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const headers = sessionCookieFromResponse(res);
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
        console.error('Error server', error);
    }
};
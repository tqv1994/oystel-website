import { filterResponseHeaders } from '$lib/session';
import { RequestHandler, Request } from '@sveltejs/kit';
import { ExperienceModel } from '$lib/models/experience';
import { StringHelper } from '$lib/helpers';
import { ApiConfig } from '../config';
import { cmsUrlPrefix } from '$lib/env';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const get: RequestHandler = async (
  request: Request<Record<string, any>, AuthForm>,
) => {
  console.log(request.query);
  try {
    const res = await fetch(`${cmsUrlPrefix}/advisors?${request.query}`, {
      headers: {
        'Content-Type': 'application/json',
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

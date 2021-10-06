import { filterResponseHeaders, getSessionCookieFromRequest } from '$lib/session';
import type { RequestHandler, Request } from '@sveltejs/kit';
import { ApiConfig } from '../config';
import { apiPrefix } from '$lib/env';
import { createClient } from '@urql/core';
import { commonQuery } from '$lib/graphql-query/common';
import { HomePageModel } from '$lib/types';
import homePage from '$lib/stores/page/home';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export const get: RequestHandler = async (request: Request<Record<string, any>, AuthForm>) => {
  const apiConfig = new ApiConfig();
  try {
    let body: HomePageModel = {
      itemsCuratedForYou: [],
      itemsFromOurAdvisor: [],
      itemsFeaturedDrop: []
    };
    let homePageData;
    homePage.subscribe((res) => {
      homePageData = res.homePage;
    });
    if (!homePageData) {
      const cookie = getSessionCookieFromRequest(request);
      const client = createClient({
        url: 'http://localhost:1337/graphql',
        fetchOptions: () => {
          return {
            headers: {
              'Content-Type': 'application/json',
              Cookie: cookie,
            },
          };
        },
      });
      const QUERY = `query{
              drops( limit:7, sort: "published_at:desc" ){
                ${commonQuery.dropsQuery},
                products {${commonQuery.productQuery}}
                gallery {${commonQuery.uploadFileQuery}}
              },
              experiences(limit: 7, sort: "published_at:desc"){
                  ${commonQuery.experienceQuery}
                  gallery {${commonQuery.uploadFileQuery}}
                  country {${commonQuery.countriesQuery}}
              },
              destinations(limit: 4, sort: "published_at:desc"){
                  ${commonQuery.destinationQuery}
                  gallery {${commonQuery.uploadFileQuery}}
                  country {${commonQuery.countriesQuery}}
              }
            }
          `;
      const res = await client
        .query(
          QUERY
        )
        .toPromise();
      // const headers = filterResponseHeaders(res.headers);
      const data = res.data;
      if (data.drops && Array.isArray(data.drops)) {
        body.itemsFeaturedDrop = data.drops;
      }
      if (data.experiences && Array.isArray(data.experiences)) {
        body.itemsCuratedForYou = data.experiences;
        data.experiences.map((item: any) => {
          item.type = 'experience';
          body.itemsFromOurAdvisor.push(item);
        });
      }
      if (data.destinations && Array.isArray(data.destinations)) {
        data.destinations.map((item: any) => {
          item.type = 'destination';
          body.itemsFromOurAdvisor.push(item);
        });
      }

      body.itemsFromOurAdvisor = body.itemsFromOurAdvisor.sort((a, b) => {
        if (a.published_at < b.published_at) {
          return 1;
        }
        if (a.published_at > b.published_at) {
          return -1;
        }
        return 0;
      });
      body.itemsFromOurAdvisor.splice(4, 5);
    }else{
      body = homePageData;
    }
    return {
      body,
    };
  } catch (error) {
    console.error('Error getting home page', error);
  }
};

import { Request } from '@sveltejs/kit';
import { Client, createClient } from '@urql/core';
import { getSessionCookieFromRequest } from '$lib/utils/session';
import { graphApiUrl } from '$lib/env';

export const createGraphClientFromRequest = (request: Request): Client => {
  const cookie = getSessionCookieFromRequest(request);
  return createClient({
    url: graphApiUrl,
    fetchOptions: () => {
      return {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie || '',
        },
      };
    },
  });
};

export const createGraphClient = (cookie?:string): Client => {
  return createClient({
    url: graphApiUrl,
    fetchOptions: () => {
      return {
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookie || '',
        },
      };
    },
  });
};


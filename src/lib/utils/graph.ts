import { Request } from '@sveltejs/kit';
import { Client, createClient } from '@urql/core';
import { getSessionCookie } from '$lib/utils/session';
import { graphApiUrl } from '$lib/env';

export const createGraphClientFromRequest = (request: Request): Client => {
  const sessionCookie = getSessionCookie(request.headers.cookie);
  return createClient({
    url: graphApiUrl,
    fetchOptions: () => {
      return {
        headers: {
          'Content-Type': 'application/json',
          Cookie: sessionCookie || '',
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


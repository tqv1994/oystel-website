import { Request } from '@sveltejs/kit';
import * as cookie from 'cookie';

export function getSessionCookieFromRequest(req: Request): string {
  const cookies = cookie.parse(req.headers.cookie || '');
  const { session, 'session.sig': sig } = cookies;
  if (session && sig) {
    return `session=${session};session.sig=${sig}`;
  }
  return '';
}

export function filterResponseHeaders(
  responseHeaders: Headers,
): Record<string, string> {
  const setCookie = (responseHeaders as any).raw()['set-cookie'];
  const headers: Record<string, string> = {};
  if (setCookie) {
    headers['set-cookie'] = setCookie;
  }
  return headers;
}

import * as cookie from 'cookie';
import type { Request, Response } from '@sveltejs/kit';

export function sessionCookieFromRequest(req: Request): string {
  // console.log(request.headers.cookie)
  const cookies = cookie.parse(req.headers.cookie || '');
  // console.log(cookies)
  const { session, 'session.sig': sig } = cookies;
  // console.log('session', session, sig)
  if (session && sig) {
    // console.log('we have session cookie...');
    return `session=${session};session.sig=${sig}`;
  }
  return '';
}

export function sessionCookieFromResponse(
  res: Response,
): Record<string, string> {
  const setCookieHeader = (res.headers as any).raw()['set-cookie'];
  const headers: Record<string, string> = {};
  if (setCookieHeader) {
    headers['set-cookie'] = setCookieHeader;
  }
  return headers;
}

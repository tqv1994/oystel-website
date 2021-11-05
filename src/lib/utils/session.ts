import * as cookie from 'cookie';

export function getSessionCookie(cookieString: string): string {
  if (cookieString) {
    const cookies = cookie.parse(cookieString);
    const { session, 'session.sig': sig } = cookies;
    if (session && sig) {
      return `session=${session};session.sig=${sig}`;
    }
  }
  return '';
}

export function extractSetCookieHeader(headers: Headers): Headers | undefined {
  if (headers.has('set-cookie')) {
    return new Headers({
      'set-cookie': headers.get('set-cookie') as string,
    });
  }
}

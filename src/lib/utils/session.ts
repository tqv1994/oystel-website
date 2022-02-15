import * as cookie from 'cookie';

export function getSessionCookie(cookieString?: string | null): string {
  if (cookieString) {
    const cookies = cookie.parse(cookieString);
    const { session, 'session.sig': sig } = cookies;
    console.log('sig', sig);
    if (session && sig) {
      return `session=${session};session.sig=${sig}`;
    }
  }
  return '';
}

export function extractSetCookieHeader(headers: Headers): HeadersInit {
  if (headers.has('set-cookie')) {
    const cookieString =
      headers.get('set-cookie')?.replace(' httponly', '').replace(';,', ';') ||
      '';
    const cookies = cookie.parse(cookieString);
    if (cookies.session && cookies['session.sig'] && cookies.expires) {
      const headers = new Headers();
      const opts = {
        expires: new Date(cookies.expires),
        path: '/',
      };
      headers.set(
        'set-cookie',
        cookie.serialize('session', cookies.session, opts),
      );
      headers.append(
        'set-cookie',
        cookie.serialize('session.sig', cookies['session.sig'], {
          ...opts,
          httpOnly: true,
        }),
      );
      return headers;
    }
  }
  return {};
}

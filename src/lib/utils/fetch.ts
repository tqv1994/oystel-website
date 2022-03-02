export function parseId(slug: string): string {
  const match = slug.match(/(?<=)\w+$/g); // Look for a - (hyphen) followed by a \w
  return match ? match[0] : slug;
}

export const makeErrorResponse = (
  status: number,
  code: string,
  message: string,
  headers?: Headers,
) =>
  new Response(
    JSON.stringify({
      code,
      status,
      message,
    }),
    {
      status,
      headers,
    },
  );

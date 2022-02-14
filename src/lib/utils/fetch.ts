export function parseId(slug: string): string {
  const match = slug.match(/(?<=^.+-)\w+$/); // Look for a - (hyphen) followed by a \w
  return match ? match[0] : slug;
}

export const makeErrorResponse = (
  status: number,
  code: string,
  message: string,
) =>
  new Response(
    JSON.stringify({
      code,
      status,
      message,
    }),
    {
      status,
      headers: {},
    },
  );

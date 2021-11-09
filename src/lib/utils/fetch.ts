export function parseId(slug: string): string {
  const match = slug.match(/(?<=^.+-)\w+$/); // Look for a - (hyphen) followed by a \w
  return match ? match[0] : slug;
}

export const makeErrorResponse = (
  status: number,
  code: string,
  message: string,
) => ({
  status: status,
  body: JSON.stringify({
    code,
    status,
    message,
  }),
});

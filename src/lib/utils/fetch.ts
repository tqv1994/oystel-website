export function parseId(slug: string):string {
  const match = slug.match(/(?<=^.+-)\w+$/); // Look for a - (hyphen) followed by a \w
  return match ? match[0] : slug;
}

export const makeErrorResponse = (
  code: number,
  message: string,
) => ({
  status: code,
  body: JSON.stringify({
    error: {
      code,
      message,
    },
  }),
});

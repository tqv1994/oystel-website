import { RequestHandler, Response } from "@sveltejs/kit";

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

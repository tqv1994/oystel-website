import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { UploadFile, uploadFileFieldsFragment } from '$lib/store/upload-file';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type uploadData = {
  upload: UploadFile;
};

export const post: RequestHandler = async (event) => {
  try {
    const client = createGraphClientFromRequest(event.request);
    const query = `mutation ($file: Upload!){
        upload(file: $file) {
            ...uploadFileFields
          }
      }
      ${uploadFileFieldsFragment}
    `;
    const reqBody = await event.request.json();
    // console.log(reqBody);
    const res = await client
      .mutation<uploadData>(query, { file: reqBody.file })
      .toPromise();
    if (res.data) {
      return new Response(JSON.stringify(res.data));
    }
    if (res.error) {
      console.log(JSON.stringify(res.error, null, 2));
    }
  } catch (error) {
    console.error('Error uploading file', error);
  }
  return makeErrorResponse(
    500,
    'INTERNAL_SERVER_ERROR',
    'Error uploading file',
  );
};

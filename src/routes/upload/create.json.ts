import type { RequestHandler, Request } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { Rec } from '@sveltejs/kit/types/helper';
import { UploadFile, uploadFileFieldsFragment } from '$lib/store/upload-file';
/**
 * @type {import('@sveltejs/kit').Post}
 */
export type uploadData = {
    upload: UploadFile;
};

export const post: RequestHandler = async (
    request: Request<Rec<any>, AuthForm>) => {
    try {
        const client = createGraphClientFromRequest(request);
        const query = `mutation ($file: Upload!){
        upload(file: $file) {
            ...uploadFileFields
          }
      }
      ${uploadFileFieldsFragment}
    `;
    console.log(request.body);
        const res = await client.mutation<uploadData>(query, { file: request.body.file }).toPromise();
        if (res.data) {
            return {
                body: JSON.stringify(res.data),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error uploading file', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error uploading file');
};
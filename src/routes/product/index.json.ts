import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { stringHelper } from '$lib/helpers';
import { Product, productFieldsFragment} from '$lib/store/product';
import { PRODUCT_COLOUR, PRODUCT_DESIGNER, PRODUCT_PATTERN, QUERY, TYPE, VACATION_STYLE } from '$lib/store/search';

const query = `
query($params: JSON) {
  products(where: $params) {
    ...productFields
  }
}

${productFieldsFragment}
${uploadFileFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
    try {
        const client = createGraphClientFromRequest(event.request);
        let paramsInput: any = {};
        const params = stringHelper.queryURLParamToJSON(event.url.searchParams.toString());
        for(let i in params){
            if(i === TYPE){

            }
            else if(i === QUERY){
                paramsInput['name'] = params[QUERY];
            }
            else if(i === PRODUCT_DESIGNER){
                paramsInput['product_designer'] = params[PRODUCT_DESIGNER];
            }
            else if(i === PRODUCT_PATTERN && params[PRODUCT_PATTERN]){
                paramsInput['product_pattern'] = (params[PRODUCT_PATTERN] || '').split(",");
            }
            else if(i === PRODUCT_COLOUR && params[PRODUCT_COLOUR]){
                paramsInput['product_colour'] = (params[PRODUCT_COLOUR] || '').split(",");
            }else if(i === VACATION_STYLE){
                paramsInput['vacation_style'] = params[VACATION_STYLE];
            }else{
                if(params[i]){
                    paramsInput[i] = params[i];
                }
            }
        }
        const res = await client.query<{ products: Product[] }>(query, {params: paramsInput}).toPromise();
        if (res.data?.products) {
            return {
                body: JSON.stringify(res.data.products),
            };
        }
        if (res.error) {
            console.log(JSON.stringify(res.error, null, 2));
        }
    } catch (error) {
        console.error('Error getting advisors listing', error);
    }
    return makeErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Error getting advisors listing');
};

import type { RequestHandler } from '@sveltejs/kit';
import { createGraphClientFromRequest } from '$lib/utils/graph';
import { makeErrorResponse } from '$lib/utils/fetch';
import { uploadFileFieldsFragment } from '$lib/store/upload-file';
import { stringHelper } from '$lib/helpers';
import { Product, productFieldsFragment, productTypeFieldsFragment} from '$lib/store/product';
import { PRODUCT_COLOUR, PRODUCT_DESIGNER, PRODUCT_PATTERN, QUERY, TYPE, VACATION_STYLE } from '$lib/store/search';

const query = `
query($params: JSON) {
  products(where: $params) {
    ...productFields
    type1 {
        ...productTypeFields
    }
    type2 {
        ...productTypeFields
    }
    type3 {
        ...productTypeFields
    }
  }
}

${productFieldsFragment}
${productTypeFieldsFragment}
${uploadFileFieldsFragment}
`;
/**
 * @type {import('@sveltejs/kit').Get}
 */
export const get: RequestHandler = async (event) => {
  const request = event.request;
  const params = stringHelper.queryURLParamToJSON(event.url.searchParams.toString());
    try {
        const client = createGraphClientFromRequest(event.request);
        let paramsInput: any = {};
        console.log('params',params);
        for(let i in params){
            if(i === TYPE){
                // paramsInput['type1'] = params[TYPE];
                // paramsInput['type2'] = params[TYPE];
                // paramsInput['type3'] = params[TYPE];
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
            let results: Product[] = [];
            if(params[TYPE]){
                const productsOfType1 = res.data.products.filter((item)=>item.type1?.id === params[TYPE]+"");
                const productsOfType2 = res.data.products.filter((item)=>item.type2?.id === params[TYPE]+"");
                const productsOfType3 = res.data.products.filter((item)=>item.type3?.id === params[TYPE]+"");
                results = productsOfType1.concat(productsOfType2,productsOfType3).reduce((acc : Product[], item: Product)=>{
                    if(acc.length === 0){
                        acc.push(item);
                    }else{
                        const index = acc.findIndex((itemAcc)=>itemAcc.id === item.id);
                        if(index < 0){
                            acc.push(item);
                        }
                    }
                    return acc;
                },[]);

            }else{
                results = res.data.products;
            }
            return {
                body: JSON.stringify(results),
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

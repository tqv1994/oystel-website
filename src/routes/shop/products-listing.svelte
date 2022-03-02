<script lang="ts" context="module">
import { Product, productColourStore, productDesignerStore, productTypeStore } from "$lib/store/product";

import type { Load } from "@sveltejs/kit";
    export const load: Load = async ({ fetch, url }) => {
        const res = await fetch(`/product.json?${url.searchParams.toString()}`);
        if (res.ok) {
            const products: Product[] = await res.json();
            let params = stringHelper.queryURLParamToJSON(url.searchParams.toString());
            console.log(params);
            return {
                props: {
                    products,
                    params: {
                        query: params[QUERY] || '',
                        type: params[TYPE] || '',
                        designer: params[PRODUCT_DESIGNER] || '',
                        pattners: (params[PRODUCT_PATTERN] || '').split(","),
                        colours: (params[PRODUCT_COLOUR] || '').split(","),
                    }
                }
            }
        }
        else{
            const error = await res.json();
            console.log(error);
        }
        return {};
    }
</script>
<script lang="ts">
import ShopNavigation from "$lib/components/ShopNavigation.svelte";
import ProductSearchForm from "$lib/components/ProductSearchForm.svelte";
import { PRODUCT_COLOUR, PRODUCT_DESIGNER, PRODUCT_PATTERN, QUERY, TYPE } from "$lib/store/search";
import { stringHelper } from "$lib/helpers";
import ProductList from "$lib/components/ProductList.svelte";
export let products: Product[];
export let params: any;
</script>
<ShopNavigation/>
<div class="content product-listing-page">
    <section class="header-title">
        <div class="container">
            <h2 class="text-center mt-0">Shop Collection</h2>
            <p class="text-center m-0 d-mb-50 m-mb-30">Bespoke itineraries created by our leading tastemakers.</p>
            <ProductSearchForm {...params}/>
        </div>
    </section>
    <section class="results">
        <div class="container">
            <ProductList items={products} />
        </div>
    </section>
</div>
<style lang="scss" global>
    .product-listing-page{
        @import '../../style/partial/thumbnail.scss';
        .results{
            .item{
                margin-bottom: 20px;
                .btn-favorite{
                    svg{
                        filter: brightness(0%);
                    }
                }
            } 
        }
    }
</style>
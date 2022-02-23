<script lang="ts" context="module">
import { Product, productColourStore, productDesignerStore, productTypeStore } from "$lib/store/product";

import type { Load } from "@sveltejs/kit";
    export const load: Load = async ({ fetch, url }) => {
        const res = await fetch(`/product.json?${url.searchParams.toString()}`);
        if (res.ok) {
            const products: Product[] = await res.json();
            return {
                props: {
                    products,
                    params: {
                        query: url.searchParams.get(QUERY) || '',
                        type: url.searchParams.get(TYPE) || '',
                        designer: url.searchParams.get(PRODUCT_DESIGNER) || '',
                        pattner: url.searchParams.get(PRODUCT_PATTERN) || '',
                        colour: url.searchParams.get(PRODUCT_COLOUR) || '',
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
import Item from "$lib/components/Item.svelte";
import LayoutGrid from "@smui/layout-grid";
import Cell from "@smui/layout-grid/src/Cell.svelte";
import { PRODUCT_COLOUR, PRODUCT_DESIGNER, PRODUCT_PATTERN, QUERY, TYPE } from "$lib/store/search";
export let products: Product[];
export let params: any;
</script>
<ShopNavigation/>
<div class="content product-listing-page">
    <section class="header-title">
        <div class="container">
            <h2 class="text-center mt-0">Shop Collection</h2>
            <p class="text-center m-0 d-mb-50">Bespoke itineraries created by our leading tastemakers.</p>
            <ProductSearchForm {...params}/>
        </div>
    </section>
    <section class="results">
        <LayoutGrid class="pt-0 pb-0">
            {#each products || [] as product}
                <Cell spanDevices={{desktop: 3, tablet: 4, phone: 2}}>
                    <Item item={product} {...product} />
                </Cell>
            {/each}
        </LayoutGrid>
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
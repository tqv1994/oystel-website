<script lang="ts">
import { Product } from "$lib/store/product";

import LayoutGrid, { Cell } from "@smui/layout-grid";
import Item from "./Item.svelte";
    export let columnsDesktop: number = 4;
    export let columnsMobile: number = 2;
    export let items: Product[];
</script>
    <LayoutGrid class="p-0">
        {#each items as item}
            <Cell spanDevices={{desktop: 12 /columnsDesktop, tablet: 8/ columnsMobile, phone: 4/columnsMobile}}>
                <Item bind:item {...item} />
            </Cell>
        {/each}
    </LayoutGrid>
<style lang="scss"></style>
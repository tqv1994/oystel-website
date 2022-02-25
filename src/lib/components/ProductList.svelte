<script lang="ts">
  import { Product } from '$lib/store/product';

  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Item from './Item.svelte';
  import ProductSliderModal from './modals/ProductSliderModal.svelte';
  import ProductItem from './ProductItem.svelte';
  export let columnsDesktop: number = 4;
  export let columnsMobile: number = 2;
  export let items: Product[];
  let productSlideOpen: boolean = false;
  let productIndex: number = 0;

  const openProductSlide = (index: number) => {
    productSlideOpen = true;
    productIndex = index;
  }
</script>

<LayoutGrid class="p-0">
  {#each items as item, index}
    <Cell
      spanDevices={{
        desktop: 12 / columnsDesktop,
        tablet: 8 / columnsMobile,
        phone: 4 / columnsMobile,
      }}
    >
      <ProductItem bind:item {...item} on:click={()=>{openProductSlide(index)}}/>
    </Cell>
  {/each}
</LayoutGrid>
<ProductSliderModal
  bind:open={productSlideOpen}
  products={items}
  bind:active={productIndex}>no content</ProductSliderModal
>

<style lang="scss"></style>

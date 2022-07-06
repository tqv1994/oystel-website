<script lang="ts">
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import { Svg } from '@smui/common/elements';
  import ProductSliderModal from './ProductSliderModal.svelte';
  import { productStore } from '$lib/store/product';
  import type { Product } from '$lib/store/product';
  import ProductShow from '../product-show.svelte';

  export let open = false;
  export let products: Product[] = [];
  let productIndex: number;
  // productStore.subscribe(({ items }) => {
  //   products = Object.values(items);
  // });
  let openProductSlide = false;

  function likeProductItem(item: Product) {}
</script>

<div class="content-wrap popup-quick-shop {open ? 'open' : 'close'}">
  <section class="full-width pt-70 pb-50">
    <div class="content-wrap">
      <IconButton
        class="btn-close"
        on:click={() => {
          open = false;
        }}
      >
        <Icon component={Svg} viewBox="0 0 14.707 14.707">
          <g data-name="Close Icon" transform="translate(-4.596 -4.596)">
            <line
              id="Line"
              x2="14"
              y2="14"
              transform="translate(4.949 4.949)"
              fill="none"
              stroke="#000"
              stroke-width="1"
            />
            <line
              id="Line-2"
              data-name="Line"
              x1="14"
              y2="14"
              transform="translate(4.949 4.949)"
              fill="none"
              stroke="#000"
              stroke-width="1"
            />
          </g>
        </Icon>
      </IconButton>
      <div class="d-mb-20">
        <ProductShow items={products} title="" />
      </div>
    </div>
  </section>
</div>
<ProductSliderModal
  bind:open={openProductSlide}
  {products}
  bind:active={productIndex}
/>

<style>
  section {
    background-color: #fff;
  }
  .divider:after {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .popup-quick-shop {
    box-shadow: 0 3px 10px rgb(0 0 0 / 16%);
    z-index: 100;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    opacity: 1;
    transition: bottom 2s ease;
  }
  .popup-quick-shop.close {
    opacity: 0;
    bottom: -999px;
    z-index: -1;
  }
  .popup-quick-shop.open {
  }

  .popup-quick-shop :global(.btn-close) {
    position: absolute;
    top: -60px;
    right: var(--mdc-layout-grid-margin-desktop);
    z-index: 7;
  }
  .popup-quick-shop :global(.wrap-control) {
    top: 40%;
  }
  @media screen and (max-width: 1239px) and (min-width: 600px) {
    .popup-quick-shop :global(.btn-close) {
      right: var(--mdc-layout-grid-margin-tablet);
    }
  }

  @media screen and (max-width: 599px) {
    .popup-quick-shop :global(.btn-close) {
      right: var(--mdc-layout-grid-margin-phone);
    }
  }

  @media (max-width: 599px) {
    .popup-quick-shop.open {
      top: 0;
      overflow-y: scroll;
    }
  }
</style>

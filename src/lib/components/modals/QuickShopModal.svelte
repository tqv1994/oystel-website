<script lang="ts">
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Svg from '@smui/common/elements/Svg.svelte';
  import ProductSliderModal from './ProductSliderModal.svelte';
  import { productStore } from '$lib/store/product';
  import { Product } from '$lib/store/product';

  export let open = false;
  let products: Product[] = [];
  let productIndex: number;
  productStore.subscribe(({ items }) => {
    products = Object.values(items);
  });
  let openProductSlide = false;

  function likeProductItem(item: Product) {}
</script>

<div class="content-wrap popup-quick-shop {open ? 'open' : 'close'}">
  <section class="full-width pt-70 pb-50">
    <div class="content-wrap">
      <div class="container">
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
        <div class="products-list">
          <LayoutGrid class="p-0">
            {#if products && products.length > 0}
              {#each products as item, i}
                <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
                  <div
                    on:click={() => {
                      openProductSlide = true;
                      console.log('productIndex', i);
                      productIndex = i;
                    }}
                    class="item-product"
                  >
                    <div
                      class="thumbnail"
                      style={`background-image: url(${item.gallery[0]?.url}`}
                    >
                      <IconButton
                        class="btn-favorite {item.liked ? 'liked' : ''}"
                        on:click={likeProductItem(item)}
                      >
                        <Icon
                          class="like"
                          component={Svg}
                          viewBox="-4 -4 24 24"
                        >
                          <path
                            d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                            transform="translate(0.001)"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                        </Icon>
                        <Icon
                          class="liked"
                          component={Svg}
                          viewBox="-4 -4 24 24"
                        >
                          <path
                            d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                            transform="translate(0)"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                        </Icon>
                      </IconButton>
                    </div>
                    <p class="text-eyebrow mt-25">{item.brand}</p>
                    <h3 class="mb-0">{item.name}</h3>
                  </div>
                </Cell>
              {/each}
            {/if}
          </LayoutGrid>
        </div>
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

  .products-list :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;

    padding-bottom: 90px;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
    height: 10px;
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
    background-color: #5078bc;
  }

  .products-list :global(.item-product .thumbnail) {
    width: 100%;
    padding-bottom: 145%;
    background-color: #f2f2f2;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }

  .products-list :global(.item-product .thumbnail .btn-favorite) {
    position: absolute;
    top: 2%;
    right: 2%;
    filter: brightness(0);
  }
  .products-list :global(.item-product .thumbnail .btn-favorite .like) {
    display: block;
  }
  .products-list :global(.item-product .thumbnail .btn-favorite .liked) {
    display: none;
  }
  .products-list :global(.item-product .thumbnail .btn-favorite:hover .like) {
    display: none;
  }
  .products-list :global(.item-product .thumbnail .btn-favorite:hover .liked) {
    display: block;
  }
  @media (min-width: 1240px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)), 1fr)
      );
    }
  }
  @media (max-width: 1239px) and (min-width: 905px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)), 1fr)
      );
    }
  }
  @media (max-width: 904px) and (min-width: 600px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
      );
    }
  }
  @media (max-width: 599px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
      );
    }
  }

  @media (max-width: 599px) {
    .popup-quick-shop.open {
      top: 0;
      overflow-y: scroll;
    }
  }
</style>

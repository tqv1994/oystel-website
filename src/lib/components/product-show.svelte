<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import { destinationStore } from '$lib/store/destination';
  import { Destination } from '$lib/store/destination';
  import { insertToStore } from '$lib/store/types';
  import { get } from 'svelte/store';
  import { parseId } from '$lib/utils/fetch';
  import { Product } from '$lib/store/product';
  import ProductSliderModal from '$lib/components/modals/ProductSliderModal.svelte';
  import { createEventDispatcher } from 'svelte';

  export const load: Load = async ({ fetch, params }) => {
    const id = parseId(params.slug);
    if (get(destinationStore).items[id]) {
      return {
        props: { id },
      };
    }

    const res = await fetch(`/destination/${id}`);
    if (res.ok) {
      const data: Destination = await res.json();
      insertToStore(destinationStore, [data]);
      return { props: { id } };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script type="ts">
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import BlurImage from './blur-image.svelte';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';

  let dispathcher = createEventDispatcher();
  export let title: string;
  export let items: Product[];
  let openProductSlide: boolean = false;
  let productIndex: number;
  function callLikeItem(product: Product) {
    setTimeout(() => {
      dispathcher('likeItem', { product });
    }, 0);
  }
</script>

<section class="d-pt-55 m-pt-40">
  <div class="container">
    <h1 class="mt-0">What to Pack</h1>
    <div class="products-list">
      <LayoutGrid class="p-0">
        {#each items as item, i}
          <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
            <div
              on:click={() => {
                openProductSlide = true;
                productIndex = i;
              }}
              class="item-product"
            >
              <div class="thumbnail">
                <div class="image-cover" style="padding-top: 145%">
                  <BlurImage {...item.gallery[0]} />
                </div>
                <IconButton
                  class="btn-favorite {item.liked ? 'liked' : ''}"
                  on:click={() => {
                    callLikeItem(item);
                  }}
                >
                  <HeartIcon size="sm" />
                  <HeartFilledIcon size="sm" />
                </IconButton>
              </div>
              <p class="text-eyebrow mt-25">{item.brand}</p>
              <h3>{item.name}</h3>
            </div>
          </Cell>
        {/each}
      </LayoutGrid>
    </div>
  </div>
</section>
<ProductSliderModal
  bind:open={openProductSlide}
  products={items}
  bind:active={productIndex}>no content</ProductSliderModal
>

<style lang="scss">
  @use '../../theme/mixins';
  @use '../../theme/colors';
  .products-list :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
    padding-bottom: 60px;
    @include mixins.mobile {
      padding-bottom: 40px;
    }
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
    height: 10px;
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
    background-color: colors.$blue;
  }

  :global(.products-list .item-product) {
    @include mixins.mobile {
      h3 {
        --mdc-typography-headline3-font-size: 14px;
      }
    }
  }

  .products-list :global(.item-product .thumbnail) {
    width: 100%;
    background-color: #f2f2f2;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    :global(img) {
      object-fit: contain;
    }
  }

  .products-list :global(.item-product .thumbnail .btn-favorite) {
    filter: brightness(0);
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
</style>

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
  import Carousel from './Carousel.svelte';
  import ProductItem from './ProductItem.svelte';

  let dispathcher = createEventDispatcher();
  export let title: string = 'What to Pack';
  export let items: Product[];
  let openProductSlide: boolean = false;
  let productIndex: number;
  function callLikeItem(product: Product) {
    setTimeout(() => {
      dispathcher('likeItem', { product });
    }, 0);
  }

  const carouselConfig = {
    autoplayDuration: 5000,
    duration: 1500,
    infinite: false,
    particlesToShow: 6,
    chevronPosition: 'outside',
    itemsShowMobile: 2,
  };
</script>

<section class="what-to-pack">
  <div class="container">
    <h2 class="mt-0">{title}</h2>
    <div class="products-list m-mb-40">
      {#if items.length > 0}
        <Carousel {...carouselConfig} totalItems={items.length || 0}>
          {#each items as item, i}
            <ProductItem
              {...item}
              {item}
              on:click={() => {
                openProductSlide = true;
                productIndex = i;
              }}
            />
          {/each}
        </Carousel>
      {/if}
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
  }

  .products-list {
    position: relative;
    :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
      background-color: #d3d3d3;
    }
    :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
      height: 10px;
      background-color: #d3d3d3;
    }
    :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
      background-color: colors.$blue;
    }
    :global(.item) {
      padding-right: var(--mdc-layout-grid-gutter-desktop);
    }
    :global(.arrow-outside.left) {
      right: auto;
    }
    :global(.arrow-outside) {
      bottom: -65px;
      top: auto;
    }
    :global(.sc-carousel-dots__container) {
      --sc-color-rgb-light: #000;
      bottom: -5%;
    }

    :global(.sc-carousel-dots__container) {
      display: none;
      @include mixins.mobile {
        display: flex;
      }
    }
  }

  .products-list :global(.item-product .thumbnail) {
    width: 100%;
    background-color: #{colors.$white};
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

  .products-list .image-cover :global(div),
  .products-list .thumbnail .image-cover :global(div) {
    width: 100% !important;
    height: 100% !important;
  }
  .products-list {
    .image-cover :global(img),
    .image-cover :global(div),
    .thumbnail .image-cover :global(img),
    .thumbnail .image-cover :global(div) {
      -webkit-transition: opacity 0.6s, -webkit-filter 0.6s,
        -webkit-transform 0.6s, -webkit-box-shadow 0.3s;
      transition: opacity 0.6s, -webkit-filter 0.6s, -webkit-transform 0.6s,
        -webkit-box-shadow 0.3s;
      -o-transition: filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s;
      transition: filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s;
      transition: filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s,
        -webkit-filter 0.6s, -webkit-transform 0.6s, -webkit-box-shadow 0.3s;
      right: 0;
      width: 100%;
      height: 100%;
      bottom: 0;
      left: 0;
      top: 0;
      position: absolute;
      -o-object-position: 50% 50%;
      object-position: 50% 50%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }
</style>

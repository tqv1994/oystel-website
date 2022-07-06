<script lang="ts">
  import type { UploadFile } from '$lib/store/upload-file';

  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '../blur-image.svelte';
  import Carousel from '../Carousel.svelte';
  import FeaturedImage from '../FeaturedImage.svelte';
  export let images: UploadFile[] = [];
  let featuredImage: UploadFile;
  if (images.length > 0) {
    featuredImage = images[0];
  }
</script>

<div class="slides-product-wrap">
  <div class="thumbnail featured-image">
    <FeaturedImage
      image={featuredImage || undefined}
      style="padding-top:calc(568px)"
      size="small"
    />
  </div>
  <div class="slide-items">
    {#if images.length > 0}
      <Carousel
        perPage={4}
        chevronPosition="outside"
        totalItems={images.length - 1 < 4 ? 4 : images.length - 1}
      >
        {#each images as item, i}
          {#if i > 0}
            <div class="item-image">
              <div
                class="thumbnail"
                on:pointerleave={() => {
                  featuredImage = images[0];
                }}
                on:pointerover={() => {
                  featuredImage = item;
                }}
              >
                <FeaturedImage
                  image={item}
                  size="small"
                  style="padding-top: calc(115/93 * 100%)"
                />
              </div>
            </div>
          {/if}
        {/each}
        {#if images.length <= 5}
          {#each Array(5 - images.length) as _}
            <div class="item-image" />
          {/each}
        {/if}
      </Carousel>
    {/if}
  </div>
</div>

<style type="scss">
  @use '../../../theme/mixins';
  .slide-items {
    padding-top: 24px;
    @include mixins.mobile {
      padding-top: 25px;
    }
    .item-image {
      padding: 0 10px;
      @include mixins.mobile {
        padding: 0 12.5px;
      }
    }
    :global(.arrow-outside) {
      top: auto;
      bottom: -58px;
    }
    :global(.arrow-outside.left) {
      left: 0;
    }
  }
  .slide-items :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
  }
  .slide-items :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
    background-color: #d3d3d3;
  }
  .slide-items :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
    height: 7px;

    background-color: #d3d3d3;
  }
  .slide-items :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
    background-color: #5078bc;
  }
  @media (min-width: 1240px) {
    .slide-items :global(.mdc-layout-grid__inner) {
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
    .slide-items :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)), 1fr)
      );
    }
  }
  @media (max-width: 904px) and (min-width: 600px) {
    .slide-items :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
      );
    }
  }
  @media (max-width: 599px) {
    .slide-items :global(.mdc-layout-grid__inner) {
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

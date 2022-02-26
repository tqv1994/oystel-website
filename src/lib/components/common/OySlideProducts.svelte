<script lang="ts">
import { UploadFile } from '$lib/store/upload-file';

  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
import BlurImage from '../blur-image.svelte';
import Carousel from '../Carousel.svelte';
  export let images: UploadFile[] = [];
  let featuredImage: UploadFile;
  if (images.length > 0) {
    featuredImage = images[0];
  }
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: false,
    particlesToShow: 4,
    chevronPosition: 'inside',
  };
</script>

<div class="slides-product-wrap">
    <div class="thumbnail featured-image">
      <div class="image-cover" style="padding-top:calc(568px)">
        {#if featuredImage}
          <BlurImage {...featuredImage} />
        {:else}
          <BlurImage/>
        {/if}
      </div>
    </div>
    <div class="slide-items">
      {#if images.length > 0}
      <Carousel {...carouselConfig}>
        {#each images as item, i}
          {#if i > 0}
              <div class="item-image">
                <div
                  class="thumbnail"
                  on:mouseover={() => {
                    featuredImage = item;
                  }}
                  on:mouseleave={() => {
                    featuredImage = images[0];
                  }}
                >
                  <div class="image-cover" style="padding-top: calc(93/115 * 100%)">
                    <BlurImage {...featuredImage} />
                  </div>
                </div>
              </div>
          {/if}
        {/each}
      </Carousel>
      {/if}
    </div>
</div>

<style type="scss">
  .slide-items :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
    padding-bottom: 30px;
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

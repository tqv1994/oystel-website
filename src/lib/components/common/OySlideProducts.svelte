<script lang="ts">
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  export let images: string[] = [];
  let featuredImage: string;
  if (images.length > 0) {
    featuredImage = images[0];
  }
</script>

<div class="slides-product-wrap">
  {#if images.length > 0}
    <div class="thumbnail featured-image">
      <div class="image-cover" style="padding-top:calc(568px)">
        <img src={featuredImage} alt="" />
      </div>
    </div>
    <div class="slide-items">
      <LayoutGrid class="p-0 pb-0 pt-25 ">
        {#each images as item, i}
          {#if i > 0}
            <Cell spanDevices={{ desktop: 3, tablet: 2, phone: 1 }}>
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
                  <img src={item} alt="" />
                </div>
              </div>
            </Cell>
          {/if}
        {/each}
      </LayoutGrid>
    </div>
  {/if}
</div>

<style>
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

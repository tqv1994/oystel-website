<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session, url }) => {
    return {
      props: {
        data: await loadFeature(fetch, 'curated-looks-listing'),
      },
    };
  };
</script>

<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Select, { Option } from '@smui/select';
  import { session } from '$app/stores';
  import type { Page } from '$lib/store/page';
  import Carousel from '$lib/components/Carousel.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import CuratedItem from '$lib/components/CuratedItem.svelte';
  import DropSlides from '$lib/components/DropSlides.svelte';
  import OyDeviceDetector from '$lib/components/common/OyDeviceDetector.svelte';
  import ShopTitle from '$lib/components/ShopTitle.svelte';
  import { loadFeature } from '$lib/utils/load';
  export let data: Page;
  let filterActive = 'All';
</script>

<div class="content curated-looks-listing-page">
  {#each data?.sections || [] as section}
    {#if section.__component === 'banners.banner'}
      <ShopTitle
        subTitle={section.headline}
        title={section.name}
        description={section.description}
        gallery={section.gallery}
        galleryPosition="right"
      />
    {:else if section.__component === 'galleries.drop-gallery' && section.name === 'The Latest'}
      <section id="latest-wrap">
        <div class="container d-pl-100 d-pr-100 ">
          <DropSlides title={section.name} drops={section.drops} />
        </div>
      </section>
    {:else if section.__component === 'galleries.drop-gallery' && section.name === null}
      <section class="products-list-wrap">
        <div class="container">
          <div class="text-center d-mb-80 t-mb-80 m-mb-55 filter-wrap">
            <label class="d-mr-100 t-mr-100">Filter Curations</label>
            <Select bind:value={filterActive}>
              <Option value="All"><h5>All</h5></Option>
            </Select>
          </div>
          <div class="products-list">
            <LayoutGrid class="p-0">
              {#each section.drops || [] as drop}
                <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                  <CuratedItem
                    item={drop}
                    heightThumbnail="calc(410/315 * 100%)"
                    classItem="product-item"
                  />
                </Cell>
              {/each}
            </LayoutGrid>
          </div>
        </div>
      </section>
    {/if}
  {/each}
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  @use '../../theme/colors';
  .curated-looks-listing-page {
    @import './src/style/partial/featured-drop.scss';
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/signup-section.scss';
    $desktop-width: 950px;
    #latest-wrap .divider:after {
      background-color: #000;
    }
    .latest-list .latest-item .title {
      height: 30px;
      overflow: hidden;
    }
    #latest-wrap .latest-list .latest-item .divider:after,
    .products-list .product-item .divider:after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .products-list-wrap {
      .product-item {
        @include mixins.mobile {
          --mdc-typography-headline2-font-size: 14px;
          --mdc-typography-headline2-line-height: 18px;
          .text-eyebrow {
            font-size: 11px !important;
            line-height: 16px !important;
          }
        }
      }
    }
    .products-list .product-item .title {
      @include mixins.desktop {
        height: 33px;
        overflow: hidden;
      }
    }
    .products-list .product-item {
      margin-bottom: 40px;
    }
    :global(.mdc-select.smui-select--standard .mdc-select__anchor) {
      height: 35px;
    }
    @media screen and (max-width: 949px) {
      .filter-wrap label {
        display: block;
        margin-bottom: 30px;
      }
      .latest-list .latest-item .title {
        height: 25px;
        overflow: hidden;
      }
    }
  }
</style>

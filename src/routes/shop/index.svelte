<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session, url }) => {
    const productDesigners = await getCollection(fetch, 'product-designer');
    const productTypes = await getCollection(fetch, 'product-type');
    return {
      props: {
        data: await loadFeature(fetch, 'shop'),
        productDesigners,
        productTypes
      },
    };
  };
</script>

<script lang="ts">
  import ShopNavigation from '$lib/components/ShopNavigation.svelte';
  import type { Page } from '$lib/store/page';
  import FeaturedDrop from '$lib/components/FeaturedDrop.svelte';
  import LookList2 from '$lib/components/LookList2.svelte';
  import DropSlides from '$lib/components/DropSlides.svelte';
  import ShopTitle from '$lib/components/ShopTitle.svelte';
  import { loadFeature } from '$lib/utils/load';
  import { getCollection } from '$lib/store/collection';
import type { Kind } from '$lib/store/category';
  export let productDesigners: Kind[];
  export let productTypes: Kind[];
  export let data: Page;
</script>

<ShopNavigation {productDesigners} {productTypes} />
<div class="content shop-page-content">
  {#each data?.sections as section}
    {#if section.__component === 'banners.banner'}
      <ShopTitle
        title={section.name}
        description={section.description}
        subTitle={section.headline}
        gallery={section.gallery}
        galleryPosition="right"
      />
    {:else if section.__component === 'galleries.featured-drop'}
      <FeaturedDrop {...section} />
    {:else if section.__component === 'galleries.drop-gallery'}
      <section class="the-latest-section">
        <div class="container margin-auto medium-max-width">
          <DropSlides title={section.name} drops={section.drops} />
        </div>
      </section>
    {:else if section.__component === 'galleries.look-gallery'}
      <section class="">
        <div class="container margin-auto add-padding">
          <LookList2 items={section.looks} title={section.headline} />
        </div>
      </section>
    {/if}
  {/each}
  <!-- <section class="d-pt-90 t-pt-90 m-pt-50 trips-list-wrap">
    <div class="container">
      <div class="text-center d-mb-80 t-mb-80 m-mb-55 filter-wrap">
        <label class="d-mr-100 t-mr-100">Filter Curations</label>
        <Select bind:value={filterActive}>
          <Option value="Current Drops"><h5>Current Drops</h5></Option>
        </Select>
      </div>
      {#each data.page.sections as section}
        {#if section.__typename === 'ComponentGalleriesDropGallery'}
          <div class="list-featured-drop">
            <DropList data={section} />
          </div>
        {/if}
      {/each}
    </div>
  </section> -->
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  @use '../../theme/colors';
  .shop-page-content {
    @import './src/style/partial/featured-drop.scss';
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/signup-section.scss';

    .header-title.full-width.-slide-content {
      margin-top: 0 !important;
      height: calc(100vh - 88px) !important;
      .image-cover {
        height: calc(100vh - 88px - 68px - 40px) !important;
      }
      @include mixins.mobile {
        .image-cover {
          height: 100% !important;
        }
      }
    }

    .shop-slides {
      height: 100%;
      width: 100%;
      position: relative;
      --wrap-width: 100%;
      .sc-carousel-dots__container {
        position: absolute;
        bottom: 45px;
        --sc-color-rgb-light: #fff;
        @include mixins.desktop {
          display: none;
        }
        .sc-carousel-dot__dot_active {
          opacity: 1;
        }
      }
    }

    section.featured-drops {
      --mdc-layout-grid-gutter-desktop: 15px;
    }

    .shop-slides .dots {
      display: none;
    }

    // .shop-slides .carousel,
    // .shop-slides .slides,
    // .shop-slides .slides div {
    //   height: 90vh;
    //   @include mixins.mobile{
    //     height: 0;
    //     padding-top: 100%;
    //   }
    // }
    .shop-slides .slide-item {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .trips-list-wrap {
      padding-bottom: 110px;
    }

    :global(.mdc-select.smui-select--standard .mdc-select__anchor) {
      height: 35px;
    }

    .trips-list-wrap .item-featured-drop .thumbnail {
      position: relative;
    }
    .trips-list-wrap .item-featured-drop .thumbnail .caption {
      text-transform: uppercase;
      position: absolute;
      bottom: -20px;
      width: calc(100% - 25px);
      background-color: colors.$blue;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 0;
      font-size: 14px;
      line-height: 32px;
      letter-spacing: 0.1px;
    }
    .trips-list-wrap .item-featured-drop .thumbnail .caption span {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    .trips-list-wrap .item-featured-drop.coming .thumbnail .caption {
      background-color: colors.$blue;
    }
    .trips-list-wrap .item-featured-drop:not(.new) {
      white-space: normal;
    }

    .trips-list-wrap .item-featured-drop:not(.new) .caption span {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    .trips-list-wrap .item-featured-drop .title {
      height: 55px;
      overflow: hidden;
    }
    .trips-list-wrap .item-featured-drop .divider::after {
      background-color: #ccc;
    }

    .trips-list-wrap .item-featured-drop {
      margin-bottom: 70px;
    }

    section.featured-drops
      .list-featured-drop
      :global(.mdc-layout-grid__inner) {
      overflow-x: auto;
      grid-auto-flow: column;
    }

    section.featured-drops .list-featured-drop {
      :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
        background-color: colors.$blue;
      }
    }

    #signup-section {
      --mdc-layout-grid-gutter-desktop: 15px;
    }

    @media screen and (max-width: 949px) {
      .shop-slides :global(.carousel),
      .shop-slides :global(.slides),
      .shop-slides :global(.slides div) {
        height: auto;
      }
      .shop-slides :global(.slide-item) {
        padding-top: 70%;
      }
      .header-title .short-description {
        width: 100%;
      }
      .shop-slides :global(.wrap-control) {
        display: none;
      }
      .shop-slides {
        margin-bottom: 20px;
      }
      .shop-slides :global(.dots) {
        display: flex;
        justify-content: start;
        margin-top: 20px;
      }

      .filter-wrap label {
        display: block;
        margin-bottom: 30px;
      }

      .trips-list-wrap {
        padding-bottom: 30px;
      }

      .trips-list-wrap :global(.mdc-select .mdc-select__selected-text) {
        position: absolute;
        text-align: center;
      }

      .trips-list-wrap .item-featured-drop {
        margin-bottom: 50px;
      }

      .trips-list-wrap .item-featured-drop .title {
        height: auto;
      }

      .trips-list-wrap .item-featured-drop :global(.mdc-button) {
        display: none;
      }

      .trips-list-wrap .item-featured-drop .thumbnail .caption {
        padding: 15px 0;
        font-size: 9px;
        line-height: 10px;
        letter-spacing: 0.1px;
        bottom: -15px;
      }
    }
  }
</style>

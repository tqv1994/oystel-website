<script lang="ts" context="module">
  import { HomePageData } from '../home/index.json';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session, page }) => {
    const res = await fetch(`/home.json?_z=${Date.now()}`);
    if (res.ok) {
      const data: HomePageData = await res.json();
      return {
        props: {
          data,
        },
      };
    } else {
      const error = await res.json();
      console.error(error);
    }
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import Select from '@smui/select';
  import { Option } from '@smui/select';
  import NeverMissDrop from '$lib/components/NeverMissDrop.svelte';
  import DropList from '$lib/components/DropList.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import FeatureDrops from '$lib/components/FeatureDrops.svelte';
  import { Drop, dropStore } from '$lib/store/drop';
  import { getItems } from '$lib/store/types';
  import BlurImage from '$lib/components/blur-image.svelte';

  let filterActive = 'Current Drops';
  let configPage = {
    header: {
      page: 'shop',
      transparent: true,
      theme: 'dark',
      currentMenu: 'shop',
    },
  };

  export let data: HomePageData[];

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };
</script>

<div class="content shop-page-content">
  <section
    class="header-title full-width dark d-pt-115 d-pb-20 t-pt-80 t-pb-20 m-pt-90 m-pb-15"
  >
    <div class="content-wrap">
      <div class="container">
        <LayoutGrid class="p-0 mb-15">
          <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
            <div class="content-left">
              <div>
                <span class="text-h3 d-mr-50 m-mr-60">Fashion Drop</span>
                <Button variant="outlined"><Label>Shop the Drop</Label></Button>
              </div>
              <h1 class="d-mb-30 d-mt-30 d-mt-25 m-mb-15">
                Louis Vuitton Resort Collection Summer
              </h1>
              <p class="mb-0 mt-0 short-description">
                First hand experience to craft your perfect vacation.
              </p>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
            <div class="shop-slides">
              <Carousel {...carouselConfig}>
                {#if data.gallery.length > 0}
                  {#each data.gallery as item}
                    <div class="slides">
                      <BlurImage {...item} />
                    </div>
                  {/each}
                {/if}
              </Carousel>
            </div>
          </Cell>
        </LayoutGrid>
        <div class="divider" />
      </div>
    </div>
  </section>
  {#each data.page.sections as section}
    {#if section.__typename === 'ComponentGalleriesDropGallery'}
      <section class="has-padding m-pt-40 m-pb-70" id="featured-drops">
        <FeatureDrops {...section} />
      </section>
    {:else if section.__typename === 'ComponentBannersBanner'}
      <section
        class="d-pt-55 d-pb-70 t-pt-55 t-pb-70 m-pt-20 m-pb-40 full-width"
        id="signup-section"
        style="background-color: #F0F7F8"
      >
        <div class="content-wrap">
          <NeverMissDrop {...section} />
        </div>
      </section>
    {/if}
  {/each}
  <section class="d-pt-90 t-pt-90 m-pt-50 trips-list-wrap">
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
  </section>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  @use '../../theme/colors';
  .shop-page-content {
    @import './src/style/partial/featured-drop.scss';
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/signup-section.scss';

    .header-title {
      background-color: #000;
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

    #featured-drops {
      --mdc-layout-grid-gutter-desktop: 15px;
    }

    .shop-slides .dots {
      display: none;
    }

    .shop-slides .carousel,
    .shop-slides .slides,
    .shop-slides .slides div {
      height: 90vh;
    }
    .shop-slides .slide-item {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .header-title .content-left {
      padding-top: 40vh;
    }
    .header-title .short-description {
      @include mixins.desktop {
        width: 80%;
      }
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

    #featured-drops .list-featured-drop :global(.mdc-layout-grid__inner) {
      overflow-x: auto;
      grid-auto-flow: column;
    }

    #featured-drops .list-featured-drop {
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
      .header-title :global(.mdc-layout-grid__cell:first-child) {
        order: 2;
      }
      .header-title .content-left {
        padding-top: 15px;
        padding-bottom: 20px;
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

    @media (max-width: 1025px) and (min-width: 950px) {
      .header-title .content-left {
        .d-mr-50 {
          margin-right: 10px !important;
        }
      }
    }

    @media (max-width: 1105px) and (min-width: 950px) {
      #signup-section {
        .d-mb-100 {
          margin-bottom: 30px !important;
        }
        .d-mt-145 {
          margin-top: 70px !important;
        }
      }
    }

    @media (max-width: 389px) {
      .header-title .content-left .m-mr-60 {
        margin-right: 40px !important;
      }
    }
  }
</style>

<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session, url }) => {
    const res = await fetch(`/shop/curated-looks.json?_z=${Date.now()}`);
    if (res.ok) {
      const data: Page = await res.json();
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
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Select, { Option } from '@smui/select';
  import { authStore } from '$lib/store/auth';
  import { Page } from '$lib/store/page';
  import Carousel from '$lib/components/Carousel.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import CuratedItem from '$lib/components/CuratedItem.svelte';
  import DropSlides from '$lib/components/DropSlides.svelte';
  import OyDeviceDetector from '$lib/components/common/OyDeviceDetector.svelte';
  export let data: Page;
  let filterActive = 'All';
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };
</script>

<div class="content curated-looks-listing-page">
  {#each data.sections as section}
    {#if section.__typename === 'ComponentBannersBanner'}
      <section
        class="header-title full-width light d-pt-90 d-pb-20  t-pb-20 m-pt-70 m-pb-15"
      >
        <div class="content-wrap">
          <div class="container">
            <LayoutGrid class="p-0">
              <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
                <div class="content-left">
                  <div class="d-mb-55 m-mb-40">
                    <span class="text-eyebrow m-0">{section.headline}</span>
                  </div>
                  <h2 class="m-0 d-mb-15 m-mb-20">{section.name}</h2>
                  <p class="mt-0 d-mb-30 t-mb-30 m-mb-0 short-description">
                    {section.description}
                  </p>
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
                {#if section.gallery.length >= 2}
                  <Carousel {...carouselConfig}>
                    {#each section.gallery as item}
                      <div class="slides">
                        <OyDeviceDetector showInDesktop={true}>
                          <div
                          class="image-cover"
                          style="padding-top: calc(90vh - 87px)"
                        >
                          {#if item !== null}
                            <BlurImage {...item} />
                          {:else}
                            <BlurImage />
                          {/if}
                        </div>
                        </OyDeviceDetector>
                        <OyDeviceDetector showInMobile={true}>
                          <div
                            class="image-cover"
                            style="padding-top: 100%"
                          >
                            {#if item !== null}
                              <BlurImage {...item} />
                            {:else}
                              <BlurImage />
                            {/if}
                        </div>
                        </OyDeviceDetector>
                      </div>
                    {/each}
                  </Carousel>
                {:else}
                  <OyDeviceDetector showInDesktop={true}>
                  <div
                    class="image-cover"
                    style="padding-top: calc(90vh - 87px)"
                  >
                    {#if section.gallery.length > 0}
                      <BlurImage {...section.gallery[0]} />
                    {:else}
                      <BlurImage />
                    {/if}
                  </div>
                  </OyDeviceDetector>
                  <OyDeviceDetector showInMobile={true}>
                    <div
                    class="image-cover"
                    style="padding-top: 100%"
                  >
                    {#if section.gallery.length > 0}
                      <BlurImage {...section.gallery[0]} />
                    {:else}
                      <BlurImage />
                    {/if}
                  </div>
                  </OyDeviceDetector>
                {/if}
              </Cell>
            </LayoutGrid>
          </div>
        </div>
      </section>
    {:else if section.__typename === 'ComponentGalleriesDropGallery' && section.name === 'The Latest'}
      <section id="latest-wrap">
        <div class="container d-pl-100 d-pr-100 ">
          <DropSlides title={section.name} drops={section.drops} />
        </div>
      </section>
    {:else if section.__typename === 'ComponentGalleriesDropGallery' && section.name === null}
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

    .header-title {
      background-color: #f0f7f8;
    }
    .header-title .thumbnail {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .header-title .content-left {
      padding-top: 315px;
    }
    .header-title .short-description {
      @include mixins.desktop {
        width: 80%;
      }
    }
    .header-title .divider:after,
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
      .header-title .thumbnail {
        padding-bottom: 100%;
        height: auto;
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
      .latest-list .latest-item .title {
        height: 25px;
        overflow: hidden;
      }
    }
  }
</style>

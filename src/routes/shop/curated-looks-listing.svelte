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
  import Layout from '$lib/components/common/Layout.svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Button, { Icon, Label } from '@smui/button';
  import IconButton, { Icon as Icon2 } from '@smui/button';
  import Select, { Option } from '@smui/select';
  import { authStore } from '$lib/store/auth';
  import { Page } from '$lib/store/page';
  import Section from '@smui/top-app-bar/src/Section.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
import Item from '$lib/components/Item.svelte';
import DropList from '$lib/components/DropList.svelte';
import CuratedItem from '$lib/components/CuratedItem.svelte';
  export let data: Page;
  console.log(data);
  let openSignupModal, openSigninModal;
  let userModel = $authStore.user;
  let filterActive = 'All';
  let configPage = {
    header: {
      page: 'shop',
      transparent: true,
      theme: 'light',
      currentMenu: 'shop',
    },
  };
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };
  function callOpenSignupModal() {
    if (!userModel) {
      openSignupModal = true;
      openSigninModal = false;
    }
    openSignupModal = true;
    openSigninModal = false;
  }
  function callOpenSigninModal() {
    if (!userModel) {
      openSignupModal = false;
      openSigninModal = true;
    }
  }
</script>

<div class="content curated-looks-listing-page">
  {#each data.sections as section}
    {#if section.__typename === 'ComponentBannersBanner'}
      <section
        class="header-title full-width light d-pt-115 d-pb-20 t-pt-80 t-pb-20 m-pt-90 m-pb-15"
      >
        <div class="content-wrap">
          <div class="container">
            <LayoutGrid class="p-0 mb-15">
              <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
                <div class="content-left">
                  <div class="d-mb-55 m-mb-40">
                    <span class="text-h3 m-0">{section.headline}</span>
                  </div>
                  <h1 class="m-0 d-mb-15 m-mb-20">{section.name}</h1>
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
                        <BlurImage {...item} />
                      </div>
                    {/each}
                  </Carousel>
                {:else}
                  <div
                    class="image-cover"
                    style="padding-top: calc(90vh - 155px)"
                  >
                    <BlurImage {...section.gallery[0]} />
                  </div>
                {/if}
              </Cell>
            </LayoutGrid>
            <div class="divider t-block m-none" />
          </div>
        </div>
      </section>
    {:else if section.__typename === "ComponentGalleriesDropGallery" && section.name === "The Latest"}
        <section class="d-pt-60 t-pt-60 m-pt-40" id="latest-wrap">
            <div class="container d-pl-160 d-pr-160 t-pl-80 t-pr-80 d-pb-80 t-pb-80">
                <h1 class="mt-0 mb-50">{section.name}</h1>
                <div class="latest-list">
                    <LayoutGrid class="p-0">
                        {#each section.drops as drop}
                            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
                                <CuratedItem item={drop} heightThumbnail="calc(555/739 * 100%)" classItem="latest-item"/>
                            </Cell>
                        {/each}
                    </LayoutGrid>
                </div>
            </div>
            <div class="container">
                <div class="divider" />
            </div>
      </section>
    {:else if section.__typename === "ComponentGalleriesDropGallery" && section.name === null}
    <section
        class="d-pt-90 d-pb-45 t-pt-90 t-pb-45 m-pb-45 m-pt-50 products-list-wrap"
    >
        <div class="container">
        <div class="text-center d-mb-80 t-mb-80 m-mb-55 filter-wrap">
            <label class="d-mr-100 t-mr-100">Filter Curations</label>
            <Select bind:value={filterActive}>
            <Option value="All"><h5>All</h5></Option>
            </Select>
        </div>
        <div class="products-list">
            <LayoutGrid class="p-0">
                {#each section.drops as drop}
                    <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                        <CuratedItem item={drop} heightThumbnail="calc(410/315 * 100%)" classItem="product-item"/>
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
      padding-bottom: 70px;
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
        height: 50px;
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

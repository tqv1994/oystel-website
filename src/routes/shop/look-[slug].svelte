<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Button from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import { Svg } from '@smui/common/elements';
  import QuickShopModal from '$lib/components/modals/QuickShopModal.svelte';
  import { parseId } from '$lib/utils/fetch';
  import { Look } from '$lib/store/look';

  export const load: Load = async ({ fetch, session, params }) => {
    const id = parseId(params.slug);
    let look: Look;
    let looks: Look[] = [];
    const res = await fetch(`/shop/look-${id}.json`);
    if (res.ok) {
      look = await res.json();
    } else {
      const error = await res.json();
      console.log(error);
    }
    const resLooks = await fetch(`/shop/looks.json?limit=5`);
    if (resLooks.ok) {
      looks = await resLooks.json();
    } else {
      const error = await res.json();
      console.log(error);
    }
    return {
      props: {
        id,
        look,
        looks: (looks || []).reduce((acc: Look[], item: Look) => {
          if (item.id !== look.id) {
            acc.push(item);
          }
          return acc;
        }, []),
      },
    };
  };
</script>

<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import LooksList from '$lib/components/LooksList.svelte';
  import ProductShow from '$lib/components/product-show.svelte';
  import { onMount } from 'svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  export let look: Look;
  export let looks: Look[];
  let openQuickShopModal = false;
  let stickyShow = false;

  onMount(() => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 960) {
      stickyShow = true;
    } else {
      stickyShow = false;
    }
  });

  const onResize = (event: Event) => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 960) {
      stickyShow = true;
    } else {
      stickyShow = false;
    }
  };
</script>

<svelte:window on:resize={onResize} />
<div class="content shop-detail-page-content">
  <section class="pt-100 d-pb-50 t-pb-150 m-pb-40 ">
    <div class="container">
      <LayoutGrid class="p-0">
        <Cell
          spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
          class="content-left"
        >
          <div class="get-the-look-item mb-30">
            <div class="thumbnail d-mb-20 m-mb-25">
              <div
                class="image-cover"
                style="padding-top: 0; height: calc(90vh - 100px)"
              >
                {#if look.gallery && look.gallery.length > 0}
                  <BlurImage {...look.gallery[0]} />
                {:else}
                  <BlurImage />
                {/if}
              </div>
            </div>
            <!-- <p class="text-eyebrow">
              Swimsuit, Zimmerman; Dress, Zimmerman; Necklace, Lauren Rubinski
            </p> -->
          </div>
          <div class="d-pl-115">
            <div class="text-description-wrap mb-50">
              <Markdown source={look.description || ''} />
            </div>
            {#if looks.length > 0}
              <LooksList items={looks} />
            {/if}
          </div>
        </Cell>
        <Cell
          spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
          class="content-right"
        >
          <div
            class="header-title d-pt-100 d-pb-100 d-pl-120 t-pb-50 t-pl-60 {stickyShow
              ? 'fixed'
              : ''}"
          >
            <LayoutGrid class="p-0">
              <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                <p class="text-eyebrow">Fashion</p>
              </Cell>
              <Cell
                spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                class="text-right"
              >
                <IconButton class="mt--15">
                  <Icon component={Svg} viewBox="0 0 16.833 24.384">
                    <g
                      id="Group_440"
                      data-name="Group 440"
                      transform="translate(-1661.127 -152.323)"
                    >
                      <path
                        id="Path_319"
                        data-name="Path 319"
                        d="M156.364-5869.48l4.489-4.489,4.489,4.489"
                        transform="translate(1508.69 6027)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <g id="Group_438" data-name="Group 438">
                        <path
                          id="Path_318"
                          data-name="Path 318"
                          d="M154.564-5867H150.7v15.309h15.833V-5867H162.8"
                          transform="translate(1510.927 6027.899)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <path
                          id="Path_320"
                          data-name="Path 320"
                          d="M161.543-5858.913v-14.377"
                          transform="translate(1508 6027)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                      </g>
                    </g>
                  </Icon>
                </IconButton>
              </Cell>
            </LayoutGrid>
            <h1 class="d-mb-30 m-mb-20">
              {look.name || ''}
            </h1>
            <p class="text-input d-mb-30 m-mb-25">
              Curated by: | Oysteo Partner
            </p>
            <Button
              variant="outlined"
              class="t-block m-none"
              on:click={() => {
                openQuickShopModal = true;
              }}><label>Quick Shop the Edit</label></Button
            >
          </div>
        </Cell>
      </LayoutGrid>
    </div>
  </section>
  <section class="recommended-wrap d-mb-130 m-mb-50">
    <ProductShow bind:items={look.products} title="Shop the Story" />
  </section>
  <QuickShopModal
    products={look.products || []}
    bind:open={openQuickShopModal}
  />
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .shop-detail-page-content {
    @import './src/style/partial/thumbnail';
    .header-title {
      background-color: #fff;
    }
    @include mixins.desktop {
      .header-title {
        padding-right: var(--mdc-layout-grid-margin-desktop);
      }
      .header-title:global(:not(.fixed)) {
        margin-top: 80px;
        margin-right: calc(var(--mdc-layout-grid-margin-desktop) * (-1));
      }
    }

    .header-title.fixed {
      // position: fixed;
      position: sticky !important;
      top: 50% !important;
      left: auto !important;
      transform: translateY(-50%);
      width: auto;
      z-index: 1 !important;
    }

    @media screen and (min-width: 1441px) {
      .header-title:global(.fixed) {
        margin-right: calc(calc(100vw / 2 - 1440px / 2));
      }
    }
    @media screen and (max-width: 1440px) and (min-width: 950px) {
      .header-title:global(.fixed) {
        padding-right: 0;
      }
    }

    .get-the-look-item :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
      --mdc-layout-grid-gutter-tablet: 0;
      --mdc-layout-grid-gutter-phone: 0;
    }

    .divider:after {
      background-color: #000;
    }

    .mdc-icon-button {
      top: 5px;
    }

    .header-title {
      top: -200px;
      transition: top 2s ease;
      &:not(.fixed) {
        @include mixins.desktop {
          margin-top: 15vh;
        }
      }
    }
    @include mixins.desktop {
      .content-right {
        margin-right: calc(-1 * var(--mdc-layout-grid-margin-desktop));
      }
    }

    @include mixins.mobile {
      .content {
        --mdc-typography-headline5-font-size: 14px;
      }
      .content-right {
        order: 2;
      }
      .content-left {
        order: 4;
      }
      .header-title {
        position: static;
        transform: translateY(0);
        background-color: transparent;
        z-index: auto;
      }
      .recommended-wrap .product-item .title {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0;
      }
    }
  }
  /*@media  (max-width: 1239px){*/
  /*    :global(.fixed, .is_sticky){*/
  /*        position: static !important;*/
  /*    }*/
  /*}*/
</style>

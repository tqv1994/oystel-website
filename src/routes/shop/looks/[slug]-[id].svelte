<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import IconButton, { Icon } from '@smui/icon-button';
  import { Svg } from '@smui/common/elements';
  import QuickShopModal from '$lib/components/modals/QuickShopModal.svelte';
  import type { Look } from '$lib/store/look';

  export const load: Load = async ({ fetch, session, params: { id } }) => {
    id = id.substring(id.lastIndexOf('-')+1);
    let looks: Look[] = [];
    const look = await trySearchGetOne<Look>(fetch, 'look', id);
    console.log(look);
    const resLooks = await trySearch<Look>(fetch, 'look', {
      limit: 5,
    });
    looks = resLooks?.hits || [];
    return {
      props: {
        id,
        look,
        looks: (looks || []).reduce((acc: Look[], item: Look) => {
          if (look) {
            if (
              item.id.toString() !==
              look?.id.substring(look.id.lastIndexOf('-') + 1)
            ) {
              acc.push(item);
            }
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
  import { trySearch, trySearchGetOne } from '$lib/store/search';
  import Item from '$lib/components/Item.svelte';
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
{#if look}
  <div class="content shop-detail-page-content">
    <section class="pt-50 d-pb-50 t-pb-150 m-pb-40 ">
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell
            spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
            class="content-left"
          >
            <div class="get-the-look-item mb-30">
              <div class="thumbnail d-mb-20 m-mb-25">
                <div class="image-cover look-hero-image">
                  {#if look?.gallery && Array.isArray(look.gallery) && look.gallery.length > 0}
                    <BlurImage {...look.gallery[0]} />
                  {:else}
                    <BlurImage alt={look?.name || ''} />
                  {/if}
                </div>
              </div>
              <p class="text-eyebrow">
                {look.intro || ''}
              </p>
            </div>
            <div class="inset-content">
              <div class="text-description-wrap mb-50 first-description">
                <Markdown source={look.description || ''} />
              </div>
              {#if looks.length > 0}
                <LooksList items={looks} />
              {/if}
              <div class="text-description-wrap second-description">
                <Markdown source={look.description2 || ''} />
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
            class="content-right"
          >
            <div class="header-title {stickyShow ? 'fixed' : ''}">
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
              <p class="text-input d-mb-30 m-mb-25 curated-by">
                Curated by: {look.curatedBy || ''} | Oysteo Partner
              </p>
              <!-- <Button
                variant="outlined"
                class="t-block m-none"
                on:click={() => {
                  openQuickShopModal = true;
                }}><label>Quick Shop the Edit</label></Button
              > -->
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="recommended-wrap d-mb-4">
      <ProductShow bind:items={look.products} title="Shop the Story" />
    </section>
    <QuickShopModal
      products={look.products || []}
      bind:open={openQuickShopModal}
    />
  </div>
{/if}

<style lang="scss" global>
  @use '../../../theme/mixins';
  .shop-detail-page-content {
    @import './src/style/partial/thumbnail';
    .header-title {
      background-color: #fff;

      h1 {
        @include mixins.mobile {
          margin-top: 16px !important;
        }
      }
    }
    @include mixins.desktop {
      .header-title:global(:not(.fixed)) {
        margin-top: 80px;
        margin-right: calc(var(--mdc-layout-grid-margin-desktop) * (-1));
      }
    }

    .look-hero-image {
      height: calc(100vh - 128px) !important;
      padding-top: 0 !important;
      @include mixins.mobile {
        height: auto !important;
        padding-top: 100% !important;
      }
    }

    .header-title.fixed {
      // position: fixed;
      position: sticky !important;
      top: 50% !important;
      left: auto !important;
      transform: translateY(-50%);
      width: 76%;
      z-index: 1 !important;
      padding: 0;
      margin-left: 64px;

      h1 {
        font-size: 45px;
        line-height: 45px;
        width: 100%;
        margin-bottom: 16px !important;
        margin-top: 8px !important;
      }

      .curated-by {
        margin-bottom: 40px !important;
      }
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

    .get-the-look-item {
      margin-bottom: 64px !important;
      @include mixins.mobile {
        margin-bottom: 56px !important;
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

    .recommended-wrap {
      padding-top: 0 !important;

      .what-to-pack {
        @include mixins.mobile {
          padding-top: 0;
        }
      }
    }

    .inset-content {
      padding-left: 15.37433%;
      @include mixins.mobile {
        padding-left: 0;
      }
    }

    .text-description-wrap {
      &.first-description {
        @include mixins.mobile {
          margin-bottom: 104px !important;
        }
      }
      &.second-description {
        margin-bottom: 32px;
        @include mixins.mobile {
          margin-bottom: 0;
        }
      }
    }

    :global(.first-look-item) {
      margin-bottom: 24px;
      @include mixins.mobile {
        margin-bottom: 8px;
      }
    }

    :global(.extra-look-items) {
      .image-cover {
        @include mixins.mobile {
          padding-top: 100% !important;
        }
      }
      h5 {
        @include mixins.mobile {
          margin-bottom: 32px !important;
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

<script lang="ts" context="module">
  export const load: Load = async ({ fetch, session, url }) => {
    return {
      props: {
        data: await loadFeature(fetch, 'fashion-drops'),
      },
    };
  };
</script>

<script lang="ts">
  import type { Page } from '$lib/store/page';
  import ProductList from '$lib/components/ProductList.svelte';
  import ShopTitle from '$lib/components/ShopTitle.svelte';
  import { loadFeature } from '$lib/utils/load';
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import OySlideProducts from '$lib/components/common/OySlideProducts.svelte';

  export let data: Page;
</script>

<div class="content fashion-drops-page">
  {#each data.sections || [] as section}
    {#if section.__component === 'galleries.featured-drop' && section.drop}
      <ShopTitle
        title={section.drop.name}
        subTitle="Fashion Drop"
        gallery={section.drop.gallery}
        showLikeIcon={true}
        showShareIcon={true}
        description={section.drop.description}
        theme="dark"
        background="#000"
      />
    {:else if section.__component === 'galleries.look-gallery' && section?.looks && (section.looks || []).length > 0}
      <section id="shop-by-look-wrap">
        <div class="container margin-auto add-padding">
          <h2 class="mt-0 d-mb-55 m-mb-25">{section.headline}</h2>
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
              <OySlideProducts images={section.looks[0].gallery} />
            </Cell>
            <Cell spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}>
              <div class="d-pt-90 t-pt-0 m-pt-25 ">
                <h5 class="d-mb-40 mt-0 shop-by-look-wrap-h5">
                  {(section.looks[0].products || []).length} items in this look
                </h5>
                <div class="products-list">
                  <ProductList
                    columnsDesktop={4}
                    items={section.looks[0].products || []}
                  />
                  <!-- <LayoutGrid class="p-0">
                    {#each section.looks[0].products || [] as product}
                      <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                        <ProductItem item={product} {...product} />
                      </Cell>
                    {/each}
                  </LayoutGrid> -->
                </div>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      </section>
    {:else if section.__component === 'galleries.product-gallery'}
      <section class="shop-the-collection">
        <div class="container margin-auto add-padding">
          <h2 class="mt-0">{section.name}</h2>
          {#if section.products && section.products.length > 0}
            <div class="products-list">
              <ProductList columnsDesktop={6} items={section.products} />
            </div>
          {/if}
        </div>
      </section>
    {/if}
  {/each}
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .fashion-drops-page {
    @import '../../style/partial/thumbnail.scss';
    .shop-slides {
      height: 100%;
      width: 100%;
      --wrap-width: 100%;
      position: relative;

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

    .shop-slides :global(.dots) {
      display: none;
    }

    .shop-slides :global(.carousel),
    .shop-slides :global(.slides),
    .shop-slides :global(.slides div) {
      height: calc(90vh - 87px);
    }
    .shop-slides :global(.slide-item) {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    :global(.products-list .item-product) {
      @include mixins.mobile {
        h3 {
          --mdc-typography-headline3-font-size: 14px;
        }
      }
    }

    .products-list .item .thumbnail {
      width: 100%;
      .image-cover {
        padding-top: 145% !important;
      }
      background-color: #f2f2f2;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }

    .products-list .item {
      padding-bottom: 30px;
    }

    .products-list .item .thumbnail :global(.btn-favorite) {
      filter: brightness(0);
    }

    .shop-by-look-wrap-h5 {
      margin-bottom: 32px !important;
    }

    .mdc-button {
      width: 182px;
      min-width: 182px;
      padding: 0 15px;
      &.custom-button {
        width: auto;
        min-width: auto;
        font-size: 16px;
        padding: 0;
      }
    }

    @include mixins.mobile {
      .shop-slides :global(.carousel),
      .shop-slides :global(.slides),
      .shop-slides :global(.slides div) {
        height: auto;
      }
      .header-title .short-description {
        width: 100%;
      }
      .shop-slides :global(.wrap-control) {
        display: none;
      }
      .shop-slides :global(.dots) {
        display: flex;
        justify-content: start;
        margin-top: 80px;
      }

      .filter-wrap label {
        display: block;
        margin-bottom: 30px;
      }

      .trips-list-wrap .item-featured-drop .title {
        height: auto;
      }

      .trips-list-wrap .item-featured-drop :global(.mdc-button) {
        display: none;
      }
    }

    @include mixins.mobile {
      #shop-by-look-wrap {
        .featured-image {
          .image-cover {
            padding-top: 121.95122% !important;
          }
        }
      }

      #shop-by-look-wrap h5 {
        text-align: center;
      }
      .products-list .item-product {
        padding-bottom: 20px;
      }

      .shop-the-collection {
        padding-top: 40px;

        h2 {
          margin-bottom: 32px;
        }
      }
    }
  }
</style>

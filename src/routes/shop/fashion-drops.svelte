<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore } from '$lib/store/auth';
  import Layout from '$lib/components/common/Layout.svelte';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import { Icon } from '@smui/common';
  import IconButton from '@smui/icon-button';
  import { Svg } from '@smui/common/elements';
  import OySlideProducts from '$lib/components/common/OySlideProducts.svelte';
  import { Product } from '$lib/store/product';
  import { productStore } from '$lib/store/product';

  export const load: Load = async ({ fetch, session, url }) => {
    const res = await fetch(`/shop/fashion-drops.json?_z=${Date.now()}`);
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
  import Carousel from '$lib/components/Carousel.svelte';
  import { Page } from '$lib/store/page';
  import BlurImage from '$lib/components/blur-image.svelte';
  import Item from '$lib/components/Item.svelte';
import ProductList from '$lib/components/ProductList.svelte';
import Section from '@smui/top-app-bar/src/Section.svelte';

  export let data: Page;
  console.log(data);

  let imageSlidesProduct = [
    '/img/shop/slide-1.jpg',
    '/img/shop/slide-2.jpg',
    '/img/shop/slide-3.jpg',
    '/img/shop/slide-4.jpg',
    '/img/shop/slide-5.jpg',
    '/img/shop/slide-2.jpg',
    '/img/shop/slide-3.jpg',
    '/img/shop/slide-4.jpg',
    '/img/shop/slide-5.jpg',
  ];
  let configPage = {
    header: {
      page: 'shop',
      transparent: true,
      theme: 'dark',
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

  let products: Product[] = [];
  productStore.subscribe(({ items }) => {
    products = Object.values(items);
  });
</script>

<div class="content fashion-drops-page">
  {#each data.sections as section}
    {#if section.__typename === 'ComponentGalleriesFeaturedDrop' && section.drop}
      <section class="header-title full-width dark">
        <div class="content-wrap">
          <div class="container">
            <LayoutGrid class="p-0 mb-15">
              <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
                {#if section.drop.gallery && section.drop.gallery.length >= 2}
                  <Carousel {...carouselConfig}>
                    {#each section.drop.gallery as item}
                      <div class="slides">
                        <div
                          class="image-cover"
                          style="padding-top: calc(90vh - 87px)"
                        >
                          <BlurImage {...item} />
                        </div>
                      </div>
                    {/each}
                  </Carousel>
                {:else if section.drop.gallery && section.drop.gallery.length == 1}
                  <div
                    class="image-cover"
                    style="padding-top: calc(90vh - 87px)"
                  >
                    {#if section.drop.gallery.length > 0}
                      <BlurImage {...section.gallery[0]} />
                    {/if}
                  </div>
                {:else}
                  <div
                    class="image-cover"
                    style="padding-top: calc(90vh - 87px)"
                  >
                    <BlurImage />
                  </div>
                {/if}
              </Cell>
              <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
                <div class="content-left">
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      <span class="text-eyebrow">Fashion Drop</span>
                    </Cell>
                    <Cell
                      spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                      class="text-right"
                    >
                      <IconButton class="pl-0 pr-0 m-0 btn-like">
                        <Icon component={Svg} viewBox="0 0 16.249 14.588">
                          <g
                            id="Icon_-_Heart"
                            data-name="Icon - Heart"
                            transform="translate(0.125 0.125)"
                          >
                            <path
                              id="Heart_Off"
                              data-name="Heart Off"
                              d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01"
                              transform="translate(0.001)"
                              fill="#fff"
                              stroke="#f0f7f8"
                              stroke-width="0.25"
                              fill-rule="evenodd"
                            />
                          </g>
                        </Icon>
                      </IconButton>
                    </Cell>
                  </LayoutGrid>
                  <h2 class="m-mt-50">{section.drop.name}</h2>
                  <p class="short-description">
                    {@html section.drop.description}
                  </p>
                </div>
              </Cell>
            </LayoutGrid>
          </div>
        </div>
      </section>
    {:else if section.__typename === 'ComponentGalleriesLookGallery' && section.looks && section.looks.length > 0}
      <section
        id="shop-by-look-wrap"
      >
        <div class="container">
          <h2 class="mt-0 d-mb-55 m-mb-25">{section.headline}</h2>
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
              <OySlideProducts images={section.looks[0].gallery} />
            </Cell>
            <Cell spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}>
              <div class="d-pt-90 t-pt-0 m-pt-25 ">
                <h5 class="d-mb-40 t-mb-40 m-mb-25 mt-0">
                  {section.looks[0].products.length || 0} items in this look
                </h5>
                <div class="products-list">
                  <LayoutGrid class="p-0">
                    {#each section.looks[0].products || [] as product}
                      <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                        <Item item={product} {...product} />
                      </Cell>
                    {/each}
                  </LayoutGrid>
                </div>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      </section>
      {:else if section.__typename === 'ComponentGalleriesProductGallery'}
        <section >
          <div class="container">
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
    .header-title {
      padding-top: 78px;
      padding-bottom: 20px;
      @include mixins.mobile {
        padding-bottom: 64px;
      }
      --mdc-layout-grid-gutter-desktop: 30px;
      background-color: #000;
    }
    .header-title :global(.btn-like) {
      top: -10px;
    }
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
    .header-title .content-left {
      padding-top: 30vh;
      padding-bottom: 180px;
    }
    .header-title .short-description {
      width: 80%;
    }

    :global(.products-list .item-product) {
      @include mixins.mobile {
        h3 {
          --mdc-typography-headline3-font-size: 14px;
        }
      }
    }

    .products-list .item-product .thumbnail {
      width: 100%;
      padding-bottom: 145%;
      background-color: #f2f2f2;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }

    .products-list .item-product {
      padding-bottom: 30px;
    }

    .products-list .item-product .thumbnail :global(.btn-favorite) {
      filter: brightness(0);
    }

    @include mixins.mobile {
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
      .shop-slides :global(.dots) {
        display: flex;
        justify-content: start;
        margin-top: 80px;
      }

      .header-title .content-left {
        padding-top: 10px;
        padding-bottom: 20px;
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
      #shop-by-look-wrap h5 {
        text-align: center;
      }
      .products-list .item-product {
        padding-bottom: 20px;
      }
    }
  }
</style>

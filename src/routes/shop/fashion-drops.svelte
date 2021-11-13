<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore } from '$lib/store/auth';
  import Layout from '$lib/components/common/Layout.svelte';
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import Svg from '@smui/common/elements/Svg.svelte';
  import OySlideProducts from '$lib/components/common/OySlideProducts.svelte';
  import { Product } from '$lib/store/product';
  import { productStore } from '$lib/store/product';

  export const load: Load = async ({ fetch, session, page }) => {
    const res = await fetch(`/page/product/product-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data: ProductListsData = await res.json();
      // data.experiences = data.experiences.concat(data.experience);
      // TODO: Convert data to classes
      updateProductStore(data.products);
    } else {
      const error = await res.json();
      console.log(error);
    }
    return { props: {} };
  };
</script>

<script lang="ts">
  let userModel = $authStore.user;
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

  let products: Product[] = [];
  productStore.subscribe(({ items }) => {
    products = Object.values(items);
  });
</script>

<Layout config={configPage}>
  <div class="content">
    <section
      class="header-title full-width dark d-pt-115 d-pb-20 t-pt-80 t-pb-20 m-pt-90 m-pb-15"
    >
      <div class="content-wrap">
        <div class="container">
          <LayoutGrid class="p-0 mb-15">
            <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
              <div class="shop-slides">
                <OyCarousel perPage={{ 800: 1 }} draggable={false}>
                  <span class="control" slot="left-control">
                    <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
                  </span>
                  <div
                    class="slide-content slide-item"
                    style="background-image: url(/img/slides/shop-slide-2.jpg)"
                  />
                  <div
                    class="slide-content slide-item"
                    style="background-image: url(/img/slides/shop-slide-1.jpg)"
                  />
                  <span class="control" slot="right-control">
                    <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
                  </span>
                </OyCarousel>
              </div>
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
                <h1 class="m-mt-50">Louis Vuitton Resort Collection Summer</h1>
                <p class="short-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ac volutpat neque. Suspendisse varius vitae sem in elementum.
                  Pellentesque efficitur est lectus, una vehicula scelerisque
                  magna congue a. Phasellus suscipit sed risus eu malesuada.
                </p>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </section>
    <section class="has-padding d-pb-0 m-pt-40 m-pb-70" id="shop-by-look-wrap">
      <div class="container">
        <h1 class="mt-0 d-mb-55 m-mb-25">Shop By Look</h1>
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 4, mobile: 4, tablet: 8 }}>
            <OySlideProducts images={imageSlidesProduct} />
          </Cell>
          <Cell spanDevices={{ desktop: 8, mobile: 4, tablet: 8 }}>
            <div class="d-pt-90 t-pt-0 m-pt-25 ">
              <h5 class="d-mb-40 t-mb-40 m-mb-25 mt-0">3 items</h5>
              <div class="products-list">
                <LayoutGrid class="p-0">
                  <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                    <a href="/shop/curated-looks-listing">
                      <div class="item-product">
                        <div
                          class="thumbnail"
                          style="background-image: url(/img/products/product-7.png)"
                        >
                          <IconButton class="btn-favorite">
                            <Icon2
                              class="like"
                              component={Svg}
                              viewBox="-4 -4 24 24"
                            >
                              <path
                                d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                                transform="translate(0.001)"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </Icon2>
                            <Icon2
                              class="liked"
                              component={Svg}
                              viewBox="-4 -4 24 24"
                            >
                              <path
                                d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                                transform="translate(0)"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </Icon2>
                          </IconButton>
                        </div>
                        <p class="text-eyebrow mt-25">Louis Vuitton</p>
                        <h3>Game on Flower Dress</h3>
                      </div>
                    </a>
                  </Cell>
                  <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                    <a href="/shop/curated-looks-listing">
                      <div class="item-product">
                        <div
                          class="thumbnail"
                          style="background-image: url(/img/products/product-8.png)"
                        >
                          <IconButton class="btn-favorite">
                            <Icon2
                              class="like"
                              component={Svg}
                              viewBox="-4 -4 24 24"
                            >
                              <path
                                d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                                transform="translate(0.001)"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </Icon2>
                            <Icon2
                              class="liked"
                              component={Svg}
                              viewBox="-4 -4 24 24"
                            >
                              <path
                                d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                                transform="translate(0)"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </Icon2>
                          </IconButton>
                        </div>
                        <p class="text-eyebrow mt-25">Louis Vuitton</p>
                        <h3>Peach Effect Oversized Coat</h3>
                      </div>
                    </a>
                  </Cell>
                  <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                    <a href="/shop/curated-looks-listing">
                      <div class="item-product">
                        <div
                          class="thumbnail"
                          style="background-image: url(/img/products/product-9.png)"
                        >
                          <IconButton class="btn-favorite">
                            <Icon2
                              class="like"
                              component={Svg}
                              viewBox="-4 -4 24 24"
                            >
                              <path
                                d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                                transform="translate(0.001)"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </Icon2>
                            <Icon2
                              class="liked"
                              component={Svg}
                              viewBox="-4 -4 24 24"
                            >
                              <path
                                d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                                transform="translate(0)"
                                fill="#fff"
                                fill-rule="evenodd"
                              />
                            </Icon2>
                          </IconButton>
                        </div>
                        <p class="text-eyebrow mt-25">Louis Vuitton</p>
                        <h3>Platform Desert Boot</h3>
                      </div>
                    </a>
                  </Cell>
                </LayoutGrid>
              </div>
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="d-pt-100 d-pb-100 m-pt-40 m-pb-40">
      <div class="container">
        <h1 class="mt-0">Shop the Collection</h1>
        <div class="products-list">
          <LayoutGrid class="p-0">
            {#if products && products.length > 0}
              {#each products as product}
                <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
                  <a href="#">
                    <div class="item-product">
                      <div
                        class="thumbnail"
                        style="background-image: url({product.gallery[0]?.url})"
                      >
                        <IconButton class="btn-favorite">
                          <Icon
                            class="like"
                            component={Svg}
                            viewBox="-4 -4 24 24"
                          >
                            <path
                              d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                              transform="translate(0.001)"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                          </Icon>
                          <Icon
                            class="liked"
                            component={Svg}
                            viewBox="-4 -4 24 24"
                          >
                            <path
                              d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                              transform="translate(0)"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                          </Icon>
                        </IconButton>
                      </div>
                      <p class="text-eyebrow mt-25">{product.brand}</p>
                      <h3 class="">{product.name}</h3>
                    </div>
                  </a>
                </Cell>
              {/each}
            {/if}
          </LayoutGrid>
        </div>
      </div>
    </section>
  </div>
</Layout>

<style lang="scss">
  $desktop-width: 950px;
  @mixin mobile {
    @media (max-width: #{$desktop-width - 1px}) {
      @content;
    }
  }
  @mixin desktop {
    @media (min-width: #{$desktop-width}) {
      @content;
    }
  }
  .header-title {
    background-color: #000;
  }
  .header-title :global(.btn-like) {
    top: -10px;
  }
  .shop-slides {
    height: 100%;
    width: 100%;
    --wrap-width: 100%;
  }

  .shop-slides :global(.dots) {
    display: none;
  }

  .shop-slides :global(.carousel),
  .shop-slides :global(.slides),
  .shop-slides :global(.slides div) {
    height: 100%;
  }
  .shop-slides :global(.slide-item) {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .header-title .content-left {
    padding-top: 120px;
    padding-bottom: 180px;
  }
  .header-title .short-description {
    width: 80%;
  }

  :global(.products-list .item-product) {
    @include mobile {
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

  @include mobile {
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

  @include mobile {
    #shop-by-look-wrap h5 {
      text-align: center;
    }
    .products-list .item-product {
      padding-bottom: 20px;
    }
  }
</style>

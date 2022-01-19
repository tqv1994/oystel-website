<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { insertToStore } from '$lib/store/types';
  import { parseId } from '$lib/utils/fetch';
  import { Experience, experienceStore } from '$lib/store/experience';
  import ProductSliderModal from '$lib/components/modals/ProductSliderModal.svelte';
  import ProductShow from '$lib/components/product-show.svelte';
  import LookShow from '$lib/components/look-show.svelte';
  import { authStore } from '$lib/store/auth';
  import { contains } from '$lib/utils/array';
  import { Product } from '$lib/store/product';
  import { Destination } from '$lib/store/destination';
  import { ExperienceLikeData } from './like.json';
  import { DestinationLikeData } from '../destination/like.json';
  import { ProductLikeData } from '../product/like.json';
  import Item from '$lib/components/Item.svelte';
  import Carousel from '$lib/components/Carousel.svelte';

  export const load: Load = async ({ fetch, session, params }) => {
    const id = parseId(params.slug);

    const res = await fetch(`/experience/${id}.json`);
    if (res.ok) {
      const data: Experience = await res.json();
      if (data) {
        data.liked = contains(session.user?.destinationLikes || [], 'id', id);
        data.pack = data.pack.map((item: Product) => {
          item.liked = contains(
            session.user?.productLikes || [],
            'id',
            item.id,
          );
          return item;
        });
        data.destinations = data.destinations.map((item: Destination) => {
          item.liked = contains(
            session.user?.destinationLikes || [],
            'id',
            item.id,
          );
          return item;
        });
      }
      insertToStore(experienceStore, [data]);
      return { props: { id } };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script type="ts">
  import DetailSlide from '$lib/components/DetailSlide.svelte';

  let configPage = {
    header: {
      page: 'experience-detail',
      transparent: true,
      theme: 'light',
      currentMenu: 'experiences',
    },
  };
  export let id: string;
  let experience: Experience;
  let productSliderOpen: boolean;
  let activeProduct: number;

  experienceStore.subscribe((store) => {
    experience = store.items[id];
    if (!experience) {
      return;
    }
  });

  async function likeExperience() {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let experienceLikedIds: string[] = (
      $authStore.user?.experienceLikes || []
    ).map((item: Experience) => item.id);
    let indexLikeExist = experienceLikedIds.findIndex(
      (id: string) => id == experience.id,
    );
    if (indexLikeExist < 0) {
      experienceLikedIds.push(experience.id);
      liked = true;
    } else {
      experienceLikedIds.splice(indexLikeExist, 1);
      liked = false;
    }
    const res = await fetch(`/experience/like.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceLikedIds),
    });

    if (res.ok) {
      const data: ExperienceLikeData = await res.json();
      $authStore.user.experienceLikes = data.updateUser.user.experienceLikes;
      authStore.set({ user: $authStore.user });
      experience.liked = liked;
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  async function likeDestination(event: CustomEvent) {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let destination = event.detail.item;
    let destinationLikedIds: string[] = (
      $authStore.user?.destinationLikes || []
    ).map((item: Destination) => item.id);
    let indexLikeExist = destinationLikedIds.findIndex(
      (id: string) => id == destination.id,
    );
    if (indexLikeExist < 0) {
      destinationLikedIds.push(destination.id);
      liked = true;
    } else {
      destinationLikedIds.splice(indexLikeExist, 1);
      liked = false;
    }
    const res = await fetch(`/destination/like.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(destinationLikedIds),
    });

    if (res.ok) {
      const data: DestinationLikeData = await res.json();
      $authStore.user.destinationLikes = data.updateUser.user.destinationLikes;
      authStore.set({ user: $authStore.user });
      destination.liked = liked;
      experience.destinations = experience.destinations.map(
        (item: Destination) => {
          if (item.id == destination.id) {
            item = destination;
          }
          return item;
        },
      );
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  async function likeProduct(event: CustomEvent) {
    let liked: boolean;
    const product = event.detail.product;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    if (!product) {
      return;
    }
    let productLikedIds: string[] = ($authStore.user?.productLikes || []).map(
      (item: Product) => item.id,
    );
    let indexLikeExist = productLikedIds.findIndex(
      (id: string) => id == product.id,
    );
    if (indexLikeExist < 0) {
      productLikedIds.push(product.id);
      liked = true;
    } else {
      productLikedIds.splice(indexLikeExist, 1);
      liked = false;
    }
    const res = await fetch(`/product/like.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productLikedIds),
    });

    if (res.ok) {
      const data: ProductLikeData = await res.json();
      $authStore.user.productLikes = data.updateUser.user.productLikes;
      authStore.set({ user: $authStore.user });
      product.liked = liked;
      experience.pack = experience.pack.map((item: Product) => {
        if (item.id == product.id) {
          item = product;
        }
        return item;
      });
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  function onScrollFixedHeader() {
    // const header = document.getElementById('header');
    // const headerTitle = document.querySelector('.header-title.is_sticky');
    // if (header && headerTitle) {
    //   if (document.documentElement.clientWidth > 949) {
    //     if (
    //       document.body.scrollTop > 900 ||
    //       document.documentElement.scrollTop > 900
    //     ) {
    //       header.classList.add('fixed');
    //       header.style.setProperty('z-index', '100', 'important');
    //       headerTitle.classList.add('show');
    //     } else {
    //       header.classList.remove('fixed');
    //       header.style.setProperty('z-index', '');
    //       headerTitle.classList.remove('show');
    //     }
    //   } else {
    //     header.classList.remove('fixed');
    //     header.style.setProperty('z-index', '');
    //     headerTitle.classList.remove('show');
    //   }
    // }
  }
</script>

<svelte:window
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
{#if experience}
  <div class="content experience-detail d-pb-100">
    <section class="header-title d-pt-115 d-pb-25 m-pt-90 m-pb-60 full-width">
      <div class="content-wrap">
        <div class="container">
          <DetailSlide data={experience} on:like={likeExperience} />
        </div>
      </div>
    </section>

    <section class="d-pt-70 d-pb-40 m-pt-50 m-pb-35 detail-content">
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 8, tablet: 8, phone: 4 }}>
            <div>{@html experience.description}</div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}
            class="m-none"
          >
            <h1 class="mt-0 mb-40">My Favorites Places</h1>
            <div class="experiences-list">
              <LayoutGrid class="p-0">
                {#each experience.destinations || [] as item}
                  <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 4 }}>
                    <Item
                      {...item}
                      pathPrefix="/destination"
                      bind:item
                      on:likeItem={likeDestination}
                    />
                  </Cell>
                {/each}
              </LayoutGrid>
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    {#if experience.looks && experience.looks.length}
      <LookShow title="Shop by look" items={experience.looks} />
    {/if}
    {#if experience.pack?.length}
      <ProductShow
        title="What to pack"
        items={experience.pack}
        on:likeItem={likeProduct}
      />
    {/if}
    {#if experience.destinations?.length}
      <section class="m-pt-50 m-pb-85 d-none m-block">
        <div class="container">
          <h1 class="mt-0 d-mb-80 m-mb-35">My Favorite Places</h1>
          <div class="experiences-list">
            <LayoutGrid class="p-0">
              {#each experience.destinations as item}
                <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
                  <Item
                    {...item}
                    pathPrefix="/destination"
                    bind:item
                    on:likeItem={likeDestination}
                  />
                </Cell>
              {/each}
            </LayoutGrid>
          </div>
        </div>
      </section>
    {/if}
  </div>
{/if}
<ProductSliderModal
  bind:open={productSliderOpen}
  products={experience.pack}
  bind:active={activeProduct}>no content</ProductSliderModal
>
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  @use '../../theme/colors';
  .experience-detail {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/sticky.scss';
    .mdc-button {
      width: 180px;
      min-width: 180px;
      padding: 0 15px;
    }

    @include mixins.desktop {
      .d-pt-25-vh {
        padding-top: 25vh;
      }
    }
    /* Header title */
    .header-title {
      background-color: #f0f7f8;
      .mdc-layout-grid {
        @include mixins.desktop {
          --mdc-layout-grid-gutter-desktop: 30px;
        }
      }
    }

    .header-title .btn-favorite {
      position: relative;
      .like {
        display: block;
      }
      .liked {
        display: none;
      }
      &:hover {
        .like {
          display: none;
        }
        .liked {
          display: block;
        }
      }
    }
    .header-title .btn-favorite.liked {
      .liked {
        display: block;
      }
      .like {
        display: none;
      }
    }

    .header-title .action-buttons {
      position: absolute;
      top: 24vh;
      right: 100px;
    }
    .header-title .short-description {
      @include mixins.desktop {
        width: 80%;
      }
    }

    .section-title :global(.mdc-tab) {
      padding: 0;
      margin-right: 30px;
    }
    .section-title :global(.mdc-tab .mdc-tab__content) {
      width: 100%;
      justify-content: left;
    }

    .detail-content .container .mdc-layout-grid {
      --mdc-layout-grid-gutter-desktop: 100px;
    }

    .detail-content .container .mdc-layout-grid .mdc-layout-grid {
      --mdc-layout-grid-gutter-desktop: 30px;
    }

    /* Products */
    #what-to-pack-section {
      --mdc-layout-grid-gutter-phone: 24px;
      --mdc-layout-grid-gutter-tablet: 24px;
    }
    .item-product .title-wrap {
      position: relative;
    }
    .item-product .title-wrap :global(.mdc-icon-button) {
      position: absolute;
      top: 20%;
      right: 0;
      transform: translateY(-50%);
    }

    .item-product .title-wrap .divider:after {
      background-color: rgba(0, 0, 0, 0.2);
    }

    .products-list :global(.mdc-layout-grid__inner) {
      overflow-x: auto;
      grid-auto-flow: column;
      padding-bottom: 80px;
    }
    .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
      background-color: #d3d3d3;
    }
    .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
      height: 10px;
      background-color: #d3d3d3;
    }
    .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
      background-color: colors.$blue;
    }
    @media (min-width: 1240px) {
      .products-list :global(.mdc-layout-grid__inner) {
        grid-auto-columns: minmax(
          calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)),
          1fr
        );
        grid-template-columns: repeat(
          auto-fill,
          minmax(
            calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)),
            1fr
          )
        );
      }
    }
    @media (max-width: 1239px) and (min-width: 905px) {
      .products-list :global(.mdc-layout-grid__inner) {
        grid-auto-columns: minmax(
          calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)),
          1fr
        );
        grid-template-columns: repeat(
          auto-fill,
          minmax(
            calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)),
            1fr
          )
        );
      }
    }
    @media (max-width: 904px) and (min-width: 600px) {
      .products-list :global(.mdc-layout-grid__inner) {
        grid-auto-columns: minmax(
          calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
          1fr
        );
        grid-template-columns: repeat(
          auto-fill,
          minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
        );
      }
    }
    @media (max-width: 599px) {
      .products-list :global(.mdc-layout-grid__inner) {
        grid-auto-columns: minmax(
          calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
          1fr
        );
        grid-template-columns: repeat(
          auto-fill,
          minmax(calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
        );
      }
    }

    .products-list :global(.item-product .thumbnail) {
      width: 100%;
      padding-bottom: 145%;
      background-color: #f2f2f2;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }

    :global(.products-list .item-product) {
      @include mixins.mobile {
        h3 {
          --mdc-typography-headline3-font-size: 14px;
        }
      }
    }

    .products-list :global(.item-product .thumbnail .btn-favorite) {
      filter: brightness(0);
    }

    .experience-item :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
    }
    .experience-item .divider::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .experience-item .title {
      @include mixins.desktop {
        height: 50px;
        overflow: hidden;
      }
    }
    .experience-item .thumbnail {
      position: relative;
    }
    .experience-item .thumbnail :global(.btn-favorite) {
      position: absolute;
      top: 2%;
      right: 2%;
    }

    :global(.is_sticky.header-title) {
      padding-bottom: 50px !important;
    }

    .divider:after {
      background-color: #000;
    }

    @media (max-width: 1222px) {
      .detail-content .container > :global(.mdc-layout-grid) {
        --mdc-layout-grid-gutter-desktop: 30px;
      }
    }

    @media screen and (max-width: 1304px) {
      .header-title .show-on-sticky button.mdc-button {
        width: auto;
        min-width: auto;
      }
    }

    @media screen and (max-width: 999px) {
      .header-title .show-on-sticky button.mdc-button {
        padding: 10px;
      }
    }

    @media screen and (max-width: 949px) {
      .products-list :global(.mdc-layout-grid__inner) {
        margin-bottom: 45px;
      }
    }
  }
</style>

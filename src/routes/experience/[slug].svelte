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

  export const load: Load = async ({ fetch, session, params }) => {
    const id = parseId(params.slug);

    const res = await fetch(`/experience/${id}.json`);
    if (res.ok) {
      const data: Experience = await res.json();
      if (data) {
        await fetch(`/experience/update-${id}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                num_views: (data.num_views || 0)+1
            }),
        });
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
  import DetailSticky from '$lib/components/DetailSticky.svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  export let id: string;
  let experience: Experience;
  let productSliderOpen: boolean;
  let activeProduct: number;
  let stickyShow: boolean = false;

  experienceStore.subscribe((store) => {
    experience = store.items[id];
    if (!experience) {
      return;
    }
  });

  async function likeExperience() {
    let liked: boolean;
    if (!$authStore.user) {
      window.openSignInModal();
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
  const onResize = (event: Event) => {
    if (window.scrollY < 100) {
      stickyShow = false;
    } else {
      stickyShow = false;
    }
  };

  const adjustNav = () => {
    if (window.scrollY < 100) {
      stickyShow = false;
    } else {
      stickyShow = true;
    }
  };

  const onScroll = (event: Event) => {
    adjustNav();
  };

  function onStart(event: CustomEvent) {
    adjustNav();
  }
</script>

<svelte:window
  on:resize={onResize}
  on:scroll={onScroll}
  on:sveltekit:start={onStart}
/>
{#if experience}
  <div class="content experience-detail d-pb-100">
    <section class="header-title d-pt-100 d-pb-25 m-pt-60 m-pb-60 full-width">
        <DetailSlide data={experience} on:like={likeExperience} />
    </section>
    <section
      class={`m-none header-title d-pt-100 d-pb-25 m-pt-90 m-pb-60 full-width  is_sticky fixed ${
        stickyShow ? 'show' : ''
      }`}
    >
      <div class="content-wrap">
        <div class="container">
          <DetailSticky data={experience} on:like={likeExperience} />
        </div>
      </div>
    </section>

    <section class="d-pt-50 d-pb-40 m-pt-40 m-pb-0 detail-content">
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 8, tablet: 8, phone: 4 }}>
            <Markdown source={experience.description} />
          </Cell>
          <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }} class="">
            <h2 class="mt-0 mb-40 m-mt-40">My Favorites Places</h2>
            <div class="experiences-list">
              <LayoutGrid class="p-0">
                {#each experience.destinations || [] as item}
                  <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 8 }}>
                    <Item
                      {...item}
                      pathPrefix="/destination"
                      bind:item
                      introShow={true}
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
        title="What to Pack"
        items={experience.pack}
      />
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
      .mdc-layout-grid {
        @include mixins.desktop {
          --mdc-layout-grid-gutter-desktop: 30px;
        }
      }
    }

    .header-title {
      background-color: #{colors.$white};
    }
    .header-title.is_sticky {
      z-index: 4 !important;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
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

    .item-product .title-wrap .divider:after {
      background-color: rgba(0, 0, 0, 0.2);
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

    .divider:after {
      background-color: #000;
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
  }
</style>

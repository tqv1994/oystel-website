<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { type Experience } from '$lib/store/experience';
  import ProductSliderModal from '$lib/components/modals/ProductSliderModal.svelte';
  import ProductShow from '$lib/components/product-show.svelte';
  import LookShow from '$lib/components/look-show.svelte';
  import { session } from '$app/stores';
  import Item from '$lib/components/Item.svelte';

  export const load: Load = async ({ fetch, params: { id } }) => {
    id = id.substring(id.lastIndexOf('-')+1);
    return {
      props: {
        experience: await trySearchGetOne(fetch, 'experience', id),
        cities: await getCollection(fetch, 'city'),
      },
    };
  };
</script>

<script type="ts">
  import DetailSlide from '$lib/components/DetailSlide.svelte';
  import DetailSticky from '$lib/components/DetailSticky.svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  import { trySearchGetOne } from '$lib/store/search';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';

  export let experience: Experience;
  export let cities: Kind[] = [];
  let productSliderOpen: boolean;
  let activeProduct: number;
  let stickyShow = false;

  async function likeExperience() {
    let liked: boolean;
    if (!$session.user) {
      window.openSignInModal();
      return;
    }
    let experienceLikedIds: string[] = (
      $session.user?.experienceLikes || []
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
      $session.user.experienceLikes = data.updateUser.user.experienceLikes;
      session.set({ user: $session.user });
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
    <section class="header-title -slide-content full-width">
      <DetailSlide data={experience} on:like={likeExperience} />
    </section>
    <section
      class={`m-none header-title full-width -sticky-content is_sticky fixed ${
        stickyShow ? 'show' : ''
      }`}
    >
      <div class="content-wrap experience-detail-stick-header-flex">
        <div class="container margin-auto add-padding">
          <DetailSticky data={experience} on:like={likeExperience} />
        </div>
      </div>
    </section>

    <section class="d-pt-50 d-pb-40 m-pt-40 m-pb-0 detail-content">
      <div class="container margin-auto add-padding">
        <div class="row">
          <div class="d-col-9 m-col-12 col experience-detail-markdown">
            <Markdown source={experience.description} />
          </div>
          <div class="d-col-3 m-col-12 col">
            <h2 class="mt-0 m-mt-40 favorite-places-title">
              My Favorites Places
            </h2>
            <div class="experiences-list">
              {#each experience.destinations || [] as item, index}
                <Item
                  pathPrefix="/destinations"
                  {item}
                  introShow={true}
                  {cities}
                  class={`${
                    experience.destinations.length != index + 1
                      ? 'd-mb-70 m-mb-35'
                      : ''
                  }`}
                />
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>
    {#if experience.looks && experience.looks.length}
      <LookShow title="Shop by look" items={experience.looks} />
    {/if}
    {#if experience.pack?.length}
      <ProductShow title="What to Pack" items={experience.pack} />
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
  @use '../../style/include/grid';
  .experience-detail {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/sticky.scss';

    &-stick-header-flex {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 24px;

      .container {
        width: 100%;
      }

      h2 {
        margin-top: 16px !important;
      }

      :global(.mdc-layout-grid__cell) {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
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
      &.-slide-content {
        padding-top: 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        height: calc(100vh - 128px);
        @include mixins.mobile {
          margin-top: 64px;
          padding-top: 0;
          margin-bottom: 48px;
          height: auto;

          .image-cover {
            padding: 70.4% 0 0 0 !important;
          }
        }
      }
      &.-sticky-content {
        padding: 0;
        height: 179px;
      }
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
      top: 0;
      right: 0;
    }
    .header-title .short-description {
      @include mixins.desktop {
        width: 80%;
        margin-bottom: 64px !important;
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

    .detail-content {
      @include mixins.mobile {
        padding-top: 0 !important;
      }
    }

    .detail-content .container {
      @include mixins.desktop {
        .col:first-child {
          padding-right: 125px;
        }
      }
    }

    .experience-detail-markdown {
      h3#title {
        margin-bottom: 16px;
      }
      p {
        margin-bottom: 28px;
      }
    }

    .detail-content .container .mdc-layout-grid .mdc-layout-grid {
      --mdc-layout-grid-gutter-desktop: 30px;
    }

    .favorite-places-title {
      margin-bottom: 64px;
      @include mixins.mobile {
        margin-top: 0 !important;
        margin-bottom: 16px;
      }
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

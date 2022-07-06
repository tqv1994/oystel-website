<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import type { Experience } from '$lib/store/experience';
  import { experienceStore } from '$lib/store/experience';
  import { getItems } from '$lib/store/types';
  import { session } from '$app/stores';

  export const load: Load = async ({ fetch, session, url }) => {
    return {
      props: {
        data: await loadFeature(fetch, 'editorial'),
        cities: await getCollection(fetch, 'city'),
      },
    };
  };
</script>

<script lang="ts">
  import CuratedExperience from '$lib/components/CuratedExperience.svelte';
  import WhatToWear from '$lib/components/WhatToWear.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import DropSlides from '$lib/components/DropSlides.svelte';
  import type { Page } from '$lib/store/page';
  import { loadFeature } from '$lib/utils/load';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';

  export let data: Page;
  export let cities: Kind[] = [];

  async function likeExperience(event: CustomEvent) {
    let liked: boolean;
    if (!$session.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let experience: Experience = event.detail.data;
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
      experienceStore.subscribe((store) => (experiences = getItems(store)));
    } else {
      const error = await res.json();
      console.error(error);
    }
  }
</script>

<div class="content editorial-content d-pt-50 m-pt-25">
  {#each data?.sections || [] as section, index}
    {#if section.__component === 'galleries.experience-gallery'}
      <section class="d-pb-100 m-pb-40 experiences experiences-{index}">
        <div class="container margin-auto add-padding">
          <div class="adjust-mobile">
            <p class="text-eyebrow m-0 adjust-mobile">{section.headline}</p>
            <h1 class="editorial-grid-title text-h2">{section.name}</h1>
          </div>
          <CuratedExperience
            {...section}
            subtitle="Featured Editorial"
            {index}
            {cities}
          />
        </div>
      </section>
    {:else if section.__component === 'banners.banner'}
      <WhatToWear {...section} />
    {:else if section.__component === 'galleries.drop-gallery'}
      <section class="the-latest-section d-pt-100 m-pt-40">
        <div class="container margin-auto medium-max-width">
          <DropSlides title={section.name} drops={section.drops} />
        </div>
      </section>
    {:else if section.__component === 'galleries.destination-gallery'}
      {#if section.destinations.length > 0}
        <section>
          <div class="container margin-auto medium-max-width">
            <div>
              <h2 class="all-stories-title">{section.name}</h2>
              <ListItem
                items={section.destinations}
                desktopColumns={3}
                mobileColumns={2}
                pathPrefix="/destinations"
                {cities}
              />
            </div>
            <!-- <div class="pagination-wrap d-mt-120 m-mt-100">
              <Pagination
                page={0}
                count={70}
                pageSize={12}
                labels={{ next: '>', previous: '<' }}
                serverSide={true}
                buttons={[0, 1, 2, 3, 4]}
              />
            </div> -->
          </div>
        </section>
      {/if}
    {/if}
  {/each}
</div>
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  @use '../../style/include/grid';
  .editorial-content {
    @import './src/style/partial/experience-section.scss';
    @import './src/style/partial/thumbnail.scss';
    .the-latest-section {
      :global(.stories-list) {
        @include mixins.desktop {
          margin-right: -16px;
        }
      }
    }
    #slider {
      h1 {
        @include mixins.mobile {
          width: 200px;
        }
      }
    }
    @media screen and (max-width: 1239px) {
      #slider :global(.dots) {
        margin-top: -45px;
      }
    }
    @media screen and (max-width: 599px) {
      .experiences--list .experiences--item .text-h3,
      .experiences--list .experiences--item h3 {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0;
      }
      #slider .slide-item.slide-item-2 {
        background-position: right;
      }
    }

    .story-item {
      .mdc-layout-grid {
        --mdc-layout-grid-gutter-desktop: 0;
      }
      .divider::after {
        background-color: rgba(0, 0, 0, 0.2);
      }
      .title {
        @include mixins.desktop {
          height: 34px;
          overflow: hidden;
        }
        width: 80%;
      }
      .thumbnail {
        position: relative;

        .image-cover {
          @include mixins.mobile {
            padding-top: 100% !important;
          }
        }
      }
      .divider {
        width: 20%;
      }
    }

    .all-stories-section {
      .pagination-wrap {
        position: relative;
        width: 100%;
        .pagination {
          margin: 0;
          vertical-align: middle;
          padding-left: 0;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          .first,
          .last {
            display: none;
          }
          button {
            font-family: Surt;
            border: none;
            background: none;
            &.active {
              font-weight: bold;
              color: #000;
            }
            font-size: 13px;
            letter-spacing: 0.2px;
            line-height: 18px;
          }
          .next,
          .previous {
            position: relative;
            top: -2px;

            button {
              font-size: 200%;
            }
          }
          .next {
            margin-left: 10px;
          }
          .previous {
            margin-right: 10px;
          }
        }
      }
    }

    .editorial-grid-title {
      margin-top: 16px;
      margin-bottom: 24px;
      @include mixins.mobile {
        margin-top: 8px;
      }
    }

    .all-stories-title {
      margin-top: 0;
    }

    .text-eyebrow.adjust-mobile {
      @include mixins.mobile {
        margin-top: 24px !important;
      }
    }

    .container-helper.adjust-mobile {
      @include mixins.mobile {
        padding: 0 24px;
      }
    }
  }
</style>

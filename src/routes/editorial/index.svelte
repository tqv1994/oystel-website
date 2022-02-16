<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { Experience } from '$lib/store/experience';
  import { experienceStore } from '$lib/store/experience';
  import { getItems } from '$lib/store/types';
  import { makeLink } from '$lib/utils/link';
  import { authStore } from '$lib/store/auth';
  import { ExperienceLikeData } from '../experience/like.json';
  import { EditorialPageData } from './editorial.json';

  export const load: Load = async ({ fetch, session, url }) => {
    const res = await fetch(`/editorial/editorial.json?_z=${Date.now()}`);
    if (res.ok) {
      const data: EditorialPageData = await res.json();
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
  import CuratedExperience from '$lib/components/CuratedExperience.svelte';
  import WhatToWear from '$lib/components/WhatToWear.svelte';
  import ListItem from '$lib/components/ListItem.svelte';

  export let data: EditorialPageData;

  async function likeExperience(event: CustomEvent) {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let experience: Experience = event.detail.data;
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
      experienceStore.subscribe((store) => (experiences = getItems(store)));
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  const carouselConfigMobile = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 2,
    chevronPosition: 'outside',
  };
  const carouselConfigDesktop = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 4,
    chevronPosition: 'outside',
  };
</script>

<div class="content editorial-content d-pt-90 m-pt-65">
  {#each data.page.sections as section, index}
    {#if section.__typename === 'ComponentGalleriesExperienceGallery'}
      <section class="d-pb-100 m-pb-40 experiences experiences-{index}">
        <div class="container">
          <p class="text-eyebrow m-0">{section.headline}</p>
          <h2 class="mt-20 d-mb-40 m-mb-15">{section.name}</h2>
        </div>
        <CuratedExperience {...section} on:likeItem={likeExperience} {index} />
      </section>
    {:else if section.__typename === 'ComponentBannersBanner'}
      <WhatToWear {...section} />
    {:else if section.__typename === 'ComponentGalleriesDropGallery'}
      <section class="the-latest-section d-pt-100 m-pt-40">
        <div class="container">
          <div class="stories-list d-pl-100 d-pr-100">
            <h2 class="m-0 mb-40">{section.name}</h2>
            {#if section.drops?.length > 0}
              <Carousel {...carouselConfigMobile}>
                {#each section.drops as item}
                  <div class="slide-content slide-item text-left">
                    <div class="story-item">
                      <div class="thumbnail">
                        <a href={makeLink('/drop', item)}>
                          <div
                            class="image-cover"
                            style="padding-top: calc(410 / 529 * 100%)"
                          >
                            {#if item.gallery.length > 0}
                              <BlurImage {...item.gallery[0]} />
                            {:else}
                              <BlurImage />
                            {/if}
                          </div>
                        </a>
                      </div>
                      <a href={makeLink('/drop', item)}>
                        <LayoutGrid class="p-0">
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-left m-0 mt-25">
                              Fashion
                            </p></Cell
                          >
                        </LayoutGrid>
                        <h3 class="text-h3 title m-mt-30 mb-15">{item.name}</h3>
                        <p class="short-text m-none m-0">
                          {(item.description || '').substr(0, 80)}...
                        </p>
                      </a>
                    </div>
                  </div>
                {/each}
              </Carousel>
            {/if}
          </div>
        </div>
      </section>
    {:else if section.__typename === 'ComponentGalleriesDestinationGallery'}
      {#if section.destinations.length > 0}
        <section>
          <div class="container">
            <div class=" d-pl-100 d-pr-100">
              <h2>{section.name}</h2>
              <ListItem
                bind:items={section.destinations}
                desktopColumns={3}
                mobileColumns={2}
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
      }
      .divider {
        width: 20%;
      }
    }

    .the-latest-section {
      .sc-carousel-dots__container {
        @include mixins.desktop {
          display: none;
        }
        margin-top: 30px;
      }
      .stories-list {
        .slide-item {
          padding-right: var(--mdc-layout-grid-gutter-desktop);
          direction: ltr;
        }
        .wrap-control {
          top: auto;
          bottom: -80px;
          img {
            cursor: pointer;
            filter: brightness(0%);
            &:hover {
              filter: invert(43%) sepia(89%) saturate(304%) hue-rotate(177deg)
                brightness(91%) contrast(94%);
            }
          }
        }
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
  }
</style>

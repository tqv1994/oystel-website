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
      // insertToStore(
      //   experienceStore, data.page.
      // data.page..map((item: Experience) => {
      //   if (session.user) {
      //     let indexExist = (session.user?.experienceLikes || []).findIndex(
      //       (itemLike: Experience) => itemLike.id === item.id,
      //     );
      //     if (indexExist >= 0) {
      //       item.liked = true;
      //     } else {
      //       item.liked = false;
      //     }
      //   }
      //   return item;
      // }),
      // );
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
  import Pagination from '$lib/components/common/Pagination.svelte';
  import CuratedExperience from '$lib/components/CuratedExperience.svelte';
  import Item from '$lib/components/Item.svelte';
  import WhatToWear from '$lib/components/WhatToWear.svelte';

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

<div class="content editorial-content d-pt-128 m-pt-60">
  {#each data.page.sections as section, index}
    {#if section.__typename === 'ComponentGalleriesExperienceGallery'}
      <section
        class="d-pt-60 d-pb-100 m-pt-48 m-pb-15 experiences experiences-{index}"
      >
        <div class="container">
          <p class="text-eyebrow m-0">{section.headline}</p>
          <p class="text-h1 mt-30 d-mb-40 m-mb-15">{section.name}</p>
        </div>
        <CuratedExperience {...section} on:likeItem={likeExperience} {index} />
      </section>
    {:else if section.__typename === 'ComponentBannersBanner'}
      <section class="what-to-wear-section d-pb-105 d-pt-105 full-width">
        <WhatToWear {...section} />
      </section>
    {:else if section.__typename === 'ComponentGalleriesDestinationGallery'}
      <section class="the-latest-section d-pt-105 m-pt-30">
        <div class="container">
          <div class="stories-list d-pl-100 d-pr-100 d-mb-115 m-mb-60">
            <h1 class="m-0 mb-40">{section.name}</h1>
            {#if section.destinations?.length > 0}
              <Carousel {...carouselConfigMobile}>
                {#each section.destinations as item}
                  <div class="slide-content slide-item text-left">
                    <div class="story-item">
                      <div class="thumbnail">
                        <a href={makeLink('/destination', item)}>
                          <div
                            class="image-cover"
                            style="padding-top: calc(410 / 529 * 100%)"
                          >
                            <BlurImage {...item.gallery[0]} />
                          </div>
                        </a>
                      </div>
                      <a href={makeLink('/destination', item)}>
                        <LayoutGrid class="p-0">
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
                              {item.name || ''}
                            </p></Cell
                          >
                        </LayoutGrid>
                        <div class="divider" />
                        <h4 class="text-h3 title m-mt-30">{item.intro}</h4>
                        <p class="short-text m-none">
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
    {:else if section.__typename === 'ComponentGalleriesDropGallery'}
      {#if section.drops.length > 0}
        <section class="the-latest-section d-pt-105 d-pb-105 m-pt-30 pb-100 ">
          <div class="container">
            <div class="stories-list d-block m-none">
              <Carousel {...carouselConfigDesktop}>
                {#each section.drops as item}
                  <div class="slide-content slide-item text-left">
                    <div class="story-item">
                      <div class="thumbnail">
                        <a href="#">
                          <div class="image-cover">
                            <BlurImage {...item.gallery[0]} />
                          </div>
                        </a>
                      </div>
                      <a href="#">
                        <LayoutGrid class="p-0">
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
                              Fashion
                            </p></Cell
                          >
                        </LayoutGrid>
                        <div class="divider" />
                        <h4 class="text-h3 title m-mt-30">
                          {item.name}
                        </h4>
                      </a>
                    </div>
                  </div>
                {/each}
              </Carousel>
            </div>
            <div class="stories-list  d-none m-block">
              <Carousel {...carouselConfigMobile}>
                {#each section.drops as item}
                  <div class="slide-content slide-item text-left">
                    <div class="story-item">
                      <div class="thumbnail">
                        <a href="#">
                          <div class="image-cover">
                            <BlurImage {...item.gallery[0]} />
                          </div>
                        </a>
                      </div>
                      <a href="#">
                        <LayoutGrid class="p-0">
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
                              Fashion
                            </p></Cell
                          >
                        </LayoutGrid>
                        <div class="divider" />
                        <h4 class="text-h3 title m-mt-30">
                          {item.name}
                        </h4>
                      </a>
                    </div>
                  </div>
                {/each}
              </Carousel>
            </div>
          </div>
        </section>

        <section class="all-stories-section d-pb-100 m-pb-90">
          <div class="container">
            <h1>{section.name}</h1>
            <LayoutGrid class="p-0 stories-list">
              {#each section.drops as item}
                <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                  <div class="story-item">
                    <div class="thumbnail">
                      <a href="#">
                        <!-- <BlurImage {...item.gallery[0]} /> -->
                        <img src={item.gallery[0].url} />
                      </a>
                    </div>
                    <a href="#">
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ desktop: 6, phone: 2 }}
                          ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
                            Fashion
                          </p></Cell
                        >
                      </LayoutGrid>
                      <div class="divider" />
                      <h4 class="text-h3 title m-mt-30">
                        {item.name}
                      </h4>
                    </a>
                  </div>
                </Cell>
              {/each}
              {#each section.drops as item}
                <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                  <div class="story-item">
                    <div class="thumbnail">
                      <a href="#">
                        <!-- <BlurImage {...item.gallery[0]} /> -->
                        <img src={item.gallery[0].url} />
                      </a>
                    </div>
                    <a href="#">
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ desktop: 6, phone: 2 }}
                          ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
                            Fashion
                          </p></Cell
                        >
                      </LayoutGrid>
                      <div class="divider" />
                      <h4 class="text-h3 title m-mt-30">
                        {item.name}
                      </h4>
                    </a>
                  </div>
                </Cell>
              {/each}
            </LayoutGrid>
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

    .experiences {
      @include mixins.desktop {
        padding-left: calc(90px - var(--mdc-layout-grid-margin-desktop));
        padding-right: calc(90px - var(--mdc-layout-grid-margin-desktop));
      }
      .experiences--item.featured {
        .title {
          height: 28px;
          overflow: hidden;
          @include mixins.mobile {
            height: 26px;
          }
        }
        :global(.thumbnail .btn-favorite) {
          top: 0;
          right: -2px;
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

    .what-to-wear-section {
      @include mixins.desktop {
        background-image: url(/img/editorial/what-to-wear-background.jpg);
        background-repeat: no-repeat;
        background-size: cover;
      }
      .what-to-wear-content {
        background-color: #fff;
        display: inline-block;
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
          height: 45px;
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
          margin-right: var(--mdc-layout-grid-gutter-desktop);
          direction: ltr;
        }
        .wrap-control {
          top: auto;
          bottom: -45px;
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
      .stories-list {
        > .mdc-layout-grid__inner {
          -moz-column-count: 4; /*change this to change the grid column count*/
          -webkit-column-count: 4; /*change this to change the grid column count*/
          column-count: 4; /*change this to change the grid column count*/
          -moz-column-gap: var(--mdc-layout-grid-gutter-desktop);
          -webkit-column-gap: var(--mdc-layout-grid-gutter-desktop);
          column-gap: var(--mdc-layout-grid-gutter-desktop);
          @include mixins.mobile {
            -moz-column-count: 2; /*change this to change the grid column count*/
            -webkit-column-count: 2; /*change this to change the grid column count*/
            column-count: 2; /*change this to change the grid column count*/
            -moz-column-gap: var(--mdc-layout-grid-gutter-mobile);
            -webkit-column-gap: var(--mdc-layout-grid-gutter-mobile);
            column-gap: var(--mdc-layout-grid-gutter-mobile);
          }
          margin-top: -10px;
          display: inline-block;
          width: 100%;
          overflow: visible;
          > .mdc-layout-grid__cell {
            width: 100%;
            display: inline-block;
            background: transparent;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            margin: 1%;
          }
        }
      }
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

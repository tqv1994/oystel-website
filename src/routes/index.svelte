<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { destinationStore } from '$lib/store/destination';
  import { documentHelper, storeHelper } from '$lib/helpers';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import { Svg } from '@smui/common/elements';
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Layout from '$lib/components/common/Layout.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { Drop } from '$lib/store/drop';
  import { Experience } from '$lib/store/experience';
  import OySearch from '$lib/components/common/OySearch.svelte';
  import { Destination } from '$lib/store/destination';
  import { routerHelper } from '$lib/helpers/router';
  import { dropStore } from '$lib/store/drop';
  import { experienceStore } from '$lib/store/experience';
  import { getItems, insertToStore } from '$lib/store/types';
  import { makeLink } from '$lib/utils/link';
  import { HomePageData } from './home/index.json';
  import { authStore, User } from '$lib/store/auth';
  import { responsePathAsArray } from 'graphql';
  import { ExperienceLikeData } from './experience/like.json';
  import { DestinationLikeData } from './destination/like.json';
  import Item from '$lib/components/Item.svelte';
  export const load: Load = async ({ fetch, session, page }) => {
    const res = await fetch(`/home.json?_z=${Date.now()}`);
    if (res.ok) {
      const data: HomePageData = await res.json();
      return {
        props: {
          data,
        },
      };
    } else {
      const error = await res.json();
      console.error(error);
      return {
        props: {
          error,
        },
      };
    }
  };
</script>

<script lang="ts">
  import NeverMissDrop from '$lib/components/NeverMissDrop.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import FeatureDrops from '$lib/components/FeatureDrops.svelte';
  import CuratedExperience from '$lib/components/CuratedExperience.svelte';
  import { Page } from '$lib/store/page';
  import { contains } from '$lib/utils/array';

  let configPage = {
    header: {
      page: 'home',
      transparent: true,
      theme: 'dark',
      currentMenu: '',
    },
  };

  export let data: HomePageData;
  let me: User | undefined = $authStore.user;
  async function likeExperience(event: CustomEvent) {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let experience = event.detail.data;
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
      experienceStore.subscribe(
        (store) => (curatedExperiences = getItems(store)),
      );
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  async function likeDestination(event: CustomEvent) {
    const destination = event.detail.item;
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
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
      destinationStore.subscribe(
        (store) => (advisorDestinations = getItems(store)),
      );
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  function onScrollFixedHeader() {
    // if (document.documentElement.clientWidth > 949) {
    //   if (
    //     document.body.scrollTop > 200 ||
    //     document.documentElement.scrollTop > 200
    //   ) {
    //     document.getElementById('header').classList.add('fixed');
    //     document.getElementById('header').classList.add('scrolling');
    //     document.querySelector('header').style.zIndex = 100;
    //     documentHelper.changeBackgroundHeader('#000');
    //   } else {
    //     document.getElementById('header').classList.remove('fixed');
    //     document.getElementById('header').classList.remove('scrolling');
    //     document.querySelector('header').style.zIndex = 'auto';
    //     documentHelper.changeBackgroundHeader('transparent');
    //   }
    // } else {
    //   document.getElementById('header').classList.remove('fixed');
    //   document.getElementById('header').classList.remove('scrolling');
    //   document.querySelector('header').style.zIndex = 'auto';
    //   document.querySelector('header').style.position = 'static';
    //   documentHelper.changeBackgroundHeader('transparent');
    // }
  }

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };
</script>

<svelte:body />

<div class="content home-page-content">
  <section id="slider" class="full-width hero">
    <Carousel {...carouselConfig}>
      {#each data?.gallery as item}
        <div class="slide">
          <div class="image-cover" style="padding-top: 0; height: 100%">
            <BlurImage {...item} />
          </div>
        </div>
      {/each}
    </Carousel>
    <div class="light text-box">
      <div class="container">
        <h1>Explore the World in Style</h1>
        <OySearch searchResult="" />
      </div>
    </div>
  </section>

  {#each data.page.sections as section}
    {#if section.__typename === 'ComponentGalleriesDropGallery'}
      <section class="has-padding m-pt-40 m-pb-70" id="featured-drops">
        <FeatureDrops {...section} />
      </section>
    {:else if section.__typename === 'ComponentGalleriesDestinationGallery'}
      <section class="pb-60 from-advisors">
        <LayoutGrid class="pt-0 pb-0">
          <Cell span={12}>
            <h2 class="text-h1 mt-0">{section.name}</h2>
          </Cell>
        </LayoutGrid>

        {#if section.destinations?.length > 0}
          <LayoutGrid class="pt-0 pb-0">
            {#each storeHelper.getItems(section.destinations, 4) as item}
              <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                <Item
                  {item}
                  {...item}
                  liked={me ? contains(
                    me.destinationLikes || [],
                    'id',
                    item.id,
                  ): false}
                  pathPrefix="/destination"
                  on:likeItem={likeDestination}
                />
              </Cell>
            {/each}
          </LayoutGrid>
        {/if}
      </section>
    {:else if section.__typename === 'ComponentGalleriesExperienceGallery'}
      <section class="has-padding m-pt-48 m-pb-15 experiences">
        <div class="container">
          <p class="text-h1 mt-0 d-mb-35 m-mb-15">{section.name}</p>
        </div>
        <CuratedExperience {...section} on:likeItem={likeExperience} />
      </section>
    {:else if section.__typename === 'ComponentBannersBanner'}
      <section
        class="d-pt-55 d-pb-70 t-pt-55 t-pb-70 m-pt-20 m-pb-40 full-width"
        id="signup-section"
        style="background-color: #F0F7F8"
      >
        <div class="content-wrap">
          <NeverMissDrop {...section} />
        </div>
      </section>
    {/if}
  {/each}
</div>
<!-- </Layout> -->
<OyNotification />

<style lang="scss" global>
  @use '../theme/mixins';
  .home-page-content {
    @import '../style/partial/featured-drop.scss';
    @import '../style/partial/signup-section.scss';
    @import '../style/partial/experience-section.scss';
    @import '../style/partial/from-our-advisor-section.scss';
    @import '../style/partial/slides-homepage.scss';
    @import '../style/partial/thumbnail.scss';
    #slider {
      .wrap-control {
        width: 100%;
      }
      h1 {
        @include mixins.mobile {
          width: 200px;
        }
      }
    }

    #signup-section {
      .thumbnail {
        .caption {
          font-size: 12px;
          line-height: 22px;
          letter-spacing: 0.1;
        }
      }
      h4 {
        text-transform: uppercase;
      }
    }
    .experiences {
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
      .experiences .experiences--item .text-h2,
      .experiences .experiences--item h2,
      .from-advisors .item .text-h2,
      .from-advisors .item .h2 {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0;
      }
      #slider .slide-item.slide-item-2 {
        background-position: right;
      }
    }
  }
</style>

<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import { destinationStore } from '$lib/store/destination';
  import { documentHelper } from '$lib/helpers';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import Svg from '@smui/common/elements/Svg.svelte';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
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
  import { HomePageData } from './home.json';
  import { authStore } from '$lib/store/auth';
  import { responsePathAsArray } from 'graphql';
  import { ExperienceLikeData } from './experience/like.json';
  import { DestinationLikeData } from './destination/like.json';
  import Item from '$lib/components/Item.svelte';

  export const load: Load = async ({ fetch, session, page }) => {
    const res = await fetch('/home.json');
    if (res.ok) {
      console.log('user session', session.user);
      const data: HomePageData = await res.json();
      insertToStore(dropStore, data.drops);
      insertToStore(
        experienceStore,
        data.experiences.map((item: Experience) => {
          if (session.user) {
            let indexExist = (session.user?.experienceLikes || []).findIndex(
              (itemLike: Experience) => itemLike.id === item.id,
            );
            if (indexExist >= 0) {
              item.liked = true;
            } else {
              item.liked = false;
            }
          }
          return item;
        }),
      );
      insertToStore(
        destinationStore,
        data.destinations.map((item: Destination) => {
          if (session.user) {
            let indexExist = (session.user?.destinationLikes || []).findIndex(
              (itemLike: Destination) => itemLike.id === item.id,
            );
            if (indexExist >= 0) {
              item.liked = true;
            } else {
              item.liked = false;
            }
          }
          return item;
        }),
      );
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
  let configPage = {
    header: {
      page: 'home',
      transparent: true,
      theme: 'dark',
      currentMenu: '',
    },
  };
  let openSignupModal = false;

  let advisorDestinations: Destination[] = [];
  destinationStore.subscribe(
    (store) => (advisorDestinations = getItems(store).splice(-5, 4)),
  );

  let curatedExperiences: Experience[] = [];
  experienceStore.subscribe((store) => (curatedExperiences = getItems(store)));

  let featureDrops: Drop[] = [];
  dropStore.subscribe((store) => (featureDrops = getItems(store)));

  function callOpenSignupModal() {
    openSignupModal = true;
  }

  function callOpenSigninModal() {}

  function runScript() {
    if (document.documentElement.clientWidth > 949) {
      documentHelper.handleEqualHeightItems([
        '#experience-section .item-experience.featured',
        '#experience-section .list-experiences',
      ]);
    }
    onScrollFixedHeader();
  }

  async function likeExperience(experience: Experience) {
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
      experienceStore.subscribe(
        (store) => (curatedExperiences = getItems(store)),
      );
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  async function likeDestination(destination: Destination) {
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

  onMount(() => {});
</script>

<svelte:window
  on:load={() => {
    runScript();
  }}
  on:resize={() => {
    runScript();
  }}
  on:scroll={() => {
    runScript();
  }}
/>

<div class="filter-color" />
<Layout bind:config={configPage} bind:openSignupModal>
  <div class="content">
    <section id="slider" class="full-width">
      <OyCarousel
        perPage={{ 800: 1 }}
        draggable={false}
        loop={true}
        isFadeIn={true}
      >
        <span class="control m-none" slot="left-control">
          <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
        </span>
        <div
          class="slide-content slide-item"
          style="background-image: url(/img/slides/v2-slide-01.jpg);--background-img:url(/img/slides/v2-slide-01.jpg);"
        >
          <div class="content-wrap">
            <div class="light text-box">
              <LayoutGrid class="pb-0">
                <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
                  ><h1 class="mt-0 mb-0 m-pb-0 m-block">
                    Explore the World in Style
                  </h1>
                </Cell>
              </LayoutGrid>
              <LayoutGrid class="pb-0 m-pt-5 d-pt-30">
                <Cell span="12">
                  <OySearch searchResult="" />
                </Cell>
              </LayoutGrid>
            </div>
          </div>
        </div>
        <div
          class="slide-content slide-item slide-item-2 is-not-active"
          style="background-image: url(/img/slides/v2-slide-01.jpg)"
        >
          <div class="content-wrap">
            <div class="light text-box">
              <LayoutGrid class="pb-0">
                <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
                  ><h1 class="mt-0 mb-0 m-pb-0 m-mb-0 m-block">
                    Explore the World in Style
                  </h1>
                </Cell>
              </LayoutGrid>
              <LayoutGrid class="pb-0 m-pt-5 d-pt-30">
                <Cell span="12">
                  <OySearch searchResult="" />
                </Cell>
              </LayoutGrid>
            </div>
          </div>
        </div>
        <span class="control m-none" slot="right-control">
          <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
        </span>
      </OyCarousel>
    </section>
    <section class="has-padding m-pt-40 m-pb-70" id="featured-drops">
      <LayoutGrid class="pt-0">
        <Cell span="12"><h3 class="text-h1 mt-0 mb-0">Featured Drops</h3></Cell>
      </LayoutGrid>
      <LayoutGrid class="pt-0">
        <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }} class="m-mb-45">
          {#if featureDrops && featureDrops.length > 0}
            <div class="item-featured-drop new">
              <div class="thumbnail dark d-mb-45 m-mb-40">
                <div
                  class="image-cover"
                  style="padding-top: calc(474/420 * 100%)"
                >
                  <BlurImage {...featureDrops[0].gallery[0]} />
                </div>
                <div class="caption">
                  <span>{featureDrops[0].products?.length} Packages left</span>
                </div>
              </div>
              <div class="">
                <p class="mt-0 mb-25 m-mb-15 text-eyebrow">Fashion Drop</p>
                <h4 class="text-h3 mt-0 mb-20 title">
                  {featureDrops[0].name}
                </h4>
                <Button
                  type="button"
                  href={makeLink('/drops', featureDrops[0])}
                  class="hover-affect-drop"
                  variant="outlined"><Label>Plan Your Trip</Label></Button
                >
              </div>
            </div>
          {/if}
        </Cell>
        <Cell
          spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
          class="d-mr--30 m-mr-0"
        >
          {#if featureDrops.length > 1}
            <div class="list-featured-drop">
              <OyCarousel
                perPage={3}
                draggable={false}
                isFadeIn={false}
                rtl={true}
                dots={false}
              >
                <span class="control m-none" slot="left-control">
                  <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
                </span>
                {#each featureDrops.slice(1) as drop}
                  <div
                    class="item-featured-drop slide-content slide-item text-left"
                  >
                    <div class="thumbnail dark d-mb-40 m-mb-40">
                      <div
                        class="image-cover"
                        style="padding-top: calc(410/311 * 100%)"
                      >
                        <BlurImage {...drop.gallery[0]} />
                      </div>
                      <div class="caption">
                        <span
                          >{drop.id}
                          Packages left {#if !drop.products} ERROR {/if}</span
                        >
                      </div>
                    </div>
                    <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                      Experience Drop
                    </p>
                    <h4 class="text-h3 mt-0 d-mb-25 m-mb-15 title">
                      {drop.name}
                    </h4>
                    <Button
                      class="hover-affect-drop"
                      variant="outlined"
                      href={makeLink('/drops', drop)}
                      ><Label>Plan Your Trip</Label></Button
                    >
                  </div>
                {/each}
                <span class="control m-none" slot="right-control">
                  <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
                </span>
              </OyCarousel>
            </div>
          {/if}
        </Cell>
      </LayoutGrid>
    </section>
    <section
      class="d-pt-55 d-pb-70 t-pt-55 t-pb-70 m-pt-20 m-pb-40 full-width"
      id="signup-section"
      style="background-color: #F0F7F8"
    >
      <div class="content-wrap">
        <LayoutGrid>
          <Cell
            spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
            class="content-left"
          >
            <div class="thumbnail dark multi-images-affect">
              <img src="/img/signup-img.jpg" alt="" />
              <img src="/img/signup-img-2.jpg" alt="" />
              <div class="caption">
                <span class="">Channel Resort ‘21</span>
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
            class="light d-pl-100 d-pr-70 content-right"
          >
            <p class="text-body2 d-mb-100 m-mt-40 m-mb-40">
              Join now for exclusive biweekly travel promotional drops, special
              content, and bespoke travel itineraries.
            </p>
            <div class="d-pb-35 m-pb-0" />
            <h4 class="mt-0 mb-20">Become an Oysteo Member now</h4>
            <h2 class="text-h1 mt-0 d-mb-40 m-mb-15">Never Miss a Drop</h2>
            <Button
              variant="outlined"
              class="hover-affect"
              on:click={callOpenSignupModal}
              ><Label class="text-button2">Sign Up Now</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="has-padding m-pt-48 m-pb-15" id="experience-section">
      <div class="container">
        <p class="text-h1 mt-0 d-mb-35 m-mb-15">Curated for You</p>
      </div>
      <LayoutGrid>
        <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
          {#if curatedExperiences.length > 0}
            <div class="item-experience featured">
              <div class="thumbnail dark">
                <a href={makeLink('/experience', curatedExperiences[0])}>
                  <div
                    class="image-cover"
                    style="padding-top: calc(768/529 * 100%)"
                  >
                    <BlurImage {...curatedExperiences[0].gallery[0]} />
                  </div>
                </a>
                <IconButton
                  class="btn-favorite {curatedExperiences[0].liked
                    ? 'liked'
                    : ''}"
                  on:click={() => {
                    likeExperience(curatedExperiences[0]);
                  }}
                >
                  <Icon class="like" component={Svg} viewBox="-4 -4 24 24">
                    <path
                      d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                      transform="translate(0.001)"
                      fill="#fff"
                      fill-rule="evenodd"
                    />
                  </Icon>
                  <Icon class="liked" component={Svg} viewBox="-4 -4 24 24">
                    <path
                      d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                      transform="translate(0)"
                      fill="#fff"
                      fill-rule="evenodd"
                    />
                  </Icon>
                </IconButton>
                <div class="caption text-left">
                  <p class="mt-0 text-eyebrow pl-25 pr-25">
                    Featured Experience
                  </p>
                  <a
                    class=""
                    href={makeLink('/experience', curatedExperiences[0])}
                  >
                    <h4 class="pl-25 pr-25 text-h2 mt-20 title">
                      {curatedExperiences[0].name}
                    </h4>
                  </a>
                </div>
              </div>
            </div>
          {/if}
        </Cell>
        <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
          <LayoutGrid class="list-experiences m-p-0">
            {#if curatedExperiences.length > 1}
              {#each curatedExperiences.slice(1) as experience}
                <Cell spanDevices={{ desktop: 6, phone: 2 }}>
                  <div class="item-experience">
                    <div class="thumbnail">
                      <a href={makeLink('/experience', experience)}>
                        <img src={experience.gallery[0].url} />
                      </a>
                      <IconButton
                        class="btn-favorite {experience.liked ? 'liked' : ''}"
                        on:click={() => {
                          likeExperience(experience);
                        }}
                      >
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
                    <a
                      href={routerHelper.getUrl(
                        'experiences-listing',
                        experience.name,
                        experience.id,
                      )}
                    >
                    <LayoutGrid class="p-0">
                      <Cell spanDevices={{ desktop: 6, phone: 2 }}
                        ><p class="text-eyebrow text-left m-0 d-mt-25 d-mb-25">
                          {experience.country?.name || ''}
                        </p></Cell
                      >
                    </LayoutGrid>
                    <div class="divider" />
                    <h4 class="text-h3 title m-mt-30">{experience.name}</h4>
                    </a>
                  </div>
                </Cell>
              {/each}
            {/if}
          </LayoutGrid>
        </Cell>
      </LayoutGrid>
    </section>
    <section id="from-advisors" class="pb-60">
      <LayoutGrid class="pt-0 pb-0">
        <Cell span="12">
          <h2 class="text-h1 mt-0">From our Advisors</h2>
        </Cell>
      </LayoutGrid>

      <LayoutGrid class="pt-0 pb-0">
        {#if advisorDestinations.length > 0}
          {#each advisorDestinations as item}
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <div class="item-experience">
                <div class="thumbnail">
                  <a href={makeLink('/destination', item)}>
                    <div
                      class="image-cover"
                      style="padding-top: calc(410/315 * 100%)"
                    >
                      <BlurImage {...item.gallery[0]} />
                    </div>
                  </a>
                  <IconButton
                    class="btn-favorite {item.liked ? 'liked' : ''}"
                    on:click={() => {
                      likeDestination(item);
                    }}
                  >
                    <Icon class="like" component={Svg} viewBox="-4 -4 24 24">
                      <path
                        d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                        transform="translate(0.001)"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                    </Icon>
                    <Icon class="liked" component={Svg} viewBox="-4 -4 24 24">
                      <path
                        d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                        transform="translate(0)"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                    </Icon>
                  </IconButton>
                </div>
                <a href={makeLink('/destination', item)}>
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2 }}
                      ><p class="text-eyebrow text-left m-0 d-mt-25 d-mb-25">
                        {item.country?.name || ''}
                      </p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h3 title m-mt-30">{item.name}</h4>
                </a>
              </div>
            </Cell>
          {/each}
        {/if}
      </LayoutGrid>
    </section>
  </div>
</Layout>
<OyNotification />

<style lang="scss" global>
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
  .filter-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 253px;
    @include mobile {
      height: 100px;
    }
    z-index: 2;
    background: #181919;
    background: linear-gradient(
      180deg,
      rgb(0, 0, 0) 0%,
      rgba(0, 0, 0, 0.9) 10%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 0.9;
  }
  .page-home {
    @import '../style/partial/featured-drop.scss';
    @import '../style/partial/signup-section.scss';
    @import '../style/partial/experience-section.scss';
    @import '../style/partial/from-our-advisor-section.scss';
    @import '../style/partial/slides-homepage.scss';
    @import '../style/partial/thumbnail.scss';
    #slider {
      h1 {
        @include mobile {
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
    #experience-section {
      .item-experience.featured {
        .title {
          height: 28px;
          overflow: hidden;
          @include mobile {
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
      .list-experiences .item-experience .text-h2,
      .list-experiences .item-experience h2,
      #from-advisors .item-experience .text-h2,
      #from-advisors .item-experience .h2 {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0;
      }
      #slider .slide-item.slide-item-2 {
        background-position: right;
      }
    }
    .item-experience {
      .divider {
        width: 30%;
      }
    }
  }
</style>

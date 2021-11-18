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
  import { authStore } from '$lib/store/auth';
  import { ExperienceLikeData } from '../experience/like.json';
  import { DestinationLikeData } from '../destination/like.json';
  import { EditorialPageData } from './editorial.json';

  export const load: Load = async ({ fetch, session, page }) => {
    const res = await fetch('/editorial/editorial.json');
    if (res.ok) {
      const data: EditorialPageData = await res.json();
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
  import Pagination from '$lib/components/common/Pagination.svelte';

  let configPage = {
    header: {
      page: 'editorial',
      transparent: false,
      theme: 'light',
      currentMenu: 'editorial',
    },
  };

  let experiences: Experience[] = [];
  experienceStore.subscribe((store) => (experiences = getItems(store, 7)));
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
      experienceStore.subscribe((store) => (experiences = getItems(store)));
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  function runScript() {
    if (document.documentElement.clientWidth > 949) {
      documentHelper.handleEqualHeightItems([
        '#experience-section .item-experience.featured',
        '#experience-section .list-experiences',
      ]);
    }
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

<Layout bind:config={configPage}>
  <div class="content">
    <section class="d-pt-60 d-pb-100 m-pt-48 m-pb-15" id="experience-section">
      <div class="container">
        <p class="text-eyebrow m-0">
          Exclusive Editorials for the Stylist Explorer
        </p>
        <p class="text-h1 mt-30 d-mb-40 m-mb-15">O Magazine</p>
      </div>
      <LayoutGrid>
        <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
          {#if experiences.length > 0}
            <div class="item-experience featured">
              <div class="thumbnail dark">
                <a href={makeLink('/experience', experiences[0])}>
                  <div
                    class="image-cover"
                    style="padding-top: calc(768/529 * 100%)"
                  >
                    <BlurImage {...experiences[0].gallery[0]} />
                  </div>
                </a>
                <IconButton
                  class="btn-favorite {experiences[0].liked ? 'liked' : ''}"
                  on:click={() => {
                    likeExperience(experiences[0]);
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
                  <a class="" href={makeLink('/experience', experiences[0])}>
                    <h4 class="pl-25 pr-25 text-h2 mt-20 title">
                      {experiences[0].name}
                    </h4>
                  </a>
                </div>
              </div>
            </div>
          {/if}
        </Cell>
        <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
          <LayoutGrid class="list-experiences m-p-0">
            {#if experiences.length > 1}
              {#each experiences.slice(1) as experience}
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
                        <Cell
                          spanDevices={{ desktop: 6, phone: 2 }}
                          class="mt-25 mb-25"
                          ><p class="text-eyebrow text-left m-0">
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
    <section class="what-to-wear-section d-pb-105 d-pt-105 full-width">
      <div
        class="what-to-wear-content d-pb-85 d-pt-85 d-pl-150 d-pr-160 d-block m-none"
      >
        <h5>Lorem ipsum dolor sit amet</h5>
        <h1>What to Wear</h1>
        <Button type="button" class="hover-affect" variant="outlined"
          ><Label class="text-button2">Shop now</Label></Button
        >
      </div>
      <div class="d-none m-block container">
        <div class="image-cover" style="padding-top: calc(375 / 319 * 100%)">
          <img src="/img/editorial/what-to-wear-background.jpg" />
        </div>
        <div class="what-to-wear-content pb-50 pt-55">
          <h5>Lorem ipsum dolor sit amet</h5>
          <h1>What to Wear</h1>
          <Button type="button" class="hover-affect" variant="outlined"
            ><Label class="text-button2">Shop now</Label></Button
          >
        </div>
      </div>
    </section>
    <section class="the-latest-section d-pt-105 d-pb-105 m-pt-30 pb-100">
      <div class="container">
        <div class="the-latest-wrap d-pl-100 d-pr-100 d-mb-115 m-mb-60">
          <h1 class="m-0 mb-40">The Last</h1>
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <div
                      class="image-cover"
                      style="padding-top: calc(410 / 529 * 100%)"
                    >
                      <img src="./img/shop/curated-looks-1.jpg" />
                    </div>
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="short-text m-none">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </a>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <div
                      class="image-cover"
                      style="padding-top: calc(410 / 529 * 100%)"
                    >
                      <img src="./img/shop/curated-looks-2.jpg" />
                    </div>
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
                <a href="#">
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2 }}
                      ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
                        Travel
                      </p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h3 title m-mt-30">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="short-text m-none">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </a>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
        <div class="stories-list">
          <OyCarousel
            perPage={{ 1920: 4, 0: 2 }}
            draggable={false}
            isFadeIn={false}
            rtl={false}
            dots={false}
            loop={false}
          >
            <span class="control" slot="left-control">
              <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
            </span>
            <div class="slide-content slide-item text-left">
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <img src="/img/stories/store-1.jpg" />
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                    Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                  </h4>
                </a>
              </div>
            </div>
            <div class="slide-content slide-item text-left">
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <img src="/img/stories/store-2.jpg" />
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                </a>
              </div>
            </div>
            <div class="slide-content slide-item text-left">
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <img src="/img/stories/store-3.jpg" />
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                    Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                  </h4>
                </a>
              </div>
            </div>
            <div class="slide-content slide-item text-left">
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <img src="/img/stories/store-4.jpg" />
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                </a>
              </div>
            </div>
            <div class="slide-content slide-item text-left">
              <div class="story-item">
                <div class="thumbnail">
                  <a href="#">
                    <img src="/img/stories/store-3.jpg" />
                  </a>
                </div>
                <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                    Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                  </h4>
                </a>
              </div>
            </div>
            <span class="control" slot="right-control">
              <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
            </span>
          </OyCarousel>
        </div>
      </div>
    </section>
    <section class="all-stories-section d-pb-100 m-pb-90">
      <div class="container">
        <h1>All Stores</h1>
        <LayoutGrid class="p-0 stories-list">
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-1.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-2.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Australian Masterchef Restaurant Tour - Starting in Sydney.
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-3.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-4.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Australian Masterchef Restaurant Tour - Starting in Sydney.
                </h4>
              </a>
            </div>
          </Cell>
          <!--Row 2-->
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-1.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-3.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-4.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Australian Masterchef Restaurant Tour - Starting in Sydney.
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-2.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Australian Masterchef Restaurant Tour - Starting in Sydney.
                </h4>
              </a>
            </div>
          </Cell>
          <!--Row 3-->
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-4.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Australian Masterchef Restaurant Tour - Starting in Sydney.
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-1.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-3.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                </h4>
              </a>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
            <div class="story-item">
              <div class="thumbnail">
                <a href="#">
                  <img src="/img/stories/store-4.jpg" />
                </a>
              </div>
              <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
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
                  Australian Masterchef Restaurant Tour - Starting in Sydney.
                </h4>
              </a>
            </div>
          </Cell>
        </LayoutGrid>
        <div class="pagination-wrap d-mt-120 m-mt-100">
          <Pagination
            page={0}
            count={70}
            pageSize={12}
            labels={{ next: '>', previous: '<' }}
            serverSide={true}
            buttons={[0, 1, 2, 3, 4]}
          />
        </div>
      </div>
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
  .page-editorial {
    @import './src/style/partial/experience-section.scss';
    @import './src/style/partial/thumbnail.scss';
    #slider {
      h1 {
        @include mobile {
          width: 200px;
        }
      }
    }

    #experience-section {
      @include desktop {
        padding-left: calc(90px - var(--mdc-layout-grid-margin-desktop));
        padding-right: calc(90px - var(--mdc-layout-grid-margin-desktop));
      }
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

    .what-to-wear-section {
      @include desktop {
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
        @include desktop {
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
          @include mobile {
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

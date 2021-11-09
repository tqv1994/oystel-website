<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Select, { Option } from '@smui/select';
  import Tab from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import Svg from '@smui/common/Svg.svelte';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import Layout from '$lib/components/common/Layout.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { destinationStore } from '$lib/store/destination';
  import { Destination } from '$lib/store/destination';
  import { Exhibitable, insertToStore } from '$lib/store/types';
  import Exhibit from '$lib/components/exhibit.svelte';
  import { get } from 'svelte/store';
  import { parseId } from '$lib/utils/fetch';
  import ProductShow from '$lib/components/product-show.svelte';
  import LookShow from '$lib/components/look-show.svelte';

  export const load: Load = async ({ fetch, session, page }) => {
    const id = parseId(page.params.slug);
    // if (get(destinationStore).items[id]) {
    //   return {
    //     props: { id },
    //   };
    // }

    const res = await fetch(`/destination/${id}.json`);
    if (res.ok) {
      const data: Destination = await res.json();
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
        data.experiences = data.experiences.map((item: Experience) => {
          item.liked = contains(
            session.user?.experienceLikes || [],
            'id',
            item.id,
          );
          return item;
        });
      }
      insertToStore(destinationStore, [data]);
      return { props: { id } };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script type="ts">
  import { makeLink } from '$lib/utils/link';
  import { authStore } from '$lib/store/auth';
  import { Experience } from '$lib/store/experience';
  import { ExperienceLikeData } from '../experience/like.json';
  import { contains } from '$lib/utils/array';
  import { Product } from '$lib/store/product';
  import { DestinationLikeData } from './like.json';
  import { ProductLikeData } from '../product/like.json';

  type TabData = {
    name: string;
    exhibit: Exhibitable[];
    urlPrefix: string;
  };

  let configPage = {
    header: {
      page: 'destination-detail',
      transparent: true,
      theme: 'light',
      currentMenu: 'destinations',
    },
  };
  export let id: string;
  let destination: Destination;
  let tabs: TabData[] = [];
  let activeTab: TabData;

  destinationStore.subscribe((store) => {
    destination = store.items[id];
    if (!destination) {
      return;
    }

    tabs = [
      {
        name: 'Where to Stay',
        exhibit: destination.accommodations,
        urlPrefix: '/where-to-stay/',
      },
      {
        name: 'Where to Dine & Drink',
        exhibit: destination.restaurants,
        urlPrefix: '/where-to-dine-and-drink/',
      },
      {
        name: 'Where to Explore',
        exhibit: destination.attractions,
        urlPrefix: '/where-to-explore/',
      },
    ];
    activeTab = tabs[0];
  });

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
      destination.experiences = destination.experiences.map(
        (item: Experience) => {
          if (item.id == experience.id) {
            item = experience;
          }
          return item;
        },
      );
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  async function likeDestination() {
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
      destination.pack = destination.pack.map((item: Product) => {
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
    // if (document.documentElement.clientWidth > 949) {
    //   if (
    //     document.body.scrollTop > 900 ||
    //     document.documentElement.scrollTop > 900
    //   ) {
    //     document.getElementById('header').classList.add('fixed');
    //     document.querySelector('header').style.zIndex = 100;
    //     document.querySelector('header').style.position = 'relative';
    //     document
    //       .querySelector('.header-title')
    //       .classList.add('fixed', 'is_sticky');
    //   } else {
    //     document.getElementById('header').classList.remove('fixed');
    //     document.querySelector('header').style.zIndex = 'auto';
    //     document.querySelector('header').style.position = 'relative';
    //     document
    //       .querySelector('.header-title')
    //       .classList.remove('fixed', 'is_sticky');
    //   }
    // }
  }
</script>

<svelte:window
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<Layout config={configPage}>
  {#if destination}
    <div class="content destination-detail d-pb-50 m-pb-40">
      <section class="header-title d-pt-115 d-pb-25 m-pt-90 m-pb-25 full-width">
        <div class="content-wrap">
          <div class="container">
            <LayoutGrid class="p-0 hidden-on-sticky">
              <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
                <div class="experience-detail-slides">
                  {#if destination.gallery.length > 0}
                    <OyCarousel perPage={{ 800: 1 }} draggable={false}>
                      <span class="control" slot="left-control">
                        <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon
                        >
                      </span>
                      {#each destination.gallery as item}
                        <div
                          class="slide-content slide-item"
                          style="background-image:url({item.url})"
                        />
                      {/each}
                      <span class="control" slot="right-control">
                        <Icon
                          ><img src="/img/icons/icon-right-arrow.svg" /></Icon
                        >
                      </span>
                    </OyCarousel>
                  {/if}
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
                <div class="d-pt-90 d-pb-100">
                  <p class="text-eyebrow m-mb-0">{destination.country?.name}</p>
                  <h1 class="m-mt-30 m-mb-15">{destination.name}</h1>
                  <p class="mb-30 short-description mt-0">
                    {destination.intro || ''}
                  </p>
                  <Button variant="outlined" class="mb-15"
                    ><Label>Find My Advisor</Label></Button
                  >
                  <br />
                  <Button class="m-mb-35" variant="outlined"
                    ><Label>What to Pack</Label></Button
                  >
                </div>
                <div class="action-buttons m-none">
                  <IconButton>
                    <Icon component={Svg} viewBox="0 0 13.246 19.134">
                      <g
                        id="Icon_-_Share"
                        data-name="Icon - Share"
                        transform="translate(0.5 1.233)"
                      >
                        <path
                          id="Path_318"
                          data-name="Path 318"
                          d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
                          transform="translate(-150.699 5872.56)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <path
                          id="Path_320"
                          data-name="Path 320"
                          d="M161.543-5862.169v-11.12"
                          transform="translate(-155.42 5873.29)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <path
                          id="Line"
                          d="M156.364-5870.5l3.472-3.473,3.472,3.473"
                          transform="translate(-153.713 5873.443)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                      </g>
                    </Icon>
                  </IconButton>
                  <IconButton
                    class="btn-favorite {destination.liked ? 'liked' : ''}"
                    on:click={likeDestination}
                  >
                    <Icon
                      class="like"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
                      <g
                        data-name="Icon - Heart"
                        transform="translate(0.125 0.125)"
                      >
                        <path
                          id="Heart_Off"
                          data-name="Heart Off"
                          d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01"
                          transform="translate(0.001)"
                          stroke="#f0f7f8"
                          stroke-width="0.25"
                          fill-rule="evenodd"
                        />
                      </g>
                    </Icon>
                    <Icon
                      class="liked"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
                      <path
                        d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                        transform="translate(0)"
                        fill="#000"
                        fill-rule="evenodd"
                      />
                    </Icon>
                  </IconButton>
                </div>
              </Cell>
            </LayoutGrid>
            <LayoutGrid class="p-0 show-on-sticky m-none">
              <Cell spanDevices={{ desktop: 7, tablet: 4 }}
                ><div>
                  <span class="text-eyebrow">{destination.country?.name}</span>
                  <IconButton>
                    <Icon component={Svg} viewBox="0 0 13.246 19.134">
                      <g
                        id="Icon_-_Share"
                        data-name="Icon - Share"
                        transform="translate(0.5 1.233)"
                      >
                        <path
                          id="Path_318"
                          data-name="Path 318"
                          d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
                          transform="translate(-150.699 5872.56)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <path
                          id="Path_320"
                          data-name="Path 320"
                          d="M161.543-5862.169v-11.12"
                          transform="translate(-155.42 5873.29)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <path
                          id="Line"
                          d="M156.364-5870.5l3.472-3.473,3.472,3.473"
                          transform="translate(-153.713 5873.443)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                      </g>
                    </Icon>
                  </IconButton>
                  <IconButton
                    class="btn-favorite {destination.liked ? 'liked' : ''}"
                    on:click={likeDestination}
                  >
                    <Icon
                      class="like"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
                      <g
                        data-name="Icon - Heart"
                        transform="translate(0.125 0.125)"
                      >
                        <path
                          id="Heart_Off"
                          data-name="Heart Off"
                          d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01"
                          transform="translate(0.001)"
                          stroke="#f0f7f8"
                          stroke-width="0.25"
                          fill-rule="evenodd"
                        />
                      </g>
                    </Icon>
                    <Icon
                      class="liked"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
                      <path
                        d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                        transform="translate(0)"
                        fill="#000"
                        fill-rule="evenodd"
                      />
                    </Icon>
                  </IconButton>
                </div>
                <h1 class="mb-0 mt-40">{destination.name}</h1>
              </Cell>
              <Cell spanDevices={{ desktop: 5, tablet: 4 }} class="text-right">
                <div class="mt-100">
                  <Button variant="outlined"
                    ><Label>Find My Advisor</Label></Button
                  >
                  <Button variant="outlined"><Label>What to Pack</Label></Button
                  >
                </div>
              </Cell>
            </LayoutGrid>
          </div>
        </div>
      </section>
      {#if tabs && activeTab}
        <section class="d-pt-90 d-pb-65 m-pt-40 m-pb-40" id="advisors-section">
          <div class="container">
            <div class="section-title d-mb-65 m-mb-40">
              <LayoutGrid class="p-0 m-none">
                <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
                  <TabBar {tabs} let:tab bind:active={activeTab}>
                    <!-- Note: the `tab` property is required! -->
                    <Tab {tab}>
                      <Label>{tab.name}</Label>
                    </Tab>
                  </TabBar>
                </Cell>
                <Cell
                  spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
                  class="text-right m-none"
                >
                  <Button variant="outlined"
                    ><Label>Find My Advisor</Label></Button
                  >
                </Cell>
              </LayoutGrid>
              <div class="d-none m-block text-center">
                <Select bind:value={activeTab} label="">
                  {#each tabs as tab}
                    <Option value={tab}>{tab.name}</Option>
                  {/each}
                </Select>
              </div>
            </div>
            <div class="section-content">
              {#if activeTab}
                <Exhibit
                  urlPrefix={activeTab.urlPrefix}
                  items={activeTab.exhibit}
                />
              {/if}
            </div>
          </div>
        </section>
      {/if}
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell span="12"><div class="divider" /></Cell>
        </LayoutGrid>
      </div>
      <section class="d-pt-70 d-pb-40 m-pt-50 m-pb-10">
        <div class="container">
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
              <h1 class="mt-0 m-mb-0">{destination.name}</h1>
            </Cell>
            <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
              <p class="mt-5">{@html destination.description}</p>
            </Cell>
          </LayoutGrid>
        </div>
      </section>
      {#if destination.looks && destination.looks.length}
        <LookShow title="Shop by look" items={destination.looks} />
      {/if}
      {#if destination.pack?.length}
        <ProductShow
          title="What to pack"
          bind:items={destination.pack}
          on:likeItem={likeProduct}
        />
      {/if}
      {#if destination.experiences && destination.experiences.length > 0}
        <section class="d-pt-80 d-pb-50 m-pt-40 m-pb-40">
          <div class="container">
            <h1 class="mt-0 d-mb-80 m-mb-35">Where to Experience</h1>
            <div class="experiences-list">
              <LayoutGrid class="p-0">
                {#each destination.experiences as item}
                  <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                    <div class="experience-item">
                      <div class="thumbnail">
                        <a href={makeLink('/experience', item)}>
                          <div
                            class="image-cover"
                            style="padding-top: calc(410 / 315 * 100%)"
                          >
                            <BlurImage data={item.gallery[0]} />
                          </div>
                        </a>
                        <IconButton
                          class="btn-favorite {item.liked ? 'liked' : ''}"
                          on:click={() => {
                            likeExperience(item);
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
                      <a href={makeLink('/experience', item)}>
                        <LayoutGrid class="p-0 m-none">
                          <Cell
                            spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-left">
                              {item.country?.name || 'Country'}
                            </p></Cell
                          >
                          <Cell
                            spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-right">
                              {item.type?.name || 'Experience'}
                            </p></Cell
                          >
                        </LayoutGrid>
                        <LayoutGrid class="p-0 d-none m-block">
                          <Cell
                            spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-left mt-20 mb-20">
                              {item.type?.name || 'Experience'}
                            </p></Cell
                          >
                        </LayoutGrid>
                      </a>
                      <div class="divider" />
                      <h4 class="text-h2 title mt-30">{item.name}</h4>
                      <p class="short-text m-none">{(item.intro || '').substring(0,80)}</p>
                    </div>
                  </Cell>
                {/each}
              </LayoutGrid>
            </div>
          </div>
        </section>
      {/if}
    </div>
  {:else}
    <div>Destination is gone :(</div>
  {/if}
</Layout>
<!-- <ProductSliderModal
  bind:open={openProductSlide}
  {products}
  bind:active={productIndex}>no content</ProductSliderModal
> -->
<OyNotification />

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
  :global(.show-on-sticky) {
    display: none;
  }
  :global(.is_sticky .show-on-sticky) {
    display: block;
  }
  .content :global(.mdc-button) {
    width: 220px;
  }
  :global(.destination-detail .header-title .btn-favorite) {
    position: relative;
    :global(.like) {
      display: block;
    }
    :global(.liked) {
      display: none;
    }
    &:hover {
      :global(.like) {
        display: none;
      }
      :global(.liked) {
        display: block;
      }
    }
  }
  :global(.destination-detail .header-title .btn-favorite.liked) {
    :global(.liked) {
      display: block;
    }
    :global(.like) {
      display: none;
    }
  }

  /* Header title */
  .header-title {
    background-color: #f0f7f8;
  }
  .experience-detail-slides {
    height: 100%;
    width: 100%;
    --wrap-width: 100%;
  }

  .experience-detail-slides :global(.dots) {
    display: none;
  }

  .experience-detail-slides :global(.carousel),
  .experience-detail-slides :global(.slides),
  .experience-detail-slides :global(.slides div) {
    height: 100%;
  }
  .experience-detail-slides :global(.slide-item) {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .header-title .action-buttons {
    position: absolute;
    top: 85px;
    right: 100px;
  }
  .header-title .short-description {
    width: 80%;
  }

  .section-title :global(.mdc-tab) {
    padding: 0;
    margin-right: 30px;
  }
  .section-title :global(.mdc-tab .mdc-tab__content) {
    width: 100%;
    justify-content: left;
  }

  /* Advisors */
  #advisors-section {
    @include mobile {
      --mdc-typography-headline2-font-size: 14px;
      --mdc-typography-headline2-line-height: 18px;
    }
    .item-advisor .title {
      @include desktop {
      }
    }
  }

  .experience-item :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
  }
  .experience-item .divider::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .experience-item .title {
    height: 50px;
    overflow: hidden;
    @include mobile {
      height: auto;
      overflow: auto;
    }
  }

  :global(.is_sticky.header-title) {
    padding-bottom: 50px !important;
  }

  .divider:after {
    background-color: #000;
  }

  @media screen and (max-width: 949px) {
    .experience-detail-slides :global(.carousel),
    .experience-detail-slides :global(.slides),
    .experience-detail-slides :global(.slides div) {
      height: auto;
    }
    .experience-detail-slides :global(.slide-item) {
      padding-top: 70%;
    }
    .header-title .short-description {
      width: 100%;
    }
    .experience-detail-slides :global(.wrap-control) {
      display: none;
    }
    .experience-detail-slides {
      margin-bottom: 20px;
    }
    .experience-detail-slides :global(.dots) {
      display: flex;
      justify-content: start;
      margin-top: 20px;
      filter: brightness(0);
    }
    .item-advisor .title {
      height: 50px;
    }
    .products-list :global(.mdc-layout-grid__inner) {
      margin-bottom: 10px;
    }
  }
  /*@media  (max-width: 1239px){*/
  /*    :global(.fixed, .is_sticky){*/
  /*        position: static !important;*/
  /*    }*/
  /*}*/
</style>

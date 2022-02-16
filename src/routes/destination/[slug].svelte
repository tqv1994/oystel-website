<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import Select from '@smui/select';
  import { Option } from '@smui/select';
  import Tab from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { destinationStore } from '$lib/store/destination';
  import { Destination } from '$lib/store/destination';
  import { Exhibitable, insertToStore } from '$lib/store/types';
  import Exhibit from '$lib/components/exhibit.svelte';
  import { parseId } from '$lib/utils/fetch';
  import ProductShow from '$lib/components/product-show.svelte';
  import LookShow from '$lib/components/look-show.svelte';
  import Item from '$lib/components/Item.svelte';

  export const load: Load = async ({ fetch, session, params }) => {
    const id = parseId(params.slug);
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
  import DetailSlide from '$lib/components/DetailSlide.svelte';
  import Markdown from '$lib/components/Markdown.svelte';

  type TabData = {
    name: string;
    exhibit: Exhibitable[];
    urlPrefix: string;
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
    // activeTab = tabs[0];
  });

  async function likeExperience(event: CustomEvent) {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let experience = event.detail.item;
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
</script>

{#if destination}
  <div class="content destination-detail d-pb-50 m-pb-40">
    <section class="header-title d-pt-100 d-pb-25 m-pt-90 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container">
          <DetailSlide data={destination} on:like={likeDestination} />
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
                    <Label class="text-h3">{tab.name}</Label>
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
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell span="12"><div class="divider" /></Cell>
        </LayoutGrid>
      </div>
    {/if}
    <section class="d-pt-70 d-pb-40 m-pt-50 m-pb-10">
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
            <h2 class="mt-0 m-mb-0">{destination.name}</h2>
          </Cell>
          <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
            <div class="mt-5">
              <Markdown source={destination.description} />
            </div>
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
      <section class="">
        <div class="container">
          <h2 class="mt-0 d-mb-60 m-mb-35">Where to Experience</h2>
          <div class="experiences-list">
            <LayoutGrid class="p-0">
              {#each destination.experiences as item}
                <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                  <Item
                    {...item}
                    pathPrefix="/experience"
                    bind:item
                    on:likeItem={likeExperience}
                  />
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
<!-- <ProductSliderModal
  bind:open={openProductSlide}
  {products}
  bind:active={productIndex}>no content</ProductSliderModal
> -->
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  .destination-detail {
    @include mixins.desktop {
      .d-pt-25-vh {
        padding-top: 25vh;
      }
    }
    @import './src/style/partial/thumbnail.scss';
    .mdc-tab-bar {
      --mdc-theme-primary: #000;
    }
    .mdc-button {
      width: 220px;
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

    /* Header title */
    .header-title {
      .mdc-layout-grid {
        @include mixins.desktop {
          --mdc-layout-grid-gutter-desktop: 30px;
        }
      }
    }

    .header-title .action-buttons {
      position: absolute;
      top: 24vh;
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
      @include mixins.mobile {
        --mdc-typography-headline2-font-size: 14px;
        --mdc-typography-headline2-line-height: 18px;
      }
      .item-advisor .title {
        @include mixins.desktop {
        }
      }
    }

    :global(.is_sticky.header-title) {
      padding-bottom: 50px !important;
    }

    .divider:after {
      background-color: #000;
    }

    @media screen and (max-width: 949px) {
      .header-title .short-description {
        width: 100%;
      }

      .item-advisor .title {
        height: 50px;
      }
      .products-list :global(.mdc-layout-grid__inner) {
        margin-bottom: 10px;
      }
    }
  }

  /*@media  (max-width: 1239px){*/
  /*    :global(.fixed, .is_sticky){*/
  /*        position: static !important;*/
  /*    }*/
  /*}*/
</style>

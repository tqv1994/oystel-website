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
  import type { Destination } from '$lib/store/destination';
  import type { Exhibitable } from '$lib/store/types';
  import Exhibit from '$lib/components/exhibit.svelte';
  import ProductShow from '$lib/components/product-show.svelte';
  import LookShow from '$lib/components/look-show.svelte';
  import Item from '$lib/components/Item.svelte';

  export const load: Load = async ({ fetch, params: { id } }) => {
    id = id.substring(id.lastIndexOf('-')+1);
    return {
      props: {
        destination: await trySearchGetOne(fetch, 'destination', id),
        cities: await getCollection(fetch, 'city'),
      },
    };
  };
</script>

<script type="ts">
  import { session } from '$app/stores';
  import DetailSlide from '$lib/components/DetailSlide.svelte';
  import Markdown from '$lib/components/Markdown.svelte';
  import { searchGetOne, trySearchGetOne } from '$lib/store/search';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';

  export let destination: Destination;
  export let cities: Kind[] = [];

  type TabData = {
    name: string;
    exhibit: Exhibitable[];
    urlPrefix: string | null;
  };
  let tabs: TabData[] = [];
  let activeTab: TabData;

  $: if (destination) {
    tabs = [
      {
        name: 'Where to Stay',
        exhibit: (destination.accommodations || []).concat([...destination.restaurants],[...destination.attractions]),
        urlPrefix: null,
      },
      {
        name: 'Where to Dine & Drink',
        exhibit: destination.restaurants,
        urlPrefix: null,
      },
      {
        name: 'Where to Explore',
        exhibit: destination.attractions,
        urlPrefix: null,
      },
    ];
    if((tabs[0].exhibit || []).length > 0){
      activeTab = tabs[0];
      tabs[0].exhibit = tabs[0].exhibit.slice(0, 5);
    }
  } else {
    tabs = [];
  }

  async function likeDestination() {
    let liked: boolean;
    if (!$session.user) {
      window.openSignInModal();
      return;
    }
    let destinationLikedIds: string[] = (
      $session.user?.destinationLikes || []
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
      $session.user.destinationLikes = data.updateUser.user.destinationLikes;
      session.set({ user: $session.user });
      destination.liked = liked;
    } else {
      const error = await res.json();
      console.error(error);
    }
  }
</script>

{#if destination}
  <div class="content destination-detail d-pb-50 m-pb-40">
    <section class="header-title -slide-content full-width">
      <DetailSlide data={destination} on:like={likeDestination} />
    </section>
    {#if tabs && activeTab && (activeTab.exhibit || []).length > 0}
      <section class="d-pb-65 m-pb-40" id="advisors-section">
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
                <Button variant="unelevated" href="/advisor"
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
                {cities}
                introShow={false}
              />
            {/if}
          </div>
        </div>
      </section>
      <div class="container margin-auto add-padding">
        <LayoutGrid class="p-0">
          <Cell span={12}><div class="divider" /></Cell>
        </LayoutGrid>
      </div>
    {/if}
    <section class="d-pb-0 m-pb-10 destination-description-content">
      <div class="container margin-auto add-padding">
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
            <h2 class="mt-0 m-mb-0">
              {destination.name || destination.location || ''}
            </h2>
          </Cell>
          <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
            <div class="mt-5 destination-detail-markdown">
              <Markdown source={destination.description || ''} />
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    {#if destination.looks && destination.looks.length}
      <LookShow title="Shop by look" items={destination.looks} />
    {/if}
    {#if destination.pack?.length}
      <ProductShow title="What to Pack" bind:items={destination.pack} />
    {/if}
    {#if destination.experiences && destination.experiences.length > 0}
      <section class="">
        <div class="container margin-auto add-padding">
          <h2 class="mt-0 where-to-experience-h2">Where to Experience</h2>
          <div class="experiences-list">
            <LayoutGrid class="p-0">
              {#each destination.experiences as item}
                <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                  <Item pathPrefix="/experiences" {item} {cities} />
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
      width: 182px;
      min-width: 182px;
      padding: 0 15px;
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
      &.-slide-content {
        padding-top: 20px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        height: calc(100vh - 128px);
        @include mixins.mobile {
          margin-top: 64px;
          padding-top: 0;
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
      .mdc-layout-grid {
        @include mixins.desktop {
          --mdc-layout-grid-gutter-desktop: 30px;
        }
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
      font-size: 20px;
      height: 40px;
    }
    .section-title :global(.mdc-tab .mdc-tab__content) {
      width: 100%;
      justify-content: left;
    }

    /* Advisors */
    #advisors-section {
      padding-top: 64px;
      @include mixins.mobile {
        --mdc-typography-headline2-font-size: 14px;
        --mdc-typography-headline2-line-height: 18px;
        padding-top: 16px;
        padding-bottom: 16px !important;
      }
      .item .title, .item .btn-favorite {
        display: none;
      }
      .mdc-tab, .item a{
        cursor: context-menu;
      }
    }

    :global(.is_sticky.header-title) {
      padding-bottom: 50px !important;
    }

    .divider:after {
      background-color: #000;
    }

    &-markdown {
      p {
        margin-bottom: 28px;
      }
    }

    .where-to-experience-h2 {
      margin-bottom: 40px;
    }

    .destination-description-content {
      @include mixins.mobile {
        padding-top: 32px !important;
      }
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

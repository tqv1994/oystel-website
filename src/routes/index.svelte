<script lang="ts" context="module">
  export const load: Load = async ({ fetch }) => {
    return {
      props: {
        page: await loadFeature(fetch, 'home'),
        cities: await getCollection(fetch, 'city')
      },
    };
  };
</script>

<script lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { storeHelper } from '$lib/helpers';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Item from '$lib/components/Item.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import CuratedExperience from '$lib/components/CuratedExperience.svelte';
  import WhatToWear from '$lib/components/WhatToWear.svelte';
  import type { Page } from '$lib/store/page';
  import { loadFeature } from '$lib/utils/load';
  import HeroGallery from '$lib/components/HeroGallery.svelte';
  import FeaturedDrop from '$lib/components/FeaturedDrop.svelte';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';
  export let cities: Kind[] = [];
  export let page: Page;
</script>

<svelte:body />

<div class="content home-page-content">
  {#each page.sections as section, index}
    {#if section.__component === 'galleries.hero-gallery'}
      <HeroGallery {section} />
    {:else if section.__component === 'galleries.featured-drop'}
      <FeaturedDrop {...section} />
    {:else if section.__component === 'galleries.destination-gallery'}
      <section class="d-pt-100 m-pt-40 from-advisors">
        <div class="container margin-auto add-padding">
          <LayoutGrid class="p-0">
            <Cell span={12}>
              <h2 class="section__title">{section.name}</h2>
            </Cell>
          </LayoutGrid>
          {#if section.destinations?.length > 0}
            <LayoutGrid class="p-0">
              {#each storeHelper.getItems(section.destinations, 4) as item}
                <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                  <Item {item} pathPrefix="/destinations" {cities} />
                </Cell>
              {/each}
            </LayoutGrid>
          {/if}
        </div>
      </section>
    {:else if section.__component === 'galleries.experience-gallery'}
      <section class="experiences experiences-{index} d-pb-100 m-pb-40">
        <div class="container margin-auto add-padding">
          <h2 class="section__title">{section.name}</h2>
          <CuratedExperience {...section} {index} {cities}/>
        </div>
      </section>
    {:else if section.__component === 'banners.banner'}
      <WhatToWear {...section} />
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

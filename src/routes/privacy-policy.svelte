<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, session, url }) => {
    return {
      props: {
        data: await loadFeature(fetch, 'privacy-policy'),
      },
    };
  };
</script>

<script lang="ts">
  import ShopNavigation from '$lib/components/ShopNavigation.svelte';
  import type { Page } from '$lib/store/page';
  import FeaturedDrop from '$lib/components/FeaturedDrop.svelte';
  import LookList2 from '$lib/components/LookList2.svelte';
  import DropSlides from '$lib/components/DropSlides.svelte';
  import ShopTitle from '$lib/components/ShopTitle.svelte';
  import { loadFeature } from '$lib/utils/load';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';
  import Markdown from '$lib/components/Markdown.svelte';
  export let productDesigners: Kind[];
  export let productTypes: Kind[];
  export let data: Page;
</script>

<div class="content">
  <section class=" d-pt-70 m-pt-70">
    <div class="container">
      {#each data?.sections as section}
        {#if section.__component === 'controls.html'}
          <Markdown source={section.content} />
        {/if}
      {/each}
    </div>
  </section>
</div>

<style lang="scss">
  @use '../theme/mixins';
  section {
    @include mixins.desktop {
      padding-left: calc(8%);
    }
  }
</style>

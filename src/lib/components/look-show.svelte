<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { destinationStore } from '$lib/store/destination';
  import type { Destination } from '$lib/store/destination';
  import { insertToStore } from '$lib/store/types';
  import { get } from 'svelte/store';
  import { parseId } from '$lib/utils/fetch';
  import type { Look } from '$lib/store/look';

  export const load: Load = async ({ fetch, params }) => {
    const id = parseId(params.slug);
    if (get(destinationStore).items[id]) {
      return {
        props: { id },
      };
    }

    const res = await fetch(`/destination/${id}`);
    if (res.ok) {
      const data: Destination = await res.json();
      insertToStore(destinationStore, [data]);
      return { props: { id } };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script type="ts">
  import LookItem from './LookItem.svelte';

  export let title: string;
  export let items: Look[];
</script>

<section class="pt-40" id="shop-by-look-section">
  <div class="container margin-auto add-padding">
    <LayoutGrid class="p-0 pb-30">
      <Cell span={12}
        ><h2 class="mt-0 mb-0 shop-by-look-title">Shop By Look</h2></Cell
      >
    </LayoutGrid>
    <LayoutGrid class="p-0 image-gallery">
      <Cell
        class="primary-image"
        spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
      >
        <LookItem item={items[0]} isHero={true} />
      </Cell>
      <Cell
        class="secondary-image"
        spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
      >
        <LayoutGrid class="p-0">
          {#each items.slice(1) as look}
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <LookItem item={look} />
            </Cell>
          {/each}
        </LayoutGrid>
      </Cell>
    </LayoutGrid>
  </div>
</section>

<style lang="scss">
  @use '../../theme/mixins';
  #shop-by-look-section {
    --mdc-typography-headline5-font-size: 14px;
    --mdc-typography-headline5-line-height: 22px;
    @include mixins.mobile {
      padding-top: 0 !important;
    }
    /* Products */
    :global(.image-gallery) {
      :global(.primary-image) {
        :global(.image-cover) {
          padding-top: 88.8714734% !important;
        }
      }
      :global(.secondary-image) {
        :global(.image-cover) {
          padding-top: 131.832797% !important;
          @include mixins.mobile {
            padding-top: 100% !important;
          }
        }
      }
    }
  }
  .shop-by-look-title {
    margin-bottom: 32px !important;
    @include mixins.mobile {
      margin-bottom: -8px !important;
    }
  }
</style>

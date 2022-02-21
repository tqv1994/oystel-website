<script lang="ts">
  import { Look } from '$lib/store/look';
  import { getSlug } from '$lib/utils/link';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import LookItem from './LookItem.svelte';
  export let items: Look[] = [];
  export let title: string = '';
</script>
<h2 class="mt-0">{title}</h2>
<LayoutGrid class="p-0">
  {#each items as item, index}
    <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
      <div class="item">
        <div class="thumbnail">
          <a href={`/shop/look-${getSlug(item)}`}>
            <div
              class="image-cover"
              style="padding-top: calc(410 / 315 * 100%)"
            >
              {#if item.gallery?.length}
                <BlurImage {...item.gallery[0]} />
              {:else}
                <BlurImage />
              {/if}
            </div>
          </a>
        </div>
        <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
        <a href={`/shop/look-${getSlug(item)}`}>
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 6, phone: 2 }}
              ><p class="text-eyebrow text-left m-0 mt-20 mb-0">
                Fashion
              </p></Cell
            >
          </LayoutGrid>
          <h4 class="title mt-15 mb-15">{item.name}</h4>
        </a>
      </div>
    </Cell>
  {/each}
</LayoutGrid>
